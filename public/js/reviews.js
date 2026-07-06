const reviewForm = document.getElementById("reviewForm");
const reviewsContainer = document.getElementById("reviewsContainer");

const API_URL = "http://localhost:5000/reviews";

reviewForm.addEventListener("submit", async function(e) {
  e.preventDefault();

  const review = {
    name: document.getElementById("name").value,
    foodName: document.getElementById("foodName").value,
    rating: document.getElementById("rating").value,
    comment: document.getElementById("comment").value
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review)
  });

  const data = await response.json();

  if (response.ok) {
    alert(data.message);
    reviewForm.reset();
    loadReviews();
  } else {
    alert("Review submit failed");
  }
});

async function loadReviews() {
  const response = await fetch(API_URL);
  const reviews = await response.json();

  if (reviews.length === 0) {
    reviewsContainer.innerHTML =
      `<p class="empty">No reviews yet</p>`;
    return;
  }

  let output = "";

  reviews.forEach(review => {
    output += `
      <div class="review-item">
        <h3>${review.food_name}</h3>
        <p><strong>Name:</strong> ${review.name}</p>
        <p><strong>Rating:</strong> ${"⭐".repeat(review.rating)}</p>
        <p><strong>Comment:</strong> ${review.comment}</p>
        <p><strong>Date:</strong> ${new Date(review.review_date).toLocaleString()}</p>
      </div>
    `;
  });

  reviewsContainer.innerHTML = output;
}

loadReviews();