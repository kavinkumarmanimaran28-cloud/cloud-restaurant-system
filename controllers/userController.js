const db = require("../config/db");

const registerUser = (req, res) => {
  const { name, email, password, phone } = req.body;

  const sql =
    "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, 'customer')";

  db.query(sql, [name, email, password, phone], (err) => {
    if (err) res.status(500).json(err);
    else res.json({ message: "User Registered Successfully" });
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql =
    "SELECT user_id, name, email, role FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else if (result.length === 0) {
      res.status(401).json({ message: "Invalid Email or Password" });
    } else {
      res.json({
        message: "Login Successful",
        user: result[0],
      });
    }
  });
};

const adminLogin = (req, res) => {
  const { email, password } = req.body;

  const sql =
    "SELECT user_id, name, email, role FROM users WHERE email = ? AND password = ? AND role = 'admin'";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else if (result.length === 0) {
      res.status(401).json({
        message: "Invalid Admin Credentials",
      });
    } else {
      res.json({
        message: "Admin Login Successful",
        admin: result[0],
      });
    }
  });
};

const getAllUsers = (req, res) => {
  const sql = "SELECT user_id, name, email, phone, role, created_at FROM users";

  db.query(sql, (err, result) => {
    if (err) res.status(500).json(err);
    else res.json(result);
  });
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  adminLogin,
};