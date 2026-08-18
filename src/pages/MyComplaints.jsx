import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Plus, ChevronRight, Droplets } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function MyComplaints({ complaints = [], onNavigate, onBack }) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = complaints.filter((item) => {
    const matchesSearch = 
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      (item.hostelAddress || '').toLowerCase().includes(search.toLowerCase());
    
    if (filterStatus === 'All') return matchesSearch;
    if (filterStatus === 'Completed') return matchesSearch && item.status === 'Completed';
    if (filterStatus === 'In Progress') return matchesSearch && (item.status === 'Tanker On The Way' || item.status === 'Work In Progress' || item.status === 'Assigned');
    if (filterStatus === 'New') return matchesSearch && item.status === 'Complaint Registered';
    return matchesSearch;
  });

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>
          My Complaints
        </h2>
        <button className="icon-btn" onClick={() => onNavigate('register-complaint')} style={{ color: '#059669' }}>
          <Plus size={20} />
        </button>
      </div>

      {/* Search Input */}
      <div className="form-group" style={{ marginBottom: '12px' }}>
        <div style={{ position: 'relative' }}>
          <input 
            type="text"
            className="form-input"
            style={{ paddingLeft: '40px' }}
            placeholder="Search by ID, Category or Location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
        {['All', 'In Progress', 'Completed', 'New'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterStatus(tab)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 700,
              border: filterStatus === tab ? '1px solid #059669' : '1px solid #e2e8f0',
              backgroundColor: filterStatus === tab ? '#ecfdf5' : 'white',
              color: filterStatus === tab ? '#047857' : '#64748b',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Complaints List */}
      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
          <Droplets size={36} style={{ color: '#cbd5e1', margin: '0 auto 8px auto' }} />
          <p style={{ fontSize: '0.88rem', fontWeight: '600', color: '#64748b' }}>
            No complaints found
          </p>
        </div>
      ) : (
        filtered.map((item) => (
          <div 
            key={item.id} 
            className="card"
            onClick={() => onNavigate('complaint-details', item.id)}
            style={{ cursor: 'pointer', marginBottom: '12px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: '800', color: '#059669' }}>
                {item.id}
              </span>
              <StatusBadge status={item.status} severity={item.severity} />
            </div>

            <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
              {item.category}
            </div>

            <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '8px' }}>
              📍 {item.hostelAddress || item.location?.address}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px dashed #e2e8f0', fontSize: '0.72rem', color: '#94a3b8' }}>
              <span>{item.dateDisplay || item.createdAt?.slice(0, 10)}</span>
              <span style={{ color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2 }}>
                View Timeline <ChevronRight size={14} />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
