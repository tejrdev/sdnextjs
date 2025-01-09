const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const customerId = req.body.customerId;
  try {
    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit: 100,
    });
    res.send({
      invoices,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
}
