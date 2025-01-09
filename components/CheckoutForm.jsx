import { useState, useEffect } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
//checkout reducer for get and pass to state
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../redux/features/auth/authSlice';
// import { checkout } from '@/redux/features/checkout/checkoutSlice';
import axios from 'axios';
import { createSetUpIntent } from './Pro/Stripe';
const ENCT_KEY = process.env.NEXT_PUBLIC_ENC_KEY;
var CryptoJS = require('crypto-js');

const dateOptions = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' };
const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);

export default function CheckoutForm({ requestfrom, updatePayment, editSubscriptionId }) {
  const { user, trialEndDate } = useSelector((state) => state.auth);
  const { stripeCustomer, proPlanId } = useSelector((state) => state.checkout);
  const stripe = useStripe();
  const elements = useElements();
  const [ClientSecret, setClientSecret] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState();
  const [paymentObject, setPaymentObject] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('email');
    if (!userLoggedIn || !user) {
      //|| !stripeCustomer
      localStorage.removeItem('email');
      router.replace({
        pathname: '/pro/login',
        query: { from: encodeURIComponent(router.asPath) },
      });
    }
  }, []);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const updateCustomer = async (payment_method) => {
    // Create the SetupIntent and obtain clientSecret
    try {
      await fetch('/api/stripe/update-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: stripeCustomer, payment_method: payment_method }),
      })
        .then((res) =>
          res
            .json()
            .then((customerObj) => {
              if (customerObj.customer && customerObj.customer.invoice_settings.default_payment_method !== null) {
                setPaymentObject(customerObj.paymentMethods);
              }
            })
            .catch((e) => console.log(e))
        )
        .catch((e) => console.log(e));
    } catch (err) {
      console.error(err);
    }
  };

  const updateSubscription = async (payment_method) => {
    // Create the SetupIntent and updae subsciption payment method
    try {
      await fetch('/api/stripe/update-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription: editSubscriptionId, payment_method: payment_method }),
      })
        .then((res) =>
          res
            .json()
            .then((subscription) => {
              updatePayment(payment_method, subscription.subscription);
              $('.cardeditbox').hide();
            })
            .catch((e) => console.log(e))
        )
        .catch((e) => console.log(e));
    } catch (err) {
      console.error(err);
    }
  };

  const createSubscription = async () => {
    //count trial period days
    var trialPeriod = 0;
    if (trialEndDate !== '' && trialEndDate !== null && trialEndDate !== undefined) {
      trialPeriod = parseInt((new Date(trialEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    }

    await fetch('/api/stripe/create-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: proPlanId, customerId: stripeCustomer, requestFrom: 'proCheckout', trialPeriod }),
    })
      .then((res) =>
        res.json().then((subscriptionObj) => {
          const ProInd = 'Y';
          // const subscriberPlan = $('.pricinginfo .planboxitem.active').data('plan');
          // const planPrice = $('.pricinginfo .planboxitem.active').data('price');
          const startDate = dateFormatter.format(new Date(subscriptionObj.subscription.current_period_start * 1000));
          const endDate = dateFormatter.format(new Date(subscriptionObj.subscription.current_period_end * 1000));
          const subscriptionObject = {
            subscriptionId: subscriptionObj.subscriptionId,
            startDate: startDate,
            endDate: endDate,
            userEmail: user,
          };
          const subscriber = CryptoJS.AES.encrypt(user + '_' + ProInd, ENCT_KEY).toString();
          dispatch(auth({ user: user, subscriber: subscriber }));
          sendDatatoWP(subscriptionObject);
          setTimeout(() => {
            router.push('/pro/thankyou');
          }, 1000);
        })
      )
      .catch((e) => console.log(e));
  };
  const sendDatatoWP = async (subscriptionObject) => {
    const subscptn = 'subscriptionId=' + subscriptionObject.subscriptionId + '&userEmail=' + subscriptionObject.userEmail + '&startDate=' + subscriptionObject.startDate + '&endDate=' + subscriptionObject.endDate;
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/new_user_stipe_response.php?' + subscptn);
      localStorage.setItem('type_link', 'pro');
      $('.signup-loader').hide();
      return response.data;
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (paymentObject !== null && requestfrom === 'checkout') createSubscription();
  }, [paymentObject]);

  useEffect(() => {
    if (!stripe || ClientSecret === '' || ClientSecret === undefined) {
      return;
    }
    const confirmSetup = async () => {
      try {
        const { setupIntent, error } = await stripe.confirmSetup({
          elements,
          clientSecret: ClientSecret,
          redirect: 'if_required',
          confirmParams: {
            return_url: 'https://screendollars.com/pro/success',
          },
        });
        if (error) {
          console.error(error);
          setPaymentError(error.message);
          $('.signup-loader').hide();
          setLoading(false);
          // handleError();
        } else if (setupIntent && setupIntent.status === 'succeeded') {
          if (requestfrom === 'profilepagePayment') {
            updateSubscription(setupIntent.payment_method);
          } else {
            updateCustomer(setupIntent.payment_method);
          }
          // handleSuccess();
        } else {
          console.log(error.message);
          $('.signup-loader').hide();
          // handleOther();
        }
      } catch (error) {
        console.error(error);
        $('.signup-loader').hide();
      }
    };
    // Confirm the SetupIntent using the details collected by the Payment Element
    confirmSetup();
  }, [ClientSecret]);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    $('.signup-loader').show();
    setPaymentError(null);
    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      $('.signup-loader').hide();
      return;
    }

    //check for upfront payment, trial expired
    if (requestfrom === 'trialExpire') {
      // Create the subscription
      const res = await fetch('/api/stripe/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: proPlanId, customerId: stripeCustomer, requestFrom: requestfrom }),
      });
      const { subscription, clientSecret } = await res.json();
      // const confirmIntent = type === 'setup' ? stripe.confirmSetup : stripe.confirmPayment;

      // Confirm the Intent using the details collected by the Payment Element
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        redirect: 'if_required',
        confirmParams: {
          return_url: 'https://screendollars.com/pro/success',
        },
      });

      if (error) {
        // This point is only reached if there's an immediate error when confirming the Intent.
        // Show the error to your customer (for example, "payment details incomplete").
        handleError(error);
      } else {
        //send data to wordpress
        const subscriptionId = subscription.id;
        const startDate = dateFormatter.format(new Date(subscription.current_period_start * 1000));
        const endDate = dateFormatter.format(new Date(subscription.current_period_end * 1000));
        const ProInd = 'Y';
        const subscriptionObject = {
          subscriptionId,
          startDate,
          endDate,
          userEmail: user,
        };
        const subscriber = CryptoJS.AES.encrypt(user + '_' + ProInd, ENCT_KEY).toString();
        dispatch(auth({ user: user, subscriber: subscriber }));
        sendDatatoWP(subscriptionObject);
        setTimeout(() => {
          router.push('/pro/thankyou');
        }, 1000);
      }
    } else {
      const response = await createSetUpIntent(stripeCustomer);
      setClientSecret(await response.intent.client_secret);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {paymentError && <div className='errormsg '>{paymentError}</div>}
      <button type='submit' disabled={!stripe || loading} className='chekoutbtn uppercase'>
        {requestfrom === 'profilepagePayment' ? 'Update Payment Method' : 'Submit Payment'}
        {/* Update Payment Method */}
      </button>
      {errorMessage && <div>{errorMessage}</div>}
      {requestfrom === 'checkout' ? (
        <p>
          <small>
            By subscribing, you agree to Screendollars'{' '}
            <a href='#'>
              <u>Terms of Service</u>
            </a>{' '}
            and{' '}
            <a href='#'>
              <u>Privacy Policy.</u>
            </a>{' '}
            Your subscription will automatically renew at the then-current, standard price until it is cancelled. Cancel anytime. Cancellations take effect at the end of the current subscription period.
          </small>
        </p>
      ) : null}
    </form>
  );
}
