import axios from 'axios';
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import RankMathSEO from '../../RankMathSEO';

import './search.css';

const $ = require('jquery');

const Search = () => {
  const [is_empty, setis_empty] = useState(false);
  const [SearchDataLoaded, setSearchDataLoaded] = useState(false);
  const [SearchData, setSearchData] = useState([]);
  const [postTypes, setPostTypes] = useState('');
  const [secCls, setSecCls] = useState('');
  const [pageNo, setpageNo] = useState(1);
  const [orderBy, setOrderBy] = useState('asc');
  const [gridData, setGridData] = useState([]);

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const post_type_name = params.get('post_type');
  const search_value = params.get('s');

  $('.site-headertop .findinput input').val(search_value);
  useEffect(() => {
    loadSearchData();
    switch (post_type_name) {
      case 'all':
        setPostTypes('all');
        setSecCls('srchart');
        break;
      case 'film_data':
        setPostTypes('Films');
        setSecCls('srchfilms');
        break;
      case 'post':
        setPostTypes('News');
        break;
      case 'studios_distributors':
        setPostTypes('Distributors');
        break;
      case 'vendors':
        setPostTypes('Vendors');
        break;
      case 'exhibitors':
        setPostTypes('Exhibitor');
        break;
      case 'theatres':
        setPostTypes('Theatre');
        setSecCls('srchdirc');
        break;
      case 'film_festival':
        setPostTypes('Film Festivals');
        break;
      case 'filmtalent':
        setPostTypes('Talent');
        break;
      default:
        setPostTypes('All');
        break;
    }
  }, [orderBy, pageNo]);

  useEffect(() => {
    $('.headtop_left .custom-select-trigger').text($('.headtop_left #custom-top_search_header_drop .custom-options .custom-option[data-value="' + post_type_name.toLowerCase() + '"]').text());
    $('#custom-film-order-data .custom-select-trigger').on('click', function () {
      $('#custom-film-order-data').toggleClass('opened');
    });
    $('.srchsectop_right .custom-option, #search_blog_header .custom-option').on('click', function () {
      $(this).parents('.custom-select-wrapper').find('select').val($(this).data('value'));
      $(this).parents('.custom-options').find('.custom-option').removeClass('selection');
      $(this).addClass('selection');
      $(this).parents('.custom-select').removeClass('opened');
      $(this).parents('.custom-select').find('.custom-select-trigger').text($(this).text());
      setOrderBy($(this).data('value'));
    });
  }, [SearchDataLoaded]);

  const loadDataByPageNo = () => {
    setpageNo(pageNo + 1);
  };

  const loadSearchData = () => {
    setSearchDataLoaded(false);
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/search_page/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&post_type_name=' + post_type_name + '&s=' + search_value + '&order=' + orderBy + '&page_no=' + pageNo)
      .then((res) => {
        setSearchData(res.data);
        if (!res.data.search) {
          setis_empty(true);
        } else {
          if (gridData.length) {
            setGridData((oldData) => oldData.concat(res.data.search.search_post));
          } else {
            setGridData(res.data.search.search_post);
          }
          setis_empty(false);
        }
        setSearchDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <RankMathSEO />
      {SearchDataLoaded && gridData ? (
        <>
          <div className='search_resultlist'>
            <section className='searchpagetop'>
              <div className='container'>
                <div className='info_block'>
                  <div className='search_arcbar df fww '>
                    <h5 className='src_resultcount'>{SearchData.title} </h5>
                  </div>
                </div>
              </div>
            </section>

            {!is_empty && (
              <section className={secCls + ``}>
                <div className='container'>
                  <div className='srchsec_accord'>
                    <div className='srchaccd_top df fww'>
                      <div className='srchsectop_left df fww'>
                        <h3>{postTypes}</h3>
                        <span> </span>
                      </div>
                      <div className='srchsectop_right'>
                        <div className='search_select'>
                          <div className='custom-select-wrapper'>
                            {/* <select
                            id="film-order-data"
                            className="custom-select film-order-data"
                            name="sort"
                            data-placeholder="Sort By Newest"
                            // style="display: none;"
                          >
                            <option value="desc">Sort by Newest</option>
                            <option value="relevance">Sort by Relevance</option>
                            <option value="asc">Sort by Oldest</option>
                          </select> */}
                            <div className='custom-select film-order-data' id='custom-film-order-data'>
                              <span className='custom-select-trigger'>Sort By Newest</span>
                              <div className='custom-options'>
                                <span className='custom-option undefined' data-value='desc'>
                                  Sort by Newest
                                </span>
                                <span className='custom-option undefined' data-value='relevance'>
                                  Sort by Relevance
                                </span>
                                <span className='custom-option undefined' data-value='asc'>
                                  Sort by Oldest
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='srchaccd_info'>
                      {post_type_name === 'film_data' && (
                        <div className='srchfilm_box df fww' id='film_search_data'>
                          {gridData &&
                            gridData.map((item, index) => {
                              return (
                                <div className='srchfilm_item' key={index}>
                                  <div className='srchfilm_iteminner'>
                                    <div className='srchfilmitem_imgbox pvr'>
                                      <a href={item.link}>
                                        <div className='srchfilm_img bgimage'>
                                          <img src={item.img} alt='' className='objctimg_box' />{' '}
                                        </div>
                                      </a>
                                    </div>
                                    <div className='srchfilmitem_info'>
                                      <h4>
                                        <a href={item.link}>
                                          {item.title} {'(' + item.release_year + ')'}
                                        </a>
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                      {post_type_name === 'theatres' && (
                        <div className='srchdirc_box' id='disti_search_data'>
                          {gridData &&
                            gridData.map((item, index) => {
                              return (
                                <div className='srchdirc_item' key={index}>
                                  <div className='srchdirc_iteminner df fww'>
                                    <div className='srchdircitem_imgbox'>
                                      <a href={item.link}>
                                        <div className='srchdirc_img df fww'>
                                          <img src={item.img} alt='' />{' '}
                                        </div>
                                      </a>
                                    </div>
                                    <div className='srchdircitem_info'>
                                      <h4>
                                        <a href={item.link}>{item.title}</a>
                                      </h4>
                                      <p>{item.content}</p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                      {(post_type_name === 'all' || post_type_name === 'All' || post_type_name === 'post') && (
                        <div className='srchart_box' id='disti_search_data'>
                          {gridData &&
                            gridData.map((item, index) => {
                              return (
                                <div className='srchart_item' key={index}>
                                  <div className='srchart_iteminner df fww'>
                                    <div className='srchartitem_imgbox'>
                                      <a href={item.link}>
                                        <div className='srchart_img pvr'>
                                          <img src={item.img} alt='' className='' />{' '}
                                        </div>
                                      </a>
                                    </div>
                                    <div className='srchartitem_info'>
                                      <h4>
                                        <span>{item.sub_title}</span>
                                        <a href={item.link}>{item.title}</a>
                                      </h4>
                                      <p className='tagtxt'>
                                        {item.publish_date}
                                        {item.release_year}
                                      </p>
                                      {item.content && <p>{item.content}</p>}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                      {SearchData.search_load_more === 'true' ? (
                        <div className='viewbtn'>
                          <p onClick={loadDataByPageNo} id='search-film-loadmore' className='btn'>
                            View More
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Search;
