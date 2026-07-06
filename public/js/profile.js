const user = JSON.parse(localStorage.getItem("user"));
const orders = JSON.parse(localStorage.getItem("orders")) || [];
const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

const profileDetails = document.getElementById("profileDetails");

if (!user) {
  profileDetails.innerHTML = `
    <p>No user logged in.</p>
    <p>Please login first.</p>
  `;
} else {
  profileDetails.innerHTML = `
    <p><strong>Name:</strong> ${user.name}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Role:</strong> ${user.role}</p>
    <p><strong>Total Orders:</strong> ${orders.length}</p>
    <p><strong>Reviews Given:</strong> ${reviews.length}</p>
  `;
}

function logout() {
  localStorage.removeItem("user");
  alert("Logged out successfully");
  window.location.href = "login.html";
}