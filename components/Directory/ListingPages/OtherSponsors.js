import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const OtherSponsors = () => {
  const [otherSponsersDataLoaded, setOtherSponsersDataLoaded] = useState(false);
  const [otherSponsersData, setOtherSponsersData] = useState([]);

  const loadOtherSponsersData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/other_sponsors/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setOtherSponsersData(res.data);
        setOtherSponsersDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadOtherSponsersData();
  }, []);

  let otherslkopt;
  useEffect(() => {
    if (otherSponsersDataLoaded) {
      if (otherSponsersData.other_sponder.length < 5) {
        otherslkopt = false;
      } else {
        otherslkopt = true;
      }
    }
  }, [otherSponsersDataLoaded]);

  const SliderSetting = {
    slidesToShow: 4,
    speed: 300,
    infinite: otherslkopt,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 900,
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
    <section className="distsponser_btm">
      {otherSponsersDataLoaded && (
        <>
          <div className="top_txt df fww">
            <h3>Other Sponsors </h3>
            <i className="fal fa-info-circle"></i>
            {/*<div className="guidinfopop"></div>*/}
          </div>
          <div className="distbottom_sponcers df fww">
            {otherSponsersData &&
              otherSponsersData.other_sponder.map((item, index) => {
                return (
                  <div className="distbtm_sponcersitem" key={index}>
                    <div className="alldist_media">
                      <a href={item.link} title={item.title}>
                        <img src={item.img} alt="" className="" />
                      </a>
                    </div>
                    <h5 className="">
                      <a href={item.link} title={item.title}>
                        {item.title}
                      </a>
                    </h5>
                    <ul className="df fww tagtickat">
                      <li>
                        <a href={item.link}>{item.sub_title}</a>
                      </li>
                    </ul>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </section>
  );
};

export default OtherSponsors;
