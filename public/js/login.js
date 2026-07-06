document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:5000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("user", JSON.stringify(data.user));

    document.getElementById("message").innerText =
      data.message + " - Welcome " + data.user.name;

    setTimeout(() => {
      window.location.href = "menu.html";
    }, 1000);
  } else {
    document.getElementById("message").innerText = data.message;
  }
});