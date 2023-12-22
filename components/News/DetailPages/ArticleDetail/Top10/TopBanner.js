import AddToAny from '../../../../AddToAny';

const TopBanner = ({ data, requestFrom }) => {
  return (
    <section className="topartbnr">
      <div className="container">
        <div className="topartbnrbox">
          <div className="top_txt df fww">
            <div className="text-center w100"><h1>{data.title}</h1></div>
                
            {requestFrom !== 'quicklinks' ? (
              <div className="timeshare text-center">
                {/*<ul> <li>{data.read_time && <time>{data.read_time}</time>}</li>
                                  <li>
                                    <span className="topartshare">Share</span>
                                    <AddToAny />
                                  </li>
                                </ul>*/}
              </div>
            ) : null}
          </div>          
          <div className="topbnrmedia text-center">{(data.img || data.img_url) && <img src={data.img ? data.img : data.img_url} alt={data.title} />}</div>
          <div className="top_disc" dangerouslySetInnerHTML={{ __html: data.top_content }}></div>
          {/* <div className="top_disc" dangerouslySetInnerHTML={{ __html: data.tops_movies_more_info }}></div>          */}
          
        </div>
      </div>
    </section>
  );
};

export default TopBanner;
