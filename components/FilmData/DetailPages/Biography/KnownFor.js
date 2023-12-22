import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Link from 'next/link';

const KnownFor = ({ data }) => {
  const isInfinite = data.length > 4 ? true : false;
  const SliderSetting = {
    slidesToShow: 5,
    speed: 300,
    infinite: isInfinite,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className='movieknow toplinesec' id='known'>
      <div className='container'>
        <div className='top_txt'>
          <h2>
            Known For <i className='fal fa-angle-right'></i>
          </h2>
        </div>
        <Slider {...SliderSetting} className='movieknow_box df fww roundslickarrow'>
          {data.map((item, index) => {
            if (item.link !== '') {
              return (
                <div className='movieknow_item' key={index}>
                  <Link href={item.link} title=''>
                    <figure className='pvr'>
                      <img src={item.img} alt='' className='objctimg_box' />
                    </figure>
                    <div className='movieknow_info text-center'>
                      <h5>{item.title}</h5>
                      <p>
                        {item.character_name} <span>{'(' + item.release_year + ')'}</span>{' '}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            }
          })}
        </Slider>
      </div>
    </section>
  );
};

export default KnownFor;
