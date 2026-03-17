"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import BottomNavBar from '@/app/components/BottomNavBar';
import Header from '@/app/components/Header';

export default function Home() {
  const [budget, setBudget] = useState<string>('');
  const [showModeInfo, setShowModeInfo] = useState<boolean>(true);
  const [distributionMode, setDistributionMode] = useState<'weighted' | 'equal'>('weighted');
  const [rounding, setRounding] = useState<number>(0);


  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-digit characters
    const value = e.target.value.replace(/\D/g, '');
    
    // Format with thousands separator
    if (value) {
      const formatted = parseInt(value, 10).toLocaleString('id-ID');
      setBudget(formatted);
    } else {
      setBudget('');
    }
  };

  return (

    <>
      <Header />
      <main className="w-full max-w-md px-6 pt-3 pb-32 flex flex-col gap-4 relative">
        {/* Header Section with Mosque Silhouette */}
        <section className="relative pt-10 text-center overflow-hidden">
          {/* Mosque Silhouette — anchored at horizon bottom */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none select-none">
            <span
              className="material-symbols-outlined text-[200px] text-secondary leading-none -mb-8 opacity-[0.11]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >mosque</span>
          </div>

          {/* Scattered ambient stars */}
          <span className="absolute top-3 left-6 material-symbols-outlined text-[10px] text-secondary opacity-30 pointer-events-none select-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="absolute top-7 right-8 material-symbols-outlined text-xs text-secondary opacity-20 pointer-events-none select-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="absolute top-16 left-14 material-symbols-outlined text-[8px] text-secondary opacity-25 pointer-events-none select-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="absolute top-12 right-16 material-symbols-outlined text-[8px] text-secondary opacity-20 pointer-events-none select-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>

          <div className="relative z-10 flex flex-col items-center gap-2 pb-4">
            {/* Crescent Moon with flanking stars */}
            <div className="flex items-center gap-3 text-secondary mb-3">
              <div className="flex flex-col items-center gap-[3px] translate-y-1">
                <span className="material-symbols-outlined text-sm opacity-70" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[10px] opacity-40" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <span
                className="material-symbols-outlined text-[56px] drop-shadow-[0_0_18px_rgba(212,160,23,0.55)]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >dark_mode</span>
              <div className="flex flex-col items-center gap-[3px] -translate-y-1">
                <span className="material-symbols-outlined text-[10px] opacity-40" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm opacity-70" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
            <h2 className="text-4xl font-headline font-bold text-on-surface leading-tight">Selamat Hari Raya</h2>
            <p className="text-on-surface-variant max-w-[280px] text-center mx-auto mt-2">Atur anggaran berbagi kebahagiaan dengan bijak dan berkah.</p>
          </div>
        </section>

        {/* Main Form Canvas */}
        <div className="flex flex-col gap-8">
          {/* Budget Input Card */}
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_20px_40px_rgba(212,160,23,0.06)] border-t-2 border-secondary relative overflow-hidden group">
            <div className="arabesque-pattern absolute inset-0 pointer-events-none"></div>
            <label className="block text-sm font-label uppercase tracking-widest text-on-surface-variant/70 mb-4">Total Anggaran THR</label>
            <div className="relative flex items-center">
              <span className="absolute left-0 text-2xl font-bold text-secondary font-headline">Rp</span>
              <input 
                className="w-full bg-transparent border-none p-0 pl-12 text-5xl font-headline font-bold text-primary focus:ring-0 outline-none placeholder:text-surface-container-highest" 
                placeholder="0" 
                type="text" 
                value={budget}
                onChange={handleBudgetChange}
              />
            </div>
            <div className="mt-4 flex items-center gap-2 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-sm" data-icon="info">info</span>
              <span>Pastikan zakat maal sudah disisihkan jika mencapai nisab.</span>
            </div>
          </div>

          {/* Configuration Bento Grid */}
          <div className="grid grid-cols-1 gap-6">
            {/* Distribution Mode */}
            <div className="bg-surface-container-low rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary" data-icon="account_tree">account_tree</span>
                  <span className="font-bold text-on-surface">Mode Pembagian</span>
                </div>
                <button 
                  onClick={() => setShowModeInfo(!showModeInfo)}
                  className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95"
                >
                  <span className="material-symbols-outlined text-sm" data-icon="help">help</span>
                </button>
              </div>
              <div className="flex bg-surface-container-highest p-1 rounded-lg">
                <button 
                  onClick={() => setDistributionMode('weighted')}
                  className={`flex-1 py-2 text-sm rounded-lg transition-all ${distributionMode === 'weighted' ? 'font-bold bg-primary-container text-on-primary-container shadow-sm' : 'font-medium text-on-surface-variant hover:text-secondary'}`}
                >
                  Berbobot
                </button>
                <button 
                  onClick={() => setDistributionMode('equal')}
                  className={`flex-1 py-2 text-sm rounded-lg transition-all ${distributionMode === 'equal' ? 'font-bold bg-primary-container text-on-primary-container shadow-sm' : 'font-medium text-on-surface-variant hover:text-secondary'}`}
                >
                  Rata
                </button>
              </div>
              {showModeInfo && (
                <div className="p-3 flex flex-col gap-3 bg-surface-container rounded-lg text-sm text-on-surface-variant border border-outline-variant/30 leading-relaxed text-left animate-in fade-in duration-200">
                  {distributionMode === 'weighted' ? (
                    <div>
                      <span className="font-bold text-primary block mb-1">Mode Berbobot:</span>
                      Membagi THR secara proporsional berdasarkan bobot (seperti usia, hubungan, atau prioritas), sehingga nominal yang diterima berbeda-beda sesuai kelompoknya.
                    </div>
                  ) : (
                    <div>
                      <span className="font-bold text-primary block mb-1">Mode Rata:</span>
                      Membagi total anggaran THR secara merata ke semua keluarga atau kerabat, sehingga masing-masing mendapatkan jumlah nominal yang sama besar.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Rounding Control */}
            <div className="bg-surface-container-low rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" data-icon="rebase_edit">rebase_edit</span>
                <span className="font-bold text-on-surface">Pembulatan</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Tanpa', value: 0 },
                  { label: '5rb', value: 5000 },
                  { label: '10rb', value: 10000 },
                  { label: '50rb', value: 50000 },
                  { label: '100rb', value: 100000 }
                ].map((option) => (
                  <button 
                    key={option.value}
                    onClick={() => setRounding(option.value)}
                    className={`flex-1 min-w-[15%] py-2 px-1 rounded-lg text-xs font-bold transition-all ${
                      rounding === option.value 
                        ? 'bg-primary-container text-on-primary-container border-solid border border-primary-container shadow-sm' 
                        : 'bg-surface-container-lowest text-on-surface border border-outline-variant/20 hover:border-secondary'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Ornamental Divider */}
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-secondary/20 to-secondary/40"></div>
            <span className="material-symbols-outlined text-secondary opacity-40 text-lg" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-secondary/20 to-secondary/40"></div>
          </div>

          {/* CTA Button */}
          <Link href="/penerima" className="w-full py-5 rounded-lg shimmer-gold text-on-secondary-fixed font-bold text-lg flex items-center justify-center gap-3 shadow-[0_12px_24px_rgba(121,89,0,0.2)] active:scale-95 transition-all group overflow-hidden relative">
            <span className="relative z-10">Atur Penerima</span>
            <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Link>
        </div>
      </main>

      {/* Bottom Navigation Component */}
      <BottomNavBar />

      {/* Floating Mosque Pattern Elements for Ambience */}
      <div className="absolute top-20 -left-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl pointer-events-none z-[-1]"></div>
      <div className="absolute bottom-40 -right-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl pointer-events-none z-[-1]"></div>
    </>
  );
}
