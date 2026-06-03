import Slider from 'react-slick/lib/slider';
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
    <div className='distbox_one sponcehov'>
      <div className='distbox_in sponcerline pvr featurebox'>
        <div className='top_txt df just-between '>
          <h4>
            <Link href={data.url}>{data.title}</Link>
          </h4>
          {/* <div className="startsponser">
            <div className="starico"><i className="fas fa-star"></i></div>
            Featured
          </div>{' '} */}
          <div className='featuredtag right-2 top-0'>Featured</div>
        </div>
        <div className='distbox_media '>
          <figure>
            <Link href={data.url}>
              <img src={data.img} alt={data.title} className='max-w-40' />
            </Link>
          </figure>
        </div>

        {data.films && data.films.length > 2 ? (
          <Slider {...SliderSetting} className='distbox_slider'>
            {data.films.map((item, index) => {
              return (
                <div className='distboxsliditem' key={index}>
                  <Link href={item.link}>
                    <div className='disboxslid_media'>
                      <img src={item.img} alt='' />
                    </div>
                    <p>{item.release_date}</p>
                  </Link>
                </div>
              );
            })}
          </Slider>
        ) : (
          <div className='distbox_slider'>
            {data.films &&
              data.films.map((item, index) => {
                return (
                  <div className='distboxsliditem' key={index}>
                    <Link href={item.link}>
                      <div className='disboxslid_media'>
                        <img src={item.img} alt='' />
                      </div>
                      <p>{item.release_date}</p>
                    </Link>
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
