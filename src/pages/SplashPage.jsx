import React from 'react';
import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function SplashPage({ onStartStudent, onStartOfficer }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 20px',
      background: 'linear-gradient(180deg, #ffffff 0%, #ecfdf5 50%, #d1fae5 100%)',
      textAlign: 'center'
    }}>
      {/* Top Branding Header */}
      <div style={{ paddingTop: '20px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#ecfdf5',
          color: '#047857',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '0.78rem',
          fontWeight: '700',
          border: '1px solid #a7f3d0',
          marginBottom: '14px'
        }}>
          <Sparkles size={14} /> Social Internship Project
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
          Drain<span style={{ color: '#059669' }}>Care</span>
        </h1>
        <p style={{ fontSize: '0.92rem', color: '#334155', fontWeight: '600', marginTop: '4px', maxWidth: '320px', margin: '4px auto 0 auto' }}>
          Smart Drainage Complaint & Municipal Service System
        </p>
      </div>

      {/* Sanitation Sewage Tanker Illustration */}
      <div style={{ margin: '20px auto', width: '100%', maxWidth: '320px' }}>
        <svg viewBox="0 0 400 300" width="100%" height="auto" style={{ filter: 'drop-shadow(0 10px 15px rgba(5,150,105,0.15))' }}>
          {/* Background circle */}
          <circle cx="200" cy="150" r="130" fill="#a7f3d0" opacity="0.3" />
          
          {/* Hostel Building Background */}
          <rect x="50" y="70" width="110" height="150" rx="8" fill="#94a3b8" opacity="0.4" />
          <rect x="65" y="90" width="20" height="25" rx="3" fill="#ffffff" />
          <rect x="100" y="90" width="20" height="25" rx="3" fill="#ffffff" />
          <rect x="65" y="130" width="20" height="25" rx="3" fill="#ffffff" />
          <rect x="100" y="130" width="20" height="25" rx="3" fill="#ffffff" />

          {/* Road */}
          <rect x="20" y="210" width="360" height="20" rx="4" fill="#334155" />
          <line x1="40" y1="220" x2="360" y2="220" stroke="#ffffff" strokeWidth="3" strokeDasharray="15,10" />

          {/* Sewage Tanker Body */}
          <rect x="120" y="130" width="160" height="70" rx="35" fill="url(#tankerGrad)" />
          <rect x="260" y="145" width="55" height="55" rx="8" fill="#047857" />
          
          {/* Tanker Details */}
          <rect x="140" y="140" width="120" height="10" rx="5" fill="#ffffff" opacity="0.4" />
          <text x="200" y="172" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#ffffff" textAnchor="middle">DRAIN CARE</text>
          
          {/* Wheels */}
          <circle cx="160" cy="210" r="18" fill="#0f172a" stroke="#cbd5e1" strokeWidth="4" />
          <circle cx="230" cy="210" r="18" fill="#0f172a" stroke="#cbd5e1" strokeWidth="4" />
          <circle cx="290" cy="210" r="18" fill="#0f172a" stroke="#cbd5e1" strokeWidth="4" />
          
          {/* Green Leaf Badge */}
          <circle cx="285" cy="165" r="12" fill="#ffffff" />
          <path d="M 285 158 C 290 162 290 170 285 172 C 280 170 280 162 285 158 Z" fill="#10b981" />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="tankerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Tagline & Action Buttons */}
      <div>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#047857', marginBottom: '20px' }}>
          Cleaner Drains, Healthier Hostels 🌱
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '360px', margin: '0 auto' }}>
          <button className="btn-primary" onClick={onStartStudent}>
            <span>Student Portal</span>
            <ArrowRight size={18} />
          </button>

          <button className="btn-secondary" onClick={onStartOfficer} style={{ backgroundColor: '#ffffff' }}>
            <ShieldCheck size={18} style={{ color: '#059669' }} />
            <span>Officer Login</span>
          </button>
        </div>

        <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '18px' }}>
          College Social Internship Sanitation & Civic Technology Initiative
        </p>
      </div>
    </div>
  );
}
