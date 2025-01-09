import axios from 'axios';
import { useState, useEffect, useLayoutEffect } from 'react';
import Head from 'next/head';
import Loader from '@/components/Loader';
import { useRouter } from 'next/router';
import Boxofficetitle from '@/components/FilmData/DetailPages/BoxOfficeResults/Boxofficetitle';


export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'film-data/box-office-results');
  const data = await res.json();

  const BOFilter = await fetch(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/filter_ymw.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&boxoffice_page=true');
  const BOFilterData = await BOFilter.json();

  const BoxOffice = await fetch(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/boxoffice_page.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&boxoffice_result=true');
  const BoxOfficeLoadedData = await BoxOffice.json();

  return {
    props: { data, BOFilterData, BoxOfficeLoadedData },
    revalidate: 10, // In seconds
  };
}
interface Props {
  data: {
    children?: any[] | undefined
  };
  BOFilterData: {};
  BoxOfficeLoadedData: {
    year: string,
    week: string, 
  };
};
type boxoffice_data_weekly = {
  title: string,
  permalink: string,
  distributor_name: string,
  distributor_link: string,
  rating: string,
  weekly_total: number,
  weekend_total: number,
  weekly_gross?: number | null,
  week?: number,
  weekly_gross_change?: number | undefined,
  locations?: string,
  locations_change?: number | undefined,
  per_theater_avg?: number
};

interface BoxOfficeData {
  boxoffice_data?: any[],
  film_data?: any[],
  boxoffice_data_weekly?: boxoffice_data_weekly,
  event_data?: any[],
  year?: string,
  week?: string
}



const BoxOfficeResultsv2 = (props: Props) => {
  const { data, BOFilterData, BoxOfficeLoadedData } = props;
  const router = useRouter();
  const { yyyy, ww } = router.query;
  const year = yyyy ? parseInt(yyyy as string, 10) : null;
  const weekNumber = ww ? parseInt(ww as string, 10) : null;

  const [BoxOfficeFilter_data, setBoxOfficeFilter_data] = useState<boolean>(true);
  const [BoxOfficeData, setBoxOfficeData] = useState<BoxOfficeData>(BoxOfficeLoadedData);
  const [toggleon, setToggleon] = useState(false);
  const currentyear = parseInt(BoxOfficeLoadedData.year);
  const currentWeek = parseInt(BoxOfficeLoadedData.week);
  const togglehandle = () => setToggleon(!toggleon);
  const filmdata = BoxOfficeData.boxoffice_data ? BoxOfficeData.boxoffice_data : BoxOfficeData.film_data;
  const tdStyle: React.CSSProperties = {
    border: '1px solid rgb(197, 197, 197)',
    borderCollapse: 'collapse',
    padding: '6px',
  };
  let num_w = 0;
  let num_w_ly = 0;
  //const data_weekly = filmdata;
  const [receivedyear, setReceivedyear] = useState<number>();
  const [weekupdate, setWeekupdate] = useState<string>();
  let data_weekly: any[];

  if (Array.isArray(BoxOfficeData.boxoffice_data_weekly)) {
    data_weekly = BoxOfficeData.boxoffice_data_weekly;
  } else {
    data_weekly = [];
  }

  const newweekinfo = (currentyear: number, weekselect: string) => {
    /* setReceivedMonth(currentMonth); */
    setReceivedyear(currentyear);
    /* setReceivedweek(currentweeks); */
    if (weekselect !== undefined && weekNumber !== null) {
      setWeekupdate(weekselect);
      router.push(router.pathname);
      console.log(receivedyear, weekupdate, currentyear, weekselect);
    }
  }


  const loadFilterData = (a_year: number | string, a_week: string | null) => {
    setBoxOfficeFilter_data(false);
    if (typeof a_week === 'undefined' || a_week === null || a_week === '') { a_week = ''; }
    if (typeof a_year === 'undefined' || a_year === null || a_year === '') { a_year = ''; }

    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/boxoffice_page.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&boxoffice_result=true&a_year=' + a_year + '&a_week=' + a_week)
      .then((res) => {
        setBoxOfficeFilter_data(true);
        setBoxOfficeData(res.data);
      })
      .catch((err) => console.log(err));
    console.log(a_year, a_week)
  };
  useEffect(() => {
    if (weekupdate !== '') loadFilterData(receivedyear as number, weekupdate as string);
    console.log(receivedyear, weekupdate)

    /* console.log(weekupdate, weekNumber) */
  }, [weekupdate]);

  /* useEffect(() => {
     function sd_getUrlParameter(sParam) {
      var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
          return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
      }
      return false;
    }

    const year = sd_getUrlParameter('yyyy') ? parseInt(sd_getUrlParameter('yyyy'), 10) : "null";
    const month = sd_getUrlParameter('mm') ? parseInt(sd_getUrlParameter('mm'), 10) : "null";
    const weekNumber = sd_getUrlParameter('ww') ? parseInt(sd_getUrlParameter('ww'), 10) : "null"; 
  }, []); */
  /* useEffect(() => {
    setReceivedyear(year);
    setWeekupdate(weekNumber);
  }, []); */

  return (
    <>
      <Head>
        {data.children && data.children.length > 0 && data.children[0].children.map((item: any, index: number) => {
          const attributes = item.tag.toUpperCase();

          switch (attributes) {
            case 'TITLE':
              return <title key={index}>{item.html}</title>;
            case 'META':
              const name = item.name || '';
              if (name !== '') {
                return <meta key={index} name={item.name} content={item.content} />;
              } else {
                return <meta key={index} property={item.property} content={item.content} />;
              }
            case 'LINK':
              return <link key={index} rel={item.rel} href={item.href} />;
            case 'SCRIPT':
              return (
                <script key={index} type={item.type} className={item.class}>
                  {item.html}
                </script>
              );
            default:
              return null;
          }
        })}
      </Head>
      {/* {console.log(BOFilterData)} */}
      <div className={"boxofresult"}>
        {/* <Boxofficetitle title={'Box Office Results'} newselect={newweekinfo} urlyear={year} urlweek={weekNumber}  defYear={currentyear} defWeek={currentWeek} /> */}
        {/* {console.log(year, weekNumber)} */}
        {BoxOfficeFilter_data ? (
          <>
            <div className="eventweekinfo">
              <div className="container">
                <div className="eventweekinfoin df fww">
                  <h4 className="displayinline">Events This Week: </h4>
                  <ul className="df fww" id="event_data">
                    {BoxOfficeData.event_data &&
                      BoxOfficeData.event_data.map((item, index) => {
                        return (
                          <li className="df fww" key={index}>
                            <div className="event_thumb">
                              {item.img && <img src={item.img} alt={item.title} />}
                            </div>
                            <div className="event_title">
                              <a href={item.link} target="_blank" className='blktxt'>
                                <span dangerouslySetInnerHTML={{ __html: item.title }}></span>
                                <time>{' ' + item.event_date}</time>
                              </a>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="boxresulinfo">
              <div className="container">
                <div className="boxresultable">
                  <div className="boxtableswich">
                    <ul className={"daystype df fww " + (toggleon ? "off" : "")}>
                      <li className="tab_items active" data-title="Weekend" id="weekend_colection_data">Weekend Totals</li>
                      <li className={"togglebtn " + (toggleon ? "off" : "")} onClick={togglehandle}><div className="togglehandel"></div></li>
                      <li className="tab_items" data-title="Weekly" id="weekely_colection_data">Weekly Totals</li>
                    </ul>
                  </div>
                  <div className={"Weekendbox filter_tabsinfo sturelease_table " + (toggleon ? "hide" : "active")} data-title="Weekend">
                    <div className="result_table tablebox" id="Weekendbox_data">
                      <div className="datatable_wrap">
                        <table className="responsive dataTable box-office-res-tbl" id="box-office-res-weekend-tbl">
                          <thead>
                            <tr>
                              <th data-title="Rank">Rank</th>
                              <th data-title="Title">Title</th>
                              <th data-title="Distributor">Distributor</th>
                              <th data-title="Week">Week</th>
                              <th data-title="Rating">Rating</th>
                              <th data-title="#">#</th>
                              <th data-title="+-LW">+-LW</th>
                              <th data-title="Weekend $"> Weekend $</th>
                              <th data-title="+-LW">+-LW</th>
                              <th data-title=" Per Theatre $"> Per Theatre $</th>
                              <th data-title="Total $ To-Date">Total $ To-Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filmdata?.length ? filmdata.map((item, index) => {
                              if (item.weekend_gross_order >= 1) {
                                num_w = num_w + 1;
                                return (
                                  <tr id={`row-${index + 1}`} className={`box-office-res-row ${index % 2 === 0 ? 'even' : 'odd'}`} role="row" key={num_w}>
                                    <td data-title="Rank" style={tdStyle}>
                                      {num_w}
                                    </td>
                                    <td data-title="Title" style={tdStyle}>
                                      <h2 className="movtable_title"><a href={item.permalink}>
                                        <strong>{item.title}</strong>
                                      </a></h2>
                                    </td>
                                    <td data-title="Distributor" style={tdStyle}>
                                      <a href={item.distributor_link}>
                                        <strong>{item.distributor_name}</strong>
                                      </a>
                                    </td>
                                    <td data-title="Week" style={tdStyle}>
                                      {item.week}
                                    </td>
                                    <td data-title="Rating" style={tdStyle}>
                                      {item.rating}
                                    </td>
                                    <td data-title="Locations #" style={tdStyle}>
                                      {item.locations && item.locations.toLocaleString()}
                                    </td>
                                    <td data-title="Locations +-LW" style={tdStyle} className={item.locations_change < 0 ? 'redtxt' : ""}>
                                      {item.locations_change === 0 ? '-' : item.locations_change}
                                    </td>
                                    <td data-title="Weekend $" style={tdStyle}>
                                      ${item.weekend_gross && item.weekend_gross.toLocaleString()}
                                    </td>
                                    <td data-title="+-LW" style={tdStyle} className={item.weekend_gross_change < 0 ? 'redtxt' : ""}>
                                      {item.weekend_gross_change && parseFloat(item.weekend_gross_change).toFixed(1)} %{' '}
                                    </td>
                                    <td data-title="Per theatre Average $" style={tdStyle}>
                                      ${item.per_theater_avg && Math.round(item.per_theater_avg).toLocaleString()}
                                    </td>
                                    <td data-title="Total $" style={tdStyle}>
                                      ${item.weekend_total && (item.weekend_total.toLocaleString("en-US"))}
                                    </td>
                                  </tr>
                                );
                              }
                            }) : <tr className="text-center" ><td colSpan={11}><strong style={{ fontSize: 22 }}>Data not available for this time period.
                            </strong></td></tr>}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className={"Weekly filter_tabsinfo sturelease_grid " + (toggleon ? "active" : "hide")} data-title="Weekly">
                    <div className="result_table tablebox" id="Weekly_box_html">
                      <div className="datatable_wrap">
                        <table className="responsive dataTable box-office-res-tbl" id="box-office-res-weekly-tbl">
                          <thead>
                            <tr>
                              <th data-title="Rank">Rank</th>
                              <th data-title="Title">Title</th>
                              <th data-title="Distributor">Distributor</th>
                              <th data-title="Week">Week</th>
                              <th data-title="Rating">Rating</th>
                              <th data-title="#">#</th>
                              <th data-title="+-LW">+-LW</th>
                              <th data-title="weekly $">Weekly $</th>
                              <th data-title="+-LW">+-LW</th>
                              <th data-title="Per Theatre $"> Per Theatre $</th>
                              <th data-title="Total $ To-Date">Total $ To-Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data_weekly?.length ? data_weekly.map((item: boxoffice_data_weekly, index: number) => {

                              if (item.weekly_gross) {
                                num_w_ly = num_w_ly + 1;
                                return (
                                  <tr id={`row-${index + 1}`} className={`box-office-res-row ${index % 2 === 0 ? 'even' : 'odd'}`} role="row" key={index}>
                                    <td data-title="Rank" style={tdStyle}>
                                      {num_w_ly}
                                    </td>
                                    <td data-title="Title" style={tdStyle}>
                                      <h2 className="movtable_title"><a href={item.permalink}>
                                        <strong>{item.title}</strong>
                                      </a></h2>
                                    </td>
                                    <td data-title="Distributor" style={tdStyle}>
                                      <a href={item.distributor_link}>
                                        <strong>{item.distributor_name}</strong>
                                      </a>
                                    </td>
                                    <td data-title="Week" style={tdStyle}>
                                      {item.week}
                                    </td>
                                    <td data-title="Rating" style={tdStyle}>
                                      {item.rating}
                                    </td>
                                    <td data-title="Locations #" style={tdStyle}>
                                      {item.locations && item.locations.toLocaleString()}
                                    </td>
                                    <td data-title="Locations +-LW" style={tdStyle} className={item?.locations_change !== undefined && item.locations_change < 0 ? 'redtxt' : ""}>
                                      {item.locations_change === 0 ? '-' : item.locations_change}
                                    </td>
                                    <td data-title="weekly $" style={tdStyle}>
                                      ${item.weekly_gross && item.weekly_gross.toLocaleString()}{' '}
                                    </td>
                                    <td data-title="+-LW" style={tdStyle} className={item?.weekly_gross_change !== undefined && item.weekly_gross_change < 0 ? 'redtxt' : ""}>
                                      {' '}
                                      {/* {item.weekly_gross_change && parseFloat(item.weekly_gross_change).toFixed(1)} %{' '} */}
                                      {item?.weekly_gross_change !== undefined ? item.weekly_gross_change.toFixed(1) + '%' : ''}
                                    </td>
                                    <td data-title="Per theatre Average $" style={tdStyle}>
                                      {' '}
                                      ${item.per_theater_avg && Math.round(item.per_theater_avg).toLocaleString()}{' '}
                                    </td>
                                    <td data-title="Total $" style={tdStyle}>
                                      {' '}
                                      ${item.weekly_total && item.weekly_total.toLocaleString()}{' '}
                                    </td>
                                  </tr>
                                );
                              }
                            }) : <tr className="text-center" ><td colSpan={11}><strong style={{ fontSize: 22 }}>Data not available for this time period.
                            </strong></td></tr>}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) :
          <div className="pvr container" style={{ marginBottom: 40 }}>
            <div className="lodarhight"><Loader /></div>
          </div>}
      </div >
    </>
  )
}

export default BoxOfficeResultsv2