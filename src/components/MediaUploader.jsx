import React, { useRef } from 'react';
import { Camera, Image as ImageIcon, Video, Trash2, CheckCircle2, Film } from 'lucide-react';

export default function MediaUploader({ photo, video, onChangePhoto, onChangeVideo }) {
  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handlePhotoFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      onChangePhoto(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleVideoFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      onChangeVideo(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Hidden File Inputs */}
      <input 
        type="file" 
        accept="image/*" 
        capture="environment"
        ref={photoInputRef}
        onChange={handlePhotoFile}
        style={{ display: 'none' }}
      />
      <input 
        type="file" 
        accept="video/*" 
        capture="environment"
        ref={videoInputRef}
        onChange={handleVideoFile}
        style={{ display: 'none' }}
      />

      {/* Photo Upload Area */}
      <div>
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Upload Complaint Photo *</span>
          {photo && <span style={{ color: '#10b981', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}><CheckCircle2 size={14} /> Photo Attached</span>}
        </label>

        {photo ? (
          <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <img 
              src={photo} 
              alt="Complaint Evidence" 
              style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} 
            />
            <button 
              onClick={() => onChangePhoto(null)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(239, 68, 68, 0.9)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
              title="Remove Photo"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ) : (
          <div 
            onClick={() => photoInputRef.current?.click()}
            style={{
              border: '2px dashed #059669',
              backgroundColor: '#ecfdf5',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              backgroundColor: '#d1fae5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              color: '#059669'
            }}>
              <Camera size={28} />
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
              Take Photo
            </h4>
            <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
              or <span style={{ color: '#059669', fontWeight: 600, textDecoration: 'underline' }}>Choose from Gallery</span>
            </p>
          </div>
        )}
      </div>

      {/* Video Upload Area (Optional) */}
      <div>
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Add Video (Optional)</span>
          {video && <span style={{ color: '#10b981', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}><CheckCircle2 size={14} /> Video Attached</span>}
        </label>

        {video ? (
          <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', backgroundColor: '#0f172a' }}>
            <video 
              src={video} 
              controls 
              style={{ width: '100%', maxHeight: '200px', display: 'block' }} 
            />
            <button 
              onClick={() => onChangeVideo(null)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(239, 68, 68, 0.9)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
              title="Remove Video"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ) : (
          <button 
            type="button"
            className="btn-secondary"
            onClick={() => videoInputRef.current?.click()}
            style={{ borderStyle: 'dashed', backgroundColor: '#f8fafc' }}
          >
            <Video size={18} style={{ color: '#059669' }} />
            <span>Record or Choose Video</span>
          </button>
        )}
      </div>
    </div>
  );
}
