// IndexedDB Service for DrainCare Application

const DB_NAME = 'DrainCareDB';
const DB_VERSION = 1;

export const INITIAL_DEMO_COMPLAINTS = [
  {
    id: '#DC20260818001',
    userMobile: '9876543210',
    userName: 'Rahul Sharma',
    hostelName: 'Government Engineering College Hostel',
    hostelAddress: 'Hostel Block A, Behind Mess & Kitchen Area',
    location: {
      lat: 23.0225,
      lng: 72.5714,
      address: 'Block A Rear Drainage line, GEC Campus'
    },
    category: 'Sewage Leakage / Overflow',
    description: 'Severe sewage overflow near Block A rear exit. Stagnant foul water accumulating near mess entrance creating unhygienic conditions and foul smell.',
    severity: 'High',
    media: {
      photo: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23e2e8f0"/><circle cx="200" cy="150" r="80" fill="%2310b981" opacity="0.2"/><path d="M120 180 Q 200 120 280 180" stroke="%23047857" stroke-width="8" fill="none"/><text x="200" y="240" font-family="sans-serif" font-size="16" font-weight="bold" fill="%23065f46" text-anchor="middle">Sewage Leakage Photo - Block A</text></svg>',
      video: null
    },
    createdAt: '2026-08-18T10:30:00.000Z',
    dateDisplay: '18 Aug 2026, 10:30 AM',
    status: 'Tanker On The Way',
    timeline: [
      { status: 'Complaint Registered', timestamp: '18 Aug 2026, 10:30 AM', done: true, note: 'Complaint submitted by student' },
      { status: 'Assigned to Municipal Team', timestamp: '18 Aug 2026, 11:15 AM', done: true, note: 'Assigned to Sanitation Unit 4' },
      { status: 'Tanker On The Way', timestamp: '18 Aug 2026, 11:45 AM', done: true, note: 'Tanker GJ 01 GA 6789 dispatched' },
      { status: 'Work Completed', timestamp: null, done: false, note: 'Awaiting site work completion' }
    ],
    tanker: {
      driverName: 'Mahesh Chauhan',
      driverPhone: '9876543210',
      vehicleNo: 'GJ 01 GA 6789',
      capacity: '5000 Liters',
      eta: '15 mins',
      assignedAt: '18 Aug 2026, 11:45 AM'
    },
    resolution: null
  },
  {
    id: '#DC20260817004',
    userMobile: '9876543210',
    userName: 'Rahul Sharma',
    hostelName: 'Government Engineering College Hostel',
    hostelAddress: 'Hostel Block B, Main Entrance Path',
    location: {
      lat: 23.0232,
      lng: 72.5721,
      address: 'Main Entrance Drainage Duct, Block B'
    },
    category: 'Drainage Blockage',
    description: 'Main drainage pipe blocked due to debris build-up. Water backing up slowly into ground floor washroom drains.',
    severity: 'Medium',
    media: {
      photo: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f1f5f9"/><rect x="100" y="80" width="200" height="140" rx="12" fill="%23cbd5e1"/><text x="200" y="160" font-family="sans-serif" font-size="16" font-weight="bold" fill="%23334155" text-anchor="middle">Blocked Drain Duct Photo</text></svg>',
      video: null
    },
    createdAt: '2026-08-17T15:20:00.000Z',
    dateDisplay: '17 Aug 2026, 03:20 PM',
    status: 'Completed',
    timeline: [
      { status: 'Complaint Registered', timestamp: '17 Aug 2026, 03:20 PM', done: true, note: 'Registered' },
      { status: 'Assigned to Municipal Team', timestamp: '17 Aug 2026, 04:00 PM', done: true, note: 'Assigned' },
      { status: 'Tanker On The Way', timestamp: '17 Aug 2026, 04:30 PM', done: true, note: 'High-pressure jetting machine dispatched' },
      { status: 'Work Completed', timestamp: '17 Aug 2026, 05:45 PM', done: true, note: 'Blockage cleared using high-pressure water jetting.' }
    ],
    tanker: {
      driverName: 'Vikram Singh',
      driverPhone: '9812345678',
      vehicleNo: 'GJ 01 GA 4321',
      capacity: '4000 Liters',
      eta: 'Arrived & Completed',
      assignedAt: '17 Aug 2026, 04:30 PM'
    },
    resolution: {
      note: 'Drainage pipe cleared completely. Wastewater drained away cleanly.',
      photo: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23ecfdf5"/><circle cx="200" cy="150" r="70" fill="%2310b981" opacity="0.3"/><text x="200" y="155" font-family="sans-serif" font-size="16" font-weight="bold" fill="%23047857" text-anchor="middle">Resolution Proof: Drain Cleared ✓</text></svg>',
      completedAt: '17 Aug 2026, 05:45 PM'
    }
  },
  {
    id: '#DC20260816002',
    userMobile: '9123456789',
    userName: 'Priya Patel',
    hostelName: 'Girls Hostel Block C',
    hostelAddress: 'Girls Hostel Mess Quadrangle',
    location: {
      lat: 23.0210,
      lng: 72.5700,
      address: 'Quadrangle Drain Grate, Girls Hostel C'
    },
    category: 'Wastewater Stagnation',
    description: 'Stagnant wastewater collected in the central quadrangle after heavy mess cleaning. Mosquito breeding hazard.',
    severity: 'Medium',
    media: { photo: null, video: null },
    createdAt: '2026-08-16T09:10:00.000Z',
    dateDisplay: '16 Aug 2026, 09:10 AM',
    status: 'In Progress',
    timeline: [
      { status: 'Complaint Registered', timestamp: '16 Aug 2026, 09:10 AM', done: true, note: 'Registered' },
      { status: 'Assigned to Municipal Team', timestamp: '16 Aug 2026, 10:00 AM', done: true, note: 'Team assigned' },
      { status: 'Tanker On The Way', timestamp: null, done: false, note: 'Awaiting vehicle dispatch' },
      { status: 'Work Completed', timestamp: null, done: false, note: 'Pending' }
    ],
    tanker: null,
    resolution: null
  },
  {
    id: '#DC20260815008',
    userMobile: '9988776655',
    userName: 'Amit Verma',
    hostelName: 'PG Research Hostel',
    hostelAddress: 'Near Hostel Canteen & Parking Lot',
    location: {
      lat: 23.0240,
      lng: 72.5730,
      address: 'Main Manhole Line, PG Hostel Road'
    },
    category: 'Manhole Problem',
    description: 'Manhole cover cracked and loose, leaking foul gas and wastewater during peak hours.',
    severity: 'High',
    media: { photo: null, video: null },
    createdAt: '2026-08-15T14:45:00.000Z',
    dateDisplay: '15 Aug 2026, 02:45 PM',
    status: 'New',
    timeline: [
      { status: 'Complaint Registered', timestamp: '15 Aug 2026, 02:45 PM', done: true, note: 'Registered' },
      { status: 'Assigned to Municipal Team', timestamp: null, done: false, note: 'Pending assignment' },
      { status: 'Tanker On The Way', timestamp: null, done: false, note: 'Pending' },
      { status: 'Work Completed', timestamp: null, done: false, note: 'Pending' }
    ],
    tanker: null,
    resolution: null
  },
  {
    id: '#DC20260814003',
    userMobile: '9876543210',
    userName: 'Rahul Sharma',
    hostelName: 'Government Engineering College Hostel',
    hostelAddress: 'Hostel Gate 2 Main Drainage Chamber',
    location: {
      lat: 23.0218,
      lng: 72.5708,
      address: 'Chamber 4, Gate 2 Drain Exit'
    },
    category: 'Garbage Accumulation',
    description: 'Plastic bags and debris clogging the external drainage chamber leading to main campus sewer line.',
    severity: 'Low',
    media: { photo: null, video: null },
    createdAt: '2026-08-14T11:00:00.000Z',
    dateDisplay: '14 Aug 2026, 11:00 AM',
    status: 'Completed',
    timeline: [
      { status: 'Complaint Registered', timestamp: '14 Aug 2026, 11:00 AM', done: true, note: 'Submitted' },
      { status: 'Assigned to Municipal Team', timestamp: '14 Aug 2026, 11:30 AM', done: true, note: 'Assigned' },
      { status: 'Tanker On The Way', timestamp: '14 Aug 2026, 12:15 PM', done: true, note: 'Cleaning crew dispatched' },
      { status: 'Work Completed', timestamp: '14 Aug 2026, 01:30 PM', done: true, note: 'Debris removed and chamber desilted' }
    ],
    tanker: {
      driverName: 'Suresh Kumar',
      driverPhone: '9765432109',
      vehicleNo: 'GJ 01 GA 1234',
      capacity: '3000 Liters',
      eta: 'Completed',
      assignedAt: '14 Aug 2026, 12:15 PM'
    },
    resolution: {
      note: 'Garbage cleared manually and chamber flushed with suction hose.',
      photo: null,
      completedAt: '14 Aug 2026, 01:30 PM'
    }
  }
];

export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('complaints')) {
        db.createObjectStore('complaints', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'mobile' });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.error);
      reject(event.target.error);
    };
  });
}

export async function initDatabase() {
  try {
    const db = await openDatabase();
    const tx = db.transaction('complaints', 'readonly');
    const store = tx.objectStore('complaints');
    const countReq = store.count();

    return new Promise((resolve) => {
      countReq.onsuccess = async () => {
        if (countReq.result === 0) {
          await loadDemoData();
        }
        resolve(true);
      };
      countReq.onerror = () => resolve(false);
    });
  } catch (err) {
    console.error('Failed to init DB:', err);
    return false;
  }
}

export async function loadDemoData() {
  const db = await openDatabase();
  const tx = db.transaction('complaints', 'readwrite');
  const store = tx.objectStore('complaints');

  for (const item of INITIAL_DEMO_COMPLAINTS) {
    store.put(item);
  }

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(true);
    tx.onerror = (e) => reject(e.target.error);
  });
}

export async function resetDatabase() {
  const db = await openDatabase();
  const tx = db.transaction('complaints', 'readwrite');
  const store = tx.objectStore('complaints');
  store.clear();

  return new Promise((resolve, reject) => {
    tx.oncomplete = async () => {
      await loadDemoData();
      resolve(true);
    };
    tx.onerror = (e) => reject(e.target.error);
  });
}

export async function getComplaints() {
  const db = await openDatabase();
  const tx = db.transaction('complaints', 'readonly');
  const store = tx.objectStore('complaints');
  const req = store.getAll();

  return new Promise((resolve, reject) => {
    req.onsuccess = () => {
      // Sort newest first
      const sorted = (req.result || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      resolve(sorted);
    };
    req.onerror = (e) => reject(e.target.error);
  });
}

export async function getComplaintById(id) {
  const db = await openDatabase();
  const tx = db.transaction('complaints', 'readonly');
  const store = tx.objectStore('complaints');
  const req = store.get(id);

  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = (e) => reject(e.target.error);
  });
}

export async function saveComplaint(complaintData) {
  const db = await openDatabase();
  const tx = db.transaction('complaints', 'readwrite');
  const store = tx.objectStore('complaints');

  store.put(complaintData);

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(complaintData);
    tx.onerror = (e) => reject(e.target.error);
  });
}

export async function updateComplaintStatus(id, newStatus, note = '', completionPhoto = null) {
  const complaint = await getComplaintById(id);
  if (!complaint) throw new Error('Complaint not found');

  complaint.status = newStatus;
  const now = new Date();
  const timeStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' +
                  now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  // Update timeline stages
  const stageMap = {
    'New': 0,
    'Assigned': 1,
    'Tanker On The Way': 2,
    'Work In Progress': 2,
    'Completed': 3
  };

  const currentStageIndex = stageMap[newStatus] !== undefined ? stageMap[newStatus] : 1;

  complaint.timeline = complaint.timeline.map((item, idx) => {
    if (idx <= currentStageIndex) {
      return {
        ...item,
        done: true,
        timestamp: item.timestamp || timeStr,
        note: idx === currentStageIndex ? (note || item.note) : item.note
      };
    }
    return item;
  });

  if (newStatus === 'Completed') {
    complaint.resolution = {
      note: note || 'Sanitation work completed successfully.',
      photo: completionPhoto || complaint.media?.photo || null,
      completedAt: timeStr
    };
  }

  return await saveComplaint(complaint);
}

export async function assignTankerToComplaint(id, tankerInfo) {
  const complaint = await getComplaintById(id);
  if (!complaint) throw new Error('Complaint not found');

  const now = new Date();
  const timeStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' +
                  now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  complaint.tanker = {
    driverName: tankerInfo.driverName || 'Mahesh Chauhan',
    driverPhone: tankerInfo.driverPhone || '9876543210',
    vehicleNo: tankerInfo.vehicleNo || 'GJ 01 GA 6789',
    capacity: tankerInfo.capacity || '5000 Liters',
    eta: tankerInfo.eta || '15 mins',
    assignedAt: timeStr
  };

  complaint.status = 'Tanker On The Way';

  // Mark timeline stage 1 & 2 as done
  complaint.timeline[0].done = true;
  complaint.timeline[1].done = true;
  complaint.timeline[1].timestamp = timeStr;
  complaint.timeline[1].note = `Assigned to ${complaint.tanker.driverName} (${complaint.tanker.vehicleNo})`;

  complaint.timeline[2].done = true;
  complaint.timeline[2].timestamp = timeStr;
  complaint.timeline[2].note = `Tanker ${complaint.tanker.vehicleNo} dispatched. ETA: ${complaint.tanker.eta}`;

  return await saveComplaint(complaint);
}
