import { useState, useEffect } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
//checkout reducer for get and pass to state
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../redux/features/auth/authSlice';
import { checkout } from '@/redux/features/checkout/checkoutSlice';
import axios from 'axios';
import { createSetUpIntent, createCustomer } from './Pro/Stripe';
const ENCT_KEY = process.env.NEXT_PUBLIC_ENC_KEY;
var CryptoJS = require('crypto-js');

const dateOptions = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' };
const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);

export default function CheckoutForm({ requestfrom, updatePayment }) {
  const { user, stripeCustomer, stripePlan } = useSelector((state) => state.checkout);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState();
  const [paymentObject, setPaymentObject] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };
  const updatePaymentDetailsinProfile = (paymentData) => {
    updatePayment(paymentData);
  };

  const createStripeCustomer = async () => {
    let userEmail = user;
    if (user === '' || user === null) {
      userEmail = localStorage.getItem('email');
    }
    if (userEmail !== undefined && userEmail !== null && userEmail !== '') {
      let customer = stripeCustomer;
      //create customer in Stripe first
      if (customer === '' || customer === null || customer === undefined) {
        const cust = await createCustomer(userEmail);
        customer = cust.customer.id;
        dispatch(checkout({ user: userEmail, customer }));
      }
    }
  };

  createStripeCustomer();

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
                //create subscription will be called from payment useeffect
                //createSubscription();
                //if request from profile page >> send updated details to WP
                if (requestfrom === 'profilepage') {
                  const paymentData = {
                    userEmail: user,
                    paymentType: customerObj.paymentMethods.type,
                    cardBrand: customerObj.paymentMethods.card ? customerObj.paymentMethods.card.brand : '',
                    exp_month: customerObj.paymentMethods.card ? customerObj.paymentMethods.card.exp_month : '',
                    exp_year: customerObj.paymentMethods.card ? customerObj.paymentMethods.card.exp_year : '',
                    last4: customerObj.paymentMethods.card ? customerObj.paymentMethods.card.last4 : '',
                    linkEmail: customerObj.paymentMethods.link ? customerObj.paymentMethods.link.email : '',
                  };
                  $('.cardeditbox').hide();
                  UpdatePaymentDetails(paymentData);
                }
              }
            })
            .catch((e) => console.log(e))
        )
        .catch((e) => console.log(e));
    } catch (err) {
      console.error(err);
    }
  };

  const createSubscription = async () => {
    const priceId = $('.pricinginfo .planboxitem.active .planprice').attr('id');
    await fetch('/api/stripe/create-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId, customerId: stripeCustomer }),
    })
      .then((res) =>
        res.json().then((subscriptionObj) => {
          const ProInd = 'Y';
          const subscriberPlan = $('.pricinginfo .planboxitem.active').data('plan');
          const planPrice = $('.pricinginfo .planboxitem.active').data('price');
          const startDate = dateFormatter.format(new Date(subscriptionObj.subscription.current_period_start * 1000));
          const endDate = dateFormatter.format(new Date(subscriptionObj.subscription.current_period_end * 1000));
          const subscription = {
            subscriptionId: subscriptionObj.subscriptionId,
            startDate: startDate,
            endDate: endDate,
            customer: stripeCustomer,
            userEmail: user,
            paymentType: paymentObject.type,
            cardBrand: paymentObject.card ? paymentObject.card.brand : '',
            exp_month: paymentObject.card ? paymentObject.card.exp_month : '',
            exp_year: paymentObject.card ? paymentObject.card.exp_year : '',
            last4: paymentObject.card ? paymentObject.card.last4 : '',
            linkEmail: paymentObject.link ? paymentObject.link.email : '',
            subscriberPlan,
            planPrice,
          };
          const subscriber = CryptoJS.AES.encrypt(subscription.userEmail + '_' + ProInd, ENCT_KEY).toString();
          dispatch(auth({ user: subscription.userEmail, subscriber: subscriber }));
          dispatch(checkout({ user, stripeCustomer, stripePlan, subscriptionId: subscriptionObj.subscriptionId }));
          sendDatatoWP(subscription);
          setTimeout(() => {
            router.push('/pro/thankyou');
          }, 1000);
        })
      )
      .catch((e) => console.log(e));
  };
  const sendDatatoWP = async (subscription) => {
    const subscptn =
      'subscriptionId=' +
      subscription.subscriptionId +
      '&userEmail=' +
      subscription.userEmail +
      '&startDate=' +
      subscription.startDate +
      '&endDate=' +
      subscription.endDate +
      '&customer=' +
      subscription.customer +
      '&cardBrand=' +
      subscription.cardBrand +
      '&exp_month=' +
      subscription.exp_month +
      '&exp_year=' +
      subscription.exp_year +
      '&last4=' +
      subscription.last4 +
      '&subscriberPlan=' +
      subscription.subscriberPlan +
      '&planPrice=' +
      subscription.planPrice +
      '&linkEmail=' +
      subscription.linkEmail +
      '&paymentType=' +
      subscription.paymentType;
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
  const UpdatePaymentDetails = async (payment) => {
    const subscptn = 'userEmail=' + payment.userEmail + '&cardBrand=' + payment.cardBrand + '&exp_month=' + payment.exp_month + '&exp_year=' + payment.exp_year + '&last4=' + payment.last4 + '&linkEmail=' + payment.linkEmail + '&paymentType=' + payment.paymentType;
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/new_user_stipe_response.php?' + subscptn);
      updatePaymentDetailsinProfile(payment);
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
    if (!stripe || clientSecret === '' || clientSecret === undefined) {
      return;
    }
    const confirmSetup = async () => {
      try {
        const { setupIntent, error } = await stripe.confirmSetup({
          elements,
          clientSecret,
          redirect: 'if_required',
          confirmParams: {
            return_url: 'http://localhost:3000/pro/success',
          },
        });

        // console.log(setupIntent, error);
        if (error) {
          console.error(error);
          setPaymentError(error.message);
          $('.signup-loader').hide();
          setLoading(false);
          // handleError();
        } else if (setupIntent && setupIntent.status === 'succeeded') {
          updateCustomer(setupIntent.payment_method);
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
  }, [clientSecret]);

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

    const response = await createSetUpIntent(stripeCustomer);
    setClientSecret(await response.intent.client_secret);
  };

  useEffect(() => {
    if (stripePlan !== '') {
      $('.pricinginfo .planboxitem').removeClass('active');
      $('.pricinginfo .planboxitem[data-plan="' + stripePlan + '"]').addClass('active');
    }
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {paymentError && <div className='errormsg '>{paymentError}</div>}
      <button type='submit' disabled={!stripe || loading} className='chekoutbtn uppercase'>
        {requestfrom === 'checkout' ? 'start your free trial' : 'Update Payment Method'}
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
