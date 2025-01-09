import axios from 'axios';
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import { useRouter } from 'next/router';
const $ = require('jquery');

const Sd_Search = () => {
  const router = useRouter();
  const post_type_name = router.query.post_type;
  const search_value = router.query.s;
  let load_more_wait = false;
  const [is_empty, setis_empty] = useState(false);
  const [SearchDataLoaded, setSearchDataLoaded] = useState(false);
  const [SearchData, setSearchData] = useState([]);
  const [postTypes, setPostTypes] = useState('All');
  const [secCls, setSecCls] = useState('');
  const [pageNo, setpageNo] = useState(1);
  const [orderBy, setOrderBy] = useState('relevance');
  const [gridData, setGridData] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [LoadMoreRequired, setLoadMoreRequired] = useState(false);
  const [ShowLoader, setShowLoader] = useState(false);

  useEffect(() => {
    loadSearchData();
    switch (post_type_name) {
      case 'all':
        setPostTypes('All');
        setSecCls('srchart');
        break;
      case 'film_data':
        setPostTypes('Movies');
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
    const target = document.querySelector('#search-film-loadmore');
    let isVisible = null;

    const callBack = (entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible && LoadMoreRequired && !load_more_wait) {
        load_more_wait = true;
        if (pageNo < 5) setpageNo(pageNo + 1);
      }
    };

    const options = {
      root: null,
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(callBack, options);
    LoadMoreRequired && target && observer.observe(target);
  }, [SearchDataLoaded]);

  const loadDataByPageNo = () => {
    setpageNo(pageNo + 1);
  };

  const loadSearchData = () => {
    setShowLoader(true);
    setSearchDataLoaded(false);
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/search_page/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&post_type_name=' + post_type_name + '&s=' + search_value + '&order=' + orderBy + '&page_no=' + pageNo)
      .then((res) => {
        if (!res.data.search) {
          setis_empty(true);
          if (gridData.length) {
            //do nothing
          } else {
            setSearchData(res.data);
          }
        } else {
          setSearchData(res.data);
          load_more_wait = false;
          if (gridData.length) {
            setGridData((oldData) => oldData.concat(res.data.search.search_post));
          } else {
            setGridData(res.data.search.search_post);
          }
          setis_empty(false);
          setLoadMoreRequired(res.data.search_load_more === 'true' ? true : false);
        }
        setSearchDataLoaded(true);
        setShowLoader(false);
      })
      .catch((err) => console.log(err));
  };

  const onTriggerClick = (e) => {
    e.preventDefault();
    setOpen(!isOpen);
  };

  const SortByChange = (e) => {
    e.preventDefault();
    setOrderBy(e.target.getAttribute('data-value'));
    setOpen(!isOpen);
    setpageNo(1);
    setGridData([]);
  };
  const sortby_options = [
    { name: 'Sort by Newest', value: 'asc' },
    { name: 'Sort by Relevance', value: 'relevance' },
    { name: 'Sort by Oldest', value: 'desc' },
  ];
  let order_title = '';
  const selected_order = sortby_options.filter((item) => item.value == orderBy);
  if (selected_order.length > 0) order_title = selected_order[0].name;

  return (
    <>
      {gridData ? (
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
                          <div className={'custom-select film-order-data' + (isOpen ? ' opened' : '')} id='custom-film-order-data'>
                            <span className='custom-select-trigger' onClick={onTriggerClick}>
                              {order_title}
                            </span>
                            <div className='custom-options'>
                              {sortby_options.map((item, index) => (
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

                  <div className='srchaccd_info'>
                    {(post_type_name === 'film_data' || post_type_name === 'filmtalent') && (
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
                                      <a href={item.link} title={item.title}>
                                        {' '}
                                        {item.title}
                                        {item.release_year && '(' + item.release_year + ')'}
                                      </a>
                                    </h4>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                    {(post_type_name === 'film_festival' || post_type_name === 'vendors' || post_type_name === 'theatres' || post_type_name === 'exhibitors' || post_type_name === 'studios_distributors') && (
                      <div className='srchdirc_box' id='disti_search_data'>
                        {gridData &&
                          gridData.map((item, index) => {
                            return (
                              <div className='srchdirc_item' key={index}>
                                <div className='srchdirc_iteminner df fww'>
                                  <div className='srchdircitem_imgbox'>
                                    <a href={item.link}>
                                      <div className='srchdirc_img df fww'>
                                        <img src={item.img} alt='' />
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

                    {(post_type_name == '' || post_type_name === 'all' || post_type_name === 'All' || post_type_name === 'post') && (
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
                    {/* {SearchData.search_load_more === 'true' ? ( */}
                    {ShowLoader && (
                      <div className='pvr loaderOverlay srchpageloading'>
                        <span className='loader'></span>
                      </div>
                    )}
                    {LoadMoreRequired && (
                      <div className='viewbtn'>
                        <p onClick={loadDataByPageNo} id='search-film-loadmore' className='btn'>
                          View More
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      ) : (
        <Loader />
      )}

      {/* {SearchData.title === 'No Result' ? (
        ''
      ) : (
        <div className='pvr loaderOverlay srchpageloading'>
          <span className='loader'></span>
        </div>
      )} */}
    </>
  );
};

export default Sd_Search;
