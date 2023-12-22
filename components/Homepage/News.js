import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

function News({ data }) {
  const SliderSetting = {
    slidesToShow: 1,
    speed: 300,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    centerPadding: '0',
    focusOnSelect: true,
    arrows: false,
    dots: true,
  };
  return (
    <div className="container">
      <div className="seclinespace">
        <div className="top_txt df fww just-between">
          <div className="secnav df fww">
            <h2>
              <Link href={'/news'}>
                News <i className="fal fa-angle-right"></i>
              </Link>
            </h2>
          </div>
          <div className="view_btn">
            <Link href={'/news'} className="btn ">
              View More
            </Link>
          </div>
        </div>
        <div className="homnewsbox df fww">
          <div className="homnewsslider hmgrybg">
            <Slider {...SliderSetting} className="autosingle_slider slick-dotted">
              {data &&
                data.slider.map((item, id) => {
                  return (
                    <div className="homnewsslid_item" key={id}>
                      <figure className="pvr">
                        <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                          <img src={item.img} alt="" className="objctimg_box" />
                        </Link>
                      </figure>
                      <div className="top_txt">
                        <h5>
                          <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} dangerouslySetInnerHTML={{ __html: item.title }}></Link>
                        </h5>

                        <p>
                          {item.category} {item.publish_date}
                        </p>
                      </div>
                      {item.content === '' ? <p>{item.content}</p> : null}
                    </div>
                  );
                })}
            </Slider>
          </div>
          {/*<div className="homnewsmediabox">
            <div className="homnewmedia_item">
              {data.top_post && (
                <Link href={data.top_post.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                  <div className=" vid_boxslide pvr vidoin">
                    <figure className="pvr">
                      <img src={data.top_post.img} alt="" className="objctimg_box" />
                      <i className="fas fa-camera"></i>
                    </figure>
                    <div className="bnrboxslide_info">
                      <h5>{data.top_post.title}</h5>
                    </div>
                  </div>
                </Link>
              )}
            </div>
            <div className="homnewmedia_item">
              {data.bottom_post && (
                <Link href={data.bottom_post.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                  <div className=" vid_boxslide pvr vidoin">
                    <figure className="pvr">
                      <img src={data.bottom_post.img} alt="" className="objctimg_box" />
                      <i className="fas fa-camera"></i>
                    </figure>
                    <div className="bnrboxslide_info">
                      <h5>{data.bottom_post.title}</h5>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>*/}
          <div className="homnesheadlines">
            <div className="dirctrgtbtm_boxin hmgrybg">
              <h5>
                Headlines <i className="far fa-angle-right"></i>
              </h5>
              <div className="newsheadline_box newshead_stack grid">
                {data &&
                  data.Headlines_data.map((item, id) => {
                    return (
                      <div className="newshdbox_item df fww" key={id}>
                        <figure className="pvr">
                          <a href={item.link} target="_blank" title={item.title} rel="noreferrer">
                            <img className="objctimg_box" src={item.img} alt="" />
                          </a>
                        </figure>
                        <div className="newshdbox_info">
                          <h5>
                            <a href={item.link} target="_blank" rel="noreferrer">
                              {item.title.substr(0, 37)}...
                            </a>
                          </h5>
                          <p>
                            <span className="aurthimg">
                              <img src={item.icon} className="objctimg_box" alt="" />
                            </span>
                            {item.source} | {item.pubDate}
                          </p>
                        </div>
                      </div>
                    );
                  })}                 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
