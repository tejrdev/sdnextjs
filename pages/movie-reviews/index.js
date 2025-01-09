import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
const $ = require('jquery');

export async function getStaticProps() {
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
  const [orderBy, setOrderBy] = useState('DESC');
  const [isOpen, setOpen] = useState(false);
  const [pageNo, setpageNo] = useState(1);
  const [LoadMoreRequired, setLoadMoreRequired] = useState(true);
  const [ShowLoader, setShowLoader] = useState(false);
  const [DataChanged, setDataChanged] = useState(false);

  const order_options = [
    { name: 'Newest', value: 'DESC' },
    { name: 'Oldest', value: 'ASC' },
  ];

  let order_title = '';
  const selected_order = order_options.filter((item) => item.value == orderBy);
  if (selected_order.length > 0) order_title = selected_order[0].name;

  const onTriggerClick = (e) => {
    e.preventDefault();
    setOpen(!isOpen);
  };

  const SortByChange = (e) => {
    e.preventDefault();
    setOrderBy(e.target.getAttribute('data-value'));
    setOpen(!isOpen);
    setpageNo(1);
    setDataChanged(true);
    setGridData([]);
  };

  useEffect(() => {
    if (DataChanged) loadMovieReviewData();
  }, [orderBy, pageNo]);

  useEffect(() => {
    const target = document.querySelector('#review-loadmore');
    let isVisible = null;

    const callBack = (entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible && LoadMoreRequired) {
        setpageNo(pageNo + 1);
        setDataChanged(true);
      }
    };

    const options = {
      root: null,
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(callBack, options);
    LoadMoreRequired && target && observer.observe(target);
  }, [LoadMoreRequired]);

  const loadMovieReviewData = () => {
    setShowLoader(true);
    setLoadMoreRequired(false);
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/movie-review/?page_no=' + pageNo + '&order_choice=' + orderBy + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        if (gridData.length) {
          setGridData((oldData) => oldData.concat(res.data.film_review_list));
        } else {
          setGridData(res.data.film_review_list);
        }
        setShowLoader(false);
        setLoadMoreRequired(parseInt(res.data.max_page) === pageNo ? false : true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
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
        {Verdict_Data.film_review && (
          <>
            {Verdict_Data.page_content.length && (
              <section className='fmreview_intro'>
                <div className='container'>
                  <a href={Verdict_Data.featured_image_link} title={Verdict_Data.featured_image_link} target='_blank' rel='noreferrer' className='criricname'>
                    {/*<img src={Verdict_Data.featured_image} alt="" className="vrdictfmlogo" />*/}
                    <span>Movie Reviews</span>
                  </a>
                  <p>{Verdict_Data.page_content}</p>
                </div>
              </section>
            )}

            {Verdict_Data.film_review.length && (
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
                                    <h4>{items.title}</h4>
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
                                    <h4>{items.title}</h4>
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
            )}
          </>
        )}

        <section className='allreview toplinesec'>
          <div className='container'>
            <div className='top_txt flex flex-wrap justify-between'>
              <h3 className='m-0 pr-2'>
                All Reviews <i className='fal fa-angle-right'></i>
              </h3>
              <div className='allviewfilters df fww'>
                <div className='filter_item'>
                  <label className='greytxt'>Sort By</label>
                  <div className='select_filters'>
                    <div className='custom-select-wrapper' id='review_order'>
                      <div className={'custom-select ' + (isOpen ? ' opened' : '')}>
                        <span className='custom-select-trigger' onClick={onTriggerClick}>
                          {order_title}
                        </span>
                        <div className='custom-options'>
                          {order_options.map((item, index) => (
                            <span className={'custom-option' + (orderBy == item.value ? ' selection  ' : '')} data-value={item.value} onClick={SortByChange} key={index}>
                              {item.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='grid gap16 allview_box' id='movie_list_wrapper'>
              {gridData && (
                <>
                  {gridData.map((items, index) => {
                    return (
                      <div className='featview_item' key={index}>
                        <a href={items.link} target={items.target} className='df fww just-between' rel='noreferrer'>
                          <figure className='pvr'>
                            <img src={items.img} alt='' className='objctimg_box' />
                          </figure>
                          <div className='featview_iteminfo'>
                            <h4>{items.title}</h4>
                            <p>{items.content} </p>
                            <span className='readmorelink'>read review</span>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            {ShowLoader && (
              <div className='pvr loaderOverlay srchpageloading'>
                <span className='loader'></span>
              </div>
            )}
            {LoadMoreRequired && (
              <div className='viewbtn'>
                <p id='review-loadmore' className='btn'>
                  View More
                </p>
              </div>
            )}
            {/* <div id='loader' className='pvr loaderOverlay srchpageloading hide'>
              <span className='loader'></span>
            </div> */}
          </div>
        </section>
      </>
    </>
  );
};

export default Thefilmverdict;
