
import LayoutPro from '@/components/Layout/LayoutPro';
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';


import Pagetitle from "@/components/Products/Pagetitle"
import MeetExpert from "@/components/Products/MeetExpert"
import WhatGetSidebar from "@/components/Products/WhatGetSidebar"
import ListNewsletter from "@/components/Products/ListNewsletter"

import Image from "next/image"
import Link from "next/link"


  

export async function getStaticProps(context) {
   // news page static data   
   let Pro_data = await fetch(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/pro_newsletter.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
   Pro_data = await Pro_data.json();
   return {
     props: {Pro_data},
     revalidate: 10, // In seconds
   };
 }

 export default function ScreendollarPro_Newsletter({Pro_data}) {
   const router =useRouter();
   const [link,setLink] =useState('');
   const [email,setEmail] =useState('');
   
   useEffect(()=>{
       setLink(localStorage.getItem('type_link'));
       setEmail(localStorage.getItem('email'));
   },[])

 

   return (
      <>
            <Pagetitle heading={Pro_data.title} disc={Pro_data.content}  />
            <div className="productlisting">
                <div className="container">
                    <div className="prolistingbox df fww">
                    <div className="prolistleft">                        
                        <ListNewsletter Pro_data={Pro_data}  news_fitler={''}/>
                    </div>
                    <div className="prolistright">
                        <div className="instrial">
                            <h6>Instantly unlock insider information on upcoming movie releases...</h6>
                            {link !== 'pro' && link !== 'default' && (
                            <Link href="/pro/signup/" className="btn uppercase">start your free trial</Link>
                            )}
                        </div>                        
                        <MeetExpert data={Pro_data.expitem} />
                        <WhatGetSidebar data={Pro_data.what_you_get_section} />
                    </div>
                    </div>
                </div>
            </div>
      </>
   )
   }

ScreendollarPro_Newsletter.getLayout = function(page) {
  return <LayoutPro>{page}</LayoutPro>;
};