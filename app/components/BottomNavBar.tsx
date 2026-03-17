"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 px-4 pointer-events-none">
      <div className="flex justify-around items-center w-full max-w-sm p-2 bg-surface-container-lowest rounded-2xl shadow-[0_8px_30px_rgba(212,160,23,0.12)] mx-auto pointer-events-auto border border-outline-variant/20">
        {/* Anggaran */}
        <Link href="/" className={`flex flex-col items-center justify-center rounded-xl px-4 py-2 transition-all w-20 ${pathname === '/' ? 'bg-primary-container text-on-primary-container scale-105' : 'text-on-surface-variant/70 hover:text-secondary'}`}>
          <span className="material-symbols-outlined text-xl" data-icon="account_balance_wallet" style={pathname === '/' ? { fontVariationSettings: "'FILL' 1" } : {}}>account_balance_wallet</span>
          <span className="text-[10px] font-label font-bold mt-1 tracking-wide">Dana</span>
        </Link>
        {/* Penerima */}
        <Link href="/penerima" className={`flex flex-col items-center justify-center rounded-xl px-4 py-2 transition-all w-20 ${pathname === '/penerima' ? 'bg-primary-container text-on-primary-container scale-105' : 'text-on-surface-variant/70 hover:text-secondary'}`}>
          <span className="material-symbols-outlined text-xl" data-icon="group" style={pathname === '/penerima' ? { fontVariationSettings: "'FILL' 1" } : {}}>group</span>
          <span className="text-[10px] font-label font-medium mt-1 tracking-wide">Penerima</span>
        </Link>
        {/* Hasil */}
        <Link href="/hasil" className={`flex flex-col items-center justify-center rounded-xl px-4 py-2 transition-all w-20 ${pathname === '/hasil' ? 'bg-primary-container text-on-primary-container scale-105' : 'text-on-surface-variant/70 hover:text-secondary'}`}>
          <span className="material-symbols-outlined text-xl" data-icon="checklist_rtl" style={pathname === '/hasil' ? { fontVariationSettings: "'FILL' 1" } : {}}>checklist_rtl</span>
          <span className="text-[10px] font-label font-medium mt-1 tracking-wide">Hasil</span>
        </Link>
      </div>
    </nav>
  );
}
