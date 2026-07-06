const contactForm = document.getElementById("contactForm");
const responseMsg = document.getElementById("responseMsg");

console.log("contact.js loaded");

contactForm.addEventListener("submit", async function(e) {
  e.preventDefault();

  console.log("Contact form submitted");

  const contactData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  };

  try {
    const response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactData)
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      responseMsg.innerText = data.message;
      contactForm.reset();
    } else {
      responseMsg.innerText = "Message sending failed";
    }

  } catch (error) {
    console.log(error);
    responseMsg.innerText = "Server error";
  }
});