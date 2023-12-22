import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Loader from '../../components/Loader';

import Listings from '../../components/News/DetailPages/ArticleDetail/Top10/Listings';
import TopBanner from '../../components/News/DetailPages/ArticleDetail/Top10/TopBanner';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + '3d');
  const data = await res.json();

  // static data
  let ThreeDData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/quick_link_post.php?page_name=3d&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  ThreeDData = await ThreeDData.json();

  
  return {
    props: { data, ThreeDData },
    revalidate: 10, // In seconds
  };

  
}

const ThreeD = ({ data, ThreeDData }) => {
  // const [ThreeDDataLoaded, setThreeDDataLoaded] = useState(false);
  // const [ThreeDData, setThreeDData] = useState([]);

  useEffect(() => {
    //loadThreeDData();
  }, []);
  
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
      <div className="toparticels subfilmy">
        <TopBanner data={ThreeDData} requestFrom="quicklinks" />
        <Listings data={ThreeDData.movies} requestFrom="quicklinks" />
      </div>      
    </>
  );
};

export default ThreeD;
