import Slider from 'react-slick';
import Link from 'next/link';
import { FaTag } from "react-icons/fa";

import 'slick-carousel/slick/slick.css';

const FeaturedList = ({ data }: any) => {
  const SliderSetting = {
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 300,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
    <section className='featurelist pt-4 md:pt-6 lg:pt-8'>
      <div className='container'>
        <div className='top_txt text-center mx-auto max-w-4xl md:mb-8'>
          <h2>{data.title}</h2>
          <p>{data.content}</p>
        </div>
        <div className='featureslid'>
          <Slider {...SliderSetting} className='featureslid_box slick-dotted'>
            {data.list.map((item: any, index: number) => (
              <div className='px-3' key={index}>
                <Link href={item.link}>
                  {item.sub_title === 'Theatre' ?
                    <figure className='border-2 border-gold rounded-md flex justify-center items-center bg-gold-yellow min-h-52 mb-2 relative'>
                      <img src={item.img} alt='' className='objimg rounded-md' />
                    </figure> :
                    <figure className='border-2 border-gold rounded-md flex justify-center items-center bg-gold-yellow min-h-52 mb-2 p-2'>
                      <img src={item.img} alt='' className='max-h-40' />
                    </figure>}
                </Link>
                <h3 className='mb-1 leading-tight'>{item.title}</h3>
                <p className='mb-0'><FaTag className='inline-block text-gray-600 rotate-90 text-xs mb-[2px] mr-1' />{item.sub_title}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default FeaturedList;
