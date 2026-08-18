import React from 'react';
import { ShieldCheck, UserCheck, MapPin, Building, LogOut, Award } from 'lucide-react';

export default function OfficerProfile({ officer, onLogout, onSwitchStudent }) {
  return (
    <div className="page-content">
      <div style={{ textAlign: 'center', margin: '10px 0 24px 0' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: '#eff6ff',
          color: '#2563eb',
          border: '3px solid #bfdbfe',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 10px auto',
          boxShadow: '0 4px 12px rgba(37,99,235,0.2)'
        }}>
          <ShieldCheck size={40} />
        </div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a' }}>
          {officer?.name || 'Inspector V. K. Patel'}
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 700 }}>
          Senior Municipal Sanitation Inspector
        </p>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
          Officer Credentials & Department
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={16} style={{ color: '#2563eb' }} />
            <div>
              <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block' }}>OFFICER ID</span>
              <strong style={{ color: '#0f172a' }}>{officer?.id || 'admin'} (Municipal Badge #4092)</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Building size={16} style={{ color: '#2563eb' }} />
            <div>
              <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block' }}>DEPARTMENT</span>
              <strong style={{ color: '#0f172a' }}>Hostel Sanitation & Wastewater Care Unit</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MapPin size={16} style={{ color: '#2563eb' }} />
            <div>
              <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block' }}>ASSIGNED JURISDICTION</span>
              <strong style={{ color: '#0f172a' }}>Government College Hostel Complex (Sector 28)</strong>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button className="btn-secondary" onClick={onSwitchStudent}>
          <UserCheck size={18} style={{ color: '#059669' }} />
          <span>Switch to Student Portal (Demo)</span>
        </button>

        <button className="btn-secondary" onClick={onLogout} style={{ color: '#dc2626', borderColor: '#fca5a5', backgroundColor: '#fef2f2' }}>
          <LogOut size={18} />
          <span>Logout Officer Account</span>
        </button>
      </div>
    </div>
  );
}
