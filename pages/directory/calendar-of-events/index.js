import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import Loader from '../../../components/Loader';
import HomePageAds from '../../../components/Homepage/HomePageAds';
import MenuNavigation from '../../../components/Directory/ListingPages/MenuNavigation';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'directory/calendar-of-events');
  const data = await res.json();

  // calander page static data
  let calendarData_api = await fetch(
   process.env.NEXT_PUBLIC_SD_API + '/directory_calendar_of_events/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&year=' + currentYear + '&month=' + currentMonthnum
  );
  calendarData_api = await calendarData_api.json();

  return {
    props: { data, calendarData_api },
    revalidate: 10, // In seconds
  };
}

const $ = require('jquery');
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.toLocaleString('default', { month: 'short' });
const currentMonthnum = today.getMonth() + 1;

const CalendarOfEvents = ({ data, calendarData_api }) => {
  // const [calendarDataLoaded, setCalendarDataLoaded] = useState(false);
   const [calendarData, setCalendarData] = useState(calendarData_api);
  const [calendarYear, setcalendarYear] = useState(currentYear);
  const [calendarMonth, setcalendarMonth] = useState(currentMonthnum);
  const [HideLoader, setHideLoader] = useState(false);

  useEffect(() => {
    loadCalendarData(calendarMonth, calendarYear);
    //console.log(calendarMonth ,calendarYear)
  }, [calendarMonth]);

  const loadCalendarData = (month, year) => {
    setHideLoader(false);
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/directory_calendar_of_events/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&year=' + year + '&month=' + month)
      .then((res) => {
         setCalendarData(res.data);
        // setCalendarDataLoaded(true);
        setHideLoader(true);
      })
      .catch((err) => console.log(err));
  };

  const MonthClicked = (e) => {
    const currMonth = parseInt(e.target.attributes['data-month'].value);
    setcalendarMonth(currMonth);
    $('.rsf_qutermonth li').removeClass('active');
    $(e.target).parent().addClass('active');
    loadCalendarData(currMonth, calendarYear);
    
  };
  const YearClicked = (e) => {
    const currYear = parseInt(e.target.attributes['data-year'].value);
    setcalendarYear(currYear);
    $('.rsf_years li').removeClass('active');
    $(e.target).parent().addClass('active');
    loadCalendarData(calendarMonth, currYear);
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
      <MenuNavigation />
  
                {//console.log(calendarData.all_events_data[0].event_datas)
                }
      
        <section className="calander_filter subfilmy printarea">
          <div className="container">
            <div className="info_block">
              <div className="top_txt middletitle_print">
                <div className="top_info">
                  <h2 className="h3">{calendarData.page_title}</h2>
                </div>
                <div className="downloadbtn">
                  <span className="pritbtn">Print</span>
                </div>
              </div>
            </div>
            <div className="cat_navbox">
              <div className="boweeks">
                <div className="boweekinfo df fww">
                  <div className="boweekyear">
                    <label>Select Year</label>
                    <ul className="rsf_years">
                      {calendarData.all_years.map((item, index) => {
                        return (
                          <li className={item === calendarYear ? 'active' : ''} key={index}>
                            <p onClick={YearClicked} data-year={item}>
                              {item}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="boweekmonth">
                    <label>Select Month</label>
                    <ul className="rsf_qutermonth">
                      {calendarData.all_months.map((item, index) => {
                        //console.log(item , currentMonth)
                        return (
                          <li className={item === currentMonth ? 'active' : ''} key={index}>
                            <p data-month={index + 1} onClick={MonthClicked}>
                              {item}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <HomePageAds cls="adds_336" format="horizontal" />
            </div>

            <div className="info_box event_box wtbg">
              <div className="event_weekstitle df fww">
                <div className="evtitle_box evdatebox">
                  <h5>Date</h5>
                </div>
                <div className="evtitle_box eveventbox">
                  <h5>Events</h5>
                </div>
              </div>
              <div id="data-results" className="event_weeks">
                {HideLoader ? null : <Loader />}
              

                {/* {calendarData.all_events_data[0].event_datas ? ( */}
                  
                    {calendarData.all_events_data && calendarData.all_events_data.map((items,index) => {
                      return(
                    <div className="event_row">
                      <div className="ev_week">
                          <h5 contentEditable="true" dangerouslySetInnerHTML={{ __html: items.title,}}></h5>
                      </div>
                      <div className="event_infobox">
                      
                      {items.event_datas.map((item, index) => {
                        return (
                          <div className="event_info" key={index}>
                            <div className="event_logo">
                              <img src={item.img} alt={item.event_title} />
                            </div>
                            <div className="event_place">
                              <p>                              
                                {item.event_url  ? (
                                  <a href={item.event_url} target='_blank' title={item.event_title} > <strong>{item.event_title}</strong></a>
                                  ) : (
                                  <strong>{item.event_title}</strong>
                                  )}
                                
                                {item.event_date}
                              </p>
                              <p>{item.location && item.location}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  )

                })}
                      
                    
                    
                {/* ) : (
                  <div
                    contentEditable="true"
                    dangerouslySetInnerHTML={{
                      __html: calendarData.all_events_data,
                    }}
                  ></div>
                )} */}
              </div>
            </div>
          </div>
        </section>
      
    </>
  );
};

export default CalendarOfEvents;
