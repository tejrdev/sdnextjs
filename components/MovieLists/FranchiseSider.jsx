import Featureitem from "./Featureitem"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const FranchiseSider = ({sliderTitle}) => {
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
  return (
     <section className="topmovieslidersec">
        <div className="container">
           <div className="seclinespace">
              <div className="top_txt">
                 <h2> {sliderTitle}<i className="far fa-angle-right"></i></h2>
              </div>
           </div>
           <Slider {...SliderSetting}  className="topmovieslider slickroundnav"> 
               <div className="topmovieslideitem"> <Featureitem /></div>
               <div className="topmovieslideitem"> <Featureitem /></div>
               <div className="topmovieslideitem"> <Featureitem /></div>
               <div className="topmovieslideitem"> <Featureitem /></div>
               <div className="topmovieslideitem"> <Featureitem /></div>
           </Slider>
        </div>
     </section>
  )
}

export default FranchiseSider