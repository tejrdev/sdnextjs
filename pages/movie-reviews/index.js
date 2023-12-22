import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
//import Image from 'next/image';

//import Countday from '../../components/countdownday/countdown';
import CustomSelect from '../../components/Header/CustomSelect';

//import Loader from '../../components/Loader';
//import Gallery from '../../components/Thefilmverdict/Gallery';

const order_options = [
  { 'name': 'Newest', 'value': 'DESC' },
  { 'name': 'Oldest', 'value': 'ASC' },
];
const test_options = [
  { 'name': 'one', 'value': 'one' },
  { 'name': 'two', 'value': 'two' },
  { 'name': 'three', 'value': 'three' },
];

const $ = require('jquery');

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'movie-reviews');
  const data = await res.json();

  // critic page static data
  let Verdict_Data = await fetch(process.env.NEXT_PUBLIC_SD_API + '/movie-review/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  Verdict_Data = await Verdict_Data.json();

  return {
    props: { data, Verdict_Data },
    revalidate: 10, // In seconds
  };
}

const Thefilmverdict = ({ data, Verdict_Data }) => {
  const [gridData, setGridData] = useState(Verdict_Data.film_review_list);

  let R_page_no = 2;
  var page_no_R = 1;
  var lastScrollTop = 0;

  const filter_Movie_review = () => {
    R_page_no = 1;
    page_no_R = 1;
    $('#movie_list_wrapper').html('');
    $('#movie_list_wrapper').attr('pageno', page_no_R);
    loadMovieReviewData();
  };
  const loadMovieReviewData = () => {
    var review_order = $('#review_order .custom-options .custom-option.selection').data('value');
    if (!review_order) review_order = 'DESC';
    $('#loader').removeClass('hide');
    page_no_R = $('#movie_list_wrapper').attr('pageno');
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/movie-review/?page_no=' + R_page_no + '&order_choice=' + review_order + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        if (gridData.length) {
          setGridData((oldData) => oldData.concat(res.data.film_review_list));
        } else {
          setGridData(res.data.film_review_list);
        }
        R_page_no++;
        $('#movie_list_wrapper').attr('pageno', page_no_R);
        //console.log(res.data.max_page + '--- ' + R_page_no);
        page_no_R = 1;
        if (res.data.max_page >= R_page_no) {
          //stop auto pagination
        }
        $('#loader').addClass('hide');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    $('#movie_list_wrapper').attr('pageno', page_no_R);

    $(window).scroll(function (event) {
      var st = $(this).scrollTop();
      if (st > lastScrollTop) {
        // downscroll code
        if (st + 250 >= $(document).height() - jQuery('footer').height() - 150) {
          //console.log(R_page_no);
          //if( page_no <= 4 ) {
          if (1 == page_no_R) {
            page_no_R = 2;
            loadMovieReviewData();
          }
          //}else{

          //}
        }
      } else {
        // upscroll code
      }
      lastScrollTop = st;
    });

    $('.readmore_view').on('click', function () {
      $(this).parents('.opencol_info').find('.topread_open').show();
      $(this).parents('.opencol_info').find('.topread_view').hide();
      $(this).hide();
    });

    var totalHeight = 0;
    $('.openletterbox .opencol_info')
      .children()
      .each(function () {
        totalHeight = totalHeight + $(this).outerHeight(true);
      });
    if (totalHeight > 375) {
      $('.openletterbox  .opencol .opencol_info .topread_view').css('height', '332px');
      $('.openletterbox  .opencol .readmore_btn', '.readmore_view').click(function () {
        $(this).parent().toggleClass('open');
        $(this).parents('.opencol_info').find('.topread_open').show();
        $(this).parents('.opencol_info').find('.topread_view').hide();
        $(this).hide();
      });
    }
  });

  return (
    <>
      <Head>
        {data.children[0].children.map((item, index) => {
          const attributes = item.tag.toUpperCase();

          switch (attributes) {
            case 'TITLE':
              return <title key={index}>{item.html}</title>;
            case 'META':
              const name = item.name || '';
              if (name !== '') {
                return <meta key={index} name={item.name} content={item.content} />;
              } else {
                return <meta key={index} property={item.property} content={item.content} />;
              }
            case 'LINK':
              return <link key={index} rel={item.rel} href={item.href} />;
            case 'SCRIPT':
              return <script key={index} type={item.type} class={item.class} dangerouslySetInnerHTML={{ __html: item.html }}></script>;
            default:
              return null;
          }
        })}
      </Head>

      <>
        {Verdict_Data.film_review && Verdict_Data.page_content.length ? (
          <section className='fmreview_intro'>
            <div className='container'>
              <a href={Verdict_Data.featured_image_link} title={Verdict_Data.featured_image_link} target='_blank' rel='noreferrer' className='criricname'>
                {/*<img src={Verdict_Data.featured_image} alt="" className="vrdictfmlogo" />*/}
                <span>Movie Reviews</span>
              </a>
              <p>{Verdict_Data.page_content}</p>
            </div>
          </section>
        ) : (
          ''
        )}

        {Verdict_Data.film_review && Verdict_Data.film_review.length ? (
          <section className='featur_review toplinesec'>
            <div className='container'>
              <div className='top_txt df fww just-between'>
                <h3>
                  <a href='#null' target='_blank'>
                    {Verdict_Data.featured_reviews} <i className='fal fa-angle-right'></i>
                  </a>
                </h3>
              </div>
              <div className='feat_reviewbox df fww just-between'>
                <div className='featview_left'>
                  {Verdict_Data.film_review &&
                    Verdict_Data.film_review.map((items, i) => {
                      if (i < 1) {
                        return (
                          <div className='featview_item' key={i}>
                            <a href={items.link} target='_blank'>
                              <figure className='pvr'>
                                <img src={items.img} alt='' rel='preload' as='image' className='objctimg_box' />
                              </figure>
                              <div className='featview_iteminfo'>
                                <h6>{items.title}</h6>
                                <p>
                                  {items.content} <span className='readmorelink'>read full review</span>
                                </p>
                              </div>
                            </a>
                          </div>
                        );
                      }
                    })}
                </div>
                <div className='featview_right'>
                  {Verdict_Data.film_review &&
                    Verdict_Data.film_review.map((items, i) => {
                      if (i >= 1) {
                        return (
                          <div className='featview_item' key={i}>
                            <a href={items.link} target='_blank' className=' df fww just-between' rel='noreferrer'>
                              <figure className='pvr'>
                                <img src={items.img} alt='' className='objctimg_box' />
                              </figure>
                              <div className='featview_iteminfo'>
                                <h6>{items.title}</h6>
                                <p>{items.content}</p>
                                <span className='readmorelink'>read full review</span>
                              </div>
                            </a>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
            </div>
          </section>
        ) : (
          ''
        )}

        <section className='allreview toplinesec'>
          <div className='container'>
            <div className='top_txt'>
              <h3 className='m-0'>
                All Reviews <i className='fal fa-angle-right'></i>
              </h3>
            </div>
            <div className='allviewfilters df fww'>
              <div className='filter_item'>
                <label className='greytxt'>Sort By</label>
                <div className='select_filters'>
                  <div className='custom-select-wrapper' id='review_order'>
                    <CustomSelect custom_options={order_options} Default_val={'Newest'} />
                  </div>
                </div>
              </div>
              {/**
                  <div className="filter_item">
                    <label className="greytxt">Genre</label>
                    <div className="select_filters">
                      <div className="custom-select-wrapper">
                        <CustomSelect custom_options={test_options} Default_val={'Action'} />
                      </div>
                    </div>
                  </div>
                  <div className="filter_item">
                    <label className="greytxt">Rating</label>
                    <div className="select_filters">
                      <div className="custom-select-wrapper">
                        <CustomSelect custom_options={test_options} Default_val={'8+'} />
                      </div>
                    </div>
                  </div>
                  */}
              <div className='filtersubmit'>
                <button className='btn' onClick={filter_Movie_review}>
                  {' '}
                  Submit{' '}
                </button>
              </div>
            </div>

            <div className='grid gap16 allview_box' id='movie_list_wrapper'>
              {gridData && (
                <>
                  {gridData.map((items, index) => {
                    return (
                      <>
                        <div className='featview_item' key={index}>
                          <a href={items.link} target={items.target} className='df fww just-between' rel='noreferrer'>
                            <figure className='pvr'>
                              <img src={items.img} alt='' className='objctimg_box' />
                            </figure>
                            <div className='featview_iteminfo'>
                              <h6>{items.title}</h6>
                              <p>{items.content} </p>
                              <span className='readmorelink'>read review</span>
                            </div>
                          </a>
                        </div>
                      </>
                    );
                  })}
                </>
              )}
            </div>
            <div id='loader' className='pvr loaderOverlay srchpageloading hide'>
              {' '}
              <span className='loader'></span>{' '}
            </div>
          </div>
        </section>
      </>
    </>
  );
};

export default Thefilmverdict;
