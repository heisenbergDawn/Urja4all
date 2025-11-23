import React from "react";

export default function ProjectList({ projects, bids, highlightProjectId, onSelectProject }) {
  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-100">Active projects ({projects.length})</h2>
      </div>
      {projects.length === 0 && <p className="text-xs text-slate-400">No projects yet. Post your first requirement to start receiving bids.</p>}
      <ul className="space-y-3 text-xs sm:text-sm">
        {projects.map((p) => {
          const projectBids = bids.filter((b) => b.projectId === p.id);
          const isHighlighted = highlightProjectId === p.id;
          return (
            <li key={p.id} className={`rounded-lg border border-slate-800 bg-slate-900/80 p-3 ${isHighlighted ? "ring-1 ring-accent" : ""}`} onClick={() => onSelectProject?.(p.id)}>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-100">{p.title}</p>
                  <p className="text-[11px] text-slate-400">{p.location} • {p.capacity} • {p.segment}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-slate-400">{p.capexModel}</p>
                  <p className="text-[11px] text-emerald-400">{projectBids.length} bids</p>
                </div>
              </div>
              {p.notes && <p className="mt-2 text-[11px] text-slate-300">{p.notes}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
