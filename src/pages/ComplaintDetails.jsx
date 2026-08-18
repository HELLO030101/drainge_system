import React, { useState } from 'react';
import { ArrowLeft, MapPin, Truck, Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import StatusTimeline from '../components/StatusTimeline';

export default function ComplaintDetails({ complaint, onBack, onTrackTanker }) {
  const [showMediaModal, setShowMediaModal] = useState(false);

  if (!complaint) {
    return (
      <div className="page-content" style={{ textAlign: 'center', paddingTop: '40px' }}>
        <p style={{ color: '#64748b' }}>Complaint not found.</p>
        <button className="btn-secondary" onClick={onBack} style={{ marginTop: '16px' }}>
          Back to Complaints
        </button>
      </div>
    );
  }

  return (
    <div className="page-content">
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>
          Complaint Details
        </h2>
        <div style={{ width: 36 }} />
      </div>

      {/* ID & Status Header Card */}
      <div className="card" style={{ borderLeft: '4px solid #059669' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#059669', letterSpacing: '0.3px' }}>
              {complaint.id}
            </span>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>
              Submitted on {complaint.dateDisplay || complaint.createdAt?.slice(0, 10)}
            </div>
          </div>
          <StatusBadge status={complaint.status} severity={complaint.severity} />
        </div>
      </div>

      {/* Issue Overview & Location */}
      <div className="card">
        <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
          {complaint.category}
        </h3>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: '0.82rem', color: '#334155', marginBottom: '12px' }}>
          <MapPin size={16} style={{ color: '#059669', flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong>{complaint.hostelName}</strong>
            <p style={{ color: '#64748b', fontSize: '0.78rem' }}>
              {complaint.hostelAddress || complaint.location?.address}
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: 4 }}>
            DESCRIPTION
          </span>
          <p style={{ fontSize: '0.85rem', color: '#1e293b', lineHeight: 1.4 }}>
            {complaint.description}
          </p>
        </div>

        {/* View Photos Button */}
        {(complaint.media?.photo || complaint.resolution?.photo) && (
          <button 
            className="btn-secondary"
            onClick={() => setShowMediaModal(true)}
            style={{ fontSize: '0.85rem' }}
          >
            <ImageIcon size={16} style={{ color: '#059669' }} />
            <span>View Attached Photos / Proof</span>
          </button>
        )}
      </div>

      {/* Tanker Status Banner if Assigned */}
      {complaint.tanker && (
        <div className="card" style={{ backgroundColor: '#ecfdf5', borderColor: '#a7f3d0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#059669', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#047857', display: 'block' }}>
                  Tanker Dispatched
                </strong>
                <span style={{ fontSize: '0.75rem', color: '#065f46' }}>
                  Driver: {complaint.tanker.driverName} ({complaint.tanker.vehicleNo})
                </span>
              </div>
            </div>

            <button 
              onClick={() => onTrackTanker(complaint.id)}
              style={{
                backgroundColor: '#047857',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Track Tanker
            </button>
          </div>
        </div>
      )}

      {/* Status Timeline */}
      <div className="card">
        <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
          Status Timeline
        </h3>
        <StatusTimeline timeline={complaint.timeline} />
      </div>

      {/* Resolution Proof Card if Completed */}
      {complaint.resolution && (
        <div className="card" style={{ border: '2px solid #10b981', backgroundColor: '#ecfdf5' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#047857', marginBottom: '6px' }}>
            ✓ Resolution Proof & Officer Note
          </h4>
          <p style={{ fontSize: '0.82rem', color: '#065f46', marginBottom: '10px' }}>
            {complaint.resolution.note}
          </p>
          {complaint.resolution.photo && (
            <img 
              src={complaint.resolution.photo} 
              alt="Resolution Proof" 
              style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '8px' }} 
            />
          )}
        </div>
      )}

      {/* Media Modal */}
      {showMediaModal && (
        <div className="modal-overlay" onClick={() => setShowMediaModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Attached Media Gallery</h3>
              <button className="icon-btn" onClick={() => setShowMediaModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {complaint.media?.photo && (
                <div>
                  <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: 4 }}>
                    ORIGINAL COMPLAINT PHOTO
                  </span>
                  <img src={complaint.media.photo} alt="Original Complaint" style={{ width: '100%', borderRadius: '10px' }} />
                </div>
              )}

              {complaint.resolution?.photo && (
                <div>
                  <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#059669', display: 'block', marginBottom: 4 }}>
                    COMPLETION RESOLUTION PHOTO
                  </span>
                  <img src={complaint.resolution.photo} alt="Resolution Proof" style={{ width: '100%', borderRadius: '10px' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
