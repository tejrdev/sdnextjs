import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Link from 'next/link'
import AMCT from '../../public/amc-2.png';
//import useLoginCheck from '../useLoginCheck';
import JON from '../../public/jon.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
const $ = require('jquery');
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const LOADER ="Loading..";
const ERRORLOGIN = "Please Login First! ";

if (typeof window !== 'undefined') {
    var LOGGED_EMAIL = localStorage.getItem('email');
     var LOGIN_TYPE = localStorage.getItem('from');
     var LOGGED_AVATAR = localStorage.getItem('avatar');
     //  LOGGED_AVATAR = '';
      var LOGGED_AVATAR_TITLE = localStorage.getItem('avatarTitle');
      //console.log(LOGGED_AVATAR);
     // return false;
    }
const TalentListing = () =>{
	const [items, setItems] = useState([]);
	const [actorList, setActorList] = useState([]);
	const [talentName, setTalentName] =useState('');
	const [searchData, setSearchData] = useState([]);
    const [loadingFav,setLoadingFav] = useState('');
    //const [searchMovieName,setSearchMovieName] =useState('');
    const[hiddenValue,setHiddenValue] =useState({display:'none'});


	useEffect(() => {
	listActorsDefault();
	  }, []);
	const SliderSettings = {
		slidesToShow: 6,
		 slidesToScroll: 2,
		speed: 300,
		infinite: false,
		autoplay: false,
		autoplaySpeed: 8000,
		pauseOnHover: true,
		dots: false,
		arrows: true,
		/*variableWidth: true,*/
		responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5,
                    },
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                    },
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
	  };
	const listActorsDefault = async () => {
		var profile_saveurl = API_URL + '/login/favorite_talent_listing.php';
		await axios
		  .get(profile_saveurl, {
			params: {
			  email: window.btoa(LOGGED_EMAIL),
			  s_text: window.btoa('blank'),
			  type: window.btoa('actors'),
			},
		  })
		  .then((res) => {
			var objectRelated = res.data;
			//var mapValues = Object.values(objectRelated);
			//var favCheck = mapValues[0]['fav'];
			//var favActorsIds = mapValues[0]['fav_list'];

			//setActorList(mapValues);
			//console.log(objectRelated,'----talent listing');
			setActorList(objectRelated);
		  })
		  .catch((err) => console.log('Actors lists error ', err));
	  };

	  const searchSelect =(value)=>{
		setHiddenValue({display:'none'});
		setTalentName(value);
	   //console.log(hiddenValue);

	  }

const searchTalent = ()=>{

	const talent = async()=>{
	var profile_saveurl = API_URL + '/login/favorite_talent_search.php';
	await axios
	  .get(profile_saveurl, {
		params: {
		  email: window.btoa(LOGGED_EMAIL),
		  talentname:window.btoa(talentName),
		},
	  })
	  .then((res) => {
		//console.log(res.data,'--search talent');
	    setSearchData(res.data);
	  //  console.log(res.data);
	  setHiddenValue({display:' '});
	})
  .catch((err) => console.log('Talent lists error ', err));
 }
 talent();
}
const addFavoriteTalent =async()=>{
	if(LOGGED_EMAIL === null || LOGGED_EMAIL ===''){
		alert(ERRORLOGIN);
		return false;
	  }
	var favmobvie_addurl = API_URL + '/login/favorite_talent_add.php';
	setLoadingFav(LOADER);
	await axios
	  .get(favmobvie_addurl, {
	  params: {
		email: window.btoa(LOGGED_EMAIL),
		talentname: window.btoa(talentName),
		type : 'button'
	  },
	  })
	  .then((res) => {
		//console.log(res.data,'---talent values result');
		setLoadingFav('');

	  })
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

	const addFavoriteAll =()=>{
	  var favmobvie_addurl = API_URL + '/login/favorite_all.php';
	  if(LOGGED_EMAIL === null || LOGGED_EMAIL ===''){
		alert(ERRORLOGIN);
		return false;
	  }
	  handleFavorite(favoriteId);
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
		  //console.log(res.data);
		  setItems(res.data);
	   // setLoadingFav('');

		})

	 }
	  addFavoriteAll();
   }


   useEffect(() => {

	const getFavLists =  () => {
	  var fav_saveurl = API_URL + '/login/favorite_get_listingall.php';
	   axios
		.get(fav_saveurl, {
		params: {
		  email: window.btoa(LOGGED_EMAIL),
		  fav_type:window.btoa('fav_actors')
		},
		})
		.then((res) => {
  /// console.log(Object.values(res.data));
	 setItems(res.data);
		})
		.catch((err) => console.log('Actors lists error ', err));
	  };
	  getFavLists();

  }, []);

    return (<>
    <section className="favtalent favdetails nowshowing toplinesec ">
	<div className="container">
	<div className="top_txt df fww just-between">
			<h2>Talent <i className="fal fa-angle-right"></i></h2>
			<div className="viewmovrebtn df fww">
				<div className="favaddinput">
				<div className="favinbox pvr">
						<input type="text" placeholder="Enter Actor, Actress or Filmmaker" list="favmoviename1"   value={talentName}
					 onChange={(e)=>setTalentName(e.target.value)}/>
						<button onClick={searchTalent}><i className="far fa-search"></i></button>
						<div className="favauto" style={hiddenValue}>
							<ul>
             		 {searchData.map((talentSearch,index)=>{
                   return( <li key={index+1} onClick={()=>searchSelect(talentSearch.title)}>{talentSearch.title}</li>)
                })
                }
							</ul>
						</div>
					</div>
				<button className="btn goldbtn" onClick={(e)=>addFavoriteTalent('button')}>add </button>
				{loadingFav}

			</div>
			<Link href="/favorite/talent" className="btn goldbtn viewbtnbox">view all</Link>
			</div>

		</div>
		<Slider  {...SliderSettings} className="talentlist grid roundslickarrow ">
			{actorList.map((actor,index)=>{
				 const ID=actor.ID;
				return (<>
					<div className="catcrewcol">
					<ul className="castcrew_people">
						<li>

						<Link href={actor.post_url}
						><div className="cast_pic bgimage" style={{ backgroundImage: `url(${actor.image_url})` }}>
								</div></Link>
								<div className="cast_info" >
									<h5> <Link href={actor.post_url}>{actor.title} </Link>
									<span  onClick={()=>favoriteHeart(ID,'fav_actors')} className={( items.includes(ID))  ? 'favheart  redtxt' : 'favheart '}>
									<i className={( items.includes(ID))  ? 'fas fa-heart' : 'far fa-heart '}></i>
									</span>
									</h5>
									<p><Link href={actor.post_url}>{actor.talent_movie_id}</Link></p>
								</div>

						</li>

					</ul>
				</div>

				</>)

			})
				 }





			</Slider>
	</div>
</section>

    </>)
}
export default TalentListing;