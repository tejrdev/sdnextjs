import Link from 'next/link';

const NewsCategory = ({ data }) => {
  return (
    <section className="newslisting toplinesec">
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
        <div className="newslist_block df fww">
          {data.post_data &&
            data.post_data.map((item, index) => {
              return (
                <div className="newslist_item" key={index}>
                  <div className="newslist_iteminner">
                    <figure className="newslistmedia pvr">
                      <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                        <img src={item.img} alt="" className="objctimg_box" />
                      </Link>
                    </figure>
                    <div className="newslist_txt">
                      <h5>
                        <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} dangerouslySetInnerHTML={{ __html: item.title }}></Link>
                      </h5>
                      <p>{item.date}</p>
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

export default NewsCategory;
