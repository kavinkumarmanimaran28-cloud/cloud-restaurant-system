const reservation = JSON.parse(localStorage.getItem("reservation"));

const paymentMethod = localStorage.getItem("paymentMethod");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const total = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

const prepTime =
  Math.floor(15 + Math.random() * 10);

let savedOrderId = localStorage.getItem("lastOrderId");

async function saveOrderToDatabase() {
  if (!reservation || cart.length === 0) {
    document.getElementById("details").innerHTML =
      `<p>Order details not found.</p>`;
    return;
  }

  const orderData = {
    tableNo: reservation.tableNo,
    guests: reservation.guests,
    paymentMethod: paymentMethod,
    totalAmount: total
  };

  try {
    const response = await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();

    if (response.ok) {
      savedOrderId = data.orderId;
      localStorage.setItem("lastOrderId", savedOrderId);
      displaySuccess(savedOrderId);
    } else {
      document.getElementById("details").innerHTML =
        `<p>Order save failed.</p>`;
    }
  } catch (error) {
    document.getElementById("details").innerHTML =
      `<p>Server error while saving order.</p>`;
  }
}

function displaySuccess(orderId) {
  document.getElementById("details").innerHTML = `
    <hr>

    <h2>Order ID : ORD${orderId}</h2>

    <h3>Table : ${reservation.tableNo}</h3>

    <h3>Guests : ${reservation.guests}</h3>

    <h3>Payment : ${paymentMethod}</h3>

    <h3>Total Amount : ₹${total}</h3>

    <h3>Estimated Preparation Time : ${prepTime} Minutes</h3>

    <hr>

    <p>Thank you for ordering with Cloud Restaurant ❤️</p>
  `;
}

saveOrderToDatabase();

function clearCart() {
  localStorage.removeItem("cart");
  localStorage.removeItem("reservation");
  localStorage.removeItem("paymentMethod");
  localStorage.removeItem("lastOrderId");
}