const Headlines = ({ data }) => {
  return (
    <section className="newslines toplinesec">
      <div className="container">
        <div className="top_txt df fww just-between">
          <h2>
            <a href={data.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
              Headlines <i className="fal fa-angle-right"></i>
            </a>
          </h2>
          <div className="viewmovrebtn">
            <a href={data.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} className="btn goldbtn">
              View More
            </a>
          </div>
        </div>
        <div className="newslines_block df fww">
          {data.data &&
            data.data.map((item, index) => {
              return (
                <div className="newslines_item" key={index}>
                  <div className="newslines_iteminner">
                    <div className="newslnitem_top df fww">
                      <div className="newslnitem_media pvr">
                        <a href={item.link} title={item.title} target="_blank" rel="noreferrer">
                          <img src={item.img} alt="" className="objctimg_box" />
                        </a>
                      </div>
                      <div className="newslnitrm_toptxt">
                        <h5>
                          <a href={item.link} title={item.title} target="_blank" rel="noreferrer">
                            {item.title}
                          </a>
                        </h5>
                      </div>
                    </div>
                    <div className="newslnitem_bottom">
                      <p>
                      <a href={item.source_url} title={item.title} target="_blank" rel="noreferrer">
                          <span
                            className="newscastimg bgimage"
                            style={{
                              background: 'url(' + item.source_icon + ')',
                            }}
                          ></span>                          
                          <span className="mediasrc">{item.source }</span>
                          </a>
                          {item.date_time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Headlines;
