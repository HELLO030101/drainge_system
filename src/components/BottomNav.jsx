import React from 'react';
import { Home, FileText, Plus, Truck, User, LayoutDashboard, BarChart3, AlertCircle } from 'lucide-react';

export default function BottomNav({ role = 'student', activeTab, onSelectTab }) {
  if (role === 'officer') {
    return (
      <nav className="bottom-nav">
        <button 
          className={`nav-item ${activeTab === 'officer-dashboard' ? 'active' : ''}`}
          onClick={() => onSelectTab('officer-dashboard')}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'officer-complaints' ? 'active' : ''}`}
          onClick={() => onSelectTab('officer-complaints')}
        >
          <FileText size={20} />
          <span>Complaints</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'officer-tanker' ? 'active' : ''}`}
          onClick={() => onSelectTab('officer-tanker')}
        >
          <Truck size={20} />
          <span>Tanker</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'officer-reports' ? 'active' : ''}`}
          onClick={() => onSelectTab('officer-reports')}
        >
          <BarChart3 size={20} />
          <span>Reports</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'officer-profile' ? 'active' : ''}`}
          onClick={() => onSelectTab('officer-profile')}
        >
          <User size={20} />
          <span>Profile</span>
        </button>
      </nav>
    );
  }

  return (
    <nav className="bottom-nav">
      <button 
        className={`nav-item ${activeTab === 'student-home' ? 'active' : ''}`}
        onClick={() => onSelectTab('student-home')}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button 
        className={`nav-item ${activeTab === 'my-complaints' ? 'active' : ''}`}
        onClick={() => onSelectTab('my-complaints')}
      >
        <FileText size={20} />
        <span>Complaints</span>
      </button>

      {/* Large Circular Green Button for Register Complaint */}
      <button 
        className="nav-report-btn"
        onClick={() => onSelectTab('register-complaint')}
        title="Report New Complaint"
      >
        <Plus size={28} strokeWidth={2.8} />
      </button>

      <button 
        className={`nav-item ${activeTab === 'track-tanker' ? 'active' : ''}`}
        onClick={() => onSelectTab('track-tanker')}
      >
        <Truck size={20} />
        <span>Tanker</span>
      </button>

      <button 
        className={`nav-item ${activeTab === 'student-profile' ? 'active' : ''}`}
        onClick={() => onSelectTab('student-profile')}
      >
        <User size={20} />
        <span>Profile</span>
      </button>
    </nav>
  );
}
