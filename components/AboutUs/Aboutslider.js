import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const Aboutslider = ({ data, key_val }) => {
  const SliderSetting = {
    slidesToShow: 1,
    speed: 300,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerPadding: '0',
    focusOnSelect: true,
    arrows: false,
    dots: true,
  };
  
  if ('img' === data.image__video) {
    return (
      <section
        className={
          key_val % 2 === 0
            ? 'aboutmovie_info secspace  leftmedia'
            : 'aboutmovie_info secspace '
        }
      >
        <div className="container">
          <div className="abtmovid_box df fww">
            <div className="abt_movietxt">
              <h3>{data.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
            </div>
            <div className="abtmovie_mediabox">
              <Slider {...SliderSetting} className="abtinfo_slider">
                {data.images.map((item, index) => {
                  return (
                    <div className="abtinfo_sliditem">
                      <div className="abt_infoslidimg pvr">
                        <img src={item.url} className="objctimg_box" />
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section
        className={
          key_val % 2 === 0
            ? 'aboutmovie_info secspace  leftmedia'
            : 'aboutmovie_info secspace '
        }
      >
        <div className="container">
          <div className="abtmovid_box df fww">
            <div className="abt_movietxt">
              <h3>{data.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
            </div>
            <div className="abtmovie_mediabox">
              <div className="abtinfo_video">
                <a
                  title=""
                  className="popvid popyoutube"
                  href={data.video_on_featured_image}
                >
                  <span className="playico">
                    <img src="" alt="play" />
                  </span>
                  <div className="artinfoimg pnr">
                    <img
                      src={data.video_background_image}
                      alt=""
                      className="objctimg_box"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Aboutslider;
