import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import dt from 'datatables.net-dt';

import Loader from '../../../components/Loader';
import CategoryNavigation from '../../../components/FilmData/DetailPages/CategoryNavigation';
//import 'datatables.net-dt/css/jquery.dataTables.min.css';
import FilmFilter from '../../../components/FilmData/DetailPages/Films/FilmFilter';
import Pagination from '../../../components/Directory/ListingPages/Pagination';
import HomePageAds from '../../../components/Homepage/HomePageAds';

const $ = require('jquery');
export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'film-data/films-a-z');
  const data = await res.json();

  // film a-z static data
  let FilmsData = await fetch(
    process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/films_a_z.php?filter=' + 'a' + '&page_no=' + 1 + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  FilmsData = await FilmsData.json();

  return {
    props: { data, FilmsData },
    revalidate: 10, // In seconds
  };
}

const Films = ({ data,FilmsData }) => {
  let filter_selected = '';
  const tdStyle = {
    border: '1px solid #f2f2f2',
    borderCollapse: 'collapse',
    padding: '6px',
  };
  // const [FilmsDataLoaded, setFilmsDataLoaded] = useState(false);
  // const [FilmsData, setFilmsData] = useState([]);
  const [FilmsPages, setFilmsPages] = useState([]);
  const [FilmsPage, setFilmsPage] = useState(1);
  const [FilmsListData, setFilmsListData] = useState(FilmsData.movies);
  const [FilmsAlphabet, setFilmsAlphabet] = useState('a');
  const [SearchFilms, setSearchFilms] = useState('');
  const [FilmsSearchDataLoaded, setFilmsSearchDataLoaded] = useState(false);
  const [FilmsSearchData, setFilmsSearchData] = useState([]);

  const setCurrentPage = (currentPage) => {
    setFilmsPage(currentPage);
  };
  const setAlphabet = (alphabet) => {
    setFilmsAlphabet(alphabet);
  };
  const onSearchFilmChange = (e) => {
    $('.film_atoz_search .srchwrap').addClass('film_search_result_data');
    const search = e.target.value;
    setSearchFilms(search);
    if (search !== '') {
      setFilmsSearchDataLoaded(false);
      setTimeout(() => {
        loadSearchFilmData();
      }, 1000);
    }
  };
  const loadSearchFilmData = () => {
    var s_data = $('.film_search_box #f_film_search').val();
    if (s_data.length !== 0) {
      axios
        .get(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/film-search.php?s_data=' + SearchFilms + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
        .then((res) => {
          if (res.data.movies !== '') {
            $('.film_atoz_search .srchwrap').removeClass('film_search_result_data');
            setFilmsSearchData(res.data);
            setFilmsSearchDataLoaded(true);
          } else {
            $('.film_atoz_search .srchwrap').addClass('film_search_result_data');
          }
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    loadFilmsData();
  }, [FilmsPage, FilmsAlphabet]);

  useEffect(() => {
    $.fn.DataTable = dt;

    $('#film-datatable').DataTable({
      columns: [
        { data: 'title' },
        { data: 'distributor' },
        { data: 'release_date' },
        { data: 'rating' },
        { data: 'runtime' },
        { data: 'dist_type' },
        { data: 'dist_pattern' },
        { data: 'dist_locations' },
        { data: 'box_office_opening_weekend' },
        { data: 'box_office_total' },
      ],
      columnDefs: [{ orderable: false, targets: [3, 5, 7] }],
      paging: false,
      searching: false,
      responsive: false,
      autoWidth: false,
    });

    /*table css*/
    $('table.dataTable').each(function () {
      var trcount = $(this).find('thead tr').length;
      //console.log(trcount);
      if (trcount > 1) {
        $(this).addClass('twotblhead');
      }
    });

    $(' .responsive ,.responsive tr th , .responsive tr td').css({
      border: '1px solid #c5c5c5',
      'border-collapse': 'collapse',
      padding: '6px',
    });
    $('.dataTables_info').css({ display: 'none' });
    $('.printhide').css({ visibility: 'hidden', height: '0', overflow: 'hidden' });

    $('.dataTable').wrap('<div class="datatable_wrap"/>');

    /*!data table*/

    if (localStorage.filter_selected) {
      filter_selected = localStorage.filter_selected;
    } else {
      filter_selected = 'a';
    }
    $('.dataTables_info').css({ display: 'none' });
  }, []);

  const loadFilmsData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/films_a_z.php?filter=' + FilmsAlphabet + '&page_no=' + FilmsPage + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        // if (FilmsPage === 1) {
        //   setFilmsData(res.data);
        //   setFilmsDataLoaded(true);
        //   console.log(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/films_a_z.php?filter=' + FilmsAlphabet + '&page_no=' + FilmsPage + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
        // }
        setFilmsListData(res.data.movies);
        setFilmsPages(res.data.max_page[0]);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Head >
        {(data.children[0].children).map( (item, index) => {
            const attributes = item.tag.toUpperCase();

            switch (attributes) {
              case 'TITLE':
                return <title key={index}>{item.html}</title>;
              case 'META':
                const name = item.name || '';
                if(name !== ''){
                return <meta key={index} name={item.name} content={item.content} />;
                } else{
                return <meta key={index} property={item.property} content={item.content} />;
                }
              case 'LINK':
                return <link key={index} rel={item.rel} href={item.href} />;
              case 'SCRIPT':
                return (
                  <script key={index} type={item.type} class={item.class}
                     dangerouslySetInnerHTML={{ __html: item.html }}>
                  </script>
                );
              default:
                return null;
            }
          })}
      </Head>
      <CategoryNavigation />
      {/*FilmsDataLoaded ? (*/
        <>
          <section className="filmaz subfilmy">
            <div className="container">
              <div className="info_block">
                <div className="info_box printarea wtbg">
                  <div className="top_txt middletitle_print">
                    <div className="top_info">
                      <div className="page_introbox text-center">
                        <h1 className="h2">{FilmsData.title}</h1>
                        <p>{FilmsData.content}</p>
                      </div>
                    </div>
                    <div className="downloadbtn">
                      <span className="pritbtn">Print</span>
                    </div>
                  </div>
                  <div className="info_txt printbox ">
                    <div className="filmaztable tablebox">
                      <div className="film_atoz_search">
                        <div className="film_search_box">
                          <input type="input" id="f_film_search" name="" placeholder="Enter Film Title" tabIndex="0" value={SearchFilms} onChange={onSearchFilmChange} />
                          <i className="far fa-search"></i>
                        </div>
                        <div className="srchwrap film_search_result_data">
                          {FilmsSearchDataLoaded &&
                            FilmsSearchData.movies &&
                            FilmsSearchData.movies.map((item, index) => {
                              return (
                                <div className="srch_films" tabIndex="1" key={index}>
                                  <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} className=" df fww">
                                    <div
                                      className="srch_media bgimage"
                                      style={{
                                        background: 'url(' + item.img + ')',
                                      }}
                                    ></div>
                                    <div className="srch_fliminfo">
                                      <h4>{item.title}</h4>
                                      <p>{item.year}</p>
                                      <p>{item.genre}</p>
                                    </div>
                                  </Link>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                      <FilmFilter data={FilmsData.atoz} setAlphabet={setAlphabet} currentAlphabet={FilmsAlphabet} />
                      <table className="responsive dataTable twotblhead" id="film-datatable">
                        <thead>
                          <tr>
                            <th colSpan="2"></th>
                            <th colSpan="1"></th>
                            <th colSpan="2"></th>
                            <th colSpan="3" data-title="Distribution">
                              Distribution
                            </th>
                            <th colSpan="2" data-title="Domestic Box Office $">
                              Domestic Box Office $
                            </th>
                          </tr>
                          <tr>
                            <th data-title="Title">Title</th>
                            <th data-title="Distributor">Distributor</th>
                            <th data-title="Release date">Release date</th>
                            <th data-title="Rating">Rating</th>
                            <th data-title="Runtime">
                              Locations <br />
                              +-LW
                            </th>
                            <th data-title="Distribution Type">Type</th>
                            <th data-title="Distribution Pattern">Pattern / Platform</th>
                            <th data-title="Distribution location">location</th>
                            <th data-title="Box Office opening Weekend">opening Weekend</th>
                            <th data-title="Box Office Total">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {FilmsListData.map((item, index) => {
                            return (
                              <tr className={`box-office-res-row ` + (index % 2) === 0 ? 'even' : 'odd'} role="row" key={index}>
                                <td data-title="Title" style={{ tdStyle }} key={item.title}>
                                  <h2 className="movtable_title"><Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} title={item.title}>
                                      <strong>{item.title}</strong>
                                  </Link></h2>
                                </td>
                                <td data-title="Distributor" style={{ tdStyle }}  key={item.distributor}>
                                  <Link href={item.distributor_link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} title={item.distributor}>
                                    <strong>{item.distributor}</strong>
                                  </Link>
                                </td>
                                <td data-title="Release date" style={{ tdStyle }}>
                                  {item.release_date}
                                </td>
                                <td data-title="Rating" style={{ tdStyle }}>
                                  {item.rating}
                                </td>
                                <td data-title="Runtime" style={{ tdStyle }}>
                                  {item.runtime}
                                </td>
                                <td data-title="Distribution Type" style={{ tdStyle }}>
                                  {item.dist_type}
                                </td>
                                <td
                                  data-title="Distribution Pattern"
                                  style={{ tdStyle }}
                                  dangerouslySetInnerHTML={{
                                    __html: item.dist_pattern,
                                  }}
                                ></td>
                                <td data-title="Distribution location" style={{ tdStyle }}>
                                  {item.dist_locations}
                                </td>
                                <td data-title="Box Office opening Weekend" style={{ tdStyle }}>
                                  {item.box_office_opening_weekend}
                                </td>
                                <td data-title="Box Office Total" style={{ tdStyle }}>
                                  {item.box_office_total}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div id="film_atoz_pag_nav"></div>
                  </div>
                </div>
                <HomePageAds cls="ads_970" format="horizontal" />
              </div>
            </div>
          </section>
          <Pagination totalPages={FilmsPages} setCurrentPage={setCurrentPage} requestFrom="films" />
        </>
      /*) : (
        <Loader />
      )*/}
    </>
  );
};

export default Films;
