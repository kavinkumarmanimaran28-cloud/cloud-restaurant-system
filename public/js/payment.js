function confirmPayment() {
  const paymentMethod =
    document.querySelector('input[name="payment"]:checked').value;

  localStorage.setItem("paymentMethod", paymentMethod);

  window.location.href = "processing.html";
}