const WatchAtHome = () => {
  return (
    <section className="watchhome dlsecspace toplinesec">
      <div className="container">
        <div className="top_txt df fww just-between">
          <h2>
            Watch At Home <i className="fal fa-angle-right"></i>
          </h2>
          <div className="viewmovrebtn">
            {/* <a
              href="#!"
              className="btn goldbtn"
              target="_blank"
            >
              more titles
            </a> */}
          </div>
        </div>
        <div className="watchome_box grid">
          <div className="watchome_item">
            {/* <a href="#!" target="_self"> */}
              <figure className="pvr">
                <img
                  src="/wp-content/themes/screendollars/assets/images/fourabtsld.jpg"
                  alt=""
                  className="objctimg_box"
                />
              </figure>
              <h5>F9: The Fast Saga</h5>
            {/* </a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatchAtHome;
