import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Detailintrest = ({ data }) => {
  //sort dates in asc order
  data.series[0].data.sort((a, b) => (a.days < b.days ? -1 : 1));

  let maxone = [],
    maxY = [];
  data.series.map((item, i) => {
    item.data.map((initem, j) => {
      maxone.push(initem.days);
      maxY.push(initem.y);
    });
  });
  let xmax = Math.max(...maxone) + 20;
  let ymax = Math.max(...maxY) + 5;
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
    //       {x: -21, y: 2239},
    //       {x: -17, y: 2160},
    //       {x: -14, y: 2167},
    //       {x: -12, y: 2306},
    //       {x: -10, y: 2497} ,
    //       {x: -9, y: 2914},
    //       {x: -8, y: 3205},
    //       {x: -4, y: 3680},
    //       ]
    //    },
    //    {
    //      name: "Five Nights at Freddy's",
    //      data: [
    //       {x: -24,y: 2686},
    //       {x: -22,y: 2947},
    //       {x: -20,y: 2965},
    //       {x: -19,y: 3228},
    //       {x: -18,y: 3080},
    //       {x: -15,y: 3375},
    //       {x: -14,y: 3402},
    //       {x: -13,y: 3693},
    //       {x: -12,y: 3651},
    //       {x: -10,y: 3774},
    //       {x: -9,y: 4127},
    //       {x: -8,y: 4499},
    //       {x: -7,y: 4743},
    //       {x: -5,y: 4721},
    //       {x: -4,y: 4755},
    //       {x: -2,y: 5002}]
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
          min: 0,
          max: ymax,
          labels: {
            show: true,
            formatter: function (value) {
              return value.toFixed();
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

  return (
    <>
      <div className='detail_linechart df fww w100'>
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
                  <td>{item.y.toFixed()}</td>
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

export default Detailintrest;
