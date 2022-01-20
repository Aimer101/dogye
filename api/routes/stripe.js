const stripe = require("stripe")(
  "sk_test_51JrMopDXviqBGeLVkq8f2M18B1znCfW4t7lmRvMF3ml9ZeDew6wiXgJU0w1tGLKhOrA66fFbCPXObJ9Z8l3E6Ehe001lEWrrT5"
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
