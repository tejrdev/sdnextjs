import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Noactorimg from '../../../public/noactorcastlong.svg'

const Casts = ({ data }) => {
  /* const isInfinite = data.length > 5 ? true : false;
  const SliderSetting = {
    slidesToShow: 6,
    slidesToScroll: 6,
    speed: 300,
    infinite: false,
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
  }; */

  const topsix = data.slice(0, 6);
  const othercast = data.slice(6, 18);
  /* console.log(data, topsix, 'aa', othercast) */

  return (
    <section className='casts dlsecspace printdochide toplinesec sd_m_data'>
      <div className='container'>
        <div className='castin'>
          <div className='top_txt df fww just-between'>
            <h2>
              Director & Top Cast <i className='fal fa-angle-right'></i>
            </h2>
          </div>

          <div className='castcrewbox grid gap-5 border border-gray-300 rounded-xl pt-4 px-1'>
            {topsix.map((item, index) => {
              if (item.link !== '') {
                return (
                  <ul className='castcrew_people m-0' key={index}>
                    <li className='m-0'>
                      <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                        <div
                          className='cast_pic bgimage'
                          style={{
                            background: 'url(' + (item.img === "https://live.screendollars.com/wp-content/themes/screendollars-live/assets/images/noactor.svg" ? Noactorimg.src : item.img) + ')',
                          }}></div>
                        <div className='cast_info'>
                          <h5 className='mb-1'>{item.name}</h5>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: item.talent_name,
                            }}></p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                );
              }
            })}
          </div>
          <div className="othercast grid gap-4 mt-5">
            {othercast.map((item, index) => {
              if (item.link !== '') {
                return (
                  <div className="othercastitem" key={index}>
                    <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} className='text-black flex'>
                      <div
                        className='cast_pic bg-cover bg-no-repeat bg-top w-16 h-[75px] rounded-md'
                        style={{
                          backgroundImage: 'url(' + (item.img === "https://live.screendollars.com/wp-content/themes/screendollars-live/assets/images/noactor.svg" ? Noactorimg.src : item.img) + ')',
                        }}></div>
                      <div className="castinfo pl-3">
                        <h5 className='mb-1'>{item.name}</h5>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item.talent_name,
                          }}></p>
                      </div>
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Casts;
