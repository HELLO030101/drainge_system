import React from 'react';
import { CheckCircle2, Clock, Truck, AlertCircle, AlertTriangle } from 'lucide-react';

export default function StatusBadge({ status, severity }) {
  if (severity) {
    const sevLower = severity.toLowerCase();
    return (
      <span className={`status-badge severity-${sevLower}`} style={{
        backgroundColor: sevLower === 'high' ? '#fee2e2' : sevLower === 'medium' ? '#fef3c7' : '#d1fae5',
        color: sevLower === 'high' ? '#991b1b' : sevLower === 'medium' ? '#92400e' : '#065f46',
        border: `1px solid ${sevLower === 'high' ? '#fca5a5' : sevLower === 'medium' ? '#fcd34d' : '#6ee7b7'}`
      }}>
        {sevLower === 'high' && <AlertTriangle size={12} />}
        {severity} Priority
      </span>
    );
  }

  const s = (status || 'New').toLowerCase();

  if (s.includes('completed') || s.includes('resolved')) {
    return (
      <span className="status-badge completed">
        <CheckCircle2 size={12} />
        Completed
      </span>
    );
  }

  if (s.includes('tanker') || s.includes('progress') || s.includes('assigned')) {
    return (
      <span className="status-badge tanker-on-the-way">
        {s.includes('tanker') ? <Truck size={12} /> : <Clock size={12} />}
        {status}
      </span>
    );
  }

  return (
    <span className="status-badge new">
      <AlertCircle size={12} />
      {status || 'New'}
    </span>
  );
}
