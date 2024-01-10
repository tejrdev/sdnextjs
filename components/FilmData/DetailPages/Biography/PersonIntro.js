import Image from 'next/image';
import axios from 'axios';
import { useEffect,useState} from 'react'; 

const ERRORLOGIN = "Please Login First! ";
if (typeof window !== 'undefined') {
    var LOGGED_EMAIL = localStorage.getItem('email');
}

const PersonIntro = ({ data, favoriteList }) => {
  const API_URL = process.env.NEXT_PUBLIC_SD_API;
  const [items, setItems] = useState([]);
  var ID = data.talent_attachment;

  useEffect(()=>{
    if(favoriteList==1){ setItems([ID]) }
  },[favoriteList])




 const favoriteHeart = (favoriteId, favoriteType) =>{
  if(LOGGED_EMAIL === null || LOGGED_EMAIL ===''){
    alert(ERRORLOGIN);
    return false;
    }

  const addFavoriteAll =async()=>{
    var favmobvie_addurl = API_URL + '/login/favorite_all.php';
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
    })

   }
    addFavoriteAll();
}

  return (

    <section className={data.telent_bg_img ? "personintro  pvr detailbnrimgadd": "personintro  pvr"} >
      {data.telent_bg_img && (
      <div className="detailbnrimg">
        <img src={data.telent_bg_img} alt="" className="objctimg_box"/>
      </div>
      )}
      <div className="container">
        <div className="person_introbox">
          <div className="personpc">
            <figure className="personpcbox pvr">
              <img src={data.img} alt="" className="objctimg_box" />
            </figure>
            <div className="timepersonsocial df fww">
              <ul className="inbio_box">
                {data.talent_social_media.map((item, index) => {
                  return (
                    <li key={index}> <a href={item.link} target="_blank" title={item.name} rel="noreferrer"><i className={'fab ' + item.class} aria-hidden="true"></i></a></li>
                  );
                })}
              </ul>
            </div>

          </div>
          <div className="person_info" >
            {data.recent_update && (<div className="latestinfo_realse">{data.recent_update}</div>)}

            <h1 className="goldtxt">{data.name}
            <span onClick={()=>favoriteHeart(ID,'fav_actors')}
                className={( items.includes(ID)) ? 'favheart  redtxt biofavico' : 'favheart biofavico '}>
                <i className={(items.includes(ID)) ? 'fas fa-heart' : 'far fa-heart '}></i>
              </span>

            </h1>
            <div className="actorsocial_bio">
              <h4>{data.telent_have}</h4>
            </div>
            <div className="persnolinfo">
              {data.birthdate && (<p><strong>Birthdate:</strong> {data.birthdate}</p>)}
              {data.birthplace && (<p><strong>Birthplace:</strong> {data.birthplace}</p>)}
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
          </div>
          {data.content_more && (<div  className="readmore_btn" dangerouslySetInnerHTML={{ __html: data.content_more }}></div>) }
          {/* {console.log(data.content_more)} */}
        </div>
      </div>
    </section>



  );
};

export default PersonIntro;
