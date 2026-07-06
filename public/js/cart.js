let subTotal = 0;
let discount = 0;
let finalTotal = 0;

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cartContainer");

  const subTotalAmount = document.getElementById("subTotalAmount");
  const discountAmount = document.getElementById("discountAmount");
  const totalAmount = document.getElementById("totalAmount");

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="empty">Your cart is empty</p>`;
    subTotalAmount.innerText = 0;
    discountAmount.innerText = 0;
    totalAmount.innerText = 0;

    localStorage.removeItem("coupon");
    localStorage.removeItem("cartTotal");
    return;
  }

  let output = "";
  subTotal = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    subTotal += subtotal;

    output += `
      <div class="cart-item">
        <img src="images/${item.image}" alt="${item.food_name}">

        <div class="item-details">
          <h3>${item.food_name}</h3>
          <p>Price: ₹${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
          <p>Subtotal: ₹${subtotal}</p>
        </div>

        <div class="qty">
          <button onclick="decreaseQty(${index})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQty(${index})">+</button>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  const savedCoupon = JSON.parse(localStorage.getItem("coupon"));

  if (savedCoupon) {
    calculateDiscount(savedCoupon);
  } else {
    discount = 0;
    finalTotal = subTotal;
  }

  cartContainer.innerHTML = output;
  subTotalAmount.innerText = subTotal;
  discountAmount.innerText = discount;
  totalAmount.innerText = finalTotal;

  localStorage.setItem("cartTotal", finalTotal);
}

async function applyCoupon() {
  const couponCode = document.getElementById("couponCode").value.trim();
  const couponMessage = document.getElementById("couponMessage");

  if (couponCode === "") {
    couponMessage.innerText = "Please enter coupon code";
    couponMessage.style.color = "#ff5252";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/coupon/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ couponCode })
    });

    const data = await response.json();

    if (!response.ok) {
      couponMessage.innerText = data.message || "Invalid coupon";
      couponMessage.style.color = "#ff5252";
      localStorage.removeItem("coupon");
      loadCart();
      return;
    }

    localStorage.setItem("coupon", JSON.stringify(data));

    couponMessage.innerText = `Coupon applied: ${data.coupon_code}`;
    couponMessage.style.color = "#00ff6a";

    loadCart();

  } catch (error) {
    couponMessage.innerText = "Server error while applying coupon";
    couponMessage.style.color = "#ff5252";
  }
}

function calculateDiscount(coupon) {
  const type = coupon.discount_type;
  const value = Number(coupon.discount_value);

  if (type === "percentage") {
    discount = Math.round((subTotal * value) / 100);
  } else if (type === "fixed") {
    discount = value;
  } else {
    discount = 0;
  }

  if (discount > subTotal) {
    discount = subTotal;
  }

  finalTotal = subTotal - discount;
}

function increaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function decreaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  localStorage.removeItem("coupon");
  localStorage.removeItem("cartTotal");
  loadCart();
}

function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  localStorage.setItem("cartTotal", finalTotal);
  window.location.href = "reservation.html";
}

loadCart();