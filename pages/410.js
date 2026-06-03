import Head from 'next/head';
import Page410 from '@/components/Page410';

export async function getServerSideProps({ res }) {
  res.statusCode = 410;
  return { props: {} };
}

export default function Custom410() {
  return (
    <>
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <Page410 />
    </>
  );
}
