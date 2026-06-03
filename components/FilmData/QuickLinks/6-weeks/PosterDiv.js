import Link from 'next/link';
import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';
import Postername from '../../../All/Postername'

const PosterDiv = ({ data }) => {
  const SliderSetting = {
    slidesToShow: 6,
    slidesToScroll: 6,
    speed: 300,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 991,
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
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  //console.log(data);
  return (
    <div className="container">
      <div className="top_txt border-t border-solid border-gray-300 pt-6 pb-2 px-3">
        <h3>
          {data.title}
          <i className="fal fa-angle-right"></i>
        </h3>
      </div>
      <Slider {...SliderSetting} className="posttab_slider roundslickarrow ">
        {data.movies && data.movies.length > 0 ?
          data?.movies?.map((item, index) =>
            <div className="posttabslid_item" key={index}>
              <Postername poster={item} />
            </div>
          ) : <div className="posttabslid_item">
            <p>No movies available</p>
          </div>}
      </Slider>
    </div>
  );
};

export default PosterDiv;
