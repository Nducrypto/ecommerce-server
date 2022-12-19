import express from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY);
const router = express.Router();

router.post("/payment", async (req, res) => {
  console.log(req.body);
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
      product: req.body.product,
    },
    (stripeError, stripeResponse) => {
      if (stripeError) {
        res.status(500).json(stripeError);
      } else {
        res.status(200).json(stripeResponse);
      }
    }
  );
});
export default router;
