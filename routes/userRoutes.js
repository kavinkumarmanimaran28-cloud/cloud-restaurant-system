const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
  adminLogin,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.post("/admin-login", adminLogin);

module.exports = router;