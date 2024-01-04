// import FOURAB from '@/public/award-placeholder.webp';
let FOURAB='';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
const Awards = ({a_dic , a_list}) => {
  const SliderSettings = {
    slidesToShow: 3.5,
    slidesToScroll: 3,
    speed: 300,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerPadding: "50px",
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
    <section className="telnat_awards toplinesec" id="awards">
      <div className="container">
        <div className="top_txt">
          <h2>
            Awards <i className="fal fa-angle-right"></i>
          </h2>
            {a_dic && <p dangerouslySetInnerHTML={{ __html: a_dic }}></p> }            
        </div>
        <Slider className="telnat_awardsslider slickroundnav" {...SliderSettings}>
          
        {a_list && a_list.map((item, index) => {
            return (              
              <div className="tlnt_awardsitem" key={index}>
                <div className="tlnt_awardsitemin">
                  <div className="df fww">
                    <figure className="pvr">
                      {item.award_image ? <img
                        src={item.award_image}
                        alt=""
                        className="objctimg_box"
                      /> : 
                      <p className="awardplacetxt uppercase" title={item.award_name}><strong><span>{item.award_year}</span>
                      <span className="awardname">{item.award_name}</span></strong></p>
                      }
                    </figure>
                    <div className="telnat_awardsinfo">
                      <p><span> {item.award_year}</span>{item.award_category &&  <>{' - ' + item.award_category}</>}</p>                      
                      {item.award_name &&  <h5>{item.award_name}</h5>}
                      {item.event_name &&  <p>{item.event_name}</p>}
                      {item.movie_name &&  <p>{item.movie_name}</p>}                      
                    </div>
                  </div>
                </div>
              </div>
            )
        })}         
          
        </Slider>
      </div>
    </section>
  );
};

export default Awards;
