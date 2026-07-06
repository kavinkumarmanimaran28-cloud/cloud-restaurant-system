const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const foodRoutes = require("./routes/foodRoutes");
const userRoutes = require("./routes/userRoutes");

const reviewRoutes = require("./routes/reviewRoutes");
const contactRoutes = require("./routes/contactRoutes");

const orderRoutes = require("./routes/orderRoutes");

const couponRoutes=require("./routes/couponRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Cloud-Based Restaurant Reservation and Food Ordering System API Running");
});

app.use("/foods", foodRoutes);
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);
app.use("/contact", contactRoutes);
app.use("/orders", orderRoutes);
app.use("/coupon",couponRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});