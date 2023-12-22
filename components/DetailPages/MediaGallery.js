const MediaGallery = ({ title, galary_imgs }) => {
  return (
    <div id="media_gallery" className="white-popup-block  mfp-hide formpopbox">
      <div className="formpop_info">
        <div className="allvidtop_txt">
          <div className="container">
            <div className="allvidhead pvr">
              <h1>
                <span>Videos and Images for</span>
                {title}
              </h1>
            </div>
          </div>
        </div>

        <section className="photodetail_gal distdetail_gal">
          <div className="container">
            <div className="photodtl_in">
              <div className="top_txt linehead">
                <h2 className="h3">Images</h2>
              </div>
              <div className="row">
                <div className="photogal_box df fww">
                  {galary_imgs.map((item, index) => {
                    return (
                      <div className="photogalitem_box" key={index}>
                        <a
                          className="media_gallery"
                          href={item.url ? item.url : item}
                          title="bannerbg.jpg"
                        >
                          <div className="photoinfoimg  pvr">
                            <img
                              src={item.url ? item.url : item}
                              alt=""
                              className="objctimg_box"
                            />
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
                <div className="galslide__arrows df fww">
                  <div className="gelslide__dots"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MediaGallery;
