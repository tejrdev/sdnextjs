import Tabs from '@/components/All/Tabs';
import Tab from '@/components/All/Tabs';

import Pagetitle from '@/components/Products/Pagetitle';

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const post_id = params.newslettr_id;

  // news page static data
  let Pro_data = await fetch(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/pro_newsletter_detail.php?news_id=' + post_id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  Pro_data = await Pro_data.json();
  return {
    props: { Pro_data },
    revalidate: 10, // In seconds
  };
}

export default function SD_Pro_Newsletter_detail({ Pro_data }) {
  let backlink = '/newsletter';
  return (
    <>
      <div className='productdetail text-center paywallpvr'>
        <Pagetitle heading={Pro_data.title} disc={Pro_data.content} back={backlink} requestFrom='sunday_nwes' />
        <div className='productdetailbox text-center'>
          <div className='container'>
            <Tabs>
              <Tab label='Email Newsletter'>
                <iframe src={Pro_data.news_letter_url} frameborder='0' className='mailframenews'></iframe>
              </Tab>
              {Pro_data.news_letter_PDF && (
                <Tab label='PDF Document'>
                  <div className='prodetialdoc trackreport '>
                    <iframe src={Pro_data.news_letter_PDF} frameborder='0'></iframe>
                  </div>
                </Tab>
              )}

              {Pro_data.film_tracking_PDF && (
                <Tab label='Long Lead Film Tracking Grid'>
                  <div className='prodetialdoc trackgrid '>
                    <iframe src={Pro_data.film_tracking_PDF} frameborder='0'></iframe>
                  </div>
                </Tab>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
