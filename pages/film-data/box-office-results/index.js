import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import CategoryNavigation from '../../../components/FilmData/DetailPages/CategoryNavigation';
import Intro from '../../../components/FilmData/DetailPages/Intro';
import CompareResults from '../../../components/FilmData/DetailPages/BoxOfficeResults/CompareResults';
import Results from '../../../components/FilmData/DetailPages/BoxOfficeResults/Results';
import dt from 'datatables.net-dt';
import FilterWrap from '../../../components/FilmData/DetailPages/BoxOfficeResults/FilterWrap';

import Loader from '../../../components/Loader';

const $ = require('jquery');

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'film-data/box-office-results');
  const data = await res.json();

  const BOFilter = await fetch(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/filter_ymw.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&boxoffice_page=true');
  const BOFilterData = await BOFilter.json();

  const BoxOffice = await fetch(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/boxoffice_page.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&boxoffice_result=true');
  const BoxOfficeLoadedData = await BoxOffice.json();

  return {
    props: { data, BOFilterData, BoxOfficeLoadedData },
    revalidate: 10, // In seconds
  };
}

const BoxOfficeResults = ({ data, BOFilterData, BoxOfficeLoadedData }) => {
  const [BoxOfficeFilter_data, setBoxOfficeFilter_data] = useState(true);
  const [BoxOfficeDataLoaded, setBoxOfficeDataLoaded] = useState(true);
  const [BoxOfficeData, setBoxOfficeData] = useState(BoxOfficeLoadedData);
  const [FilterweekLoaded, setFilterweekLoaded] = useState(true);
  const [Filterweekdata, setFilterweekdata] = useState(BOFilterData);

  const [SdYear, setSdYear] = useState('');
  const [Sdweek, setSdweek] = useState('');

  function sd_getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
    return false;
  }
  useEffect(() => {
    if (Sdweek !== '') loadFilterData(SdYear, Sdweek);
  }, [Sdweek]);

  useEffect(() => {
    $('#s_month li.active a').trigger('click');
    $('table.dataTable').each(function () {
      var trcount = $(this).find('thead tr').length;
      //console.log(trcount);
      if (trcount > 1) {
        $(this).addClass('twotblhead');
      }
    });
  }, [FilterweekLoaded]);

  useEffect(() => {
    $.fn.DataTable = dt;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    //url data set for prepolulate
    var sd_year_selected = sd_getUrlParameter('yyyy');
    var sd_week_selected = sd_getUrlParameter('ww');
    if (sd_year_selected.length >= 1 && sd_week_selected.length >= 1) {
      localStorage.setItem('box_office_years', sd_year_selected);
      localStorage.setItem('box_office_week', (sd_week_selected * 1).toString());
      loadMonthsWeekData(sd_year_selected, sd_week_selected);
      setSdYear(sd_year_selected);
      setSdweek(sd_week_selected);
    } else if (localStorage.box_office_years && localStorage.box_office_week) {
      loadMonthsWeekData(localStorage.box_office_years, localStorage.box_office_week);
      setSdYear(localStorage.box_office_years);
      setSdweek(localStorage.box_office_week);
    } else {
      // loadMonthsWeekData();
      //loadFilterData();
    }

    // filter data called
    $(document).on('click', '#s_week li a', function () {
      if (!$(this).parent().hasClass('active')) {
        $('#s_week li').removeClass('active');
        $(this).parent().addClass('active');
        var a_week = $(this).data('week');
        localStorage.setItem('box_office_week', a_week);
        var a_year = $('#s_year li.active span').data('year');

        setSdYear(a_year);
        setSdweek(a_week);
      }
      return false;
    });

    // Year Month Week logic
    $(document).on('click', '#s_year li span', function () {
      $('#s_year li').removeClass('active');
      $('#s_month li').removeClass('active');
      $(this).parent().addClass('active');
      var a_year = $(this).data('year');
      localStorage.setItem('box_office_years', a_year);
      setFilterweekLoaded(false);
      setSdYear(a_year);
      loadMonthsWeekData(a_year, 'no_week');
      return false;
    });

    $(document).on('click', '#s_month li a', function () {
      if ($(this).data('months')) {
        $('#s_month li').removeClass('active');
        $(this).parent().addClass('active');
        var months = $(this).data('months');
        $('#s_week li').addClass('hide');
        $('#s_week li.' + months).removeClass('hide');
        localStorage.setItem('box_office_months', months);
      }
      return false;
    });

    $(document).on('click', '.tab_itemsall', function () {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
      var tabtitle = $(this).data('title');
      var tabinfotitle = $(this).data('title');
      $('.tabsblock .filter_tabsdata').hide();
      if ((tabtitle = tabinfotitle)) {
        $('.tabsblock .filter_tabsdata[data-title="' + tabinfotitle + '"]').show();
      }
    });
  }, []);

  const loadMonthsWeekData = (a_year, a_week) => {
    if (typeof a_week === 'undefined' || a_week === null || a_week === '') {
      a_week = '';
    }
    if (typeof a_year === 'undefined' || a_year === null || a_year === '') {
      a_year = '';
    }
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/filter_ymw.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&boxoffice_page=true&a_year=' + a_year + '&a_week=' + a_week)
      .then((res) => {
        setFilterweekdata(res.data);
        setFilterweekLoaded(true);
        localStorage.setItem('box_office_years', res.data.year_selected);
        localStorage.setItem('box_office_week', (res.data.week_no_selected * 1).toString());
      })
      .catch((err) => console.log(err));
  };

  const loadFilterData = (a_year, a_week) => {
    setBoxOfficeFilter_data(false);
    if (typeof a_week === 'undefined' || a_week === null || a_week === '') {
      a_week = '';
    }
    if (typeof a_year === 'undefined' || a_year === null || a_year === '') {
      a_year = '';
    }
    //a_week = parseInt(a_week) || "" ;
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/boxoffice_page.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&boxoffice_result=true&a_year=' + a_year + '&a_week=' + a_week)
      .then((res) => {
        setBoxOfficeDataLoaded(true);
        setBoxOfficeFilter_data(true);
        setBoxOfficeData(res.data);
        //$('#s_month li.active a').trigger('click');
      })
      .catch((err) => console.log(err));
  };

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
              return (
                <script key={index} type={item.type} class={item.class}>
                  {item.html}
                </script>
              );
            default:
              return null;
          }
        })}
      </Head>
      <CategoryNavigation />
      {BoxOfficeDataLoaded ? (
        <>
          <Intro title={BoxOfficeData.title} content={BoxOfficeData.content} />
          <section className='boxoffice_filter'>
            <div className='container'>
              <div className='cat_navbox'>
                <div className='boweeks'>
                  <div className='boweekinfo df fww'>
                    {FilterweekLoaded ? (
                      <>
                        <div className='boweekyear'>
                          <label>Select Year</label>
                          <div className='boxoffice_filter_wrap'>
                            <ul id='s_year'>
                              {Filterweekdata.yeardata &&
                                Filterweekdata.yeardata.map((item, index) => {
                                  return (
                                    <li className={item.class_name} key={index}>
                                      <span data-year={item.year}>{item.year}</span>
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                        </div>
                        <div className='boweekmonth'>
                          <label>Select Month</label>
                          {Filterweekdata.monthdata && <FilterWrap id='s_month' data={Filterweekdata.monthdata} />}
                        </div>
                        <div className='boweekweek'>
                          <label>Select Week</label>
                          {Filterweekdata.weekdata && <FilterWrap id='s_week' data={Filterweekdata.weekdata} />}
                        </div>
                      </>
                    ) : (
                      <Loader />
                    )}
                  </div>
                  <div className='boweekcompare'>
                    {BoxOfficeDataLoaded && (
                      <div className='boxofice_totalbox' id='boxofice_totalbox_html'>
                        <label>Compare Week {BoxOfficeData.week_no_selected} Results</label>
                        <CompareResults data={BoxOfficeData.tabs_yeaars} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <Loader />
      )}
      {BoxOfficeDataLoaded && BoxOfficeFilter_data ? <Results data={BoxOfficeData} /> : <Loader />}
    </>
  );
};

export default BoxOfficeResults;
