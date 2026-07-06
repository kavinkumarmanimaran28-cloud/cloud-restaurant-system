const form = document.getElementById("adminLoginForm");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("errorMsg");

  try {
    const response = await fetch("http://localhost:5000/users/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("admin", JSON.stringify(data.admin));

      window.location.href = "admin.html";
    } else {
      error.innerText = data.message;
    }

  } catch (err) {
    error.innerText = "Server error. Please try again.";
  }
});