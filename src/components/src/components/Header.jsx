import React from "react";

export default function Header({ currentRole, onRoleChange }) {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-accent text-xs font-bold text-slate-900">
            4
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight">URJA4all.in</div>
            <div className="text-[11px] text-slate-400">Democratizing India • Solar EPC</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="hidden text-slate-400 sm:inline">View as:</span>
          <select
            value={currentRole}
            onChange={(e) => onRoleChange(e.target.value)}
            className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-accent focus:outline-none"
          >
            <option value="landing">Landing</option>
            <option value="owner">Project Owner</option>
            <option value="contractor">EPC Contractor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
    </header>
  );
}
