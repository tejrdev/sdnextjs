import { useEffect } from "react";
import Image from "next/image";
import ads300600 from "../../../../public/images/ads300600.jpg";
import sdicon from "../../../../public/images/sdicon.svg";
import tometoicon from "../../../../public/images/tometoico.svg";
import imdbicon from "../../../../public/images/imdbico.svg";
import HomePageAds from '../../../Homepage/HomePageAds';

const Filmography = ({ data }) => {
  useEffect(() => {
    /*cast toggle*/
    $(".filmography_title ").click(function () {
      $(this).next().slideToggle();
      $(this).parent().toggleClass("active");
      if ($(this).parent().hasClass("active")) {
        $(this).find(".togglearrow").text("Collapse");
      } else {
        $(this).find(".togglearrow").text("Expand");
      }
    });

    $(".favoritebox").click(function () {
        $(this).toggleClass("clicked");
    });
  }, []);

  useEffect(() => {
    const $ = window.jQuery;

    $('.termtxt').magnificPopup({
      type: 'inline',
      preloader: false,
      focus: '#name',
      callbacks: {
        beforeOpen: function () {
          if ($(window).width() < 700) {
            this.st.focus = false;
          } else {
            this.st.focus = '#name';
          }
        },
        open: function () {},
        close: function () {},
      },
    });
  }, []);
  return (
    <section className="filmography toplinesec" id="filmography">
      <div className="container">
        <div className="top_txt">
          <h2>
            Filmography <i className="fal fa-angle-right"></i>
          </h2>
        </div>

        <div className="filmogrhpybox df fww just-between">
          <div className="filmogrhpybox_info">
            {data.map((item, index) => {
              return (
                <div className="filmography_item active">
                  <div className="filmography_title">
                    <span className="togglearrow">Collapse</span>
                    {item.film_role_title ? (
                      <h4>{item.film_role_title}</h4>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="filmography_info df fww just-between">
                    <div className="filmograhyinfo_col">
                      <ul>
                        {item.films.map((moive_list , index) => (
                          <li className="">
                            <span className="yeartxt">
                              {moive_list.release_year}{" "}
                              <span className="piping">|</span>{" "}
                            </span>
                            <div className="movierol">
                              <a className="termtxt" href={'#filminfopop' + index} title={moive_list.title}>
                                <strong>{moive_list.title}</strong>
                              </a>
                              <div className="filminfopop white-popup-block mfp-hide" id={
                                'filminfopop' + index}>
                                <div className="filminfotop df fww">
                                  <figure><Image src={moive_list.img} width='112' height='170' /></figure>
                                  <div className="filminfotop_txt">
                                    <h4>
                                    <a href={moive_list.link}>{moive_list.title}</a>
                                    {/*<span className="favoritebox" title="favorite"><i className="far fa-heart"></i></span>*/}
                                    </h4>
                                    <ul className="ratinginfo_tags">
                                        {moive_list.release_year && (<li>{moive_list.release_year}</li>)}
                                        {moive_list.rating && (<li><span>{moive_list.rating}</span></li> )}
                                        {moive_list.runtime && (<li>{moive_list.runtime}</li> )}
                                        {moive_list.genre && (<li>{moive_list.genre}</li> )}

                                    </ul>
                                    <ul className="df fww criticratings">
                                      {/*
                                        <li className="sdrating">
                                          <a href="#!" className="ghostbtn">
                                            <span className="scoreico">
                                              <Image src={sdicon} alt=""/>
                                            </span>
                                            <strong>4.3 Rate Now</strong>
                                          </a>
                                        </li>
                                        */}
                                        {moive_list.rotten_critics_score && (
                                        <li>
                                          <span className="scoreico">
                                            <Image src={tometoicon} alt=""/>
                                          </span>
                                          <label htmlFor="">{moive_list.rotten_critics_score}</label>
                                        </li>
                                        )}
                                        {moive_list.imdbrating && (
                                        <li>
                                          <span className="scoreico"><Image src={imdbicon} alt=""/></span>
                                          <label htmlFor="">{moive_list.imdbrating}</label>
                                        </li>
                                        )}
                                    </ul>
                                    {moive_list.synopsis && (<p className="filminfodisc">{moive_list.synopsis}</p>)}
                                  {/*console.log(moive_list)*/}
                                  </div>
                                </div>
                                <div className="filmbtmpop">
                                  <div className="mvbnr_price sd_m_data">
                                  {moive_list.trailer_link && (<a href={moive_list.link} className="ghostbtn">More Info</a>)}
                                  {/*moive_list.trailer_link && (<a href={moive_list.trailer_link} className="ghostbtn">watch trailer</a>) */}
                                  {moive_list.showtimes && (<a href={moive_list.showtimes} className="ghostbtn">find showtimes</a>)}
                                  {moive_list.watch_now && (<a href={moive_list.watch_now} title="Watch Now" className="ghostbtn" target='_blank'>Watch Now</a>)}

                                    </div>
                                </div>
                              </div>
                              {moive_list.character_name && (
                                <>
                                  <span className="asmid">As</span>
                                  {moive_list.character_name}
                                </>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="filmogrhpy_adds">
            <HomePageAds cls="add_300" format="horizontal" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filmography;
