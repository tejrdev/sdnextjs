import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DetailAverness = ({ data }) => {
  //sort dates in asc order
  data.series[0] && data.series[0].data.sort((a, b) => (a.days < b.days ? -1 : 1));

  let maxone = [];
  data.series.map((item, i)=>{
    item.data.map((initem, j)=>{
      maxone.push(initem.days)
    })
  });
  let xmax = Math.max( ...maxone ) + 20;
  //console.log(xmax)      

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

  const linechartData = {
    series: data.series,
    // series: [
    // 	{
    // 	  name: "Wish",
    // 	  "data": [
    //       {x: "may", y: 2239},
    //       {x: "jun", y: 2160},
    //       {x: "jul", y: 2167},
    //       {x: "aug", y: 2306},
    //       {x: "sep", y: [2497 , 2914]} ,
    //       {x: "oct", y: [3205, 3680, 4068]}]
    // 	},
    // 	{
    // 	  name: "Five Nights at Freddy's",
    // 	  data: [
    //       {x: "may",y:2686},
    //       {x: "jun", y:2947},
    //       {x: "jul",y:[2965, 3228, 3080]},
    //       {x: "aug", y:[3375, 3402]},
    //       {x: "sep", y:[3693, 3651, 3774 ]},
    //       {x: "oct",y:[4127, 4499, 4743, 4721, 4755, 5002]}]
    // 	}

    //  ],

    // series: [
    //    {
    //      name: "Wish",
    //      "data": [
    //       {x: -205, y: 22.39, date: '01-05-2023'},
    //       {x: -163, y: 21.60, date: '12-06-2023'},
    //       {x: -125, y: 21.67, date: '20-07-2023'},
    //       {x: -86, y: 23.06, date: '28-08-2023'},
    //       {x: -70, y: 24.97, date: '13-09-2023'},
    //       {x: -55, y: 29.14, date: '28-09-2023'},
    //       {x: -48, y: 32.05, date: '05-10-2023'},
    //       {x: -35, y: 36.80, date: '18-10-2023'},
    //       {x: -28, y: 40.68, date: '25-10-2023'},
    //       ]
    //    },
    //    {
    //      name: "Five Nights at Freddy's",
    //      data: [
    //       {x: -190,y: 26.86,date: '16-05-2023'},
    //       {x: -170,y: 29.47,date: '05-06-2023'},
    //       {x: -142,y: 29.65, date: '03-07-2023'},
    //       {x: -132,y: 32.28, date: '13-07-2023'},
    //       {x: -119,y: 30.80, date: '26-07-2023'},
    //       {x: -104,y: 33.75, date: '10-08-2023'},
    //       {x: -90,y: 34.02, date: '24-08-2023'},
    //       {x: -76,y: 36.93, date: '07-09-2023'},
    //       {x: -63,y: 36.51, date: '20-09-2023'},
    //       {x: -56,y: 37.74, date: '27-09-2023'},
    //       {x: -49,y: 41.27, date: '04-10-2023'},
    //       {x: -42,y: 44.99, date: '11-10-2023'},
    //       {x: -37,y: 47.43, date: '16-10-2023'},
    //       {x: -34,y: 47.21, date: '19-10-2023'},
    //       {x: -30,y: 47.55, date: '23-10-2023'},
    //       {x: -28,y: 50.02, date: '25-10-2023'}
    // 	]
    //    }
    //  ],
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
        //categories: [ "D-25", "D-20", "D-15", "D-10", "D-5","0" ],
        axisBorder: {
          show: true,
          color: '#000',
        },
        axisTicks: {
          show: false,
          color: '#000',
        },
        type: 'numeric',
        tickAmount: 7,
        decimalsInFloat: 0,
        min: -xmax,
        max: 0,

        labels: {
          show: true,
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
            show: true,
            formatter: function (value) {
              return value + '%';
            },
          },
          decimalsInFloat: 0,
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
          show: true,
          formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
            return w.globals.initialSeries[seriesIndex].data[dataPointIndex].date;
          },
        },
        y: {
          show: true,
          // formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
          // 	return w.globals.initialSeries[seriesIndex].name + ": " + w.globals.initialSeries[seriesIndex].data[dataPointIndex].y;
          //  }
        },
        //enabled: true
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
  //lg(linechartData.series);
  const charttabeldata = [
    { 'date': '01-05-2023', 'days': 205, 'score': 22.398888 },
    { 'date': '12-06-2023', 'days': 163, 'score': 21.6 },
  ];
  return (
    <>
      <div className='detail_linechart awarchart df fww w100'>
        <div id='chart'>
          <ReactApexChart options={linechartData.options} series={linechartData.series} type='line' height={450} />
        </div>
        {/* <pre>{JSON.stringify(data.series , null , 4)}</pre>
						<pre>{JSON.stringify(data.xaxis , null , 4)}</pre> */}
        <div className='charnav df fww'>
          <div className='moviename'>
            <ul className=' df fww'>
              {data.series.map((series, i) => (
                <>
                  <li className='active chartlegend' data-text={series.name} key={i}>
                    <label htmlFor='' onClick={fadeoption}>
                      {series.name}
                    </label>
                  </li>
                </>
              ))}
            </ul>
            <div className='indicationinfo'>
              {/* <strong>(-)</strong> indicates <br />
              before release */}
            </div>
          </div>
        </div>
      </div>
      <div className='charttabel'>
        <table className='text-center'>
          <thead>
            <tr>
              <th className='goldbg'>Capture Date</th>
              <th className='goldbg'>Days Before Release</th>
              <th className='goldbg'>Score</th>
            </tr>
          </thead>
          <tbody>
            {linechartData.series[0] &&
              linechartData.series[0].data.map((item) => (
                <tr>
                  <td>{item.date}</td>
                  <td>{item.days}</td>
                  <td>{item.y.toFixed()}%</td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* <div className="charttablebox_head  charttblrow grid">
				  <div className='grid'>
					  <div className="headtxt goldbg">CaptureDate</div>
					  <div className="headtxt goldbg">DBR</div>
					  <div className="headtxt goldbg">Score</div>
				  </div>
				  <div className='grid'>
					  <div className="headtxt goldbg">CaptureDate</div>
					  <div className="headtxt goldbg">DBR</div>
					  <div className="headtxt goldbg">Score</div>
				  </div>
				  <div className='grid'>
					  <div className="headtxt goldbg">CaptureDate</div>
					  <div className="headtxt goldbg">DBR</div>
					  <div className="headtxt goldbg">Score</div>
				  </div>
			  </div>
			  <div className="charttblrow grid">
				  <div className='grid'>
					  <div>01-05-2023</div>
					  <div>205</div>
					  <div>22.39</div>
				  </div>
				  <div className='grid'>
					  <div>12-06-2023</div>
					  <div>163</div>
					  <div>21.6</div>
				  </div>
				  <div className='grid'>
					  <div>20-07-2023</div>
					  <div>125</div>
					  <div>21.67</div>
				  </div>
				  <div className='grid'>
					  <div>28-08-2023</div>
					  <div>86</div>
					  <div>23.06</div>
				  </div>
				  <div className='grid'>
					  <div>13-09-2023</div>
					  <div>70</div>
					  <div>24.97</div>
				  </div>
				  <div className='grid'>
					  <div>28-09-2023</div>
					  <div>55</div>
					  <div>29.14</div>
				  </div>
				  <div className='grid'>
					  <div>05-10-2023</div>
					  <div>48</div>
					  <div>32.05</div>
				  </div>
				  <div className='grid'>
					  <div>18-10-2023</div>
					  <div>35</div>
					  <div>36.8</div>
				  </div>
				  <div className='grid'>
					  <div>25-10-2023</div>
					  <div>28</div>
					  <div>40.68</div>
				  </div>
			  </div> */}
      </div>
    </>
  );
};

export default DetailAverness;
