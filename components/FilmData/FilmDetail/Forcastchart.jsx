import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';


const Forcastchart =({  }) => {
   const data = {
      "title": "Taylor Swift: The Eras Tour",
      "film_titles": 175306,
      "id": 175306,
      "favorite": 0,
      "content": "",
      "release_date_year": "2023",
      "additional_key_dates": "",
      "landscape_image": "https://live.screendollars.com/wp-content/uploads/2023/09/230804160446-34-taylor-swift-eras-tour-gallery-restricted-e1695837304302.jpg",
      "trailer_link": "",
      "watch_now": "",
      "poster_img": "https://live.screendollars.com/wp-content/uploads/2023/09/Poster-ErasTour.png",
      "dis_title_link": "/studios-distributors/variance-films/",
      "dis_title": "Variance Films",
      "rating": "NR",
      "runtime": "2h 40m",
      "genre": "Documentary, Music",
      "public_movie_website": "",
      "public_movie_img": "https://live.screendollars.com/wp-content/themes/screendollars-live/assets/images/distributerico.svg",
      "distributor_movie_page": "",
      "facebook": "",
      "instagram": "",
      "twitter": "",
      "wikipedia": "",
      "format": "",
      "synopsis": "Experience the breathtaking Eras Tour concert, performed by the one and only Taylor Swift.",
      "plot_summary": "",
      "story_line": "",
      "comments": "",
      "top_cast": [
        {
          "link": "/biography/sam-wrench/",
          "img": "https://live.screendollars.com/wp-content/themes/screendollars-live/assets/images/noactor.svg",
          "name": "Sam Wrench",
          "talent_name": "Director"
        },
        {
          "link": "/biography/taylor-swift/",
          "img": "https://live.screendollars.com/wp-content/uploads/2023/03/160320231678924978.jpeg",
          "name": "Taylor Swift",
          "talent_name": ""
        }
      ],
      "film_video": [],
      "movie_images": [],
      "movie_images_filter": [],
      "production_budget": "",
      "boxoffice_domestic": "",
      "boxoffice_international": "",
      "worldwide_total_collection": "",
      "box_office_show": "",
      "total_is_estimate_notes": null,
      "comparable_films": [],
      "movie_frist_week_collection": "",
      "boxoffice_films_data": [],
      "forcast_show": "yes",
      "forcast": {
        "openening_weekend": "$95,000,000",
        "total": "$190,000,000",
        "table_data": [
          {
            "date_when_projected": "09/27/2023",
            "openening_weekend_collection": 95000000,
            "openening_weekend_collection_lable": "$90,000,000 - $100,000,000",
            "total_weekend_collection": 190000000,
            "total_weekend_collection_label": "$180,000,000 - $200,000,000",
            "theaters": "4000",
            "theaters_label": "4,000"
          },
          {
            "date_when_projected": "10/27/2023",
            "openening_weekend_collection": 99000000,
            "openening_weekend_collection_lable": "$99,000,000 - $200,000,000",
            "total_weekend_collection": 170000000,
            "total_weekend_collection_label": "$140,000,000 - $300,000,000",
            "theaters": "5000",
            "theaters_label": "5,000"
          }
        ],
        "chart": [
          {
            "title": "Taylor Swift: The Eras Tour",
            "w_end": 95,
            "tot_ly": 190
          }
        ],
        "chart_class": "forcast_onecumn"
      },
      "release_date_note": "",
      "release_date": "10/13/2023 | Opens in ",
      "release_date_count_down": 11,
      "release_date_info": " | Theatrical Wide (4,000 locations) ",
      "chart": [],
      "advanceticket": {
        "dailer": {
          "dialername": "Advanced Ticket Sales",
          "dailerinfo": "<p><strong>Compared To Avg. Of All Films With Similar Genre</strong>The X-Axis Is The Number Of Days Before Releasing Of Movie: D-23, D-17, D-14, D-10, D-7, D-4 And D-1. And This Chart Displays How The Movie Did Irrespective Of compared movies and Avg. of all films with similar genre</p>\n",
          "topticketPersent": 0,
          "dailercolor": "#4BC8EF"
        },
        "linerchart": {
          "series": "",
          "xaxis": [
            "-22",
            "-17",
            "-14",
            "-10",
            "-07",
            "-04",
            "-01",
            "0",
            "+10"
          ]
        }
      },
      "advanceticket_cols": []
    }
   const $ = require('jquery');


  const [Chart, setChart] = useState(null);
  const [chartwidth , serChartwidth] = useState('onecolchart');
  useEffect(() => {
    let $$ = ($) => document.querySelector($);
    let $$$ = ($) => document.querySelectorAll($);

    
    import("apexcharts").then((Component) => setChart(Component));
    let movietotalone, openingone, movietotaltwo, openingtwo, movietotalthree, openingthree;
    if ($$$('.chartmovieone').length) {
      movietotalone = JSON.parse($$('.chartmovieone').dataset.total);
    }
    if ($$$('.chartmovieone').length) {
      openingone = JSON.parse($$('.chartmovieone').dataset.opening);
    }
    if ($$$('.chartmovietwo').length) {
      movietotaltwo = JSON.parse($$('.chartmovietwo').dataset.total);
    }
    if ($$$('.chartmovietwo').length) {
      openingtwo = JSON.parse($$('.chartmovietwo').dataset.opening);
    }
    if ($$$('.chartmoviethree').length) {
      movietotalthree = JSON.parse($$('.chartmoviethree').dataset.total);
    }
    if ($$$('.chartmoviethree').length) {
      openingthree = JSON.parse($$('.chartmoviethree').dataset.opening);
    }

    let forcastmovieone, forcastmovietwo, forcastmoviethree, forcastmovie;
    forcastmovieone = $$('.moviename .chartlegend:first-child').dataset.text;
    // forcastmovietwo= $$('.moviename .chartlegend')[1].dataset.text;
    // forcastmoviethree= $$('.moviename .chartlegend')[2].dataset.text;

    let forcastmovies = $$$('.forcastmovie_name.moviename .chartlegend');
    var forcastmoviename = [];
    for (let forcastmovie of forcastmovies) {
      forcastmoviename.push(forcastmovie.dataset.text);
    }
    //console.log(forcastmoviename)

    var optimalColumnWidthPercent = 20 + 60 / (1 + 30 * Math.exp(-15 / 3));

    //console.log(makeDatathree , makeDatafour);
    let barcolor = ['#E97C00', '#E97C00', '#E97C00', '#E97C00', '#E97C00', '#E97C00', '#E97C00'];
    let boxoptionsfc = {
      series: [
        {
          type: 'bar',
          name: forcastmoviename,
          data: [
            {
                x: 'Week 1',
                y: 190,
                goals: [
                   {
                      value: 95,
                      strokeHeight: 0,
                      strokeWidth: 0,
                      strokeColor: '',
                   },
                ],
             }
          ],
        },
      ],
      chart: {
        id: 'forcastchart',
        type: 'bar',
        height: 400,
        toolbar: {
          show: false,
        },
        goals: [
         {
           name: 'Opening',           
         },
       ],
        
      },
      plotOptions: {
        bar: {
          horizontal: false,
          barHeight: '75%',
          dataLabels: {
            position: 'top',
            hideOverflowingLabels: true,
          },
          columnWidth: optimalColumnWidthPercent + '%',
        },
      },
      dataLabels: {
        enabled: false,
        offsetX: 0,
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#000'],
        },
      },
      markers: {
        size: [4, 7],
      },
      colors: barcolor,
      stroke: {
        show: true,
        width: [2, 2, 2, 2],
        colors: ['#fff', /*"#707070", */ '#fff', '#fff'],
      },

      tooltip: {
        shared: true,
        intersect: false,
        followCursor: false,
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          let seriesinfo_one = w.globals.initialSeries[0];
          //console.log( seriesinfo_one );
          //console.log(seriesinfo_one, 'series:' + series, 'seriesIndex:' + seriesIndex, 'dataPointIndex: ' + dataPointIndex, w )
          return (
            '<div class="charttool_box">' +
              "<div class='week_name'>" + w.globals.labels[dataPointIndex] + '</div>' +
              "<div class='series_infotool'>" +
                 "<div class='series_infotoolbox'>" +
                  //"<div class='forfilmcolor' style='background:" + seriesinfo_one.data[dataPointIndex].goals[seriesIndex].strokeColor + "'>" + '</div>' +
                  //"<h5 class='series_name'>" + seriesinfo_one.name + '</h5>' 
                  
                  '<div>' +'Total: $' + seriesinfo_one.data[dataPointIndex].y +'M' +'</div>' +
                  '<div>' +'Opening: $' + seriesinfo_one.data[dataPointIndex].goals[seriesIndex].value + 'M' + '</div>' +
                 '</div>' +
              '</div>' +
            '</div>'
          );
        },
      },
      xaxis: {
        axisBorder: {
          show: true,
          color: '#000',
        },
        axisTicks: {
          show: false,
          color: '#000',
        },
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
            color: '#000',
          },
          axisBorder: {
            show: true,
            color: '#000',
          },
        },
      ],
      legend: {
        position: 'top',
        offsetX: 40,
        show: false,
      },
    };

    let fadeoptionfc = (e, i) => {
      let serises = e.target.closest('li').dataset.text.replaceAll(' ', 'x');
      let serisesname = serises.replaceAll(':', 'x');
      e.target.closest('li').classList.toggle('active');
      let clickseries = e.target.closest('li').dataset;

      let clickmovie = Array.from($$$('.movieforcast_chart .moviename ul li'));
      let clickmovieIndex = clickmovie.indexOf(e.target.closest('li'));
      $$$('.movieforcast_chart .apexcharts-series path')[clickmovieIndex].classList.toggle('legend-mouseover-inactive');
      //console.log(clickmovieIndex);
    };

    let legendslab = $$$('.movieforcast_chart .moviename ul li label');
    for (let legendlab of legendslab) {
      legendlab.addEventListener('click', fadeoptionfc);
    }

    let boxchartfc = new ApexCharts($$('#forcastchart'), boxoptionsfc);
    boxchartfc.render();

    let activeMoviesfc = () => {
      let legends = $$$('.moviename ul li');
      for (let legend of legends) {
        legend.classList.add('active');
      }
    };

    let chartdatasfc = (e) => {
      e.target.parentElement.parentElement.querySelectorAll('li').forEach((n) => n.classList.remove('active'));
      e.target.parentElement.classList.add('active');
    };

    let weekdatatotalfc = $$$('.weekdata ul li label');
    for (let weekdata of weekdatatotalfc) {
      weekdata.addEventListener('click', (e) => {
        chartdatasfc(e);
      });
    }
    
    
   }, []);
   // (boxoptionsfc.series[0].data.length === 1) && serChartwidth('onecolchart');
   // (boxoptionsfc.series[0].data.length === 2) && serChartwidth('twocolchart');
   // (boxoptionsfc.series[0].data.length === 3) && serChartwidth('threecolchart');
  return (
    <>
      <section className="boxofficedetail_chart toplinesec sd_adv_data">
        <div className="container">
          <div className="top_txt  df fww">
            <h5>US & Canada</h5>
            {/* <div className="taginfo df fww">
						<i className="fal fa-info-circle"></i>
						<p>Hover Over or Cick Bars For More Details</p>
					</div> */}
          </div>
          <div className={data.forcast.chart_class + ' movieforcast_chart'}>
            <div className="charnav df fww">
              <div className="moviename forcastmovie_name">
                <ul className=" df fww">
                  {data.forcast.chart &&
                    data.forcast.chart.map((items, index) => {
                      return (
                        <li className="active chartlegend" data-text={items.title} key = {index}>
                          <label htmlFor="">{items.title}</label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="chartdatafeed">
              {data.forcast.chart &&
                data.forcast.chart.map((items, index) => {
                  if (index == 0) {
                    return <div className="chartmovieone" data-opening={'[' + items.w_end + ']'} data-total={'[' + items.tot_ly + ']'} key = {index}></div>;
                  } else {
                    return <div className={index == 1 ? 'chartmovietwo' : 'chartmoviethree'} data-opening={'[' + items.w_end + ']'} data-total={'[' + items.tot_ly + ']'} key = {index}></div>;
                  }
                })}
            </div>
            <div className={"comparechart_box pvr " + chartwidth}>
              <div className="milian">($1m)</div>
              <div id="forcastchart"></div>
            </div>
            {data.forcast_show && (
              <>
                {data.forcast.table_data && data.forcast.table_data && (
                  <div className="fdtable">
                    <table id="box-ofc-proj-tbl" className="responsive dataTable">
                      <thead>
                        <tr>
                          <th>As of</th>
                          <th>Opening $</th>
                          <th>Total $</th>
                          <th># Theaters</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.forcast.table_data &&
                          data.forcast.table_data.map((items, index) => {
                            return (
                              <tr key = {index}>
                                <td data-title="As of">{items.date_when_projected}</td>
                                <td data-title="Opening $"> {items.openening_weekend_collection_lable} </td>
                                <td data-title="Total $"> {items.total_weekend_collection_label}</td>
                                <td data-title="# Theaters">{items.theaters_label}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );

}

export default Forcastchart