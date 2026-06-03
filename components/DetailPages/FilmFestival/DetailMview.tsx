import Link from 'next/link';

import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';

const DetailMview = ({ data }: any) => {
  const SliderSettings = {
    slidesToShow: 2,
    slidesToScroll: 2,
    speed: 300,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerPadding: '50px',
    focusOnSelect: true,
    //centerMode: true,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className='detialmview bg-[#f7f7fc] py-7 md:py-9 lg:py-12'>
      <div className='container'>
        <div className='top_txt flex flex-wrap justify-between'>
          <h2> Movie Reviews </h2>
        </div>
        <div className='moview'>
          <Slider className='moviewslider slickroundnav' {...SliderSettings}>
            {data.map((item: any, index: number) => (
              <div className='card  px-2' key={index}>
                <Link href={item.link} target='_blank' className='text-black hover:text-black flex flex-wrap bg-white border border-gray-300 rounded-lg'>
                  <figure className='pvr pb-28 lg:pb-36 w-36 xl:w-64 xl:pb-40'>
                    <img src={item.img} alt='' className='objctimg_box' loading='lazy' />
                  </figure>
                  <div className='moviewcard_info px-4 py-2'>
                    <h4 className='capitalize mb-0 hover:text-blue'>{item.title}</h4>
                    <p className='mb-1 line-clamp-3 ' dangerouslySetInnerHTML={{ __html: item.post_content }}></p>
                    <span className='readmorelink inline-flex justify-center items-center gap-2 rounded-full border border-black p-[2px] font-medium text-black transition-colors hover:bg-black hover:text-white hover:border-black focus:text-black capitalize px-4 py-1 w-[200px] mx-auto my-2'>read review</span>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
          <div className='view_btn'> <a className='capitalize font-bold text-lg text-black hover:text-blue hover:underline ml-2 mt-3 inline-block' href='/movie-reviews/'> View More </a> </div>
        </div>
      </div>
    </section>
  );
};

export default DetailMview;
