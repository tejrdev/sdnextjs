const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  //   //check whether intent already exist
  //   const intentExist = await stripe.setupIntents.list({
  //     customer: req.body.customer,
  //   });

  //   if (!intentExist.data.length) {
  //     //create intent
  //     const intent = await stripe.setupIntents.create({
  //       customer: req.body.customer,
  //       automatic_payment_methods: { enabled: true },
  //     });
  //     res.json({ intent });
  //   } else {
  //     res.send({
  //       intent: intentExist.data[0],
  //     });
  //   }

  const intent = await stripe.setupIntents.create({
    customer: req.body.customer,
    automatic_payment_methods: { enabled: true },
  });

  // const intent = await stripe.setupIntents.list({
  //   customer: req.body.customer,
  // });

  // const intent = await stripe.paymentMethods.list({
  //   customer: req.body.customer,
  // });

  res.json({ intent });
}
