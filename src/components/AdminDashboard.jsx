import React from "react";
import AnalyticsOverview from "./AnalyticsOverview.jsx";

export default function AdminDashboard({
  projects,
  bids,
  contractors,
  onToggleContractorApproval,
  onResetAll
}) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-4 text-xl font-semibold text-slate-50">
        Admin Control Room (MVP)
      </h1>
      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <section className="space-y-4">
          <AnalyticsOverview
            projects={projects}
            bids={bids}
            contractors={contractors}
          />

          <div className="card text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100">
                EPC partners ({contractors.length})
              </h2>
              <button
                onClick={onResetAll}
                className="rounded-md border border-red-500/60 px-3 py-1 text-[11px] font-semibold text-red-300 hover:bg-red-500/10"
              >
                Danger: Reset local data
              </button>
            </div>
            <ul className="mt-2 space-y-2">
              {contractors.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/80 p-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-50">
                      {c.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {c.hq} • {c.focus}
                    </p>
                  </div>
                  <button
                    className={`rounded-md px-3 py-1 text-[11px] font-semibold ${
                      c.approved
                        ? "bg-slate-800 text-emerald-300 border border-emerald-500/40"
                        : "bg-emerald-500 text-slate-900"
                    }`}
                    onClick={() => onToggleContractorApproval(c.id)}
                  >
                    {c.approved ? "Revoke" : "Approve"}
                  </button>
                </li>
              ))}
              {contractors.length === 0 && (
                <p className="text-xs text-slate-400">
                  No contractors registered in this browser yet.
                </p>
              )}
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <div className="card">
            <h2 className="text-sm font-semibold text-slate-100">
              Activity stream (projects)
            </h2>
            <ul className="mt-2 max-h-72 space-y-2 overflow-y-auto text-xs sm:text-sm">
              {projects
                .slice()
                .reverse()
                .map((p) => (
                  <li
                    key={p.id}
                    className="rounded-lg border border-slate-800 bg-slate-950/80 p-3"
                  >
                    <p className="text-sm font-semibold text-slate-50">
                      {p.title}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {p.location} • {p.capacity} • {p.segment}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Model: {p.capexModel}
                    </p>
                  </li>
                ))}
              {projects.length === 0 && (
                <p className="text-xs text-slate-400">No projects yet.</p>
              )}
            </ul>
          </div>

          <div className="card">
            <h2 className="text-sm font-semibold text-slate-100">
              Activity stream (bids)
            </h2>
            <ul className="mt-2 max-h-72 space-y-2 overflow-y-auto text-xs sm:text-sm">
              {bids
                .slice()
                .reverse()
                .map((b) => (
                  <li
                    key={b.id}
                    className="rounded-lg border border-slate-800 bg-slate-950/80 p-3"
                  >
                    <p className="text-sm font-semibold text-slate-50">
                      Bid: ₹{b.quotedValueCr} Cr
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Project #{b.projectId} • Contractor #{b.contractorId}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      LCOE: ₹{b.lcoe}/kWh • {b.timelineMonths} months •{" "}
                      {b.status}
                    </p>
                  </li>
                ))}
              {bids.length === 0 && (
                <p className="text-xs text-slate-400">No bids yet.</p>
              )}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
