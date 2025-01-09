// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  //check whether customer already exist
  const customersExist = await stripe.customers.list({
    email: req.body.email,
  });

  if (!customersExist.data.length) {
    //create customer
    const customer = await stripe.customers.create({
      email: req.body.email,
      description: '',
    });

    res.send({
      customer,
    });
  } else {
    res.send({
      customer: customersExist.data[0],
    });
  }
}
