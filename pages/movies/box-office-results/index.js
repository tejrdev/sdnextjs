import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Loader from '@/components/Loader';
import { useRouter } from 'next/router';
import Boxofficetitle from '@/components/FilmData/DetailPages/BoxOfficeResults/Boxofficetitle';
import CategoryNavigation from '../../../components/FilmData/DetailPages/CategoryNavigation';
import BoxOfficeResult from '../../../components/FilmData/DetailPages/BoxOfficeResults/BoxOfficeResult';
import BoxOfficeEvents from '../../../components/FilmData/DetailPages/BoxOfficeResults/BoxOfficeEvents';
import ClassicpageGO from '../../../components/FilmData/ClassicpageGO';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'movies/box-office-results');
  const data = await res.json();

  // const BOFilter = await fetch(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/filter_ymw.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&boxoffice_page=true');
  // const BOFilterData = await BOFilter.json();

  const BoxOffice = await fetch(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/boxoffice_page_v2_new.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&boxoffice_result=true');
  const BoxOfficeLoadedData = await BoxOffice.json();

  return {
    props: { data, BoxOfficeLoadedData },
    revalidate: 10, // In seconds
  };
}

const BoxOfficeResultsv2 = ({ data, BoxOfficeLoadedData }) => {
  const router = useRouter();
  const { yyyy, ww } = router.query;

  const [BoxOfficeFilter_data, setBoxOfficeFilter_data] = useState(true);
  const [BoxOfficeData, setBoxOfficeData] = useState(BoxOfficeLoadedData);
  const [toggleon, setToggleon] = useState(false);
  const togglehandle = (e) => setToggleon(!toggleon);
  const [currentyear, setCurrentyear] = useState(parseInt(BoxOfficeData.year));
  const [currentWeek, setCurrentWeek] = useState(parseInt(BoxOfficeData.week));
  const [lastWeek, setLastWeek] = useState(parseInt(BoxOfficeData.week));
  const [ReadYearFromURL, setReadYearFromURL] = useState(false);
  const yearsData = BoxOfficeData.box_office_year;

  //add movie schema
  const dateOptions = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' };
  const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);
  function getDateOfWeek(w, y) {
    let date = new Date(y, 0, 1 + (w - 1) * 7);
    date.setDate(date.getDate() + (5 - date.getDay()));
    return date;
  }

  var StartDate = new Date(getDateOfWeek(currentWeek, currentyear));
  var endDate = new Date(StartDate);
  endDate.setDate(endDate.getDate() + 6);
  StartDate = dateFormatter.format(StartDate);
  endDate = dateFormatter.format(endDate);

  const movieList = [];
  const MovieData = toggleon ? BoxOfficeData.boxoffice_data_weekly : BoxOfficeData.boxoffice_data;
  MovieData.map((item, index) => {
    movieList.push({
      '@type': 'Movie',
      'position': index + 1,
      'name': item.title,
      'image': item.poster_url,
      'url': process.env.NEXT_PUBLIC_FRONTEND_URL + item.permalink,
    });
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': BoxOfficeLoadedData.title,
    'url': 'https://screendollars.com/movies/box-office-results/',
    'description': StartDate + ' - ' + endDate,
    'itemListElement': { '@type': 'ItemList', 'name': 'Movies', 'itemListElement': movieList },
  };

  useEffect(() => {
    if (yyyy !== '' && yyyy !== undefined && ww !== '' && ww !== undefined) {
      if (parseInt(yyyy) !== currentyear) {
        setReadYearFromURL(true);
      }
      setCurrentyear(parseInt(yyyy));
      setCurrentWeek(parseInt(ww));
      router.push(router.pathname);
    }
  }, [router.query]);

  const loadPrevWeekData = () => {
    setCurrentWeek(currentWeek - 1);
    OnWeekChange(currentyear, currentWeek - 1);
  };
  const loadNextWeekData = () => {
    setCurrentWeek(currentWeek + 1);
    OnWeekChange(currentyear, currentWeek + 1);
  };

  const fetchlastWeekNo = (lastweek) => {
    setLastWeek(lastweek);
  };

  const OnWeekChange = (currentyear, weekselect) => {
    setCurrentyear(currentyear);
    setCurrentWeek(weekselect);
  };

  const onYearChange = (year) => {
    setCurrentyear(year);
    setCurrentWeek(0);
  };
  const loadFilterData = () => {
    setBoxOfficeFilter_data(false);
    setReadYearFromURL(false);
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/boxoffice_page_v2_new.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&boxoffice_result=true&a_year=' + currentyear + '&a_week=' + currentWeek)
      .then((res) => {
        setBoxOfficeFilter_data(true);
        setBoxOfficeData(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if ((currentWeek !== '' && currentWeek !== undefined && currentWeek !== parseInt(BoxOfficeData.week) && currentWeek !== 0) || ReadYearFromURL) loadFilterData();
  }, [currentWeek, ReadYearFromURL]);

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
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <CategoryNavigation />
      <div className={'boxofresult'}>
        <ClassicpageGO PageName={'Box Office Results'} pageUrl={'box-office-results-classic'} version={'new'} />
        <Boxofficetitle title={'Box Office Results'} OnWeekChange={OnWeekChange} selectedYear={currentyear} selectedWeek={currentWeek} onYearChange={onYearChange} fetchlastWeekNo={fetchlastWeekNo} yearsData={yearsData} />
        {BoxOfficeFilter_data ? (
          <>
            <BoxOfficeEvents data={BoxOfficeData.event_data} />
            <div className='boxresulinfo'>
              <div className='container'>
                <div className='boxresultable'>
                  <div className='boxtableswich my-3'>
                    <ul className={'daystype df fww ' + (toggleon ? 'off' : '')}>
                      <li className='tab_items active' data-title='Weekend' id='weekend_colection_data'>
                        Weekend Totals
                      </li>
                      <li className={'togglebtn ' + (toggleon ? 'off' : '')} onClick={togglehandle}>
                        <div className='togglehandel'></div>
                      </li>
                      <li className='tab_items' data-title='Weekly' id='weekely_colection_data'>
                        Weekly Totals
                      </li>
                    </ul>
                  </div>
                  <BoxOfficeResult data={toggleon ? BoxOfficeData.boxoffice_data_weekly : BoxOfficeData.boxoffice_data} toggleon={toggleon} />
                </div>
              </div>

              <div className='container'>
                <div className='releasemonthnav df fww just-between'>
                  <button className='btn uppercase' onClick={loadPrevWeekData} disabled={currentWeek === 1 ? true : false}>
                    <i className='far fa-long-arrow-alt-left'></i> Prev Week
                  </button>

                  <button className='btn uppercase' onClick={loadNextWeekData} disabled={currentWeek === lastWeek ? true : false}>
                    Next Week <i className='far fa-long-arrow-alt-right'></i>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='pvr container' style={{ marginBottom: 40 }}>
            <div className='lodarhight'>
              <Loader />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BoxOfficeResultsv2;
