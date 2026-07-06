const express = require("express");
const router = express.Router();

const {
  getAllFoods,
  getAllCategories,
  getFoodsByCategory,
  getFoodById,
  searchFoods,
} = require("../controllers/foodController");

router.get("/", getAllFoods);
router.get("/categories", getAllCategories);
router.get("/category/:id", getFoodsByCategory);
router.get("/search/:keyword", searchFoods);
router.get("/:id", getFoodById);

module.exports = router;