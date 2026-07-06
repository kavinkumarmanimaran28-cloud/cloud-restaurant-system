const paymentMethod = localStorage.getItem("paymentMethod");

document.getElementById("paymentMethod").innerText =
  "Payment Method : " + paymentMethod;

setTimeout(() => {
  window.location.href = "success.html";
}, 2000);