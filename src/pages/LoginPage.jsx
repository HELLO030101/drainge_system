import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Phone, ArrowLeft } from 'lucide-react';

export default function LoginPage({ onLoginSuccess, onGoRegister, onBackSplash }) {
  const [mobile, setMobile] = useState('9876543210');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mobile || mobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    setError('');
    onLoginSuccess({ mobile, name: 'Rahul Sharma', hostel: 'Government Engineering College Hostel' });
  };

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 120px)' }}>
      {/* Top back navigation */}
      <div style={{ marginBottom: '20px' }}>
        <button className="icon-btn" onClick={onBackSplash} title="Back to splash">
          <ArrowLeft size={18} />
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
            Welcome Back!
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#64748b' }}>
            Login to continue to DrainCare
          </p>
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
          {/* Mobile Number Input */}
          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{
                backgroundColor: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRight: 'none',
                padding: '12px 14px',
                borderRadius: '12px 0 0 12px',
                fontSize: '0.92rem',
                fontWeight: '700',
                color: '#334155'
              }}>
                +91
              </span>
              <input
                type="tel"
                className="form-input"
                style={{ borderRadius: '0 12px 12px 0' }}
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                maxLength={10}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                style={{ paddingRight: '42px' }}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div style={{ textAlign: 'right', marginBottom: '24px' }}>
            <button
              type="button"
              className="link-btn"
              onClick={() => alert('Demo Reset Link sent to mobile!')}
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-primary" style={{ marginBottom: '20px' }}>
            Login
          </button>
        </form>

        {/* Register Switch */}
        <div style={{ textAlign: 'center', fontSize: '0.88rem', color: '#64748b' }}>
          Don't have an account?{' '}
          <button className="link-btn" style={{ fontSize: '0.88rem' }} onClick={onGoRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
