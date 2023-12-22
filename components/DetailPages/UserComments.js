import { useEffect } from 'react';
const $ = require('jquery');

const UserComments = () => {
  useEffect(() => {
    $('.usercomment_disc').click(function () {
      $(this).toggleClass('open');
      $(this).find('.userdisc_full').slideToggle();
    });

    $('.user_leavecomment > span.link').click(function () {
      $(this).parent().toggleClass('open');
      $(this).parent().find('.textbox').slideToggle();
    });
  }, []);
  return (
    <section className="usercomment dlsecspace toplinesec">
      <div className="container">
        <div className="top_txt df fww just-between">
          <h2>
            User Comments <span>(398)</span> <i className="fal fa-angle-right"></i>
          </h2>
          {/* <div className="viewmovrebtn">
            <a href="#!" className="btn goldbtn" target="_blank">
              View More
            </a>
          </div> */}
        </div>
        <div className="usercomment_info">
          <div className="usercomment_top df fww">
            <figure className="pvr">
              <img src="http://staging.project-progress.net/projects/screendollars/wp-content/themes/screendollars/assets/images/fourabtsld.jpg" alt="" className="objctimg_box" />
            </figure>
            <div className="username_title">
              <h5>
                Janet Nelson <small>8/29</small>
              </h5>
              <h3>Dope movie, Cinematography and score is on another level.</h3>
            </div>
          </div>
          <div className="usercomment_disc">
            <i className="fas fa-chevron-down"></i>
            <div className="userdic_short">
              <p>
                I saw the renovated theater today. I expect there is still some exterior work to go, as the Loews signage has been taken down but just put a cheap looking AMC banner hanging in its
                place.
              </p>
            </div>
            <div className="userdisc_full" style={{ display: 'none' }}>
              <p>
                I saw the renovated theater today. I expect there is still some exterior work to go, as the Loews signage has been taken down but just put a cheap looking AMC banner hanging in its
                place.
              </p>
              <p>
                I saw the renovated theater today. I expect there is still some exterior work to go, as the Loews signage has been taken down but just put a cheap looking AMC banner hanging in its
                place.
              </p>
              <p>
                I saw the renovated theater today. I expect there is still some exterior work to go, as the Loews signage has been taken down but just put a cheap looking AMC banner hanging in its
                place.
              </p>
            </div>
          </div>
          <div className="user_leavecomment open">
            <span className='link'>
              <i className="fas fa-pen"></i> leave comment
            </span>
            <div className="textbox" style={{ display: 'none' }}>
              <textarea name="" id="" cols="30" rows="5"></textarea>
              <button className="btn">submit</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserComments;
