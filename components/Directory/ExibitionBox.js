import React from 'react';
import imgData from '../data.json';
import Link from 'next/link';

function ExibitionBox({ data }) {
  return (
    <div className="exhibbox df fww just-between">
      <div className="exhibfeature">
        <h4>
          <Link href={data.url.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>{data.title}</Link>
        </h4>
        <div className="exhibox_media">
          <div className="startsponser">
            <div className="starico">
              <i className="fas fa-star"></i>
            </div>
            Sponsor
          </div>
          <div className="exhibox_mediaslide">
            <div className="exhibox_mediasliditem">
              <figure>
                <a href={data.url}>
                  <img src={data.img} alt="" />
                </a>
              </figure>
            </div>
          </div>
        </div>
      </div>
      <div className="exhibfurther  df fww just-between">
        <h5>
          {data.no_locations}, {data.exhibitor_screens}
        </h5>
        <div className="exhibfurther_left">
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
                        <a href={item.link}>{item.title}</a>
                      </h5>
                      <p>
                        {item.city}, {item.state}
                      </p>
                      <p> {item.theatre_screens} </p>
                      {/* {item.theatre-screens} */}
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>

        <div className="exhibfurther_right">
          {data.theatres_list.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {index >= 2 ? (
                  <div className="exhibfurtherright_row">
                    <p>
                      <a href={item.link} title={item.title}>
                        {item.city}, {item.state} | {item.theatre_screens}
                        {/* {item.theatre-screens} */}
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
        </div>
      </div>
    </div>
  );
}

export default ExibitionBox;
