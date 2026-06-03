import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../Directory/ListingPages/Pagination';
import { Movielist } from '@/components/FilmData/DetailPages/BoxOfficeResults/TopQmovies';
import Loader from '@/components/Loader';

type FilmCalendarData = {
  total_page: number;
  list: unknown[];
};


const FilmCalendar = ({ distributorId, title, movieData }: { distributorId: string, title: string, movieData: FilmCalendarData }) => {
  const [data, setData] = useState(movieData);
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
    if (movieData) {
      setData(movieData);
    } else {
      loadDetailPageData();
    }
  }, []);

  useEffect(() => {
    if (DataChanged) loadDetailPageData();
  }, [currPage, sortBy, isFutureRelease]);

  const loadDetailPageData = () => {
    setShowLoader(true);
    try {
      axios
        .get(
          process.env.NEXT_PUBLIC_SD_API +
          '/detail_pages/distributors_detail_film_data.php?url=' +
          process.env.NEXT_PUBLIC_BACKEND_URL +
          '/distributors/' +
          distributorId +
          '&page_no=' +
          currPage +
          '&order_choice=' +
          sortBy +
          '&undated=' +
          isFutureRelease +
          '&api_token=' +
          process.env.NEXT_PUBLIC_API_TOKEN
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
    <section className='distfilm_calander relese_cal dlsecspace toplinesec aaaa'>
      <div className='container'>
        {/* {data.list.length === 0 && !showLoader ? (
          null
        ) : ( */}
        {/* <> */}
        <div className='top_txt df fww'>
          <h3>
            Release Calendar <i className='fal fa-angle-right'></i>
          </h3>
          <div className='shortingbox flex flex-wrap'>
            <div className='furelease mt-1 mr-4'>
              <input type='checkbox' name='release' id='futurelease' defaultChecked={true} onChange={checkFutureRelease} />
              <label htmlFor='futurelease'>Show Future Releases</label>
            </div>
            <div className='shortingselect flex flex-wrap'>
              <label htmlFor='' className='mt-1'>
                Sort by
              </label>
              <div className='shortingopt ml-2'>
                <select name='SortbySelect' className='globalselect' onChange={setDistributorSortBy} value={sortBy}>
                  <option value='releasedate'> Release Date </option>
                  <option value='title'> Title </option>
                </select>
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
            {data.list.length === 0 ? (
              <h5 className='text-center' style={{ marginTop: 10 }}>
                No movies found
              </h5>
            ) : (
              <>
                <div className='distfilmcalndr_row flex flex-wrap gap-y-5 mb-8'>
                  {data.list.map((item, i) => (
                    <Movielist data={item as any} key={i} title={title} />
                  ))}
                </div>
                <Pagination totalPages={data.total_page} setCurrentPage={setCurrentPage} currentPage={currPage} />
              </>
            )}
          </>
        )}

        {/* </> */}
        {/* )} */}
      </div>
    </section>
  );
};

export default FilmCalendar;
