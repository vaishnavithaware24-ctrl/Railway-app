/* data.js
   Acts as the mock database for RRMS.
   Everything is stored in localStorage so it survives a page refresh,
   simulating persistence without a real backend server. */

const DB_KEYS = {
  USERS: "rrms_users",
  TRAINS: "rrms_trains",
  BOOKINGS: "rrms_bookings",
  SESSION: "rrms_current_user"
};

function seedDatabase() {
  if (!localStorage.getItem(DB_KEYS.USERS)) {
    const users = [
      { id: "U1", name: "Admin", email: "admin@rrms.com", password: "admin123", role: "admin" }
    ];
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
  }

  if (!localStorage.getItem(DB_KEYS.TRAINS)) {
    const trains = [
      { id: "T1", name: "Deccan Express", source: "Mumbai", destination: "Pune", date: "2026-10-15", time: "06:15", totalSeats: 30, fare: 450 },
      { id: "T2", name: "Nagpur Superfast", source: "Nagpur", destination: "Mumbai", date: "2026-10-15", time: "20:00", totalSeats: 30, fare: 780 },
      { id: "T3", name: "Konark Express", source: "Bhubaneswar", destination: "Mumbai", date: "2026-10-16", time: "08:40", totalSeats: 30, fare: 950 },
      { id: "T4", name: "Shatabdi Express", source: "Delhi", destination: "Agra", date: "2026-10-16", time: "06:00", totalSeats: 30, fare: 620 }
    ];
    localStorage.setItem(DB_KEYS.TRAINS, JSON.stringify(trains));
  }

  if (!localStorage.getItem(DB_KEYS.BOOKINGS)) {
    localStorage.setItem(DB_KEYS.BOOKINGS, JSON.stringify([]));
  }
}

function getUsers() { return JSON.parse(localStorage.getItem(DB_KEYS.USERS)) || []; }
function saveUsers(users) { localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users)); }

function getTrains() { return JSON.parse(localStorage.getItem(DB_KEYS.TRAINS)) || []; }
function saveTrains(trains) { localStorage.setItem(DB_KEYS.TRAINS, JSON.stringify(trains)); }

function getBookings() { return JSON.parse(localStorage.getItem(DB_KEYS.BOOKINGS)) || []; }
function saveBookings(bookings) { localStorage.setItem(DB_KEYS.BOOKINGS, JSON.stringify(bookings)); }

function getCurrentUser() { return JSON.parse(localStorage.getItem(DB_KEYS.SESSION)); }
function setCurrentUser(user) { localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(user)); }
function clearCurrentUser() { localStorage.removeItem(DB_KEYS.SESSION); }

function generateId(prefix) {
  return prefix + Math.random().toString(36).slice(2, 8).toUpperCase();
}

seedDatabase();