import React from 'react';
import BottomNavBar from '@/app/components/BottomNavBar';

export default function HasilPage() {
  const resultData = [
    {
      id: 1,
      title: "Keluarga Inti",
      count: 5,
      amount: 500000,
      total: 2500000,
      icon: "family_history",
      iconBg: "bg-primary-container/10",
      iconColor: "text-primary",
      status: "Belum",
    },
    {
      id: 2,
      title: "Pekerja Rumah",
      count: 3,
      amount: 300000,
      total: 900000,
      icon: "home_repair_service",
      iconBg: "bg-secondary-fixed/30",
      iconColor: "text-secondary",
      status: "Sudah Dibagi",
    },
    {
      id: 3,
      title: "Keponakan",
      count: 15,
      amount: 100000,
      total: 1500000,
      icon: "card_giftcard",
      iconBg: "bg-tertiary-fixed/30",
      iconColor: "text-tertiary",
      status: "Belum",
    }
  ];

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <>
      {/* TopAppBar */}
      <header className="bg-surface/80 backdrop-blur-xl docked full-width top-0 sticky z-50 shadow-[0_20px_40px_rgba(246,190,57,0.06)]">
        <div className="flex justify-between items-center px-6 py-4 w-full">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary" data-icon="mosque">mosque</span>
            <h1 className="text-xl font-bold text-on-surface tracking-tight font-headline">Kalkulator THR</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:bg-primary/10 transition-colors p-2 rounded-full flex items-center justify-center active:scale-95 duration-150">
              <span className="material-symbols-outlined text-on-surface-variant" data-icon="notifications">notifications</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 pt-8 pb-32 space-y-8">
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
        <section className="relative bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 overflow-hidden">
          {/* Shimmer Gold Top Border */}
          <div className="grid grid-cols-3 gap-0 mb-6 divide-x divide-outline-variant/30">
            <div className="space-y-1 pr-2 text-center">
              <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant/70">Total Budget</p>
              <p className="text-sm md:text-base font-bold font-headline text-primary truncate">Rp 5.000.000</p>
            </div>
            <div className="space-y-1 px-2 text-center">
              <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant/70">Terbagi</p>
              <p className="text-sm md:text-base font-bold font-headline text-secondary truncate">Rp 5.150.000</p>
            </div>
            <div className="space-y-1 pl-2 text-center">
              <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant/70">Sisa</p>
              <p className="text-sm md:text-base font-bold font-headline text-error truncate">-Rp 150.000</p>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="relative w-full bg-surface-container-low rounded-full overflow-hidden h-1.5">
            <div className="absolute top-0 left-0 h-full bg-error w-full rounded-full"></div>
          </div>
          <p className="mt-2 text-[10px] text-right font-medium text-error">Over budget 103%</p>
        </section>

        {/* List of Result Cards */}
        <section className="space-y-4">
          <h3 className="text-xs font-label uppercase tracking-widest text-on-surface-variant/60 mb-2">Daftar Penerima</h3>
          
          {resultData.map((item) => (
            <div 
              key={item.id} 
              className={`rounded-xl p-5 shadow-sm flex items-center justify-between group ${item.status === 'Sudah Dibagi' ? 'bg-surface-container-low opacity-70 grayscale-[0.5]' : 'bg-surface-container-lowest'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center ${item.iconColor}`}>
                  <span className="material-symbols-outlined" data-icon={item.icon}>{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">{item.title}</h4>
                  <p className="text-xs text-on-surface-variant">{item.count} orang × {formatRupiah(item.amount)}</p>
                  <p className="text-sm font-bold text-primary mt-1">{formatRupiah(item.total)}</p>
                </div>
              </div>

              {item.status === 'Sudah Dibagi' ? (
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm" data-icon="check" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                  <span className="text-[9px] font-label uppercase text-primary font-bold">Sudah Dibagi</span>
                </div>
              ) : (
                <button className="flex flex-col items-center gap-1 group">
                  <div className="w-8 h-8 rounded-full border-2 border-outline-variant flex items-center justify-center text-outline-variant group-hover:border-secondary group-hover:text-secondary transition-all">
                    <span className="material-symbols-outlined text-sm" data-icon="check">check</span>
                  </div>
                  <span className="text-[9px] font-label uppercase text-outline-variant group-hover:text-secondary">Belum</span>
                </button>
              )}
            </div>
          ))}
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

      {/* Image for Decorative Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-5">
        <img 
          alt="Islamic geometric pattern background" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsS02D8eSgmFwVbcs8Rm72W1FxGE2xBZumM1yDp4QKuiWf2J0-OQRuHpqU9wERvKKa4EPbvVtFKVj6XVF1LJd-X5CoiHkYeD7CxPsXGMBK9bZqUejWmAWxoI73prMwQ_BDT2e0wVIchpaGvFAnRam80q54fzy4OXAmJBD_SyCABKrWBJ9ra_sXcmtv0Eq9nKxpl3jf5YS7T4SSiLGZn3kmFMgpDbitFrBr_K835fZgUs3lcVD373sMrPB9JkwCgNDrtta7vrelht0"
        />
      </div>
    </>
  );
}
