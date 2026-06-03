import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

/* interface ApexOptions {
   options: any;
   series: any;
} */
const StatePiechart = ({ chrtmapdata, requestFrom }) => {
  let chartfeedlabel = []; // charts labels
  let chartfeedlabeldata = []; //chart data for chart creation
  if (chrtmapdata.length > 0) {
    const sortedmapData = chrtmapdata?.sort((a, b) => parseFloat(b.market) - parseFloat(a.market));
    if (sortedmapData.length > 0) {
      const topFive = sortedmapData.slice(0, 5);
      const others = sortedmapData.slice(5);
      const othersTotalMarket = others.reduce((total, entry) => total + parseFloat(entry.market), 0).toFixed(2);
      const othersTotalscreen = others.reduce((total, entry) => total + parseFloat(requestFrom === 'Distributor' ? entry.box_office : entry.screen), 0);
      const chartFeed =
        requestFrom === 'Distributor'
          ? topFive.push({ 'title': 'Other', 'market': othersTotalMarket, 'box_office': othersTotalscreen })
          : topFive.push({ 'title': 'Other', 'market': othersTotalMarket, 'screen': othersTotalscreen });
      if (topFive.length > 0) {
        chartfeedlabel = topFive.map((item) => item.title);
        chartfeedlabeldata = topFive.map((item) => parseFloat(requestFrom === 'Distributor' ? item.box_office : item.screen));
      }
    }
  }
  /* { console.log(chartfeedlabeldata) } */
  const state = {
    series: chartfeedlabeldata,
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: chartfeedlabel,
      legend: {
        position: 'top',
        fontSize: '18px',
        fontWeight: 600,
        itemMargin: {
          horizontal: 10,
        },
      },
      colors: ['#2E93fA', '#66DA26', '#ffcd56', '#E91E63', '#9c1ee9', '#999999'],
      tooltip: {
        fillSeriesColor: false,
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          if (requestFrom === 'Distributor') {
            return (
              '<div class="arrow_box">' +
              '<span class="serisename"><span class="colordot" style="' +
              `background:${w.globals.colors[seriesIndex]}; display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:5px;` +
              '"></span>' +
              w.globals.labels[seriesIndex] +
              '</span> <br/>' +
              '<span> #Box-Office Total: $' +
              series[seriesIndex].toLocaleString('en-US') +
              '</span>' +
              '</div>'
            );
          } else {
            return (
              '<div class="arrow_box">' +
              '<span class="serisename"><span class="colordot" style="' +
              `background:${w.globals.colors[seriesIndex]}; display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:5px;` +
              '"></span>' +
              w.globals.labels[seriesIndex] +
              '</span> <br/>' +
              '<span> #screens: ' +
              series[seriesIndex] +
              '</span>' +
              '</div>'
            );
          }
        },
      },
      plotOptions: {
        pie: {
          startAngle: 360,
          endAngle: 0,
        },
      },
      // responsive: [
      //   {
      //     breakpoint: 480,
      //     options: {
      //       chart: {
      //         width: 300,
      //       },
      //       legend: {
      //         position: 'bottom',
      //       },
      //     },
      //   },
      // ],
    },
  };
  return <Chart options={state.options} series={state.series} type='pie' />;
};

export default StatePiechart;
