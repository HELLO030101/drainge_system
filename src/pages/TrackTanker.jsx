import React from 'react';
import { ArrowLeft, Phone, Truck, Clock, Shield, AlertCircle } from 'lucide-react';
import TankerMap from '../components/TankerMap';

export default function TrackTanker({ complaint, onBack }) {
  const driverName = complaint?.tanker?.driverName || 'Mahesh Chauhan';
  const driverPhone = complaint?.tanker?.driverPhone || '9876543210';
  const vehicleNo = complaint?.tanker?.vehicleNo || 'GJ 01 GA 6789';
  const capacity = complaint?.tanker?.capacity || '5000 Liters';
  const eta = complaint?.tanker?.eta || '15 mins';

  return (
    <div className="page-content">
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>
          Track Tanker
        </h2>
        <div style={{ width: 36 }} />
      </div>

      {/* Top Green Status Card */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #059669, #047857)',
        color: 'white',
        border: 'none',
        borderRadius: '16px',
        padding: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px'
          }}>
            🚛
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', lineHeight: 1.2 }}>
              Tanker On The Way
            </h3>
            <p style={{ fontSize: '0.8rem', opacity: 0.9, marginTop: 2 }}>
              Expected Arrival: <strong style={{ color: '#fef08a' }}>{eta}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Tanker Route Leaflet Map */}
      <div style={{ marginBottom: '16px' }}>
        <TankerMap 
          hostelLat={complaint?.location?.lat || 23.0225}
          hostelLng={complaint?.location?.lng || 72.5714}
        />
      </div>

      {/* Driver / Tanker Card */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>
              {driverName}
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
              Assigned Sanitation Driver
            </span>
          </div>

          <a 
            href={`tel:${driverPhone}`}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #a7f3d0',
              textDecoration: 'none'
            }}
            title="Call Driver"
          >
            <Phone size={20} />
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.82rem', marginBottom: '16px' }}>
          <div style={{ backgroundColor: '#f8fafc', padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block', fontWeight: 600 }}>VEHICLE NUMBER</span>
            <strong style={{ color: '#0f172a', fontSize: '0.9rem' }}>{vehicleNo}</strong>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block', fontWeight: 600 }}>SUCTION CAPACITY</span>
            <strong style={{ color: '#047857', fontSize: '0.9rem' }}>{capacity}</strong>
          </div>
        </div>

        {/* Primary Call Driver Button */}
        <a 
          href={`tel:${driverPhone}`}
          className="btn-primary"
          style={{ textDecoration: 'none' }}
        >
          <Phone size={18} />
          <span>Call Driver ({driverPhone})</span>
        </a>

        {/* Demo Disclaimer */}
        <div style={{ marginTop: '14px', textAlign: 'center', fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          <AlertCircle size={13} /> Demo vehicle tracking simulation for internship project
        </div>
      </div>
    </div>
  );
}
