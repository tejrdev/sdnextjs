import img410 from '../../public/images/410.png';
import Head from 'next/head';

const Page410 = () => {
  return (
    <>
    <Head>
        <meta name='robots' content='noindex' />
    </Head>
        <section className='notfound subfilmy'>
          <div className='container'>
            <div className='ntfounderror'>
              <div className='nferror'>
                <img src={img410.src} alt='' />
              </div>
              <div className='nftxt text-center'>
                <h1> Content No Longer Available </h1>
                <p>
                  The page you’re looking for is no longer available. <a href='https://www.screendollars.com/contact-us/'>contact us</a> for more information.
                </p>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};

export default Page410;
