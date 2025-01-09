import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { featuredCheckout } from '../../redux/features/featuredCheckout/featuredCheckoutSlice';
import { createCustomer } from '@/components/Pro/Stripe';
import WithReduxLayout from '@/components/Layout/WithReduxLayout';
import Pagetitle from '@/components/Products/Pagetitle';
import PlanCard from '@/components/Pro/PlanCard';
import Link from 'next/link';

const getFeatured = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userLoggedIn, setUserLoggedIn] = useState('');
  const [selectedListing, setselectedListing] = useState('');
  const [listingType, setListingType] = useState('');
  const [PlanOptions, setPlanOptions] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('month');
  const { user } = useSelector((state) => state.auth);
  const annualSaving = '28% savings';
  const [SDlistingType, setSDlistingType] = useState('');

  const pRedirectToCheckout = async () => {
    const cust = await createCustomer(userLoggedIn);
    const stripeCustomer = cust.customer.id;
    const listingPrice = document.querySelector('.planboxitem.goldcard').getAttribute('data-price');
    const listingPlan = document.querySelector('.planboxitem.goldcard').getAttribute('data-plan');
    const listingPlanId = document.querySelector('.planboxitem.goldcard').getAttribute('id');
    const listingId = localStorage.getItem('listing_id');
    const listingUrl = process.env.NEXT_PUBLIC_LOGIN_URL + listingType + '/' + listingId;
    dispatch(featuredCheckout({ user, stripeCustomer, listingType, listingPrice, listingPlan, listing: selectedListing, listingPlanId, listingUrl }));
    router.push('/get-featured/checkout');
  };
  useEffect(() => {
    const loginUser = localStorage.getItem('email');
    if (!loginUser || !user) {
      localStorage.removeItem('email');
      router.replace({
        pathname: '/login',
        query: { from: encodeURIComponent(router.asPath) },
      });
    }

    if (!localStorage.getItem('listing_type')) {
      router.push('/managelisting-admin');
    }
    setListingType(localStorage.getItem('listing_type'));
    setselectedListing(localStorage.getItem('listing_title'));
    setUserLoggedIn(loginUser);
  }, []);

  useEffect(() => {
    if (userLoggedIn) {
      let productKey;
      switch (listingType) {
        case 'theatres':
          productKey = process.env.NEXT_PUBLIC_STRIPE_THEATRE_PRODUCT_KEY;
          setSDlistingType('Theatre');
          break;
        case 'exhibitors':
          productKey = process.env.NEXT_PUBLIC_STRIPE_EXHIBITOR_PRODUCT_KEY;
          setSDlistingType('Exhibitor');
          break;
        case 'vendors':
          productKey = process.env.NEXT_PUBLIC_STRIPE_VENDOR_PRODUCT_KEY;
          setSDlistingType('Vendor');
          break;
        case 'studios-distributors':
          productKey = process.env.NEXT_PUBLIC_STRIPE_DISTIBUTOR_PRODUCT_KEY;
          setSDlistingType('Distributor');
          break;
        case 'film-festival':
          productKey = process.env.NEXT_PUBLIC_STRIPE_FILMFESTIVAL_PRODUCT_KEY;
          setSDlistingType('Film-Festival');
          break;
      }
      const getPriceList = async () => {
        const res = await fetch('/api/stripe/getPriceList', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productKey }),
        });
        const response = await res.json();
        setPlanOptions(response.ProductPrices.data.sort((a, b) => (a.recurring.interval == 'month' ? -1 : 1)));
      };
      if (productKey) getPriceList();
    }
  }, [userLoggedIn]);
  const changePlan = (e) => {
    // document.querySelector('.planboxitem.goldcard').classList.remove('goldcard');
    // e.target.closest('.planboxitem').classList.add('goldcard');
    const plan = e.target.closest('.planboxitem').getAttribute('data-plan');
    setSelectedPlan(plan);
  };
  return (
    <>
      <section className='yougets'>
        <div className="container">
          <div className='top_txt'>
            <h1 className='text-center h2'>{`Why Make ${selectedListing} a Featured ${SDlistingType} in the Screendollars Directory?`}</h1>
            {/* <p className='text-center'>What you'll get...</p> */}
            <ul className='grid'>
              <li> Top placement on our {SDlistingType.toLowerCase()} listing page
                <p>Website visitors see your {SDlistingType.toLowerCase()} before all others</p>
              </li>
              <li> Gold border and shading on our {SDlistingType.toLowerCase()} listing page
                <p>Your listing will pop on the page</p>
              </li>
              <li> Screendollars star on your {SDlistingType.toLowerCase()} detail page
                <p>When users read about your {SDlistingType.toLowerCase()}, they see that you are a quality venue that cares about its presentation</p>
              </li>
              <li> Unlimited Gallery of Images and Promotional Slides
                <p>Use images to show off your {SDlistingType.toLowerCase()} and explain what makes it unique</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className='listingtop'>
        <div className='container'>
          <div className='top_txt text-center'>
            <h3>Ready to make {selectedListing} Featured? Choose your Billing Option.</h3>
          </div>
        </div>
      </section>
      <section className='planeselection'>
        <div className='container'>
          <div className='proplaninfo grid'>
            {PlanOptions.map((item, i) => (
              <div key={i} onClick={changePlan}>
                <PlanCard id={item.id} title={item.recurring.interval === 'month' ? 'Monthly' : 'Annual'} price={item.unit_amount / 100} pricespan={item.recurring.interval} goldcard={item.recurring.interval === selectedPlan ? 1 : 0} annualSaving={annualSaving} />
              </div>
            ))}
          </div>
          <div className='featureplancta text-center'>
            <button className='btn uppercase' onClick={pRedirectToCheckout}> Continue{' '} </button>
          </div>
          <p className='text-center'>
            Questions? <Link href={'/contact-us'}>Click here</Link> to send us a message or call us at{' '}
            <a href='tel:+1 978-494-4150' title='call us'> 978-494-4150. </a>
          </p>
        </div>
      </section>
    </>
  );
};

getFeatured.getLayout = function (page) {
  return <WithReduxLayout layout='withRedux'>{page}</WithReduxLayout>;
};

export default getFeatured;
