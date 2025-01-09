import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { checkout } from '@/redux/features/checkout/checkoutSlice';
import { createCustomer } from '@/components/Pro/Stripe';

import Pagetitle from '@/components/Products/Pagetitle';
import LayoutPro from '@/components/Layout/LayoutPro';
import PlanOptions from '@/components/Pro/PlanOptions';

const trialexpire = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, trialEndDate } = useSelector((state) => state.auth);
  const [userLoggedIn, setUserLoggedIn] = useState('');

  useEffect(() => {
    const loginUser = localStorage.getItem('email');
    if (!loginUser || !user) {
      localStorage.removeItem('email');
      router.replace({
        pathname: '/pro/login',
        query: { from: encodeURIComponent(router.asPath) },
      });
    }

    setUserLoggedIn(loginUser);
  }, []);

  const pRedirectToCheckout = async () => {
    const cust = await createCustomer(userLoggedIn);
    const stripeCustomer = cust.customer.id;
    const proPlan = document.querySelector('.planboxitem.goldcard').getAttribute('data-plan');
    const proPlanId = document.querySelector('.planboxitem.goldcard').getAttribute('id');
    const proPrice = document.querySelector('.planboxitem.goldcard').getAttribute('data-price');
    dispatch(checkout({ user, stripeCustomer, proPlan, proPlanId, proPrice }));
    router.push('/pro/checkout');
  };

  return (
    <>
      <Pagetitle heading={'Your Trial Has Expired'} disc={`Your trial has been ended on ${trialEndDate}. To continue using pro features please confirm/update your payment info.`} titleclass={'protrialexpire'} />
      {/* <AddPayment requestFrom='trialexpire' /> */}
      <PlanOptions planClickEvent={pRedirectToCheckout} />
    </>
  );
};

export default trialexpire;

trialexpire.getLayout = function (page) {
  return <LayoutPro>{page}</LayoutPro>;
};
