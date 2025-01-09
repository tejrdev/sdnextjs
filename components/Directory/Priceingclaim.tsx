import React, { useState } from 'react';
import Togglebtn from '@/components/All/Togglebtn';

const Priceingclaim = () => {
   const [toggleon, setToggleon] = useState(false);
   const togglehandle = () => setToggleon(!toggleon);
   return (
      <section className='featuringprice secspace'>
         <div className='container'>
            <div className='top_txt text-center'>
               <h2>Pricing Plan</h2>
               <div className='mb-2'>
                  <Togglebtn toggleleft={'Annual'} toggleright={'Monthly'} ontoggle={togglehandle} />
               </div>
               <p className='font-bold'>
                  <small className='bg-gold rounded px-2 mr-1'>20% discount</small>
                  <small>when you go annual.</small>
               </p>
            </div>

            <div className={(toggleon ? 'monthlypalns' : 'annualpalns') + ' flex flex-wrap gap-5 justify-center'}>
               {PriceCardData.map((item, index) => (
                  <Pricecard data={item} toggleon={toggleon} key={index} gold={index % 2 === 1} />
               ))}
            </div>
            {/* <div className='mt-5 text-center'>
          <a href='#' className='ghostbtn uppercase goldbtn'>
            find your business
          </a>
        </div> */}
         </div>
      </section>
   );
};

const PriceCardData = [
   {
      title: 'Basic',
      monthlyPrice: 'Free!',
      annualPrice: 'Free!',
      list: ['Theatre name + Details', 'Logo or Profile image', 'Website & Social media links', 'List showtimes', 'Listed by City + State'],
   },
   {
      title: 'Featured',
      monthlyPrice: '$19.99',
      annualPrice: '$199.99',
      list: ['Everything Basic plus...', 'Set banner image', 'Publish image gallery', 'Prioritized listing in Directory', 'Search results and featured'],
   },
   {
      title: 'Featured Theatre',
      monthlyPrice: '$4.99 ',
      annualPrice: '$49.99',
      list: ['Everything Basic plus...', 'Set banner image', 'Publish image gallery', 'Prioritized listing in Directory', 'Search results and featured'],
   },
];
const Pricecard = ({ data, gold = false, toggleon = false }: any) => {
   return (
      <div className={`"card border-2 rounded-md p-3 w-full max-w-80 " ${gold ? 'border-gold bg-gold-yellow' : 'border-gray-300'}`}>
         <h3>
            {toggleon ? data.monthlyPrice : data.annualPrice} {data.title !== 'Basic' &&
               <span className='text-base'>{toggleon ? ' / month' : ' / year'}</span>}
         </h3>
         <h4 className='font-normal'>{data.title}</h4>
         <ul className='mb-1'>
            {data.list.map((item: any, index: number) => (
               <li key={index} className='pb-2'>
                  {item}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Priceingclaim;
