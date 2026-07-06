const express = require("express");
const router = express.Router();

const {
  addContactMessage,
  getContactMessages,
} = require("../controllers/contactController");

router.post("/", addContactMessage);
router.get("/", getContactMessages);

module.exports = router;