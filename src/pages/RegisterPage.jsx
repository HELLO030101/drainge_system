import React, { useState } from 'react';
import { ArrowLeft, User, Phone, Building, Home, Lock } from 'lucide-react';

export default function RegisterPage({ onRegisterSuccess, onGoLogin }) {
  const [formData, setFormData] = useState({
    name: 'Rahul Sharma',
    mobile: '9876543210',
    hostelName: 'Government Engineering College Hostel',
    roomNo: 'A-204',
    password: 'password',
    confirmPassword: 'password'
  });
  const [error, setError] = useState('');

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.hostelName) {
      setError('Please fill in all required fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    onRegisterSuccess({
      name: formData.name,
      mobile: formData.mobile,
      hostel: formData.hostelName,
      room: formData.roomNo
    });
  };

  return (
    <div className="page-content">
      <div style={{ marginBottom: '16px' }}>
        <button className="icon-btn" onClick={onGoLogin} title="Back to login">
          <ArrowLeft size={18} />
        </button>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
          Create Student Account
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
          Register to report hostel drainage issues
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
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter full name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Mobile Number *</label>
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
              value={formData.mobile}
              onChange={(e) => handleChange('mobile', e.target.value)}
              maxLength={10}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Hostel Name *</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Government Engineering College Hostel"
            value={formData.hostelName}
            onChange={(e) => handleChange('hostelName', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Room / Block Number</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Block A, Room 204"
            value={formData.roomNo}
            onChange={(e) => handleChange('roomNo', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password *</label>
          <input
            type="password"
            className="form-input"
            placeholder="Create password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Confirm Password *</label>
          <input
            type="password"
            className="form-input"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '10px', marginBottom: '20px' }}>
          Create Account
        </button>
      </form>

      <div style={{ textAlign: 'center', fontSize: '0.88rem', color: '#64748b' }}>
        Already have an account?{' '}
        <button className="link-btn" style={{ fontSize: '0.88rem' }} onClick={onGoLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
