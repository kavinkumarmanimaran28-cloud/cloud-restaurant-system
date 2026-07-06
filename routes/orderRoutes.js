const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  addOrder
} = require("../controllers/orderController");

router.get("/", getAllOrders);
router.post("/", addOrder);

module.exports = router;