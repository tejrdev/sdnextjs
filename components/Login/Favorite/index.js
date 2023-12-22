import React, { useState, useEffect } from 'react';
import AMC from '../images/amc-2.png';
import JON from '../images/jon.png';
import FOURBTS from '../images/fourabtsld.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
//import '../css/favorite.css';
import axios from 'axios';
const $ = require('jquery');
const LOGGED_EMAIL = localStorage.getItem('email');
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const Favorite = () => {
  const [movieData, setMovieData] = useState([]);
  const [actorList, setActorList] = useState([]);
  const [searchActor, setSearchActor] = useState();
  useEffect(() => {
    listMovies();
    getTheatreData();
    listActors();
  }, []);
  const SliderSettings = {
    slidesToShow: 6,
    speed: 300,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const SliderSettingTheatre = {
    slidesToShow: 2,
    speed: 300,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 8000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const SliderSettingNews = {
    slidesToShow: 3,
    speed: 300,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 8000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  $('.watchbtn .eatchoptionbtn').click(function () {
    $(this).next().slideToggle();
    $(this).parent().toggleClass('watchactive');
  });

  $('.viewmovrebtn.editbtn .btn').click(function () {
    $(this).parent().next('.favaddinput').slideToggle();
    $(this).parent().toggleClass('editopen');
  });

  const getTheatreData = async () => {
    var fav_theatre_url = API_URL + '/login/favorites.php';
    await axios
      .get(fav_theatre_url, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          process: 'FAVORITE',
          type: window.btoa('theatre'),
          action: window.btoa('POST'),
        },
      })
      .then((res) => {
        var objectRelated = res.data.theator_list;
        var mapValues = Object.values(objectRelated);

        if (mapValues.length > 0) {
          setMovieData(mapValues);
        }
      })
      .catch((err) => console.log('theatre FAVORITE error ', err));
  };

  const listActors = async () => {
    var profile_saveurl = API_URL + '/login/favorites.php';
    await axios
      .get(profile_saveurl, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          s_text: window.btoa('blank'),
          type: window.btoa('actors'),
        },
      })
      .then((res) => {
        var objectRelated = res.data.talent;
        var mapValues = Object.values(objectRelated);
        var favCheck = mapValues[0]['fav'];
        var favActorsIds = mapValues[0]['fav_list'];

        setActorList(mapValues);
      })
      .catch((err) => console.log('Actors lists error ', err));
  };

  const listMovies = async () => {
    var profile_saveurl = API_URL + '/login/favorite_movies.php';
    await axios
      .get(profile_saveurl, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          s_text: window.btoa('blank'),
        },
      })
      .then((res) => {})
      .catch((err) => console.log('Movies lists error ', err));
  };

  return (
    <>
      <section className="page_intro">
        <div className="container">
          <div className="favpagetitle">
            <h1>Thaddeus' Favorites</h1>
            <p>
              Note: Filled{' '}
              <span className="redtxt">
                <i className="fas fa-heart"></i>
              </span>{' '}
              heart means the title or content is marked as favorite and unfilled heart{' '}
              <span>
                <i className="far fa-heart"></i>
              </span>{' '}
              means <br />
              that title or content is not marked as favorite and is recommended by screendollars{' '}
            </p>
          </div>
        </div>
      </section>

      <section className="favmovies nowshowing toplinesec ">
        <div className="container">
          <div className="top_txt df fww just-between">
            <h2>
              Movies <i className="fal fa-angle-right"></i>
            </h2>
            <div className="viewmovrebtn editbtn">
              <a className="btn goldbtn editbtnbox">Edit</a>
              <a className="btn goldbtn savebtnbox">Save</a>
            </div>
            <div className="favaddinput">
              <input type="text" placeholder="Enter Movie Name" list="favmoviename1" />
              <button className="btn goldbtn">add to favorite</button>
            </div>
          </div>
          <div className="nowshow_sliderbox">
            <Slider {...SliderSettings} className="nowshow_slider roundslickarrow">
              <div className="nowshow_item">
                <div className="nowshow_iteminner">
                  <figure className="pvr">
                    <a>
                      <img src={FOURBTS} alt="" className="objctimg_box" />
                    </a>
                  </figure>
                  <div className="nowshow_info">
                    <h5>
                      <a>
                        F9: The Fast Saga{' '}
                        <span className="redtxt favheart">
                          <i className="fas fa-heart"></i>
                        </span>
                      </a>
                    </h5>
                    <div className="pghr df fww just-between">
                      <div className="rating">PG-13</div>
                      <time>2h 23m</time>
                    </div>
                  </div>
                  <div className="watchbtn">
                    <span className="eatchoptionbtn">Watch Options</span>
                    <ul>
                      <li>
                        <a>Find Showtimes</a>
                      </li>
                      <li>
                        <a>Watch Now</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="nowshow_item">
                <div className="nowshow_iteminner">
                  <figure className="pvr">
                    <a>
                      <img src={FOURBTS} alt="" className="objctimg_box" />
                    </a>
                  </figure>
                  <div className="nowshow_info">
                    <h5>
                      <a>
                        F9: The Fast Saga{' '}
                        <span className="redtxt favheart">
                          <i className="fas fa-heart"></i>
                        </span>
                      </a>
                    </h5>
                    <div className="pghr df fww just-between">
                      <div className="rating">PG-13</div>
                      <time>2h 23m</time>
                    </div>
                    <div className="watchbtn">
                      <span className="eatchoptionbtn">Watch Options</span>
                      <ul>
                        <li>
                          <a>Find Showtimes</a>
                        </li>
                        <li>
                          <a>Watch Now</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nowshow_item">
                <div className="nowshow_iteminner">
                  <figure className="pvr">
                    <a>
                      <img src={FOURBTS} alt="" className="objctimg_box" />
                    </a>
                  </figure>
                  <div className="nowshow_info">
                    <h5>
                      <a>
                        F9: The Fast Saga{' '}
                        <span className="favheart">
                          <i className="far fa-heart"></i>
                        </span>
                      </a>
                    </h5>
                    <div className="pghr df fww just-between">
                      <div className="rating">PG-13</div>
                      <time>2h 23m</time>
                    </div>
                    <div className="watchbtn">
                      <span className="eatchoptionbtn">Watch Options</span>
                      <ul>
                        <li>
                          <a>Find Showtimes</a>
                        </li>
                        <li>
                          <a>Watch Now</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nowshow_item">
                <div className="nowshow_iteminner">
                  <figure className="pvr">
                    <a>
                      <img src={FOURBTS} alt="" className="objctimg_box" />
                    </a>
                  </figure>
                  <div className="nowshow_info">
                    <h5>
                      <a>
                        F9: The Fast Saga{' '}
                        <span className="favheart">
                          <i className="far fa-heart"></i>
                        </span>
                      </a>
                    </h5>
                    <div className="pghr df fww just-between">
                      <div className="rating">PG-13</div>
                      <time>2h 23m</time>
                    </div>
                    <div className="watchbtn">
                      <span className="eatchoptionbtn">Watch Options</span>
                      <ul>
                        <li>
                          <a>Find Showtimes</a>
                        </li>
                        <li>
                          <a>Watch Now</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nowshow_item">
                <div className="nowshow_iteminner">
                  <figure className="pvr">
                    <a>
                      <img src={FOURBTS} alt="" className="objctimg_box" />
                    </a>
                  </figure>
                  <div className="nowshow_info">
                    <h5>
                      <a>
                        F9: The Fast Saga{' '}
                        <span className="favheart">
                          <i className="far fa-heart"></i>
                        </span>
                      </a>
                    </h5>
                    <div className="pghr df fww just-between">
                      <div className="rating">PG-13</div>
                      <time>2h 23m</time>
                    </div>
                    <div className="watchbtn">
                      <span className="eatchoptionbtn">Watch Options</span>
                      <ul>
                        <li>
                          <a>Find Showtimes</a>
                        </li>
                        <li>
                          <a>Watch Now</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nowshow_item">
                <div className="nowshow_iteminner">
                  <figure className="pvr">
                    <a>
                      <img src={FOURBTS} alt="" className="objctimg_box" />
                    </a>
                  </figure>
                  <div className="nowshow_info">
                    <h5>
                      <a>
                        F9: The Fast Saga{' '}
                        <span className="favheart">
                          <i className="far fa-heart"></i>
                        </span>
                      </a>
                    </h5>
                    <div className="pghr df fww just-between">
                      <div className="rating">PG-13</div>
                      <time>2h 23m</time>
                    </div>
                    <div className="watchbtn">
                      <span className="eatchoptionbtn">Watch Options</span>
                      <ul>
                        <li>
                          <a>Find Showtimes</a>
                        </li>
                        <li>
                          <a>Watch Now</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nowshow_item">
                <div className="nowshow_iteminner">
                  <figure className="pvr">
                    <a>
                      <img src={FOURBTS} alt="" className="objctimg_box" />
                    </a>
                  </figure>
                  <div className="nowshow_info">
                    <h5>
                      <a>
                        F9: The Fast Saga{' '}
                        <span className="favheart">
                          <i className="far fa-heart"></i>
                        </span>
                      </a>
                    </h5>
                    <div className="pghr df fww just-between">
                      <div className="rating">PG-13</div>
                      <time>2h 23m</time>
                    </div>
                    <div className="watchbtn">
                      <span className="eatchoptionbtn">Watch Options</span>
                      <ul>
                        <li>
                          <a>Find Showtimes</a>
                        </li>
                        <li>
                          <a>Watch Now</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nowshow_item">
                <div className="nowshow_iteminner">
                  <figure className="pvr">
                    <a>
                      <img src={FOURBTS} alt="" className="objctimg_box" />
                    </a>
                  </figure>
                  <div className="nowshow_info">
                    <h5>
                      <a>
                        F9: The Fast Saga{' '}
                        <span className="favheart">
                          <i className="far fa-heart"></i>
                        </span>
                      </a>
                    </h5>
                    <div className="pghr df fww just-between">
                      <div className="rating">PG-13</div>
                      <time>2h 23m</time>
                    </div>
                    <div className="watchbtn">
                      <span className="eatchoptionbtn">Watch Options</span>
                      <ul>
                        <li>
                          <a>Find Showtimes</a>
                        </li>
                        <li>
                          <a>Watch Now</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nowshow_item">
                <div className="nowshow_iteminner">
                  <figure className="pvr">
                    <a>
                      <img src={FOURBTS} alt="" className="objctimg_box" />
                    </a>
                  </figure>
                  <div className="nowshow_info">
                    <h5>
                      <a>
                        F9: The Fast Saga{' '}
                        <span className="favheart">
                          <i className="far fa-heart"></i>
                        </span>
                      </a>
                    </h5>
                    <div className="pghr df fww just-between">
                      <div className="rating">PG-13</div>
                      <time>2h 23m</time>
                    </div>
                    <div className="watchbtn">
                      <span className="eatchoptionbtn">Watch Options</span>
                      <ul>
                        <li>
                          <a>Find Showtimes</a>
                        </li>
                        <li>
                          <a>Watch Now</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>{' '}
          </div>
        </div>
      </section>

      <section className="favtalent toplinesec ">
        <div className="container">
          <div className="top_txt df fww just-between">
            <h2>
              Talent <i className="fal fa-angle-right"></i>
            </h2>
            <div className="viewmovrebtn editbtn">
              <a className="btn goldbtn">Edit</a>
            </div>
            <div className="favaddinput">
              <input type="text" placeholder="Enter Talent Name" list="favmoviename2" onChange={(e) => setSearchActor(e.target.value)} />
              <button className="btn goldbtn">add to favorite</button>
            </div>
          </div>
          <Slider {...SliderSettings} className="castcrew talentlist  roundslickarrow">
            {actorList.map((currentActor, index) => {
              return (
                <div className="catcrewcol">
                  <ul className="castcrew_people">
                    <li>
                      <div className="cast_pic bgimage" style={{ backgroundImage: `url(${currentActor.img})` }}></div>
                      <div className="cast_info">
                        <h5>
                          {currentActor.name}--
                          <span className="redtxt favheart">
                            <i className="fas fa-heart"></i>
                          </span>
                        </h5>
                        <p>
                          <a target="_self">{currentActor.name}</a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })}

            <div className="catcrewcol">
              <ul className="castcrew_people">
                <li>
                  <div className="cast_pic bgimage" style={{ backgroundImage: `url(${JON})` }}></div>
                  <div className="cast_info">
                    <h5>
                      <a target="_self">
                        Jon M. Chu{' '}
                        <span className="redtxt favheart">
                          <i className="fas fa-heart"></i>
                        </span>
                      </a>
                    </h5>
                    <p>
                      <a target="_self">X-Men: Apocalypse</a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="catcrewcol">
              <ul className="castcrew_people">
                <li className="comingsoon">
                  <div className="cast_pic bgimage" style={{ backgroundImage: `url(${JON})` }}></div>
                  <div className="cast_info">
                    <h5>
                      <a target="_self">
                        Jon M. Chu{' '}
                        <span className="favheart">
                          <i className="far fa-heart"></i>
                        </span>
                      </a>
                    </h5>
                    <p>
                      <a target="_self">X-Men: Apocalypse</a>
                    </p>
                    <span className="cominghov">(Nov 11,2022)</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="catcrewcol">
              <ul className="castcrew_people">
                <li>
                  <div className="cast_pic bgimage" style={{ backgroundImage: `url(${JON})` }}></div>
                  <div className="cast_info">
                    <h5>
                      <a target="_self">
                        Jon M. Chu{' '}
                        <span className="favheart">
                          <i className="far fa-heart"></i>
                        </span>
                      </a>
                    </h5>
                    <p>
                      <a target="_self">X-Men: Apocalypse</a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="catcrewcol">
              <ul className="castcrew_people">
                <li>
                  <div className="cast_pic bgimage" style={{ backgroundImage: `url(${JON})` }}></div>
                  <div className="cast_info">
                    <h5>
                      <a target="_self">
                        Jon M. Chu{' '}
                        <span className="favheart">
                          <i className="far fa-heart"></i>
                        </span>
                      </a>
                    </h5>
                    <p>
                      <a target="_self">X-Men: Apocalypse</a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="catcrewcol">
              <ul className="castcrew_people">
                <li>
                  <div className="cast_pic bgimage" style={{ backgroundImage: `url(${JON})` }}></div>
                  <div className="cast_info">
                    <h5>
                      <a target="_self">
                        Jon M. Chu{' '}
                        <span className="favheart">
                          <i className="far fa-heart"></i>
                        </span>
                      </a>
                    </h5>
                    <p>
                      <a target="_self">X-Men: Apocalypse</a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="catcrewcol">
              <ul className="castcrew_people">
                <li>
                  <div className="cast_pic bgimage" style={{ backgroundImage: `url(${JON})` }}></div>
                  <div className="cast_info">
                    <h5>
                      <a target="_self">
                        Jon M. Chu{' '}
                        <span className="favheart">
                          <i className="far fa-heart"></i>
                        </span>
                      </a>
                    </h5>
                    <p>
                      <a target="_self">X-Men: Apocalypse</a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="catcrewcol">
              <ul className="castcrew_people">
                <li>
                  <div className="cast_pic bgimage" style={{ backgroundImage: `url(${JON})` }}></div>
                  <div className="cast_info">
                    <h5>
                      <a target="_self">
                        Jon M. Chu{' '}
                        <span className="favheart">
                          <i className="far fa-heart"></i>
                        </span>
                      </a>
                    </h5>
                    <p>
                      <a target="_self">X-Men: Apocalypse</a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="catcrewcol">
              <ul className="castcrew_people">
                <li>
                  <a>
                    <div className="cast_pic bgimage" style={{ backgroundImage: `url(${JON})` }}></div>
                    <div className="cast_info">
                      <h5>
                        <a target="_self">
                          Jon M. Chu{' '}
                          <span className="favheart">
                            <i className="far fa-heart"></i>
                          </span>
                        </a>
                      </h5>
                      <p>
                        <a target="_self">X-Men: Apocalypse</a>
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="catcrewcol">
              <ul className="castcrew_people">
                <li>
                  <a>
                    <div className="cast_pic bgimage" style={{ backgroundImage: `url(${JON})` }}></div>
                    <div className="cast_info">
                      <h5>
                        <a target="_self">
                          Jon M. Chu{' '}
                          <span className="favheart">
                            <i className="far fa-heart"></i>
                          </span>
                        </a>
                      </h5>
                      <p>
                        <a target="_self">X-Men: Apocalypse</a>
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </Slider>
        </div>
      </section>

      <section className="theater_timing toplinesec">
        <div className="container">
          <div className="top_txt df fww just-between">
            <div className="top_txtleft df fww	">
              <h2>
                Theatres <i className="fal fa-angle-right"></i>
              </h2>

              <div className="currentlocation df fww">
                <p>
                  Your Location:
                  <span className="locname">Beverly Hills, CA 90210</span>
                  <input type="text" className="locinput" />
                </p>
                <div className="locbtn">
                  <button className="btn goldbtn">change location</button>
                </div>
              </div>
            </div>

            <div className="viewmovrebtn editbtn">
              <a className="btn goldbtn">Edit</a>
            </div>
            <div className="favaddinput">
              <div className="currentlocation df fww">
                <p>
                  You Location :
                  <input type="text" className="locinputplace" placeholder="Enter City & State or ZIP" /> <strong>or</strong>
                </p>
                <div className="locbtn">
                  <button className="btn goldbtn">Find My Location</button>
                  (U.S. Only)
                </div>
              </div>
            </div>
          </div>
          <Slider {...SliderSettingTheatre} className="theatershowtime_slider roundslickarrow">
            {movieData.length > 0 ? (
              movieData.map((currentElement, index) => {
                const id = currentElement.id;

                return (
                  <div className="exb_infocarditem">
                    <div className="exb_infocarditeminner">
                      <h4>
                        {currentElement.title}
                        <span className="redtxt favheart">
                          <i className="fas fa-heart"></i>
                        </span>
                      </h4>
                      <p>
                        {currentElement.address},{currentElement.hq},{currentElement.zip}, {currentElement.country}
                      </p>
                      <p>{currentElement.screens === '1' ? `${currentElement.screens} Screen` : `${currentElement.screens} Screens`} </p>
                      <div className="theaters_features">
                        <ul className="df fww">
                          <li>Parking</li>
                          <li>Dine-in</li>
                          <li>iMAX</li>
                          <li>4dX</li>
                          <li>Dolby aTMOS</li>
                          <li>Recliners</li>
                        </ul>
                      </div>
                      <div className="theater_dist">
                        <span>6.6mi</span>
                      </div>
                      <div className="showtimebtn">
                        <a className="btn ghostbtn">Find Showtimes</a>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <div className="exb_infocarditem" style={{ textAlign: 'center' }}>
                  <h4>No Theatre Found!</h4>
                </div>
              </>
            )}
            <div className="exb_infocarditem">
              <div className="exb_infocarditeminner">
                <h4>
                  AMC 19th Street East 6{' '}
                  <span className="redtxt favheart">
                    <i className="fas fa-heart"></i>
                  </span>
                </h4>
                <p>335 N. Maple Drive Suite 340, Beverly Hills, CA 90210, USA</p>
                <p>6 Screens</p>
                <div className="theaters_features">
                  <ul className="df fww">
                    <li>Parking</li>
                    <li>Dine-in</li>
                    <li>iMAX</li>
                    <li>4dX</li>
                    <li>Dolby aTMOS</li>
                    <li>Recliners</li>
                  </ul>
                </div>
                <div className="theater_dist">
                  <span>6.6mi</span>
                </div>
                <div className="showtimebtn">
                  <a className="btn ghostbtn">Find Showtimes</a>
                </div>
              </div>
            </div>
            <div className="exb_infocarditem">
              <div className="exb_infocarditeminner">
                <h4>
                  AMC 19th Street East 6{' '}
                  <span className="favheart">
                    <i className="far fa-heart"></i>
                  </span>
                </h4>
                <p>335 N. Maple Drive Suite 340, Beverly Hills, CA 90210, USA</p>
                <p>6 Screens</p>
                <div className="theaters_features">
                  <ul className="df fww">
                    <li>Parking</li>
                    <li>Dine-in</li>
                    <li>iMAX</li>
                    <li>4dX</li>
                    <li>Dolby aTMOS</li>
                    <li>Recliners</li>
                  </ul>
                </div>
                <div className="theater_dist">
                  <span>6.6mi</span>
                </div>
                <div className="showtimebtn">
                  <a className="btn ghostbtn">Find Showtimes</a>
                </div>
              </div>
            </div>
            <div className="exb_infocarditem">
              <div className="exb_infocarditeminner">
                <h4>
                  AMC 19th Street East 6{' '}
                  <span className="favheart">
                    <i className="far fa-heart"></i>
                  </span>
                </h4>
                <p>335 N. Maple Drive Suite 340, Beverly Hills, CA 90210, USA</p>

                <p>6 Screens</p>
                <div className="theaters_features">
                  <ul className="df fww">
                    <li>Parking</li>
                    <li>Dine-in</li>
                    <li>iMAX</li>
                    <li>4dX</li>
                    <li>Dolby aTMOS</li>
                    <li>Recliners</li>
                  </ul>
                </div>
                <div className="theater_dist">
                  <span>6.6mi</span>
                </div>
                <div className="showtimebtn">
                  <a className="btn ghostbtn">Find Showtimes</a>
                </div>
              </div>
            </div>
            <div className="exb_infocarditem">
              <div className="exb_infocarditeminner">
                <h4>
                  AMC 19th Street East 6{' '}
                  <span className="favheart">
                    <i className="far fa-heart"></i>
                  </span>
                </h4>
                <p>335 N. Maple Drive Suite 340, Beverly Hills, CA 90210, USA</p>
                <p>6 Screens</p>
                <div className="theaters_features">
                  <ul className="df fww">
                    <li>Parking</li>
                    <li>Dine-in</li>
                    <li>iMAX</li>
                    <li>4dX</li>
                    <li>Dolby aTMOS</li>
                    <li>Recliners</li>
                  </ul>
                </div>
                <div className="theater_dist">
                  <span>6.6mi</span>
                </div>
                <div className="showtimebtn">
                  <a className="btn ghostbtn">Find Showtimes</a>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section>

      <section className="discnewsupdate toplinesec">
        <div className="container">
          <div className="top_txt">
            <h2>
              News & Updates <i className="fal fa-angle-right"></i>
            </h2>
          </div>

          <Slider {...SliderSettingNews} className="updateinfo_slider roundslickarrow">
            <div className="updateintro_box df fww">
              <span className="newupdicbox df fww">
                <figure className="pvr">
                  <img src={FOURBTS} alt="" className="objctimg_box" />
                </figure>
                <div className="updateintro_txt">
                  <h5>Superstar Actress Describes Feeling Like ‘Meat’ In Audition Process For Epic Film</h5>
                  <div className="srcnametime">
                    <strong>
                      <div className="fmupdate_boxaurthor">
                        <div className="bgimage" style={{ backgroundImage: `url(${FOURBTS})` }}></div>
                        <span>CNN</span>
                      </div>
                      <span>15 Mar, 02:03 am</span>
                    </strong>
                  </div>
                </div>
              </span>
            </div>
            <div className="updateintro_box df fww sssss">
              <span className="newupdicbox df fww">
                <figure className="pvr">
                  <img src={FOURBTS} alt="" className="objctimg_box" />
                </figure>
                <div className="updateintro_txt">
                  <h5>Julianne Hough Thinks Spring In N.Y.C., Plus Queen Latifah, Oscar Isaac And More</h5>
                  <div className="srcnametime">
                    <strong>
                      <div className="fmupdate_boxaurthor">
                        <div className="bgimage" style={{ backgroundImage: `url(${FOURBTS})` }}></div>
                        <span>CNN</span>
                      </div>
                      <span>15 Mar, 02:03 am</span>
                    </strong>
                  </div>
                </div>
              </span>
            </div>
            <div className="updateintro_box df fww">
              <span className="newupdicbox df fww">
                <figure className="pvr">
                  <img src={FOURBTS} alt="" className="objctimg_box" />
                </figure>
                <div className="updateintro_txt">
                  <h5>Duis Vestibulum Elit Vel Neque Pharetramaxi...</h5>
                  <div className="srcnametime">
                    <strong>
                      <div className="fmupdate_boxaurthor">
                        <div className="bgimage" style={{ backgroundImage: `url(${FOURBTS})` }}></div>
                        <span>CNN</span>
                      </div>
                      <span>15 Mar, 02:03 am</span>
                    </strong>
                  </div>
                </div>
              </span>
            </div>
            <div className="updateintro_box df fww">
              <span className="newupdicbox df fww">
                <figure className="pvr">
                  <img src={FOURBTS} alt="" className="objctimg_box" />
                </figure>
                <div className="updateintro_txt">
                  <h5>Duis Vestibulum Elit Vel Neque Pharetramaxi...</h5>
                  <div className="srcnametime">
                    <strong>
                      <div className="fmupdate_boxaurthor">
                        <div className="bgimage" style={{ backgroundImage: `url(${FOURBTS})` }}></div>
                        <span>CNN</span>
                      </div>
                      <span>15 Mar, 02:03 am</span>
                    </strong>
                  </div>
                </div>
              </span>
            </div>
          </Slider>
        </div>
      </section>

      <section className="favcompany toplinesec">
        <div className="container">
          <div className="top_txt df fww just-between">
            <div className="top_txtleft df fww">
              <h2>
                Companies <i className="fal fa-angle-right"></i>{' '}
              </h2>
              <div className="taginfo df fww">
                <i className="fal fa-info-circle"></i>
                <p>This Include Distributors, Exhibitors, Vendors And Film Festivals Etc...</p>
              </div>
            </div>
            <div className="viewmovrebtn editbtn">
              <a className="btn goldbtn">Edit</a>
            </div>
            <div className="favaddinput">
              <input type="text" placeholder="Enter Talent Name" list="favmoviename2" />
              <button className="btn goldbtn">add to favorite</button>
            </div>
          </div>
          <div className="favcompany_box grid gap16">
            <div className="favcompanyitem">
              <figure className="pvr">
                <a>
                  <img src={AMC} alt="" />
                </a>
              </figure>
              <div className="favcompany_detail">
                <div className="darectory_tag">Distributor </div>
                <h4>
                  <a>
                    Marvel Studios{' '}
                    <span className="redtxt favheart">
                      <i className="fas fa-heart"></i>
                    </span>
                  </a>
                </h4>
              </div>
            </div>
            <div className="favcompanyitem">
              <figure className="pvr">
                <a>
                  <img src={AMC} alt="" />
                </a>
              </figure>
              <div className="favcompany_detail">
                <div className="darectory_tag">Distributor </div>
                <h4>
                  <a>
                    Marvel Studios{' '}
                    <span className="favheart">
                      <i className="far fa-heart"></i>
                    </span>
                  </a>
                </h4>
              </div>
            </div>
            <div className="favcompanyitem">
              <figure className="pvr">
                <a>
                  <img src={AMC} alt="" />
                </a>
              </figure>
              <div className="favcompany_detail">
                <div className="darectory_tag">Distributor </div>
                <h4>
                  <a>
                    Marvel Studios{' '}
                    <span className="favheart">
                      <i className="far fa-heart"></i>
                    </span>
                  </a>
                </h4>
              </div>
            </div>
            <div className="favcompanyitem">
              <figure className="pvr">
                <a>
                  <img src={AMC} alt="" />
                </a>
              </figure>
              <div className="favcompany_detail">
                <div className="darectory_tag">Distributor </div>
                <h4>
                  <a>
                    Marvel Studios{' '}
                    <span className="favheart">
                      <i className="far fa-heart"></i>
                    </span>
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Favorite;
