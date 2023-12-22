import Tabs from '@/components/All/Tabs';
import Tab from '@/components/All/Tabs';
import AdvanceTicket from '@/components/FilmData/FilmDetail/AdvanceTicket';
import AvarnessChart from '@/components/FilmData/FilmDetail/AvarnessChart';
import IntrestChart from '@/components/FilmData/FilmDetail/IntrestChart';
import BoxSummary from '@/components/FilmData/FilmDetail/BoxSummary';
import Charttable from '../../../components/FilmData/FilmDetail/Chart_table';
import Chartforcast from '@/components/FilmData/FilmDetail/Chart_forcast';
import { useState, useEffect, useRef } from 'react';
import Paywall from '@/components/Products/Paywall';
import { useSelector } from 'react-redux';

const DetailTab = ({ data, FilmDetailsData }) => {
  const isOriginalRelease = localStorage.getItem('isOriginalRelease') || true;

  // console.log(data);
  // lg(FilmDetailsData);
  const [link, setLink] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    setLink(localStorage.getItem('type_link'));
    setEmail(localStorage.getItem('email'));
  }, []);

  return (
    <section className='detailtab'>
      <div className='container'>
        <Tabs>
          <Tab label='Box Office'>
            {link !== 'pro' && link !== 'default' ? (
              <>
                <div className='tabpaywall pvr'>
                  <Paywall />
                </div>
              </>
            ) : (
              <>
                <BoxSummary data={FilmDetailsData} adv_tab={'true'} />
                {isOriginalRelease &&
                  (FilmDetailsData.boxoffice_films_data.table_total ? (
                    <Charttable data={FilmDetailsData} />
                  ) : FilmDetailsData.forcast_show ? (
                    <Chartforcast data={FilmDetailsData} />
                  ) : (
                    <div className='m-3'>
                      <strong>No Data Found</strong>
                    </div>
                  ))}
              </>
            )}
          </Tab>
          <Tab label='Advance Tickets'>
            {link !== 'pro' && link !== 'default' ? (
              <>
                <div className='tabpaywall pvr'>
                  <Paywall />
                </div>
              </>
            ) : (
              <AdvanceTicket ADV_Data={FilmDetailsData.advanceticket} />
              // <>{FilmDetailsData.advanceticket.linerchart.series.length >= 1 && <AdvanceTicket ADV_Data={FilmDetailsData.advanceticket} />}</>
            )}
          </Tab>
          <Tab label='Awareness'>
            {link !== 'pro' && link !== 'default' ? (
              <>
                <div className='tabpaywall pvr'>
                  <Paywall />
                </div>
              </>
            ) : (
              <AvarnessChart ADV_Data={FilmDetailsData.awreness} />
            )}
            {/* <strong>Coming soon...</strong>
            <br /> <br />
            <br /> */}
          </Tab>
          <Tab label='Interest'>
            {link !== 'pro' && link !== 'default' ? (
              <>
                <div className='tabpaywall pvr'>
                  <Paywall />
                </div>
              </>
            ) : (
              <IntrestChart ADV_Data={FilmDetailsData.intrest} />
            )}
            {/* <strong>Coming soon...</strong>
            <br /> <br />
            <br /> */}
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
