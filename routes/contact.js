const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const messageData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
    date: new Date().toLocaleString()
  };

  let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
  messages.push(messageData);

  localStorage.setItem("contactMessages", JSON.stringify(messages));

  document.getElementById("responseMsg").innerText =
    "Message sent successfully!";

  contactForm.reset();
});