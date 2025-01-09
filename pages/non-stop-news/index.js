import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import Loader from '../../components/Loader';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'non-stop-news');
  const data = await res.json();

  return { props: { data } };
}

const NonStopNews = ({ data }) => {
  const [NonStopNewsDataLoaded, setNonStopNewsDataLoaded] = useState(false);
  const [NonStopNewsData, setNonStopNewsData] = useState([]);

  useEffect(() => {
    loadNonStopNewsData();
  }, []);

  const loadNonStopNewsData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/non_stop_news/detail_page_news.php/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setNonStopNewsData(res.data);
        setNonStopNewsDataLoaded(true);
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
      <section className="newslinebox sec_spacing">
        <div className="container" id="nonstop_list_data">
          <div className="top_txt text-center">
            <h1 className="h2 btmline">Nonstop News</h1>
          </div>
          <div className="newsline_block twocol_news df fww">
            <h3 className="newsline_datebox">
              {NonStopNewsData.non_stop_news_title} <i className="far fa-angle-right"></i>
            </h3>
            {NonStopNewsDataLoaded ? (
              NonStopNewsData.non_stop_news.map((item, index) => {
                return (
                  <div className="newsline_item" id={item.id} key={index}>
                    <div className="newaline_inner">
                      <figure className="pvr">
                        <img src={item.img} alt="" className="objctimg_box" />
                      </figure>
                      <div className="newsline_iteminfo">
                        <h4>{item.title}</h4>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Loader />
            )}
          </div>
        </div>
        <input type="hidden" id="infi_non_next" value="105629" />
        <div className="distributer_secload pvr df fww">
          <div className="boxloader hide" id="directory_home_loader">
            <div className="loadersmall"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NonStopNews;
