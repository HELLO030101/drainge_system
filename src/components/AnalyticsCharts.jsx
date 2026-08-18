import React from 'react';

export default function AnalyticsCharts({ complaints = [] }) {
  // Compute category counts
  const categoryCounts = {};
  const severityCounts = { High: 0, Medium: 0, Low: 0 };
  const statusCounts = { Completed: 0, 'In Progress': 0, New: 0 };

  complaints.forEach((c) => {
    categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
    if (c.severity) severityCounts[c.severity] = (severityCounts[c.severity] || 0) + 1;
    
    if (c.status === 'Completed') statusCounts.Completed++;
    else if (c.status === 'New') statusCounts.New++;
    else statusCounts['In Progress']++;
  });

  const total = complaints.length || 1;
  const categoriesList = Object.keys(categoryCounts);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Category Breakdown Bar Chart */}
      <div className="card">
        <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
          Complaints by Issue Category
        </h3>
        
        {categoriesList.length === 0 ? (
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>No complaint data available.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {categoriesList.map((cat) => {
              const count = categoryCounts[cat];
              const pct = Math.round((count / total) * 100);
              return (
                <div key={cat}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>
                    <span>{cat}</span>
                    <span style={{ color: '#059669' }}>{count} ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${pct}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #10b981, #047857)',
                      borderRadius: '4px',
                      transition: 'width 0.5s ease'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Severity Breakdown */}
      <div className="card">
        <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
          Severity Distribution
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
          <div style={{ padding: '10px', backgroundColor: '#fee2e2', borderRadius: '12px', border: '1px solid #fca5a5' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#991b1b' }}>{severityCounts.High}</div>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#991b1b' }}>HIGH</div>
          </div>
          <div style={{ padding: '10px', backgroundColor: '#fef3c7', borderRadius: '12px', border: '1px solid #fcd34d' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#92400e' }}>{severityCounts.Medium}</div>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#92400e' }}>MEDIUM</div>
          </div>
          <div style={{ padding: '10px', backgroundColor: '#d1fae5', borderRadius: '12px', border: '1px solid #6ee7b7' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#065f46' }}>{severityCounts.Low}</div>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#065f46' }}>LOW</div>
          </div>
        </div>
      </div>
    </div>
  );
}
