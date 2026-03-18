"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BottomNavBar from '@/app/components/BottomNavBar';
import Header from '@/app/components/Header';

export default function PenerimaPage() {
  const [distributionMode, setDistributionMode] = useState<'weighted' | 'equal'>('weighted');

  const [recipientsData, setRecipientsData] = useState([
    {
      id: "orang-tua",
      title: "Orang Tua",
      weightLabel: "Bobot 3x",
      weight: 3.0,
      icon: "elderly",
      bgIcon: "diversity_3",
      count: 0,
      active: true,
    },
    {
      id: "saudara",
      title: "Saudara Kandung",
      weightLabel: "Bobot 1x",
      weight: 1.0,
      icon: "family_restroom",
      count: 0,
      active: true,
    },
    {
      id: "ponakan",
      title: "Ponakan",
      weightLabel: "Bobot 0.5x",
      weight: 0.5,
      icon: "child_care",
      count: 0,
      active: true,
    },
    {
      id: "art",
      title: "Asisten Rumah Tangga",
      weightLabel: "Bobot 2x",
      weight: 2.0,
      icon: "home_work",
      count: 0,
      active: true,
    },
  ]);

  useEffect(() => {
    const savedConfig = localStorage.getItem('thr_config');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        if (config.distributionMode) setDistributionMode(config.distributionMode);
      } catch (e) {
        // ignore invalid JSON
      }
    }

    const saved = localStorage.getItem('recipients_data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (Array.isArray(data) && data.length > 0) {
          setRecipientsData(data);
        }
      } catch (e) {
        // ignore invalid JSON
      }
    }
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ title: "", weightLabel: "Bobot 1x", weight: 1.0 });

  const [editingWeightId, setEditingWeightId] = useState<string | null>(null);
  const [editingWeightValue, setEditingWeightValue] = useState<string>('');

  const startEditWeight = (id: string, currentWeight: number) => {
    setEditingWeightId(id);
    setEditingWeightValue(String(currentWeight));
  };

  const commitEditWeight = (id: string) => {
    const val = parseFloat(editingWeightValue);
    if (!isNaN(val) && val > 0) {
      setRecipientsData(prev => prev.map(item => {
        if (item.id === id) {
          return { ...item, weight: val, weightLabel: `Bobot ${val}x` };
        }
        return item;
      }));
    }
    setEditingWeightId(null);
  };

  const handleAddCategory = () => {
    if (!newCategory.title.trim()) return;

    const newId = newCategory.title.toLowerCase().replace(/\s+/g, '-');

    setRecipientsData(prev => [
      ...prev,
      {
        id: newId,
        title: newCategory.title,
        weightLabel: newCategory.weightLabel,
        weight: newCategory.weight,
        icon: "person",
        count: 1,
        active: true,
      }
    ]);

    setNewCategory({ title: "", weightLabel: "Bobot 1x", weight: 1.0 });
    setIsModalOpen(false);
  };

  const updateCount = (id: string, delta: number) => {
    setRecipientsData(prev => prev.map(item => {
      if (item.id === id) {
        const newCount = Math.max(0, item.count + delta);
        return { ...item, count: newCount, active: newCount > 0 };
      }
      return item;
    }));
  };

  const toggleActive = (id: string) => {
    setRecipientsData(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, active: !item.active };
      }
      return item;
    }));
  };

  const handleLihatHasil = () => {
    localStorage.setItem('recipients_data', JSON.stringify(recipientsData));
  };

  return (
    <>
      <Header />

      <main className="max-w-md mx-auto px-6 pt-1 pb-[240px] relative">
        {/* Hero Section */}
        <section className="mb-5 text-center relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-secondary/5 rounded-full blur-3xl"></div>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-container text-on-primary-container rounded-2xl mb-6 shadow-xl">
            <span className="material-symbols-outlined text-4xl" data-icon="family_history" style={{ fontVariationSettings: "'FILL' 1" }}>family_history</span>
          </div>
          <h2 className="text-4xl font-headline font-bold text-primary mb-4">Siapa yang Dapat THR?</h2>
          <p className="text-on-surface-variant max-w-sm mx-auto">Tentukan jumlah penerima dan atur bobot pembagian untuk setiap kategori keluarga dan kerabat.</p>
        </section>

        {/* Ornamental Divider */}
        <div className="flex items-center justify-center gap-4 mb-5 opacity-30">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-secondary"></div>
          <span className="material-symbols-outlined text-secondary" data-icon="stars">stars</span>
          <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-secondary"></div>
        </div>

        {/* Recipient Grid */}
        <div className="grid grid-cols-1 gap-4">
          {recipientsData.map((item) => (
            <div
              key={item.id}
              className="rounded-xl p-6 relative overflow-hidden group bg-surface-container-lowest shadow-[0_20px_40px_rgba(212,160,23,0.06)] border-t-2 border-secondary/20"
            >
              {item.bgIcon && (
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span
                    className="material-symbols-outlined text-6xl"
                    data-icon={item.bgIcon}
                  >
                    {item.bgIcon}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg bg-primary/5"
                  >
                    <span
                      className="material-symbols-outlined text-primary-container"
                      data-icon={item.icon}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface">{item.title}</h3>
                    {distributionMode === 'equal' ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter bg-primary/10 text-primary">
                        Rata Rata
                      </span>
                    ) : editingWeightId === item.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="0.1"
                          step="0.5"
                          className="w-16 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-surface-container-high text-on-surface outline-none focus:ring-2 focus:ring-secondary transition-all"
                          value={editingWeightValue}
                          autoFocus
                          onChange={(e) => setEditingWeightValue(e.target.value)}
                          onBlur={() => commitEditWeight(item.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') commitEditWeight(item.id);
                            if (e.key === 'Escape') setEditingWeightId(null);
                          }}
                        />
                        <span className="text-[10px] text-on-surface-variant font-bold">x</span>
                      </div>
                    ) : item.weightLabel ? (
                      <button
                        onClick={() => startEditWeight(item.id, item.weight)}
                        title="Ketuk untuk ubah bobot"
                        className="flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter bg-surface-container-highest text-on-surface-variant hover:bg-secondary/20 hover:text-secondary transition-colors cursor-pointer"
                      >
                        {item.weightLabel}
                        <span className="material-symbols-outlined" style={{ fontSize: '10px' }} data-icon="edit">edit</span>
                      </button>
                    ) : null}
                  </div>
                </div>
                <div className="relative flex items-center justify-center">
                  <input
                    checked={item.active}
                    onChange={() => toggleActive(item.id)}
                    className="peer appearance-none w-6 h-6 rounded-md border-2 border-outline-variant bg-surface-container-highest checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 transition-all cursor-pointer m-0"
                    type="checkbox"
                  />
                  <span className="material-symbols-outlined absolute pointer-events-none text-on-primary text-[16px] opacity-0 peer-checked:opacity-100 transition-opacity font-bold" data-icon="check">
                    check
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between relative z-10">
                <span className="text-sm font-medium text-on-surface-variant">
                  Jumlah
                </span>
                <div
                  className="flex items-center rounded-lg p-1 bg-surface-container-low"
                >
                  <button
                    onClick={() => updateCount(item.id, -1)}
                    className="w-8 h-8 flex items-center justify-center rounded-md transition-all active:scale-95 text-primary-container hover:bg-primary/10"
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      data-icon="remove"
                    >
                      remove
                    </span>
                  </button>
                  <span className="w-10 text-center font-bold text-title-lg font-body">
                    {item.count}
                  </span>
                  <button
                    onClick={() => updateCount(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-md transition-all active:scale-95 text-primary-container hover:bg-primary/10"
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      data-icon="add"
                    >
                      add
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add Custom Category */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="bg-surface-container-low/30 rounded-xl p-6 border-2 border-dashed border-outline-variant/50 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-3xl text-outline" data-icon="add_circle">add_circle</span>
            <span className="text-sm font-bold text-outline uppercase tracking-wider">Tambah Kategori Lain</span>
          </div>
        </div>
      </main>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-scrim/40 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-outline-variant/20 relative animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-headline font-bold text-on-surface mb-6">Tambah Penerima Baru</h3>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Nama Kategori</label>
                <input
                  type="text"
                  className="w-full bg-surface-container-high text-on-surface rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary transition-all"
                  placeholder="Contoh: Sepupu, Tetangga"
                  value={newCategory.title}
                  onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Bobot Porsi</label>
                <div className="relative">
                  <select
                    className="w-full bg-surface-container-high text-on-surface rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary transition-all appearance-none"
                    value={newCategory.weight}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setNewCategory({ ...newCategory, weight: val, weightLabel: `Bobot ${val}x` });
                    }}
                  >
                    <option value={0.5}>0.5x (Setengah)</option>
                    <option value={1}>1x (Normal)</option>
                    <option value={2}>2x (Ganda)</option>
                    <option value={3}>3x (Tiga Kali)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" data-icon="expand_more">expand_more</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleAddCategory}
                disabled={!newCategory.title.trim()}
                className="flex-1 py-3 rounded-xl font-bold bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Est. Result Card */}
      <div className="fixed bottom-[112px] left-0 right-0 z-40 px-4 pointer-events-none">
        <div className="max-w-sm mx-auto w-full">
          <div className="bg-primary-container/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl flex items-center justify-between pointer-events-auto mx-auto w-full">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-on-primary-container/60 mb-1">Estimasi Alokasi</span>
              <div className="flex flex-col">
                <span className="text-on-primary-container font-headline font-bold text-xl">
                  Total {recipientsData.reduce((acc, curr) => curr.active ? acc + curr.count : acc, 0)} Orang
                </span>
              </div>
            </div>
            <Link href="/hasil" onClick={handleLihatHasil} className="bg-secondary-fixed-dim hover:bg-secondary text-on-secondary-fixed font-bold px-4 py-3 rounded-xl transition-all active:scale-95 shadow-lg flex items-center gap-1 flex-shrink-0">
              <span className="text-sm">Lihat Hasil</span>
              <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      <BottomNavBar />

      {/* Background Decoration */}
      <div className="fixed top-20 right-[-5%] w-64 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-20 left-[-5%] w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
    </>
  );
}
