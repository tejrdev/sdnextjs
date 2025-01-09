import Head from 'next/head';
import Page404 from '@/components/Page404';

export default function Custom404() {
  return (
    <>
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <Page404 />
    </>
  );
}
