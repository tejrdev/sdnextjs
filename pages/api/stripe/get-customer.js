// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  //check whether customer already exist
  const customer = await stripe.customers.list({
    email: req.body.email,
  });

  res.send({
    customer,
  });
}
