import React from 'react';
import { BarChart3, PieChart, CheckCircle2, Clock, FileText, Download } from 'lucide-react';
import AnalyticsCharts from '../components/AnalyticsCharts';

export default function ReportsPage({ complaints = [] }) {
  const total = complaints.length;
  const completed = complaints.filter(c => c.status === 'Completed').length;
  const pending = total - completed;
  const resolutionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a' }}>
            Sanitation Analytics & Reports
          </h2>
          <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
            Hostel Drainage System Performance Metrics
          </p>
        </div>

        <button 
          className="icon-btn" 
          onClick={() => alert('Demo PDF Analytics Report generated & downloaded!')}
          title="Download Report"
          style={{ backgroundColor: '#ecfdf5', color: '#059669', borderColor: '#a7f3d0' }}
        >
          <Download size={18} />
        </button>
      </div>

      {/* Resolution Efficiency Card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #059669, #047857)', color: 'white', border: 'none', borderRadius: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.9 }}>
              SANITY & RESOLUTION RATE
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '2px 0' }}>
              {resolutionRate}%
            </h3>
            <p style={{ fontSize: '0.78rem', opacity: 0.9 }}>
              {completed} of {total} complaints resolved successfully
            </p>
          </div>

          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: 800
          }}>
            <BarChart3 size={32} />
          </div>
        </div>
      </div>

      {/* Dynamic Charts Component */}
      <AnalyticsCharts complaints={complaints} />
    </div>
  );
}
