const db = require("../config/db");

const getAllOrders = (req, res) => {
  const sql = `
    SELECT *
    FROM orders
    ORDER BY order_date DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
};

const addOrder = (req, res) => {
  const {
    tableNo,
    guests,
    paymentMethod,
    totalAmount
  } = req.body;

  const sql = `
    INSERT INTO orders
    (
      total_amount,
      final_amount,
      table_no,
      guests,
      payment_method,
      order_status
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      totalAmount,
      totalAmount,
      tableNo,
      guests,
      paymentMethod,
      "confirmed"
    ],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Order saved successfully",
        orderId: result.insertId
      });

    }
  );
};

module.exports = {
  getAllOrders,
  addOrder
};