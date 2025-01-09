const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const customerId = req.body.customerId;
  const priceId = req.body.priceId;
  const requestFrom = req.body.requestFrom;
  const listing = req.body.listing;
  const listingType = req.body.listingType;
  const trialPeriod = req.body.trialPeriod;
  try {
    //request from featured checkout
    if (requestFrom === 'featuredCheckout') {
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
        metadata: {
          item: 'Featured - ' + listing,
          listingType,
        },
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      res.send({
        subscription,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      });
    } else if (requestFrom === 'trialExpire') {
      //request from trial Expired, upfront payment, no trial
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: priceId,
          },
        ],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      res.send({
        subscription,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      });
    } else {
      //request from pro checkout, provide trial as per plan
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: priceId,
          },
        ],
        metadata: {
          item: 'Screendollars Pro Subscription',
        },
        trial_period_days: trialPeriod,
        // trial_from_plan: true,
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      res.send({
        subscriptionId: subscription.id,
        //   clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        subscription,
      });
    }
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
}
