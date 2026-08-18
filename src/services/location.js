// Geolocation Service for DrainCare Application

export const DEFAULT_HOSTEL_LOCATION = {
  lat: 23.0225,
  lng: 72.5714,
  hostelName: 'Government Engineering College Hostel',
  address: 'Block A, GEC Hostel Campus, Sector 28'
};

export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          address: `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`
        });
      },
      (error) => {
        let msg = 'Unable to retrieve location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg = 'Location permission denied by user.';
            break;
          case error.POSITION_UNAVAILABLE:
            msg = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            msg = 'Location request timed out.';
            break;
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}

// Calculate distance in km between two lat/lng points using Haversine formula
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
