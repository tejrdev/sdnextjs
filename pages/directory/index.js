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

// import './directory.css';
import Loader from '../../components/Loader';

const $ = require('jquery');

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'directory');
  const data = await res.json();

  // Directory page static data
  let directoryData = await fetch(
    process.env.NEXT_PUBLIC_SD_API + '/directory/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  directoryData = await directoryData.json();

  return {
    props: { data, directoryData },
    revalidate: 10, // In seconds
  };
}

function Index({ data , directoryData }) {
  //data
  // const [directoryDataLoaded, setDirectoryDataLoaded] = useState(false);
  // const [directoryData, setDirectoryData] = useState([]);

  useEffect(() => {
    //loadDirectoryData();
    //loadSEOTags();
    $('.nexttoscroll a[href*="#"]').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - 30 }, 500, 'linear');
    });
  }, []);

  // const loadDirectoryData = () => {
  //   axios
  //     .get(process.env.NEXT_PUBLIC_SD_API + '/directory/?api_token=' + process.env.NEXT_PUBLICIC_API_TOKEN)
  //     .then((res) => {
  //       setDirectoryData(res.data);
  //       setDirectoryDataLoaded(true);
  //     })
  //     .catch((err) => console.log(err));
  // };
  return (
    <div>
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
          <Banner data={directoryData} />
          <div className="nexttoscroll ">
            <div className="down_arrow">
              <a href="#distribiter_listbox_data" className="nexttoarrow df fww" title="Click here">
                {' '}
                <i className="far fa-arrow-down"></i>{' '}
              </a>
            </div>
          </div>
          <section className="msnlisting_box distribiter_listbox" id="distribiter_listbox_data">
            <Distributors data={directoryData.page_content.Distributors} />
          </section>
          <section className="msnlisting_box exhibitors_listbox" id="exhibitors_listbox_data">
            <Exhibitors data={directoryData.page_content.Exhibitors} />
          </section>
          <section className="msnlisting_box vander_listbox" id="vander_listbox_data">
            <Vendors data={directoryData.page_content.Vendor} tag="vendors" />
          </section>

          <section className="msnlisting_box filmfestival_listbox" id="filmfestival_listbox_data">
            <Vendors data={directoryData.page_content.film_festival} tag="filmfestival" />
          </section>
          <section className="distsponser_btm directory_recentview recentupdate" id="directory_recent_sec">
            <RecentUpdates data={directoryData.page_content.recent_post} tag="recent_post" />
          </section>

          <section className="distsponser_btm directory_recentview " id="directory_recentview">
            <RecentUpdates data={directoryData.page_content.recent_view} tag="recent_view" />
          </section>
          {/* <section className="unvisable_business">
            <AddListing />
          </section> */}
        </>
      
    </div>
  );
}

export default Index;
