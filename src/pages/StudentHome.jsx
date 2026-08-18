import React from 'react';
import { 
  MapPin, 
  PlusCircle, 
  FileText, 
  Truck, 
  BookOpen, 
  ChevronRight, 
  Droplets, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function StudentHome({ 
  user = { name: 'Student', hostel: 'Government Engineering College Hostel' },
  recentComplaints = [],
  onNavigate 
}) {
  return (
    <div className="page-content">
      {/* Student Greeting & Hostel Location */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a' }}>
            Hi, {user.name || 'Student'} 👋
          </h2>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            backgroundColor: '#ecfdf5',
            color: '#059669',
            padding: '3px 8px',
            borderRadius: '12px',
            border: '1px solid #a7f3d0'
          }}>
            Hostel Resident
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.82rem', marginTop: '2px' }}>
          <MapPin size={15} style={{ color: '#059669', flexShrink: 0 }} />
          <span style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user.hostel || 'Government Engineering College Hostel'}
          </span>
        </div>
      </div>

      {/* Hero Banner - Green Drainage Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 20px rgba(5, 150, 105, 0.3)',
        marginBottom: '20px'
      }}>
        {/* Background Decorative SVG */}
        <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.2, pointerEvents: 'none' }}>
          <Droplets size={160} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '240px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '3px 10px',
            borderRadius: '12px',
            fontSize: '0.7rem',
            fontWeight: 700,
            marginBottom: 8
          }}>
            <Sparkles size={12} /> Sanitation Emergency Care
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', lineHeight: 1.25, marginBottom: '6px' }}>
            Having Drainage Issue?
          </h3>
          <p style={{ fontSize: '0.78rem', opacity: 0.9, lineHeight: 1.35, marginBottom: '14px' }}>
            Report sewage overflow or blocked drains to municipal team and track resolution live.
          </p>
          <button 
            onClick={() => onNavigate('register-complaint')}
            style={{
              backgroundColor: '#ffffff',
              color: '#047857',
              border: 'none',
              padding: '9px 18px',
              borderRadius: '12px',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}
          >
            <span>Report Now</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Quick Actions (4 Circular Icon Buttons) */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
          Quick Actions
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {/* Action 1: Register Complaint */}
          <button 
            onClick={() => onNavigate('register-complaint')}
            style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '12px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <PlusCircle size={22} />
            </div>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#334155', textAlign: 'center', lineHeight: 1.2 }}>
              Register Complaint
            </span>
          </button>

          {/* Action 2: My Complaints */}
          <button 
            onClick={() => onNavigate('my-complaints')}
            style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '12px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={22} />
            </div>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#334155', textAlign: 'center', lineHeight: 1.2 }}>
              My Complaints
            </span>
          </button>

          {/* Action 3: Track Tanker */}
          <button 
            onClick={() => onNavigate('track-tanker')}
            style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '12px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#fffbebf5',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Truck size={22} />
            </div>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#334155', textAlign: 'center', lineHeight: 1.2 }}>
              Track Tanker
            </span>
          </button>

          {/* Action 4: Awareness */}
          <button 
            onClick={() => onNavigate('awareness')}
            style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '12px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#f3e8ff',
              color: '#9333ea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BookOpen size={22} />
            </div>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#334155', textAlign: 'center', lineHeight: 1.2 }}>
              Awareness
            </span>
          </button>
        </div>
      </div>

      {/* Recent Complaints Section */}
      <div>
        <div className="section-header">
          <h3 className="section-title">Recent Complaints</h3>
          <button className="link-btn" onClick={() => onNavigate('my-complaints')}>
            See All
          </button>
        </div>

        {recentComplaints.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '24px' }}>
            <Droplets size={36} style={{ color: '#cbd5e1', margin: '0 auto 8px auto' }} />
            <p style={{ fontSize: '0.88rem', fontWeight: '600', color: '#64748b' }}>
              No complaints registered yet
            </p>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
              Tap 'Report Now' above to submit your first drainage complaint.
            </p>
          </div>
        ) : (
          recentComplaints.slice(0, 3).map((item) => (
            <div 
              key={item.id} 
              className="card"
              onClick={() => onNavigate('complaint-details', item.id)}
              style={{ cursor: 'pointer', marginBottom: '12px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#059669', letterSpacing: '0.2px' }}>
                  {item.id}
                </span>
                <StatusBadge status={item.status} />
              </div>
              
              <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                {item.category}
              </div>

              <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '8px' }}>
                📍 {item.hostelAddress || item.location?.address || 'Hostel Campus'}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px dashed #e2e8f0', fontSize: '0.72rem', color: '#94a3b8' }}>
                <span>{item.dateDisplay || item.createdAt?.slice(0,10)}</span>
                <span style={{ color: '#059669', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  Track Details <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
