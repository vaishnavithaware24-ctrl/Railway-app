/* search.js — filters mock trains and renders ticket-style result cards */

function renderResults(trains) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (trains.length === 0) {
    container.innerHTML = `<div class="empty-state">No trains found for that route/date.</div>`;
    return;
  }

  const bookings = getBookings();

  trains.forEach(train => {
    const bookedSeats = bookings.filter(
      b => b.trainId === train.id && b.status === "Confirmed"
    ).length;
    const seatsLeft = train.totalSeats - bookedSeats;

    const card = document.createElement("div");
    card.className = "ticket-card";
    card.innerHTML = `
      <div class="ticket-main">
        <div class="train-name">${train.name}</div>
        <div class="route">${train.source} &rarr; ${train.destination} &middot; ${train.date}</div>
        <div class="times">
          <span><strong>${train.time}</strong> departure</span>
        </div>
      </div>
      <div class="ticket-stub">
        <div class="fare">&#8377;${train.fare}</div>
        <div class="seats">${seatsLeft} seats left</div>
        <a class="btn btn-amber" href="booking.html?trainId=${train.id}">Book</a>
      </div>
    `;
    container.appendChild(card);
  });
}

function runSearch() {
  const source = document.getElementById("source").value.trim().toLowerCase();
  const destination = document.getElementById("destination").value.trim().toLowerCase();
  const date = document.getElementById("date").value;

  let trains = getTrains();

  if (source) trains = trains.filter(t => t.source.toLowerCase().includes(source));
  if (destination) trains = trains.filter(t => t.destination.toLowerCase().includes(destination));
  if (date) trains = trains.filter(t => t.date === date);

  renderResults(trains);
}