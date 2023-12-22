import axios from 'axios';
import { useState, useEffect } from 'react';
import Loader from '../../../../Loader';
import CompareResults from './CompareResults';
import Results from './Results';
import dt from 'datatables.net-dt';
import FilterWrap from './FilterWrap';

const $ = require('jquery');
$.fn.DataTable = dt;

const BoxOfficeFilter = ({ data, monthData, onYearchange }) => {
  let currentDate = new Date();
  currentDate = new Date(currentDate.toISOString().slice(0, -1));
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString('default', {
    month: 'short',
  });
  const startDate = new Date(currentYear, 0, 1);
  const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil(days / 7) - 5;
  const [BoxOfficeFilterDataLoaded, setBoxOfficeFilterDataLoaded] = useState(false);
  const [BoxOfficeFilterData, setBoxOfficeFilterData] = useState([]);
  const [boxOfficeYear, setBoxOfficeYear] = useState(currentYear);
  const [boxOfficeMonth, setBoxOfficeMonth] = useState(currentMonth);
  const [boxOfficWeek, setBoxOfficWeek] = useState(weekNumber);

  $(document).on('click', '#s_week li a', function () {
    if (!$(this).parent().hasClass('active')) {
      $('#s_week li').removeClass('active');
      $(this).parent().addClass('active');
      var a_week = $(this).data('week');
      var a_year = $('#s_year li.active span').data('year');
      var post_per_page = $('#custom-pagecount_select .custom-option.selection').data('value');

      localStorage.setItem('box_office_week', a_week);
      get_box_ofc_res_post(a_week, a_year, post_per_page);
    }

    return false;
  });

  $(document).on('click', '#custom-pagecount_select .custom-option', function () {
    var post_per_page = $(this).attr('data-value');
    var a_week = $('#s_week li.active a').data('week');
    var a_year = $('#s_year li.active a').data('year');
    get_box_ofc_res_post(a_week, a_year, post_per_page);
  });

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

  function get_box_ofc_res_post(a_week, a_year, post_per_page = '') {
    // alert(box_office_pid);
    if (typeof a_week === 'undefined' || a_week === null) {
      return false;
    }
    if (typeof a_year === 'undefined' || a_year === null) {
      return false;
    }
    setBoxOfficeFilterDataLoaded(false);
    setBoxOfficWeek(a_week);
    setBoxOfficeYear(a_year);

    // if($('.box-office-res-tbl') )$('.box-office-res-tbl').DataTable().destroy();
  }

  function get_box_ofc_week_logic(a_year, page_id, onload) {
    // alert(box_office_pid);
    if (typeof a_year === 'undefined' || a_year === null) {
      return false;
    }
    // if (typeof page_id === 'undefined' || page_id === null) {
    //   return false;
    // }

    $('#s_week li.no_data').removeClass('hide');
    //$('#s_month li.has_weekdata:nth-child(1) a').trigger('click');
    //$("#s_week").show();

    // if (data.onload_data) {
    //localStorage.box_office_week   box_office_months
    var sd_year_selected = sd_getUrlParameter('y');
    var sd_week_selected = (sd_getUrlParameter('week') * 1).toString();
    if (sd_year_selected.length >= 1 && sd_week_selected.length >= 1) {
      var m_names = $('#s_week  li a[data-week="' + sd_week_selected + '"]')
        .parent()
        .attr('class')
        .split(' ');
      $('#s_month li a[data-months="' + m_names[0] + '"]')
        .parent()
        .addClass('active');
      localStorage.setItem('box_office_months', $('#s_month li a[data-months="' + m_names[0] + '"]').data('months'));
    }

    if (localStorage.box_office_months) {
      $('#s_month li').removeClass('active');
      $('#s_month li a[data-months="' + localStorage.box_office_months + '"').trigger('click');
    }
    if (localStorage.box_office_week) {
      $('#s_week li').removeClass('active');
      $('#s_week li a[data-week="' + localStorage.box_office_week + '"').trigger('click');
    }

    setBoxOfficeFilterDataLoaded(false);
    setBoxOfficeYear(a_year);
    // }
  }
  $('#s_month li').on('click', function (e) {
    e.preventDefault();
    const month = $(this).find('a').data('months');
    $('#s_month li').removeClass('active');
    $(this).addClass('active');
    setBoxOfficeMonth(month);

    $('#s_week li').addClass('hide');
    $('#s_week li.' + month).removeClass('hide');
  });

  $('#s_year li').on('click', function (e) {
    e.preventDefault();
    const year = $(this).find('span').data('year');
    $('#s_year li').removeClass('active');
    $(this).addClass('active');
    setBoxOfficeYear(year);
    onYearchange(year);
  });

  $(document).on('click', '#s_year li span', function () {
    $('#s_year li').removeClass('active');
    $('#s_month li').removeClass('active');
    $(this).parent().addClass('active');
    var a_year = $(this).data('year');
    var page_id = $('#page_id').val();
    localStorage.setItem('box_office_years', a_year);
    get_box_ofc_week_logic(a_year, page_id);
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

  useEffect(() => {
    if (localStorage.box_office_months) setBoxOfficeMonth(localStorage.box_office_months);
    $('#s_month li a[data-months="' + boxOfficeMonth + '"]')
      .closest('li')
      .addClass('active');
    $('#s_year li span[data-year="' + boxOfficeYear + '"]')
      .closest('li')
      .addClass('active');
    $('#s_week li.' + currentMonth).removeClass('hide');

    // Year Month Week logic
    //$('#s_month .hide_this').hide();

    //url data set for prepolulate
    var sd_year_selected = sd_getUrlParameter('y');
    var sd_week_selected = sd_getUrlParameter('week');
    if (sd_year_selected.length >= 1 && sd_week_selected.length >= 1) {
      localStorage.setItem('box_office_years', sd_year_selected);
      localStorage.setItem('box_office_week', (sd_week_selected * 1).toString());
    }

    if (localStorage.box_office_week) {
      // localStorage.box_office_years
      if (localStorage.box_office_years) {
        var page_id = $('#page_id').val();
        $('#s_year li').removeClass('active');
        $('#s_year li span[data-year="' + localStorage.box_office_years + '"')
          .parent()
          .addClass('active');
        get_box_ofc_week_logic(localStorage.box_office_years, page_id, 'onload');
      }
    } else {
      var a_week = $('#s_week li.active a').data('week');
      var a_year = $('#s_year li.active a').data('year');
      get_box_ofc_res_post(a_week, a_year, '');
    }
  }, [boxOfficWeek]);

  useEffect(() => {
    loadFilterData();
  }, [boxOfficWeek]);

  const loadFilterData = () => {
    let SelWeek = boxOfficWeek;
    let SelYear = boxOfficeYear;
    if (localStorage.box_office_years) {
      SelYear = localStorage.box_office_years;
    }
    if (localStorage.box_office_week) {
      SelWeek = localStorage.box_office_week;
    }
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/boxoffice_page.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&boxoffice_result=true&a_year=' + SelYear + '&a_week=' + SelWeek)
      .then((res) => {
        setBoxOfficeFilterData(res.data);
        setBoxOfficeFilterDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {BoxOfficeFilterDataLoaded ? (
        <>
          <section className='boxoffice_filter'>
            <div className='container'>
              <div className='cat_navbox'>
                <div className='boweeks'>
                  <div className='boweekinfo df fww'>
                    <div className='boweekyear'>
                      <label>Select Year</label>
                      <div className='boxoffice_filter_wrap'>
                        <ul id='s_year'>
                          {data.box_office_year.map((item, index) => {
                            return (
                              <li className={item.film_year === localStorage.box_office_years ? 'active' : ''} key={index}>
                                <span data-year={item.film_year}>{item.film_year}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <div className='boweekmonth'>
                      <label>Select Month</label>
                      <FilterWrap id='s_month' data={monthData.monthdata} boxOfficeMonth={boxOfficeMonth} boxOfficeYear={boxOfficeYear} />
                    </div>
                    <div className='boweekweek'>
                      <label>Select Week</label>
                      <FilterWrap id='s_week' className='rsf_week_data' data={monthData.weekdata} boxOfficeMonth={boxOfficeMonth} boxOfficeYear={boxOfficeYear} />
                    </div>
                    {/* <input type="hidden" id="page_id" value="201" /> */}
                  </div>
                  <CompareResults data={BoxOfficeFilterData.tabs_yeaars} week={boxOfficWeek} />
                </div>
              </div>
            </div>
          </section>

          <Results data={BoxOfficeFilterData} />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default BoxOfficeFilter;
