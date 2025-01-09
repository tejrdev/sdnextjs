import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Link from 'next/link';
import { convertToInternationalCurrencySystem } from '../Homepage/FilmData';
import sdplaceholder2 from '@/public/sdplaceholder2.jpg';

const BoxOfficeResults = ({ data, title }) => {
  const SliderSetting = {
    slidesToShow: 3,
    slidesToScroll: 3,
    variableWidth: true,
    speed: 300,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 7000,
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
    <section className='fmboxoffice'>
      <div className='container'>
        <div className='seclinespace'>
          <div className='top_txt df fww just-between'>
            <h2>
              <Link href='/movies/box-office-results'>
                Box Office Results <i className='fal fa-angle-right'></i>
              </Link>
            </h2>
            <div className='fmresult_view df fww'>
              <span>{title} (Weekend)</span>
              <div className='view_btn'>
                <Link href='/movies/box-office-results' className='btn'>
                  View More
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Slider {...SliderSetting} className='fmboffice_slider slickroundnav slick-dotted'>
          {data &&
            data.map((item, index) => {
              return (
                <div className='fmboxoffice_item' key={index}>
                  <Link href={item.permalink.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                    <span className='fmboxoffice_itemin df fww'>
                      <figure className='pvr'>
                        <img src={item.poster_thumbnail === null || item.poster_thumbnail === 'https://live.screendollars.com/wp-content/uploads/2020/05/no-img.jpg' ? sdplaceholder2.src : item.poster_thumbnail} alt='' className='objctimg_box' />
                      </figure>
                      <span className='fmboxoffice_info'>
                        <h4>
                          {index + 1} - {item.title}
                        </h4>
                        <p>
                          <span className='film_distri_name'>{item.distributor_name}</span>
                          <span className='block'>{item.weekend_gross ? 'Opening -' + convertToInternationalCurrencySystem(item.weekend_gross) : ''}</span>
                          <span className='block'> Locations - {item.locations.toLocaleString()}</span>
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
