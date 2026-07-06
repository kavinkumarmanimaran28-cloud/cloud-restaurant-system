if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
}
let revenueChartInstance = null;
let paymentChartInstance = null;

async function loadUsersCount() {
  try {
    const response = await fetch("http://localhost:5000/users");
    const users = await response.json();

    document.getElementById("totalUsers").innerText = users.length;
  } catch (error) {
    console.log(error);
    document.getElementById("totalUsers").innerText = "0";
  }
}

async function loadDashboardData() {
  try {
    const ordersResponse = await fetch("http://localhost:5000/orders");
    const orders = await ordersResponse.json();

    const reviewsResponse = await fetch("http://localhost:5000/reviews");
    const reviews = await reviewsResponse.json();

    const totalOrders = orders.length;

    const totalRevenue = orders.reduce(
      (sum, order) => sum + Number(order.final_amount || order.total_amount || 0),
      0
    );

    document.getElementById("totalOrders").innerText = totalOrders;
    document.getElementById("totalRevenue").innerText = totalRevenue;
    document.getElementById("totalReviews").innerText = reviews.length;

    displayRecentOrders(orders);
    renderRevenueChart(orders);
    renderPaymentChart(orders);
    loadContactMessages();

  } catch (error) {
    console.log(error);
  }
}

function displayRecentOrders(orders) {
  const recentOrders = document.getElementById("recentOrders");

  if (!orders || orders.length === 0) {
    recentOrders.innerHTML =
      `<p class="empty">No recent orders found</p>`;
    return;
  }

  let output = "";

  orders.forEach(order => {
    output += `
      <div class="order-card">
        <h3>Order ID : ORD${order.order_id}</h3>

        <p><strong>Payment:</strong> ${order.payment_method || "N/A"}</p>

        <p><strong>Amount:</strong> ₹${order.final_amount || order.total_amount}</p>

        <p><strong>Table:</strong> ${order.table_no || "N/A"}</p>

        <p><strong>Guests:</strong> ${order.guests || "N/A"}</p>

        <p><strong>Date:</strong> ${new Date(order.order_date).toLocaleString()}</p>

        <p><strong>Status:</strong> ${order.order_status || "Confirmed"}</p>
      </div>
    `;
  });

  recentOrders.innerHTML = output;
}

function renderRevenueChart(orders) {
  const labels = orders.map(order => "ORD" + order.order_id);

  const data = orders.map(order =>
    Number(order.final_amount || order.total_amount || 0)
  );

  if (revenueChartInstance) {
    revenueChartInstance.destroy();
  }

  revenueChartInstance = new Chart(document.getElementById("revenueChart"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Revenue ₹",
        data: data,
        backgroundColor: "#00c853"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "white"
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "white"
          }
        },
        y: {
          ticks: {
            color: "white"
          }
        }
      }
    }
  });
}

function renderPaymentChart(orders) {
  let paymentCount = {
    Cash: 0,
    UPI: 0,
    Card: 0
  };

  orders.forEach(order => {
    const method = order.payment_method;

    if (paymentCount[method] !== undefined) {
      paymentCount[method]++;
    }
  });

  if (paymentChartInstance) {
    paymentChartInstance.destroy();
  }

  paymentChartInstance = new Chart(document.getElementById("paymentChart"), {
    type: "pie",
    data: {
      labels: ["Cash", "UPI", "Card"],
      datasets: [{
        data: [
          paymentCount.Cash,
          paymentCount.UPI,
          paymentCount.Card
        ],
        backgroundColor: [
          "#FFD700",
          "#00c853",
          "#3b82f6"
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "white"
          }
        }
      }
    }
  });
}

async function loadContactMessages() {
  const contactMessagesDiv =
    document.getElementById("contactMessages");

  try {
    const response =
      await fetch("http://localhost:5000/contact");

    const messages =
      await response.json();

    if (!messages || messages.length === 0) {
      contactMessagesDiv.innerHTML =
        `<p class="empty">No contact messages found</p>`;
      return;
    }

    let output = "";

    messages.forEach(msg => {
      output += `
        <div class="order-card">
          <h3>${msg.subject}</h3>

          <p><strong>Name:</strong> ${msg.name}</p>

          <p><strong>Email:</strong> ${msg.email}</p>

          <p><strong>Message:</strong> ${msg.message}</p>

          <p><strong>Status:</strong> ${msg.status || "new"}</p>

          <p><strong>Date:</strong> ${new Date(msg.created_at).toLocaleString()}</p>
        </div>
      `;
    });

    contactMessagesDiv.innerHTML = output;

  } catch (error) {
    console.log(error);

    contactMessagesDiv.innerHTML =
      `<p class="empty">Unable to load contact messages</p>`;
  }
}

loadUsersCount();
loadDashboardData();

function logout() {

    localStorage.removeItem("adminLoggedIn");

    window.location.href = "admin-login.html";

}