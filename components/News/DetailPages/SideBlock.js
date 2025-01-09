import Link from 'next/link';

const SideBlock = ({ data, requestFrom }) => {
  return (
    <>
      {data.categories && (
        <>
          <div className="side_block">
            <div className="sideblck_top">
              <h4>Categories</h4>
            </div>
            <ul className="cat_listing">
              {data.categories.map((item, index) => {
                return (
                  <li key={index}>
                    <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                      {item.name}
                      <span>{item.count}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
      {requestFrom === 'Archives' ? (
        <>
          <div className="side_block">
            <div className="sideblck_top">
              <h4>{data.archives.title}</h4>
            </div>
            <ul
              className="cat_listing"
              dangerouslySetInnerHTML={{
                __html: data.archives.links,
              }}
            ></ul>
          </div>
          <div className="side_block rspostside">
            <div className="sideblck_top">
              <h4>{data.recent_post.title}</h4>
              <Link href={data.recent_post.seemore.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>See More &gt;&gt;</Link>
            </div>
            <ul className="rspostlist">
              {data.recent_post.posts.map((item, index) => {
                return (
                  <li key={index}>
                    <Link href={item.links.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                      <div className="rspost_thumb">
                        <div className="rspost_img pvr">
                          <img src={item.img} alt="" className="objctimg_box" />
                        </div>
                      </div>

                      <div className="rspost_txt">
                        <h6>{item.title}</h6>
                        <p className="spotlight">{item.cate_name}</p>
                        <p className="datetxt">{item.posted}</p>{' '}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="side_block rspostside">
            <div className="sideblck_top">
              <h4>{data.recent_post.title}</h4>
              <Link href={data.recent_post.seemore.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>See More &gt;&gt;</Link>
            </div>
            <ul className="rspostlist">
              {data.recent_post.posts.map((item, index) => {
                return (
                  <li key={index}>
                    <Link href={item.links.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                      <div className="rspost_thumb">
                        <div className="rspost_img pvr">
                          <img src={item.img} alt="" className="objctimg_box" />
                        </div>
                      </div>

                      <div className="rspost_txt">
                        <h6>{item.title}</h6>
                        <p className="spotlight">{item.cate_name}</p>
                        <p className="datetxt">{item.posted}</p>{' '}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          {data.archives.title && (
          <div className="side_block">
            <div className="sideblck_top">
              <h4>{data.archives.title}</h4>
            </div>
            <ul
              className="cat_listing"
              dangerouslySetInnerHTML={{
                __html: data.archives.links,
              }}
            ></ul>
          </div>
          )}
        </>
      )}
    </>
  );
};

export default SideBlock;
