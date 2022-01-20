const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAuth,
  verifyTokenAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (e) {
    res.status(500).json(e);
  }
});

//update route
router.put("/:id", verifyToken, verifyTokenAuth, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updateCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", verifyToken, verifyTokenAuth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted");
  } catch (e) {
    res.status(500).json(e);
  }
});

//get user cart
router.get("/find/:userId", verifyToken, verifyTokenAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/", verifyToken, verifyTokenAdmin, async (req, res) => {
  try {
    const cart = await Cart.find();
    res.status(200).json(cart);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
