import { useEffect } from 'react';

const $ = require('jquery');

const SingleActor = ({ data }) => {
  useEffect(() => {
    $('.readmore_btn').click(function () {
      $(this).closest('.timebio_person').toggleClass('open');
      $(this).hide();
    });
  }, []);
  return (
    <section className="timesbio toplinesec notopline">
      <div className="container">
        <div className="top_txt df fww just-between">
          <h2>
            
              Top Actors This Week <i className="fal fa-angle-right"></i>
            
          </h2>
        </div>
        <div className="timebio_person person_introbox">
          <figure className="personpc pvr">
            <img src={data.img} alt="" className="objctimg_box" />
          </figure>
          <div className="persondetail_box">
            <div className="person_info" style={{ height: '375px' }}>
              <h3>{data.title}</h3>
              <div className="actorsocial_bio">
                <p>
                  <strong>{data.telent_have.toString().replace(/,/g, ', ').replace(',', '/')}</strong>
                </p>
              </div>
              <div className="persnolinfo">
                <p>
                  <strong>Birthdate :</strong> {data.birthdate + data.birthdate_year}
                </p>
                <p>
                  <strong>Birthplace :</strong> {data.birthplace}
                </p>
              </div>
              <p>{data.post_content}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.post_content_view_more }}></div>
            <p className="staring" style={{ display: 'none' }}>
              Starring As Dr. Randall Mindy In Netflix's Don't Look Up
            </p>
            <div className="timepersonsocial df fww">
              <p>Social Media:</p>{' '}
              <ul className="inbio_box">
                {data.talent_social_media.map((item, index) => {
                  let cls = 'fab ';
                  cls += item.title;
                  return (
                    <li key={index}>
                      <a href={item.href} target="_blank" title={item.title} rel="noreferrer">
                        <i className={cls} aria-hidden="true"></i>
                        <span>{item.href}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleActor;
