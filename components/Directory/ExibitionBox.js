import React from 'react';
import { JSONData } from '../shared/JSONData';
import Link from 'next/link';
import Slider from 'react-slick/lib/slider';
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
    <div className='exhibbox df fww just-between sponcerline pvr sponcehov'>
      <h4 className='w100'>
        <Link href={data.url}>{data.title}</Link>
      </h4>

      <div className="featuredtag right-2 top-0">Featured</div>
      {/* <div className='startsponser'>
        <div className='starico'>
          <i className='fas fa-star'></i>
        </div>
        Featured
      </div> */}
      <div className='exhibfeature'>
        <div className='exhibfeatureinfo df fww'>
          <div className='exhibox_media '>
            <Slider {...SliderSetting} className='exhibox_mediaslide w100'>
              <div className='exhibox_mediasliditem'>
                <figure>
                  <Link href={data.url}>
                    <img src={data.img} alt='' />
                  </Link>
                </figure>
              </div>

              <div className='exhibox_mediasliditem'>
                <figure>
                  <Link href={data.url}>
                    <img src={data.img} alt='' />
                  </Link>
                </figure>
              </div>
              <div className='exhibox_mediasliditem'>
                <figure>
                  <Link href={data.url}>
                    <img src={data.img} alt='' />
                  </Link>
                </figure>
              </div>
            </Slider>
          </div>
          <p className='exhibox_mediatxt'>{data.exi_content}</p>
        </div>
      </div>
      <div className='exhibfurther'>
        <div className='exhibfurther_right'>
          <h5>
            {data.no_locations}, {data.exhibitor_screens}
          </h5>
          {data.theatres_list.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {index < 2 ? (
                  <div className='exhibfurther_row df fww'>
                    <div className='other_spmedia pvr'>
                      <Link href={item.link}>
                        <img src={item.logo === null || item.logo === false ? JSONData.poster_img_v : item.logo} alt='' className='objctimg_box' />
                      </Link>
                    </div>
                    <div className='other_spinfo'>
                      <h5>
                        <Link href={item.link} title={item.title}>
                          {item.title}
                        </Link>
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
      </div>
    </div>
  );
}

export default ExibitionBox;
