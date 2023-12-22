import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const PosterDiv = ({ data }) => {
  const SliderSetting = {
    slidesToShow: 6,
    slidesToScroll: 6,
    speed: 300,
    infinite: false,
    autoplay: true,
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
      <div className="top_txt">
        <h3>
          {data.title}
          <i className="fal fa-angle-right"></i>
        </h3>
      </div>
      <Slider {...SliderSetting} className="posttab_slider roundslickarrow">
        {data.movies &&
          data.movies.map((item, index) => {
            return (
              <div className="posttabslid_item" key={index}>
                <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL, '')}>
                  <div className="posterboxcap">
                    <figure className="pvr">
                      <img src={item.img} className="objctimg_box" alt="" />
                    </figure>
                    <h6>
                      {item.title} <span dangerouslySetInnerHTML={{ __html: item.release_date }}></span>{' '}
                    </h6>
                  </div>
                </Link>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default PosterDiv;
