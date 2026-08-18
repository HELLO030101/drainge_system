import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  RefreshCw, 
  MapPin, 
  ChevronRight, 
  Database,
  Filter,
  ShieldCheck
} from 'lucide-react';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import LocationMap from '../components/LocationMap';

export default function OfficerDashboard({ 
  officer, 
  complaints = [], 
  onNavigate, 
  onLoadDemoData, 
  onResetDB 
}) {
  const [activeView, setActiveView] = useState('list'); // 'list' or 'map'

  const totalCount = complaints.length;
  const completedCount = complaints.filter(c => c.status === 'Completed').length;
  const inProgressCount = complaints.filter(c => c.status === 'Tanker On The Way' || c.status === 'Work In Progress' || c.status === 'Assigned').length;
  const newCount = complaints.filter(c => c.status === 'Complaint Registered' || c.status === 'New').length;

  return (
    <div className="page-content">
      {/* Officer Welcome Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a' }}>
            Officer Dashboard
          </h2>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
            {officer?.name || 'Inspector V. K. Patel'} • Sanitation Unit
          </span>
        </div>

        {/* Quick Demo Controls */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            className="icon-btn" 
            onClick={onLoadDemoData}
            title="Load Fresh Demo Complaints"
            style={{ color: '#059669', borderColor: '#a7f3d0', backgroundColor: '#ecfdf5' }}
          >
            <Database size={16} />
          </button>
          <button 
            className="icon-btn" 
            onClick={onResetDB}
            title="Reset Database"
            style={{ color: '#dc2626' }}
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* 3 Main Statistics Cards (Dynamically Calculated) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
        <StatCard 
          title="Total" 
          count={totalCount} 
          icon={FileText} 
          color="#2563eb" 
          bg="#eff6ff" 
        />
        <StatCard 
          title="In Progress" 
          count={inProgressCount} 
          icon={Clock} 
          color="#d97706" 
          bg="#fffbebf5" 
        />
        <StatCard 
          title="Completed" 
          count={completedCount} 
          icon={CheckCircle2} 
          color="#059669" 
          bg="#ecfdf5" 
        />
      </div>

      {/* View Switcher: List vs Map Overview */}
      <div style={{ display: 'flex', backgroundColor: '#e2e8f0', borderRadius: '12px', padding: '4px', marginBottom: '16px' }}>
        <button
          onClick={() => setActiveView('list')}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: activeView === 'list' ? 'white' : 'transparent',
            color: activeView === 'list' ? '#0f172a' : '#64748b',
            boxShadow: activeView === 'list' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
          }}
        >
          Recent Complaints List
        </button>
        <button
          onClick={() => setActiveView('map')}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: activeView === 'map' ? 'white' : 'transparent',
            color: activeView === 'map' ? '#0f172a' : '#64748b',
            boxShadow: activeView === 'map' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
          }}
        >
          📍 Map Overview ({totalCount})
        </button>
      </div>

      {/* MAP OVERVIEW VIEW */}
      {activeView === 'map' && (
        <div className="card">
          <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>
            Hostel Drainage Complaints Map
          </h3>
          <LocationMap 
            lat={complaints[0]?.location?.lat || 23.0225}
            lng={complaints[0]?.location?.lng || 72.5714}
            interactive={false}
          />
          <p style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>
            Map showing active sanitation emergency pins across hostel campus.
          </p>
        </div>
      )}

      {/* RECENT COMPLAINTS LIST VIEW */}
      {activeView === 'list' && (
        <div>
          <div className="section-header">
            <h3 className="section-title">Recent Hostel Complaints</h3>
            <button className="link-btn" onClick={() => onNavigate('officer-complaints')}>
              See All ({totalCount})
            </button>
          </div>

          {complaints.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
              <p style={{ color: '#64748b' }}>No complaints recorded in database.</p>
              <button className="btn-primary" onClick={onLoadDemoData} style={{ marginTop: '12px' }}>
                <Database size={16} /> Load Demo Complaints Data
              </button>
            </div>
          ) : (
            complaints.slice(0, 5).map((item) => (
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
                  📍 {item.hostelName} ({item.hostelAddress || item.location?.address})
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px dashed #e2e8f0', fontSize: '0.72rem', color: '#94a3b8' }}>
                  <span>By: {item.userName || 'Student'} ({item.dateDisplay || item.createdAt?.slice(0,10)})</span>
                  <span style={{ color: '#2563eb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2 }}>
                    Action / Assign <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
