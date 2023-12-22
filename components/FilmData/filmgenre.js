import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Link from 'next/link';
import Image from 'next/image';
import FOURAB from '../../public/images/fourabtsld.jpg';

const Filmgenre = ({ data }) => {
  const SliderSetting = {
      slidesToShow: 5,
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
  };

  
  return (
    <>
    {data.genre_list && (
      <section className="fmgenre ">
        <div className="container">
              <div className="top_txt df fww just-between">
                <div className="secnav df fww">
                    <h2>
                      <Link href={data.page_link}>
                      {data.page_title} <i className="fal fa-angle-right"></i>
                      </Link>
                    </h2>
                </div>
                <div className="fmresult_view df fww">
                    <div className="view_btn">
                    <Link href={data.page_link} className="btn goldbtn">
                    View More
                    </Link>
                </div>
              </div>
        </div>

          <Slider {...SliderSetting} className="fmgenre_slider slickroundnav slick-dotted">
            {data.genre_list &&
              data.genre_list.map((item, index) => {
                return (
                  <div className="fmgenre_item" key={index}>
                    <Link href={data.page_link + item.select_genre}>
                      <span className="fmgenre_itemin df fww">
                        <figure className="pvr">
                          <Image src={item.genre_image}  alt="" className="objctimg_box" width="250" height="90"/>
                          <figcaption className="genmiddlename">{item.select_genre}</figcaption>
                        </figure>                        
                      </span>
                    </Link>
                  </div>
                );
              })}
          </Slider>
        </div>
      </section>
    )}
    </>
  );
};

export default Filmgenre;
