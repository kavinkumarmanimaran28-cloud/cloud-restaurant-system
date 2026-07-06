document.getElementById("reservationForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const reservation = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    guests: document.getElementById("guests").value,
    tableNo: document.getElementById("tableNo").value
  };

  localStorage.setItem("reservation", JSON.stringify(reservation));

  alert("Table Reserved Successfully!");

  window.location.href = "payment.html";
});