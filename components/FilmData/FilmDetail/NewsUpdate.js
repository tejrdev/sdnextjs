import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';


const NewsUpdate = ({ data }) => {
  const SliderSetting = {
    slidesToShow: 4,
    slidesToScroll: 4,
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
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const unicnews = data.filter((item, index, array) => {
    return array.findIndex(obj => obj.title === item.title) === index;
  });
  return (
    <section className="sd_m_data bg-[#EFEEEE] py-7 md:py-9 lg:py-12">
      <div className="container">
        <div className="top_txt mb-2">
          <h2> Headlines   </h2>
        </div>

        {/* <Slider
          {...SliderSetting}
          className="roundslickarrow slick-dotted"
        > */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4">
          {unicnews?.slice(-4).map((item, index) => {
            return (
              <div className="card text-left sm:text-left" key={index}>
                <a href={item.link} className="newupdicbox block text-black hover:text-[#00f] mx-0 sm:mx-0 w-[300px] sm:w-auto" target='_blank'>
                  <figure className="pvr w-[284px] sm:w-full  rounded-md overflow-hidden mb-2 pb-[161px] sm:pb-[57%]">
                    <img src={item.img} alt="" className="objctimg_box" />
                  </figure>
                  <div className=" w-full">
                    <h5 title={item.title} className="mb-0">{item.title}</h5>
                    {/* <div className="srcnametime">
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
                    </div> */}
                  </div>
                </a>
              </div>
            );
          })}
        </div>
        {/* </Slider> */}
      </div>
    </section>
  );
};

export default NewsUpdate;
