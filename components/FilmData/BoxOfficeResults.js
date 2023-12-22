import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Link from 'next/link';
import { convertToInternationalCurrencySystem } from '../Homepage/FilmData';

const BoxOfficeResults = ({ data, title }) => {
  const SliderSetting = {
    slidesToShow: 3,
    slidesToScroll: 3,
    variableWidth: true,
    speed: 300,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className="fmboxoffice">
      <div className="container">
      <div className="seclinespace">
        <div className="top_txt df fww just-between">
          <h2>
            <Link href="/film-data/box-office-results">
              Box Office Results <i className="fal fa-angle-right"></i>
            </Link>
          </h2>
          <div className="fmresult_view df fww">
            <span>{title} (Weekend)</span>
            <div className="view_btn">
              <Link href="/film-data/box-office-results" className="btn goldbtn">
                View More
              </Link>
            </div>
          </div>
        </div>
        </div>

        <Slider {...SliderSetting} className="fmboffice_slider slickroundnav slick-dotted">
          {data &&
            data.map((item, index) => {
              return (
                <div className="fmboxoffice_item" key={index}>
                  <Link href={item.permalink.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                    <span className="fmboxoffice_itemin df fww">
                      <figure className="pvr">
                        <img src={item.poster_thumbnail} alt="" className="objctimg_box" />
                      </figure>
                      <span className="fmboxoffice_info">
                        <h4>
                          {index + 1} - {item.title}
                        </h4>
                        <p>
                          <span className="film_distri_name">{item.distributor_name}</span>
                          <br /> Opening - $ {convertToInternationalCurrencySystem(item.weekend_gross)}
                          <br /> Locations - {item.locations.toLocaleString()}
                        </p>
                      </span>
                    </span>
                  </Link>
                </div>
              );
            })}
        </Slider>
      </div>
    </section>
  );
};

export default BoxOfficeResults;
