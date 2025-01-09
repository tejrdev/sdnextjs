import Link from 'next/link';
import Image from "next/image";
import imgData from '../../../../data.json';
import sdicon from "../../../../../public/images/sdicon.svg";
import { useEffect } from 'react';

const topmovie = [
  {movieName : "Thor: Love And Thunder"},
  {movieName : "Thor: Love And Thunder"},
  {movieName : "Thor: Love And Thunder"}
];

const Listings = ({ data, BottomText , requestFrom }) => {

  useEffect(() => {
    const $ = window.jQuery;
    $('.popvid , .popvidbox').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
      iframe: {
        markup:
          '<div class="mfp-iframe-scaler">' +
          '<div class="mfp-close"></div>' +
          '<div class="mgpiframwrap">' +
          '<iframe class="mfp-iframe" id="videoiframe" frameborder="0" allow="autoplay; fullscreen" ></iframe>' +
          //'<div class="mfp-title">Some caption</div></div>'+
          '</div>',

        patterns: {
          youtube: {
            index: 'youtube.com/',
            id: 'v=',
            //src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1&mute=1',
            //src: "//www.youtube.com/embed/%id%?rel=0&autoplay=1",
            src: 'https://www.youtube.com/embed/%id%?enablejsapi=1',
          },
        },
      },
      callbacks: {
        markupParse: function (template, values, item) {
          values.title = item.el.attr('title');
        },
        open: function () {
          var iframe = $('.mfp-iframe-scaler').find('iframe');
          iframe.prop('id', 'videoiframe');
          var YouTubeIframeLoader = require('youtube-iframe');
          YouTubeIframeLoader.load(function (YT) {
            var player = new YT.Player('videoiframe', {
              events: {
                onReady: function (e) {
                  e.target.playVideo();
                },
                onStateChange: function (e) {
                  if (e.data === YT.PlayerState.ENDED) {
                    //instance.close();
                  }
                },
              },
            });
          });
          $('body').addClass('popbopen');
        },
        close: function () {
          $('body').removeClass('popbopen');
        },
      },
    });
    /* youtube link replace*/
    var popurl = [];
    $("a.popvid , a.popvidgallery , a.popvidbox").each(function (i) {
        popurl.unshift($(this).attr("href"));
        for (var i = 0; i < popurl.length; i++) {
            var popnew = [];
            popnew.unshift(
                popurl[i].replace("youtu.be/", "www.youtube.com/watch?v=")
            );
            $(this).eq(i).attr("href", popnew[i]);
        }
    });
  }, []);

  return (
    <>
    <section className="topart_box">
      <div className="container">
        {data.map((item, index) => {
          return (
            <div className="topart_item" key={index}>
              <h2  className="h3"><Link className="" href={item.link}>{item.title}</Link></h2>
              <div className="tenmoviegenre">
                <ul className="ratinginfo_tags">
                  {item.release_year && <li>{item.release_year}</li>}
                  {item.movie_rating && <li><span>{item.movie_rating}</span></li>}
                  {item.runtime && <li className="ratingtime">{item.runtime}</li>}
                  {item.genre && <li>{item.genre}</li>}                 
                </ul>
              </div>
              <div className="topartitrm_media df fww row">
                <figure>
                  <Link href={item.link}>
                    <img src={item.img} alt={item.title} />
                  </Link>
                </figure>
                {item.img_2 && 
                <figure>
                  {item.trailer_link ? (
                  <a title="" className="popvidbox" href={item.trailer_link}>
                    <div className="playvid_box">
                      <div className="artinfoimg  pvr">
                            <span className="playico">
                              <i className="fas fa-play"></i>
                            </span>
                        <img src={item.img_2} alt="" className="objctimg_box" />
                      </div>
                    </div>
                  </a>
                  ) : (
                    
                    <div className="playvid_box">                      
                      <div className="artinfoimg  pvr">
                        <img src={item.img_2} alt="" className="objctimg_box" />
                      </div>
                    </div>                  
                    
                  )}
                </figure>}
              </div>
              {requestFrom === 'quicklinks' ? (
                <div className="topartitem_info">{item.content}</div>
              ) : (
                <div className="topart_rating df fww">
                  {item.release_date &&
                  <div className="filmcolluection">
                    <span>Release Date:</span>
                    <span>{item.release_date}</span>
                  </div>
                    }
                  <div className="scrorbox">
                    <ul className="topartings">
                      {/* {<li>
                        <sapn className="scoreico" title={item.rating.data}>
                          <img src={item.rating.img} alt="" />
                        </sapn>
                          <label htmlFor="">{item.rating.data}</label>
                      </li>} 
                        <li className="sdrating">
                          <a href="#!" className="ghostbtn">
                            <span className="scoreico">
                              <Image src={sdicon} alt="" />
                            </span>
                            <strong>4.3 Rate Now</strong>
                          </a>
                        </li>
                        */}
                        {item.imdbrating.data && 
                      <li>
                        <sapn className="scoreico" title={item.imdbrating.data}>
                          <img src={item.imdbrating.img} alt="" />
                        </sapn>
                          <label htmlFor="">{item.imdbrating.data}</label>
                      </li>}
                      {item.rotten_critics.data && 
                      <li>
                        <sapn className="scoreico" title={item.rotten_critics.data}>
                          <img src={item.rotten_critics.img} alt="" />
                        </sapn>
                          <label htmlFor="">{item.rotten_critics.data}</label>
                      </li>}
                      
                      {/* <li>
                        <sapn className="scoreico" title={item.rotten_aui.data}>
                          <img src={item.rotten_aui.img} alt="" />
                        </sapn>
                          <label htmlFor="">{item.rotten_aui.data}</label>
                      </li> */}
                    </ul>
                  </div>
                </div>
              )}
              {item.cast && 
                <div className="castnames" dangerouslySetInnerHTML={{ __html: '<strong>Top Cast:</strong> ' + item.cast }}></div>
              }
              <div className="topartitem_info" dangerouslySetInnerHTML={{ __html: item.content_about_movies }}>
              </div>

              {/* <div className="watchmvbtn">
                <div className="moreinfolink">
                  <Link className="btn" href={item.link}>
                    View More
                  </Link>
                </div>
              </div> */}
            </div>
          );
        })}


        {BottomText &&
          <div className="top_disc" dangerouslySetInnerHTML={{ __html: BottomText }}></div> 
        }
      </div>
    </section>
    {/**
    <section className="bottomtop10 toplinesec">
      <div className="container">
          <div class="top_txt df fww just-between">
            <h2 class="m-0">
              <strong>Top 10 Action Movies <i class="far fa-angle-right"></i></strong>
            </h2>
          </div>
          <div className="bottomtopbox grid gap16">
            {topmovie.map((item,index)=>
              <div className="bottomtopbox_item">
                <figure className="pvr">
                  <a href="#"> <img src='https://tejrdev.github.io/api/apisrc/fourabtsld.jpg' alt="" className="objctimg_box" /></a>
                </figure>
                <h4><a href="#">{item.movieName}</a></h4>
                <p className='greytxt'><small><strong>October 15 2022</strong></small></p>
              </div>
            )}
          </div>
        </div>
    </section>
     */}
    </>
  );
};

export default Listings;
