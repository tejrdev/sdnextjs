import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const Casts = ({ data }) => {
  const isInfinite = data.length > 5 ? true : false;
  const SliderSetting = {
    slidesToShow: 6,
    slidesToScroll: 6,
    speed: 300,
    infinite: isInfinite,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 800,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className='casts dlsecspace printdochide toplinesec sd_m_data'>
      <div className='container'>
        <div className='castin'>
          <div className='top_txt df fww just-between'>
            <h2>
              Director & Top Cast <i className='fal fa-angle-right'></i>
            </h2>
          </div>

          <Slider {...SliderSetting} className='castcrew roundslickarrow'>
            {data.map((item, index) => {
              if (item.link !== '') {
                return (
                  <div className='catcrewcol' key={index}>
                    <ul className='castcrew_people'>
                      <li>
                        <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                          <div
                            className='cast_pic bgimage'
                            style={{
                              background: 'url(' + item.img + ')',
                            }}></div>
                          <div className='cast_info'>
                            <h5>{item.name}</h5>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: item.talent_name,
                              }}></p>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                );
              }
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Casts;
