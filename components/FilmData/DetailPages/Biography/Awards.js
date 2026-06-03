import Link from 'next/link';
import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';

export const Awarditem = ({ info }) => {
  return (
    <div className='tlnt_awardsitem'>
      <div className='tlnt_awardsitemin border border-gray-200'>
        <div className='df fww'>
          <figure className='pvr'>
            {info.award_image ? (
              <img src={info.award_image} alt='' className='' />
            ) : (
              <p className='awardplacetxt uppercase' title={info.award_name}>
                <strong>
                  <span>{info.award_year}</span>
                  <span className='awardname'>{info.award_name}</span>
                </strong>
              </p>
            )}
          </figure>
          <div className='telnat_awardsinfo'>
            <span> {info.award_year}</span>
            {info.award_name && <p className='h4'>{info.award_name}</p>}
            {info.event_name && <p>{info.event_name}</p>}
            {info.link && (
              <Link title={info.link.title} href={info.link.url} target={info.link.url}>
                <strong> {info.link.title}</strong>
              </Link>
            )}
            {/* {info.movie_name && <p>{info.movie_name}</p>} */}
          </div>
        </div>
      </div>
    </div>
  );
};
const Awards = ({ a_dic, a_list }) => {
  const SliderSettings = {
    slidesToShow: 3,
    slidesToScroll: 3,
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
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className='telnat_awards toplinesec' id='awards'>
      <div className='container'>
        <div className='top_txt'>
          <h2>
            Awards <i className='fal fa-angle-right'></i>
          </h2>
          {a_dic && <p dangerouslySetInnerHTML={{ __html: a_dic }}></p>}
        </div>
        <Slider className='telnat_awardsslider slickroundnav' {...SliderSettings}>
          {a_list &&
            a_list.map((item, index) => {
              return <Awarditem info={item} key={index} />;
            })}
        </Slider>
      </div>
    </section>
  );
};

export default Awards;
