import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Loader from '../../components/Loader';
import HeroVideo from '../../components/Videos/HeroVideo';

import VideoSec from '../../components/Videos/VideoSec';

const $ = require('jquery');
export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'video');
  const data = await res.json();

  // about page static data
  let VideosData = await fetch(
    process.env.NEXT_PUBLIC_SD_API + '/video_page/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  VideosData = await VideosData.json();

  return {
    props: { data, VideosData },
    revalidate: 10, // In seconds
  };
}
const Videos = ({ data , VideosData}) => {
  /*const [VideosDataLoaded, setVideosDataLoaded] = useState(false);
  const [VideosData, setVideosData] = useState([]);*/

  /*useEffect(() => {
    loadVideosData();
  }, []);*/

  /*const loadVideosData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/video_page/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setVideosData(res.data);
        setVideosDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };*/

  return (
    <>
      <Head >
        {(data.children[0].children).map( (item, index) => {
            const attributes = item.tag.toUpperCase();

            switch (attributes) {
              case 'TITLE':
                return <title key={index}>{item.html}</title>;
              case 'META':
                const name = item.name || '';
                if(name !== ''){
                return <meta key={index} name={item.name} content={item.content} />;
                } else{
                return <meta key={index} property={item.property} content={item.content} />;
                }
              case 'LINK':
                return <link key={index} rel={item.rel} href={item.href} />;
              case 'SCRIPT':
                return (
                  <script key={index} type={item.type} class={item.class} 
                     dangerouslySetInnerHTML={{ __html: item.html }}>
                  </script>
                );
              default:
                return null;
            }
          })}
      </Head>
      
        <>
          <HeroVideo data={VideosData.feature_video} />
          {VideosData.video_play_list.map((item, index) => {
            return <VideoSec data={item} key={index} />;
          })}
        </>
      
    </>
  );
};

export default Videos;
