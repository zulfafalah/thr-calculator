import React from "react";

export default function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 px-4 pointer-events-none">
      <div className="flex justify-around items-center w-full max-w-sm p-2 bg-surface-container-lowest rounded-2xl shadow-[0_8px_30px_rgba(212,160,23,0.12)] mx-auto pointer-events-auto border border-outline-variant/20">
        {/* Anggaran (Active) */}
        <button className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-4 py-2 scale-105 transition-all w-20">
          <span className="material-symbols-outlined text-xl" data-icon="account_balance_wallet" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
          <span className="text-[10px] font-label font-bold mt-1 tracking-wide">Dana</span>
        </button>
        {/* Penerima */}
        <button className="flex flex-col items-center justify-center text-on-surface-variant/70 px-4 py-2 hover:text-secondary transition-colors w-20">
          <span className="material-symbols-outlined text-xl" data-icon="group">group</span>
          <span className="text-[10px] font-label font-medium mt-1 tracking-wide">Penerima</span>
        </button>
        {/* Hasil */}
        <button className="flex flex-col items-center justify-center text-on-surface-variant/70 px-4 py-2 hover:text-secondary transition-colors w-20">
          <span className="material-symbols-outlined text-xl" data-icon="checklist_rtl">checklist_rtl</span>
          <span className="text-[10px] font-label font-medium mt-1 tracking-wide">Hasil</span>
        </button>
      </div>
    </nav>
  );
}
