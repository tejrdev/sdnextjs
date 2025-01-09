import Link from 'next/link';

const IndustryNews = ({ data }) => {
  return (
    <section className="timefilmflash toplinesec">
      <div className="container">
        <div className="top_txt df fww just-between">
          <h2>
            <Link href={data.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
              {data.title} <i className="fal fa-angle-right"></i>
            </Link>
          </h2>
          <div className="viewmovrebtn">
            <Link href={data.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} className="btn goldbtn">
              View More
            </Link>
          </div>
        </div>
        <div className="timefilmflash_box ">
          <Link href={data.cat_link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} className="df fww just-between">
            <figure className="personpc pvr">
              <img src={data.img} alt="" className="objctimg_box" />
            </figure>
            <div className="timefilmflash_info">
              <h3>{data.cat_title}</h3>
              <p className="datetxt">
                <strong>{data.publish_date}</strong>
              </p>
              <p>{data.article_content}</p>
              <span className="readmorelink">Read Full Article</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IndustryNews;
