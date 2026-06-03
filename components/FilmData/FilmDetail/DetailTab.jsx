import Tabs from '@/components/All/Tabs';
import Tab from '@/components/All/Tabs';
import AdvanceTicket from '@/components/FilmData/FilmDetail/AdvanceTicket';
import AvarnessChart from '@/components/FilmData/FilmDetail/AvarnessChart';
import IntrestChart from '@/components/FilmData/FilmDetail/IntrestChart';
import BoxSummary from '@/components/FilmData/FilmDetail/BoxSummary';
import Charttable from '../../../components/FilmData/FilmDetail/Chart_table';
import BoxOfficeTable from '../../../components/FilmData/FilmDetail//BoxOfficeTable';
import Chartforcast from '@/components/FilmData/FilmDetail/Chart_forcast';
import { useState, useEffect } from 'react';
import Paywall from '@/components/Products/Paywall';

const DetailTab = ({ FilmDetailsData, isAdminUser }) => {
  const [link, setLink] = useState('');
  const [isOriginalRelease, setisOriginalRelease] = useState(FilmDetailsData.re_release_boxoffice?.length > 1 ? false : true);

  useEffect(() => {
    setLink(localStorage.getItem('type_link'));
  }, []);

  const onReleaseDateChange = (releaseData) => {
    setisOriginalRelease(releaseData);
  };
  return (
    <section className='detailtab' id='advanced'>
      <div className='container'>
        <Tabs>
          {FilmDetailsData.forcast_show === 'yes' && (
            <Tab label='Box Office Forecast'>
              {(
                <div className='forecast'>
                  <h5 className='dottitle'>
                    Forecast <small></small>
                  </h5>
                  <ul className='grid'>
                    {FilmDetailsData.forcast.openening_weekend && (
                      <li>
                        <label htmlFor=''>Opening Weekend US & Canada:</label>
                        <p>{FilmDetailsData.forcast.openening_weekend}</p>
                      </li>
                    )}
                    {FilmDetailsData.forcast.total && (
                      <li>
                        <label htmlFor=''>Total US & Canada:</label>
                        <p>{FilmDetailsData.forcast.total}</p>
                      </li>
                    )}
                  </ul>
                  <Chartforcast data={FilmDetailsData} />
                </div>
              )}
            </Tab>
          )}
          <Tab label='Box Office Results'>
            <BoxSummary data={FilmDetailsData} onReleaseDateChange={onReleaseDateChange} />
            {isOriginalRelease &&
              (FilmDetailsData.boxoffice_films_data.table_total ? (
                <>
                  <Charttable data={FilmDetailsData} />
                  <BoxOfficeTable data={FilmDetailsData.boxoffice_films_end_ly} />
                </>
              ) : (
                <div className='m-3'>
                  <strong>No Data Found</strong>
                </div>
              ))}
          </Tab>
          {/* {FilmDetailsData.forcast_show === 'yes' && (
            <Tab label='Box Office Forecast'>
              {(
                <div className='forecast'>
                  <h5 className='dottitle'>
                    Forecast <small></small>
                  </h5>
                  <ul className='grid'>
                    {FilmDetailsData.forcast.openening_weekend && (
                      <li>
                        <label htmlFor=''>Opening Weekend US & Canada:</label>
                        <p>{FilmDetailsData.forcast.openening_weekend}</p>
                      </li>
                    )}
                    {FilmDetailsData.forcast.total && (
                      <li>
                        <label htmlFor=''>Total US & Canada:</label>
                        <p>{FilmDetailsData.forcast.total}</p>
                      </li>
                    )}
                  </ul>
                  <Chartforcast data={FilmDetailsData} />
                </div>
              )}
            </Tab>
          )} */}
          <Tab label='Advance Tickets'>
            <AdvanceTicket ADV_Data={FilmDetailsData.advanceticket} />
          </Tab>
          <Tab label='Awareness' className={isAdminUser ? 'adminuser' : 'noadminuser'}>
            <AvarnessChart ADV_Data={FilmDetailsData.awreness} />
          </Tab>
          <Tab label='Interest' className={isAdminUser ? 'adminuser' : 'noadminuser'}>
            <IntrestChart ADV_Data={FilmDetailsData.intrest} />
          </Tab>
          <Tab label='Tracking'>
            {link !== 'pro' && link !== 'default' ? (
              <>
                <div className='tabpaywall pvr'>
                  <Paywall />
                </div>
              </>
            ) : (
              <IntrestChart ADV_Data={FilmDetailsData.FILMFORCE} />
            )}
          </Tab>
          <Tab label='Video Views' disable={'disabled'}>
            <strong>Coming soon...</strong>
            <br /> <br />
            <br />
          </Tab>
          <Tab label='Wiki Views' disable={'disable'}>
            <strong>Coming soon...</strong>
            <br /> <br />
            <br />
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};

export default DetailTab;
