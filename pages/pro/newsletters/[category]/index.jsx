import LayoutPro from '@/components/Layout/LayoutPro';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Pagetitle from '@/components/Products/Pagetitle';
import ListingPageTitle from '@/components/Products/ListingPageTitle';
import MeetExpert from '@/components/Products/MeetExpert';
import WhatGetSidebar from '@/components/Products/WhatGetSidebar';
import ListNewsletter from '@/components/Products/ListNewsletter';
import Unlockinside from "@/components/Products/Unlockinside"

import newslettersun from '@/public/pro/sunnewspagetitle.jpg';

import Image from 'next/image';
import Link from 'next/link';

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const news_fitler = params.category;

  // news page static data
  let Pro_data = await fetch(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/pro_newsletter.php?news_fitler=' + news_fitler + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  Pro_data = await Pro_data.json();
  return {
    props: { Pro_data, news_fitler },
    revalidate: 10, // In seconds
  };
}

export default function ScreendollarPro_Newsletter({ Pro_data, news_fitler }) {
  const router = useRouter();
  const [link, setLink] = useState('');
  const [email, setEmail] = useState('');
  // const temtitledisc = 'Fusce at nisi eget dolor rhoncus facilisis. Mauris ante nisl, consectetur et luctus et, porta ut dolor. Curabitur ultricies ultrices nulla. Morbi blandit nec est vitae dictum. Etiam vel consectetur diam. Maecenas vitae egestas dolor. Fusce tempor.';

  useEffect(() => {
    setLink(localStorage.getItem('type_link'));
    setEmail(localStorage.getItem('email'));
  }, []);

  return (
    <>
      {/* <Pagetitle heading={Pro_data.title} disc={Pro_data.content}  /> */}
      <ListingPageTitle titledisc={Pro_data.content} media={Pro_data.image} />
      <div className='productlisting'>
        <div className='container'>
          <div className='prolistingbox df fww'>
            <div className='prolistleft'>
              <ListNewsletter Pro_data={Pro_data} news_fitler={news_fitler} />
            </div>
            <div className='prolistright'>
              <Unlockinside />

              <MeetExpert data={Pro_data.expitem} />
              <WhatGetSidebar data={Pro_data.what_you_get_section} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ScreendollarPro_Newsletter.getLayout = function (page) {
  return <LayoutPro>{page}</LayoutPro>;
};
