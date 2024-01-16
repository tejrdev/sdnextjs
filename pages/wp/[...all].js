import Page404 from '@/components/Page404';
import Head from 'next/head';

import { useState, useEffect } from 'react';
const index = () => {
  useEffect(() => {
    if (window.location.href.indexOf('.pdf') > -1) {
      var urls = (process.env.NEXT_PUBLIC_MENU_URL1 + window.location.pathname).replace('wp/', '');
      console.log(urls);
      window.location.href = urls;
    } else {
      load404Page();
    }
  }, []);

  return (
    <>
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <Page404 />
    </>
  );
};

export default index;
