// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  console.log(req.body.subscriptionId);
  const deleted = await stripe.subscriptions.cancel(req.body.subscriptionId);
  res.json({ deleted });
}
