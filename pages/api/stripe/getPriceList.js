// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const ProductPrices = await stripe.prices.list({
    product: process.env.STRIPE_PRODUCT_KEY,
    'active': true,
  });

  res.send({
    ProductPrices,
  });
}
