/* admin.js — manage trains, view users, view booking/revenue reports */

function renderTrainTable() {
  const trains = getTrains();
  const tbody = document.getElementById("trainBody");
  tbody.innerHTML = "";

  trains.forEach(t => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${t.name}</td>
      <td>${t.source} &rarr; ${t.destination}</td>
      <td>${t.date} ${t.time}</td>
      <td>&#8377;${t.fare}</td>
      <td>${t.totalSeats}</td>
      <td><button class="btn btn-danger delete-train" data-id="${t.id}">Delete</button></td>
    `;
    tbody.appendChild(row);
  });

  document.querySelectorAll(".delete-train").forEach(btn => {
    btn.addEventListener("click", () => {
      const trains = getTrains().filter(t => t.id !== btn.dataset.id);
      saveTrains(trains);
      renderTrainTable();
    });
  });
}

function addTrain(data) {
  const trains = getTrains();
  trains.push({ id: generateId("T"), ...data });
  saveTrains(trains);
  renderTrainTable();
}

function renderUserTable() {
  const users = getUsers();
  const tbody = document.getElementById("userBody");
  tbody.innerHTML = "";
  users.forEach(u => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${u.name}</td><td>${u.email}</td><td>${u.role}</td>`;
    tbody.appendChild(row);
  });
}

function renderReport() {
  const bookings = getBookings();
  const confirmed = bookings.filter(b => b.status === "Confirmed");
  const revenue = confirmed.reduce((sum, b) => sum + b.fare, 0);

  document.getElementById("reportStats").innerHTML = `
    <div class="ticket-card" style="padding:18px 22px;"><strong>${bookings.length}</strong><br>Total bookings</div>
    <div class="ticket-card" style="padding:18px 22px;"><strong>${confirmed.length}</strong><br>Confirmed</div>
    <div class="ticket-card" style="padding:18px 22px;"><strong>&#8377;${revenue}</strong><br>Revenue</div>
  `;
}