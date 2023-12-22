// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const customerId = req.body.customerId;
  const priceId = req.body.priceId;
  try {
    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId,
        },
      ],
      //   trial_period_days: 30,
      trial_from_plan: true,
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    res.send({
      subscriptionId: subscription.id,
      //   clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      subscription,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
}
