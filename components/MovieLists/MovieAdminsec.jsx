import MovieAdminbox from "@/components/MovieLists/MovieAdminbox"
import { useEffect } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const MovieAdminsec = ({ sectitle, cls }) => {
   const SliderSetting = {
      slidesToShow: 3,
      slidesToScroll: 3,
      speed: 300,
      infinite: false,
      autoplay: false,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      dots: false,
      arrows: true,
      responsive: [
         {
            breakpoint: 1100,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
            },
         },
         {
            breakpoint: 700,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
            },
         },
      ],
   };
   useEffect(()=>{
      const $ = window.jQuery;
      $(".formpop").magnificPopup({
         type: "inline",
         preloader: false,
         focus: "#name",
         closeOnContentClick: false,
         // When elemened is focused, some mobile browsers in some cases zoom in
         // It looks not nice, so we disable it:
         callbacks: {
           beforeOpen: function () {
             if ($(window).width() < 700) {
               this.st.focus = false;
             } else {
               this.st.focus = "#name";
             }
           },
           open: function () {},
           close: function () {},
         },
       });
   },[]);
   return (
      <section className="topMovieadminedit secspace">
         <div className="container">
            <div className="seclinespace">
               <div className="top_txt df fww just-between">
                  <h2>{sectitle}<i className="far fa-angle-right"></i></h2>
                  <a className="ghostbtn uppercase goldbtn formpop" href='#editcollaction'>edit collection</a>
               </div>
               <div id='editcollaction' className='white-popup-block  mfp-hide collactionform'>
                  <div className='collaction_info'>
                      <h4>Edit Collection </h4>
                      <div className="df fww collcname"><p className="m-0"> Collection Name :</p>
                      <h4>Fantasy Movies</h4></div>
                      <div className="addmovlistbox">
                        <h3>Add Movie List </h3>
                        <form >
                           <div className='fromgroup'>
                              <label htmlFor="">Movie List Name</label>
                              <input type='text' placeholder='Enter Name' />
                           </div>
                           <div className='fromgroup'>
                              <label htmlFor="">Search an article</label>
                              <input type='text' placeholder='Enter Article Name' />
                           </div>
                           <div className='fromgroup'>
                              <label htmlFor="">Paste an article link</label>
                              <input type='text' placeholder='Enter Article Link' />
                           </div>
                           <div className='submitbtn mfp-prevent-close'>
                              <input type='button' value='Add List' className=' mfp-prevent-close uppercase' />
                           </div>
                        </form>
                      </div>
                  </div>
                </div>
            </div>
            <Slider {...SliderSetting} className="movieseditslider slickroundnav">
               <MovieAdminbox cls={cls}/>
               <MovieAdminbox cls={cls}/>
               <MovieAdminbox cls={cls}/>
               <MovieAdminbox cls={cls}/>
            </Slider>
         </div>
      </section>
   )
}

export default MovieAdminsec