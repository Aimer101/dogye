const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        color: { type: String, default: null },
        size: { type: String, default: null },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
