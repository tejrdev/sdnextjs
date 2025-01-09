import { useRouter } from 'next/router';
import DistributorList from '../../components/FilmData/QuickLinks/ByDistributors/DistributorList';
import DistributorSearch from '../../components/FilmData/QuickLinks/ByDistributors/DistributorSearch';
import DistributorDetail from '../../components/FilmData/QuickLinks/ByDistributors/DistributorDetail';
import HeadComponent from '../../components/HeadComponent';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'by-distributors');
  const SEOdata = await res.json();

  // by distributor page static data
  let ByDistributorsData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/by-distributors.php/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  ByDistributorsData = await ByDistributorsData.json();

  return { props: { SEOdata, ByDistributorsData } };
}

const ByDistributors = ({ SEOdata, ByDistributorsData }) => {
  const router = useRouter();
  const id = router.query.distributors || '';
  if (id !== '') {
    // console.log(id);
    return <DistributorDetail seoData={SEOdata} />;
  }

  return (
    <>
      <HeadComponent data={SEOdata} />
      <section className='distributerinfo'>
        <div className='container'>
          <section className='disctcalander_srch'>
            <div className='container'>
              <DistributorSearch text={ByDistributorsData.content} />
              <div className='disctclnd_selectlist'>
                <div className='top_txt'>
                  <h3>
                    Select Distributor From List <i className='fal fa-angle-right'></i>
                  </h3>
                </div>
                <DistributorList data={ByDistributorsData.by_distributors} />
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default ByDistributors;
