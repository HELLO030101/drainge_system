import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Navigation, 
  Check, 
  AlertTriangle, 
  ArrowRight,
  Sparkles,
  Camera,
  FileText
} from 'lucide-react';
import LocationMap from '../components/LocationMap';
import MediaUploader from '../components/MediaUploader';
import { getCurrentLocation, DEFAULT_HOSTEL_LOCATION } from '../services/location';

export default function RegisterComplaint({ user, onSubmitComplaint, onCancel }) {
  const [step, setStep] = useState(1);

  // Form State
  const [locationState, setLocationState] = useState({
    lat: DEFAULT_HOSTEL_LOCATION.lat,
    lng: DEFAULT_HOSTEL_LOCATION.lng,
    hostelName: user?.hostel || DEFAULT_HOSTEL_LOCATION.hostelName,
    address: DEFAULT_HOSTEL_LOCATION.address
  });
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState('');

  const [category, setCategory] = useState('Sewage Leakage / Overflow');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('High'); // Low, Medium, High

  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);

  const issueCategories = [
    'Sewage Leakage / Overflow',
    'Drainage Blockage',
    'Wastewater Stagnation',
    'Manhole Problem',
    'Garbage Accumulation',
    'Bad Odour',
    'Broken Drain',
    'Other'
  ];

  // Capture Browser GPS
  const handleFetchGPS = async () => {
    setGpsLoading(true);
    setGpsError('');
    try {
      const pos = await getCurrentLocation();
      setLocationState((prev) => ({
        ...prev,
        lat: pos.lat,
        lng: pos.lng,
        address: `GPS Pin: ${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)} (Accuracy: ${Math.round(pos.accuracy)}m)`
      }));
    } catch (err) {
      setGpsError(err.message || 'GPS access denied. You can drag the map pin or enter location details manually.');
    } finally {
      setGpsLoading(false);
    }
  };

  const handleNextStep = () => {
    if (step === 2 && !description.trim()) {
      alert('Please enter a description for the issue.');
      return;
    }
    if (step < 4) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    const now = new Date();
    const dateStr = now.getFullYear().toString() +
      (now.getMonth() + 1).toString().padStart(2, '0') +
      now.getDate().toString().padStart(2, '0');
    const randomSeq = Math.floor(100 + Math.random() * 900);
    const generatedId = `#DC${dateStr}${randomSeq}`;

    const dateDisplay = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' +
      now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const complaintData = {
      id: generatedId,
      userMobile: user?.mobile || '9876543210',
      userName: user?.name || 'Student Resident',
      hostelName: locationState.hostelName,
      hostelAddress: locationState.address,
      location: {
        lat: locationState.lat,
        lng: locationState.lng,
        address: locationState.address
      },
      category,
      description,
      severity,
      media: {
        photo,
        video
      },
      createdAt: now.toISOString(),
      dateDisplay,
      status: 'Complaint Registered',
      timeline: [
        { status: 'Complaint Registered', timestamp: dateDisplay, done: true, note: 'Complaint submitted by student' },
        { status: 'Assigned to Municipal Team', timestamp: null, done: false, note: 'Pending assignment' },
        { status: 'Tanker On The Way', timestamp: null, done: false, note: 'Pending' },
        { status: 'Work Completed', timestamp: null, done: false, note: 'Pending' }
      ],
      tanker: null,
      resolution: null
    };

    await onSubmitComplaint(complaintData);
  };

  return (
    <div className="page-content">
      {/* Top Header & Back */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button className="icon-btn" onClick={step === 1 ? onCancel : handlePrevStep}>
          <ArrowLeft size={18} />
        </button>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>
          Report Drainage Issue
        </h2>
        <div style={{ width: 36 }} />
      </div>

      {/* Top 4-Step Indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: '12px 16px',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
      }}>
        {[
          { num: 1, label: 'Location' },
          { num: 2, label: 'Details' },
          { num: 3, label: 'Photo' },
          { num: 4, label: 'Submit' }
        ].map((st, idx) => {
          const isDone = st.num < step;
          const isCurrent = st.num === step;
          return (
            <React.Fragment key={st.num}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: isDone || isCurrent ? '#059669' : '#e2e8f0',
                  color: isDone || isCurrent ? 'white' : '#64748b',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isCurrent ? '0 0 0 3px #a7f3d0' : 'none'
                }}>
                  {isDone ? <Check size={14} strokeWidth={3} /> : st.num}
                </div>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: isCurrent ? '700' : '500',
                  color: isCurrent ? '#047857' : '#64748b'
                }}>
                  {st.label}
                </span>
              </div>
              {idx < 3 && (
                <div style={{
                  flex: 1,
                  height: '2px',
                  backgroundColor: isDone ? '#059669' : '#e2e8f0',
                  margin: '0 4px',
                  marginBottom: '16px'
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* STEP 1: LOCATION */}
      {step === 1 && (
        <div>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>
                Your Location
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>Step 1 of 4</span>
            </div>

            <div className="form-group">
              <label className="form-label">Hostel Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={locationState.hostelName}
                onChange={(e) => setLocationState({ ...locationState, hostelName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Specific Spot / Address</label>
              <input 
                type="text" 
                className="form-input" 
                value={locationState.address}
                onChange={(e) => setLocationState({ ...locationState, address: e.target.value })}
                placeholder="e.g. Block A Rear Drainage line"
              />
            </div>

            {/* GPS Button */}
            <button 
              type="button" 
              className="btn-secondary"
              onClick={handleFetchGPS}
              disabled={gpsLoading}
              style={{ marginBottom: '14px', backgroundColor: '#ecfdf5', borderColor: '#a7f3d0', color: '#047857' }}
            >
              <Navigation size={18} />
              <span>{gpsLoading ? 'Acquiring GPS Signal...' : 'Use Current GPS Location'}</span>
            </button>

            {gpsError && (
              <p style={{ fontSize: '0.78rem', color: '#dc2626', marginBottom: '12px', lineHeight: 1.3 }}>
                ⚠️ {gpsError}
              </p>
            )}

            {/* Leaflet Interactive Map */}
            <label className="form-label" style={{ marginBottom: 6 }}>
              Pinpoint Location on Map (Tap/Drag Pin)
            </label>
            <LocationMap 
              lat={locationState.lat}
              lng={locationState.lng}
              onLocationSelect={(coords) => setLocationState({
                ...locationState,
                lat: coords.lat,
                lng: coords.lng,
                address: `Map Pin: Lat ${coords.lat.toFixed(4)}, Lng ${coords.lng.toFixed(4)}`
              })}
            />
          </div>

          <button className="btn-primary" onClick={handleNextStep}>
            <span>Next: Issue Details</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* STEP 2: COMPLAINT DETAILS */}
      {step === 2 && (
        <div>
          <div className="card">
            <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>
              Complaint Details
            </h3>

            {/* Category Dropdown */}
            <div className="form-group">
              <label className="form-label">Type of Issue *</label>
              <select 
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {issueCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Description Textarea with 250 max char counter */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label className="form-label">Description *</label>
                <span style={{ fontSize: '0.75rem', color: description.length >= 250 ? '#dc2626' : '#64748b', fontWeight: 600 }}>
                  {description.length}/250
                </span>
              </div>
              <textarea 
                className="form-textarea"
                rows={4}
                maxLength={250}
                placeholder="Describe the issue in detail (e.g., sewage leaking behind mess kitchen, foul smell)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Severity Level Cards */}
            <div className="form-group">
              <label className="form-label">Severity Level *</label>
              <div className="severity-options">
                {/* Low */}
                <div 
                  className={`severity-card low ${severity === 'Low' ? 'selected' : ''}`}
                  onClick={() => setSeverity('Low')}
                >
                  <div className="severity-title">Low</div>
                  <div className="severity-sub">(Non Urgent)</div>
                </div>

                {/* Medium */}
                <div 
                  className={`severity-card medium ${severity === 'Medium' ? 'selected' : ''}`}
                  onClick={() => setSeverity('Medium')}
                >
                  <div className="severity-title">Medium</div>
                  <div className="severity-sub">(Urgent)</div>
                </div>

                {/* High */}
                <div 
                  className={`severity-card high ${severity === 'High' ? 'selected' : ''}`}
                  onClick={() => setSeverity('High')}
                >
                  <div className="severity-title">High</div>
                  <div className="severity-sub">(Very Urgent)</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-secondary" onClick={handlePrevStep} style={{ flex: 1 }}>
              Back
            </button>
            <button className="btn-primary" onClick={handleNextStep} style={{ flex: 2 }}>
              <span>Next: Media</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PHOTO / VIDEO UPLOAD */}
      {step === 3 && (
        <div>
          <div className="card">
            <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>
              Upload Photo / Video
            </h3>
            
            <MediaUploader 
              photo={photo}
              video={video}
              onChangePhoto={setPhoto}
              onChangeVideo={setVideo}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-secondary" onClick={handlePrevStep} style={{ flex: 1 }}>
              Back
            </button>
            <button className="btn-primary" onClick={handleNextStep} style={{ flex: 2 }}>
              <span>Review & Submit</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: REVIEW & SUBMIT */}
      {step === 4 && (
        <div>
          <div className="card" style={{ border: '2px solid #059669' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: '#059669',
              fontWeight: 800,
              fontSize: '1.05rem',
              marginBottom: '16px',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '10px'
            }}>
              <Sparkles size={20} /> Complaint Review Summary
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'block', fontWeight: 600 }}>HOSTEL & LOCATION</span>
                <strong style={{ color: '#0f172a' }}>{locationState.hostelName}</strong>
                <p style={{ color: '#334155', fontSize: '0.8rem' }}>{locationState.address}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'block', fontWeight: 600 }}>ISSUE CATEGORY</span>
                  <strong style={{ color: '#059669' }}>{category}</strong>
                </div>

                <div>
                  <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'block', fontWeight: 600 }}>SEVERITY LEVEL</span>
                  <span style={{
                    color: severity === 'High' ? '#dc2626' : severity === 'Medium' ? '#d97706' : '#059669',
                    fontWeight: 800
                  }}>
                    {severity} Priority
                  </span>
                </div>
              </div>

              <div>
                <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'block', fontWeight: 600 }}>DESCRIPTION</span>
                <p style={{ backgroundColor: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#334155' }}>
                  {description || 'No description provided'}
                </p>
              </div>

              <div>
                <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'block', fontWeight: 600, marginBottom: 4 }}>ATTACHED MEDIA</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {photo ? (
                    <img src={photo} alt="Attached Preview" style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #cbd5e1' }} />
                  ) : (
                    <div style={{ width: '70px', height: '70px', borderRadius: '8px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#94a3b8' }}>
                      No Photo
                    </div>
                  )}

                  {video ? (
                    <div style={{ width: '70px', height: '70px', borderRadius: '8px', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem' }}>
                      Video Attached
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-secondary" onClick={handlePrevStep} style={{ flex: 1 }}>
              Back
            </button>
            <button className="btn-primary" onClick={handleSubmit} style={{ flex: 2 }}>
              <Check size={18} />
              <span>Submit Complaint</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
