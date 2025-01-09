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
        <div className="newslist_block df fww xsm:-mx-2">
          {data.post_data &&
            data.post_data.map((item, index) => {
              return (
                <div className="newslist_item px-2 w-full xsm:w-1/2 md:w-1/4 mb-4" key={index}>
                  <div className="newslist_iteminner rounded-md h-full relative bg-gray-100">
                    <figure className="newslistmedia pvr">
                      <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                        <img src={item.img} alt="" className="objctimg_box" />
                      </Link>
                    </figure>
                    <div className="newslist_txt p-3 pb-8 lg:p-5 lg:pb-11">
                      <h5>
                        <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} dangerouslySetInnerHTML={{ __html: item.title }}></Link>
                      </h5>
                      <p className='absolute bottom-0'>{item.date}</p>
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
