const express = require("express");
const app = express();
const mongose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const path = require("path");

dotenv.config();

mongose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("CONNECTED TO MONGODB"))
  .catch(err => console.log(err));
app.use(express.json());
app.use(cors());
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log("SERVER IS RUNNING");
});
