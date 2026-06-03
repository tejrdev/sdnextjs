const FilmReview = ({ data }) => {
  return (
    <section className="filmfull_review toplinesec">
      <div className="container">
        <div className="top_txt">
          <h2> Movie Review </h2>
        </div>
        {data.map((item, index) => (
        <div className="filmreview_fullbox" key={index}>
          <div className="df fww">
            <figure className="pvr">
              <img
                src={item.img_url}
                alt=""
                className="objctimg_box"
              />
            </figure>
            <div className="reviewbox_info sm:pl-4">
              <h4>
                {item.title}
              </h4>
              <span dangerouslySetInnerHTML={{ __html: item.article_content }} />
              <div className="redmorevardict df fww">
                <a href={item.link} target="_blank" className="text-black uppercase font-semibold">read full review</a>
                
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </section>
  );
};

export default FilmReview;
