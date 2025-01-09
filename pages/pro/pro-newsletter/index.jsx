
import LayoutPro from '@/components/Layout/LayoutPro';
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';

import Pagetitle from "@/components/Products/Pagetitle"
import Productitem from "@/components/Products/Productitem"
import InstantTrial from "@/components/Products/InstantTrial"
import MeetExpert from "@/components/Products/MeetExpert"
import WhatGetSidebar from "@/components/Products/WhatGetSidebar"

import Image from "next/image"
import Link from "next/link"



export async function getStaticProps({}) {
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
                        
                    <div className="productlist">
                    {Pro_data.newsletter_list.map((item, i) =>
                            <div className="productlistitem df fww" key={i}>
                                <figure className="pvr">
                                <Link href={item.link}>
                                    <Image src={item.img} className="objctimg_box" alt="" width={588} height={333} />
                                </Link>
                                </figure>
                                <div className="productlistinfo">
                                <div className="proitem">
                                    {item.pro_exclusive &&(
                                        <>
                                        <span className="protag uppercase">pro exclusive</span>
                                        <span>{item.pro_exclusive}</span>
                                        </>
                                    )}
                                </div>
                                <h3><Link href={item.link}>{item.title}</Link></h3>
                                <div className="pubdate">{item.news_letter_date}</div>
                                <div className="morebtn"><Link href={item.link} className="ghostbtn goldbtn uppercase">view  more</Link></div>
                                </div>
                            </div>
                    )}
                    </div>

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