//import dt from 'datatables.net-dt';
// import 'datatables.net-responsive-dt';
// import 'datatables.net-scroller-dt';
import HomePageAds from '../../../Homepage/HomePageAds';

//import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { useState, useEffect } from 'react';
const $ = require('jquery');

//$.fn.DataTable = dt;

const Results = ({ data, tag }) => {
   const [toggleon, setToggleon] = useState(false)
   const tdStyle = {
      border: '1px solid rgb(197, 197, 197)',
      borderCollapse: 'collapse',
      padding: '6px',
   };
   const filmdata = data.boxoffice_data ? data.boxoffice_data : data.film_data;
   useEffect(() => {
      // $('#box-office-res-weekend-tbl').DataTable({
      //    destroy: true,
      //   columns: [
      //     { data: 'rank' },
      //     { data: 'title' },
      //     { data: 'distributor' },
      //     { data: 'week' },
      //     { data: 'rating' },
      //     { data: 'locations' },
      //     { data: 'locations_change' },
      //     { data: 'weekend_gross' },
      //     { data: 'weekend_gross_change' },
      //     { data: 'per_theater_avg' },
      //     { data: 'total' },
      //   ],
      //   paging: false,
      //   searching: false,
      //   responsive: false,
      //   autoWidth: false,
      //   columnDefs: [{ orderable: false, targets: [3, 5, 6, 8] }],
      //   aaSorting: [],
      //   order: [],
      // });
      // $('.responsive, .responsive tr th, .responsive tr td').css({
      //   border: '1px solid #f2f2f2',
      //   'border-collapse': 'collapse',
      //   padding: '6px',
      // });
      
      // $('.dataTables_info').css({ display: 'none' });

      $('.tab_items, .view_btn').click(function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var tabinfotitle = $(this).data('title');
        $('.filter_tabsinfo').hide();
        $('.filter_tabsinfo[data-title="' + tabinfotitle + '"]').show();
      });

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

   }, []);
   let num_w = 0;
   let num_w_ly = 0;
   //const data_weekly = filmdata;
   const data_weekly = data.boxoffice_data_weekly;
   //data_weekly.sort((a, b) => (a.weekly_gross_order < b.weekly_gross_order) ? 1 : -1);
   const togglehandle = e => setToggleon(!toggleon);

   return (
      <>
         {tag === 'release_by_week' ? (
            <>
               <section className="studioview">
                  <div className="container">
                     <div className="fulltable_area printarea">
                        <div className="event_tabletop df fww">
                           <div className="eventbar">
                              <div className="eventbr_in df fww printdochide">
                                 <h4>
                                    Events <span>This Week</span>
                                 </h4>
                                 <ul className="df fww" id="event_data">
                                    {data.event_data &&
                                       data.event_data.map((item, index) => {
                                          return (
                                             <li className="df fww" key={index}>
                                                <div className="event_thumb">
                                                   {item.img && <img src={item.img} alt={item.title} />}
                                                </div>
                                                <div className="event_name">
                                                   <a href={item.link} target="_blank">
                                                      <span dangerouslySetInnerHTML={{ __html: item.title }}></span>
                                                      <time>{item.event_date}</time>
                                                   </a>
                                                </div>
                                             </li>
                                          );
                                       })}
                                 </ul>
                              </div>
                           </div>
                           <div className="table_topbox">
                              <div className="post_views">
                                 <ul>
                                    <li className="view_btn active" data-title="sturelease_table">
                                       Table View
                                    </li>
                                    <li className="view_btn" data-title="sturelease_grid">
                                       Poster View
                                    </li>
                                 </ul>
                              </div>
                              <h2 className="printtitle hide">Results</h2>
                              <div className="downloadbtn" title="Print document">
                                 <span className="pritbtn" style={{ display: 'none' }}>
                                    Print
                                 </span>
                              </div>
                           </div>
                        </div>
                        <div className="sturelease_table filter_tabsinfo release-cal-block" data-title="sturelease_table" id="table_view">
                           <table id="stdio-rel-tbl" className="responsive dataTable twotblhead">
                              <thead>
                                 <tr>
                                    <th colSpan="2"></th>
                                    <th colSpan="2"></th>
                                    <th colSpan="3" data-title="Distribution">
                                       Distribution
                                    </th>
                                    <th colSpan="2" data-title="Box office $">
                                       Domestic Box Office $
                                    </th>
                                 </tr>
                                 <tr>
                                    <th data-title="Title">Title</th>
                                    <th data-title="Distributor">Distributor</th>
                                    <th data-title="Rating">Rating</th>
                                    <th data-title="Runtime">Runtime</th>
                                    <th data-title="Type">Type</th>
                                    <th data-title="Pattern / Platform">Pattern / Platform</th>
                                    <th data-title="Locations">Locations</th>
                                    <th data-title="Opening Weekend"> opening Weekend</th>
                                    <th data-title="Total $">Total $</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {filmdata.map((item, index) => {
                                    // if(item.weekend_gross_order >= 1){
                                    return (
                                       <tr key={index} id={index}>
                                          <td data-title="Title">
                                             <h2 className="movtable_title"><a href={item.href} title={item.title}>
                                                <strong>{item.title}</strong>
                                             </a></h2>
                                          </td>
                                          <td data-title="Distributor">
                                             <a href={item.distributor_link} title={item.distributor_name}>
                                                <strong>{item.distributor_name}</strong>
                                             </a>
                                          </td>
                                          <td data-title="Rating">{item.rating}</td>
                                          <td data-title="Runtime">{item.runtime}</td>
                                          <td data-title="Distribution type">{item.release_type}</td>
                                          <td data-title="Distribution Pattern" dangerouslySetInnerHTML={{ __html: item.dist_pattern }}></td>
                                          <td data-title="distribution Locations" dangerouslySetInnerHTML={{ __html: item.dist_locations }}></td>
                                          <td data-title="Box office $ opening Weekend" dangerouslySetInnerHTML={{ __html: item.weekly_gross }}></td>
                                          <td data-title="Box office $ Total" dangerouslySetInnerHTML={{ __html: item.week_total }}></td>
                                       </tr>
                                    );
                                    // }
                                 })}
                              </tbody>
                           </table>
                        </div>
                        <div className="sturelease_grid filter_tabsinfo release-cal-block" data-title="sturelease_grid" style={{ display: 'none' }}>
                           <ul className="df fww postersvisual" id="poster_view">
                              {filmdata.map((item, index) => {
                                 return (
                                    <li key={index}>
                                       <div className="movie_data">
                                          <div className="movieimg">
                                             <img src={item.img} alt="" />
                                          </div>
                                          <div className="movieinfo">
                                             <a href={item.href}>
                                                <h3>{item.title}</h3>
                                                <h4>
                                                   <span>
                                                      {item.rating ? item.rating : ''}
                                                      {item.rating && item.runtime ? ', ' + item.runtime + '  mins' : ''}
                                                   </span>
                                                   {item.release_type ? item.release_type : ''}
                                                   {item.dist_pattern ? (
                                                      <>
                                                         <span dangerouslySetInnerHTML={{ __html: item.dist_pattern }}></span>
                                                      </>
                                                   ) : (
                                                      ''
                                                   )}
                                                </h4>
                                                <span>View more {'>>'}</span>
                                             </a>
                                          </div>
                                       </div>
                                    </li>
                                 );
                              })}
                           </ul>
                        </div>
                        <div className="studio_nav df fww">
                           <div className="stnav_arrow prev">
                              <span>Previous Week</span>
                           </div>
                           <HomePageAds cls="stnavadd" format="horizontal" />
                           <div className="stnav_arrow nxt">
                              <span>Next Week</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>
            </>
         ) : (
            <>
               <section className="fulltablebox">
                  <div className="container">
                     <div className="fulltable_area printarea">
                        <div className="event_tabletop df fww">
                           <div className="eventbar">
                              <div className="eventbr_in df fww printdochide">
                                 <h4>
                                    Events <span>This Week</span>
                                 </h4>
                                 <ul className="df fww" id="event_data">
                                    {data.event_data &&
                                       data.event_data.map((item, index) => {
                                          return (
                                             <li className="df fww" key={index}>
                                                <div className="event_thumb">
                                                   {item.img && (<img src={item.img} alt={item.title} />)}
                                                </div>
                                                <div className="event_name">
                                                   <a href={item.link} target="_blank">
                                                      <span dangerouslySetInnerHTML={{ __html: item.title }}></span>
                                                      <time>{item.event_date}</time>
                                                   </a>
                                                </div>
                                             </li>
                                          );
                                       })}
                                 </ul>
                              </div>
                           </div>
                           <div className="table_topbox">
                              <ul className={"daystype df fww " + (toggleon ? "off" : "")}>
                                 <li className="tab_items active" data-title="Weekend" id="weekend_colection_data">
                                    Weekend
                                 </li>
                                 <li className={"togglebtn " + (toggleon ? "off" : "")} onClick={togglehandle}><div className="togglehandel"></div></li>
                                 <li className="tab_items" data-title="Weekly" id="weekely_colection_data">
                                    Weekly
                                 </li>
                              </ul>

                              <h2 className="printtitle hide">Results</h2>
                              <div className="downloadbtn" title="Print document">
                                 <span className="pritbtn" style={{ display: 'none' }}>
                                    Print
                                 </span>
                              </div>
                           </div>
                        </div>
                        <div className={"Weekendbox filter_tabsinfo sturelease_table " + (toggleon ? "hide" : "active")} data-title="Weekend">
                           <div className="result_table tablebox" id="Weekendbox_data">
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
                                    {filmdata.map((item, index) => {
                                       if (item.weekend_gross_order >= 1) {
                                          num_w = num_w + 1;
                                          return (
                                             <tr id={index + 1} className={`box-office-res-row ` + (index % 2) === 0 ? 'even' : 'odd'} role="row" key={num_w}>
                                                <td data-title="Rank" style={{ tdStyle }}>
                                                   {num_w}
                                                </td>
                                                <td data-title="Title" style={{ tdStyle }}>
                                                   <h2 className="movtable_title"><a href={item.permalink}>
                                                      <strong>{item.title}</strong>
                                                   </a></h2>
                                                </td>
                                                <td data-title="Distributor" style={{ tdStyle }}>
                                                   <a href={item.distributor_link}>
                                                      <strong>{item.distributor_name}</strong>
                                                   </a>
                                                </td>
                                                <td data-title="Week" style={{ tdStyle }}>
                                                   {item.week}
                                                </td>
                                                <td data-title="Rating" style={{ tdStyle }}>
                                                   {item.rating}
                                                </td>
                                                <td data-title="Locations #" style={{ tdStyle }}>
                                                   {item.locations && item.locations.toLocaleString()}
                                                </td>
                                                <td data-title="Locations +-LW" style={{ tdStyle }}>
                                                   {item.locations_change === 0 ? '-' : item.locations_change}
                                                </td>
                                                <td data-title="Weekend $" style={{ tdStyle }}>
                                                   ${item.weekend_gross && item.weekend_gross.toLocaleString()}
                                                </td>
                                                <td data-title="+-LW" style={{ tdStyle }}>
                                                   {item.weekend_gross_change && parseFloat(item.weekend_gross_change).toFixed(1)} %{' '}
                                                </td>
                                                <td data-title="Per theatre Average $" style={{ tdStyle }}>
                                                   ${item.per_theater_avg && Math.round(item.per_theater_avg).toLocaleString()}
                                                </td>
                                                <td data-title="Total $" style={{ tdStyle }}>
                                                   ${item.weekend_total && (item.weekend_total.toLocaleString("en-US"))}
                                                </td>
                                             </tr>
                                          );
                                       }
                                    })}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                        <div className={"Weekly filter_tabsinfo sturelease_grid " + (toggleon ? "active" : "hide")} data-title="Weekly">
                           <div className="result_table tablebox" id="Weekly_box_html">
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

                                    {data_weekly.map((item, index) => {

                                       if (item.weekly_gross) {
                                          num_w_ly = num_w_ly + 1;
                                          return (
                                             <tr id={index + 1} className={`box-office-res-row ` + (index % 2) === 0 ? 'even' : 'odd'} role="row" key={index}>
                                                <td data-title="Rank" style={{ tdStyle }}>
                                                   {num_w_ly}
                                                </td>
                                                <td data-title="Title" style={{ tdStyle }}>
                                                   <h2 className="movtable_title"><a href={item.permalink}>
                                                      <strong>{item.title}</strong>
                                                   </a></h2>
                                                </td>
                                                <td data-title="Distributor" style={{ tdStyle }}>
                                                   <a href={item.distributor_link}>
                                                      <strong>{item.distributor_name}</strong>
                                                   </a>
                                                </td>
                                                <td data-title="Week" style={{ tdStyle }}>
                                                   {item.week}
                                                </td>
                                                <td data-title="Rating" style={{ tdStyle }}>
                                                   {item.rating}
                                                </td>
                                                <td data-title="Locations #" style={{ tdStyle }}>
                                                   {item.locations && item.locations.toLocaleString()}
                                                </td>
                                                <td data-title="Locations +-LW" style={{ tdStyle }}>
                                                   {item.locations_change === 0 ? '-' : item.locations_change}
                                                </td>
                                                <td data-title="weekly $" style={{ tdStyle }}>
                                                   ${item.weekly_gross && item.weekly_gross.toLocaleString()}{' '}
                                                </td>
                                                <td data-title="+-LW" style={{ tdStyle }}>
                                                   {' '}
                                                   {item.weekly_gross_change && parseFloat(item.weekly_gross_change).toFixed(1)} %{' '}
                                                </td>
                                                <td data-title="Per theatre Average $" style={{ tdStyle }}>
                                                   {' '}
                                                   ${item.per_theater_avg && Math.round(item.per_theater_avg).toLocaleString()}{' '}
                                                </td>
                                                <td data-title="Total $" style={{ tdStyle }}>
                                                   {' '}
                                                   ${item.weekly_total && item.weekly_total.toLocaleString()}{' '}
                                                </td>
                                             </tr>
                                          );
                                       }
                                    })}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>
            </>
         )}
      </>
   );



};

export default Results;
