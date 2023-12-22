import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DetaillineChart = ({ data }) => {
  const [isClient, setIsClient] = useState(false);
  const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
  // const {seriseRef} = useRef()
  let $$ = ($) => document.querySelector($);
  let $$$ = ($) => document.querySelectorAll($);

  let fadeoption = (e) => {
    let serises = e.target.closest('li').dataset.text.replaceAll(' ', 'x');
    let seriesdot = serises.replaceAll('.', 'x');
    let serisesname = seriesdot.replaceAll(':', 'x');
    //console.log(serisesname);
    e.target.closest('li').classList.toggle('active');
    // let clickseries = e.target.closest('li').dataset;
    $$('.apexcharts-series[seriesName="' + serisesname + '"]').classList.toggle('legend-mouseover-inactive');
  };
  useEffect(() => {
    setIsClient(true);
    // let legends = $$$(".moviename ul li label");
    // for (let legend of legends) {
    // 	legend.addEventListener("click", fadeoption);
    // }
  }, []);
  !isClient && null; // Return null if rendering on the server-side
  data.series.map((item) => {
    item.name === 'Avg. of all films with similar genre' ? (item.color = '#959595') : '';
  });
  const linechartData = {
    //series: data.series,
    series: data.series,
    options: {
      chart: {
        height: 430,
        type: 'line',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: 'smooth',
        dashArray: [0, 0, 0, 5],
        width: [3, 3, 3, 2],
      },
      title: {
        //text: 'Page Statistics',
        //align: 'left'
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '';
        },
        show: false,
      },
      markers: {
        size: 0,
        hover: {
          size: [7],
        },
      },
      colors: ['#E97C00', '#00B825', '#3E98FF', '#707070'],
      xaxis: {
        categories: data.xaxis,
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
            show: false,
            color: '#000',
          },
          axisBorder: {
            show: true,
            color: '#000',
          },
          labels: {
            show: false,
          },
        },
      ],
      tooltip: {
        intersect: false,
        shared: false,
        followCursor: false,
        fixed: {
          enabled: false,
          position: 'topRight',
          offsetX: 50,
          offsetY: 0,
        },
        onDatasetHover: {
          highlightDataSeries: true,
        },
        x: {
          show: false,
        },
        y: [
          {
            title: {
              formatter: function (val) {
                return val + ' ';
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + ' ';
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + ' ';
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + ' ';
              },
            },
          },
        ],
        enabled: true,
      },
      annotations: {
        xaxis: [
          {
            x: '0',
            strokeDashArray: 0,
            borderColor: '#707070',
            strokeDashArray: 8,
            label: {
              text: 'RELEASE DATE',
            },
          },
        ],
      },
      grid: {
        borderColor: '#f1f1f1',
      },
    },
  };
  return (
    <div className='detail_linechart ticketingchart df fww w100'>
      <div id='chart'>
        <ReactApexChart options={linechartData.options} series={linechartData.series} type='line' height={450} />
      </div>
      <div className='charnav df fww'>
        <div className='moviename'>
          <ul className=' df fww'>
            {data.series.map((series, i) => (
              <li className='active chartlegend' data-text={series.name} key={i}>
                <label htmlFor='' onClick={fadeoption}>
                  {series.name}
                </label>
              </li>
            ))}
          </ul>
          <div className='indicationinfo'>{/* <strong>(-)</strong> indicates <br/>before release */}</div>
        </div>
      </div>
    </div>
  );
};

export default DetaillineChart;
