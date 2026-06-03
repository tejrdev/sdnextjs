import axios from 'axios';
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import ShowtimeSlider from './ShowtimeSlider';
import sdplaceholder2 from '../../public/images/sdplaceholder2.jpg';

const NowShowing = ({ id, website }) => {
  const [ShowtimeDataLoaded, setShowtimeDataLoaded] = useState(false);
  const [ShowtimeData, setShowtimeData] = useState([]);
  const [Showtimefilter, setShowtimefilter] = useState(0);

  useEffect(() => {
    loadShowtimeData();
  }, []);

  const loadShowtimeData = () => {
    let apiurl = process.env.NEXT_PUBLIC_SD_API + '/curated_showtime/theatre_showtime.php?id=' + id;
    let apihitdUrl = apiurl.indexOf(' ') !== -1 ? apiurl.substring(0, apiurl.lastIndexOf(' ')) : apiurl;
    axios
      .get(apihitdUrl)
      .then((res) => {
        setShowtimeDataLoaded(true);
        setShowtimeData(res.data);
        setShowtimefilter(res.data?.date_tabs && res.data?.date_tabs[0]);
      })
      .catch((err) => console.log(err));
  };

  const $ = require('jquery');
  function handle_showtime_date(e, sdata) {
    e.preventDefault();
    console.log(sdata);
    setShowtimefilter(sdata);
    return false;
  }

  return (
    <>
      {ShowtimeDataLoaded && ShowtimeData.movie_datas ? (
        <section className='nowshowing py-5 lg:py-8 pvr bg-stone-900 px-5 lg:px-0'>
          <div className='container'>
            <div className='top_txt'>
              <h2 className='text-white'> Now Showing </h2>
              <div className="dateselector bg-white rounded-lg px-2 py-2 mt-2 mb-4 inline-block">
                <ul
                  className="flex flex-wrap md:gap-2 gap-1 list-none items-center ml-0 mb-0 [&>li]:py-1 [&>li]:lg:py-5 [&>li]:px-2 [&>li]:rounded-lg [&>li]:bg-stone-900 [&>li]:text-white [&>li]:cursor-pointer [&>li]:uppercase [&>li]:min-w-12 [&>li]:text-center 
                  [&>li:hover]:bg-orangegold [&>li:hover]:text-black [&>li.active]:bg-orangegold [&>li.active]:text-black
                  [&>li]:w-[70px] [&>li]:sm:w-[90px] [&>li]:lg:h-[90px] "
                >
                  {ShowtimeData.date_tabs &&
                    ShowtimeData.date_tabs.map((sdata, sindex) => {
                      return (
                        <li key={sindex} className={sdata.includes(Showtimefilter) ? 'active' : ''} onClick={(e) => handle_showtime_date(e, sdata)}>
                          <span className="block">{sdata.split(',')[0]}</span>
                          <span className="font-bold capitalize block mt-[-6px] xsm:mt-0">{sdata.split(',')[1]}</span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            {ShowtimeDataLoaded ? (
              <ShowtimeSlider data={ShowtimeData.movie_datas} webinfo={website} activeDate={Showtimefilter} />
            ) : (
              <div className='nowshow_sliderbox pvr' style={{ minHeight: 200, marginBottom: 20 }}>
                <div className='secloder'>
                  <div className='secspinner'></div>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : null}
    </>
  );
};

export default NowShowing;
