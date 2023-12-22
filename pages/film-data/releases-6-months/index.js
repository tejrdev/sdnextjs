import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Loader from '../../../components/Loader';

import NavLinks from '../../../components/FilmData/QuickLinks/6-weeks/NavLinks';
import PosterDiv from '../../../components/FilmData/QuickLinks/6-weeks/PosterDiv';
import TableDiv from '../../../components/FilmData/QuickLinks/6-weeks/TableDiv';

const $ = require('jquery');

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'film-data/releases-6-months');
  const data = await res.json();

  // static data
  let SixMonthsData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/6_week_month.php?page_design=month&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  SixMonthsData = await SixMonthsData.json();

  //console.log(ThreeDData);

  return {
    props: { data, SixMonthsData },
    revalidate: 10, // In seconds
  };
}

const SixMonths = ({ data, SixMonthsData}) => {
  //const [SixMonthsDataLoaded, setSixMonthsDataLoaded] = useState(false);
  //const [SixMonthsData, setSixMonthsData] = useState([]);

  useEffect(() => {
    $('.toggle_posttab ul li').click(function () {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
    });

    $('.tab_items').click(function () {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
      var tabtitle = $(this).data('title');
      var tabinfotitle = $(this).data('title');
      $('.filter_tabsinfo').hide();
      if ((tabtitle = tabinfotitle)) {
        $('.filter_tabsinfo[data-title="' + tabinfotitle + '"]').show();
      }
    });
  }, []);

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
      {SixMonthsData ? (
        <div className="postertables">
          <div className="container">
            <div className="top_txt df fww just-between">
              <h2>{SixMonthsData.title}</h2>
              <div className="toggle_posttab text-center">
                <small>Switch View</small>
                <ul className="df fww">
                  <li className="active tab_items" data-title="Poster">
                    Poster
                  </li>
                  <li className="tab_items" data-title="table">
                    table
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="postertabvisual filter_tabsinfo" data-title="Poster">
            <NavLinks data={SixMonthsData.menu_section} />
            {SixMonthsData.data_posts.map((item, index) => {
              return (
                <section className="rc_weeksblock toplinesec" id={'weeknav' + (index + 1)}>
                  <PosterDiv data={item} />
                </section>
              );
            })}
          </div>
          <div className="postertabvisual filter_tabsinfo" data-title="table">
            <NavLinks data={SixMonthsData.menu_section} />
            {SixMonthsData.data_posts.map((item, index) => {
              return (
                <section className="weekbytable" id={'weeknavtable' + (index + 1)} key={index}>
                  <TableDiv data={item} />
                </section>
              );
            })}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default SixMonths;
