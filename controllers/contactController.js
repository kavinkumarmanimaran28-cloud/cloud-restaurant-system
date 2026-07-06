const db = require("../config/db");

const addContactMessage = (req, res) => {
  const { name, email, subject, message } = req.body;

  const sql =
    "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, subject, message], (err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({ message: "Message sent successfully" });
    }
  });
};

const getContactMessages = (req, res) => {
  db.query(
    "SELECT * FROM contact_messages ORDER BY created_at DESC",
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};

module.exports = {
  addContactMessage,
  getContactMessages,
};