import Page404 from '@/components/Page404';
import Head from 'next/head';
import axios from 'axios';

import { useState, useEffect } from 'react';
const index = () => {
  const load404Page = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/404_page?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setPage404(res.data);
        setPage404load(true);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (window.location.href.indexOf('.pdf') > -1) {
      var urls = (process.env.NEXT_PUBLIC_BACKEND_URL + window.location.pathname).replace('wp/', '');
      // console.log(urls);
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
