import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import AddToAny from '../../../AddToAny';

const Recommanded = ({ recomoded }) => {
  const SliderSetting = {
    slidesToShow: 3,
    speed: 300,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className="art_sliderarea singleartslider">
      <div className="container">
        <div className="art_sliderbox">
          <div className="art_toptxt">
            <h2>{recomoded.title}</h2>
          </div>
          <Slider {...SliderSetting} className="art_slider">
            {recomoded.posts.map((item, index) => {
              return (
                <div className="art_sliditem" key={index}>
                  <div className="artslid_infothumb">
                    <a href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} title={item.title}>
                      <div className="artslidimg pvr">
                        <img src={item.img} alt="" className="objctimg_box" />
                      </div>
                    </a>
                    <div className="front-show social_share hovered">
                      <div className="share_ico">
                        <img src={process.env.NEXT_PUBLIC_MENU_URL1 + '/wp-content/themes/screendollars/assets/images/shareico.png'} alt="" />
                      </div>

                      <AddToAny />
                    </div>
                  </div>
                  <div className="artslid_sortdisc">
                    <h5>
                      <a href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} title="Steven Spielberg Gets Personal">
                        {item.title}
                      </a>
                    </h5>
                    <div className="info_tags">
                      <ul className="df fww">
                        <li className="spotlight">{item.cat}</li>
                        <li className="personsrc">{item.original_source}</li>
                        <li className="personinfo">Screendollars</li>
                        <li className="datesinfo">{item.publish_date}</li>{' '}
                      </ul>
                    </div>
                    <a href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} title="Steven Spielberg Gets Personal">
                      Read More &gt;&gt;
                    </a>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Recommanded;
