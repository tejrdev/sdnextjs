const Previews = ({ data }) => {
  return (
    <section className="preview_time toplinesec">
      <div className="container">
        <div className="top_txt df fww just-between">
          <h2>
            <a href="">
              {data.title} <i className="fal fa-angle-right"></i>
            </a>
          </h2>
          <div className="viewmovrebtn">
            <a href="" className="btn goldbtn">
              View More
            </a>
          </div>
        </div>
        <div className="pretime_block grid gap16">
          {data.video_lists.map((item, index) => {
            return (
              <div className="pretime_item" key={index}>
                <a className="popvid" href={item.video_url}>
                  <figure className="pvr">
                    <img src={item.video_img} alt="" className="objctimg_box" />
                  </figure>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Previews;
