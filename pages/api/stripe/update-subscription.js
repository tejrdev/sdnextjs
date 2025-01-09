// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const subscriptionId = req.body.subscription;
  const paymentMethod = req.body.payment_method;
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    default_payment_method: paymentMethod,
  });

  res.json({ subscription });
}
