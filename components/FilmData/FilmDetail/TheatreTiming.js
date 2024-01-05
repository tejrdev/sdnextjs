import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

import { FaChevronRight } from 'react-icons/fa6';

const LOADER = 'Loading...';

const TheatreTiming = ({ data, film_id, mdetailshow }) => {
  const [ShowTimeData, setShowTimeData] = useState('');
  const [ShowTimeDataLoaded, setShowTimeDataLoaded] = useState(false);
  const [userLocationData, setUserLocationData] = useState('');
  const [userlatitude, setUserlatitude] = useState();
  const [userlongitude, setUserlongitude] = useState();
  const [userpincode, setUserpincode] = useState();
  const [loaderTheatreZip, setLoaderTheatreZip] = useState();
  const [TheatreZipDataLoaded, setTheatreZipDataLoaded] = useState(false);
  const sliderRef = useRef();
  useEffect(() => {
    setUserlatitude(localStorage.getItem('latitude'));
    setUserlongitude(localStorage.getItem('longitude'));
    setUserpincode(localStorage.getItem('pincode'));
    loadShowTimeData();
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  useEffect(() => {
    loadShowTimeZipData();
  }, [userLocationData]);

  const loadShowTimeData = async () => {
    setLoaderTheatreZip(LOADER);
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/show_time/FilmDetailShowtime.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'film-detail/' + film_id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&latitude=' + userlatitude + '&longitude=' + userlongitude + '&pincode=' + userpincode)
      .then((res) => {
        setLoaderTheatreZip('');
        setShowTimeData(res.data);
        setTheatreZipDataLoaded(true);
        setShowTimeDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  const loadShowTimeZipData = async () => {
    setTheatreZipDataLoaded(false);
    setLoaderTheatreZip(LOADER);
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/show_time/FilmDetailShowtime.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'film-detail/' + film_id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&pincode=' + userLocationData.replaceAll(' ', ''))
      .then((res) => {
        setLoaderTheatreZip('');
        setShowTimeData(res.data);
        setTheatreZipDataLoaded(true);
        setShowTimeDataLoaded(true);
        sliderRef.current.slickGoTo(0);
      })
      .catch((err) => console.log(err));
  };
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = (pos) => {
    const crd = pos.coords;
    const coordinatesUrl = `https://api.opencagedata.com/geocode/v1/json?q=${crd.latitude}+${crd.longitude}&key=7bcf32f4394e4c56820a138c135722e2`;
    fetch(coordinatesUrl)
      .then((res) => res.json())
      .then((json) => {
        setUserLocationData('' + json.results[0].formatted);
        setUserlatitude(crd.latitude);
        setUserlongitude(crd.longitude);
        setUserpincode(json.results[0].components.postcode);
        loadShowTimeData();
      });
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  const SliderSetting = {
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

  return (
    <>
      <section className='theater_timing toplinesec'>
        <div className='container'>
          <div className='top_txt'>
            <div className='tecotherinfo'>
              <div className='tecinfo grid'>
                {data.format && (
                  <div className='techinfoitem'>
                    <h4>
                      Technical Specifications <FaChevronRight />
                    </h4>
                    {/* <p>
                        <strong> Sound Mix: </strong> Dolby Atmos
                      </p>
                      <p>
                        <strong> Aspect Ratio: </strong> 2.39 : 1
                      </p> */}
                    {data.format && <p>{data.format}</p>}
                  </div>
                )}

                {(data.film_country || data.film_language) && (
                  <div className='techinfoitem'>
                    <h4>
                      Other Details <FaChevronRight />
                    </h4>
                    {data.film_country && (
                      <p>
                        <strong> Country of Origin: </strong> {data.film_country}
                      </p>
                    )}
                    {data.film_language && (
                      <p>
                        <strong> Language: </strong> {data.film_language}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            {ShowTimeDataLoaded && !mdetailshow && ShowTimeData.showtime_list.length >= 1 && (
              <>
                <h2>
                  Showtimes <i className='fal fa-angle-right'></i>
                </h2>
                {/* <!-- if location is available --> */}
                {/*  <div className="currentlocation df fww">
            <p>
              You Location
              <span className="locname">Beverly Hills, CA 90210</span>
              <input type="text" className="locinput" />
            </p>
            <div className="locbtn">
              <button className="btn goldbtn">change location</button>
            </div>
          </div>*/}
                {/* <!-- if location is not available --> */}
                <div className='currentlocation df fww'>
                  <p>
                    Your Location
                    <input type='text' className='locinputplace' placeholder='Enter City & State or ZIP' value={userLocationData} onChange={(e) => setUserLocationData(e.target.value)} />
                    {loaderTheatreZip} <strong>or</strong>
                  </p>
                  <div className='locbtn'>
                    <button className='btn goldbtn' onClick={getLocation}>
                      Find My Location
                    </button>
                    (U.S. Only)
                  </div>
                </div>
              </>
            )}
          </div>
          {ShowTimeDataLoaded && !mdetailshow && ShowTimeData.showtime_list.length >= 1 && (
            <Slider ref={sliderRef} {...SliderSetting} className='theatershowtime_slider roundslickarrow'>
              {TheatreZipDataLoaded &&
                ShowTimeData.showtime_list &&
                ShowTimeData.showtime_list.map((item, index) => {
                  return (
                    <div className='exb_infocarditem' key={index}>
                      <div className='exb_infocarditeminner'>
                        <h4>{item.title}</h4>
                        <p>{item.address}</p>

                        {item.show_times && (
                          <div className='theaters_filmshow df fww'>
                            <ul className='df fww'>
                              {item.show_times.map(
                                (time, index) =>
                                  time.booking_link && (
                                    <li key={index}>
                                      <a href={time.booking_link}>{time.start_at}</a>
                                    </li>
                                  )
                              )}
                            </ul>
                          </div>
                        )}
                        <div className='theater_dist'>{item.miles_distance && <span>{item.miles_distance}mi</span>}</div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          )}
        </div>
      </section>
    </>
  );
};

export default TheatreTiming;
