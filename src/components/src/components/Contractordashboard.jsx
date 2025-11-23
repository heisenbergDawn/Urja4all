import React, { useState } from "react";

export default function ContractorDashboard({
  projects,
  contractors,
  contractorId,
  onContractorRegister,
  onSubmitBid,
  bids
}) {
  const [selectedContractorId, setSelectedContractorId] = useState(
    contractorId || null
  );
  const [contractorForm, setContractorForm] = useState({
    name: "",
    hq: "",
    focus: "50 kW – 1 MW rooftop",
    approved: false
  });
  const [bidForm, setBidForm] = useState({
    projectId: "",
    quotedValueCr: "",
    lcoe: "",
    timelineMonths: "",
    notes: ""
  });

  const myContractor = contractors.find((c) => c.id === selectedContractorId);
  const myBids = bids.filter((b) => b.contractorId === selectedContractorId);

  function handleContractorChange(e) {
    const { name, value } = e.target;
    setContractorForm((f) => ({ ...f, [name]: value }));
  }

  function handleContractorSubmit(e) {
    e.preventDefault();
    if (!contractorForm.name || !contractorForm.hq) return;
    const id = onContractorRegister(contractorForm);
    setSelectedContractorId(id);
  }

  function handleBidChange(e) {
    const { name, value } = e.target;
    setBidForm((f) => ({ ...f, [name]: value }));
  }

  function handleBidSubmit(e) {
    e.preventDefault();
    if (!selectedContractorId || !bidForm.projectId || !bidForm.quotedValueCr)
      return;
    onSubmitBid({
      ...bidForm,
      contractorId: selectedContractorId
    });
    setBidForm({
      projectId: "",
      quotedValueCr: "",
      lcoe: "",
      timelineMonths: "",
      notes: ""
    });
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-4 text-xl font-semibold text-slate-50">
        EPC Contractor Workspace
      </h1>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <section className="space-y-4">
          {!myContractor && (
            <form
              onSubmit={handleContractorSubmit}
              className="card space-y-3 text-xs sm:text-sm"
            >
              <h2 className="text-sm font-semibold text-slate-100">
                Register as EPC partner (pilot)
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] text-slate-400">
                    Company / firm name
                  </label>
                  <input
                    className="input"
                    name="name"
                    value={contractorForm.name}
                    onChange={handleContractorChange}
                    placeholder="e.g. XYZ Solar EPC"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400">
                    HQ / primary city
                  </label>
                  <input
                    className="input"
                    name="hq"
                    value={contractorForm.hq}
                    onChange={handleContractorChange}
                    placeholder="e.g. Delhi NCR"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-slate-400">
                  Focus segment
                </label>
                <select
                  className="input"
                  name="focus"
                  value={contractorForm.focus}
                  onChange={handleContractorChange}
                >
                  <option>50 kW – 1 MW rooftop</option>
                  <option>1 – 5 MW rooftop / ground</option>
                  <option>Utility scale &gt; 5 MW</option>
                </select>
              </div>
              <button type="submit" className="btn-primary">
                Save profile
              </button>
            </form>
          )}

          {myContractor && (
            <div className="card text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-slate-100">
                    {myContractor.name}
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    {myContractor.hq} • {myContractor.focus}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                    myContractor.approved
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                      : "bg-amber-500/10 text-amber-300 border border-amber-500/40"
                  }`}
                >
                  {myContractor.approved ? "Approved" : "Pending approval"}
                </span>
              </div>
            </div>
          )}

          <form
            onSubmit={handleBidSubmit}
            className="card space-y-3 text-xs sm:text-sm"
          >
            <h2 className="text-sm font-semibold text-slate-100">
              Submit a bid
            </h2>
            <div>
              <label className="block text-[11px] text-slate-400">
                Project
              </label>
              <select
                className="input"
                name="projectId"
                value={bidForm.projectId}
                onChange={handleBidChange}
              >
                <option value="">Select project</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} • {p.location} • {p.capacity}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-[11px] text-slate-400">
                  Bid value (₹ Cr)
                </label>
                <input
                  className="input"
                  name="quotedValueCr"
                  value={bidForm.quotedValueCr}
                  onChange={handleBidChange}
                  placeholder="e.g. 1.8"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400">
                  LCOE (₹/kWh)
                </label>
                <input
                  className="input"
                  name="lcoe"
                  value={bidForm.lcoe}
                  onChange={handleBidChange}
                  placeholder="e.g. 3.5"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400">
                  Timeline (months)
                </label>
                <input
                  className="input"
                  name="timelineMonths"
                  value={bidForm.timelineMonths}
                  onChange={handleBidChange}
                  placeholder="e.g. 4"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] text-slate-400">
                Notes (brief scope, warranties, etc.)
              </label>
              <textarea
                className="input min-h-[70px]"
                name="notes"
                value={bidForm.notes}
                onChange={handleBidChange}
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              disabled={!selectedContractorId}
            >
              Submit bid
            </button>
          </form>
        </section>

        <section className="space-y-4">
          <div className="card">
            <h2 className="text-sm font-semibold text-slate-100">
              Live C&I opportunities ({projects.length})
            </h2>
            <ul className="mt-2 space-y-2 text-xs sm:text-sm">
              {projects.map((p) => (
                <li
