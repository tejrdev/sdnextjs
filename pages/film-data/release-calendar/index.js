import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import Loader from '../../../components/Loader';
import CategoryNavigation from '../../../components/FilmData/DetailPages/CategoryNavigation';

import Intro from '../../../components/FilmData/DetailPages/Intro';
// import '../detail.css';
import HomePageAds from '../../../components/Homepage/HomePageAds';
const $ = require('jquery');
const tdStyle = {
  border: '1px solid rgb(197, 197, 197)',
  borderCollapse: 'collapse',
  padding: '6px',
};

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'film-data/release-calendar');
  const data = await res.json();

  // release calander static data
  let ReleaseCalendarData = await fetch(
    process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/release-calendar.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  ReleaseCalendarData = await ReleaseCalendarData.json();

  return {
    props: { data, ReleaseCalendarData },
    revalidate: 10, // In seconds
  };
}

const ReleaseCalendar = ({ data, ReleaseCalendarData }) => {
  //const [ReleaseCalendarDataLoaded, setReleaseCalendarDataLoaded] = useState(false);
  //const [ReleaseCalendarData, setReleaseCalendarData] = useState([]);

  useEffect(() => {
    //loadDetailPageData();
    /*table css*/
    $('table.dataTable').each(function () {
      var trcount = $(this).find('thead tr').length;
      //console.log(trcount);
      if (trcount > 1) {
        $(this).addClass('twotblhead');
      }
    });

    $(' .responsive ,.responsive tr th , .responsive tr td').css({
      border: '1px solid #c5c5c5',
      'border-collapse': 'collapse',
      padding: '6px',
    });
    $('.dataTables_info').css({ display: 'none' });
    $('.printhide').css({ visibility: 'hidden', height: '0', overflow: 'hidden' });

    $('.dataTable').wrap('<div class="datatable_wrap"/>');

    /*!data table*/
  }, []);

  // const loadDetailPageData = () => {
  //   axios
  //     .get(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/release-calendar.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
  //     .then((res) => {
  //       setReleaseCalendarData(res.data);
  //       setReleaseCalendarDataLoaded(true);
  //     })
  //     .catch((err) => console.log(err));
  // };

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
      <CategoryNavigation />
      {/*ReleaseCalendarDataLoaded ? (*/
        <>
          <section className="studiorscal">
            <div className="container">
              <div className="sturscal_inner printarea" id="s_calender_weekdata">
                <div className="top_txt">
                  <Intro title={ReleaseCalendarData.title} content={ReleaseCalendarData.content} />
                  <div className="downloadbtn">
                    <span className="pritbtn">Print</span>
                  </div>
                </div>

                {ReleaseCalendarData.release_schedule &&
                  ReleaseCalendarData.release_schedule.map((item, index) => {
                    return (
                      <div className="stuweektable" key={index}>
                        <div className="tbletop">
                          <h2 className="h4">{item.title}</h2>
                          <table className="stucal_info responsive dataTable" style={{ tdStyle }}>
                            <tbody>
                              {item.data.length ? (
                                item.data.map((trData, id) => {
                                  return (
                                    <tr key={id}>
                                      <td style={{ tdStyle }}>
                                        <h3><a title={trData.f_title} href={trData.f_title_link}>
                                          {trData.f_title}
                                        </a>{' '}
                                        {trData.f_dis_name && '(' + trData.f_dis_name + ')'}</h3>
                                      </td>
                                      <td style={{ tdStyle }}>{trData.rating}</td>
                                      <td style={{ tdStyle }}>{trData.runtime}</td>
                                      <td style={{ tdStyle }}>
                                        <strong>{trData.dist_pattern}</strong>
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <div className="no_data_film">No film data available on this week</div>
                              )}
                              {/*item.data.map((trData, id) => {
                                return (
                                  <tr key={id}>
                                    <td style={{ tdStyle }}>
                                      <a title={trData.f_title} href={trData.f_title_link}>
                                        {trData.f_title}
                                      </a>{' '}
                                      {trData.f_dis_name && '(' + trData.f_dis_name + ')'}
                                    </td>
                                    <td style={{ tdStyle }}>{trData.rating}</td>
                                    <td style={{ tdStyle }}>{trData.runtime}</td>
                                    <td style={{ tdStyle }}>
                                      <strong>{trData.dist_pattern}</strong>
                                    </td>
                                  </tr>
                                );
                              })*/}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <HomePageAds cls="ads_970" format="horizontal" />
            </div>
          </section>
        </>
      /*) : (
        <Loader />
      )*/}
    </>
  );
};

export default ReleaseCalendar;
