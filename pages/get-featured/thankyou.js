import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import WithReduxLayout from '@/components/Layout/WithReduxLayout';
import Pagetitle from '@/components/Products/Pagetitle';

const thankyou = () => {
  const { user, listing, listingUrl } = useSelector((state) => state.featuredCheckout);
  const router = useRouter();

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

  return (
    <section className='secspace'>
      <div className='container'>
        <Pagetitle heading={`Thank you for making ${listing} a Featured Listing!`} disc='' titleclass={'protrialexpire'} />

        <div className='top_txt text-center'>
          <Link href={listingUrl.replace(process.env.NEXT_PUBLIC_FRONTEND_URL, window.location.origin)} className='btn uppercase'>
            Go back to Listing
          </Link>
        </div>
      </div>
    </section>
  );
};

thankyou.getLayout = function (page) {
  return <WithReduxLayout layout='withRedux'>{page}</WithReduxLayout>;
};

export default thankyou;
