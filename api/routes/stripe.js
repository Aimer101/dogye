const stripe = require("stripe")(
  your stripe secret key
);

const payment = (req, res, next) => {
  stripe.charges.create(
    {
      source: req.body.token.id,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeE, stripeR) => {
      if (stripeE) {
        res.status(500).json(stripeE);
      } else {
        req.stripeDetails = stripeR;
        next();
      }
    }
  );
};

module.exports = { payment };
