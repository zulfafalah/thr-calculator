import React from 'react';
import Link from 'next/link';
import BottomNavBar from '@/app/components/BottomNavBar';

export default function PenerimaPage() {
  const recipientsData = [
    {
      id: "orang-tua",
      title: "Orang Tua",
      weightLabel: "Bobot 3x",
      icon: "elderly",
      bgIcon: "diversity_3",
      count: 2,
      active: true,
      featured: true,
      disabled: false,
    },
    {
      id: "saudara",
      title: "Saudara Kandung",
      weightLabel: "Bobot 1x",
      icon: "family_restroom",
      count: 3,
      active: true,
      featured: false,
      disabled: false,
    },
    {
      id: "ponakan",
      title: "Ponakan",
      weightLabel: "Bobot 0.5x",
      icon: "child_care",
      count: 12,
      active: true,
      featured: false,
      disabled: false,
    },
    {
      id: "art",
      title: "Asisten Rumah Tangga",
      weightLabel: "Bobot 2x",
      icon: "home_work",
      count: 2,
      active: true,
      featured: false,
      disabled: false,
    },
    {
      id: "mertua",
      title: "Mertua",
      weightLabel: "",
      icon: "person_add",
      count: 0,
      active: false,
      featured: false,
      disabled: true,
    },
  ];

  return (
    <>
      {/* Top Navigation Shell */}
      <header className="bg-surface/80 backdrop-blur-xl docked full-width top-0 sticky z-50 flex justify-between items-center px-6 py-4 w-full">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary-container text-2xl" data-icon="mosque">mosque</span>
          <h1 className="text-xl font-bold text-on-surface tracking-tight font-headline">Kalkulator THR</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:bg-primary/10 transition-colors p-2 rounded-full">
            <span className="material-symbols-outlined text-on-surface-variant" data-icon="notifications">notifications</span>
          </button>
        </div>
      </header>
      
      <main className="max-w-md mx-auto px-6 pt-12 pb-[240px] relative">
        {/* Hero Section */}
        <section className="mb-12 text-center relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-secondary/5 rounded-full blur-3xl"></div>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-container text-on-primary-container rounded-2xl mb-6 shadow-xl">
            <span className="material-symbols-outlined text-4xl" data-icon="family_history" style={{ fontVariationSettings: "'FILL' 1" }}>family_history</span>
          </div>
          <h2 className="text-4xl font-headline font-bold text-primary mb-4">Siapa yang Dapat THR?</h2>
          <p className="text-on-surface-variant max-w-sm mx-auto">Tentukan jumlah penerima dan atur bobot pembagian untuk setiap kategori keluarga dan kerabat.</p>
        </section>

        {/* Weighted Mode Banner */}
        <div className="bg-surface-container-low rounded-xl p-4 mb-8 flex items-center justify-between shadow-sm border border-outline-variant/10">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary" data-icon="settings_suggest">settings_suggest</span>
            <div>
              <p className="text-sm font-bold text-on-surface tracking-tight">Mode Bobot Aktif</p>
              <p className="text-xs text-on-surface-variant">Atur porsi berbeda tiap kategori</p>
            </div>
          </div>
          <div className="w-12 h-6 bg-primary-container rounded-full relative p-1 cursor-pointer">
            <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
          </div>
        </div>

        {/* Ornamental Divider */}
        <div className="flex items-center justify-center gap-4 mb-10 opacity-30">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-secondary"></div>
          <span className="material-symbols-outlined text-secondary" data-icon="stars">stars</span>
          <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-secondary"></div>
        </div>

        {/* Recipient Grid */}
        <div className="grid grid-cols-1 gap-4">
          {recipientsData.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl p-6 relative overflow-hidden group ${
                item.disabled
                  ? "bg-surface-container-low/50 shadow-none border-t-2 border-outline-variant/30 opacity-60 grayscale"
                  : `bg-surface-container-lowest shadow-[0_20px_40px_rgba(212,160,23,0.06)] border-t-2 ${
                      item.featured ? "border-secondary" : "border-secondary/20"
                    }`
              }`}
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
                    className={`p-2 rounded-lg ${
                      item.disabled ? "bg-on-surface-variant/5" : "bg-primary/5"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined ${
                        item.disabled
                          ? "text-on-surface-variant"
                          : "text-primary-container"
                      }`}
                      data-icon={item.icon}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface">{item.title}</h3>
                    {item.weightLabel && (
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                          item.featured
                            ? "bg-secondary-fixed text-on-secondary-fixed"
                            : "bg-surface-container-highest text-on-surface-variant"
                        }`}
                      >
                        {item.weightLabel}
                      </span>
                    )}
                  </div>
                </div>
                <input
                  defaultChecked={item.active}
                  className="rounded-full w-5 h-5 text-primary-container border-outline-variant focus:ring-secondary transition-all"
                  type="checkbox"
                />
              </div>
              <div className="flex items-center justify-between relative z-10">
                <span className="text-sm font-medium text-on-surface-variant">
                  Jumlah
                </span>
                <div
                  className={`flex items-center rounded-lg p-1 ${
                    item.disabled
                      ? "bg-surface-container-high"
                      : "bg-surface-container-low"
                  }`}
                >
                  <button
                    className={`w-8 h-8 flex items-center justify-center rounded-md transition-all active:scale-95 ${
                      item.disabled
                        ? "text-on-surface-variant/30"
                        : "text-primary-container hover:bg-primary/10"
                    }`}
                    disabled={item.disabled}
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
                    className={`w-8 h-8 flex items-center justify-center rounded-md transition-all active:scale-95 ${
                      item.disabled
                        ? "text-on-surface-variant/30"
                        : "text-primary-container hover:bg-primary/10"
                    }`}
                    disabled={item.disabled}
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
          <div className="bg-surface-container-low/30 rounded-xl p-6 border-2 border-dashed border-outline-variant/50 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-3xl text-outline" data-icon="add_circle">add_circle</span>
            <span className="text-sm font-bold text-outline uppercase tracking-wider">Tambah Kategori Lain</span>
          </div>
        </div>
      </main>

      {/* Floating Est. Result Card */}
      <div className="fixed bottom-[112px] left-0 right-0 z-40 px-4 pointer-events-none">
        <div className="max-w-sm mx-auto w-full">
          <div className="bg-primary-container/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl flex items-center justify-between pointer-events-auto mx-auto w-full">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-on-primary-container/60 mb-1">Estimasi Alokasi</span>
              <div className="flex flex-col">
                <span className="text-on-primary-container font-headline font-bold text-xl">Total 19 Orang</span>
                <span className="text-secondary-fixed text-xs mt-0.5 opacity-90">• Est. Rp 450.000/org</span>
              </div>
            </div>
            <Link href="/hasil" className="bg-secondary-fixed-dim hover:bg-secondary text-on-secondary-fixed font-bold px-4 py-3 rounded-xl transition-all active:scale-95 shadow-lg flex items-center gap-1 flex-shrink-0">
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
