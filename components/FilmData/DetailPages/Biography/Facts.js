const Facts = ({ name, data }) => {
  return (
    <section className="factsinfo toplinesec" id="facts">
      <div className="container">
        <div className="top_txt">
          <h2>
            Some Facts About {name} <i className="fal fa-angle-right"></i>
          </h2>
        </div>
        <div
          className="factinfo_box"
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
      </div>
    </section>
  );
};

export default Facts;
