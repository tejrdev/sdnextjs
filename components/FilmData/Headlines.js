const Headlines = ({ data }) => {
  return (
    <div className="filmupdate_boxbtm">
      <div className="seclinespace">
      <div className="top_txt df fww just-between">
            <div className="secnav df fww">
            <h2>
              <strong>
                Headlines <i className="far fa-angle-right"></i>
              </strong>
            </h2>
            </div>
      </div>
        <div className="filmupdate_boxbtmblock  df fww">
          {data.map((item, index) => {
            return (
              <div className="filmupdate_boxbtmitem" key={index}>
                <div className="fmupdate_boxitemin df fww">
                  <div className="fmupdate_boxmedia pvr">
                    <a href={item.link} target="_blank" rel="noreferrer">
                      <img src={item.img} alt={item.source} className="objctimg_box"/>
                    </a>
                  </div>
                  <div className="fmupdate_boxtitle">
                    <h6>
                      <strong>
                        <a href={item.link} title={item.source}>
                          {item.source}
                        </a>
                      </strong>
                    </h6>
                  </div>
                  <div className="fmupdate_boxtxt">
                    <div className="fmupdate_boxaurthor">
                      <div className="bgimage">
                        <img src={item.bg_img} className="objctimg_box" alt="" />
                      </div>
                      <span>
                        {item.source}  {item.dates}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Headlines;
