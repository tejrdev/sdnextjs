import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const Photos = ({ data }) => {
  const isInfinite = data.length > 6 ? true : false;
  const SliderSetting = {
    slidesToShow: 6,
    slidesToScroll: 2,
    speed: 300,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 767,
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
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      {data.length > 0 && (
        <section className='photoslid toplinesec castperson_images' id='gallery'>
          <div className='container'>
            <div className='top_txt df fww just-between'>
              <h2>
                Gallery <i className='fal fa-angle-right'></i>
              </h2>
              {/* <div className="viewmovrebtn">
                <a href="talent_media=true" className="formpop btn goldbtn">
                  View More
                </a>
              </div> */}
            </div>
            <Slider {...SliderSetting} className='photo_slidbox df fww roundslickarrow'>
              {data?.slice(0, 18).map((item, index) => {
                return (
                  <>
                    {
                      /*index < 6 ? (*/
                      <div className='photo_sliditem' key={index}>
                        <div className='media_mvbox'>
                          <a className='media_gallery' href={item.url}>
                            <figure className='photoinfoimg  pvr'>
                              <img src={item.url} alt='' className='objctimg_box' />
                              <figcaption>{item.caption}</figcaption>
                            </figure>
                          </a>
                        </div>
                      </div>
                      /*) : null*/
                    }
                  </>
                );
              })}
            </Slider>
          </div>
        </section>
      )}
    </>
  );
};

export default Photos;
