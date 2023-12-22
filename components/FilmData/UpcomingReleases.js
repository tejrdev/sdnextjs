import Slider from 'react-slick';
import Link from 'next/link';

import 'slick-carousel/slick/slick.css';

const UpcomingReleases = ({ data }) => {
  const SliderSetting = {
    slidesToShow: 4,
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
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="nowshow releasecalander">
      <div className="container">
        <div className="seclinespace">
          <div className="top_txt df fww just-between">
            <div className="secnav df fww">
              <h2>
                <Link href="/film-data/releases-by-week">
                  Upcoming Wide Releases <i className="fal fa-angle-right"></i>
                </Link>
              </h2>
            </div>
            <div className="view_btn">
              <Link href="/film-data/releases-by-week" className="btn">
                View More
              </Link>
            </div>
          </div>
          <div className="nowshow_infobox">
            <Slider {...SliderSetting} className="realsecal_slider roundslickarrow slick-dotted">
              {data &&
                data.map((item, index) => {
                  return (
                    <div className="rs_slideitems" key={index}>
                      <Link href={item.link}>
                        <figure className="pvr">
                          <img src={item.poster_thumbnail} alt="" className="objctimg_box" />
                        </figure>
                        <h5>
                          <strong>{item.title}</strong>
                        </h5>
                        <span className="timerate">
                          <p>
                            {item.rating ? (
                              <>
                                {' '}
                                <span className="ratingbox">{item.rating}</span> {' '}
                              </>
                            ) : (
                              ' '
                            )}

                            {item.genre}
                          </p>
                          <span>Opens {item.release_date.split('/')[0] + ' / ' + item.release_date.split('/')[1]}</span>
                        </span>
                      </Link>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingReleases;
