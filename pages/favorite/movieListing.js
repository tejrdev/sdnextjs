
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Link from 'next/link'

//import useLoginCheck from '../useLoginCheck';
import FOURAB from '../../public/fourabtsld.jpg';
import Movies from './movies';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { string } from 'prop-types';


const API_URL = process.env.NEXT_PUBLIC_SD_API;
const SITE_URL =process.env.NEXT_PUBLIC_LOGIN_URL;
const LOADER ="Loading..";
const ERRORLOGIN = "Please Login First! ";
if (typeof window !== 'undefined') {
    var LOGGED_EMAIL = localStorage.getItem('email');
     var LOGIN_TYPE = localStorage.getItem('from');
     var LOGGED_AVATAR = localStorage.getItem('avatar');
     var LOGGED_AVATAR_TITLE = localStorage.getItem('avatarTitle');
     var LOGGED_USER =localStorage.getItem('username');
      //console.log(LOGGED_AVATAR);
     // return false;
    }


const MovieListing = () =>{
    const [movieData, setMovieData] = useState([]);
    const [items, setItems] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [movieName, setMovieName] =useState('');
    const [loadingFav,setLoadingFav] = useState('');
    //const [searchMovieName,setSearchMovieName] =useState('');
    useEffect(() => {
      const $ = window.jQuery;
      $(".watchbtn .eatchoptionbtn").click(function () {
        $(this).next().slideToggle();
        $(this).parent().toggleClass("watchactive");
    });


    },[])

    const[hiddenValue,setHiddenValue] =useState({display:'none'});
    useEffect(() => {
      listMovies();
    }, []);




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

      const addFavoriteAll =async()=>{
        var favmobvie_addurl = API_URL + '/login/favorite_all.php';
       // setLoadingFav(LOADER);
        await axios
        .get(favmobvie_addurl, {
          params: {
          email: window.btoa(LOGGED_EMAIL),
          favoriteType:window.btoa(favoriteType),
          favoriteId:window.btoa(favoriteId)
          },
        })
        .then((res) => {
         // console.log(res.data,'--coming from favorite');
          setItems(res.data);
         // setLoadingFav('');

        })

       }
        addFavoriteAll();
       }
    const searchSelect =(value)=>{
      setHiddenValue({display:'none'});
      setMovieName(value);
     //console.log(hiddenValue);

    }

	const SliderSettings = {
		slidesToShow: 6,
    slidesToScroll: 2,
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
			  slidesToShow: 2,
			},
		  },
		  {
			breakpoint: 400,
			settings: {
			  slidesToShow: 2,
			},
		  },
		],
	  };


const searchMovies = ()=>{

      const movies = async()=>{
      var profile_saveurl = API_URL + '/login/favorite_movies_search.php';
      await axios
        .get(profile_saveurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            moviename:window.btoa(movieName),
          },
        })
        .then((res) => {
          //console.log(res.data,'--search movies');
        setSearchData(res.data);
        //  console.log(res.data);
        setHiddenValue({display:' '});
      })
    .catch((err) => console.log('Movies lists error ', err));
   }
   movies();
}

    const listMovies = async () => {
        var profile_saveurl = API_URL + '/login/favorite_movies_listing.php';

        await axios
          .get(profile_saveurl, {
            params: {
              email: window.btoa(LOGGED_EMAIL),
              s_text: window.btoa('blank'),
            },
          })
          .then((res) => {
            //console.log(res.data,'--list of movies');
          setMovieData(res.data);
        //  console.log(res.data);


        })
          .catch((err) => console.log('Movies lists error ', err));
      };
///
      const addFavoriteMovie =async()=>{
        if(LOGGED_EMAIL === null || LOGGED_EMAIL ===''){
          alert(ERRORLOGIN);
          return false;
          }
        var favmobvie_addurl = API_URL + '/login/favorite_movies_add.php';
        setLoadingFav(LOADER);
        await axios
          .get(favmobvie_addurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            moviename: window.btoa(movieName),
            type : 'button'
          },
          })
          .then((res) => {
           // console.log(res.data,'---movies values result');
          setLoadingFav('');

          })
       }

       useEffect(() => {

        const getFavLists =  () => {
          var fav_saveurl = API_URL + '/login/favorite_get_listingall.php';
           axios
            .get(fav_saveurl, {
            params: {
              email: window.btoa(LOGGED_EMAIL),
              fav_type:window.btoa('fav_filmdata')
            },
            })
            .then((res) => {
      /// console.log(Object.values(res.data));
         setItems(res.data);
            })
            .catch((err) => console.log('Movies lists error ', err));
          };
          getFavLists();

      }, []);
    return (<>

<section className="favmovies nowshowing toplinesec ">
	<div className="container">
	<div className="top_txt df fww just-between">
			<h2>Movies <i className="fal fa-angle-right"></i></h2>
			<div className="viewmovrebtn df fww">
      <div className="favaddinput">

      <div className="favinbox pvr">
						<input type="text" placeholder="Enter Movie" list="favmoviename1"   value={movieName}
					 onChange={(e)=>setMovieName(e.target.value)}/>
						<button onClick={searchMovies}><i className="far fa-search"></i></button>
						<div className="favauto" style={hiddenValue}>
							<ul>
              {searchData.map((movieSearch,index)=>{
                   return( <li key={index} onClick={()=>searchSelect(movieSearch.title)}>{movieSearch.title}</li>)
                })
                }
							</ul>
						</div>
					</div>
					<button className="btn goldbtn" onClick={(e)=>addFavoriteMovie('button')}>add </button>{loadingFav}
			</div>
      <Link href="/favorite/movies" className="btn goldbtn viewbtnbox">
				view all</Link>
			</div>

		</div>
		<div className="nowshow_sliderbox">
		<Slider {...SliderSettings} className="nowshow_slider roundslickarrow">
            {movieData.map((current,index)=>{
             var imageSrc=current.image_url;

             var ID = current.ID;
             var movieUrl = current.permalink;
             const linkurl =current.permalink.includes("film-detail")? movieUrl: `/film-detail${movieUrl}`;

           return (<>
                 <div className="nowshow_item">
                <div className="nowshow_iteminner">
                  <figure className="pvr">
                   <Link href={current.permalink}>
                       <Image src={imageSrc} as="image" title="Movie Image"  width="300" height="205" alt="Movie Image" className="objctimg_box" />
                    </Link>
                  </figure>
                  <div className="nowshow_info">
                    <h5>

                    <Link href={linkurl}>
                    {current.title}{' '}  </Link>
                      <span onClick={()=>favoriteHeart(ID,'fav_filmdata')}
						        	className={(items.includes(ID)) ? 'favheart  redtxt' : 'favheart '}>
                          <i className={( items.includes(ID)) ? 'fas fa-heart' : 'far fa-heart '}></i>
                        </span>

                    </h5>
                    <div className="pghr df fww just-between">
                      <div className="rating">{current.rating}</div>
                      <time>{current.runtime}</time>
                    </div>
                  </div>
                  <div className="watchbtn ">
                    <span className="eatchoptionbtn">Watch Options</span>
                    <ul >
                      <li>
                        <Link href="" target="_self" tabindex="0">Find Showtimes</Link>
                      </li>
                      <li>
                        <Link href="" target="_self" tabindex="0">Watch Now</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
           </>)
        })
}

            </Slider>{' '}
		</div>
	</div>
</section>
    </>)
}


export default MovieListing;