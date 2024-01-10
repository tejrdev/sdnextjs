import React from 'react';
import imgData from '../data.json';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

function ExibitionBox({ data }) {
  const SliderSetting = {
    slidesToShow: 1,
    speed: 300,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    centerPadding: '0',
    focusOnSelect: true,
    arrows: false,
    dots: true,
  };
  return (
    <div className="exhibbox df fww just-between sponcerline pvr sponcehov">
      <h4 className='w100'>
          <Link href={data.url.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>{data.title}</Link>
        </h4>
        <div className="startsponser">
              <div className="starico">
                <i className="fas fa-star"></i>
              </div>
              Featured
            </div>
      <div className="exhibfeature">
        
        <div className="exhibfeatureinfo df fww">
          <div className="exhibox_media ">
            
            <Slider {...SliderSetting} className="exhibox_mediaslide w100">
              <div className="exhibox_mediasliditem">
                <figure>
                  <a href={data.url}>
                    <img src={data.img} alt="" />
                  </a>
                </figure>
              </div>
              <div className="exhibox_mediasliditem">
                <figure>
                  <a href={data.url}>
                    <img src={data.img} alt="" />
                  </a>
                </figure>
              </div>
              <div className="exhibox_mediasliditem">
                <figure>
                  <a href={data.url}>
                    <img src={data.img} alt="" />
                  </a>
                </figure>
              </div>
            </Slider>
          </div>
          <p className='exhibox_mediatxt'>AMC Entertainment Holdings, Inc. (D/B/A AMC Theatres, Originally An Abbreviation For American Multi-Cinema; Often Referred To Simply As AMC And Known In Some Countries As AMC Cinemas...</p>
        </div>
      </div>
      <div className="exhibfurther">
        <div className="exhibfurther_right">
        <h5>
          {data.no_locations}, {data.exhibitor_screens}
        </h5>
          {data.theatres_list.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {index < 2 ? (
                  <div className="exhibfurther_row df fww">
                    <div className="other_spmedia pvr">
                      <a href={item.link}>
                        <img src={item.logo === null || item.logo === false ? imgData.poster_img_v : item.logo} alt="" className="objctimg_box" />
                      </a>
                    </div>
                    <div className="other_spinfo">
                      <h5>
                        <a href={item.link} title={item.title}>{item.title}</a>
                      </h5>
                      <p>
                        {item.city}, {item.state}
                      </p>
                      {/*<p> {item.theatre_screens} </p>
                       {item.theatre-screens} */}
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>


        {/* <div className="exhibfurther_right">
          {data.theatres_list.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {index >= 2 ? (
                  <div className="exhibfurtherright_row">
                    <p>
                      <a href={item.link} title={item.title}>
                        {item.city}, {item.state} | {item.theatre_screens}
                        
                      </a>
                    </p>
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
          {data.view_more && (
          <div className="exhibfurtherright_more">
            <a href={data.view_more} title="View More">
              View More..
            </a>
          </div>
          )} 
        </div> */}
      </div>
    </div>
  );
}

export default ExibitionBox;
