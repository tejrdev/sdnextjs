import { useEffect } from 'react';
const $ = require('jquery');

const InfoBlock = ({ data }) => {
  useEffect(() => {
    var headerHeight = $('.site-headertop').outerHeight();
    $(document).on('click', '.sidebar_block a[href*=\\#]', function (e) {
      e.preventDefault(); // prevent hard jump, the default behavior
      var target = $(this).attr('href'); // Set the target as variable
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: $(target).offset().top - headerHeight + 0,
          },
          600
        );
      return false;
    });
    $(window).scroll(function () {
      /* sticky side bar link jump*/
      var scrollDistance = $(window).scrollTop();
      // Assign active class to nav links while scolling
      $('.sidebar_blockiner .info_box').each(function (i) {
        setTimeout(function () {
          var headerHeight = $('.site-headertop').outerHeight();
        }, 2000);
        var headerHeight = $('.site-headertop').outerHeight();
        if ($(this).position().top - headerHeight <= scrollDistance) {
          $('.sidebarbox > .side_catogery ul.article-sidebar > li').removeClass('active');
          $('.sidebarbox > .side_catogery ul.article-sidebar > li').eq(i).addClass('active');
        }
      });
    });
  }, []);

  return (
    <div className='info_block' id='sd_news_posts'>
      {data.map((item, index) => {
        const id = 'item' + (index + 1);
        return (
          <div id={id} className='article-wrapper' key={index}>
            <div className={item.class_name + ' info_box'}>
              {'filmdata_arttable' === item.class_name ? (
                <div className={item.box_office_result_data ? 'art_boxofficetable filter_tabsinfo' : 'art_studiocalander filter_tabsinfo'}>
                  <h3>{item.title_sub ? item.title_sub : item.title}</h3>
                  <div className='infotxt'>
                    <div className=''>
                      <div dangerouslySetInnerHTML={{ __html: item.comments }}></div>
                    </div>

                    {item.box_office_result_data ? (
                      <div className='result_table tablebox'>
                        <div className='datatable_wrap'>
                          <table className='responsive dataTable'>
                            <thead>
                              <tr>
                                <th data-title='Rank'>Rank</th>
                                <th data-title='Title'>Title (Distributor)</th>
                                <th data-title='Week'>Week</th>
                                <th data-title='# Theatres'># Theatres</th>
                                <th data-title='Weekend $'>Weekend $</th>
                                <th data-title='Per Theatre $'> Per Theatre Average $</th>
                                <th data-title='Total $ To-Date'>Total $</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.box_office_result_data &&
                                item.box_office_result_data.films.map((result, id) => {
                                  return (
                                    <tr className='box-office-res-row' key={id}>
                                      <td data-title='Rank'>{id + 1}</td>
                                      <td data-title='Title'>
                                        <a href={result.link}>
                                          <strong>{result.title}</strong>
                                        </a>
                                        {' (' + result.distributor_name + ')'}
                                      </td>
                                      <td data-title='Week'>{result.week}</td>
                                      <td data-title='Locations #'>{result.locations}</td>
                                      <td data-title='Weekend $'>{result.weekend_gross}</td>
                                      <td data-title='Per theatre Average $'>{result.per_theater_avg}</td>
                                      <td data-title='Total $'>{result.weekend_total}</td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className='sturelease_table multile_tables'>
                        <div className='datatable_wrap'>
                          <table className='responsive dataTable'>
                            <thead>
                              <tr>
                                <th data-title='Title'>Title (Distributor)</th>
                                <th data-title='Rating'>Rating</th>
                                <th data-title='Runtime'>Runtime</th>
                                <th data-title='Distribution'>Distribution</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.studio_release_calendar &&
                                item.studio_release_calendar.map((result, id) => {
                                  return (
                                    <tr key={id}>
                                      <td data-title='Title'>
                                        <a href={result.link} title={result.title}>
                                          <strong>{result.title}</strong>
                                        </a>
                                        {' (' + result.disti.trim() + ')'}
                                      </td>
                                      <td data-title='Rating'>{result.Rating}</td>
                                      <td data-title='Runtime'>{result.Runtime}</td>
                                      <td data-title='Distribution Pattern'>{result.dist_pattern}</td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    <div className='view_link text-center' id='2021-05-28'>
                      <a className='btn' href='/film-data/box-office-results/' data-months={item.links_m} data-year={item.links_y} data-week={item.links_w}>
                        See More Details
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className='top_txt'>
                    <div className='top_info'>
                      <label>{item.cat_name ? item.cat_name : item.title}</label>
                      <h3>{item.title_sub ? item.title_sub : item.title}</h3>
                    </div>
                  </div>
                  <div className='infotxt'>
                    {item.content ? (
                      <div className='art_txt'>
                        <div className='media_box'>
                          <a className='popvid popyoutube' href={item.artical_video}>
                            <span className='playico'>
                              <img src={process.env.NEXT_PUBLIC_MENU_URL + 'wp-content/themes/screendollars/assets/images/playico.png'} alt='play' />
                            </span>
                            <span
                              className='vid_img bgimage'
                              style={{
                                background: 'url(' + item.img + ')',
                              }}></span>
                          </a>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InfoBlock;
