import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
}
const LOADER = 'Loading...';
var resultData = '';
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const FavTheatres = ({ children, active }) => {
  const [countryVal, setCountryVal] = useState('');
  const [state, setState] = useState('');
  const [search, setSearch] = useState('');
  const [movieData, setMovieData] = useState([]);
  const [favTheatre, setFavTheatre] = useState([]);

  const [favActive, setFavActive] = useState(false);
  const [loaderTheatre, setLoaderTheatre] = useState();
  const favId = useRef();
  const [checked, setChecked] = useState([53294, 48814]);
  const [userLocation, setUserLocation] = useState();
  const [loaderTheatreZip, setLoaderTheatreZip] = useState();
  const [items, setItems] = useState([]);

  const loadTheatresData = () => {
    let directory_API = process.env.NEXT_PUBLIC_SD_API + '/directory_theatres/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN;

    axios
      .get(directory_API)
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  const countryCheck = (e) => {
    const countryValue = e.target.value;
    setCountryVal(countryValue);
    if (countryValue === 'USA' || countryValue === 'Canada') {
      getTheatresData(countryValue);
      setSearch(2);
    } else {
      setCountryVal('');
      setSearch(1);
    }
  };

  const stateCheck = (value) => {
    setSearch(3);
  };
  const getTheatresData = async (value) => {
    setCountryVal(value);
    var fav_theatre_url = API_URL + '/login/fav_theatres.php';
    await axios
      .get(fav_theatre_url, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          country: window.btoa(value),
          process: 'GET',
        },
      })
      .then((res) => {
        var objectRelated = res.data.theator_list;
        var mapValues = Object.values(objectRelated);
        setMovieData(mapValues);
        setChecked(JSON.parse(JSON.stringify(res.data)));
      })
      .catch((err) => {
        setMovieData([]);
      });
  };

  const getStateTheatreData = (stateValue) => {
    setSearch(3);
    setState(stateValue);
    setLoaderTheatreZip(LOADER);
    var fav_theatre_url = API_URL + '/login/fav_theatres.php';
    axios
      .get(fav_theatre_url, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          country: window.btoa(countryVal),
          stateCity: window.btoa(stateValue),
          process: 'GET',
        },
      })
      .then((res) => {
        var objectRelated = res.data.theator_list;
        var mapValues = Object.values(objectRelated);
        setMovieData(mapValues);
        setLoaderTheatreZip('');
        setChecked(JSON.parse(JSON.stringify(res.data)));
      })
      .catch((err) => {
        console.log('theatre fetch error ', err);
        setMovieData([]);
      });
  };

  const getFavoriteData = async () => {
    var fav_theatre_url = API_URL + '/login/fav_theatres.php';
    await axios
      .get(fav_theatre_url, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          process: 'FAVORITE',
        },
      })
      .then((res) => {
        //console.log(res.data);
        var objectRelated = res.data.theator_list;
        var mapValues = Object.values(objectRelated);
        var favoritesRelated = res.data.fav_theatres;
        var favoriteContent = favoritesRelated.replace('[', '').replace(']', '').replaceAll('"', '').split(',').map(String);
        // alert(favoriteContent + '--favoriteContent')
        if (favoriteContent !== '') {
          // console.log(favoriteContent);
          setItems(favoriteContent);
          if (mapValues.length > 0) {
            setMovieData(mapValues);
            // if (countryVal !== '')
            setSearch(2);
          }
        }
      })
      .catch((err) => console.log('theatre FAVORITE error ', err));
  };
  useEffect(() => {
    getFavoriteData();
  }, []);


  function addQuotes(value) {
    return `"${value}"`;
  }

  const addFavorite = (value) => {
    if (items.includes(value) === true) {
      var setNewItems = items.splice(items.indexOf(value), -1);
      const newArr = items.filter((a) => {
        return value !== a;
      });
      setItems(newArr);
      return false;
    } else {
      items.push(value);
      const newArr = items.filter((a) => a);
      setItems(newArr);
      return false;
    }
  };


  const saveTheatreData = () => {
    setLoaderTheatre(LOADER);
    let theatres =items;
    theatres.map(addQuotes);

    var formData = new FormData();
    //  var imagefile = document.querySelector('#file');
    var fav_theatre_url = API_URL + '/login/fav_theatres.php';
    formData.append('auth', LOGGED_EMAIL);
    formData.append('type', 'POST');
    formData.append('country', countryVal);
    formData.append('values', JSON.stringify(theatres));
    axios
      .post(fav_theatre_url, formData)
      .then((res) => {
        setLoaderTheatre('');
        document.getElementById('skip').click();
      })
      .catch((err) => console.log('theatre error: ', err));
  };

  const getLocation = () => {
    /*https://www.npmjs.com/package/react-geocode*/
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

    // console.log('Your current position is:');
    // console.log(`Latitude : ${crd.latitude}`);
    //console.log(`Longitude: ${crd.longitude}`);
    //console.log(`More or less ${crd.accuracy} meters.`);
    //console.log(`https://api.opencagedata.com/geocode/v1/json?q=${crd.latitude}+${crd.longitude}&key=7bcf32f4394e4c56820a138c135722e2`);
    fetch(coordinatesUrl)
      .then((res) => res.json())
      .then((json) => {
        setUserLocation(json.results[0].formatted);
        //    console.log(json.results[0].components.postcode);
        getStateTheatreData(json.results[0].components.postcode);
        setState(json.results[0].components.postcode);
      });
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  const displayNone = { display: 'none' };
  const displayBlock = { display: 'block' };

  return (
    <>
      <div className={` prostep_item fluid ${active}`}>
        <div className="prostep_itemsub">
          <div className="top_txt text-center">
            <h2>What Country Are You Located in?</h2>
            <p>“Knowing your country helps us personalize your experience”</p>
          </div>
          <div className="proin_form fav_movie">
            <div className="fieldbox">
              <label>
                <strong>Country</strong>
              </label>
              <select name="country" value={countryVal} onChange={(e) => countryCheck(e)}>
                <option value="">Select Country</option>
                <option value="USA" selected={countryVal === 'USA' ? 'selected' : ''}>
                  USA
                </option>
                <option value="Canada" selected={countryVal === 'Canada' ? 'selected' : ''}>
                  Canada
                </option>
                <option value="Afghanistan" selected={countryVal === 'Afghanistan' ? 'selected' : ''}>
                  Afghanistan
                </option>
                <option value="Albania" selected={countryVal === 'Albania' ? 'selected' : ''}>
                  Albania
                </option>
                <option value="Algeria" selected={countryVal === 'Algeria' ? 'selected' : ''}>
                  Algeria
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="prostep_itemsub " style={search === 1 ? displayBlock : displayNone}>
          <div className="top_txt text-center">
            <h2>Your Favorite Movie Theatre</h2>
            <p>
              Sorry! We Currently Don't Support Your Country To Show You Showtimes Of Different Movies Near You... <br /> We Are Working On It.
            </p>
          </div>
          <div className="prostep_save text-center">
            <div className="savebtn">
              <a href="" className="btn">
                save & continue
              </a>
            </div>
            {children}
          </div>
        </div>
        <div className="prostep_itemsub">
          <div className="top_txt text-center" style={search === 2 || search === 3 ? displayBlock : displayNone}>
            <h2>Favorite Local Theatres</h2>
            <p>Knowing your location helps us share information about movies playing at theatres in your area</p>
          </div>
          <div className="proin_form ">
            <div className="fieldbox fav_movie" style={search === 2 || search === 3 ? displayBlock : displayNone}>
              <label>
                <strong>Location</strong>
              </label>
              <input type="text" placeholder="Enter City, State or ZIP Code " onChange={(e) => getStateTheatreData(e.target.value)} value={state} />
              {loaderTheatreZip}
              <div className="selectlocation" onClick={getLocation}>
                <i className="fas fa-location"></i> Detect my current location
              </div>
            </div>

            <div className="theaterlocate" style={search === 2 || search === 3 ? displayBlock : displayNone}>
              <p className="text-center">Click on <i className="far fa-heart"></i> to add theatre as one of your Favorites </p>
              <div className="exb_infocard grid">
                {movieData.length > 0 ? (
                  movieData.map((currentElement, index) => {
                    const id = currentElement.id;

                    return (
                      <div className="exb_infocarditem" key={index} style={id === '' ? displayNone : displayBlock}>
                        <h4>{currentElement.title}</h4>
                        <p>
                          {currentElement.address}, {currentElement.hq}, {currentElement.zip}, {currentElement.country}
                        </p>
                        <p> {currentElement.screens} {currentElement.screens === '1' && 'Screen'} {currentElement.screens !='1' && 'Screens'}</p>
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

                        <div className={items.includes(id) === true ? 'favoritebox clicked' : 'favoritebox '} onClick={() => addFavorite(id)}>
                          Favorite<i className="far fa-heart"></i>
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
              </div>
            </div>
          </div>
          <div className="prostep_save text-center" style={search === 2 || search === 3 ? displayBlock : displayNone}>
            {loaderTheatre}
            <div className="savebtn">
              <input className="btn" type="button" value="SAVE & CONTINUE " onClick={saveTheatreData} />
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
export default FavTheatres;
