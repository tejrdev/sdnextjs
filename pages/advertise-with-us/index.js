import Image_content from '../../components/AdvertisePage/Image_content';
import Sponsorship from '../../components/AdvertisePage/Sponsorship';
import ContactFrom from '../../components/AdvertisePage/ContactFrom';
import HeadComponent from '../../components/HeadComponent';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'advertise-with-us');
  const SEOdata = await res.json();

  // advertise page static data
  let AdvertiseData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/Advertise_with_us_page/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  AdvertiseData = await AdvertiseData.json();

  return {
    props: { SEOdata, AdvertiseData },
    revalidate: 10, // In seconds
  };
}

const AdvertisePage = ({ SEOdata, AdvertiseData }) => {
  return (
    <>
      <HeadComponent data={SEOdata} />
      <div className='addus'>
        <section className='addus_banner'>
          {AdvertiseData.banner_image.url.length ? (
            <div className='bnrimg'>
              <img src={AdvertiseData.banner_image.url} alt={AdvertiseData.banner_content} className='objctimg_box' />
            </div>
          ) : (
            ''
          )}
          {AdvertiseData.banner_content.length ? (
            <div className='addbnr_txt text-center df fww'>
              <h1>{AdvertiseData.banner_content}</h1>
            </div>
          ) : (
            ''
          )}
        </section>

        {AdvertiseData.page_content.length ? (
          <section className='page_intro'>
            <div className='container'>
              <div className='page_introbox text-center' dangerouslySetInnerHTML={{ __html: AdvertiseData.page_content }}></div>
            </div>
          </section>
        ) : (
          ''
        )}

        {AdvertiseData.adv_content.map((item, index) => {
          switch (item.section) {
            case 'image_content_section':
              return <Image_content data={item} key={index} />;
            case 'sponsorship_section':
              return <Sponsorship data={item} key={index} />;
            case 'contact_section':
              return <ContactFrom data={item} key={index} />;
            default:
              return null;
          }
        })}
      </div>
    </>
  );
};

export default AdvertisePage;
