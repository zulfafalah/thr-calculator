"use client";

import React, { useState, useEffect, useCallback } from 'react';
import BottomNavBar from '@/app/components/BottomNavBar';
import Header from '@/app/components/Header';

// --- Types ---

interface Recipient {
  id: string;
  title: string;
  weightLabel: string;
  weight: number;
  icon: string;
  bgIcon?: string;
  count: number;
  active: boolean;
}

interface ThrConfig {
  budget: number;
  budgetFormatted: string;
  distributionMode: 'weighted' | 'equal';
  rounding: number;
}

interface ResultItem {
  id: string;
  title: string;
  icon: string;
  count: number;
  weight: number;
  weightLabel: string;
  amountPerPerson: number;
  total: number;
  distributed: boolean;
}

// --- Icon color themes for variety ---
const ICON_THEMES = [
  { bg: 'bg-primary/10', text: 'text-primary' },
  { bg: 'bg-secondary/10', text: 'text-secondary' },
  { bg: 'bg-tertiary/10', text: 'text-tertiary' },
  { bg: 'bg-error/10', text: 'text-error' },
  { bg: 'bg-primary-container/20', text: 'text-on-primary-container' },
];

// =============================================
// THR DISTRIBUTION ALGORITHM (weighted / equal)
// =============================================

function distributeTHR(recipients: Recipient[], config: ThrConfig): ResultItem[] {
  const activeRecipients = recipients.filter(r => r.active && r.count > 0);
  if (activeRecipients.length === 0) return [];

  const { budget, distributionMode, rounding } = config;
  const totalPeople = activeRecipients.reduce((sum, r) => sum + r.count, 0);
  if (totalPeople === 0 || budget <= 0) return [];

  let results: ResultItem[];

  // ── Step 1-3: Initial distribution ──
  if (distributionMode === 'equal') {
    const perPerson = budget / totalPeople;
    results = activeRecipients.map(r => ({
      id: r.id,
      title: r.title,
      icon: r.icon,
      count: r.count,
      weight: r.weight,
      weightLabel: r.weightLabel,
      amountPerPerson: perPerson,
      total: perPerson * r.count,
      distributed: false,
    }));
  } else {
    // Weighted: total_score = Σ (weight_i × count_i)
    const totalWeightedScore = activeRecipients.reduce(
      (sum, r) => sum + r.weight * r.count, 0
    );

    // thr_per_person_i = budget × (weight_i / total_score)
    results = activeRecipients.map(r => {
      const perPerson = budget * (r.weight / totalWeightedScore);
      return {
        id: r.id,
        title: r.title,
        icon: r.icon,
        count: r.count,
        weight: r.weight,
        weightLabel: r.weightLabel,
        amountPerPerson: perPerson,
        total: perPerson * r.count,
        distributed: false,
      };
    });
  }

  // ── Step 6: Rounding ──
  if (rounding > 0) {
    results.forEach(r => {
      r.amountPerPerson = Math.round(r.amountPerPerson / rounding) * rounding;
      r.total = r.amountPerPerson * r.count;
    });

    // ── Step 7: Final adjustment after rounding ──
    let totalDistributed = results.reduce((sum, r) => sum + r.total, 0);
    let diff = budget - totalDistributed;

    if (diff !== 0) {
      // Sort: highest weight first to add, lowest first to subtract
      const sorted = [...results].sort((a, b) =>
        diff > 0 ? b.weight - a.weight : a.weight - b.weight
      );

      // Distribute rounding increments one category at a time
      for (const item of sorted) {
        if (diff === 0) break;
        const ref = results.find(r => r.id === item.id)!;
        const stepTotal = rounding * ref.count;

        while (diff > 0 && diff >= stepTotal) {
          ref.amountPerPerson += rounding;
          ref.total = ref.amountPerPerson * ref.count;
          diff -= stepTotal;
        }

        while (diff < 0 && Math.abs(diff) >= stepTotal && ref.amountPerPerson > rounding) {
          ref.amountPerPerson -= rounding;
          ref.total = ref.amountPerPerson * ref.count;
          diff += stepTotal;
        }
      }

      // Second pass for single-count categories to mop up tiny remainder
      if (diff !== 0) {
        const sorted2 = [...results].sort((a, b) =>
          diff > 0 ? b.weight - a.weight : a.weight - b.weight
        );
        for (const item of sorted2) {
          if (diff === 0) break;
          const ref = results.find(r => r.id === item.id)!;
          if (diff > 0 && diff >= rounding) {
            ref.amountPerPerson += rounding;
            ref.total = ref.amountPerPerson * ref.count;
            diff -= rounding * ref.count;
          } else if (diff < 0 && Math.abs(diff) >= rounding && ref.amountPerPerson > rounding) {
            ref.amountPerPerson -= rounding;
            ref.total = ref.amountPerPerson * ref.count;
            diff += rounding * ref.count;
          }
        }
      }
    }
  }

  return results;
}

// --- Helpers ---

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

// --- Component ---

export default function HasilPage() {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [config, setConfig] = useState<ThrConfig | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const recipientsRaw = localStorage.getItem('recipients_data');
    const configRaw = localStorage.getItem('thr_config');

    if (recipientsRaw && configRaw) {
      const recipients: Recipient[] = JSON.parse(recipientsRaw);
      const thrConfig: ThrConfig = JSON.parse(configRaw);
      setConfig(thrConfig);

      // Restore previously distributed (checked) state
      const distributedRaw = localStorage.getItem('distributed_ids');
      const distributedIds: string[] = distributedRaw ? JSON.parse(distributedRaw) : [];

      // Run distribution algorithm
      const distributed = distributeTHR(recipients, thrConfig);

      // Re-apply distributed checkbox state
      distributed.forEach(r => {
        if (distributedIds.includes(r.id)) {
          r.distributed = true;
        }
      });

      setResults(distributed);
    }

    setIsLoaded(true);
  }, []);

  const toggleDistributed = useCallback((id: string) => {
    setResults(prev => {
      const updated = prev.map(r =>
        r.id === id ? { ...r, distributed: !r.distributed } : r
      );
      // Persist to localStorage
      const distributedIds = updated.filter(r => r.distributed).map(r => r.id);
      localStorage.setItem('distributed_ids', JSON.stringify(distributedIds));
      return updated;
    });
  }, []);

  // ── Derived calculations ──
  const budget = config?.budget ?? 0;
  const totalAllocated = results.reduce((sum, r) => sum + r.total, 0);
  const sisa = budget - totalAllocated;
  const isOverBudget = totalAllocated > budget;

  // Progress = how much has been physically given out (checked)
  const totalGiven = results
    .filter(r => r.distributed)
    .reduce((sum, r) => sum + r.total, 0);
  const progressPercentage = totalAllocated > 0
    ? Math.min((totalGiven / totalAllocated) * 100, 100)
    : 0;
  const allDistributed = results.length > 0 && results.every(r => r.distributed);

  if (!isLoaded) return null;

  // Empty state
  if (!config || results.length === 0) {
    return (
      <>
        <Header />
        <main className="w-full max-w-md px-6 pt-8 pb-32 space-y-8 relative">
          <section className="text-center py-20 space-y-4">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/30" data-icon="inbox">inbox</span>
            <h2 className="text-xl font-bold text-on-surface-variant">Belum Ada Data</h2>
            <p className="text-on-surface-variant/60 text-sm">Silakan atur anggaran dan penerima terlebih dahulu.</p>
          </section>
        </main>
        <BottomNavBar />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="w-full max-w-md px-6 pt-8 pb-32 space-y-8 relative">
        {/* Header Section */}
        <section className="space-y-2">
          <h2 className="text-3xl font-bold font-headline text-on-surface leading-tight flex items-center gap-2">
            Rincian THR Kamu
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary shrink-0">
              <polyline points="20 12 20 22 4 22 4 12"></polyline>
              <rect x="2" y="7" width="20" height="5"></rect>
              <line x1="12" y1="22" x2="12" y2="7"></line>
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
            </svg>
          </h2>
          <p className="text-on-surface-variant/80 font-body">Pastikan kebahagiaan terbagi dengan merata.</p>
        </section>

        {/* Summary Banner Card */}
        <section className="relative bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 overflow-hidden">
          <div className="flex flex-col gap-2 mb-3">
            <div className="space-y-1 text-center border-b border-outline-variant/30 pb-2">
              <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant/70">Total Budget</p>
              <p className="text-xl md:text-2xl font-bold font-headline text-primary truncate">{formatRupiah(budget)}</p>
            </div>
            <div className="flex items-center divide-x divide-outline-variant/30 w-full">
              <div className="space-y-1 px-1 flex-1 text-center min-w-0">
                <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant/70">Terbagi</p>
                <p className="text-sm md:text-base font-bold font-headline text-secondary truncate">{formatRupiah(totalAllocated)}</p>
              </div>
              <div className="space-y-1 px-1 flex-1 text-center min-w-0">
                <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant/70">Sisa</p>
                <p className={`text-sm md:text-base font-bold font-headline truncate ${sisa < 0 ? 'text-error' : 'text-primary'}`}>
                  {sisa < 0 ? '-' : ''}{formatRupiah(Math.abs(sisa))}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar — tracks distributed / given out */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant/70">Sudah Dibagikan</p>
              <p className="text-[10px] font-bold text-on-surface-variant">{Math.round(progressPercentage)}%</p>
            </div>
            <div className="relative w-full bg-surface-container-low rounded-full overflow-hidden h-2">
              <div
                className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-out ${
                  allDistributed ? 'bg-primary' : isOverBudget ? 'bg-error' : 'bg-secondary'
                }`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className={`text-[10px] text-right font-medium ${
              allDistributed ? 'text-primary' : isOverBudget ? 'text-error' : 'text-on-surface-variant/60'
            }`}>
              {allDistributed
                ? '✓ Semua sudah dibagikan!'
                : `${formatRupiah(totalGiven)} dari ${formatRupiah(totalAllocated)}`
              }
            </p>
          </div>

          {isOverBudget && (
            <p className="mt-1 text-[10px] text-right font-medium text-error">
              Over budget {Math.round((totalAllocated / budget) * 100)}%
            </p>
          )}
        </section>

        {/* List of Result Cards */}
        <section className="space-y-4">
          <h3 className="text-xs font-label uppercase tracking-widest text-on-surface-variant/60 mb-2">Daftar Penerima</h3>

          {results.map((item, index) => {
            const theme = ICON_THEMES[index % ICON_THEMES.length];
            return (
              <div
                key={item.id}
                className={`rounded-xl p-5 shadow-sm flex items-center justify-between group transition-all duration-300 ${
                  item.distributed
                    ? 'bg-surface-container-low opacity-70 grayscale-[0.5]'
                    : 'bg-surface-container-lowest'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${theme.bg} flex items-center justify-center ${theme.text}`}>
                    <span className="material-symbols-outlined" data-icon={item.icon}>{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">{item.title}</h4>
                    <p className="text-xs text-on-surface-variant">
                      {item.count} orang × {formatRupiah(item.amountPerPerson)}
                      <span className="ml-1 opacity-60">({item.weightLabel})</span>
                    </p>
                    <p className="text-sm font-bold text-primary mt-1">{formatRupiah(item.total)}</p>
                  </div>
                </div>

                {item.distributed ? (
                  <button
                    onClick={() => toggleDistributed(item.id)}
                    className="flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm" data-icon="check" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    </div>
                    <span className="text-[9px] font-label uppercase text-primary font-bold">Sudah</span>
                  </button>
                ) : (
                  <button
                    onClick={() => toggleDistributed(item.id)}
                    className="flex flex-col items-center gap-1 group/btn cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-outline-variant flex items-center justify-center text-outline-variant group-hover/btn:border-secondary group-hover/btn:text-secondary transition-all">
                      <span className="material-symbols-outlined text-sm" data-icon="check">check</span>
                    </div>
                    <span className="text-[9px] font-label uppercase text-outline-variant group-hover/btn:text-secondary">Belum</span>
                  </button>
                )}
              </div>
            );
          })}
        </section>

        {/* Ornamental Divider */}
        <div className="flex items-center justify-center gap-4 py-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-secondary/20"></div>
          <span className="material-symbols-outlined text-secondary/40 scale-75" data-icon="star">star</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-secondary/20"></div>
        </div>

        {/* Action Button */}
        <button className="w-full max-w-sm mx-auto bg-primary-container text-on-primary-container rounded-lg py-4 flex items-center justify-center gap-3 font-bold shadow-[0_10px_20px_rgba(27,67,50,0.2)] hover:bg-primary transition-all active:scale-95">
          <span className="material-symbols-outlined" data-icon="share">share</span>
          Bagikan Ringkasan
        </button>
      </main>

      <BottomNavBar />
    </>
  );
}
