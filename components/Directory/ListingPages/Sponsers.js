import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Link from 'next/link';

const Sponsers = ({ data, tag }) => {
  const SliderSetting = {
    slidesToShow: 2,
    slidesToScroll: 2,
    speed: 300,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          adaptiveHeight: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  let sampledata = [data[0],data[0],data[0],data[0]];
  return (
    <section className="dist_listsponser">
      <div className="top_txt df fww">
        <h1 className='h3'>Featured </h1>
      </div>
      <div className="sponserslid_box">
        {/* <pre>{JSON.stringify(data , null, 2)}</pre> */}
        <Slider {...SliderSetting} className="fmboffice_slider slickroundnav slick-dotted">
          {sampledata &&
            sampledata.map((item, index) => {
              let sponserData = tag === 'distributor' ? item.film_data : item.theaters;
              return (
                <div className="sponser_item" key={index}>
                  <div className="sponser_item_box">
                    <div className="sponser_mediabox">
                      <h4>
                        <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>{item.title}</Link>
                      </h4>
                      <div className="df fww sponcer_picdisc just-between">
                      <div className="spitem_media pvr">
                        {item.img && (<a href={item.link}><img src={item.img} alt="" className="objctimg_box" /></a>)}
                      </div>
                      <div className='sponcerinfo'>
                      {/*removed by designer {tag === 'distributor' ? (
                        <ul className="df fww tags">
                          {item.distribution_type.map((singleItem, id) => {
                            return (
                              <li key={id}>
                                <span>{singleItem}</span>
                              </li>
                            );
                          })}
                        </ul>
                      ) : null} */}
                      {item.Headquarters && (
                        <>
                          <p>AMC Entertainment Holdings, Inc. (D/B/A AMC Theatres, Originally An Abbreviation For American Multi-Cinema; Often Reffe...</p>
                          {/* <p className="theater_info">
                            <strong>Headquarters</strong> : {item.Headquarters}
                          </p>
                          <p className="theater_info">
                            <strong>Locations </strong> : {item.Locations}
                          </p>
                          <p className="theater_info">
                            <strong>Screens </strong> : {item.Screens}
                          </p> */}
                        </>
                      )}
                      <p className='sponser_txt'>{item.content}</p>
                      </div>
                      </div>
                    </div>
                    {tag !== 'vendor' && tag !== 'filmfestival' && (
                      <div className="notablesponser">
                        <h5 className={tag === 'distributor' ? '' : 'purpaltxt'}>{tag === 'distributor' ? 'Titles' : 'Selected Locations'}</h5>

                        {sponserData &&
                          sponserData.slice(0,2).map((singleItem, id) => {
                            return (
                              <div className={tag === 'distributor' ?"notablesponser_row df fww distsponcer": "notablesponser_row df fww"} key={id}>
                                <div className="other_spmedia pvr">
                                  <a href={singleItem.link}>
                                    <img
                                      src={singleItem.img ? singleItem.img : ''}
                                      alt={singleItem.title}
                                      className="objctimg_box"
                                    />
                                  </a>
                                </div>
                                <div className="other_spinfo">
                                  <h5 className={tag === 'distributor' ? '' : 'purpaltxt'}>
                                    <a href={singleItem.link}>{singleItem.title}</a>
                                  </h5>
                                  {singleItem.release_date && <p>Release : {singleItem.release_date}</p>}
                                  {singleItem.hq && (
                                    <>
                                      <p>{singleItem.hq}</p>
                                      <p>
                                        Screens: <strong>{singleItem.screens}</strong>
                                      </p>
                                    </>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                    {tag === 'vendor' && (
                      <div className="notablesponser">
                        {item.products_services_title && <h5 className="">{item.products_services_title}</h5>}

                        {item.vendor_product &&
                          item.vendor_product.map((pro, proindex) => {
                            return (
                              <>
                                <div className="notablesponser_row df fww">
                                  <div className="other_spmedia pvr">
                                    <img src={pro.img} alt={pro.title} className="objctimg_box" />
                                  </div>
                                  <div className="other_spinfo">
                                    <h5 className="">{pro.title}</h5>
                                    <p>{pro.content}</p>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </section>
  );
};

export default Sponsers;
