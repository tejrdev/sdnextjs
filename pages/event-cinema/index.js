import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Loader from '../../components/Loader';

import TopBanner from '../../components/News/DetailPages/ArticleDetail/Top10/TopBanner';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'event-cinema');
  const data = await res.json();

  return { props: { data } };
}

const EventCinema = ({ data }) => {
  const [EventCinemaDataLoaded, setEventCinemaDataLoaded] = useState(false);
  const [EventCinemaData, setEventCinemaData] = useState([]);

  useEffect(() => {
    loadEventCinemaData();
  }, []);
  const loadEventCinemaData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/quick_link_post.php?page_name=event-cinema&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setEventCinemaData(res.data);
        setEventCinemaDataLoaded(true);
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
      {EventCinemaDataLoaded ? (
        <div className="toparticels subfilmy">
          <TopBanner data={EventCinemaData} requestFrom="quicklinks" />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default EventCinema;
