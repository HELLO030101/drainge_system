import React from 'react';
import { Check, Clock } from 'lucide-react';

export default function StatusTimeline({ timeline = [] }) {
  const defaultStages = [
    { status: 'Complaint Registered', timestamp: null, done: false, note: 'Submitted' },
    { status: 'Assigned to Municipal Team', timestamp: null, done: false, note: 'Awaiting team' },
    { status: 'Tanker On The Way', timestamp: null, done: false, note: 'Awaiting tanker' },
    { status: 'Work Completed', timestamp: null, done: false, note: 'Awaiting resolution' }
  ];

  const listToRender = timeline.length > 0 ? timeline : defaultStages;

  return (
    <div className="timeline-list">
      {listToRender.map((item, idx) => (
        <div key={idx} className={`timeline-item ${item.done ? 'done' : ''}`}>
          <div className="timeline-node" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '10px'
          }}>
            {item.done ? <Check size={10} strokeWidth={3} /> : null}
          </div>
          <div className="timeline-content">
            <div className="timeline-title">{item.status}</div>
            {item.timestamp ? (
              <div className="timeline-time">
                <Clock size={11} style={{ display: 'inline', marginRight: 4 }} />
                {item.timestamp}
              </div>
            ) : (
              <div className="timeline-time" style={{ color: '#94a3b8' }}>Pending stage</div>
            )}
            {item.note && <div className="timeline-note">{item.note}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
