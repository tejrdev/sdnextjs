import img404 from '../../public/images/404.png';
import Link from 'next/link';
import Head from 'next/head';

const Page404 = () => {
  return (
    <>
    <Head>
        <meta name='robots' content='noindex' />
    </Head>
        <section className='notfound subfilmy'>
          <div className='container'>
            <div className='ntfounderror'>
              <div className='nferror'>
                <img src={img404.src} alt='' />
              </div>
              <div className='nftxt text-center'>
              <h1>Oops Page Not Found</h1>
              <p>We can’t seem to find the page you are looking for. Try going back to the home page or <Link href='/contact-us'>contact us</Link> for more information.</p>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};

export default Page404;
