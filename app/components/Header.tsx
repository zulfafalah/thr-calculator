import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 w-full bg-surface/80 backdrop-blur-xl docked full-width top-0 sticky z-50">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-primary text-2xl" data-icon="mosque">mosque</span>
        <h1 className="text-xl font-bold text-on-surface tracking-tight font-headline">Kalkulator THR</h1>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/tentang" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors active:scale-95 duration-150">
          <span className="material-symbols-outlined" data-icon="info">info</span>
        </Link>
      </div>
    </header>
  );
}
