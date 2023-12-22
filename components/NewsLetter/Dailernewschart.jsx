import dynamic from 'next/dynamic';
import chartbg from '../../public/chartbg.jpg';

const Dailernewschart = ({score , height}) => {
   const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
   const dailchartData = {
      series: [score],
      options: {
         chart: {
            type: 'radialBar',
            offsetY: -30,
            sparkline: {
               enabled: true,
            },
         },
         plotOptions: {
            radialBar: {
               startAngle: -90,
               endAngle: 90,
               track: {
                  background: '#e7e7e7',
                  strokeWidth: '97%',
                  margin: 5, // margin is in pixels
                  dropShadow: {
                     enabled: false,
                     top: 2,
                     left: 0,
                     color: '#999',
                     opacity: 1,
                     blur: 2,
                  },
               },
               dataLabels: {
                  name: {
                     show: false,
                  },
                  value: {
                     offsetY: -2,
                     fontSize: '22px',
                     fontWeight: 'bold',
                  },
               },
            },
         },
         grid: {
            padding: {
               top: -10,
            },
         },
         fill: {
            type: 'image',
            image: {
              src: [chartbg.src],
            }
          },
         //fill: {
         //    type: 'gradient',
         //    gradient: {
         //       shade: 'light',
         //       type:"diagonal1",
         //       shadeIntensity: 0.4,
         //       inverseColors: false,
         //       //gradientToColors: ['#FFE434', '#E93100'],
         //       opacityFrom: 1,
         //       opacityTo: 1,
         //       stops: [0,100],
         //       colorStops: [
         //          {
         //            offset: 0,
         //            color: "#01BBE1",
         //            opacity: 1
         //          },
         //          {
         //            offset: 20,
         //            color: "#FFE434",
         //            opacity: 1
         //          },
         //          {
         //             offset: 40,
         //             color: "#FFE434",
         //             opacity: 1
         //           },
         //          {
         //            offset: 50,
         //            color: "#FFE434",
         //            opacity: 1
         //          },
         //          {
         //            offset: 90,
         //            color: "#EE8C1C",
         //            opacity: 1
         //          },
         //          {
         //            offset: 100,
         //            color: "#E93100",
         //            opacity: 1
         //          }
         //        ]
         //    },
         // },
         labels: ['Average Results'],
      },
   };
   return (
      <div className="newsltrcharts">
         <ReactApexChart options={dailchartData.options} series={dailchartData.series} type='radialBar' height={height} className='radialchart' />
      </div>
   )
}

export default Dailernewschart