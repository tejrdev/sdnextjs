import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import imgData from '../../components/data.json';

function Videos({ data }) {
  const SliderSettings = {
    slidesToShow: 3,
    speed: 300,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 8000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
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
    <div className="homfilm_media hmgrybg">
      <h5>       
          Media <i className="fal fa-angle-right"></i>
      </h5>
      <Slider {...SliderSettings} className="homfilm_mediainner df fww roundslickarrow">
        {data &&
          data.map((item, id) => {
            let divCls = 'homfilm_mediaitem';
            const isImage = item.image__video;
            isImage === 'vid' ? (divCls += ' hmvidbox') : (divCls += '');

            const img_size = item.image_size;
            img_size === 'Landscape' ? (divCls += ' verticalbox ') : (divCls += ' hoizontalbox');
            return (
              <div className={divCls} key={id}>
                <a className={isImage === 'vid' ? 'popvid' : ''} href={item.video_url}>
                  {isImage === 'vid' ? (
                    <span className="playico">
                      <img src={imgData.playicon} alt="play" />
                    </span>
                  ) : null}
                  <figure className="pvr">
                    <img src={item.image} className="objctimg_box" alt="" />
                  </figure>
                </a>
                <h5>{item.title}</h5>
                <p>{item.sub_title}</p>
              </div>
            );
          })}
      </Slider>
    </div>
  );
}

export default Videos;
