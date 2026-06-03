import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';


const NewsUpdate = ({ data }) => {
  const SliderSetting = {
    slidesToShow: 3,
    slidesToScroll: 2,
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
  const unicnews = data.filter((item, index, array) => {
    return array.findIndex(obj => obj.title === item.title) === index;
  });
  return (
    <section className="discnewsupdate toplinesec sd_m_data">
      <div className="container">
        <div className="top_txt">
          <h2> Headlines   </h2>
        </div>

        <Slider
          {...SliderSetting}
          className="updateinfo_slider roundslickarrow slick-dotted"
        >
          {unicnews.map((item, index) => {
            return (
              <div className="updateintro_box df fww" key={index}>
                <a href={item.link} className="newupdicbox df fww" target='_blank'>
                  <figure className="pvr">
                    <img src={item.img} alt="" className="objctimg_box" />
                  </figure>
                  <div className="updateintro_txt">
                    <h5 title={item.title}>{item.title}</h5>
                    <div className="srcnametime">
                      <strong>
                        <div className="fmupdate_boxaurthor">
                          <div
                            className="bgimage"
                            style={{ background: 'url(' + item.icon_img + ')', }}
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
    </section>
  );
};

export default NewsUpdate;
