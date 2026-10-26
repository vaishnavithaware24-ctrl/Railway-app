/* dashboard.js — booking history and cancellation for the logged-in user */

function renderHistory(user) {
  const all = getBookings();
  const mine = all.filter(b => b.userId === user.id);
  const tbody = document.getElementById("historyBody");
  tbody.innerHTML = "";

  if (mine.length === 0) {
    document.getElementById("historyWrap").innerHTML = `<div class="empty-state">No bookings yet. Go search a train.</div>`;
    return;
  }

  mine.forEach(b => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${b.id}</td>
      <td>${b.trainName}</td>
      <td>${b.seat}</td>
      <td>${b.date}</td>
      <td>&#8377;${b.fare}</td>
      <td class="status-${b.status.toLowerCase()}">${b.status}</td>
      <td>${b.status === "Confirmed" ? `<button class="btn btn-danger cancel-btn" data-id="${b.id}">Cancel</button>` : "—"}</td>
    `;
    tbody.appendChild(row);
  });

  document.querySelectorAll(".cancel-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      cancelBooking(btn.dataset.id);
      renderHistory(user);
    });
  });
}

function cancelBooking(bookingId) {
  const bookings = getBookings();
  const updated = bookings.map(b =>
    b.id === bookingId ? { ...b, status: "Cancelled" } : b
  );
  saveBookings(updated);
}