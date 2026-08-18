import React from 'react';

export default function StatCard({ title, count, icon: Icon, color = '#059669', bg = '#ecfdf5', subtext }) {
  return (
    <div className="card" style={{
      padding: '16px',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      borderLeft: `4px solid ${color}`
    }}>
      <div style={{
        width: '46px',
        height: '46px',
        borderRadius: '12px',
        backgroundColor: bg,
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <Icon size={24} />
      </div>
      <div>
        <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', lineHeight: 1.1 }}>
          {count}
        </div>
        <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748b' }}>
          {title}
        </div>
        {subtext && <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: 2 }}>{subtext}</div>}
      </div>
    </div>
  );
}
