import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { checkout } from '@/redux/features/checkout/checkoutSlice';
import { createCustomer } from '@/components/Pro/Stripe';
import LayoutPro from '@/components/Layout/LayoutPro';
import Pagetitle from '@/components/Products/Pagetitle';
import PlanOptions from '@/components/Pro/PlanOptions';

const AddPayment = ({ requestFrom }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userLoggedIn, setUserLoggedIn] = useState('');
  const { user } = useSelector((state) => state.auth);

  const pRedirectToCheckout = async () => {
    const cust = await createCustomer(userLoggedIn);
    const stripeCustomer = cust.customer.id;
    const proPlan = document.querySelector('.planboxitem.goldcard').getAttribute('data-plan');
    const proPlanId = document.querySelector('.planboxitem.goldcard').getAttribute('id');
    const proPrice = document.querySelector('.planboxitem.goldcard').getAttribute('data-price');
    dispatch(checkout({ user, stripeCustomer, proPlan, proPlanId, proPrice }));
    router.push('/pro/checkout');
  };
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

  return (
    <>
      <Pagetitle heading={'Add Payment Details'} disc='' titleclass={'protrialexpire'} />
      <section className='listingtop'>
        <div className='container'>
          <div className='top_txt text-center'>
            <h3>Choose Your Plan</h3>
          </div>
        </div>
      </section>

      <PlanOptions planClickEvent={pRedirectToCheckout} />
    </>
  );
};

export default AddPayment;

AddPayment.getLayout = function (page) {
  return <LayoutPro>{page}</LayoutPro>;
};
