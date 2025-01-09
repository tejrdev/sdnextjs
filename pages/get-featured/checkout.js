import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
//Stripe Payment components
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import FeaturedCheckoutForm from '@/components/Featured/CheckoutForm';
import Loader from '@/components/Loader';
import WithReduxLayout from '@/components/Layout/WithReduxLayout';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const FeaturedCheckout = () => {
  const router = useRouter();

  const { user } = useSelector((state) => state.auth);
  const { stripeCustomer, listingType, listingPrice, listing, listingPlan } = useSelector((state) => state.featuredCheckout);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('email');

    if (!userLoggedIn || !user) {
      localStorage.removeItem('email');
      router.push('/login');
    }
  }, []);
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    mode: 'subscription',
    amount: Math.round(listingPrice * 100),
    currency: 'usd',
    appearance,
  };

  return (
    <div className='checkoutpage'>
      <div className='container'>
        <div className='pricesignup df fww'>
          <div className='pricinginfo'>
            <h5>
              <strong>Featured Listing for {listing} </strong>
            </h5>
            <h5>
              <strong>You will be charged</strong>
            </h5>
            <h3>{'$ ' + listingPrice + '/' + listingPlan}</h3>

            <ul className='goldbullet'>
              <li>{listingPlan === 'month' ? 'Billing will recur monthly on the same day every month' : 'Billing will recur annually on the same day and month every year'}</li>
              <li>
                We'll send <a href={`mailto:${user}`}>{user}</a> a reminder two days before each billing
              </li>
              <li>You can cancel at any time</li>
            </ul>
            <p>
              Questions? <Link href={'/contact-us'}>Click here</Link> to send us a message or call us at{' '}
              <a href='tel:+1 978-494-4150' title='call us'>
                978-494-4150.
              </a>
            </p>
          </div>
          <div className='login_signin'>
            <div className='checkoutbox'>
              <h3>Enter Your Payment Details</h3>
              <h5>Payment Method</h5>
              <Elements options={options} stripe={stripePromise}>
                <FeaturedCheckoutForm />
              </Elements>
              <div hidden className='signup-loader'>
                <Loader />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FeaturedCheckout.getLayout = function (page) {
  return <WithReduxLayout layout='withRedux'>{page}</WithReduxLayout>;
};

export default FeaturedCheckout;
