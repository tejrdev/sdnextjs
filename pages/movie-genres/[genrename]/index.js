import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

import Image from "next/image";
import { useRouter } from "next/router";
import Loader from "../../../components/Loader";
import CustomSelect from "../../../components/Header/CustomSelect";
import federatedLogout from "@/pages/api/auth/federated-logout";

const order_options = [
  { "name": "A-Z Ascending", "value": "ASC" },
  { "name": "Z-A Descending", "value": "DESC" },
];
const Genre_options = [
  { "name": "All", "value": "all" },
  { "name": "Action", "value": "Action" },
  { "name": "Comedy", "value": "Comedy" },
  { "name": "Drama", "value": "Drama" },
  { "name": "Family", "value": "Family" },
  { "name": "Fantasy", "value": "Fantasy" },
  { "name": "Horror", "value": "Horror" },
  { "name": "Mystery", "value": "Mystery" },
  { "name": "Romance", "value": "Romance" },
  { "name": "Sci-Fi", "value": "Sci-Fi" },
  { "name": "Thriller", "value": "Thriller" },
  { "name": "History", "value": "History" },
  { "name": "Faith", "value": "Faith" },
];
const IMDB_options = [
  { "name": "All", "value": "all" },
  { "name": "1+", "value": "1" },
  { "name": "2+", "value": "2" },
  { "name": "3+", "value": "3" },
  { "name": "4+", "value": "4" },
  { "name": "5+", "value": "5" },
  { "name": "6+", "value": "6" },
  { "name": "7+", "value": "7" },
  { "name": "8+", "value": "8" },
  { "name": "9+", "value": "9" },
  { "name": "10", "value": "10" },
];

const $ = require("jquery");
export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const genrename = params.genrename;
  //console.log(process.env.NEXT_PUBLIC_SD_API + '/movie-genre/genre_movies.php?genre='+genrename+'&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  //genre page
  let genreinfo = await fetch(process.env.NEXT_PUBLIC_SD_API + "/movie-genre/genre_movies.php?genre=" + genrename + "&api_token=" + process.env.NEXT_PUBLIC_API_TOKEN);
  genreinfo = await genreinfo.json();
  //Setloader(true);
  return {
    props: { genreinfo },
    revalidate: 10,
  };
}

const Genrename = ({ genreinfo }) => {
  //const [Genre_loader, Setloader] = useState(false);
  const [gridData, setGridData] = useState(genreinfo.movies);

  const router = useRouter();
  const { genrename } = router.query;
  //const genremovie = ;
  let g_page_no = 2;
  var page_no_f = 1;
  var lastScrollTop = 0;

  useEffect(() => {
    const $ = window.jQuery;
    $(".genremovies").attr("pageno", g_page_no);
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

    $(window).scroll(function (event) {
      var st = $(this).scrollTop();
      if (st > lastScrollTop) {
        // downscroll code
        if (st + 250 >= $(document).height() - jQuery("footer").height() - 150) {
          //console.log(g_page_no);
          //if( page_no <= 4 ) {
          if (1 == page_no_f) {
            page_no_f = 2;
            loadGenreData();
          }
          //}else{

          //}
        }
      } else {
        // upscroll code
      }
      lastScrollTop = st;
    });
  }, [gridData]);

  const filter_genre = () => {
    g_page_no = 1;
    page_no_f = 2;    
    $(".genremovies").attr("pageno", g_page_no);
    $("#genre_movie_listing").html("");
    loadGenreData();
    //alert(' ------ '+f_order + ' -- '+ f_genre + '---'+ f_imbd);
  };
  const loadGenreData = () => {
    var f_order = $("#f_order .custom-options .custom-option.selection").data("value");
    var f_genre = $("#f_genre .custom-options .custom-option.selection").data("value");
    var f_imbd = $("#f_imbd .custom-options .custom-option.selection").data("value");
    if (!f_order) f_order = "ASC";
    if (!f_genre) f_genre = genrename;
    if (!f_imbd) f_imbd = "all";
    $("#loader").removeClass("hide");
    g_page_no = $(".genremovies").attr("pageno");
    //console.log(f_genre + "&page_no=" + g_page_no + "&order_choice=" + f_order + "&IMDbRating=" + f_imbd + "&api_token=" + process.env.NEXT_PUBLIC_API_TOKEN);
    if (2 == page_no_f) {
      axios.get(process.env.NEXT_PUBLIC_SD_API + "/movie-genre/genre_movies.php?genre=" + f_genre + "&page_no=" + g_page_no + "&order_choice=" + f_order + "&IMDbRating=" + f_imbd + "&api_token=" + process.env.NEXT_PUBLIC_API_TOKEN)
        .then((res) => {
          if (gridData.length) {
            setGridData((oldData) => oldData.concat(res.data.movies));
          } else {
            setGridData(res.data.movies);
          }
          g_page_no++;
          $(".genremovies").attr("pageno", g_page_no);
          //console.log(res.data.max_page + "--- " + g_page_no);
          if (res.data.max_page >= g_page_no) {
            page_no_f = 1;
            //stop auto pagination
          }
          $("#loader").addClass("hide");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <section className='genremovies subfilmy'>
      <div className='container'>
        <div className='allviewfilters df fww'>
          <div className='filter_item'>
            <label className='greytxt'>Sort By</label>
            <div className='select_filters'>
              <div className='custom-select-wrapper' id='f_order'>
                <CustomSelect custom_options={order_options} Default_val={"A-Z Ascending "} />
              </div>
            </div>
          </div>
          <div className='filter_item'>
            <label className='greytxt'>Genre</label>
            <div className='select_filters'>
              <div className='custom-select-wrapper' id='f_genre'>
                <CustomSelect custom_options={Genre_options} Default_val={genrename} />
              </div>
            </div>
          </div>
          <div className='filter_item'>
            <label className='greytxt'>IMDb Rating</label>
            <div className='select_filters'>
              <div className='custom-select-wrapper' id='f_imbd'>
                <CustomSelect custom_options={IMDB_options} Default_val={"All"} />
              </div>
            </div>
          </div>
          <div className='filtersubmit'>
            <button className='btn' onClick={filter_genre}>
              Submit{" "}
            </button>
          </div>
        </div>
        <div className='genremoviebox grid gap16' id='genre_movie_listing'>
          <>
            {gridData &&
              gridData.map((item, index) => {
                return (
                  <div className='postermovieinfo' key={index}>
                    <figure className={"pvr " + (item.trailer_link || item.watch_now ? "" : "darkoff")}>
                      <a href={item.link}>
                        <Image src={item.img} width='190' height='281' alt='' className='objctimg_box' />
                      </a>
                      {item.trailer_link || item.watch_now ? (
                        <figcaption>
                          {item.trailer_link && (
                            <a className='popvid' href={item.trailer_link}>
                              Trailer
                            </a>
                          )}
                          {item.watch_now && (
                            <a className='watchmh' href={item.watch_now} title='name'>
                              Watch Now
                              {item.watch_now_price && <span>({item.watch_now_price})</span>}
                            </a>
                          )}
                        </figcaption>
                      ) : (
                        ""
                      )}
                    </figure>
                    <div className='postermovie_detail'>
                      <h5>
                        <Link href={item.link ? item.link : "#"}>
                          <strong>{item.title}</strong>
                        </Link>
                      </h5>
                      <div className='ratingtime df fww'>
                        <div>
                          {item.release_year} - {item.runtime}
                        </div>
                        {item.rating && <div className='rating'>{item.rating}</div>}
                      </div>
                      {item.genre && <div className='genrename'>{item.genre}</div>}
                      {item.rotten_critics_score && item.imdbrating && (
                        <ul className='criticrate'>
                          {item.imdbrating && (
                            <li>
                              {" "}
                              <Image src={item.imdbrating_img} alt='' width='90' height='90' /> - {item.imdbrating}
                            </li>
                          )}
                          {item.rotten_critics_score && (
                            <li>
                              {" "}
                              <Image src={item.rotten_critics_score_img} alt='' width='20' height='20' /> - {item.rotten_critics_score}
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
          </>
        </div>
        <div id='loader' className='pvr loaderOverlay srchpageloading hide'>
          {" "}
          <span className='loader'></span>{" "}
        </div>
      </div>
    </section>
  );
};



export default Genrename;
