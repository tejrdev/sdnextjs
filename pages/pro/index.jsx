import Counter from '@/components/Products/Counter';
import Whatget from '@/components/Products/Whatget';
import Recentissue from '@/components/Products/Recentissue';
import Paychoose from '@/components/Products/Paychoose';
import { HiCheck } from 'react-icons/hi';
import LayoutPro from '@/components/Layout/LayoutPro';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Figimage from '@/components/All/Figimage';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import CallToAction from '@/components/Pro/CallToAction';
const ENCT_KEY = process.env.NEXT_PUBLIC_ENC_KEY;
var CryptoJS = require('crypto-js');

export async function getStaticProps({}) {
  // news page static data
  let Pro_data = await fetch(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/home_page.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  Pro_data = await Pro_data.json();
  return {
    props: { Pro_data },
    revalidate: 10, // In seconds
  };
}

export default function ScreendollarPro_Home({ Pro_data }) {
  const router = useRouter();
  //check for Pro Subscriber
  const { user, subscriber } = useSelector((state) => state.auth);
  const ProInd = CryptoJS.AES.decrypt(subscriber, ENCT_KEY)
    .toString(CryptoJS.enc.Utf8)
    .replace(user + '_', '');
  // if (!user || ProInd !== 'Y') {
  //   router.push('/pro/login');
  // }
  //console.log(1);
  const [link, setLink] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_SD_API;
  const animref = useRef(0);

  const Listwords = Pro_data.title_text; // Add your class names here
  const duration = 3000; // 1 second
  const [activeIndex, setActiveIndex] = useState(0);
  const [liwidth, setliwidth] = useState([150, 150, 150]);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const items = animref.current.querySelectorAll('li');
      const widths = Array.from(items).map((item) => item.offsetWidth);
      setliwidth(widths);
    }, 1000);
    //console.log( liwidth)
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % Listwords.length);
    }, duration);

    return () => {
      clearInterval(interval);
    };
  }, [duration, liwidth]);

  useEffect(() => {
    setLink(localStorage.getItem('type_link'));
    setEmail(localStorage.getItem('email'));
  }, []);

  const switchtoPro = () => {
    const switchpro = async () => {
      var switch_url = API_URL + '/SD_PRO/switch.php';
      await axios
        .get(switch_url, {
          params: {
            email: window.btoa(email),
          },
        })
        .then((res) => {
          localStorage.setItem('type_link', 'pro');
          router.push('/pro/thankyou');
        })
        .catch((err) => console.log('Switch error ', err));
    };
    switchpro();
  };

  return (
    <>
      <section className='insteintro secspace'>
        <div className='container'>
          <div className='top_txt text-center'>
            {isLoading && (
              <h1 className='uppercase animtitle'>
                {Pro_data.title_frist}
                <span id='fiptxt'>
                  <ul className='refwisth' ref={animref}>
                    {Listwords.map((item, index) => (
                      <li key={index} className='reflist'>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <ul className='headtxtanimate'>
                    {Listwords.map((item, index) => (
                      <li
                        key={index}
                        className={index === activeIndex ? 'active' : ''}
                        style={{
                          width: index === activeIndex ? 'auto' : '150px',
                          height: index === activeIndex ? '' : 0,
                        }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </span>
                <br />
                {Pro_data.title_last}
              </h1>
            )}
            <div className='h4 normal' dangerouslySetInnerHTML={{ __html: Pro_data.content }}></div>

            {/* {email && link === ' ' && (
              <div className='ctabox'>
                <a onClick={switchtoPro} className='btn uppercase'>
                  Switch to Pro for free
                </a>
              </div>
            )}
            {link === 'default' && (
              <div className='ctabox'>
                <a onClick={switchtoPro} className='btn uppercase'>
                  Switch to Pro for free
                </a>
              </div>
            )}
            {link !== 'pro' && link !== 'default' && (
              <div className='ctabox'>
                <a href='/pro/signup' className='btn uppercase'>
                  Try it for free
                </a>
              </div>
            )}
            {link === 'pro' && ''} */}
            <CallToAction user={user} ProInd={ProInd} />
          </div>
          {Pro_data.pro_video && (
            <div className='introvideo text-center'>
              {/* <iframe src={Pro_data.pro_video} title="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}
              <Figimage src={Pro_data.pro_video} width={1200} height={727} alt={'pro banner'} />
            </div>
          )}
        </div>
      </section>
      {Pro_data.pro_counter && <Counter data={Pro_data.pro_counter} />}
      {Pro_data.what_you_get_section.title && <Whatget data={Pro_data.what_you_get_section} user={user} ProInd={ProInd} />}
      <Recentissue data={Pro_data} user={user} ProInd={ProInd} />

      <div className='offering secspace projectiongrey'>
        <div className='container'>
          <div className='top_txt'>
            <h2 className='uppercase text-center'>OFFERINGS</h2>
          </div>
          <table className='responceoffering'>
            <caption></caption>
            <thead className='uppercase text-center'>
              <tr>
                <th scope='col'>Item</th>
                <th scope='col'>How & When</th>
                <th scope='col'>Screendollars</th>
                <th scope='col'>Screendollars PRO</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {Pro_data.final_offerings.map((offer_items, index) => (
                <tr key={index}>
                  <td data-label='How & When' dangerouslySetInnerHTML={{ __html: offer_items.item }}></td>
                  <td data-label='Item'>{offer_items['how_&_when']}</td>
                  <td data-label='classic'> {offer_items.screendollars ? <HiCheck /> : <span></span>} </td>
                  <td data-label='pro'>{offer_items.pro ? <HiCheck /> : <span></span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* {Pro_data.pro_offer_weekly && (
            <div className="offering secspace projectiongrey">
               <div className="container">
                  <table className='responceoffering'>
                     <caption><h3 className="uppercase">{Pro_data.pro_offer_weekly.title}</h3></caption>
                     <thead className='uppercase text-center'>
                        <tr>
                           <th scope="col">When</th>
                           <th scope="col">item</th>
                           <th scope="col">Screendollars</th>
                           <th scope="col">Screendollars PRO</th>
                        </tr>
                     </thead>
                     <tbody className='uppercase text-center'>
                           {Pro_data.pro_offer_weekly.pro_offer_list.map((offer_items,index) =>
                              <tr key={index}>
                                 <td data-label="When">{offer_items.when}</td>
                                 <td data-label="item" dangerouslySetInnerHTML={{ __html: offer_items.item }}></td>
                                 <td data-label="classic"> {offer_items.classic ? <HiCheck /> : <span></span>} </td>
                                 <td data-label="pro">{offer_items.pro ? <HiCheck /> : <span></span>}</td>
                              </tr>
                           )}
                     </tbody>
                  </table>
               </div>
            </div>
         )}
         {Pro_data.pro_offer_qtly.title && (
         <div className="offering secspace">
            <div className="container">
               <table className='responceoffering'>
                  <caption><h3 className="uppercase">{Pro_data.pro_offer_qtly.title}</h3></caption>
                  <thead className='uppercase text-center'>
                     <tr>
                        
                        <th scope="col">item</th>
                        <th scope="col">Screendollars</th>
                        <th scope="col">Screendollars PRO</th>
                     </tr>
                  </thead>
                  <tbody className='uppercase text-center'>
                  {Pro_data.pro_offer_qtly.pro_offer_list.map((offer_items,index) =>
                     <tr key={index}>                        
                        <td data-label="item" dangerouslySetInnerHTML={{ __html: offer_items.item }}></td>
                        <td data-label="classic">{offer_items.classic ? <HiCheck /> : <span></span>}</td>
                        <td data-label="pro">{offer_items.pro ? <HiCheck /> : <span></span>}</td>
                     </tr>
                      )}
                  </tbody>
               </table>
            </div>
         </div>
         )}
         {Pro_data.pro_offer_web.title && (
         <div className="offering secspace">
            <div className="container">
               <table className='responceoffering' disabled>
                  <caption><h3 className="uppercase">{Pro_data.pro_offer_web.title}</h3></caption>
                  <thead className='uppercase text-center' >
                     <tr>
                        <th scope="col" colSpan="2">item</th>
                        <th scope="col">Screendollars</th>
                        <th scope="col">Screendollars PRO</th>
                     </tr>
                  </thead>
                  <tbody className='uppercase text-center'>
                  {Pro_data.pro_offer_qtly.pro_offer_list.map((offer_items,index) =>
                     <tr key={index}>
                        <td data-label="item" colSpan="2" dangerouslySetInnerHTML={{ __html: offer_items.item }}></td>
                        <td data-label="classic">{offer_items.classic ? <HiCheck /> : ''}</td>
                        <td data-label="pro" >{offer_items.pro ? <HiCheck /> : ''}</td>
                     </tr>
                     )}

                  </tbody>
               </table>
            </div>
         </div>
         )} */}

      {/* {Pro_data.pro_newsletter.newsletter_data.length >= 1 && ( */}
      {/* {(link !== 'pro' && link !== 'default') ? (''):( */}

      {/* )} */}
      {/* )} */}
      {link !== 'pro' && link !== 'default' && (
        <>
          {Pro_data.offer_section && (
            <section className='paymentplan secspace'>
              <div className='container'>
                <div className='top_txt text-center'>
                  <h2 className='uppercase'>{Pro_data.offer_section.title}</h2>
                  {/* <div className="h4 normal" dangerouslySetInnerHTML={{ __html: Pro_data.offer_section.content }}></div> */}
                </div>
                <div className='ctabox text-center'>
                  <a href='/pro/signup' className='btn uppercase'>
                    Try it for free
                  </a>
                  {/* <a href="#" className="ghostbtn goldbtn uppercase">see pricing</a> */}
                  {/* <Paychoose align={'text-center'} choose/> */}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}

ScreendollarPro_Home.getLayout = function (page) {
  return <LayoutPro>{page}</LayoutPro>;
};
