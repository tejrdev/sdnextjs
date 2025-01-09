// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const customer = await stripe.customers.update(req.body.customer, {
    invoice_settings: {
      default_payment_method: req.body.payment_method,
    },
  });

  const paymentMethods = await stripe.customers.retrievePaymentMethod(req.body.customer, req.body.payment_method);

  res.json({ customer, paymentMethods });
}
