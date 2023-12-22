import React,{useEffect,useState} from 'react';
import Image from 'next/image';
import axios from 'axios';
import AMC from '../../public/amc-2.png';
import Link from 'next/link'
//import useLoginCheck from '../useLoginCheck';
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
    var LOGGED_AVATAR_TITLE = localStorage.getItem('avatarTitle');

  }

const DirectoryListing = () =>{
const [directoryData, setDirectoryData ]= useState([]);
const [searchData, setSearchData] = useState([]);
const [directoryName, setDirectoryName] = useState('');
const[hiddenValue,setHiddenValue] =useState({display:'none'});
const [loadingFav,setLoadingFav] = useState('');
const [items, setItems] = useState([]);
  useEffect(() => { listDirectory();   }, []);
  const listDirectory = async () => {
		var profile_saveurl = API_URL + '/login/fav_directory_listing.php';
		await axios
		  .get(profile_saveurl, {
			params: {
			  email: window.btoa(LOGGED_EMAIL),

			},
		  })
		  .then((res) => {
			var objectRelated = res.data;
      //console.log(objectRelated,'--favorite directory');
      setDirectoryData(objectRelated);
      const arrayDirectory =[];
      objectRelated.map((currentDirectory,index)=>{
        if(currentDirectory.favorite ===1){ arrayDirectory.push(currentDirectory.id); }
      })

      setItems(arrayDirectory);

		  })
		  .catch((err) => console.log('Distributor lists error ', err));
	  };


    const searchDirectory = ()=>{

      const directory = async()=>{
      var profile_saveurl = API_URL + '/login/favorite_directory_search_2.php';
      await axios
        .get(profile_saveurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            directoryname:window.btoa(directoryName),
          },
        })
        .then((res) => {

        setSearchData(res.data);
        //  console.log(res.data);
        setHiddenValue({display:' '});
      })
    .catch((err) => console.log('Directory lists error ', err));
   }
   directory();
}
const searchSelect =(value)=>{
  setHiddenValue({display:'none'});
  setDirectoryName(value);

}
const addFavoriteDir =async()=>{
  var favmobvie_addurl = API_URL + '/login/favorite_directory_add.php';
  if(LOGGED_EMAIL === null || LOGGED_EMAIL ===''){
		alert(ERRORLOGIN);
		return false;
	  }
  setLoadingFav(LOADER);
  await axios
    .get(favmobvie_addurl, {
    params: {
      email: window.btoa(LOGGED_EMAIL),
      directoryname: window.btoa(directoryName),
      type : 'button'
    },
    })
    .then((res) => {
     // console.log(res.data,'---directory values result');
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

  if(LOGGED_EMAIL === null || LOGGED_EMAIL ===''){
		alert(ERRORLOGIN);
		return false;
	  }

    handleFavorite(favoriteId);
  const addFavoriteAll =async()=>{
    var favmobvie_addurl = API_URL + '/login/fav_directory_setlisting.php';
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
      fav_type:window.btoa('fav_dist_listing')
    },
    })
    .then((res) => {
   //console.log(Object.values(res.data));
   //console.log(res.data,'--favorite directories');
   setItems(res.data);
    })
    .catch((err) => console.log('Directory lists error ', err));
    };
    getFavLists();

  }, []);

return(<>
   <section className="favcompany toplinesec">
        <div className="container">
        <div className="top_txt df fww just-between">
			<div className="top_txtleft df fww">
			<h2>Directory <i className="fal fa-angle-right"></i> </h2>
			<div className="taginfo df fww">
				<i className="fal fa-info-circle"></i>
				<p>This Include Distributors, Exhibitors, Vendors and Film Festivals</p>
			</div>
			</div>
			<div className="viewmovrebtn df fww">
				<div className="favaddinput">
				<div className="favinbox pvr">
						<input type="text" placeholder="Enter Companies and Organizations" list="favmoviename1" value={directoryName}
					 onChange={(e)=>setDirectoryName(e.target.value)}/>
						<button><i className="far fa-search" onClick={searchDirectory}></i></button>
						<div className="favauto" style={hiddenValue}>
							<ul>
              {searchData.map((directorySearch,index)=>{
                   return( <li key={index} onClick={()=>searchSelect(directorySearch.title)}>{directorySearch.title}</li>)
                })}
							</ul>
						</div>
					</div>
					<button className="btn goldbtn"  onClick={(e)=>addFavoriteDir('button')}>add</button> {loadingFav}
			</div>
				<Link href="/favorite/directory" className="btn goldbtn viewbtnbox" target="_self">view all</Link>
			</div>

		</div>
          <div className="favcompany_box grid gap16">
            { directoryData.map((currentElement,index)=>{
              const ID =currentElement.id;
              const type =currentElement.type;
              const directory =currentElement.directory_type;
              return(<>
               <div className="favcompanyitem">
                  <figure className="pvr">
                  <Link href={currentElement.link}>
                     <Image src={currentElement.img} alt= {currentElement.title}  title= {currentElement.title}
                     height="100" width="100"/>
                    </Link>
                  </figure>
                  <div className="favcompany_detail" >
                  <div className="text-center">
                    <div className="darectory_tag">{directory} </div>
                  </div>
                    <h4>
                      <Link href={currentElement.link}>
                       {currentElement.title}{' '}  </Link>
                       <span  className={( items.includes(ID)) ? 'favheart  redtxt' : 'favheart '}
                      onClick={()=>favoriteHeart(ID,type)}>
                          <i  className={(items.includes(ID)) ? 'fas fa-heart' : 'far fa-heart '}></i>
                       </span>

                    </h4>
                  </div>
                </div>
              </>)

            }) }



          </div>
        </div>
      </section>

</>)
}

export default DirectoryListing;