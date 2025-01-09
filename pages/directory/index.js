import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

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
import MenuNavigation from '../../components/Directory/ListingPages/MenuNavigation';
import HeadComponent from '@/components/HeadComponent';

const $ = require('jquery');

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'directory');
  const SEOdata = await res.json();

  // Directory page static data
  //process.env.NEXT_PUBLIC_SD_API + '/directory/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  let directoryData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/directory/directory_list.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  directoryData = await directoryData.json();

  return {
    props: { SEOdata, directoryData },
    revalidate: 10, // In seconds
  };
}

function Index({ SEOdata, directoryData }) {
  const [ToggleState, setToggleState] = useState(1);
  const toggleTab = (index) => setToggleState(index);
  const getActiveClass = (index, className) => (ToggleState === index ? className : '');
  const distabs = ['distributors', 'exhibitors & theatres ', 'vendors', 'film festivals'];

  return (
    <div>
      <HeadComponent data={SEOdata} />
      <MenuNavigation />
      <Banner data={directoryData} />
      <div className='dircounter my-5'>
        <Counter data={directoryData.directory_count} requestFrom='directory' />
      </div>
      <Listingsearch data={directoryData.search_data} />
      <div className='sepor'>
        <div className='container'>
          <div className='border-b border-gray-300 pt-2 text-center h-7 mb-7'>
            <span className='bg-white uppercase -mb-1 inline-block mx-auto p-2 font-bold'>Or</span>
          </div>
        </div>
      </div>
      <div className='distrbcat pt-4 md:pt-6 lg:pt-8 relative'>
        <div className='container'>
          <div className='top_txt text-center'>
            <h2 className='mb-4 leading-normal'>Browse by Category</h2>
            {/* <p className='max-w-2xl mx-auto'>Scan all listings by category. We have listings for Distributors, Theatres, Exhibitors, Vendors and Film Festivals.</p> */}
          </div>
        </div>
        <div className='container sticky top-0 z-10 bg-white'>
          <ul className='distinfo_tab flex justify-center flex-wrap list-none border-t border-b border-gray-300 ml-0 -mb-16 sm:-mb-7'>
            {distabs?.map((item, i) => (
              <li className={`tabs px-4 md:px-8 py-1 sm:py-2 font-bold cursor-pointer capitalize text-lg hover:bg-orange-200 [&.active-tabs]:bg-gold ${getActiveClass(i + 1, 'active-tabs')}`} onClick={() => toggleTab(i + 1)} key={i}>
                <a href={'#' + item} className='text-black hover:text-black'>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <section className={`msnlisting_box hidden [&.active-content]:block [&.active-content]:pt-20 sm:[&.active-content]:pt-14 distribiter_listbox ${getActiveClass(1, 'active-content')}`} id='distributors'>
          <Distributors data={directoryData.distributors} />
        </section>
        <section className={`msnlisting_box hidden [&.active-content]:block [&.active-content]:pt-20 sm:[&.active-content]:pt-14 exhibitors_listbox ${getActiveClass(2, 'active-content')}`} id='exhibitors'>
          <Exhibitors data={directoryData.exhibitors} />
        </section>
        <section className={`msnlisting_box hidden [&.active-content]:block [&.active-content]:pt-20 sm:[&.active-content]:pt-14 vander_listbox ${getActiveClass(3, 'active-content')}`} id='vendors'>
          <Vendors data={directoryData.vendor} tag='vendors' />
        </section>

        <section className={`msnlisting_box hidden [&.active-content]:block [&.active-content]:pt-20 sm:[&.active-content]:pt-14 filmfestival_listbox ${getActiveClass(4, 'active-content')}`} id='film festivals'>
          <Vendors data={directoryData.film_festival} tag='filmfestival' />
        </section>
      </div>
      <section className='distsponser_btm directory_recentview recentupdate' id='directory_recent_sec'>
        <RecentUpdates data={directoryData.recent_post} tag='recent_post' />
      </section>

      <section className='distsponser_btm directory_recentview ' id='directory_recentview'>
        <RecentUpdates data={directoryData.recent_view.data} tag='recent_view' />
      </section>
      <section className='unvisable_business bg-gold-yellow'>
        <AddListing />
      </section>
      <FeaturedList data={directoryData.featured_list} />
      <section className='unvisable_business bg-gold-yellow'>
        <AddListing />
      </section>
      <Faq data={directoryData.faqs} center />
      <div className='stillq'>
        <div className='container'>
          <Stillquery nopro />
        </div>
      </div>
    </div>
  );
}

export default Index;
