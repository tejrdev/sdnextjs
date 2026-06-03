import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';
import Link from 'next/link';
import { convertToInternationalCurrencySystem } from '../Homepage/FilmData';
import sdplaceholder2 from '@/public/images/sdplaceholder2.jpg';

import { motion } from 'motion/react';

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
          <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className='top_txt df fww just-between'>
            <h2>
              <Link href='/box-office-results'> Box Office </Link> <span className='text-base'>(Weekend - {title})</span>
            </h2>
            <div className='fmresult_view df fww'>
              <div className='view_btn'>
                <Link href='/box-office-results' className='btn'>
                  View All
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}>
          <Slider {...SliderSetting} className='fmboffice_slider slickroundnav slick-dotted'>
            {data &&
              data.map((item, index) => {
                return (
                  <div className='fmboxoffice_item' key={index}>
                    <Link href={item.permalink}>
                      <span className='fmboxoffice_itemin df fww'>
                        <div className='num h-[110px] w-6 bg-darkgold font-bold flex items-center justify-center text-black mr-1 rounded'>{index + 1}</div>
                        <figure className='pvr'>
                          <img
                            src={
                              item.poster_thumbnail === null || item.poster_thumbnail === process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-content/uploads/2020/05/no-img.jpg'
                                ? sdplaceholder2.src
                                : item.poster_thumbnail
                            }
                            alt=''
                            className='objctimg_box'
                          />
                        </figure>
                        <span className='fmboxoffice_info'>
                          <h5>{item.title} </h5>
                          <p>
                            {/* <span className='film_distri_name'>{item.distributor_name}</span> */}
                            <span className='block'>
                              {item.weekend_gross && (
                                <>
                                  {item.boxoffice_week_select_title} - <span className='font-semibold'>{convertToInternationalCurrencySystem(item.weekend_gross)}</span>
                                </>
                              )}
                            </span>
                            <span className='block'>
                              Total To Date - <span className='font-semibold'>{convertToInternationalCurrencySystem(item.total_to_date)}</span>
                            </span>
                            <span className='block'>
                              Weeks - <span className='font-semibold'>{item.weeks}</span>
                            </span>
                          </p>
                        </span>
                      </span>
                    </Link>
                  </div>
                );
              })}
          </Slider>
        </motion.div>
      </div>
    </section>
  );
};

export default BoxOfficeResults;
