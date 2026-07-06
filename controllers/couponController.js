const db = require("../config/db");

const applyCoupon = (req, res) => {

    const { couponCode } = req.body;

    const sql = `
        SELECT *
        FROM offers_coupons
        WHERE coupon_code = ?
        AND status='active'
        AND expiry_date >= CURDATE()
    `;

    db.query(sql, [couponCode], (err, result) => {

        if(err){
            return res.status(500).json(err);
        }

        if(result.length===0){

            return res.status(404).json({
                message:"Invalid Coupon"
            });

        }

        res.json(result[0]);

    });

};

module.exports={
    applyCoupon
};