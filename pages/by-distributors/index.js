import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Loader from '../../components/Loader';

import DistributorList from '../../components/FilmData/QuickLinks/ByDistributors/DistributorList';
import DistributorSearch from '../../components/FilmData/QuickLinks/ByDistributors/DistributorSearch';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'by-distributors');
  const data = await res.json();

  return { props: { data } };
}

const ByDistributors = ({ data }) => {
  const [ByDistributorsDataLoaded, setByDistributorsDataLoaded] = useState(false);
  const [ByDistributorsData, setByDistributorsData] = useState([]);

  useEffect(() => {
    loadByDistributorsData();
  }, []);

  const loadByDistributorsData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/by-distributors.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setByDistributorsData(res.data);
        setByDistributorsDataLoaded(true);
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
      {ByDistributorsDataLoaded ? (
        <section className="distributerinfo">
          <div className="container">
            <section className="disctcalander_srch">
              <div className="container">
                <DistributorSearch text={ByDistributorsData.content} />
                <div className="disctclnd_selectlist">
                  <div className="top_txt">
                    <h3>
                      Select Distributor From List <i className="fal fa-angle-right"></i>
                    </h3>
                  </div>
                  <DistributorList data={ByDistributorsData.by_distributors} />
                </div>
              </div>
            </section>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ByDistributors;
