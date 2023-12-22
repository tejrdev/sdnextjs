import React, { useEffect , useState } from 'react';

//import HomePageAds from '../../Homepage/HomePageAds';
//import './graph.css';
//import './comparechart.js';
// import './comparechart.css';
// import ApexCharts from 'apexcharts';
// const ApexCharts = dynamic(() => import('apexcharts'), {
//   ssr: false,
// });

const $ = require('jquery');

const Charttable = ({ data , charton}) => {
	//const [chartrun , setChartrun] = useState(charton);
	//console.log(charton)
	useEffect(() => {
		/* eslint-disable */

		let $$ = ($) => document.querySelector($);
		let $$$ = ($) => document.querySelectorAll($);

		const $ = require('jquery');

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
		$('.dataTables_info').css({
			display: 'none',
		});
		$('.printhide').css({
			visibility: 'hidden',
			height: '0',
			overflow: 'hidden',
		});

		$('.dataTable').wrap('<div class="datatable_wrap"/>');
		
		/*!data table*/

		let compMovieone,compMovietwo,makeDataone,makeDatathree,makeDatathreebase,makeDatafour,makeDatafourbase,goalsDatathreebase,goalsDatafourbase,makeDataonebase,goalsDataonebase,goalsDataoneweekly,goalsDatathreeweekly,goalsDatafourweekly;
		if ($$$('.seriesone').length) {
			makeDataonebase = JSON.parse($$('.seriesone').dataset.total);
		}
		if ($$$('.seriesone').length) {
			goalsDataonebase = JSON.parse($$('.seriesone').dataset.weekend);
		}
		if ($$$('.seriesone').length) {
			goalsDataoneweekly = JSON.parse($$('.seriesone').dataset.weekly);
		}
		let basemovie = $$('.moviename .chartlegend:first-child').dataset.text;
		if ($$$('.moviename .chartlegend').length > 1 && $$$('.chartdatafeed > div').length > 1) {
			compMovieone = $$('.moviename .chartlegend:nth-child(2)').dataset.text;
			if ($$$('.seriesthree').length) {
				makeDatathreebase = JSON.parse($$('.seriesthree').dataset.total);
			}
			if ($$$('.seriesthree').length) {
				goalsDatathreebase = JSON.parse($$('.seriesthree').dataset.weekend);
			}
			if ($$$('.seriesthree').length) {
				goalsDatathreeweekly = JSON.parse($$('.seriesthree').dataset.weekly);
			}
		} else {
			compMovieone = '';
			makeDatathreebase = [];
		}
		if ($$$('.moviename .chartlegend').length > 2 && $$$('.chartdatafeed > div').length > 2) {
			compMovietwo = $$('.moviename .chartlegend:nth-child(3)').dataset.text;
			if ($$$('.seriesfour').length) {
				makeDatafourbase = JSON.parse($$('.seriesfour').dataset.total);
			}
			if ($$$('.seriesfour').length) {
				goalsDatafourbase = JSON.parse($$('.seriesfour').dataset.weekend);
			}
			if ($$$('.seriesfour').length) {
				goalsDatafourweekly = JSON.parse($$('.seriesfour').dataset.weekly);
			}
		} else {
			compMovietwo = '';
			makeDatafour = [];
		}

		let goal = (goalnum, weekname, goalwidth) => [
			{
				name: weekname,
				value: goalnum,
				strokeWidth: goalwidth,
				strokeHeight: 2,
				//strokeLineCap: 'round',
				//strokeColor: '#707070'
				strokeColor: ' ',
			},
		];

		let weekinfo = (weekname) => {
			if ($$$('.seriesone').length) {
				makeDataone = [];
				makeDataonebase.map((num, i) => {
					makeDataone.push({
						x: 'week' + ' ' + i,
						y: num,
						goals: goal(goalsDataonebase[i], weekname, goalsDataoneweekly[i]),
					});
				});

				//console.log(makeDataone);
			}
			if ($$$('.seriesthree').length) {
				makeDatathree = [];
				makeDatathreebase.map((num, i) => {
					makeDatathree.push({
						x: 'week' + ' ' + i,
						y: num,
						goals: goal(goalsDatathreebase[i], weekname, goalsDatathreeweekly[i]),
					});
				});

				//console.log(makeDatathree);
			}
			if ($$$('.seriesfour').length) {
				makeDatafour = [];
				makeDatafourbase.map((num, i) => {
					makeDatafour.push({
						x: 'week' + ' ' + i,
						y: num,
						goals: goal(goalsDatafourbase[i], weekname, goalsDatafourweekly[i]),
					});
				});

				//console.log(makeDatafour);
			}
		};

		weekinfo('Weekend');

		var optimalColumnWidthPercent = 20 + 60 / (1 + 30 * Math.exp(-15 / 3));

		//console.log(makeDatathree , makeDatafour);
		let boxoptions = {
			series: [
				{
					name: basemovie,
					data: makeDataone,
				},
				{
					name: compMovieone,
					data: makeDatathree,
				},
				{
					name: compMovietwo,
					data: makeDatafour,
				},
			],
			chart: {
				id: 'boxchart',
				type: 'bar',
				height: 400,
				//stacked: true,
				toolbar: {
					show: false,
				},
			},
			plotOptions: {
				bar: {
					horizontal: false,
					dataLabels: {
						position: 'top',
						hideOverflowingLabels: true,
					},
				},
				line: {
					stroke: {
						seriesName: 'Average All Films',
						type: 'line',
						width: 5,
						colors: ['#000'],
					},
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
			colors: ['#E97C00', /* "#707070",*/ '#00B825', '#3E98FF'],
			stroke: {
				show: true,
				width: [2, 2, 2, 2],
				colors: ['#fff', /*"#707070", */ '#fff', '#fff'],
			},

			tooltip: {
				shared: true,
				intersect: false,
				followCursor: false,
				fixed: {
					enabled: false,
					position: 'topRight',
					offsetX: 50,
					offsetY: 0,
				},
				custom: function ({ series, seriesIndex, dataPointIndex, w }) {
					let seriesinfo_one = w.globals.initialSeries[0];
					let srtwo = $$$('.seriesthree').length;
					let srthree = $$$('.seriesfour').length;

					let seriesinfo_two, seriesdata, serioustwototaltip, tooltwo = '';
					if (srtwo > 0) {
						seriesinfo_two = w.globals.initialSeries[1];
					}

					let seriesinfo_three, seriousthreetotaltip, toolthree = '';
					if (srthree > 0) {
						seriesinfo_three = w.globals.initialSeries[2];
					}
					if (srtwo > 0) {
						seriesdata = w.globals.initialSeries[1].data[0];
					}
					//console.log( seriesinfo_three.data[dataPointIndex].goals[seriesIndex].strokeWidth,seriesinfo_two ,seriesinfo_three , seriesdata );
					let seriousonetotaltip = seriesinfo_one.data[dataPointIndex].y === 0 ? 'hide' : 'show';
					if (srtwo > 0) {
						serioustwototaltip = seriesinfo_two.data[dataPointIndex].y === 0 ? 'hide' : 'show';
					}
					if (srthree > 0) {
						seriousthreetotaltip = seriesinfo_three.data[dataPointIndex].y === 0 ? 'hide' : 'show';
					}
					//console.log(w.globals.colors);

					let toolone = '';

					if (makeDataonebase[dataPointIndex] > 0) {
						toolone =
							"<div class='series_infotoolbox " + seriousonetotaltip + " '>" +
							"<div class='colorbox' style='background-color:" + w.globals.colors[0] + "' ></div>" +
							"<h5 class='series_name'>" + seriesinfo_one.name + '</h5>' +
							'<div>' + 'Total To Date: $' + seriesinfo_one.data[dataPointIndex].y + 'M' + '</div>' +
							'<div>' + 'Weekend (3-Day): $' + seriesinfo_one.data[dataPointIndex].goals[seriesIndex].value + 'M' +
							'</div>' +
							'<div>' + 'Weekly (7-Day): $' + seriesinfo_one.data[dataPointIndex].goals[seriesIndex].strokeWidth + 'M' +
							'</div>' +
							'</div>';
					}
					if (makeDataonebase[dataPointIndex] === 0) {
						if (srtwo === 0 && srthree === 0) {
							toolone = 'Data Not available for' + '<br><strong>' + w.globals.initialSeries[0].name + '</strong>';
						}
					}
					//console.log(toolone);

					if (srtwo > 0) {
						tooltwo =
							"<div class='series_infotoolbox " + serioustwototaltip + " '>" +
							"<div class='colorbox' style='background-color:" + w.globals.colors[1] + "' ></div>" +
							"<h5 class='series_name'>" + seriesinfo_two.name + '</h5>' +
							'<div>' + 'Total To Date: $' + seriesinfo_two.data[dataPointIndex].y + 'M' + '</div>' +
							'<div>' + 'Weekend (3-Day): $' + seriesinfo_two.data[dataPointIndex].goals[seriesIndex].value + 'M' + '</div>' +
							'<div>' + 'Weekly (7-Day): $' + seriesinfo_two.data[dataPointIndex].goals[seriesIndex].strokeWidth + 'M' + '</div>' +
							'</div>';
					}

					if (srthree > 0) {
						toolthree =
							"<div class='series_infotoolbox " +	seriousthreetotaltip +	" '>" +
							"<div class='colorbox' style='background-color:" +	w.globals.colors[2] +	"' ></div>" +
							"<h5 class='series_name'>" +	seriesinfo_three.name +	'</h5>' +
							'<div>' +	'Total To Date: $' +	seriesinfo_three.data[dataPointIndex].y +	'M' + '</div>' +
							'<div>' +'Weekend (3-Day): $' +seriesinfo_three.data[dataPointIndex].goals[seriesIndex].value +'M' + '</div>' +
							'<div>' + 'Weekly (7-Day): $' + seriesinfo_three.data[dataPointIndex].goals[seriesIndex].strokeWidth + 'M' + '</div>' +
							'</div>';
					}

					let tooltipbox;

					tooltipbox =
						'<div class="charttool_box">' +
						"<div class='week_name'>" + w.globals.labels[dataPointIndex] + '</div>' +
						"<div class='series_infotool'>" + toolone + tooltwo + toolthree + '</div>' +
						'</div>';

					//console.log(makeDataonebase[dataPointIndex])
					return tooltipbox;
				},
			},
			xaxis: {
				categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7-Remaining'],
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
					labels: {
						formatter: (value) => {
							let valuenum = 0;
							if (typeof value !== 'undefined') {
								valuenum = value.toFixed(0);
							}
							return valuenum;
						},
					},
				},
			],
			legend: {
				position: 'top',
				offsetX: 40,
				show: false,
			},
		};

		/*console.log(boxoptions.series)*/

		let fadeoption = (e) => {
			let serises = e.target.closest('li').dataset.text.replaceAll(' ', 'x');
			let serisesnamefact = serises.replaceAll('!', 'x');
			let serisesname = serisesnamefact.replaceAll(':', 'x');
			e.target.closest('li').classList.toggle('active');
			let clickseries = e.target.closest('li').dataset;
			$$('.apexcharts-series[seriesName="' + serisesname + '"]').classList.toggle('legend-mouseover-inactive');
		};

		let legends = $$$('.moviecomper_chart .moviename ul li label');
		for (let legend of legends) {
			legend.addEventListener('click', fadeoption);
		}

		if ($$$('.moviename .chartlegend').length < 2) {
			$$('.boxofficedetail_chart .comparechart_box ').style.maxWidth = '700px';
		}

		let boxchart = new ApexCharts($$('#boxchart'), boxoptions);
		boxchart.render();

		let activeMovies = () => {
			let legends = $$$('.moviename ul li');
			for (let legend of legends) {
				legend.classList.add('active');
			}
		};

		let chartdatas = (e) => {
			e.target.parentElement.parentElement.querySelectorAll('li').forEach((n) => n.classList.remove('active'));
			e.target.parentElement.classList.add('active');
		};
	},);
	return (
		<>
			<section className="boxofficedetail_chart sd_adv_data">
				<div className="container">
					<div className="top_txt">{/* <h5 className="dottitle">US & Canada</h5> */}</div>
					<div className="moviecomper_chart">
						<div className="charnav df fww">
							<div className="moviename">
								<ul className=" df fww">
									{data.chart.map((items, index) => {
										return (
											<li className="active chartlegend" data-text={items.title} key={index}>
												<label htmlFor="">{items.title}</label>
											</li>
										);
									})}
								</ul>
							</div>
							<div className="weekdata  hide">
								<ul className=" df fww">
									<li className="boxweekend_data">
										<label htmlFor="">Weekend</label>
									</li>
									<li className="boxweekly_data">
										<label htmlFor="">Weekly </label>
									</li>
									<li className="boxtotal_data active">
										<label htmlFor="">Total</label>
									</li>
								</ul>
							</div>
						</div>
						<div className="chartdatafeed">
							{data.chart.map((items, index) => {
								if (index == 0) {
									return <div className="seriesone" data-weekend={'[' + items.w_end + ']'} data-weekly={'[' + items.w_ly + ']'} data-total={'[' + items.tot_ly + ']'} key={index}></div>;
								} else {
									return (
										<div
											className={index == 1 ? 'seriesthree' : 'seriesfour'}
											data-weekend={'[' + items.w_end + ']'}
											data-weekly={'[' + items.w_ly + ']'}
											data-total={'[' + items.tot_ly + ']'}
											key={index}
										></div>
									);
								}
							})}
						</div>
						<div className="comparechart_box pvr">
							<div className="milian">($1m)</div>
							<div id="boxchart"></div>
						</div>
						<div className="fdtable">
							<table className="responsive dataTable">
								<thead>
									<tr>
										<th className="border-0">&nbsp;</th>
										<th colSpan="2">Weekend</th>
										<th colSpan="2">Weekly</th>
										<th colSpan="2">Locations</th>
										<th colSpan="2" className="border-0">
											&nbsp;
										</th>
									</tr>
									<tr>
										<th data-title="Week">Week</th>
										<th data-title="Weekend Gross $">Gross $</th>
										<th data-title="Weekend % Chg.">% Chg.</th>
										<th data-title="Weekly Gross $">Gross $</th>
										<th data-title="Weekly % Chg.">% Chg.</th>
										<th data-title="Locations #">#</th>
										<th data-title="Locations Chg.">Chg.</th>
										<th data-title="Average $"> Average $ </th>
										<th data-title="to-date $"> to-date $ </th>
									</tr>
								</thead>
								<tbody>
									{data.boxoffice_films_data.table_data.map((items, index) => {
										return (
											<React.Fragment key={index}>
												<tr dangerouslySetInnerHTML={{ __html: items }}></tr>
											</React.Fragment>
										);
									})}
									<tr>
										<td colSpan="2" className="border-0">
											&nbsp;
										</td>
										<td>
											<strong>Total</strong>
										</td>
										<td>{data.boxoffice_films_data.table_total}</td>
										<td colSpan="5" className="border-0">
											&nbsp;
										</td>
									</tr>
								</tbody>
							</table>
							<p className="text-center"> Total Includes Full Week Grosses for Weeks</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Charttable;
