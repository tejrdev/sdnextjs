import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../Directory/ListingPages/Pagination';
import { Movielist } from '@/components/FilmData/DetailPages/BoxOfficeResults/TopQmovies';
import Loader from '@/components/Loader';
import { Movielisttype } from '@/types/movies';
import Link from 'next/link';
import sdplaceholder2 from '@/public/images/sdplaceholder2.jpg';
type FilmCalendarData = {
  total_page?: number;
  list?: unknown[];
};


const FilmCalendar = ({ distributorId, title }: { distributorId: string, title: string }) => {
  const [data, setData] = useState<FilmCalendarData>({
    total_page: 0,
    list: [],
  });
  const [currPage, setCurrPage] = useState(1);
  const [sortBy, setSortBy] = useState('releasedate');
  const [isFutureRelease, setIsFutureRelease] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [DataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    //set pagination
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const pageno = params.get('pageno');
    if (pageno !== '' && pageno !== null) {
      setCurrPage(parseInt(pageno));
      setDataChanged(true);
    }
    loadDetailPageData();
  }, []);

  useEffect(() => {
    if (DataChanged) loadDetailPageData();
  }, [currPage, sortBy, isFutureRelease]);

  const loadDetailPageData = () => {
    setShowLoader(true);
    try {
      axios
        .get(
          process.env.NEXT_PUBLIC_SD_API + '/detail_pages/distributors_detail_film_data.php?url=' + process.env.NEXT_PUBLIC_BACKEND_URL + '/distributors/' + distributorId + '&page_no=' + currPage + '&order_choice=' + sortBy + '&undated=' + isFutureRelease +
          '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
        )
        .then((res) => {
          setData(res.data.movies);
          setShowLoader(false);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    } finally {
      // console.log('finally');
      // setShowLoader(false);
    }
  };


  const setCurrentPage = (currentPage: number) => {
    setCurrPage(currentPage);
    setDataChanged(true);
  };

  const setDistributorSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currSortBy = e.target.value;
    setSortBy(currSortBy);
    setCurrentPage(1);
    setDataChanged(true);
  };

  const checkFutureRelease = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isFuture = e.target.checked;
    setIsFutureRelease(isFuture);
    setCurrentPage(1);
    setDataChanged(true);
  };

  return (
    <section className='distfilm_calander relese_cal dlsecspace bg-gray-100 py-7 md:py-9 lg:py-12'>
      <div className='container'>
        <div className='top_txt mb-7'>
          <h2> Release Calendar </h2>

          <div className='shortingbox flex flex-wrap items-center justify-between'>
            <div className='furelease mt-1 mr-4 md:mr-6 lg:mr-10'>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-light transition ${isFutureRelease ? 'text-black' : 'text-gray-400'}`}>
                  Show Future Releases
                </span>

                <button
                  type="button"
                  onClick={() => checkFutureRelease({ target: { checked: !isFutureRelease } } as React.ChangeEvent<HTMLInputElement>)}
                  className={`relative h-8 w-16 rounded-full border border-black transition ${isFutureRelease ? 'bg-white' : 'bg-gray-300'}`}
                  aria-label={isFutureRelease ? 'Hide future releases' : 'Show future releases'}
                >
                  <span className={`absolute top-[1px] size-7 rounded-full bg-amber-500 shadow-lg shadow-black/30 transition-all duration-300 ${isFutureRelease ? 'left-1' : 'right-1'}`} />
                </button>

                <span className={`text-lg transition ${!isFutureRelease ? 'text-black' : 'text-gray-400'}`}>
                  Hide Future Releases
                </span>
              </div>
            </div>
            <div className='shortingselect flex flex-wrap mt-2'>
              <label htmlFor='' className='mt-1 text-lg'>
                Sort by
              </label>
              <div className='shortingopt ml-2 relative'>
                <select name='SortbySelect' className='appearance-none min-w-40 rounded-full border border-stone-900 bg-white text-gray-600 text-lg leading-none px-5 py-2 pr-14 focus:outline-none focus:ring-0 cursor-pointer' onChange={setDistributorSortBy} value={sortBy}>
                  <option value='releasedate'> Release Date </option>
                  <option value='title'> Title </option>
                </select>
                <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        {showLoader ? (
          <div className='managloading pvr container' style={{ marginBottom: 40 }}>
            <div className='lodarhight'>
              <Loader />
            </div>
          </div>
        ) : (
          <>
            {data?.list?.length === 0 ? (
              <h5 className='text-center' style={{ marginTop: 10 }}>
                No movies found
              </h5>
            ) : (
              <>
                <div className='distfilmcalndr_row flex flex-wrap gap-y-5 mb-8'>
                  {data?.list?.map((item, i) => (
                    <FilmCalendarMovielist data={item as any} key={i} title={title} />
                  ))}
                </div>
                <Pagination totalPages={data?.total_page} setCurrentPage={setCurrentPage} currentPage={currPage} />
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FilmCalendar;

const FilmCalendarMovielist = ({ data, index = -1, title, requestFrom = '', quarter, totalyear, selectedLayout = '', isAllYears = false }: Movielisttype) => {
  const imgSrc = requestFrom === 'TopQmovies' ? data?.poster_url : data?.img;

  return (
    <div className='topmovies card pr-3 inline-flex flex-wrap xsm:flex-nowrap relative w-full lg:w-1/2 '>
      <div className="border-b xsm:border border-solid border-gray-600 xsm:rounded-md w-full flex flex-wrap xsm:flex-nowrap">
        <div className='cardimg w-[150px] xl:w-[170px]'>
          <Link href={data.link ? data.link : data.permalink ? data.permalink : '#'} className='rounded-md block border border-gray-300 '>
            <img
              src={
                data.img === null || data.img === '' || data.img === process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-content/themes/screendollars-live/assets/images/noimgico.jpg'
                  ? sdplaceholder2.src
                  : imgSrc
              }
              alt={data.title}
              className='rounded-md '
            />
          </Link>
        </div>
        <div className='cardinfo xsm:pl-4 w-full xsm:w-3/4 pt-3 xsm:pt-0 max-w-96 content-center'>
          <ul className='ratinginfo_tags mb-1 ml-0 text-sm'>
            {data?.primary_genre && data?.primary_genre.length > 0 && (
              <li>
                <ul className='ml-0 mt-2'>
                  {data?.primary_genre?.map((item, i) => (
                    <li key={i} className='text-[13px] inline-block align-top mr-2 mb-2'>
                      <Link href={item.value} className='cursor-pointer hover:no-underline px-3 rounded-3xl text-black capitalize border border-gray-400 py-[2px] hover:bg-gray-100'>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
          <h4 className=''>
            <Link href={data.link ? data.link : data.permalink ? data.permalink : '#'}>{data.title} ({data.release_date ? new Date(data.release_date).getFullYear() : ''})</Link>
          </h4>
          {requestFrom === 'TopQmovies' && (
            <p className='mb-1'>
              <Link href={data.distributor_link || '#'}>{data.distributor_name}</Link>
            </p>
          )}
          <ul className='ratinginfo_tags mb-1 ml-0 text-sm'>
            {data.rating && (
              <li>
                <span>{data?.rating}</span>
              </li>
            )}
            {data?.runtime && <li>{data.runtime}</li>}
            {data?.genre && (
              <li className='w-[calc(100%-141px)] truncate' title={data?.genre}>
                {data?.genre}
              </li>
            )}

          </ul>
          {/* {data?.distributor_name && <p className='mb-1'>{data?.distributor_name}</p>} */}
          {requestFrom === 'TopQmovies' ? (
            <p className='mb-2 text-[13px]'>
              {data?.pattern ? data?.pattern : ''}
              {data?.Locations ? ' (' + data.Locations + ' Locations)' : ''}
            </p>
          ) : title ? (
            <>
              {/* <p className='mb-1'>{title}</p> */}
              <p className='mb-2  text-sm'>
                {data?.release_date + (data?.pattern ? ' | ' + data?.pattern : '')}
                {data?.Locations ? ' (' + data.Locations + ' Locations)' : ''}
              </p>
            </>
          ) : (
            <p className='mb-1'>{data?.release}</p>
          )}

          <p className='line-clamp-3  text-[13px] mb-3'>{data?.synopsis}</p>
          <p className='text-[13px]'>
            {selectedLayout === 'SQT' && data?.total_year && (
              <strong>
                {quarter}: ${data?.total_quarter} |{' '}
              </strong>
            )}
            {data?.total_to_date && <strong className='inline-block'>Total To-Date: ${data?.total_to_date} </strong>}
            {selectedLayout === 'SYT' && data?.total_year && !isAllYears && <strong> | Total In Year: ${data?.total_year}  </strong>}
          </p>
        </div>
      </div>
    </div>
  );
};
