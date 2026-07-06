const API_URL = "http://localhost:5000/foods";

async function loadFoods() {
  document.getElementById("searchInput").value = "";

  const response = await fetch(API_URL);
  const foods = await response.json();

  displayFoods(foods);
}

async function loadByCategory(categoryId) {
  document.getElementById("searchInput").value = "";

  const response = await fetch(`${API_URL}/category/${categoryId}`);
  const foods = await response.json();

  displayFoods(foods);
}

async function searchFood() {
  const keyword = document.getElementById("searchInput").value.trim();

  if (keyword === "") {
    loadFoods();
    return;
  }

  const response = await fetch(`${API_URL}/search/${keyword}`);
  const foods = await response.json();

  displayFoods(foods);
}

function displayFoods(foods) {
  let output = "";

  if (foods.length === 0) {
    document.getElementById("menuContainer").innerHTML =
      `<p class="no-data">No food items found</p>`;
    return;
  }

  foods.forEach(food => {
    output += `
      <div class="card">
        <img src="images/${food.image}" alt="${food.food_name}">
        <div class="details">
          <h2>${food.food_name}</h2>
          <p>${food.description}</p>
          <div class="price">₹${food.price}</div>
          <button class="cart-btn" onclick='addToCart(${JSON.stringify(food)})'>
            Add To Cart
          </button>
        </div>
      </div>
    `;
  });

  document.getElementById("menuContainer").innerHTML = output;
}

function addToCart(food) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.food_id === food.food_id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      food_id: food.food_id,
      food_name: food.food_name,
      price: Number(food.price),
      image: food.image,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${food.food_name} added to cart`);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.innerText = count;
  }
}

loadFoods();
updateCartCount();