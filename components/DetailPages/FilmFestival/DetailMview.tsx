import Link from 'next/link';

import Slider from 'react-slick';
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
    <section className='detialmview toplinesec mb-2'>
      <div className='container'>
        <div className='top_txt flex flex-wrap justify-between'>
          <h2>
            Movie Reviews <i className='fal fa-angle-right'></i>
          </h2>
          <div className='view_btn'>
            <a className='btn' href='/movie-reviews/'>
              View More
            </a>
          </div>
        </div>
        <div className='moview'>
          <Slider className='moviewslider slickroundnav' {...SliderSettings}>
            {data.map((item: any, index: number) => (
              <div className='card  px-2' key={index}>
                <Link href={item.link} target='_blank' className='text-black hover:text-black flex flex-wrap bg-slate-100'>
                  <figure className='pvr pb-28 lg:pb-36 w-36 xl:w-64 xl:pb-40'>
                    <img src={item.img} alt='' className='objctimg_box' loading='lazy' />
                  </figure>
                  <div className='moviewcard_info px-4 py-2'>
                    <h4 className='capitalize mb-0 hover:text-blue'>{item.title}</h4>
                    <p className='mb-1 line-clamp-3' dangerouslySetInnerHTML={{ __html: item.post_content }}></p>
                    <span className='readmorelink uppercase font-bold text-sm'>read review</span>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default DetailMview;
