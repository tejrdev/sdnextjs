import React from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import HomePageAds from './HomePageAds';

function Directory({ data }) {
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
    dots: false,
  };

  return (
    <div className="container" id="load_3">
      <div className="seclinespace">
        <div className="top_txt df fww just-between">
          <div className="secnav df fww">
            <h2>
              <Link href="/directory/" title="Directory">
                Directory <i className="fal fa-angle-right"></i>
              </Link>
            </h2>
            <ul id="menu-directory" className="distcat_name df fww">
              <li id="menu-item-1092" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-first menu-item-1092">
                <Link title="Distributors" href="/directory/distributors">
                  Distributors
                </Link>
              </li>
              <li id="menu-item-268" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-268">
                <Link href="/directory/exhibitors/" title="Exhibitors">
                  Exhibitors
                </Link>
              </li>
              <li id="menu-item-66139" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-66139">
                <Link href="/directory/theatres/" title="Theaters">
                  Theaters
                </Link>
              </li>
              <li id="menu-item-269" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-269">
                <Link href="/directory/vendors/" title="Vendors">
                  Vendors
                </Link>
              </li>
              <li id="menu-item-270" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-270">
                <Link href="/directory/film-festivals/" title="Film Festivals">
                  Film Festivals
                </Link>
              </li>
              <li id="menu-item-271" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-last menu-item-271">
                <Link href="/directory/calendar-of-events/" title="Calendar of Events">
                  Calendar of Events
                </Link>
              </li>
            </ul>
          </div>
          <div className="view_btn">
            <Link href="/directory/" className="btn">
              View More
            </Link>
          </div>
        </div>
        <div className="directi_inner df fww just-between">
          <div className="directri_left">
            <Slider {...SliderSetting} className="detailinfo_slider">
              {data &&
                data.directory_slider.map((item, id) => {
                  return (
                    <div className="detailinfo_item" key={id}>
                      <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                        <div className="bnr_boxslide pvr vidoin sponcehov">
                          <div className="startsponser">
                            <div className="starico">
                              <i className="fas fa-star"></i>
                            </div>
                            Featured
                          </div>
                          <figure className="pvr">
                            <img src={item.img} alt="" className="objctimg_box" />
                          </figure>
                          <div className="bnrboxslide_info">
                            <h4>{item.title}</h4>
                            <p>{item.sub_title}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </Slider>
            <div className="distexib df fww just-between ">
              <div className="boxdetail hmgrybg">
                <h5 className="grybtmline">
                  <Link href={data.Distributors.main_link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} title="Distributors">
                    Distributors
                  </Link>
                  <i className="far fa-angle-right"></i>
                </h5>
                <h5>
                  <Link href={data.Distributors.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>{data.Distributors.title_link}</Link>
                </h5>
                <div className="distboxinfo df fww">
                  {data &&
                    data.Distributors.film.map((item, id) => {
                      return (
                        <div className="distributer_hmitem" key={id}>
                          <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                            <figure className="pvr">
                              <img src={item.img} alt="It Comes at Night" />
                            </figure>
                          </Link>
                          <p>{item.release_type}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="boxdetail hmgrybg">
                <h5 className="grybtmline">
                  <Link href={data.exhibitors.main_link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} title="Exhibitors">
                    Exhibitors
                  </Link>
                  <i className="far fa-angle-right"></i>
                </h5>
                <h5>
                  <Link href={data.exhibitors.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>{data.exhibitors.title}</Link>
                </h5>
                <div className="exibox_info df fww">
                  <figure>
                    <Link href={data.exhibitors.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                      <img src={data.exhibitors.img} alt="" />
                    </Link>
                  </figure>
                  <ul>
                    <li>
                      <p>Locations: {data.exhibitors.no_locations}</p>
                      <p>Screens: {data.exhibitors.exhibitor_screens}</p>
                    </li>
                    <li>
                      <p>Headquarters</p>
                      <p>{data.exhibitors.headquaters}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="directri_right">
            <div className="dirctrgt-top df fww">
              <div className="vndrinbox ">
                <div className="hmgrybg pvr sponcehov">
                  <div className="startsponser">
                    <div className="starico">
                      <i className="fas fa-star"></i>
                    </div>
                    Featured
                  </div>
                  <div className="vndrinbox_media">
                    <Link href={data.multimedia_section.img.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} className="image-link">
                      <figure>
                        <img src={data.multimedia_section.img} alt="multimedia" />
                      </figure>
                      <i className="fas fa-camera"></i>
                    </Link>
                  </div>
                  <div className="dirctrgt-topinfo">
                    <h5>{data.multimedia_section.title}</h5>
                    <p>{data.multimedia_section.sub_title}</p>
                  </div>
                </div>
              </div>
              <div className="directri_rightads ">
                <div className="hmgrybg">
                  <HomePageAds cls="add_300" format="rectangle" />
                </div>
              </div>
            </div>
            <div className="dirctrgt_btm  df fww">
              <div className="dirctrgtbtm_box">
                <div className="dirctrgtbtm_boxin hmgrybg">
                  <h5 className="grybtmline">
                    <Link href={data.vendors.main_link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>Vendors</Link>
                    <i className="far fa-angle-right"></i>
                  </h5>

                  {data &&
                    data.vendors.data.map((item, id) => {
                      return (
                        <div className="diectsml_rowbox df fww" key={id}>
                          <Link href={item.vendors.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} title={item.title}>
                            <figure>
                              <Image src={item.img} alt="" width={72} height={56} />
                            </figure>
                            <div className="diectsml_rowboxinfo">
                              <h5>{item.title}</h5>
                              <p>{item.city !== null ? item.city + ' ,' + item.state : ''}</p>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="dirctrgtbtm_box">
                <div className="dirctrgtbtm_boxin hmgrybg">
                  <h5 className="grybtmline">
                    <Link href={data.film_festivals.main_link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} title="Film Festivals">
                      Film Festivals
                    </Link>
                    <i className="far fa-angle-right"></i>
                  </h5>
                  {data && data.film_festivals.data && (
                    <div className="diectsml_rowbox df fww">
                      <Link href={data.film_festivals.data[0].link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} title={data.film_festivals.data[0].title}>
                        <figure>
                          <img src={data.film_festivals.data[0].img} alt="" />
                        </figure>
                        <div className="diectsml_rowboxinfo">
                          <h5>{data.film_festivals.data[0].title}</h5>
                          <p>{data.film_festivals.data[0].up_start_date}</p>
                        </div>
                      </Link>
                    </div>
                  )}
                  <ul className="filmfestivlines">
                    {data &&
                      data.film_festivals.data.map((item, id) => {
                        return (
                          <React.Fragment key={id}>
                            {id === 0 ? null : (
                              <li>
                                <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} title={item.title}>
                                  {item.up_start_date} - {item.title}
                                </Link>
                              </li>
                            )}
                          </React.Fragment>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Directory;
