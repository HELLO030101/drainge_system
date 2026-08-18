import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';

// Service Imports
import { 
  initDatabase, 
  getComplaints, 
  saveComplaint, 
  updateComplaintStatus, 
  assignTankerToComplaint, 
  loadDemoData, 
  resetDatabase 
} from './services/db';

// Page Imports
import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentHome from './pages/StudentHome';
import RegisterComplaint from './pages/RegisterComplaint';
import ComplaintDetails from './pages/ComplaintDetails';
import MyComplaints from './pages/MyComplaints';
import TrackTanker from './pages/TrackTanker';
import AwarenessPage from './pages/AwarenessPage';
import StudentProfile from './pages/StudentProfile';

import OfficerLogin from './pages/OfficerLogin';
import OfficerDashboard from './pages/OfficerDashboard';
import OfficerComplaints from './pages/OfficerComplaints';
import OfficerComplaintDetails from './pages/OfficerComplaintDetails';
import ReportsPage from './pages/ReportsPage';
import OfficerProfile from './pages/OfficerProfile';

export default function App() {
  const [role, setRole] = useState('splash'); // 'splash', 'student', 'officer'
  const [activeTab, setActiveTab] = useState('splash');
  const [isWideLayout, setIsWideLayout] = useState(false);

  // User State
  const [studentUser, setStudentUser] = useState({
    name: 'Rahul Sharma',
    mobile: '9876543210',
    hostel: 'Government Engineering College Hostel',
    room: 'Block A, Room 204'
  });

  const [officerUser, setOfficerUser] = useState({
    id: 'admin',
    name: 'Inspector V. K. Patel',
    dept: 'Hostel Sanitation & Sewage Unit'
  });

  // DB Complaints State
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);

  // Initialize DB and load complaints
  const refreshComplaints = async () => {
    try {
      const data = await getComplaints();
      setComplaints(data);
    } catch (err) {
      console.error('Failed to load complaints from DB:', err);
    }
  };

  useEffect(() => {
    async function setup() {
      await initDatabase();
      await refreshComplaints();
    }
    setup();
  }, []);

  // Handle New Complaint Submission
  const handleCreateComplaint = async (complaintData) => {
    await saveComplaint(complaintData);
    await refreshComplaints();
    setSelectedComplaintId(complaintData.id);
    setActiveTab('complaint-details');
  };

  // Handle Tanker Assignment
  const handleAssignTanker = async (id, tankerInfo) => {
    await assignTankerToComplaint(id, tankerInfo);
    await refreshComplaints();
  };

  // Handle Status Updates
  const handleUpdateStatus = async (id, status, note, photo) => {
    await updateComplaintStatus(id, status, note, photo);
    await refreshComplaints();
  };

  // Handle Demo Data Reset & Load
  const handleLoadDemoData = async () => {
    await loadDemoData();
    await refreshComplaints();
    alert('Demo complaints re-loaded successfully into IndexedDB!');
  };

  const handleResetDB = async () => {
    if (window.confirm('Reset database to clean initial state?')) {
      await resetDatabase();
      await refreshComplaints();
      alert('Database reset complete.');
    }
  };

  // Role Switcher Handler
  const handleSwitchRole = () => {
    if (role === 'student') {
      setRole('officer');
      setActiveTab('officer-dashboard');
    } else {
      setRole('student');
      setActiveTab('student-home');
    }
  };

  const currentComplaint = complaints.find(c => c.id === selectedComplaintId) || complaints[0];

  return (
    <div className={`app-viewport ${isWideLayout ? 'desktop-wide' : ''}`}>
      {/* Show Navbar when not on Splash */}
      {role !== 'splash' && (
        <Navbar 
          currentRole={role}
          onSwitchRole={handleSwitchRole}
          isWideLayout={isWideLayout}
          onToggleWide={() => setIsWideLayout(!isWideLayout)}
          notificationCount={complaints.filter(c => c.status !== 'Completed').length}
        />
      )}

      {/* RENDER PAGES BASED ON ROLE & ACTIVE TAB */}
      {role === 'splash' && (
        <SplashPage 
          onStartStudent={() => {
            setRole('student');
            setActiveTab('student-home');
          }}
          onStartOfficer={() => {
            setRole('officer');
            setActiveTab('officer-dashboard');
          }}
        />
      )}

      {/* STUDENT FLOW */}
      {role === 'student' && (
        <>
          {activeTab === 'login' && (
            <LoginPage 
              onLoginSuccess={(userData) => {
                setStudentUser(userData);
                setActiveTab('student-home');
              }}
              onGoRegister={() => setActiveTab('register')}
              onBackSplash={() => setRole('splash')}
            />
          )}

          {activeTab === 'register' && (
            <RegisterPage 
              onRegisterSuccess={(userData) => {
                setStudentUser(userData);
                setActiveTab('student-home');
              }}
              onGoLogin={() => setActiveTab('login')}
            />
          )}

          {activeTab === 'student-home' && (
            <StudentHome 
              user={studentUser}
              recentComplaints={complaints}
              onNavigate={(tab, id) => {
                if (id) setSelectedComplaintId(id);
                setActiveTab(tab);
              }}
            />
          )}

          {activeTab === 'register-complaint' && (
            <RegisterComplaint 
              user={studentUser}
              onSubmitComplaint={handleCreateComplaint}
              onCancel={() => setActiveTab('student-home')}
            />
          )}

          {activeTab === 'my-complaints' && (
            <MyComplaints 
              complaints={complaints}
              onNavigate={(tab, id) => {
                if (id) setSelectedComplaintId(id);
                setActiveTab(tab);
              }}
              onBack={() => setActiveTab('student-home')}
            />
          )}

          {activeTab === 'complaint-details' && (
            <ComplaintDetails 
              complaint={currentComplaint}
              onBack={() => setActiveTab('my-complaints')}
              onTrackTanker={(id) => {
                setSelectedComplaintId(id);
                setActiveTab('track-tanker');
              }}
            />
          )}

          {activeTab === 'track-tanker' && (
            <TrackTanker 
              complaint={currentComplaint}
              onBack={() => setActiveTab('student-home')}
            />
          )}

          {activeTab === 'awareness' && (
            <AwarenessPage 
              onBack={() => setActiveTab('student-home')}
            />
          )}

          {activeTab === 'student-profile' && (
            <StudentProfile 
              user={studentUser}
              complaints={complaints}
              onLogout={() => {
                setRole('splash');
                setActiveTab('splash');
              }}
              onSwitchOfficer={handleSwitchRole}
            />
          )}
        </>
      )}

      {/* OFFICER FLOW */}
      {role === 'officer' && (
        <>
          {activeTab === 'officer-login' && (
            <OfficerLogin 
              onLoginSuccess={(officerData) => {
                setOfficerUser(officerData);
                setActiveTab('officer-dashboard');
              }}
              onBackStudent={() => {
                setRole('student');
                setActiveTab('student-home');
              }}
            />
          )}

          {activeTab === 'officer-dashboard' && (
            <OfficerDashboard 
              officer={officerUser}
              complaints={complaints}
              onNavigate={(tab, id) => {
                if (id) setSelectedComplaintId(id);
                setActiveTab(tab);
              }}
              onLoadDemoData={handleLoadDemoData}
              onResetDB={handleResetDB}
            />
          )}

          {activeTab === 'officer-complaints' && (
            <OfficerComplaints 
              complaints={complaints}
              onNavigate={(tab, id) => {
                if (id) setSelectedComplaintId(id);
                setActiveTab(tab);
              }}
            />
          )}

          {activeTab === 'officer-complaint-details' && (
            <OfficerComplaintDetails 
              complaint={currentComplaint}
              onBack={() => setActiveTab('officer-dashboard')}
              onUpdateStatus={handleUpdateStatus}
              onAssignTanker={handleAssignTanker}
            />
          )}

          {activeTab === 'officer-tanker' && (
            <TrackTanker 
              complaint={currentComplaint}
              onBack={() => setActiveTab('officer-dashboard')}
            />
          )}

          {activeTab === 'officer-reports' && (
            <ReportsPage 
              complaints={complaints}
            />
          )}

          {activeTab === 'officer-profile' && (
            <OfficerProfile 
              officer={officerUser}
              onLogout={() => {
                setRole('splash');
                setActiveTab('splash');
              }}
              onSwitchStudent={handleSwitchRole}
            />
          )}
        </>
      )}

      {/* Bottom Navigation for Student or Officer */}
      {role !== 'splash' && activeTab !== 'login' && activeTab !== 'register' && activeTab !== 'officer-login' && (
        <BottomNav 
          role={role}
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
        />
      )}
    </div>
  );
}
