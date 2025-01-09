import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const dateOptions = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' };
const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);

export default function FeaturedCheckoutForm() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const { user, stripeCustomer, listingPlanId, listing, listingType, listingPrice, listingUrl } = useSelector((state) => state.featuredCheckout);
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('email');

    if (!userLoggedIn || !user) {
      localStorage.removeItem('email');
      router.replace({
        pathname: '/login',
        query: { from: encodeURIComponent(router.asPath) },
      });
    }
  }, []);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    try {
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
        return;
      }

      // Create the subscription
      const res = await fetch('/api/stripe/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: listingPlanId, customerId: stripeCustomer, requestFrom: 'featuredCheckout', listing, listingType }),
      });
      const { subscription, clientSecret } = await res.json();
      // const confirmIntent = type === 'setup' ? stripe.confirmSetup : stripe.confirmPayment;

      // Confirm the Intent using the details collected by the Payment Element
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        redirect: 'if_required',
        confirmParams: {
          return_url: 'https://screendollars.com/',
        },
      });

      if (error) {
        // This point is only reached if there's an immediate error when confirming the Intent.
        // Show the error to your customer (for example, "payment details incomplete").
        handleError(error);
      } else {
        // Your customer is redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer is redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
        //send data to wordpress
        const subscriptionId = subscription.id;
        const startDate = dateFormatter.format(new Date(subscription.current_period_start * 1000));
        const endDate = dateFormatter.format(new Date(subscription.current_period_end * 1000));
        sendDatatoWP(subscriptionId, startDate, endDate);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendDatatoWP = async (subscriptionId, startDate, endDate) => {
    const subscptn = 'subscriptionId=' + subscriptionId + '&email=' + user + '&startDate=' + startDate + '&endDate=' + endDate + '&listing=' + listing + '&listingType=' + listingType + '&listingPrice=' + listingPrice + '&listingUrl=' + listingUrl;

    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_SD_API + '/featured-list/create_feature.php?' + subscptn);
      $('.signup-loader').hide();
      setTimeout(() => {
        router.push('/get-featured/thankyou/');
      }, 1000);
      return response.data;
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type='submit' disabled={!stripe || loading}>
        Submit Payment
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
}
