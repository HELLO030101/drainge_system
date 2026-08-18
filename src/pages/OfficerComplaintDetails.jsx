import React, { useState } from 'react';
import { ArrowLeft, MapPin, Truck, CheckCircle2, ShieldAlert, Image as ImageIcon, Camera, Trash2 } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import StatusTimeline from '../components/StatusTimeline';
import LocationMap from '../components/LocationMap';

export default function OfficerComplaintDetails({ 
  complaint, 
  onBack, 
  onUpdateStatus, 
  onAssignTanker 
}) {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  // Tanker Form
  const [tankerForm, setTankerForm] = useState({
    driverName: complaint?.tanker?.driverName || 'Mahesh Chauhan',
    driverPhone: complaint?.tanker?.driverPhone || '9876543210',
    vehicleNo: complaint?.tanker?.vehicleNo || 'GJ 01 GA 6789',
    capacity: complaint?.tanker?.capacity || '5000 Liters',
    eta: complaint?.tanker?.eta || '15 mins'
  });

  // Resolution Form
  const [resolutionNote, setResolutionNote] = useState('Drainage blockage cleared completely using 5000L suction tanker. Area sanitized.');
  const [resolutionPhoto, setResolutionPhoto] = useState(null);

  if (!complaint) {
    return (
      <div className="page-content" style={{ textAlign: 'center', paddingTop: '40px' }}>
        <p style={{ color: '#64748b' }}>Complaint not found.</p>
        <button className="btn-secondary" onClick={onBack} style={{ marginTop: '16px' }}>
          Back to List
        </button>
      </div>
    );
  }

  const handleSaveTanker = async (e) => {
    e.preventDefault();
    await onAssignTanker(complaint.id, tankerForm);
    setShowAssignModal(false);
  };

  const handleMarkCompleted = async (e) => {
    e.preventDefault();
    await onUpdateStatus(complaint.id, 'Completed', resolutionNote, resolutionPhoto);
    setShowCompleteModal(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setResolutionPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="page-content">
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>
          Manage Complaint
        </h2>
        <div style={{ width: 36 }} />
      </div>

      {/* ID & Status Card */}
      <div className="card" style={{ borderLeft: '4px solid #2563eb' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#2563eb' }}>
              {complaint.id}
            </span>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>
              Reported on {complaint.dateDisplay || complaint.createdAt?.slice(0, 10)}
            </div>
          </div>
          <StatusBadge status={complaint.status} severity={complaint.severity} />
        </div>
      </div>

      {/* Primary Action Buttons Bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button 
          className="btn-primary" 
          onClick={() => setShowAssignModal(true)}
          style={{ flex: 1, backgroundColor: '#2563eb', backgroundImage: 'linear-gradient(135deg, #2563eb, #1d4ed8)', fontSize: '0.85rem', padding: '10px' }}
        >
          <Truck size={16} />
          <span>Assign Tanker</span>
        </button>

        {complaint.status !== 'Completed' && (
          <button 
            className="btn-primary" 
            onClick={() => setShowCompleteModal(true)}
            style={{ flex: 1, backgroundColor: '#059669', fontSize: '0.85rem', padding: '10px' }}
          >
            <CheckCircle2 size={16} />
            <span>Mark Completed</span>
          </button>
        )}
      </div>

      {/* Complaint Info & Map */}
      <div className="card">
        <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
          {complaint.category}
        </h3>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: '0.82rem', color: '#334155', marginBottom: '10px' }}>
          <MapPin size={16} style={{ color: '#2563eb', flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong>{complaint.hostelName}</strong>
            <p style={{ color: '#64748b', fontSize: '0.78rem' }}>
              {complaint.hostelAddress || complaint.location?.address}
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: 4 }}>
            STUDENT DESCRIPTION
          </span>
          <p style={{ fontSize: '0.85rem', color: '#1e293b' }}>
            {complaint.description}
          </p>
        </div>

        {/* Complaint Evidence Media */}
        {complaint.media?.photo && (
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: 4 }}>
              COMPLAINT PHOTO EVIDENCE
            </span>
            <img 
              src={complaint.media.photo} 
              alt="Complaint Photo" 
              style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1' }} 
            />
          </div>
        )}
      </div>

      {/* Map View */}
      <div className="card">
        <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
          Location Map Pin
        </h4>
        <LocationMap 
          lat={complaint.location?.lat || 23.0225} 
          lng={complaint.location?.lng || 72.5714} 
          interactive={false} 
        />
      </div>

      {/* Assigned Tanker Info */}
      {complaint.tanker && (
        <div className="card" style={{ backgroundColor: '#ecfdf5', borderColor: '#a7f3d0' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#047857', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Truck size={18} /> Assigned Tanker & Driver
          </h4>
          <div style={{ fontSize: '0.82rem', color: '#065f46' }}>
            <div>Driver: <strong>{complaint.tanker.driverName}</strong> ({complaint.tanker.driverPhone})</div>
            <div>Vehicle: <strong>{complaint.tanker.vehicleNo}</strong> ({complaint.tanker.capacity})</div>
            <div>ETA: <strong>{complaint.tanker.eta}</strong></div>
          </div>
        </div>
      )}

      {/* Status Timeline */}
      <div className="card">
        <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
          Current Timeline Stage
        </h4>
        <StatusTimeline timeline={complaint.timeline} />
      </div>

      {/* MODAL 1: ASSIGN TANKER */}
      {showAssignModal && (
        <div className="modal-overlay" onClick={() => setShowAssignModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>
              Assign Sanitation Tanker
            </h3>
            
            <form onSubmit={handleSaveTanker}>
              <div className="form-group">
                <label className="form-label">Driver Name</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={tankerForm.driverName}
                  onChange={(e) => setTankerForm({ ...tankerForm, driverName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Driver Contact Number</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={tankerForm.driverPhone}
                  onChange={(e) => setTankerForm({ ...tankerForm, driverPhone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Vehicle Number</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={tankerForm.vehicleNo}
                  onChange={(e) => setTankerForm({ ...tankerForm, vehicleNo: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tanker Suction Capacity</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={tankerForm.capacity}
                  onChange={(e) => setTankerForm({ ...tankerForm, capacity: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Estimated Arrival Time (ETA)</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={tankerForm.eta}
                  onChange={(e) => setTankerForm({ ...tankerForm, eta: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowAssignModal(false)} style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 2, backgroundColor: '#2563eb' }}>
                  Dispatch Tanker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: MARK WORK COMPLETED */}
      {showCompleteModal && (
        <div className="modal-overlay" onClick={() => setShowCompleteModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>
              Mark Complaint Completed
            </h3>

            <form onSubmit={handleMarkCompleted}>
              <div className="form-group">
                <label className="form-label">Resolution Notes *</label>
                <textarea 
                  className="form-textarea"
                  rows={3}
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder="e.g. Drainage cleared, wastewater extracted using 5000L tanker, area disinfected."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Upload Completion Photo Proof</label>
                {resolutionPhoto ? (
                  <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
                    <img src={resolutionPhoto} alt="Resolution" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                    <button 
                      type="button"
                      onClick={() => setResolutionPhoto(null)}
                      style={{ position: 'absolute', top: 8, right: 8, background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <label style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    border: '2px dashed #059669',
                    borderRadius: '12px',
                    backgroundColor: '#ecfdf5',
                    cursor: 'pointer'
                  }}>
                    <Camera size={24} style={{ color: '#059669', marginBottom: 4 }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#047857' }}>Upload After-Work Photo</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                  </label>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowCompleteModal(false)} style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 2 }}>
                  Submit Completion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
