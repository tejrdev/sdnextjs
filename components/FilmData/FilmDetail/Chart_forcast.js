import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
/*const ApexCharts = dynamic(() => import('apexcharts'), {
  ssr: false,
});*/
// import './comparechart.css';

const $ = require('jquery');

const Chartforcast = ({ data }) => {
  const [Chart, setChart] = useState(null);
  const [chartwidth , serChartwidth] = useState('threecolchart');
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
    let barcolor = ['#E97C00', '#00B825', '#3E98FF'];
    let boxoptionsfc = {
      series: [
        {
          type: 'bar',
          name: forcastmoviename,
          data: [
            {
              x: 'Forecast',
              y: movietotalone,
              goals: [
                {
                  name: 'Opening',
                  value: openingone,
                  strokeHeight: 5,
                  strokeWidth: 0,
                  strokeColor: ' #E97C00',
                },
              ],
            },
            {
              x: 'Actuals',
              y: movietotaltwo,
              goals: [
                {
                  name: 'Opening',
                  value: openingtwo,
                  strokeHeight: 5,
                  strokeWidth: 0,
                  strokeColor: '#00B825 ',
                },
              ],
            },
            {
              x: 'Actuals',
              y: movietotalthree,
              goals: [
                {
                  name: 'Opening',
                  value: openingthree,
                  strokeHeight: 5,
                  strokeWidth: 0,
                  strokeColor: ' #3E98FF',
                },
              ],
            },
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
          return (
            '<div class="charttool_box">' +
            "<div class='week_name'>" +
            w.globals.labels[dataPointIndex] +
            '</div>' +
            "<div class='series_infotool'>" +
            "<div class='series_infotoolbox'>" +
            "<div class='forfilmcolor' style='background:" +
            seriesinfo_one.data[dataPointIndex].goals[seriesIndex].strokeColor +
            "'>" +
            '</div>' +
            "<h5 class='series_name'>" +
            seriesinfo_one.name[dataPointIndex] +
            '</h5>' +
            '<div>' +
            'Total: $' +
            seriesinfo_one.data[dataPointIndex].y +
            'M' +
            '</div>' +
            '<div>' +
            'Opening: $' +
            seriesinfo_one.data[dataPointIndex].goals[seriesIndex].value +
            'M' +
            '</div>' +
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
    (data.forcast.chart.length === 1) && serChartwidth('onecolchart');
     (data.forcast.chart.length === 2) && serChartwidth('twocolchart');
     (data.forcast.chart.length === 3) && serChartwidth('threecolchart');
  }, []);
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
};

export default Chartforcast;
