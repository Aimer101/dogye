const Order = require("../models/Order");
const { payment } = require("./stripe");
const router = require("express").Router();
const { sendEmail } = require("./mail");

//CREATE ORDER
router.post(
  "/",
  payment,
  async (req, res, next) => {
    let address = req.stripeDetails.source;

    const item = {
      userEmail: req.body.token.email,
      address: {
        line_1: address.address_line1,
        city: address.address_city,
        zip: address.address_zip,
        country: address.address_country,
      },
      ...req.body.order,
    };

    const newOrder = new Order(item);

    try {
      const savedOrder = await newOrder.save();
      req.order = savedOrder;
      next();
    } catch (e) {
      res.status(500).json(e);
    }
  },
  sendEmail
);

//get user's order'
router.get("/find/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
