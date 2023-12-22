import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import ticket_img from "../public/images/ticketride.png";
import playicoimg from "../public/images/playicov2.png";

import Headlines from "../components/Homepage/Headlines";
import FilmData from "../components/Homepage/FilmData";
import HomeSlider from "../components/Homepage/HomeSlider";
import InTheatres from "../components/Homepage/InTheatres";
//import Podcast from './Podcast';
// import Data from '../../data.json';
import HomePageAds from "../components/Homepage/HomePageAds";
import Polls from "../components/Homepage/Polls";
import ZipperMedia from "../components/Homepage/ZipperMedia";
import Subscriber from "../components/Homepage/Subscriber";
import FilmDataMedia from "../components/Homepage/FilmDataMedia";
import Videos from "../components/Homepage/Videos";
import Directory from "../components/Homepage/Directory";
import NowInTheatres from "../components/Homepage/NowInTheatres";
import News from "../components/Homepage/News";

import Insideinfo from '@/components/Products/InsideInfo'

import Loader from "../components/Loader";
const $ = require("jquery");

export async function getStaticProps() {
	// Fetch data from external API
	const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK);
	const data = await res.json();

	// Homeppage static data
	let homeAPIData = await fetch(process.env.NEXT_PUBLIC_SD_API + "/api_home/?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN);
	homeAPIData = await homeAPIData.json();

	// load boxoffice data
	let boxOfficeData = await fetch(process.env.NEXT_PUBLIC_SD_API + "/home_boxoffice/?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN);
	boxOfficeData = await boxOfficeData.json();

	//genre page   
	let genretitle = await fetch(
		process.env.NEXT_PUBLIC_SD_API + '/movie-genre/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
	);
	genretitle = await genretitle.json();

	return { props: { data, homeAPIData, boxOfficeData , genretitle}, revalidate: 20, };
}

export default function HomePage({ data, homeAPIData, boxOfficeData , genretitle }) {
	const GenrelistData = genretitle.genre_list;
	const [IPAddress, setIPAddress] = useState("");
	// const [boxOfficeCls, setBoxOfficeCls] = useState("");
	// const [homepageDataLoaded, setHomepageDataLoaded] = useState(false);
	// const [homepageData, setHomepageData] = useState([]);
	// const [latestBoxOfficeDataLoaded, setLatestBoxOfficeDataLoaded] = useState(false);
	// const [latestBoxOfficeData, setLatestBoxOfficeData] = useState([]);
	const [zipperDataLoaded, setZipperDataLoaded] = useState(false);
	const [zipperData, setzipperData] = useState([]);
	const [homeVideoDataLoaded, setHomeVideoDataLoaded] = useState(false);
	const [homeVideoData, setHomeVideoData] = useState([]);
	const [homeDirectoryDataLoaded, setHomeDirectoryDataLoaded] = useState(false);
	const [homeDirectoryData, setHomeDirectoryData] = useState([]);
	const [nowInTheatresDataLoaded, setNowInTheatresDataLoaded] = useState(false);
	const [nowInTheatresData, setNowInTheatresData] = useState([]);
	const [newsDataLoaded, setNewsDataLoaded] = useState(false);
	const [newsData, setNewsData] = useState([]);
	const [pollsDataLoaded, setPollsDataLoaded] = useState(false);
	const [pollsData, setPollsData] = useState([]);

	useEffect(() => {
		// loadHomepageData();
		// loadLatestBoxOfficeData();
		loadZipperData();
		loadHomeVideos();
		loadHomeDirectory();
		loadNowInTheatres();
		loadNews();
		loadPolls();
	}, []);

	
	const loadZipperData = () => {
		axios.get(process.env.NEXT_PUBLIC_SD_API + "/non_stop_news/?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN)
			.then((res) => {
				setzipperData(res.data.non_stop_news);
				setZipperDataLoaded(true);
			})
			.catch((err) => console.log(err));
	};
	const loadHomeVideos = () => {
		axios.get(process.env.NEXT_PUBLIC_SD_API + "/home_video/?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN)
			.then((res) => {
				setHomeVideoData(res.data);
				setHomeVideoDataLoaded(true);
			})
			.catch((err) => console.log(err));
	};
	const loadHomeDirectory = () => {
		axios.get(process.env.NEXT_PUBLIC_SD_API + "/home_directory/?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN)
			.then((res) => {
				setHomeDirectoryData(res.data);
				setHomeDirectoryDataLoaded(true);
			})
			.catch((err) => console.log(err));
	};
	const loadNowInTheatres = () => {
		axios.get(process.env.NEXT_PUBLIC_SD_API + "/home_now_in_theatres/?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN)
			.then((res) => {
				setNowInTheatresData(res.data);
				setNowInTheatresDataLoaded(true);
			})
			.catch((err) => console.log(err));
	};
	const loadNews = () => {
		axios.get(process.env.NEXT_PUBLIC_SD_API + "/home_news/?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN)
			.then((res) => {
				setNewsData(res.data);
				setNewsDataLoaded(true);
			})
			.catch((err) => console.log(err));
	};
	const loadPolls = () => {
		const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
		let string_data = uint32.toString(16);
		let get_user_ips = localStorage.getItem("user_ip");
		if (get_user_ips) {
			setIPAddress(get_user_ips);
		} else {
			localStorage.setItem("user_ip", "User-" + string_data);
			get_user_ips = "User-" + string_data;
		}

		axios.get(process.env.NEXT_PUBLIC_SD_API + "/api_home/poll_quiz.php/?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN + "&ip_address=" + get_user_ips)
			.then((res) => {
				setPollsData(res.data);
				setPollsDataLoaded(true);
			})
			.catch((err) => console.log(err));
	};
	
	return (
		<>
			<Head>
				{data.children[0].children.map((item, index) => {
					const attributes = item.tag.toUpperCase();

					switch (attributes) {
						case "TITLE":
							return <title key={index}>{item.html}</title>;
						case "META":
							const name = item.name || "";
							if (name !== "") {
								return <meta key={index} name={item.name} content={item.content} />;
							} else {
								return <meta key={index} property={item.property} content={item.content} />;
							}
						case "LINK":
							return <link key={index} rel={item.rel} href={item.href} />;
						case "SCRIPT":
							return <script key={index} type={item.type} class={item.class} dangerouslySetInnerHTML={{ __html: item.html }}></script>;
						default:
							return null;
					}
				})}
			</Head>
			<div id='page' className='site'>
				<div className='site-inner'>
					<div id='content' className='site-content'>
						<div className='main-wrap'>
							<Insideinfo />
							{/* {homepageDataLoaded ? ( */}
							<main className='main-content'>
								<section className='bannerbox'>
									<div className='container'>
										<div className='bannerboxtop_in df fww'>
											<div className='bnrbox_left'>
												<HomeSlider data={homeAPIData.top_slider} />
												<div className='bof_comingbox df fww just-between'>
													<div className='bofcomedata'>
														<div className='boftable'>
															<input type='hidden' value='2021' id='h_p_select_year' />
															<input type='hidden' value='21' id='h_p_select_week' />
															<ul id='home_page_boxoffice_data' className=''>
																<li className='bofrow df fww just-between'>
																	<h5>
																		<Link href='/film-data'>Latest Box Office</Link>
																		<i className='far fa-angle-right'></i>
																	</h5>
																	<p>
																		<em>{boxOfficeData.boxoffice_title}</em>
																	</p>
																</li>
																<FilmData data={boxOfficeData.boxoffice_data} tag={"latest"} />
															</ul>
														</div>
													</div>

													<div className='bofcomedata'>
														<div className='boftable'>
															<input type='hidden' value='2021' id='h_p_select_year' />
															<input type='hidden' value='21' id='h_p_select_week' />
															<ul id='home_page_boxoffice_data' className=''>
																<li className='bofrow df fww just-between'>
																	<h5>
																		<Link href='/6-weeks'>Upcoming Wide Releases</Link>
																		<i className='far fa-angle-right'></i>
																	</h5>
																</li>
																<FilmData data={boxOfficeData.boxoffice_upcomming} tag={"upcoming"} />
															</ul>
														</div>
													</div>
												</div>
											</div>
											<div className='bnrbox_right df fww'>
												<div className='bnrbox_telent'>
													<div className='top_txt'>
														<h5>
															<Link href='/talent' title='Featured Talent'>
																Featured Talent <i className='far fa-angle-right'></i>
															</Link>
														</h5>
													</div>
													<div className='feature_telent df fww'>
														{homeAPIData.featured_talent &&
															homeAPIData.featured_talent.map((titems, tid) => {
																return (
																	<div className='catcrewcol' key={tid}>
																		<ul className='castcrew_people'>
																			<li>
																				<Link href={titems.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, "")}>
																					<div className='cast_pic bgimage' style={{ backgroundImage: "url(" + titems.img + ")" }}></div>
																					<div className='cast_info'>
																						<h5>{titems.name}</h5>
																					</div>
																				</Link>
																			</li>
																		</ul>
																	</div>
																);
															})}
													</div>
												</div>

												<div className='bnrbox_rightinner'>
													<div className='homtheatr_box'>
														<div className='top_txt'>
															<h5>
																<Link href='/film-data/releases-by-week/' title='In Theatres'>
																	Now in Theatres <i className='far fa-angle-right'></i>
																</Link>
															</h5>
														</div>
														<div className='homtheaterbox_info df fww'>
															<InTheatres data={homeAPIData.in_theatres} />
														</div>
													</div>
													<div className='homtheatr_box'>
														<div className='top_txt'>
															<h5>
																<a href='https://themoviehub.com/' title='Watch at Home' target='_blank' rel='noreferrer'>
																	Watch at Home
																	<i className='far fa-angle-right'></i>
																</a>
															</h5>
														</div>
														<div className='homtheaterbox_info df fww'>
															<InTheatres data={homeAPIData.streaming} />
														</div>
													</div>												
												</div>
												<div className='bnrbox_rightinner'>													
													<div className='featurereview'>
														<div className='top_txt'>
															<h5>
																<a href='/critics-reviews' title='Critics’ Reviews'>
																	Movie Reviews <i className='far fa-angle-right'></i>{" "}
																</a>
															</h5>
														</div>
														{homeAPIData.featured_reviews &&
															homeAPIData.featured_reviews.map((titems, tid) => {
																if (tid === 0) {
																	return (
																		<div className='feater_reviewbox' data={tid} key={tid}>
																			<a href={titems.link} target='_blank' title={titems.name}>
																				<figure className='pvr'>
																					<img src={titems.img} alt={titems.name} className='objctimg_box' />
																				</figure>
																				<h5>{titems.name}</h5>
																				<p>{titems.content.slice(0, 90)}</p>
																			</a>
																		</div>
																	);
																} else {
																	return (
																		<div className='feater_reviewbox' data={tid} key={tid}>
																			<a href={titems.link} target='_blank' title={titems.name}>
																				<h5>{titems.name}</h5>
																			</a>
																		</div>
																	);
																}
															})}
													</div>
												</div>
											</div>
										</div>
									</div>
								</section>
								<section className='zipper_poll '>
									<div className='container'>
										<div className='zipperpollin df fww '>
											<div className='prodcastads df fww just-between'>
												<HomePageAds cls='add_300' format='rectangle' />

												<div className='prodcastinfo '>
													<div className='prodcastbox_in df fww'>
														<div className='optbxtitle df fww just-between'>
															<h5>
																Podcast <i className='far fa-angle-right'></i>
															</h5>
														</div>
														<div className='ticketmedia text-center'>
															<a className='popvid df fww' href={homeAPIData.youtube_video_url}>
																<figure className='pvr'>
																	<img src={homeAPIData.podcast_image} alt={homeAPIData.pod_title} />
																	<Image className='playico' src={playicoimg} width='25' alt='play icon' />
																</figure>
																<div className='ticketlisten'>
																	<Image className='ticketride' src={ticket_img} alt=' ' />
																	<p className='eptime'>
																		<span>{homeAPIData.pod_short_title}</span>
																		<span>{homeAPIData.pod_short_date}</span>
																	</p>
																	<span className='popvid btn'>listen</span>
																</div>
															</a>
															<div className='prodcast_detail text-center'>
																<h6>{homeAPIData.pod_title}</h6>
																{/*<p>{homeAPIData.pod_short_title}</p>*/}
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className='zipperquize df fww'>
												{pollsDataLoaded && pollsData.poll_quiz_display === "d_poll" ? (
													<div className='pollads'>
														<Polls data={pollsData.polls} tag='poll' ip={IPAddress} />
													</div>
												) : (
													""
												)}

												{pollsDataLoaded && pollsData.poll_quiz_display === "d_quiz" ? (
													<div className='quizebox'>
														{" "}
														<Polls data={pollsData.quiz} tag='quiz' ip={IPAddress} />
													</div>
												) : (
													""
												)}

												{zipperDataLoaded && <ZipperMedia data={zipperData} />}
											</div>
										</div>
									</div>
								</section>
								<section className='home_subscribe'>
									<Subscriber />
								</section>
								
								<section className='moviedb'>
									<div className='container'>
										<div className='seclinespace'>
											<div className='top_txt df fww just-between'>
												<div className='secnav df fww'>
													<h2>
														<Link href='/film-data' title='Film Data'>
															Film Data <i className='fal fa-angle-right'></i>
														</Link>
													</h2>
													<ul className='distcat_name df fww'>
														<li>
															<Link href='/film-data/box-office-results' title='Box Office'>
																Box Office
															</Link>
														</li>
														<li>
															<Link href='/film-data/releases-by-week' title='Release Schedules'>
																Release Schedules
															</Link>
														</li>
														<li>
															<Link href='/film-data/release-changes' title='Release Changes'>
																Release Changes
															</Link>
														</li>
													</ul>
												</div>
												
											</div>
										</div>
										<div className='moviedbbox df fww just-between'>										
											
											{boxOfficeData.boxoffice_data && 
												<div className='moviedbdata'>
													<div className="moviedbdata_title df fww just-between">
														<h5 className="m-0"><a href="/film-data/box-office-results/">Box Office</a><i className='far fa-angle-right'></i></h5>
														{boxOfficeData.boxoffice_title && <p className="m-0">{boxOfficeData.boxoffice_title}</p>}
													</div>
													<ul className="grid">
														{boxOfficeData.boxoffice_data.slice(0, 4).map((iteminfo, index) =>
																<li className='bofrow' key={index}>
																	<a href={iteminfo.permalink}>
																		<figure className="pvr">
																			<Image src={iteminfo.poster_thumbnail} width="190" height="275" priority={true} alt="" className="objctimg_box" />
																		</figure>
																		<p className="m-0">
																			{iteminfo.title} 
																			{iteminfo.weekend_gross_home && <span>{'$'+ iteminfo.weekend_gross_home}</span>}
																		</p>
																	</a>
																</li>
															)}
													</ul>
												</div>
												}
												{boxOfficeData.boxoffice_upcomming && 
												<div className='moviedbdata'>
													<div className="moviedbdata_title df fww just-between">
														<h5 className="m-0"><a href="/film-data/releases-6-weeks/">Coming Soon</a><i className='far fa-angle-right'></i></h5>														
													</div>
													<ul className="grid">
														{boxOfficeData.boxoffice_upcomming.slice(0, 4).map((iteminfo, index) =>
																<li className='bofrow' key={index}>
																	<a href={iteminfo.link}>
																		<figure className="pvr">
																			<Image src={iteminfo.poster_thumbnail} width="190" height="275" priority={true} alt="" className="objctimg_box" />
																		</figure>
																		<p className="m-0">
																			{iteminfo.title}																			
																		</p>
																	</a>
																</li>
															)}
													</ul>
												</div>
												}
											 
										</div>

										<div className='homfilmdata_btm df fww	'>
											<div className="homegenre homfilm_media hmgrybg">											
												<div className="moviedbdata_title df fww just-between">
													<h5 className="m-0"><Link href={genretitle.page_link} className="">{genretitle.page_title}</Link><i className='far fa-angle-right'></i></h5>
													{<p className="m-0 uppercase">
														<Link href={genretitle.page_link} className="">
															<u>View More</u>
														</Link>
													</p>}
												</div>
												<div className="homegenrebox genrelistbox grid gap16">
												{GenrelistData.slice(0,8).map((item, index) => 
													<div className="homegenre_item genrelistitem" key={index}>
														<Link href={genretitle.page_link + item.select_genre}>
															<figure className="pvr">
																<Image src={item.genre_image} alt="" className="objctimg_box" width={175} height={110}/>
																<figcaption className="genmiddlename">{item.select_genre}</figcaption>
															</figure>
															</Link>
													</div>
													)}
												</div>
											</div>
											<div className='homfilm_scupdate df fww'>
												<div className='homfilm_scupdate_col'>
													<div className='headlinesbox'>
														
														<div className='top_txt'>
															<h5>
																Quick Links <i className='far fa-angle-right'></i>
															</h5>
														</div>
														<Headlines id='quick_links' data={boxOfficeData.schedules} tag='quick_links' />
														
														 {/* <HomePageAds cls='add_300' format='rectangle' /> */}
													</div>
												</div>
											</div>
										</div>
									</div>
								</section>
								<section className='homvideos'>{homeVideoDataLoaded && <Videos data={homeVideoData} />}</section>
								<section className='homdirectory'>{homeDirectoryDataLoaded && <Directory data={homeDirectoryData} />}</section>

								<section className='nowshow'>
									<div className='container'>
										<div className='seclinespace'>
											<div className='top_txt df fww just-between'>
												<div className='secnav df fww'>
													<h2>
														<Link href='/film-data/releases-by-week/' title='In Theatres'>
															Now in Theatres <i className='far fa-angle-right'></i>
														</Link>
													</h2>
												</div>
											</div>
											{nowInTheatresDataLoaded && <NowInTheatres data={nowInTheatresData.in_theatres} />}
										</div>
									</div>
								</section>

								<section className='nowshow'>
									<div className='container'>
										<div className='seclinespace'>
											<div className='top_txt df fww just-between'>
												<div className='secnav df fww'>
													<h2>
														<a href='https://themoviehub.com/' title='Watch at Home' target='_blank' rel='noreferrer'>
															Watch at Home
															<i className='far fa-angle-right'></i>
														</a>
													</h2>
												</div>
											</div>
											{nowInTheatresDataLoaded && <NowInTheatres data={nowInTheatresData.streaming} />}
										</div>
									</div>
								</section>

								<section className='homnews'>{newsDataLoaded && <News data={newsData} />}</section>
							</main>
							{/* ) : (
                <Loader />
              )} */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
