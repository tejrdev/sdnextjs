import { useState } from 'react';
import BoxOfficeTable from './BoxOfficeTable';
import Charttable from '@/components/FilmData/FilmDetail/Chart_table';

const formatCurrency = (number, symbol = '$') => {
  // Add thousands separator
  const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Format the number as a currency string
  return `${symbol}${formattedNumber}`;
};

const Re_Release = ({ data, OriginalReleaseData, mdetailshow, onReleaseDateChange }) => {
  if (mdetailshow == undefined) mdetailshow = true;
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  // let OriginalDate = new Date(OriginalReleaseData.release_date);
  // OriginalDate = OriginalDate.toLocaleDateString('en-US', dateOptions);

  const [ReleaseDate, setReleaseDate] = useState('');
  const [IsOriginalRelease, setIsOriginalRelease] = useState(false);

  const setChartData = (result) => {
    const rereleaseData = result[0];
    rereleaseData.chart = [];

    const chartData = [];
    chartData.title = rereleaseData.release_name;
    let weekend_data = 0;
    let weekly_data = 0;
    let total_data = 0;
    let last_weekend_data = 0;
    let last_weekly_data = 0;
    let last_total_data = 0;
    const dataLength = rereleaseData.domestic_details_new?.length;
    if (dataLength > 0) {
      rereleaseData.domestic_details_new.map((item, index) => {
        const weekend = item.weekend_gross === 0 ? 0 : Math.round(Number(item.weekend_gross.replace(/[^0-9.-]+/g, '')) / 10000) / 100;
        const weekly = item.weekly_gross === 0 ? 0 : Math.round(Number(item.weekly_gross.replace(/[^0-9.-]+/g, '')) / 10000) / 100;
        // const weekend_total = item.weeked_todate === 0 ? 0 : Math.round(Number(item.weeked_todate.replace(/[^0-9.-]+/g, '')) / 10000) / 100;
        const weekly_total = item.weekly_todate === 0 ? 0 : Math.round(Number(item.weekly_todate.replace(/[^0-9.-]+/g, '')) / 10000) / 100;
        if (index === 0) {
          weekend_data += weekend;
          weekly_data += weekly;
          total_data += parseFloat(weekly_total); //+ parseFloat(weekend_total)
        } else if (index >= 6) {
          last_weekend_data += parseFloat(weekend);
          last_weekly_data += parseFloat(weekly);
          last_total_data += parseFloat(parseFloat(weekly).toFixed(2)); //parseFloat(weekend_total) +
        } else {
          weekend_data += ',' + weekend;
          weekly_data += ',' + weekly;
          total_data += ',' + parseFloat(parseFloat(weekly_total).toFixed(2)); //+ (parseFloat(weekend_total)
          last_total_data = weekly_total;
        }
      });

      //if dataLength < 7 then add additional data
      if (dataLength < 7) {
        for (let i = dataLength; i < 7; i++) {
          weekend_data += ',0';
          weekly_data += ',0';
          total_data += ',0';
        }
      } else {
        weekend_data += ',' + last_weekend_data.toFixed(2);
        weekly_data += ',' + last_weekly_data.toFixed(2);
        total_data += ',' + last_total_data.toFixed(2);
      }
    }
    chartData.w_end = weekend_data;
    chartData.w_ly = weekly_data;
    chartData.tot_ly = total_data;
    rereleaseData.chart.push(chartData);
    return rereleaseData;
  };

  const chartData = setChartData(data);
  const [ReleaseData, setReleaseData] = useState(chartData);

  const domestic_gross = Number(OriginalReleaseData.domestic_gross.replace(/[^0-9.-]+/g, ''));
  const international_gross = Number(OriginalReleaseData.international_gross.replace(/[^0-9.-]+/g, ''));
  const worldwide_gross = Number(OriginalReleaseData.worldwide_gross.replace(/[^0-9.-]+/g, ''));
  // data.map((item) => {
  //   domestic_gross += Number(item.domestic_gross === '' ? 0 : item.domestic_gross.replace(/[^0-9.-]+/g, ''));
  //   international_gross += Number(item.international_gross === '' ? 0 : item.international_gross.replace(/[^0-9.-]+/g, ''));
  //   worldwide_gross += Number(item.worldwide_gross === '' ? 0 : item.worldwide_gross.replace(/[^0-9.-]+/g, ''));
  // });
  const handleOnReleaseDateChange = (event) => {
    const val = event.target.value;
    setReleaseDate(event.target.value);
    const result = data.filter((item) => item.release_date === val);
    if (result.length > 0) {
      // setReleaseData(result[0]);
      setIsOriginalRelease(false);
      if (mdetailshow) {
        onReleaseDateChange(false);
        const c_data = setChartData(result);
        setReleaseData(c_data);
        //calculate chart Data for Re-release
      } else {
        setReleaseData(result[0]);
      }
    }
    // else {
    //   setIsOriginalRelease(true);
    //   setReleaseDate(OriginalDate);
    //   setReleaseData(OriginalReleaseData);
    //   mdetailshow && onReleaseDateChange(true);
    // }
  };

  return (
    <>
      <ul className='allreleaseinfo grid'>
        <li className='allreleasedata'>
          <p>
            <strong>
              <u>All Releases ({data.length})</u>
            </strong>
          </p>
        </li>
        <li className='allreleasedata'>
          <label htmlFor=''>Total US & Canada: </label>
          <p>{formatCurrency(domestic_gross)}</p>
        </li>
        <li>
          <label htmlFor=''>Total International </label>
          <p>{formatCurrency(international_gross)}</p>
        </li>
        <li>
          <label htmlFor=''>Total Worldwide:</label>
          <p>{formatCurrency(worldwide_gross)}</p>
        </li>
      </ul>
      <div className='releaseselect'>
        <select name='' id='' onChange={handleOnReleaseDateChange} value={ReleaseDate}>
          {/* <option value={OriginalDate}>
            {OriginalDate} - {OriginalReleaseData.title}
          </option> */}
          {data.map((item, index) => {
            const date = new Date(item.release_date);
            const releaseDate = date.toLocaleDateString('en-US', dateOptions);
            return (
              <option value={item.release_date} key={index}>
                {releaseDate} - {item.release_name}
              </option>
            );
          })}
        </select>
      </div>
      {ReleaseData && (
        <>
          <ul className='grid'>
            {!!data.movie_frist_week_collection && (
              <li>
                <label htmlFor=''>Opening Weekend US & Canada: </label>
                <p> {data.movie_frist_week_collection}</p>
              </li>
            )}
            {ReleaseData.domestic_gross && (
              <li>
                <label htmlFor=''>Total US & Canada: </label>
                <p>{ReleaseData.domestic_gross}</p>
              </li>
            )}
            {ReleaseData.international_gross && (
              <li>
                <label htmlFor=''>Total International </label>
                <p>{ReleaseData.international_gross}</p>
              </li>
            )}
            {ReleaseData.worldwide_gross && (
              <li>
                <label htmlFor=''>Total Worldwide:</label>
                <p>{ReleaseData.worldwide_gross}</p>
              </li>
            )}
            {!ReleaseData.domestic_gross && !ReleaseData.international_gross && !ReleaseData.worldwide_gross && (
              <li>
                <p>No Data Available</p>
              </li>
            )}
          </ul>
          {mdetailshow &&
            (ReleaseData.domestic_details_new?.length > 0 ? (
              <>
                <Charttable data={ReleaseData} isReRelease={true} ReleaseDate={ReleaseDate} />
                <BoxOfficeTable data={ReleaseData.domestic_details_new} />
              </>
            ) : (
              !IsOriginalRelease && (
                <h4 className='text-center' style={{ marginTop: 30 }}>
                  No Data Available
                </h4>
              )
            ))}
        </>
      )}
    </>
  );
};

export default Re_Release;
