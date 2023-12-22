import { useState } from 'react';
import { useDispatch } from 'react-redux';

const formatCurrency = (number, symbol = '$') => {
  // Add thousands separator
  const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Format the number as a currency string
  return `${symbol}${formattedNumber}`;
};

const Re_Release = ({ data, OriginalReleaseData, mdetailshow }) => {
  const dispatch = useDispatch();
  if (mdetailshow == undefined) mdetailshow = true;
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  let OriginalDate = new Date(OriginalReleaseData.release_date);
  OriginalDate = OriginalDate.toLocaleDateString('en-US', dateOptions);

  const [ReleaseDate, setReleaseDate] = useState(OriginalDate);
  const [ReleaseData, setReleaseData] = useState(OriginalReleaseData);

  let domestic_gross = Number(OriginalReleaseData.domestic_gross.replace(/[^0-9.-]+/g, ''));
  let international_gross = Number(OriginalReleaseData.international_gross.replace(/[^0-9.-]+/g, ''));
  let worldwide_gross = Number(OriginalReleaseData.worldwide_gross.replace(/[^0-9.-]+/g, ''));
  data.map((item) => {
    domestic_gross += Number(item.domestic_gross === '' ? 0 : item.domestic_gross.replace(/[^0-9.-]+/g, ''));
    international_gross += Number(item.international_gross === '' ? 0 : item.international_gross.replace(/[^0-9.-]+/g, ''));
    worldwide_gross += Number(item.worldwide_gross === '' ? 0 : item.worldwide_gross.replace(/[^0-9.-]+/g, ''));
  });
  const handleOnReleaseDateChange = (event) => {
    const val = event.target.value;
    setReleaseDate(event.target.value);
    const result = data.filter((item) => item.release_date === val);
    if (result.length > 0) {
      setReleaseData(result[0]);
      localStorage.setItem('isOriginalRelease', false);
    } else {
      setReleaseDate(OriginalDate);
      setReleaseData(OriginalReleaseData);
      localStorage.setItem('isOriginalRelease', true);
    }
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
          <option value={OriginalDate}>
            {OriginalDate} - {OriginalReleaseData.title}
          </option>
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
          </ul>
          {/* prettier-ignore */}
          {mdetailshow && ReleaseData.domestic_details?.length > 0 && (
            <div className='fdtable'>
              <div className='datatable_wrap'>
                <table className='responsive dataTable twotblhead'>
                  <thead>
                    <tr>
                      <th className='border-0'>&nbsp;</th>
                      <th colSpan='2'>Weekend</th>
                      <th colSpan='2'>Weekly</th>
                      <th colSpan='2'>Locations</th>
                      <th colSpan='2' className='border-0'>
                        &nbsp;
                      </th>
                    </tr>
                    <tr>
                      <th data-title='Week'>Week</th>
                      <th data-title='Weekend Gross $'>Gross $</th>
                      <th data-title='Weekend % Chg.'>% Chg.</th>
                      <th data-title='Weekly Gross $'>Gross $</th>
                      <th data-title='Weekly % Chg.'>% Chg.</th>
                      <th data-title='Locations #'>#</th>
                      <th data-title='Locations Chg.'>Chg.</th>
                      <th data-title='Average $'> Average $ </th>
                      <th data-title='to-date $'> to-date $ </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ReleaseData.domestic_details.map((result, id) => {
                      return (
                        <tr className='box-office-res-row' key={id}>
                          {/* <td data-title='Year'>{result.year}</td> */}
                          <td data-title='Week'>{result.week}</td>
                          <td data-title='Weekend Gross $'>{result.weekend_gross}</td>
                          <td data-title='Weekend % Chg.'>{result.weekend_gross_change}</td>
                          <td data-title='Weekly Gross $'>{result.weekly_gross}</td>
                          <td data-title='Weekly % Chg.'>{result.weekly_gross_change}</td>
                          <td data-title='Locations #'>{result.locations}</td>
                          <td data-title='Locations Chg.'>{result.locations_change}</td>
                          <td data-title='Average $'>{result.average}</td>
                          <td data-title='to-date $'>{result.to_date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Re_Release;
