import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
//Stripe Payment components
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Planselect } from '@/components/Products/Paychoose';

import CheckoutForm from '../../components/CheckoutForm';
import Loader from '@/components/Loader';
import LayoutPro from '@/components/Layout/LayoutPro';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const checkout = () => {
  //useSelector gets the state from store
  const { user } = useSelector((state) => state.checkout); // Access the checkout state
  const [activeprice, setActiveprice] = useState(79.99);
  const activepriceClick = (data) => setActiveprice(data);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('email');

    //  if (!userLoggedIn) {
    //    router.push("/pro/login");
    //  }
  }, []);
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    mode: 'setup',
    currency: 'usd',
    appearance,
  };

  const time = new Date();
  time.setDate(time.getDate() + 30);
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const trialEndDate = time.toLocaleDateString('en-US', dateOptions);

  return (
    <div className='checkoutpage'>
      <div className='container'>
        <div className='pricesignup df fww'>
          <div className='pricinginfo'>
            <h3>Pricing </h3>
            <h5>
              <strong>Choose Your Billing Option</strong>
            </h5>
            <Planselect activeprice={activepriceClick} />
            <h5>
              <strong>You Will Be Charged</strong>
            </h5>
            <div className='chargedamount df fww'>
              <h2>${activeprice} </h2>
            </div>
            <p>
              Your subscription <strong>begins with a 30-day free trial</strong>
            </p>
            <ul className='goldbullet'>
              <li>Cancel anytime</li>
              <li>
                <strong>You won't be charged</strong> if you cancel before <strong>{trialEndDate}</strong>
              </li>
              <li>We’ll email a reminder two days before your free trial ends</li>
            </ul>
            <div className='contactmailer'>
              <h5 className='m-0'>
                <strong>Contact Information</strong>
              </h5>
              <a href={`mailto:${user}`}>{user}</a>
            </div>
          </div>
          <div className='login_signin'>
            <div className='checkoutbox'>
              <h3>Enter Your Payment Details</h3>
              <h5>Payment Method</h5>
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm requestfrom='checkout' />
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
