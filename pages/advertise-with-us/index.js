import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import Image_content from '../../components/AdvertisePage/Image_content';
import Sponsorship from '../../components/AdvertisePage/Sponsorship';
import ContactFrom from '../../components/AdvertisePage/ContactFrom';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'advertise-with-us');
  const data = await res.json();

  return { props: { data } };
}

const AdvertisePage = ({ data }) => {
  const [AdvertisePageDataLoaded, setAdvertisePageDataLoaded] = useState(false);
  const [AdvPageData, setAdvertisePage] = useState([]);

  useEffect(() => {
    loadAboutData();
  }, []);

  const loadAboutData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/Advertise_with_us_page/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setAdvertisePage(res.data);
        setAdvertisePageDataLoaded(true);
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
      {AdvertisePageDataLoaded && (
        <div className="addus">
          <section className="addus_banner">
            {AdvPageData.banner_image.url.length ? (
              <div className="bnrimg">
                <img src={AdvPageData.banner_image.url} alt={AdvPageData.banner_content} className="objctimg_box" />
              </div>
            ) : (
              ''
            )}
            {AdvPageData.banner_content.length ? (
              <div className="addbnr_txt text-center df fww">
                <h1>{AdvPageData.banner_content}</h1>
              </div>
            ) : (
              ''
            )}
          </section>

          {AdvPageData.page_content.length ? (
            <section className="page_intro">
              <div className="container">
                <div className="page_introbox text-center" dangerouslySetInnerHTML={{ __html: AdvPageData.page_content }}></div>
              </div>
            </section>
          ) : (
            ''
          )}

          {AdvPageData.adv_content.map((item, index) => {
            switch (item.section) {
              case 'image_content_section':
                return <Image_content data={item} key_data={index} />;
              case 'sponsorship_section':
                return <Sponsorship data={item} key_data={index} />;
              case 'contact_section':
                return <ContactFrom data={item} />;

              default:
                return null;
            }
          })}
        </div>
      )}
    </>
  );
};

export default AdvertisePage;
