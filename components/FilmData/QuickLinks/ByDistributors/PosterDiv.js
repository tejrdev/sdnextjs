import Link from 'next/link';

const PosterDiv = ({ data }) => {
  return (
    <div className="postertabvisual filter_tabsinfo" data-title="Poster">
      <div className="distinforesult_block">
        {data.map((item, index) => {
          return (
            <div className="posttabslid_item" key={index}>
              <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} title={item.title}>
                <div className="posterboxcap">
                  <figure className="pvr">
                    <img src={item.img} alt="" className="objctimg_box" />
                  </figure>
                  <h6>
                    <strong>{item.title}</strong>
                    <span>{item.release_date} </span>
                  </h6>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PosterDiv;
