import React from 'react';
import FooterSubscriber from './NewsletterSubscriber';
import SocialMedia from './SocialMedia';
import Image from 'next/image';
import sd_ftrlogo from '@/public/images/footersdlogo.png';
// import './footer.css';
import Link from 'next/link';
import ScrollTop from '@/components/All/ScrollTop';


function Footer({ data }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer id='colophon' className='site-footer temfy bg-black pt-10' role='contentinfo'>
      <div className='container'>
        <div className='footer_top df fww justify-between items-center lg:mb-10 mb-5'>
          <div className='ftr_logo max-w-36 sm:max-w-48 lg:max-w-52'>
            <Image src={sd_ftrlogo} alt='Screendollar' rel='preload' as='image' width={292} height={96} />
          </div>
          {/* <div className='ftr_mailing sm:px-3 py-1 w-full sm:w-auto'>
            <p className='text-sm text-white mb-1 mt-2 sm:mt-0'>Get the latest news and updates from us</p>
            <FooterSubscriber />
          </div> */}
          <div className='ftr_social mt-2 lg:mt-0'>
            <p className='text-sm text-white mb-0'>Follow us on</p>
            <SocialMedia classes={''} />
          </div>
        </div>
        <div className='footer_btm df fww'>
          {data.mega_menu.map((item, id) => {
            return (
              <div className='ftr_navlist w-full xsm:w-1/2 sm:w-1/3 lg:w-1/5 ' key={id}>
                <ul className='menu list-none ml-0 pe-3'>
                  {item.child_items && item.child_items.map((child_menu, index) => {
                    if (index === 0) {
                      return (
                        <React.Fragment key={index}>
                          <li>
                            <Link href={item.url} className='opacity-60 border-b border-solid border-white pb-2 inline-block mb-4 font-bold text-white capitalize transition duration-500 ease-out font-mont hover:text-gold '>
                              {item.title}
                            </Link>
                          </li>
                          <li>
                            <Link href={child_menu.url} className='text-white capitalize transition duration-500 ease-out font-mont hover:text-gold '>
                              <span dangerouslySetInnerHTML={{ __html: child_menu.title }}></span>
                            </Link>
                          </li>
                        </React.Fragment>
                      );
                    } else {
                      return (
                        <li key={index}>
                          <Link href={child_menu.url} className='text-white capitalize transition duration-500 ease-out font-mont hover:text-gold '>
                            {child_menu.title.replace(/&#038;/g, '&')}
                          </Link>
                        </li>
                      );
                    }
                  })}
                </ul>
                {item?.url2 && <ul className='list-none ml-0 pe-3'>
                  <li>
                    <Link href={item?.url2} className='opacity-60 border-b border-solid border-white pb-2 inline-block mb-4 font-bold text-white capitalize transition duration-500 ease-out font-mont hover:text-gold '>
                      {item?.title2}
                    </Link>
                  </li>
                  {item?.child_items2 && item?.child_items2.map((child_menu, index) => {
                    return (
                      <li key={index}>
                        <Link href={child_menu.url} className='text-white capitalize transition duration-500 ease-out font-mont hover:text-gold '>
                          <span dangerouslySetInnerHTML={{ __html: child_menu.title }}></span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>}
              </div>
            );
          })}
        </div>
      </div>
      <div className='site_info text-center p-4 bg-zinc-700 pb-1'>
        <div className='copytxt text-white py-[2px] capitalize'>
          <p className='tracking-wider'>
            © {currentYear} Screendollars, All Rights Reserved.{' '}
            <a href={'/terms-use/'} target='_blank' rel='noreferrer' className='text-sky-200 hover:text-sky-500'>
              Terms of Use{' '}
            </a>{' '}
            and{' '}
            <a href={'/privacy-policy/'} target='_blank' rel='noreferrer' className='text-sky-200 hover:text-sky-500'>
              Privacy Policy{' '}
            </a>
            Apply{' '}
            {/* <i className='block font-normal text-sm'>
              This site is protected by reCAPTCHA, Google's{' '}
              <a href='https://policies.google.com/terms' target='_blank' rel='noreferrer' className='text-sky-200 hover:text-sky-500'>
                Terms of Service
              </a>{' '}
              and{' '}
              <a href='https://policies.google.com/privacy' target='_blank' rel='noreferrer' className='text-sky-200 hover:text-sky-500'>
                Privacy Policy
              </a>{' '}
              apply{' '}
            </i> */}
          </p>
        </div>
      </div>
      <ScrollTop />
    </footer>
  );
}

export default Footer;
