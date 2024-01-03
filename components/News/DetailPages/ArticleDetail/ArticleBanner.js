const ArticleBanner = ({ data }) => {
  return (
    <section className="artdetailbnr artbnrimg">
      <div className="container">
        <div className="artdtlbnr_info ">
          <div className="artdtlbnr_img">
            <img src={data.img_url} alt="" className="objctimg_box" />
          </div>
          {/* <a title="AMC, Cinemark, and Regal Cinemas Welcome You Back, Mask-Free, If You’re Vaccinated" class="popvid popyoutube" href="https://www.vulture.com/2021/05/amc-cinemark-regal-cinemas-lift-mandatory-covid-mask-rule.html" target="_blank"></a> */}
          <div className="artdtl_txt text-center">
            <div className="info_tags artdtltag artbnrtag">
              <ul
                className="df fww"
                dangerouslySetInnerHTML={{ __html: data.get_cat_ttiles }}
              ></ul>
            </div>
            <h1>{data.title}</h1>
          </div>
        </div>
        <div class="vid_caption text-center" dangerouslySetInnerHTML={{ __html: data.img_caption }}></div>
      </div>
    </section>
  );
};

export default ArticleBanner;
