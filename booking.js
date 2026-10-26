/* booking.js — seat grid, selection, and mock payment/confirmation flow */

let selectedSeat = null;

function getTrainIdFromUrl() {
  return new URLSearchParams(window.location.search).get("trainId");
}

function renderSeatGrid(train) {
  const grid = document.getElementById("seatGrid");
  grid.innerHTML = "";

  const bookings = getBookings();
  const bookedSeatNumbers = bookings
    .filter(b => b.trainId === train.id && b.status === "Confirmed")
    .map(b => b.seat);

  for (let i = 1; i <= train.totalSeats; i++) {
    const seatLabel = "S" + i;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "seat" + (bookedSeatNumbers.includes(seatLabel) ? " booked" : "");
    btn.textContent = seatLabel;
    btn.disabled = bookedSeatNumbers.includes(seatLabel);

    btn.addEventListener("click", () => {
      document.querySelectorAll(".seat.selected").forEach(s => s.classList.remove("selected"));
      btn.classList.add("selected");
      selectedSeat = seatLabel;
      document.getElementById("confirmBtn").disabled = false;
    });

    grid.appendChild(btn);
  }
}

function confirmBooking(train, user) {
  if (!selectedSeat) return;

  const bookings = getBookings();
  const booking = {
    id: generateId("BK"),
    userId: user.id,
    trainId: train.id,
    trainName: train.name,
    seat: selectedSeat,
    date: train.date,
    fare: train.fare,
    status: "Confirmed"
  };
  bookings.push(booking);
  saveBookings(bookings);

  document.getElementById("bookingPanel").innerHTML = `
    <div class="success" style="font-size:1rem;">
      Booking confirmed! Seat ${selectedSeat} on ${train.name} — Booking ID: ${booking.id}
    </div>
    <a href="dashboard.html" class="btn btn-amber" style="margin-top:14px;">View my bookings</a>
  `;
}