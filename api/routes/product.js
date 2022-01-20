const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAuth,
  verifyTokenAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE PRODUCT
router.post("/", verifyToken, verifyTokenAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (e) {
    res.status(500).json(e);
  }
});

//update route
router.put("/:id", verifyToken, verifyTokenAdmin, async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", verifyToken, verifyTokenAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("product has been deleted");
  } catch (e) {
    res.status(500).json(e);
  }
});

//get a product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/", async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;
  try {
    let products;
    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 });
    } else if (queryCategory) {
      products = await Product.find({
        category: {
          $in: [queryCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.get("/new", async (req, res) => {
  try {
    products = await Product.find({ category: { $in: "women" } }).limit(3);

    res.status(200).json(products);
  } catch (e) {
    return res.status(500).json(e);
  }
});

module.exports = router;
