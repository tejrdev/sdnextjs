const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const custPaymentMethod = req.body.custPaymentMethod;
  const email = req.body.email;
  let paymentMethod;
  try {
    if (custPaymentMethod) {
      paymentMethod = await stripe.paymentMethods.retrieve(custPaymentMethod);
    } else {
      //if paymentmethod null, check for default payment method for customer
      const customers = await stripe.customers.list({
        email,
      });
      if (customers) {
        const default_payment_method = customers.data[0].invoice_settings.default_payment_method;
        if (default_payment_method) {
          paymentMethod = await stripe.paymentMethods.retrieve(default_payment_method);
        } else {
          console.log('no payment method found for customer: ' + email);
        }
      } else {
        console.log('no customer found with email: ' + email);
      }
    }

    res.send({
      paymentMethod,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
}
