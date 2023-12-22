import axios from 'axios';
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import ShowtimeSlider from './ShowtimeSlider';

const NowShowing = ({ data }) => {
  const [ShowtimeDataLoaded, setShowtimeDataLoaded] = useState(false);
  const [ShowtimeData, setShowtimeData] = useState([]);
  const [Showtimefilter, setShowtimefilter] = useState(0);

  useEffect(() => {
    loadShowtimeData();
  }, [Showtimefilter]);

  const loadShowtimeData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/show_time/theatres.php?id=' + data + '&dates=' + Showtimefilter)
      .then((res) => {
        if (res.data.movie_datas) {
          setShowtimeData(res.data);
          setShowtimeDataLoaded(true);
        } else {
          setShowtimeData('');
          setShowtimeDataLoaded(false);
        }
        //console.warn(res.data);
      })
      .catch((err) => console.log(err));
  };

  const $ = require('jquery');
  function handle_showtime_date(e) {
    e.preventDefault();
    setShowtimefilter(e.target.getAttribute('id'));
    setShowtimeDataLoaded(false);

    //console.log('You clicked submit.');
    $('.weektabs a').attr('class', 'btn goldbtn');
    //this.attr('class','btn goldbtn active');
    //alert($(this).data('ID'));
    return false;
  }

  return (
    <>
      {/* {ShowtimeDataLoaded ? ( */}
        <section className="nowshowing dlsecspace toplinesec pvr">
          <div className="container">
            <div className="top_txt df fww just-between">
              <h2>
                {' '}
                Now Showing <i className="fal fa-angle-right"></i>
              </h2>
              <div className="weektabs">
                {ShowtimeData.show_time_days &&
                  ShowtimeData.show_time_days.map((sdata, sindex) => {
                    let classes = 'btn goldbtn';
                    if (sdata.hidden == Showtimefilter) classes += ' active';

                    if (Showtimefilter == 0 && sindex == 0) classes += ' active';
                    return (
                      <span className={classes} onClick={(e) => handle_showtime_date(e)} id={sdata.hidden} key={sindex}>
                        {sdata.display}
                      </span>
                    );
                  })}
              </div>
            </div>
            {ShowtimeDataLoaded && ShowtimeData.movie_datas ? (
              <ShowtimeSlider data={ShowtimeData.movie_datas} />
            ) : (
              <div className="nowshow_sliderbox pvr" style={{'minHeight':200,'marginBottom':20}}>
                <div className="secloder">
                  <div className="secspinner"></div>
                </div>
              </div>
            )}
          </div>
        </section>
      {/* ) : (
        // <Loader />
        ''
      )} */}
    </>
  );
};

export default NowShowing;
