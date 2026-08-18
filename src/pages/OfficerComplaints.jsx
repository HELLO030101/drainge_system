import React, { useState } from 'react';
import { Search, Filter, ChevronRight, Droplets } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function OfficerComplaints({ complaints = [], onNavigate }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');

  const filtered = complaints.filter((item) => {
    const matchesSearch = 
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      (item.hostelName || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.hostelAddress || '').toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' ? true :
      statusFilter === 'Completed' ? item.status === 'Completed' :
      statusFilter === 'In Progress' ? (item.status === 'Tanker On The Way' || item.status === 'Work In Progress' || item.status === 'Assigned') :
      statusFilter === 'New' ? (item.status === 'Complaint Registered' || item.status === 'New') : true;

    const matchesSeverity = severityFilter === 'All' ? true : item.severity === severityFilter;

    return matchesSearch && matchesStatus && matchesSeverity;
  });

  return (
    <div className="page-content">
      {/* Title */}
      <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>
        Municipal Complaint Register
      </h2>

      {/* Search Input */}
      <div className="form-group" style={{ marginBottom: '12px' }}>
        <div style={{ position: 'relative' }}>
          <input 
            type="text"
            className="form-input"
            style={{ paddingLeft: '40px' }}
            placeholder="Search complaint ID, category, or hostel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
        {['All', 'New', 'In Progress', 'Completed'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 700,
              border: statusFilter === st ? '1px solid #2563eb' : '1px solid #e2e8f0',
              backgroundColor: statusFilter === st ? '#eff6ff' : 'white',
              color: statusFilter === st ? '#1e40af' : '#64748b',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Severity Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', fontSize: '0.75rem', alignItems: 'center' }}>
        <span style={{ color: '#64748b', fontWeight: 600 }}>Severity:</span>
        {['All', 'High', 'Medium', 'Low'].map((sev) => (
          <button
            key={sev}
            onClick={() => setSeverityFilter(sev)}
            style={{
              padding: '4px 10px',
              borderRadius: '12px',
              border: severityFilter === sev ? '1px solid #0f172a' : '1px solid #e2e8f0',
              backgroundColor: severityFilter === sev ? '#0f172a' : 'white',
              color: severityFilter === sev ? 'white' : '#64748b',
              cursor: 'pointer'
            }}
          >
            {sev}
          </button>
        ))}
      </div>

      {/* Complaint Cards List */}
      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>No matching complaints found.</p>
        </div>
      ) : (
        filtered.map((item) => (
          <div 
            key={item.id}
            className="card"
            onClick={() => onNavigate('officer-complaint-details', item.id)}
            style={{ cursor: 'pointer', marginBottom: '12px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: '800', color: '#2563eb' }}>
                {item.id}
              </span>
              <StatusBadge status={item.status} severity={item.severity} />
            </div>

            <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
              {item.category}
            </div>

            <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '8px' }}>
              📍 {item.hostelName} - {item.hostelAddress || item.location?.address}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px dashed #e2e8f0', fontSize: '0.72rem', color: '#94a3b8' }}>
              <span>Student: {item.userName || 'Resident'}</span>
              <span style={{ color: '#2563eb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2 }}>
                Update & Assign Tanker <ChevronRight size={14} />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
