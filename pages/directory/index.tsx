import { useState, useEffect, use } from 'react';

//components
import Banner from '../../components/Directory/Banner';
import Distributors from '../../components/Directory/Distributors';
import Exhibitors from '../../components/Directory/Exhibitors';
import Vendors from '../../components/Directory/Vendors';
import RecentUpdates from '../../components/Directory/RecentUpdates';
import AddListing from '../../components/Directory/ListingPages/AddListing';
import Counter from '../../components/Products/Counter';
import Listingsearch from '../../components/Directory/Listingsearch';
import FeaturedList from '../../components/Directory/FeaturedList';
import Faq from '../../components/Faq/Faq';
import Stillquery from '@/components/Faq/Stillquery';
import HeadComponent from '@/components/HeadComponent';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';
import { ErrorDisplay } from '@/components/ErrorBoundary';
import { motion } from 'motion/react';
import { FadeinUp } from '@/components/Anim/FadeinUp';
import { DirectoryData } from '@/types/directory';
import Loader from '@/components/Loader';
import AdPlaceholder from '@/components/Homepage/AdPlaceholder';

interface DirectoryPageProps {
  SEOdata: any;
  directoryData: DirectoryData;
  error?: any;
}

export const getStaticProps = async () => {
  const fetchConfigs = [
    {
      url: `${process.env.NEXT_PUBLIC_SEO_LINK}directory`,
      key: 'SEOdata',
      defaultData: {},
    },
    {
      url: `${process.env.NEXT_PUBLIC_SD_API}/directory/directory_list.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
      key: 'directoryData',
      defaultData: {},
    },
  ];

  return await getStaticPropsWithErrorHandling(fetchConfigs);
};

const DirectoryPage: React.FC<DirectoryPageProps> = ({ SEOdata, directoryData, error }) => {
  const [HideLoader, setHideLoader] = useState<boolean>(true);
  const [DirectoryData, setDirectoryData] = useState<DirectoryData>(directoryData || {}); // Initialize with prop value
  /*console.log('directoryData', directoryData);*/

  const getDirectoryData = async () => {
    let data = null;
    setHideLoader(false);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SD_API + '/directory/directory_list.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
      data = await response.json();
      if (data) {
        setDirectoryData(data); // Only set state if data is not null
      }
      /*console.log('Fetched directory data:', data);*/
    } catch (error) {
      console.error('Error fetching directory data:', error);
    } finally {
      setHideLoader(true);
      if (!data || Object.keys(data).length === 0) {
        return <ErrorDisplay error={error} />;
      }
    }
  };

  useEffect(() => {
    if (!directoryData || Object.keys(directoryData).length === 0) {
      getDirectoryData();
    }
  }, [directoryData]);

  // if (error) {
  //   return <ErrorDisplay error={error} />;
  // }
  const [ToggleState, setToggleState] = useState<number>(1);
  const toggleTab = (index: number): void => setToggleState(index);
  const getActiveClass = (index: number, className: string): string => (ToggleState === index ? className : '');
  const distabs: string[] = ['distributors', 'exhibitors & theatres ', 'vendors', 'film festivals'];

  return (
    <>
      {directoryData ? (
        <div>
          <HeadComponent data={SEOdata} />
          {/* Ad Placement - After Header */}
          <AdPlaceholder
            variant="fullwidth"
            id="directory-ad-1"
            sectionClass="directory-ad-section py-6"
          />
          <Banner data={DirectoryData} />
          <div className='dircounter my-5'>
            <Counter data={DirectoryData.directory_count} requestFrom='directory' />
          </div>
          <Listingsearch data={DirectoryData.search_data} />
          {/* Ad Placement - After Search */}
          <AdPlaceholder
            variant="fullwidth"
            id="directory-ad-2"
            sectionClass="directory-ad-section py-6"
          />

          <div className='sepor'>
            <div className='container'>
              <motion.div variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} className='border-b border-gray-300 pt-2 text-center h-7 mb-7'>
                <span className='bg-white uppercase -mb-1 inline-block mx-auto p-2 font-bold'>Or</span>
              </motion.div>
            </div>
          </div>
          {DirectoryData?.exhibitors && (
            <div className='distrbcat pt-4 md:pt-6 lg:pt-8 relative'>
              <div className='container'>
                <motion.div variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} className='top_txt text-center'>
                  <h2 className='mb-4 leading-normal'>Browse by Category</h2>
                  {/* <p className='max-w-2xl mx-auto'>Scan all listings by category. We have listings for Distributors, Theatres, Exhibitors, Vendors and Film Festivals.</p> */}
                </motion.div>
              </div>
              <motion.div variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} className='container sticky top-0 z-10 bg-white'>
                <ul className='distinfo_tab flex justify-center flex-wrap list-none border-t border-b border-gray-300 ml-0 -mb-16 sm:-mb-7'>
                  {distabs?.map((item, i) => (
                    <li
                      className={`tabs px-4 md:px-8 py-1 sm:py-2 font-bold cursor-pointer capitalize text-lg hover:bg-orange-200 [&.active-tabs]:bg-gold ${getActiveClass(i + 1, 'active-tabs')}`}
                      onClick={() => toggleTab(i + 1)}
                      key={i}>
                      <a href={'#' + item} className='text-black hover:text-black'>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.section
                variants={FadeinUp}
                initial='init'
                whileInView='anim'
                viewport={{ once: true }}
                className={`msnlisting_box hidden [&.active-content]:block [&.active-content]:pt-20 sm:[&.active-content]:pt-14 distribiter_listbox ${getActiveClass(1, 'active-content')}`}
                id='distributors'>
                <Distributors data={DirectoryData?.distributors} />
              </motion.section>
              <section
                className={`msnlisting_box hidden [&.active-content]:block [&.active-content]:pt-20 sm:[&.active-content]:pt-14 exhibitors_listbox ${getActiveClass(2, 'active-content')}`}
                id='exhibitors'>
                <Exhibitors data={DirectoryData?.exhibitors} />
              </section>
              <section
                className={`msnlisting_box hidden [&.active-content]:block [&.active-content]:pt-20 sm:[&.active-content]:pt-14 vander_listbox ${getActiveClass(3, 'active-content')}`}
                id='vendors'>
                <Vendors data={DirectoryData?.vendor} tag='vendors' />
              </section>

              <section
                className={`msnlisting_box hidden [&.active-content]:block [&.active-content]:pt-20 sm:[&.active-content]:pt-14 filmfestival_listbox ${getActiveClass(4, 'active-content')}`}
                id='film festivals'>
                <Vendors data={DirectoryData?.film_festival} tag='filmfestival' />
              </section>
            </div>
          )}
          <motion.section variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} className='distsponser_btm directory_recentview recentupdate' id='directory_recent_sec'>
            <RecentUpdates data={DirectoryData?.recent_post} tag='recent_post' />
          </motion.section>

          <motion.section variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} className='distsponser_btm directory_recentview recentupdate' id='directory_recent_view'>
            <RecentUpdates data={DirectoryData?.recent_view?.data} tag='recent_view' />
          </motion.section>
          <motion.section variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} className='unvisable_business bg-gold-yellow'>
            <AddListing />
          </motion.section>
          <FeaturedList data={DirectoryData?.featured_list} />
          <motion.section variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} className='unvisable_business bg-gold-yellow'>
            <AddListing />
          </motion.section>

          {/* Ad Placement - After Recent Posts */}
          <AdPlaceholder
            variant="fullwidth"
            id="directory-ad-3"
            minHeight="450px"
            sectionClass="directory-ad-section py-6"
          />
          <Faq data={DirectoryData?.faqs} center />
          <motion.div variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} className='stillq'>
            <div className='container'>
              <Stillquery nopro />
            </div>
          </motion.div>

          {/* Ad Placement - After FAQ */}
          <AdPlaceholder
            variant="fullwidth"
            id="directory-ad-4"
            sectionClass="directory-ad-section py-6"
          />
        </div>
      ) : (
        <div className='pvr' style={{ minHeight: 400 }}>
          <Loader />
        </div>
      )}
    </>
  );
};

export default DirectoryPage;
