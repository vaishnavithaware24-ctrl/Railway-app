/* auth.js — registration, login, logout, and page-guard logic */

function registerUser(name, email, password) {
  const users = getUsers();
  const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) return { ok: false, message: "An account with this email already exists." };

  const newUser = { id: generateId("U"), name, email, password, role: "passenger" };
  users.push(newUser);
  saveUsers(users);
  return { ok: true, message: "Account created. Please log in." };
}

function loginUser(email, password) {
  const users = getUsers();
  const match = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!match) return { ok: false, message: "Incorrect email or password." };

  setCurrentUser(match);
  return { ok: true, user: match };
}

function logoutUser() {
  clearCurrentUser();
  window.location.href = "index.html";
}

/* Call at the top of any page that requires login.
   adminOnly=true restricts the page to admin accounts only. */
function requireLogin(adminOnly = false) {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "index.html";
    return null;
  }
  if (adminOnly && user.role !== "admin") {
    window.location.href = "search.html";
    return null;
  }
  return user;
}