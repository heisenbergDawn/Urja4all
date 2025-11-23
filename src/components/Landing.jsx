import React from "react";

export default function Landing({ onSelectRole }) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-60px)] max-w-6xl flex-col items-center justify-center px-4 py-10">
      <div className="grid w-full gap-10 lg:grid-cols-2 lg:items-center">
        <section>
          <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
            C&I Rooftop • 50 kW – 5 MW
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
            Close solar EPC deals
            <span className="block text-accent">10x faster, zero capex.</span>
          </h1>
          <p className="mt-4 text-sm text-slate-300">
            URJA4all.in connects commercial & industrial energy consumers with vetted EPC partners across India on a performance-based 5% success fee—no retainers, no fluff.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => onSelectRole("owner")} className="btn-primary">I&apos;m a Project Owner</button>
            <button onClick={() => onSelectRole("contractor")} className="inline-flex items-center justify-center rounded-md border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800">I&apos;m an EPC Contractor</button>
          </div>
          <ul className="mt-6 space-y-2 text-xs text-slate-400">
            <li>• 50 kW – 5 MW rooftop and ground-mount</li>
            <li>• Pan-India C&I focus; utilities later</li>
            <li>• Browser-only MVP – for pilot validation</li>
          </ul>
        </section>

        <section className="space-y-4">
          <div className="card">
            <h2 className="text-sm font-semibold text-slate-100">How it works (Pilot)</h2>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-xs text-slate-300">
              <li>Project owners post basic requirements.</li>
              <li>Pre-approved EPCs submit structured bids.</li>
              <li>URJA4all.in curates bids and tracks outcomes for a 5% success fee.</li>
            </ol>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="card">
              <p className="text-[11px] text-slate-400">Ticket Size</p>
              <p className="text-sm font-semibold text-slate-50">₹25L – ₹10Cr</p>
            </div>
            <div className="card">
              <p className="text-[11px] text-slate-400">Pilot Target</p>
              <p className="text-sm font-semibold text-slate-50">3–5 deals / 90 days</p>
            </div>
            <div className="card">
              <p className="text-[11px] text-slate-400">Your Fee</p>
              <p className="text-sm font-semibold text-emerald-400">5% on closure</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
