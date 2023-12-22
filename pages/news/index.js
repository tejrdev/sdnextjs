import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Polls from '../../components/Homepage/Polls';
import ZipperMedia from '../../components/Homepage/ZipperMedia';
import NewsSlider from '../../components/News/NewsSlider';
import BoxOffice from '../../components/News/BoxOffice';

import Headlines from '../../components/News/Headlines';
import NewsCategory from '../../components/News/NewsCategory';
import Loader from '../../components/Loader';
// import RankMathSEO from '../../RankMathSEO';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'news');
  const data = await res.json();

  // news page static data
  let homepageData = await fetch(
   process.env.NEXT_PUBLIC_SD_API + '/api_home/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  homepageData = await homepageData.json();

  let newsData = await fetch(
    process.env.NEXT_PUBLIC_SD_API + '/news_page/new.php/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
    );
  newsData = await newsData.json();


  let latestBoxOfficeData = await fetch(
    process.env.NEXT_PUBLIC_SD_API + '/home_boxoffice/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
    );
  latestBoxOfficeData = await latestBoxOfficeData.json();

  let zipperData = await fetch(
    process.env.NEXT_PUBLIC_SD_API + '/non_stop_news/text_news_tiker.php/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
    );
  zipperData = await zipperData.json();

  return {
    props: { data, homepageData , newsData , latestBoxOfficeData , zipperData},
    revalidate: 10, // In seconds
  };
}

const News = ({ data, homepageData , newsData , latestBoxOfficeData , zipperData }) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [boxOfficeCls, setBoxOfficeCls] = useState('loaddata');
  const [IPAddress, setIPAddress] = useState('');
  // const [homepageDataLoaded, setHomepageDataLoaded] = useState(false);
  // const [homepageData, setHomepageData] = useState([]);
  // const [latestBoxOfficeDataLoaded, setLatestBoxOfficeDataLoaded] = useState(false);
  // const [latestBoxOfficeData, setLatestBoxOfficeData] = useState([]);
   const [zipperDataLoaded, setZipperDataLoaded] = useState(false);
  // const [zipperData, setzipperData] = useState([]);
  // const [newsDataLoaded, setNewsDataLoaded] = useState(false);
  // const [newsData, setNewsData] = useState([]);
  //console.log(zipperData);
  useEffect(() => {
    setDomLoaded(true);
    //loadHomepageData();
    //loadLatestBoxOfficeData();
    loadZipperData();
    //loadNewsData();
  }, []);

  const loadHomepageData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    setIPAddress(res.data.IPv4);
    // axios
    //   .get(process.env.NEXT_PUBLIC_SD_API + '/api_home/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&ip_address=' + res.data.IPv4)
    //   .then((res) => {
    //     setHomepageData(res.data);
    //     setHomepageDataLoaded(true);
    //   })
    //   .catch((err) => console.log(err));
  };
  // const loadLatestBoxOfficeData = () => {
  //   axios
  //     .get(process.env.NEXT_PUBLIC_SD_API + '/home_boxoffice/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
  //     .then((res) => {
  //       setLatestBoxOfficeData(res.data);
  //       setLatestBoxOfficeDataLoaded(true);
  //       setBoxOfficeCls('');
  //     })
  //     .catch((err) => console.log(err));
  // };
  const loadZipperData = () => {
    // axios
    //   .get(process.env.NEXT_PUBLIC_SD_API + '/non_stop_news/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
    //   .then((res) => {
    //     setzipperData(res.data.non_stop_news);
         setZipperDataLoaded(true);
    //   })
    //   .catch((err) => console.log(err));
  };
  // const loadNewsData = () => {
  //   axios
  //     .get(process.env.NEXT_PUBLIC_SD_API + '/news_page/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
  //     .then((res) => {
  //       setNewsData(res.data);
  //       setNewsDataLoaded(true);
  //     })
  //     .catch((err) => console.log(err));
  // };
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
          {/* <RankMathSEO /> */}
          <section className="newswelcome">
            <div className="container">
              <div className="top_txt">
                <h2>
                  <Link href="/headlines">
                    News<i className="fal fa-angle-right"></i>
                  </Link>
                </h2>
              </div>
              <div className="newswelcomebox df fww">
                
                  <div className="newswel_left">
                    {domLoaded && (<NewsSlider data={newsData.highlight_article} />)}
                  </div>
                
                <div className="newswel_right df fww">
                  <div className={boxOfficeCls + ' officecom'}>
                    
                      <>
                        <BoxOffice
                          data={latestBoxOfficeData.boxoffice_data}
                          title={
                            latestBoxOfficeData.boxoffice_title.split('-')[0].split('/')[0] +
                            '/' +
                            latestBoxOfficeData.boxoffice_title.split('-')[0].split('/')[1] +
                            ' - ' +
                            latestBoxOfficeData.boxoffice_title.split('-')[1].split('/')[0] +
                            '/' +
                            latestBoxOfficeData.boxoffice_title.split('-')[1].split('/')[1]
                          }
                          tag="boxoffice"
                        />
                        <BoxOffice data={latestBoxOfficeData.boxoffice_upcomming} tag="comingsoon" />
                      </>
                    
                  </div>
                  <div className="newswel_quizip">
                    <div className="quizebox">
                      <Polls data={homepageData.quiz} tag="quiz" ip={IPAddress} />
                    </div>
                    { 
                      zipperDataLoaded && <ZipperMedia data={zipperData.non_stop_news} />
                  }
                  </div>
                </div>
              </div>
            </div>
          </section>
          {newsData.headlines && <Headlines data={newsData.headlines} />}

          {newsData.category_list_data &&
            newsData.category_list_data.map((item, index) => {
              return <NewsCategory data={item} key={index} />;
            })}
        </>
      
    </>
  );
};

export default News;
