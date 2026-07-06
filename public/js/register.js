document.getElementById("registerForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:5000/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, phone, password })
  });

  const data = await response.json();

  document.getElementById("message").innerText =
    data.message || "Registration failed";

  if (response.ok) {
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1200);
  }
});