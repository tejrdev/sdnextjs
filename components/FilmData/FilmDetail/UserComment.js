const UserComment = () => {
  return (
    <section className="usercomment usereview dlsecspace toplinesec">
      <div className="container">
        <div className="top_txt df fww just-between">
          <h2>
            User Reviews <span>(398)</span> <i className="fal fa-angle-right"></i>
          </h2>
          {/* <div className="viewmovrebtn">
            <a href="#!" className="btn goldbtn" target="_blank">
              View All
            </a>
          </div> */}
        </div>
        <div className="usercomment_info">
          <div className="usercomment_top df fww">
            <figure className="pvr">
              <img src={process.env.NEXT_PUBLIC_MENU_URL1 + '/wp-content/themes/screendollars/assets/images/fourabtsld.jpg'} alt="" className="objctimg_box" />
            </figure>
            <div className="username_title">
              <h5>
                Janet Nelson <small>8/29</small>
              </h5>
              <h3>Dope movie, Cinematography and score is on another level.</h3>
            </div>
          </div>
          <div className="usercomment_disc">
            <div className="userratings df fww">
              <label htmlFor="">Rating</label>
              <div className="starrate">
                <div className="graystar">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <div className="goldstar" style={{ width: '80%' }}>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
            </div>

            <div className="userdic_review">
              <p>
                This movie is not a cinematic masterpiece, and it doesn't need to be one. Uncharted is so friggin enjoyable, good portrayals of some iconic characters, great action, and seriously,
                Wahlberg and Holland is such a great combo. I seriously recommend everyone to go out and see it. Arrakis after his father accepts the stewardship of the dangerous planet. However,
                chaos ensues after a betrayal as forces clash to control melange, a precious resource.
              </p>
              {/* <!-- reply comments --> */}
              <div className="replybox ">
                <div className="reply_btn">
                  <button className="btn goldbtn">Reply</button>
                </div>
                <div className="replyinfo">
                  <p>
                    This movie is not a cinematic masterpiece, and it doesn't need to be one. Uncharted is so friggin enjoyable, good portrayals of some iconic characters, great action, and seriously,
                    Wahlberg and Holland is such a great combo. I seriously recommend everyone to go out and see it. Arrakis after his father accepts the stewardship of the dangerous planet. However,
                    chaos ensues after a betrayal as forces clash to control melange, a precious resource.
                  </p>
                  <div className="reply_btn">
                    <button className="btn goldbtn">Reply</button>
                  </div>
                </div>
                <div className="textbox">
                  <textarea name="" id="" cols="30" rows="5"></textarea>
                  <button className="btn">submit</button>
                </div>
              </div>
            </div>
          </div>
          <div className="user_leavecomment">
            
              <i className="fas fa-pen"></i> write a review
            
            <div className="textbox">
              <textarea name="" id="" cols="30" rows="5"></textarea>
              <button className="btn">submit</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserComment;
