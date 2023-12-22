import imgData from '../data.json';

function RecentUpdates({ data, tag }) {
  return (
    <div className="container">
      <div className="top_txt">
        <h2>
          {tag === 'recent_post' ? 'Recent Updates' : 'Recently Viewed'}
          <i className="fal fa-angle-right"></i>
        </h2>
      </div>
      <div className="distbottom_sponcersupdate recentupdates df fww">
        {data.data &&
          data.data.map((item, index) => {
            return (
              <div className="distbtm_sponcersitem" key={index}>
                <div className="alldist_media ">
                  <a href={item.url} className="">
                    <img src={item.img ? item.img : imgData.poster_img_v} alt="" className="" />
                  </a>
                </div>
                {item.title ? (
                  <h5>
                    <a href={item.url} className="">
                      {item.title}
                    </a>
                  </h5>
                ) : (
                  ''
                )}
                <ul className="df fww tagtickat">
                  <li>{item.label ? <a href={item.label_link}>{item.label}</a> : ''}</li>
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default RecentUpdates;
