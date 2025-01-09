import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
//Stripe Payment components
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// import { Planselect } from '@/components/Products/Paychoose';

import CheckoutForm from '@/components/CheckoutForm';
import Loader from '@/components/Loader';
import LayoutPro from '@/components/Layout/LayoutPro';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const checkout = () => {
  const router = useRouter();
  const { user, proPlan, proPrice } = useSelector((state) => state.checkout);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('email');
    if (!userLoggedIn || !user) {
      localStorage.removeItem('email');
      router.replace({
        pathname: '/pro/login',
        query: { from: encodeURIComponent(router.asPath) },
      });
    }
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    mode: 'subscription',
    amount: Math.round(proPrice * 100),
    currency: 'usd',
    appearance,
  };

  return (
    <div className='checkoutpage'>
      <div className='container'>
        <div className='pricesignup df fww'>
          {/* <div className='pricinginfo'>
            <h3>Summary </h3>
            <h5>
              <strong>Pro Plan: {'$ ' + proPrice + ' (' + (proPlan === 'month' ? 'Monthly' : 'Annual') + ')'} </strong>
            </h5>
            <div className='contactmailer'>
              <h5 className='m-0'>
                <strong>Contact Information</strong>
              </h5>
              <a href={`mailto:${user}`}>{user}</a>
            </div>
          </div> */}
          <div className='pricinginfo'>
            <h3>
              <strong>Screendollars Pro Subscription </strong>
            </h3>
            <h5>
              <strong>You will be charged</strong>
            </h5>
            <h3>{'$ ' + proPrice + '/' + proPlan}</h3>

            <ul className='goldbullet'>
              <li>{proPlan === 'month' ? 'Billing will recur monthly on the same day every month' : 'Billing will recur annually on the same day and month every year'}</li>
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
                <CheckoutForm requestfrom='trialExpire' />
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

checkout.getLayout = function (page) {
  return <LayoutPro>{page}</LayoutPro>;
};

export default checkout;
