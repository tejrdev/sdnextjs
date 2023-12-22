import React, { useState, useEffect } from 'react';
import { checkLocalStorageVariable } from '../../components/Login/localStorageUtil';
import Pagetitle from '@/components/Products/Pagetitle';
import Recentissue from '@/components/Products/Recentissue';
import LayoutPro from '@/components/Layout/LayoutPro';
import { useRouter } from 'next/router';
import { Postercta } from '@/components/Products/Recentissue';
import Link from 'next/link';

export async function getStaticProps({}) {
  // news page static data
  let Pro_data = await fetch(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/home_page.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  Pro_data = await Pro_data.json();
  return {
    props: { Pro_data },
    revalidate: 10, // In seconds
  };
}

const Thankyou = ({ Pro_data }) => {
  const router = useRouter();
  const [link, setLink] = useState();
  const heading = "Thank you for Signing up! <br/> you're now Screendollars pro🎉";
  const description = 'Explore entire collection of content right here...';
  var [pageTitle, setPageTitle] = useState({
    name: 'try it for free',
    link: '/pro/signup',
  });
  const picsum = {
    media: 'https://picsum.photos/200/300',
  };
  const advmoviedata = [picsum, picsum, picsum];

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('email');
    const enc_login = localStorage.getItem('enc_email');
    const type_link = localStorage.getItem('type_link');
    setLink(type_link);
    if (!userLoggedIn && !enc_login && type_link !== 'pro') {
      router.push('/pro/login');
    }
    if (userLoggedIn && enc_login && type_link === 'default' && type_link !== 'pro') {
      setPageTitle({
        name: 'Switch to pro for free',
        link: '/pro/',
      });
      router.push('/pro/');
    }
    if (userLoggedIn && enc_login && type_link === 'pro') {
      setPageTitle({
        name: 'Explore Now',
        link: '/pro/',
      });
    }
  }, []);

  return (
    <div className='thankyouinfo'>
      {link !== 'pro' && link !== 'default' ? (
        <>
          {' '}
          <Pagetitle heading={heading} disc={description} button={pageTitle} />
        </>
      ) : (
        ''
      )}
      {link === 'pro' ? (
        <>
          {' '}
          <Pagetitle heading={heading} disc={description} button={pageTitle} />
        </>
      ) : (
        ''
      )}
      {link === 'default' ? (
        <>
          {' '}
          <Pagetitle heading={heading} disc={description} button={''} />
        </>
      ) : (
        ''
      )}
      {/* <Recentissue data={whatgetdata.recissue} /> */}
      <Recentissue data={Pro_data} requestFrom='thankyou-page' />
      <div className='thankyouadvancemove'>
        <div className='container'>
          <div className='promovieslist'>
            <h3 className='uppercase text-center'>advanced movie data</h3>
            <div className='promoviesitem grid gap16'>
              {Pro_data.boxoffice_upcomming.slice(0, 3).map((item, i) => (
                <div className='freersitem' key={i}>
                  <Postercta btn={'view data'} data={item} />
                </div>
              ))}
            </div>
            <div className='moremoviescta text-center '>
              <Link href={'#'} className='ghostbtn uppercase goldbtn'>
                More movies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
Thankyou.getLayout = function (page) {
  return <LayoutPro>{page}</LayoutPro>;
};
