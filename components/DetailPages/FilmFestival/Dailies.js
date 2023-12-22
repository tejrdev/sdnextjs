const Dailies = ({ data }) => {
  return (
    <section className="dailies toplinesec">
      <div className="container">
        <div className="top_txt df fww just-between">
          <h3>            
              Dailies <i className="fal fa-angle-right"></i>
          </h3>
        </div>
        <div className="dailiesbox downpdfshow grid gap16">
          {data.map((items, i) => {
            return (
              <>
                <div className="dailiesitem pastdate" key={i}>
                  <a
                    href={items.download_files}
                    download="download"
                    className="df fww"
                    target="_self"
                  >
                    <div className="festiveday_info">
                      <h4>{items.download_button_text}</h4>
                      <p>
                        <strong>{items.select_date}</strong>
                      </p>
                    </div>
                    <div className="download_pdfico">
                      <i className="far fa-arrow-to-bottom"></i>
                      <p>
                        <strong>PDF</strong>
                      </p>
                    </div>
                  </a>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Dailies;
