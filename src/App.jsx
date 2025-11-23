import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Landing from "./components/Landing.jsx";
import ProjectOwnerDashboard from "./components/ProjectOwnerDashboard.jsx";
import ContractorDashboard from "./components/ContractorDashboard.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import { Toast } from "./components/Toast.jsx";

const STORAGE_KEY = "urja4all_mvp_v1";

function loadState() {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveState(state) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export default function App() {
  const [role, setRole] = useState("landing");
  const [projects, setProjects] = useState([]);
  const [bids, setBids] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "success" });

  useEffect(() => {
    const stored = loadState();
    if (stored) {
      setProjects(stored.projects || []);
      setBids(stored.bids || []);
      setContractors(stored.contractors || []);
    }
  }, []);

  useEffect(() => {
    saveState({ projects, bids, contractors });
  }, [projects, bids, contractors]);

  useEffect(() => {
    if (!toast.message) return;
    const t = setTimeout(() => setToast({ message: "", type: "success" }), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  function notify(message, type = "success") {
    setToast({ message, type });
  }

  function createProject(data) {
    const id = Date.now().toString();
    setProjects((prev) => [...prev, { id, ...data, createdAt: new Date().toISOString() }]);
    notify("Project posted.");
  }

  function registerContractor(data) {
    const id = Date.now().toString();
    setContractors((prev) => [...prev, { id, ...data, approved: false, createdAt: new Date().toISOString() }]);
    notify("Contractor profile saved (pending admin approval).");
    return id;
  }

  function submitBid(data) {
    const id = Date.now().toString();
    setBids((prev) => [...prev, { id, ...data, status: "Submitted", createdAt: new Date().toISOString() }]);
    notify("Bid submitted.");
  }

  function toggleContractorApproval(id) {
    setContractors((prev) => prev.map((c) => (c.id === id ? { ...c, approved: !c.approved } : c)));
    notify("Contractor approval updated.");
  }

  function resetAll() {
    if (!window.confirm("This will clear local data for this browser. Continue?")) return;
    setProjects([]);
    setBids([]);
    setContractors([]);
    saveState({ projects: [], bids: [], contractors: [] });
    notify("Local data cleared.", "warning");
  }

  let content;
  if (role === "owner") {
    content = (
      <ProjectOwnerDashboard
        projects={projects}
        bids={bids}
        contractors={contractors}
        onCreateProject={createProject}
      />
    );
  } else if (role === "contractor") {
    content = (
      <ContractorDashboard
        projects={projects}
        contractors={contractors}
        contractorId={null}
        onContractorRegister={registerContractor}
        onSubmitBid={submitBid}
        bids={bids}
      />
    );
  } else if (role === "admin") {
    content = (
      <AdminDashboard
        projects={projects}
        bids={bids}
        contractors={contractors}
        onToggleContractorApproval={toggleContractorApproval}
        onResetAll={resetAll}
      />
    );
  } else {
    content = <Landing onSelectRole={setRole} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <Header currentRole={role} onRoleChange={setRole} />
      {content}
      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}
