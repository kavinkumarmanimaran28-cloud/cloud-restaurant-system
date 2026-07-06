const db = require("../config/db");

const addReview = (req, res) => {
  const { name, foodName, rating, comment } = req.body;

  const sql =
    "INSERT INTO reviews (name, food_name, rating, comment) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, foodName, rating, comment], (err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({ message: "Review submitted successfully" });
    }
  });
};

const getReviews = (req, res) => {
  db.query("SELECT * FROM reviews ORDER BY review_date DESC", (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  addReview,
  getReviews,
};