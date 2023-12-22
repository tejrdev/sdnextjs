import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import Loader from '../../../components/Loader';
import Menu from '../../../components/Videos/Menu';
import Heading from '../../../components/Videos/Heading';
import VideoList from '../../../components/Videos/VideoList';
// import RankMathSEO from '../../../RankMathSEO';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'video/trailers-clips');
  const data = await res.json();

  // trailers clip videos page static data
  let BoxofficeBuzzData = await fetch(
   process.env.NEXT_PUBLIC_SD_API + '/video_page/video_sub_page.php?page=' + 1 + '&url=' + process.env.NEXT_PUBLIC_MENU_URL + 'video/trailers-clips/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  BoxofficeBuzzData = await BoxofficeBuzzData.json();

  return {
    props: { data, BoxofficeBuzzData },
    revalidate: 10, // In seconds
  };
}

const TrailersClips = ({ data , BoxofficeBuzzData }) => {
  const [BoxofficeBuzzDataLoaded, setBoxofficeBuzzDataLoaded] = useState(false);
  //const [BoxofficeBuzzData, setBoxofficeBuzzData] = useState([]);
  const [MoviesData, setMoviesData] = useState(BoxofficeBuzzData.video_list);
  const [distributorPages, setDistributorPages] = useState(BoxofficeBuzzData.total_pages);
  const [distributorPage, setDistributorPage] = useState(1);
  // const [SEOLoaded, setSEOLoaded] = useState(false);
  // const [SEOData, setSEOData] = useState([]);

  const setCurrentPage = (currentPage) => {
    setDistributorPage(currentPage);
  };

  useEffect(() => {
    loadBoxofficeBuzzData();
  }, [distributorPage]);

  const loadBoxofficeBuzzData = () => {
    axios
      .get(
        process.env.NEXT_PUBLIC_SD_API + '/video_page/video_sub_page.php?page=' + distributorPage + '&url=' + process.env.NEXT_PUBLIC_MENU_URL + 'video/trailers-clips/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
      )
      .then((res) => {
        // if (distributorPage === 1) {
        //   setBoxofficeBuzzData(res.data);
           setBoxofficeBuzzDataLoaded(true);
        // }
        setMoviesData(res.data.video_list);
        setDistributorPages(res.data.total_pages);
      })
      .catch((err) => console.log(err));
  };
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
      
        <section className="video_gallery">
          <div className="top_tabs">
            <div className="container">
              <div className="top_btnfilter top_txt">
                <div className="top_info">
                  { BoxofficeBuzzDataLoaded && <Menu data={BoxofficeBuzzData.menu} /> }
                </div>
              </div>
            </div>
          </div>
          <div className="page_intro">
            <div className="container">
              <Heading title={BoxofficeBuzzData.title} content={BoxofficeBuzzData.content} />
            </div>
          </div>
          <VideoList data={MoviesData} totalPages={distributorPages} setCurrentPage={setCurrentPage} />
        </section>
    </>
  );
};

export default TrailersClips;
