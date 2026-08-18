import React from 'react';
import { User, Phone, Building, Home, CheckCircle2, FileText, LogOut, ShieldCheck } from 'lucide-react';

export default function StudentProfile({ user, complaints = [], onLogout, onSwitchOfficer }) {
  const totalSubmitted = complaints.length;
  const totalResolved = complaints.filter(c => c.status === 'Completed').length;
  const totalPending = totalSubmitted - totalResolved;

  return (
    <div className="page-content">
      {/* Profile Header */}
      <div style={{ textAlign: 'center', margin: '10px 0 24px 0' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: '#ecfdf5',
          color: '#059669',
          border: '3px solid #a7f3d0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 10px auto',
          boxShadow: '0 4px 12px rgba(5,150,105,0.2)'
        }}>
          <User size={36} />
        </div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a' }}>
          {user?.name || 'Rahul Sharma'}
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>
          Student Resident • Hostel Block A
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="card" style={{ padding: '16px' }}>
        <h3 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          My Activity Summary
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
          <div style={{ backgroundColor: '#f8fafc', padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a' }}>{totalSubmitted}</div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Total</div>
          </div>
          <div style={{ backgroundColor: '#d1fae5', padding: '10px', borderRadius: '12px', border: '1px solid #6ee7b7' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#065f46' }}>{totalResolved}</div>
            <div style={{ fontSize: '0.7rem', color: '#065f46', fontWeight: 700 }}>Resolved</div>
          </div>
          <div style={{ backgroundColor: '#fef3c7', padding: '10px', borderRadius: '12px', border: '1px solid #fcd34d' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#92400e' }}>{totalPending}</div>
            <div style={{ fontSize: '0.7rem', color: '#92400e', fontWeight: 700 }}>Pending</div>
          </div>
        </div>
      </div>

      {/* Student Details Card */}
      <div className="card">
        <h3 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
          Student Account Details
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Phone size={16} style={{ color: '#059669' }} />
            <div>
              <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block' }}>MOBILE NUMBER</span>
              <strong style={{ color: '#0f172a' }}>+91 {user?.mobile || '9876543210'}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Building size={16} style={{ color: '#059669' }} />
            <div>
              <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block' }}>HOSTEL NAME</span>
              <strong style={{ color: '#0f172a' }}>{user?.hostel || 'Government Engineering College Hostel'}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Home size={16} style={{ color: '#059669' }} />
            <div>
              <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block' }}>ROOM / BLOCK</span>
              <strong style={{ color: '#0f172a' }}>{user?.room || 'Block A, Room 204'}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button className="btn-secondary" onClick={onSwitchOfficer}>
          <ShieldCheck size={18} style={{ color: '#2563eb' }} />
          <span>Switch to Officer Portal (Demo)</span>
        </button>

        <button className="btn-secondary" onClick={onLogout} style={{ color: '#dc2626', borderColor: '#fca5a5', backgroundColor: '#fef2f2' }}>
          <LogOut size={18} />
          <span>Logout Account</span>
        </button>
      </div>
    </div>
  );
}
