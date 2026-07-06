const db = require("../config/db");

const getAllFoods = (req, res) => {
  db.query("SELECT * FROM food_items", (err, result) => {
    if (err) res.status(500).json(err);
    else res.json(result);
  });
};

const getAllCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) res.status(500).json(err);
    else res.json(result);
  });
};

const getFoodsByCategory = (req, res) => {
  const categoryId = req.params.id;

  db.query(
    "SELECT * FROM food_items WHERE category_id = ?",
    [categoryId],
    (err, result) => {
      if (err) res.status(500).json(err);
      else res.json(result);
    }
  );
};

const getFoodById = (req, res) => {
  const foodId = req.params.id;

  db.query(
    "SELECT * FROM food_items WHERE food_id = ?",
    [foodId],
    (err, result) => {
      if (err) res.status(500).json(err);
      else res.json(result);
    }
  );
};

const searchFoods = (req, res) => {
  const keyword = req.params.keyword;

  db.query(
    "SELECT * FROM food_items WHERE food_name LIKE ?",
    [`%${keyword}%`],
    (err, result) => {
      if (err) res.status(500).json(err);
      else res.json(result);
    }
  );
};

module.exports = {
  getAllFoods,
  getAllCategories,
  getFoodsByCategory,
  getFoodById,
  searchFoods,
};