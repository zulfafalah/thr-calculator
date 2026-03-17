"use client";

import React from 'react';
import Link from 'next/link';
import BottomNavBar from '@/app/components/BottomNavBar';
import Header from '@/app/components/Header';

export default function TentangPage() {
  return (
    <>
      <Header />
      <main className="w-full max-w-md px-6 pt-4 pb-32 flex flex-col gap-6">

        {/* Hero */}
        <section className="relative pt-8 text-center overflow-hidden">
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center shadow-[0_4px_20px_rgba(212,160,23,0.25)]">
              <span
                className="material-symbols-outlined text-[32px] text-on-primary-container"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >mosque</span>
            </div>
            <h2 className="text-2xl font-headline font-bold text-on-surface">Kalkulator THR</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-xs text-center">
              Alat bantu sederhana untuk menghitung dan mendistribusikan Tunjangan Hari Raya (THR) secara adil dan merata sesuai prioritas.
            </p>
          </div>
        </section>

        {/* Tentang Proyek */}
        <section className="flex flex-col gap-3">
          <h3 className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant/60 px-1">Tentang Proyek</h3>
          <div className="bg-surface-container rounded-2xl p-5 flex flex-col gap-3 border border-outline-variant/20">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-xl mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
              <p className="text-sm text-on-surface leading-relaxed">
                Kalkulator THR membantu kamu merencanakan pemberian THR kepada keluarga, karyawan, atau orang-orang terkasih — dengan hasil yang adil, transparan, dan mudah dibagikan.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary text-xl mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>currency_exchange</span>
              <p className="text-sm text-on-surface leading-relaxed">
                Masukkan total anggaran, atur daftar penerima beserta bobotnya, lalu lihat hasil distribusi secara instan — bisa dibulatkan sesuai kebutuhan.
              </p>
            </div>
          </div>
        </section>

        {/* Mekanisme Perhitungan */}
        <section className="flex flex-col gap-3">
          <h3 className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant/60 px-1">Mekanisme Perhitungan</h3>

          {/* Mode Berbobot */}
          <div className="bg-surface-container rounded-2xl p-5 flex flex-col gap-4 border border-outline-variant/20">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-sm text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>balance</span>
              </div>
              <span className="font-semibold text-on-surface text-sm">Mode Berbobot</span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Setiap kategori penerima diberi <strong className="text-on-surface">bobot</strong> (misal: Anak Kandung = 4, Keponakan = 2). THR dihitung proporsional terhadap total skor bobot.
            </p>

            {/* Formula */}
            <div className="bg-surface-container-highest rounded-xl p-4 flex flex-col gap-2 border border-outline-variant/10">
              <p className="text-[11px] font-label text-on-surface-variant/70 uppercase tracking-widest mb-1">Formula</p>
              {/* Total Score */}
              <div className="text-sm font-mono text-on-surface">
                <span className="text-primary font-bold">total_skor</span>
                <span className="text-on-surface-variant"> = Σ (bobot</span>
                <sub className="text-[10px] text-on-surface-variant">i</sub>
                <span className="text-on-surface-variant"> × jumlah</span>
                <sub className="text-[10px] text-on-surface-variant">i</sub>
                <span className="text-on-surface-variant">)</span>
              </div>
              {/* Per person */}
              <div className="text-sm font-mono text-on-surface mt-1">
                <span className="text-secondary font-bold">thr_per_orang</span>
                <sub className="text-[10px] text-on-surface-variant">i</sub>
                <span className="text-on-surface-variant"> = anggaran × (bobot</span>
                <sub className="text-[10px] text-on-surface-variant">i</sub>
                <span className="text-on-surface-variant"> ÷ total_skor)</span>
              </div>
            </div>

            {/* Contoh */}
            <div className="flex flex-col gap-1.5">
              <p className="text-[11px] font-label text-on-surface-variant/70 uppercase tracking-widest">Contoh</p>
              <div className="flex flex-col gap-1 text-sm text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Anggaran</span>
                  <span className="font-mono text-on-surface">Rp 1.000.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Anak Kandung (bobot 4, 2 orang)</span>
                  <span className="font-mono text-on-surface">skor 8</span>
                </div>
                <div className="flex justify-between">
                  <span>Keponakan (bobot 2, 3 orang)</span>
                  <span className="font-mono text-on-surface">skor 6</span>
                </div>
                <div className="border-t border-outline-variant/20 pt-1 flex justify-between">
                  <span>Total skor</span>
                  <span className="font-mono text-on-surface">14</span>
                </div>
                <div className="flex justify-between text-primary font-medium">
                  <span>THR / Anak Kandung</span>
                  <span className="font-mono">Rp {Math.round(1000000 * 4 / 14).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-secondary font-medium">
                  <span>THR / Keponakan</span>
                  <span className="font-mono">Rp {Math.round(1000000 * 2 / 14).toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mode Rata-rata */}
          <div className="bg-surface-container rounded-2xl p-5 flex flex-col gap-3 border border-outline-variant/20">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-secondary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>equal</span>
              </div>
              <span className="font-semibold text-on-surface text-sm">Mode Rata-rata</span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Semua penerima mendapat jumlah yang sama tanpa mempertimbangkan bobot. Cocok jika kamu ingin distribusi yang benar-benar merata.
            </p>
            <div className="bg-surface-container-highest rounded-xl p-4 border border-outline-variant/10">
              <p className="text-[11px] font-label text-on-surface-variant/70 uppercase tracking-widest mb-2">Formula</p>
              <div className="text-sm font-mono text-on-surface">
                <span className="text-secondary font-bold">thr_per_orang</span>
                <span className="text-on-surface-variant"> = anggaran ÷ total_orang</span>
              </div>
            </div>
          </div>

          {/* Pembulatan */}
          <div className="bg-surface-container rounded-2xl p-5 flex flex-col gap-3 border border-outline-variant/20">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-tertiary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-sm text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>tune</span>
              </div>
              <span className="font-semibold text-on-surface text-sm">Pembulatan & Penyesuaian</span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Jika pembulatan diaktifkan (misal kelipatan Rp 5.000), nilai THR per orang dibulatkan ke kelipatan tersebut. Selisih sisa anggaran akibat pembulatan didistribusikan ke kategori dengan bobot tertinggi agar total tetap sesuai anggaran.
            </p>
          </div>
        </section>

        {/* Open Source */}
        <section className="flex flex-col gap-3">
          <h3 className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant/60 px-1">Kode Sumber</h3>
          <a
            href="https://github.com/zulfafalah/thr-calculator"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface-container rounded-2xl p-5 flex items-center gap-4 border border-outline-variant/20 hover:border-primary/40 hover:bg-primary/5 transition-all active:scale-[0.98] duration-150 group"
          >
            <div className="w-12 h-12 rounded-xl bg-on-surface/5 flex items-center justify-center flex-shrink-0">
              {/* GitHub icon via SVG */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-on-surface" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297C5.37.297 0 5.667 0 12.297c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.614-4.033-1.614-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.468-2.382 1.235-3.22-.123-.305-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.871.12 3.176.77.838 1.233 1.91 1.233 3.22 0 4.61-2.805 5.622-5.476 5.92.43.371.823 1.103.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.667 18.627.297 12 .297z"/>
              </svg>
            </div>
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="font-semibold text-on-surface text-sm">zulfafalah/thr-calculator</span>
              <span className="text-xs text-on-surface-variant truncate">github.com/zulfafalah/thr-calculator</span>
              <span className="text-xs text-primary group-hover:underline mt-1">Lihat kode sumber →</span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant/50 text-xl flex-shrink-0">open_in_new</span>
          </a>
          <p className="text-xs text-on-surface-variant/60 text-center px-2">
            Proyek ini bersifat <strong>open source</strong>. Kontribusi, saran, dan laporan bug sangat disambut melalui GitHub.
          </p>
        </section>

      </main>
      <BottomNavBar />
    </>
  );
}
