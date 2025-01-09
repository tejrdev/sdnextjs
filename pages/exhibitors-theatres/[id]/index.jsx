import Head from 'next/head';
import Page410 from '@/components/Page410';

export async function getServerSideProps(context) {
  const { params, res } = context;
  res.statusCode = 410;
  return {
    props: {}, // You can return an empty object for props or display custom content
    // props: {},
    // redirect: {
    //   destination: '/410',
    //   permanent: false,
    // },
  };
}

export default function ExhibitirTheatre() {
  return (
    <>
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <Page410 />
    </>
  );
}
