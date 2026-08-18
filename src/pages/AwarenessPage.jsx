import React from 'react';
import { ArrowLeft, Trash2, AlertTriangle, ShieldCheck, Droplets, Info, Sparkles } from 'lucide-react';

export default function AwarenessPage({ onBack }) {
  const tips = [
    {
      id: 1,
      title: "Don't Throw Solid Waste Into Drains",
      desc: "Avoid disposing plastic wrappers, sanitary products, or food leftover into bathroom or mess drains. Solid waste creates severe pipe blockages.",
      icon: Trash2,
      color: "#dc2626",
      bg: "#fee2e2"
    },
    {
      id: 2,
      title: "Report Sewage Leakage Early",
      desc: "Detecting small drain leaks or foul odors early prevents major wastewater overflow into hostel living quarters and mess dining areas.",
      icon: AlertTriangle,
      color: "#d97706",
      bg: "#fef3c7"
    },
    {
      id: 3,
      title: "Keep Manhole Covers Obstruct-Free",
      desc: "Do not stack sports gear, bicycle racks, or garbage bags on top of hostel drainage manhole chambers. Maintenance tankers need 24/7 access.",
      icon: ShieldCheck,
      color: "#059669",
      bg: "#ecfdf5"
    },
    {
      id: 4,
      title: "Avoid Plastic Bags in Drainage Lines",
      desc: "Single-use polythene bags damage suction tanker pumps and cause long drainage resolution delays during heavy rainfall.",
      icon: Info,
      color: "#2563eb",
      bg: "#eff6ff"
    },
    {
      id: 5,
      title: "Prevent Stagnant Water Mosquito Hazards",
      desc: "Stagnant sewage water creates breeding grounds for Dengue and Malaria. Report standing wastewater to the municipal team immediately.",
      icon: Droplets,
      color: "#9333ea",
      bg: "#f3e8ff"
    }
  ];

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>
          Sanitation Awareness
        </h2>
        <div style={{ width: 36 }} />
      </div>

      {/* Hero Tip Card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #059669, #047857)', color: 'white', border: 'none', borderRadius: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 700, opacity: 0.9, marginBottom: 4 }}>
          <Sparkles size={14} /> Cleaner Drains, Healthier Hostels 🌱
        </div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', lineHeight: 1.25, marginBottom: '6px' }}>
          Drainage & Sanitation Care
        </h3>
        <p style={{ fontSize: '0.8rem', opacity: 0.9, lineHeight: 1.4 }}>
          Small daily habits in hostel blocks keep our campus clean, odor-free, and safe from disease vectors.
        </p>
      </div>

      {/* Awareness Tips List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {tips.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="card" style={{ padding: '16px', margin: 0 }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: item.bg,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
