
import LayoutPro from '@/components/Layout/LayoutPro';
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';

import Pagetitle from "@/components/Products/Pagetitle"
import Paywall from "@/components/Products/Paywall"

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const post_id = params.pro_id;
  console.log(post_id);

   // news page static data   
   let Pro_data = await fetch(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/pro_newsletter_detail.php?news_id='+post_id+'&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
   Pro_data = await Pro_data.json();
   return {
     props: {Pro_data},
     revalidate: 10, // In seconds
   };
 }

 export default function SD_Pro_Newsletter_detail({Pro_data}) {
   const router =useRouter();
   const [link,setLink] =useState('');
   const [email,setEmail] =useState('');
   useEffect(()=>{
       setLink(localStorage.getItem('type_link'));
       setEmail(localStorage.getItem('email'));
   },[])

 

   return (
      <>
      <div className="productdetail text-center paywallpvr">
      <Pagetitle heading={Pro_data.title} disc={Pro_data.content} />
      <div className="productdetailbox text-center">
         <div className="container">
            <h3>Latest Issue: {Pro_data.news_letter_date}</h3>
            {(link !== 'pro' && link !== 'default') ? (
              <iframe src={Pro_data.news_letter_url} frameborder="0" scrolling="no"></iframe>
              ):(
              <iframe src={Pro_data.news_letter_url} frameborder="0"></iframe>
            )}
         </div>
      </div>
      {link !== 'pro' && link !== 'default' && ( 
      <Paywall />
       )}
    </div>
    
      

          
      </>
   )
   }

   SD_Pro_Newsletter_detail.getLayout = function(page) {
  return <LayoutPro>{page}</LayoutPro>;
};