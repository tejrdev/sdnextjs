import React, {useState,useEffect} from 'react';
import FOURBTS from '../../public/fourabtsld.jpg';
import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_SD_API;
import Link from 'next/link'
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
   var LOGIN_TYPE = localStorage.getItem('from');
   var LOGGED_AVATAR = localStorage.getItem('avatar');
   var LOGGED_AVATAR_TITLE = localStorage.getItem('avatarTitle');
   var LOGGED_USER =localStorage.getItem('username');
    //console.log(LOGGED_AVATAR);
   // return false;
  }
const Headlines = ()=>{
    const [newsData,setNewsData] =useState([]);
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
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
      };
      useEffect(()=>{ listNews()},[]);
      const listNews = async () => {
        var profile_saveurl = API_URL + '/login/favorite_newsheadlines.php';
        await axios
          .get(profile_saveurl, {
            params: {
              email: window.btoa(LOGGED_EMAIL),
            },
          })
          .then((res) => {
          setNewsData(res.data);
          //console.log(res.data);


        })
          .catch((err) => console.log('Movies lists error ', err));
      };
return(<>
<section className="discnewsupdate toplinesec">
	<div className="container">
		<div className="top_txt">
			<h2>Headlines <i className="fal fa-angle-right"></i></h2>
		</div>
        <Slider {...SliderSettingNews} className="updateinfo_slider roundslickarrow">
          {newsData.map((newsc,index)=>{
              return (<>
             <div className="updateintro_box df fww">
              <Link href={newsc.link}  target="_blank" className="newupdicbox df fww">
                <figure className="pvr">
                  <img src={newsc.img} alt="" className="objctimg_box" />
                </figure>
                <div className="updateintro_txt">
                  <h5>{newsc.title} </h5>
                  <div className="srcnametime">
                    <strong>
                      <div className="fmupdate_boxaurthor">
                        <div className="bgimage" style={{ backgroundImage: `url(${newsc.icon_img})` }}></div>
                        <span>{newsc.source}</span>
                      </div>
                      <span>{newsc.date}</span>
                    </strong>
                  </div>
                </div>
              </Link>
            </div>
              </>)
          })}




          </Slider>
</div>
</section>
</>)

}

export default Headlines;
