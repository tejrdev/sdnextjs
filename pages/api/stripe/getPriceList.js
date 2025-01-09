const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const productKey = req.body.productKey;
  const ProductPrices = await stripe.prices.list({
    product: productKey,
    'active': true,
  });

  res.send({
    ProductPrices,
  });
}
