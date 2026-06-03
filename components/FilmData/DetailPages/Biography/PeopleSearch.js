import Link from "next/link";

const PeopleSearch = ({ data }) => {
  return (
    <section id="people_search" className="people_search toplinesec">
      <div className="container">
        <div className="top_txt">
          <p className="h2">
            People Also Searched For <i className="fal fa-angle-right"></i>
          </p>
        </div>
        <div className="peoplesrch_box df fww">
          {data.filter(item => item.length !== 0).map((item, index) => {
            return (
              <div className="peoplesrch_item" key={index}>
                {/* nopersonimg */}
                <Link href={item.link}>
                  <figure className="pvr">
                    <img src={item.img} alt="" className="objctimg_box" />
                  </figure>
                  <div className="personsrch_name">{item.title}</div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PeopleSearch;
