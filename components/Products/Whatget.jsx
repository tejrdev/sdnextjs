import Image from 'next/image';
import Link from 'next/link';
import Suncal from '@/public/pro/suncalender.svg';
import { useState, useEffect } from 'react';
import CallToAction from '../Pro/CallToAction';

const Whatget = ({ data, user, ProInd }) => {
  const [link, setLink] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    setLink(localStorage.getItem('type_link'));
    setEmail(localStorage.getItem('email'));
  }, []);
  return (
    <section className='whatget secspacebig'>
      <div className='container'>
        <div className='whatgetinfo df fww'>
          {data.items.map((item, index) => (
            <div className='whatgetitem text-center pvr' key={index}>
              {/* <a href="#">               */}
              <figure>
                <span className='pvr'>
                  <Image src={item.img} className='' alt='' width={588} height={333} />
                  {/* <h3 className="whatgethoverbox">
                                <span>{item.hover.top_title}</span>
                                <Image src={item.hover.icon} alt="" width={60} height={60} />
                                <span dangerouslySetInnerHTML={{ __html: item.hover.bottom_title }}></span>
                             </h3> */}
                </span>
                <figcaption>{item.title}</figcaption>
              </figure>
              {/* </a>     */}
            </div>
          ))}
        </div>
        {/* {(email && link === ' ' )&& (
                     <div className="ctabox text-center">
                         <a onClick={switchtoPro} className="btn uppercase">Switch to Pro for free</a>
                     </div>
                     )}
                   {link === 'default' && (
                     <div className="ctabox text-center">
                         <a onClick={switchtoPro} className="btn uppercase">Switch to Pro for free</a>
                     </div>
                     )}
                  {link !== 'pro' && link !== 'default' && (
                     <div className="ctabox text-center">
                         <a href="/pro/signup" className="btn uppercase">Try it for free</a>
                     </div>
                     )}
                   {link === 'pro' && ('')} */}
        <CallToAction user={user} ProInd={ProInd} extraClass='text-center' />
      </div>
    </section>
  );
};

export default Whatget;
