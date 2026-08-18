import React, { useState } from 'react';
import { ShieldCheck, Lock, ArrowLeft, Info } from 'lucide-react';

export default function OfficerLogin({ onLoginSuccess, onBackStudent }) {
  const [officerId, setOfficerId] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!officerId || !password) {
      setError('Please enter Officer ID and Password.');
      return;
    }
    if (officerId === 'admin' && password === 'admin123') {
      setError('');
      onLoginSuccess({ id: 'admin', name: 'Inspector V. K. Patel', dept: 'Hostel Sanitation & Sewage Care Unit' });
    } else {
      setError('Invalid Demo Credentials. Use admin / admin123');
    }
  };

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 120px)' }}>
      <div style={{ marginBottom: '16px' }}>
        <button className="icon-btn" onClick={onBackStudent}>
          <ArrowLeft size={18} />
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            backgroundColor: '#eff6ff',
            color: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto',
            border: '1px solid #bfdbfe'
          }}>
            <ShieldCheck size={32} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', textAlign: 'center' }}>
            Officer Portal
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', textAlign: 'center', marginTop: 2 }}>
            Municipal Sanitation & Sewage Management
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div style={{
          backgroundColor: '#ecfdf5',
          border: '1px solid #a7f3d0',
          padding: '12px 14px',
          borderRadius: '12px',
          fontSize: '0.82rem',
          color: '#047857',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, marginBottom: 2 }}>
            <Info size={15} /> Demo Authentication
          </div>
          <span>Officer ID: <strong>admin</strong> | Password: <strong>admin123</strong></span>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            padding: '10px 14px',
            borderRadius: '10px',
            fontSize: '0.82rem',
            fontWeight: '600',
            marginBottom: '16px',
            border: '1px solid #fca5a5'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Officer ID</label>
            <input
              type="text"
              className="form-input"
              value={officerId}
              onChange={(e) => setOfficerId(e.target.value)}
              placeholder="e.g. admin"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="btn-primary" style={{ backgroundColor: '#2563eb', backgroundImage: 'linear-gradient(135deg, #2563eb, #1d4ed8)', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}>
            Login as Officer
          </button>
        </form>
      </div>
    </div>
  );
}
