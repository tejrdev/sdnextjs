const OpenLetter = ({ data }) => {
  return (
    <section className="openletter toplinesec">
      <div className="container">
        <div className="top_txt df fww just-between">
          <h3>
            {/* <a href={data.opening_letter_title} target="_blank">
              {data.title} <i className="fal fa-angle-right"></i>
            </a> */}
            {data.opening_letter_title}
          </h3>
        </div>
        <div className="openletterbox df fww">
          <div className="opencol">
            <div className="opencol_info">
              <div
                className="topread_view"
                dangerouslySetInnerHTML={{ __html: data.opening_letter_text }}
              ></div>
              <div
                className="topread_open"
                dangerouslySetInnerHTML={{ __html: data.opening_letter_text }}
              ></div>
              <div className="readmore_view">
                <strong>Read More</strong>
              </div>{' '}
            </div>
          </div>
          <div className="openletter_media">
            <a href={data.hyperlink} target="_blank" rel="noreferrer">
              <figure className="pvr">
                <img src={data.image} alt="" className="objctimg_box" />
                <figcaption>
                  <h4>{data.image_title}</h4>
                </figcaption>
              </figure>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenLetter;
