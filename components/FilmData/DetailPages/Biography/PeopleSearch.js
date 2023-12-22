const PeopleSearch = ({ data }) => {
  return (
    <section id="people_search" className="people_search toplinesec">
      <div className="container">
        <div className="top_txt">
          <h2>
            People Also Searched For <i className="fal fa-angle-right"></i>
          </h2>
        </div>
        <div className="peoplesrch_box df fww">
          {data.map((item, index) => {
            return (
              <div className="peoplesrch_item" key={index}>
                {/* nopersonimg */}
                <a href={item.link}>
                  <figure className="pvr">
                    <img src={item.img} alt="" className="objctimg_box" />
                  </figure>
                  <div className="personsrch_name">{item.title}</div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PeopleSearch;
