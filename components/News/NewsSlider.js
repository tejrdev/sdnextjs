import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const NewsSlider = ({ data }) => {
  const SliderSettings = {
    slidesToShow: 1,
    speed: 300,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: true,
    arrows: false,
  };
  return (
    <Slider {...SliderSettings} className="newwelslider slick-dotted">
      {data &&
        data.map((item, id) => {
          const cat_href =
            'https://www.screendollars.com/category/' + item.artical_cat.slug;
          return (
            <div className="newswelslid_item" key={id}>
              <a
                className=""
                href={item.artical_link}
                target="_blank"
                tabIndex="0"
                rel="noreferrer"
              >
                <div className="newswel_media">
                  <figure className="pvr">
                    <img
                      src={item.artical_img}
                      alt=""
                      className="objctimg_box"
                    />
                    <i className="fas fa-camera"></i>{' '}
                  </figure>
                  <div className="newswel_info">
                    <h4
                      dangerouslySetInnerHTML={{ __html: item.artical_title }}
                    ></h4>
                    <p>
                      {' '}
                      {/*<a href={cat_href} rel="category tag">*/}
                        {item.artical_cat.name}
                      {/*</a>*/}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
    </Slider>
  );
};

export default NewsSlider;
