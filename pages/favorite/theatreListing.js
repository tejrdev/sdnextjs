import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Link from 'next/link'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const $ = require('jquery');
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const ERRORLOGIN = "Please Login First! ";
if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
  }


const TheatreListing = () => {
	const [theatreData, setTheatreData ]= useState([]);
  const [userLocation, setUserLocation] = useState('');
  const [countryVal, setCountryVal] = useState('USA');
	const [state, setState] = useState('');
	const [search, setSearch] = useState('');
  const [userLocationData,setUserLocationData] =useState('33 Miller Hill Road, Dover, MA 02030 USA');
  const [finalTheatreData, setFinalTheatreData] =useState([]);
  const [items, setItems] = useState([]);

	useEffect(()=>{
		navigator.geolocation.getCurrentPosition(success, error, options);
	},[])
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
    		   var userLoc =json.results[0].formatted;
			   var userZip =json.results[0].components.postcode;
			   var userLat =crd.latitude;
			   var userLng =crd.longitude;
			   setUserLocationData(userLoc);
			   allTheatres(userLoc,userZip,userLat,userLng);
		  });
	  };



	  const error = (err) => {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	  };

	  const allTheatres =(userLoc,userZip,userLat,userLng)=>{
		const listTheatre = async () => {
			var profile_saveurl = API_URL + '/login/favorite_theatre_singlelist.php';
			await axios
			  .get(profile_saveurl, {
				params: {
				  email: window.btoa(LOGGED_EMAIL),
				  userlocationDetail:  window.btoa(userLoc),
				  zipcode:  window.btoa(userZip),
				  latitude:userLat,
				  longitude:userLng
				},
			  })
			  .then((res) => {
				var objectRelated = res;
				var mapValues = Object.values(objectRelated);
				 setTheatreData(res.data);
			  })
			  .catch((err) => console.log('Theatre lists error ', err));
		  };
		  listTheatre();
	}

	const handleFavorite = (valueToCheck) => {

		let itemsArray = [...items];
		if (items.includes(valueToCheck)) {
		  if (typeof items === 'string') {
			itemsArray=JSON.parse(items);
		}

		  setItems(itemsArray.filter(content => content !== valueToCheck));
		} else {
		  setItems([...items, valueToCheck]);
		}
	  };

	  const favoriteHeart = (favoriteId, favoriteType) =>{
		if(LOGGED_EMAIL === null || LOGGED_EMAIL ===''){
			alert(ERRORLOGIN);
			return false;
		  }

		  handleFavorite(favoriteId);
		const addFavoriteAll =()=>{
		  var favmobvie_addurl = API_URL + '/login/favorite_all.php';
		 // setLoadingFav(LOADER);
		   axios
			.get(favmobvie_addurl, {
			  params: {
				email: window.btoa(LOGGED_EMAIL),
				favoriteType:window.btoa(favoriteType),
				favoriteId:window.btoa(favoriteId)
			  },
			})
			.then((res) => {
			 // console.log(res.data);
			  setItems(res.data);
		   // setLoadingFav('');

			})

		 }
		  addFavoriteAll();
	   }

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

	  useEffect(() => {

		const getFavLists =  () => {
		  var fav_saveurl = API_URL + '/login/favorite_get_listingall.php';
		   axios
			.get(fav_saveurl, {
			params: {
			  email: window.btoa(LOGGED_EMAIL),
			  fav_type:window.btoa('fav_theatres')
			},
			})
			.then((res) => {
	  /// console.log(Object.values(res.data));
		 setItems(res.data);
			})
			.catch((err) => console.log('Theatres lists error ', err));
		  };
		  getFavLists();

	  }, []);
    return (<>
 <section className="theater_timing toplinesec">
	<div className="container">

		<div className="top_txt df fww just-between">
			<div className="top_txtleft df fww	">
				<h2>Theatres <i className="fal fa-angle-right"></i></h2>

			</div>

			<div className="viewmovrebtn editbtn df fww">
				<div className="currentlocation df fww">
					<p>Your Location :
						<span className="locname">{userLocationData}</span>
						<input type="text" className="locinput" />
					</p>
					<div className="locbtn">
					<Link  href="/favorite/theatre" className="btn goldbtn" target="_self">change location</Link>
					</div>
				</div>
				<Link  href="/favorite/theatre" className="btn goldbtn viewbtnbox" target="_self">view all</Link>

			</div>

		</div>
		<Slider {...SliderSettingTheatre} className="theatershowtime_slider roundslickarrow">
    {theatreData.map((currentElement, index)=>{
               const id = currentElement.id;
			   if(currentElement.title !==''){
               return (
                <div className="exb_infocarditem">
                  <div className="exb_infocarditeminner">
                    <h4>
                      {currentElement.title}
					  <span onClick={()=>favoriteHeart(id,'fav_theatres')}
							className={( items.includes(id)) ? 'favheart  redtxt' : 'favheart '}>
                          <i className={( items.includes(id)) ? 'fas fa-heart' : 'far fa-heart '}></i>
                      	  </span>
                    </h4>
                    <p>
                      {currentElement.address}, {currentElement.hq}, {currentElement.zip}
                    </p>
                    <p>{currentElement.screens === '1' ? `${currentElement.screens} Screen` : `${currentElement.screens} Screens`} </p>
                    <div className="theaters_features">
                      	  {/* <ul className="df fww">
								   <li>Parking</li>
								   <li>Dine-in</li>
								   <li>iMAX</li>
								   <li>4dX</li>
								   <li>Dolby aTMOS</li>
								   <li>Recliners</li>
							   </ul>*/}
                    </div>
                    <div className="theater_dist">
                      <span>{currentElement.distance}mi</span>
                    </div>
                    <div className="showtimebtn">
                      <a className="btn ghostbtn">Find Showtimes</a>
                    </div>
                  </div>
                </div>
              );
			   }
            })}

         {/* : (
              <>
                <div className="exb_infocarditem" style={{ textAlign: 'center' }}>
                  <h4>No Theatre Found!</h4>
                </div>
              </>
            ) */}


          </Slider>

	</div>
</section>
    </>)

}

export default TheatreListing;

