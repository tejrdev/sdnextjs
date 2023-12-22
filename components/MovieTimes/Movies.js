import Link from 'next/link';

const Movies = ({ data }) => {
  return (
    <section className="teater_time toplinesec">
      <div className="container">
        <div className="top_txt df fww just-between">
          <h2>
            <Link href={data.view_more_link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
              {data.title} <i className="fal fa-angle-right"></i>
            </Link>
          </h2>
          <div className="viewmovrebtn">
            <Link href={data.view_more_link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} className="btn goldbtn" target="_blank" rel="noreferrer">
              View More
            </Link>
          </div>
        </div>
        <div className="movietime_posters grid gap16">
          {data.movies.map((item, index) => {
            return (
              <div className="mvtime_posteritem" key={index}>
                <a href={item.link}>
                  <figure className="pvr">
                    <img src={item.img} alt="" className="objctimg_box" />
                  </figure>
                  <span className="movietime_postinfo">
                    <h6>{item.title}</h6>
                    <p className="df fww just-between">
                      <span>
                        {'(' + item.m_year + ')'} - {item.runtime}{' '}
                      </span>
                      <span className="rating">{item.rating}</span>
                    </p>
                    <p className="df fww just-between">
                      <span>{item.genre.toString().replace(/,/g, ', ')}</span>
                    </p>
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Movies;
