import Link from "next/link";
import { useState, useEffect } from "react";
import Pagination from "../../Directory/ListingPages/Pagination";
// import '../../../Header/magnific-popup.min.css';
import AddToAny from "../../../components/AddToAny";

const Info = ({ data, setCurrentPage, totalPages, requestFrom }) => {
  const [domLoad, setdomLoad] = useState(false);
  requestFrom = requestFrom || "";
  useEffect(() => {
    setdomLoad(true);
    const $ = window.jQuery;
    $(".popvid , .popvidbox").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
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
          "</div>",

        patterns: {
          youtube: {
            index: "youtube.com/",
            id: "v=",
            //src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1&mute=1',
            //src: "//www.youtube.com/embed/%id%?rel=0&autoplay=1",
            src: "https://www.youtube.com/embed/%id%?enablejsapi=1",
          },
        },
      },
      callbacks: {
        markupParse: function (template, values, item) {
          values.title = item.el.attr("title");
        },
        open: function () {
          var iframe = $(".mfp-iframe-scaler").find("iframe");
          iframe.prop("id", "videoiframe");
          var YouTubeIframeLoader = require("youtube-iframe");
          YouTubeIframeLoader.load(function (YT) {
            var player = new YT.Player("videoiframe", {
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
          $("body").addClass("popbopen");
        },
        close: function () {
          $("body").removeClass("popbopen");
        },
      },
    });
    /* youtube link replace*/
    var popurl = [];
    $("a.popvid , a.popvidgallery , a.popvidbox").each(function (i) {
      popurl.unshift($(this).attr("href"));
      for (var i = 0; i < popurl.length; i++) {
        var popnew = [];
        popnew.unshift(popurl[i].replace("youtu.be/", "www.youtube.com/watch?v="));
        $(this).eq(i).attr("href", popnew[i]);
      }
    });
  }, []);

  return (
    <div className='info_block'>
      <div className='row  df fww'>
        {data.category_post.posts.map((item, index) => {
          return (
            <div className='articel_infobox' key={index}>
              <div className='art_infothumb'>
                <a title={item.title} href={item.artical_video.href ? item.artical_video.href : item.links.replace(process.env.NEXT_PUBLIC_MENU_URL1, "")} className={requestFrom === "" ? "" : "popvid popyoutube"}>
                  {requestFrom === "" ? null : (
                    <span className='playico'>
                      <img src={item.artical_video.playico} alt='play' />
                    </span>
                  )}

                  <div className='artinfoimg pvr'>
                    <img src={item.img} alt='' className='objctimg_box' />
                  </div>
                </a>
                <div className='front-show social_share hovered'>
                  <div className='share_ico'>
                    <img src={process.env.NEXT_PUBLIC_MENU_URL1 + "/wp-content/themes/screendollars/assets/images/shareico.png"} alt='share_ico' />
                  </div>
                  <AddToAny />
                </div>
              </div>
              <div className='info_tags'>
                <ul className='df fww'>
                  <li className='spotlight'>{item.cate_name}</li>
                  <li className='datesinfo'>{item.posted}</li>
                </ul>
              </div>
              <div className='artic_sortdisc'>
                <h5>
                  <Link href={item.links.replace(process.env.NEXT_PUBLIC_MENU_URL1, "")}>{item.title}</Link>
                </h5>
                {/* <Link href={item.links.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>Read More &gt;&gt;</Link> */}
              </div>
            </div>
          );
        })}

        <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} requestFrom='News' />
      </div>
    </div>
  );
};

export default Info;
