const FilmReview = () => {
  return (
    <section className="filmfull_review toplinesec">
      <div className="container">
        <div className="top_txt">
          <h2>
            Movie Review <i className="fal fa-angle-right"></i>
          </h2>
        </div>
        <div className="filmreview_fullbox">
          <div className="df fww">
            <figure className="pvr">
              <img
                src="/wp-content/themes/screendollars/assets/images/fourabtsld.jpg"
                alt=""
                className="objctimg_box"
              />
            </figure>
            <div className="reviewbox_info">
              <h4>
                {' '}
                Tom Cruise Returns To His Career-Making Role As A Hotshot U.S.
                Navy Pilot In This Shallow But Action-Packed Sequel.
              </h4>
              <span>
                A Jet-Propelled Fantasy About The Macho Rivalry Between Hotshot
                U.S. Navy Pilots, The Original Top Gun Rocketed Tom Cruise To
                Blockbuster Superstardom Back In 1986. Produced By Jerry
                Bruckheimer And Don Simpson, Masters Of The Ultra-Simple “High
                Concept” Action Movie, It Was Based On A Magazine Article,
                Pitched As A Poster, And Scored Massive Box Office Success.
                Simpson And Bruckheimer Chose Novice British Director Tony
                Scott, The Younger Brother Of Ridley, Partly Because He
              </span>
              <div className="redmorevardict df fww">
                <span className="redtxt">read full review on</span>
                <figure>
                  <img
                    src="/wp-content/themes/screendollars/assets/images/verdict_logo.png"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilmReview;
