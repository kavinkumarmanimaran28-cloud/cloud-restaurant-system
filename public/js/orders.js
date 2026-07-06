const ordersContainer = document.getElementById("ordersContainer");

async function loadOrders() {
  try {
    const response = await fetch("http://localhost:5000/orders");
    const orders = await response.json();

    if (orders.length === 0) {
      ordersContainer.innerHTML = `<p class="empty">No orders found</p>`;
      return;
    }

    let output = "";

    orders.forEach(order => {
      output += `
        <div class="order-card">
          <h2>Order ID : ORD${order.order_id}</h2>

          <p><strong>Payment:</strong> ${order.payment_method}</p>

          <p><strong>Amount:</strong> ₹${order.final_amount}</p>

          <p><strong>Table:</strong> ${order.table_no}</p>

          <p><strong>Guests:</strong> ${order.guests}</p>

          <p><strong>Date:</strong> ${new Date(order.order_date).toLocaleString()}</p>

          <p><strong>Status:</strong> ${order.order_status}</p>
        </div>
      `;
    });

    ordersContainer.innerHTML = output;

  } catch (error) {
    ordersContainer.innerHTML =
      `<p class="empty">Unable to load orders</p>`;
  }
}

loadOrders();