import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { useEffect } from 'react';
import Link from 'next/link';
const $ = require('jquery');

function DistributorMedia({ data }) {
  function sliddateshow() {
    $('.distbox_slider .slick-slide').removeClass('currentprev_Slide');
    $('.distbox_slider .slick-slide.slick-current').prev().addClass('currentprev_Slide');
  }
  const SliderSetting = {
    slidesToShow: 2,
    speed: 300,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: '60px',
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          centerPadding: '30px',
        },
      },
      {
        breakpoint: 640,
        settings: {
          centerPadding: '0',
        },
      },
    ],
    afterChange: () => {
      sliddateshow();
    },
  };

  useEffect(() => {
    sliddateshow();
  }, []);
  return (
    <div className="distbox_one">
      <div className="distbox_in sponcerline">
        <h4>
          <Link href={data.url.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>{data.title}</Link>
        </h4>
        <div className="distbox_media sponcehov">
          <div className="startsponser">
            <div className="starico">
              <i className="fas fa-star"></i>
            </div>
            Featured
          </div>{' '}
          <figure>
            <a href={data.url}>
              <img src={data.img} alt="" />
            </a>
          </figure>
        </div>

        {data.films && data.films.length > 2 ? (
          <Slider {...SliderSetting} className="distbox_slider">
            {data.films.map((item, index) => {
              return (
                <div className="distboxsliditem" key={index}>
                  <a href={item.link}>
                    <div className="disboxslid_media">
                      <img src={item.img} alt="" />
                    </div>
                    <p>{item.release_date}</p>
                  </a>
                </div>
              );
            })}
          </Slider>
        ) : (
          <div className="distbox_slider">
            {data.films &&
              data.films.map((item, index) => {
                return (
                  <div className="distboxsliditem" key={index}>
                    <a href={item.link}>
                      <div className="disboxslid_media">
                        <img src={item.img} alt="" />
                      </div>
                      <p>{item.release_date}</p>
                    </a>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DistributorMedia;
