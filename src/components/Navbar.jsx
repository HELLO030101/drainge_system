import React from 'react';
import { Droplet, Bell, Monitor, Smartphone, ShieldCheck, UserCheck } from 'lucide-react';

export default function Navbar({ currentRole, onSwitchRole, isWideLayout, onToggleWide, notificationCount = 2 }) {
  return (
    <header className="top-header">
      <div className="brand-container">
        <div className="brand-logo">
          <Droplet size={22} strokeWidth={2.5} />
        </div>
        <div className="brand-info">
          <h1>DrainCare</h1>
          <p>Smart Sewage Care</p>
        </div>
      </div>

      <div className="top-actions">
        {/* Toggle Desktop Wide vs Mobile Frame view */}
        <button 
          className="icon-btn" 
          onClick={onToggleWide}
          title={isWideLayout ? "Switch to Mobile View" : "Switch to Wide Desktop View"}
        >
          {isWideLayout ? <Smartphone size={18} /> : <Monitor size={18} />}
        </button>

        {/* Role Switcher Pill */}
        <button 
          className={`role-badge ${currentRole === 'student' ? 'student' : 'officer'}`}
          onClick={onSwitchRole}
          title="Click to switch role (Demo)"
        >
          {currentRole === 'student' ? (
            <>
              <UserCheck size={14} /> Student
            </>
          ) : (
            <>
              <ShieldCheck size={14} /> Officer
            </>
          )}
        </button>

        {/* Notifications Icon */}
        <button className="icon-btn" title="Notifications">
          <Bell size={18} />
          {notificationCount > 0 && <span className="badge-dot" />}
        </button>
      </div>
    </header>
  );
}
