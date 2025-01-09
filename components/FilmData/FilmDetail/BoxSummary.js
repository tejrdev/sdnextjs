import Re_Release from './Re_Release';

const BoxSummary = ({ data, mdetailshow, onReleaseDateChange = null }) => {
  const rerelease = data.re_release_boxoffice?.length > 1 ? true : false;

  //Original release Data
  const OriginalReleaseData = [];
  OriginalReleaseData.movie_frist_week_collection = data.movie_frist_week_collection;
  OriginalReleaseData.domestic_gross = data.boxoffice_domestic;
  OriginalReleaseData.international_gross = data.boxoffice_international;
  OriginalReleaseData.worldwide_gross = data.worldwide_total_collection;
  OriginalReleaseData.release_date = data.release_date;
  OriginalReleaseData.title = data.title;

  return (
    <>
      <section className='boxsummery dlsecspace thdetial_gallery toplinesec'>
        <div className='container'>
          {!!data.movie_frist_week_collection && (
            <div className='top_txt df fww'>
              <h2>
                Box Office<i className='fal fa-angle-right'></i>
              </h2>
            </div>
          )}
          {/*(data.forcast_show) */}
          {data.forcast_show && (
            <div className='forecast'>
              <h5 className='dottitle'>
                Forecast <small></small>
              </h5>
              <ul className='grid'>
                {data.forcast.openening_weekend && (
                  <li>
                    <label htmlFor=''>Opening Weekend US & Canada:</label>
                    <p>{data.forcast.openening_weekend}</p>
                  </li>
                )}
                {data.forcast.total && (
                  <li>
                    <label htmlFor=''>Total US & Canada:</label>
                    <p>{data.forcast.total}</p>
                  </li>
                )}
              </ul>
            </div>
          )}

          {!!data.movie_frist_week_collection && (
            <div className='boxearnings  df fww'>
              <div className='boxresult'>
                {!rerelease ? (
                  <>
                    <h5 className='dottitle'>Results</h5>
                    <ul className='grid'>
                      {!!data.movie_frist_week_collection && (
                        <li>
                          <label htmlFor=''>Opening Weekend US & Canada: </label>
                          <p> {data.movie_frist_week_collection}</p>
                        </li>
                      )}
                      {data.boxoffice_domestic && (
                        <li>
                          <label htmlFor=''>Total US & Canada: </label>
                          <p>{data.boxoffice_domestic}</p>
                        </li>
                      )}
                      {data.boxoffice_international && (
                        <li>
                          <label htmlFor=''>Total International </label>
                          <p>{data.boxoffice_international}</p>
                        </li>
                      )}
                      {data.worldwide_total_collection && (
                        <li>
                          <label htmlFor=''>Total Worldwide:</label>
                          <p>{data.worldwide_total_collection}</p>
                        </li>
                      )}
                    </ul>
                  </>
                ) : (
                  <Re_Release data={data.re_release_boxoffice} OriginalReleaseData={OriginalReleaseData} mdetailshow={mdetailshow} onReleaseDateChange={onReleaseDateChange} />
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BoxSummary;
