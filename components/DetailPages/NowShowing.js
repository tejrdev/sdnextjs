import axios from 'axios';
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import ShowtimeSlider from './ShowtimeSlider';
import sdplaceholder2 from '../../public/sdplaceholder2.jpg';

const NowShowing = ({ data, website }) => {
  const [ShowtimeDataLoaded, setShowtimeDataLoaded] = useState(false);
  const [ShowtimeData, setShowtimeData] = useState([]);
  const [Showtimefilter, setShowtimefilter] = useState(0);

  useEffect(() => {
    loadShowtimeData();
  }, []);

  const loadShowtimeData = () => {
    let apiurl = process.env.NEXT_PUBLIC_SD_API + '/show_time/theatres_new.php?id=' + data;
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
  function handle_showtime_date(e) {
    e.preventDefault();
    setShowtimefilter(e.target.innerHTML);
    return false;
  }

  return (
    <>
      {ShowtimeDataLoaded && ShowtimeData.movie_datas ? (
        <section className='nowshowing dlsecspace toplinesec pvr'>
          <div className='container'>
            <div className='top_txt df fww just-between'>
              <h2>
                Now Showing <i className='fal fa-angle-right'></i>
              </h2>
              <div className='weektabs'>
                {ShowtimeData.date_tabs &&
                  ShowtimeData.date_tabs.map((sdata, sindex) => {
                    let classes = 'btn goldbtn';
                    // if (sdata.hidden == Showtimefilter) classes += ' active';

                    if (Showtimefilter === sdata) classes += ' active';
                    return (
                      <span className={classes} key={sindex} onClick={(e) => handle_showtime_date(e)}>
                        {sdata}
                      </span>
                    );
                  })}
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
