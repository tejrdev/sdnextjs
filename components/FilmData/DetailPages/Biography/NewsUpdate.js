import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const NewsUpdate = ({ data }) => {
  const SliderSetting = {
    slidesToShow: 3,
    speed: 300,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="discnewsupdate printdochide toplinesec" id="news_updates">
      <div className="container">
        <div className="top_txt">
          <h2>
            News & Updates <i className="fal fa-angle-right"></i>
          </h2>
        </div>

        <Slider {...SliderSetting} className="updateinfo_slider roundslickarrow">
          {data.map((item, index) => {
            return (
              <div className="updateintro_box df fww" key={index}>
                <a href={item.link} className="newupdicbox df fww">
                  <figure className="pvr">
                    <img src={item.img} alt="" className="objctimg_box" />
                  </figure>
                  <div className="updateintro_txt">
                    <h5>{item.title}</h5>
                    <div className="srcnametime">
                      <strong>
                        <div className="fmupdate_boxaurthor">
                          <div
                            className="bgimage"
                            style={{
                              background: 'url(' + item.icon_img + ')',
                            }}
                          ></div>
                          <span>{item.source}</span>
                        </div>
                        <span>{item.date}</span>
                      </strong>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default NewsUpdate;
