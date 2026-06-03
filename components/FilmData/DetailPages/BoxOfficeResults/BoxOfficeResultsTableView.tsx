import Link from 'next/link';
import { Boxofficetiletype } from './Boxofficetiletype';

const BoxOfficeResultsTableView = ({ data, toggleon, OnSortByChange, currentLayout }: Boxofficetiletype) => {
  const SortByChange = (e: any) => {
    if (e.target) {
      OnSortByChange?.(e);
    }
  };
  let cntr = 0;

  return (
    <table className='responsive dataTable box-office-res-tbl' id={toggleon ? 'box-office-res-weekly-tbl' : 'box-office-res-weekend-tbl'}>
      <thead>
        <tr>
          {(currentLayout === 'SW' || currentLayout === 'SQT' || currentLayout === 'SYT') && (
            <th data-title='Rank' className='cursor-pointer text-center active' onClick={SortByChange}>
              Rank <span className='up hidden'></span>
              <span className=''></span>
            </th>
          )}
          {(currentLayout === 'SW' || currentLayout === 'SQT' || currentLayout === 'SYT') && (
            <th data-title='Title' className='cursor-pointer text-center' onClick={SortByChange}>
              Title<span className='up'></span>
              <span className=''></span>
            </th>
          )}
          {(currentLayout === 'SW' || currentLayout === 'SQT' || currentLayout === 'SYT') && (
            <th data-title='Distributor' className='cursor-pointer text-center' onClick={SortByChange}>
              Distributor<span className='up'></span>
              <span className=''></span>
            </th>
          )}
          {currentLayout === 'AY' && (
            <th data-title='Year' className='text-center'>
              Year
            </th>
          )}
          {(currentLayout === 'SY' || currentLayout === 'AY') && (
            <th data-title='Dates' className='text-center'>
              Dates
            </th>
          )}
          {(currentLayout === 'SY' || currentLayout === 'AY') && (
            <th data-title='Film Week' className='text-center'>
              Film Week<span className='up'></span>
              <span className=''></span>
            </th>
          )}
          {(currentLayout === 'SW' || currentLayout === 'SY') && (
            <th data-title={toggleon ? 'Weekly $' : 'Weekend $'} onClick={SortByChange} className='text-center cursor-pointer'>
              {toggleon ? 'Total Weekly' : 'Total Weekend'}
              <span className='up'></span>
              <span className=''></span>
            </th>
          )}
          {(currentLayout === 'SQT' || currentLayout === 'SYT') && (
            <th data-title='Releases Date' className='cursor-pointer text-center'>
              Releases Date<span className='up'></span>
              <span className=''></span>
            </th>
          )}
          {(currentLayout === 'SQT' || currentLayout === 'SYT') && (
            <th data-title='Total in Quarter' className='cursor-pointer text-center'>
              Total in Quarter<span className='up'></span>
              <span className=''></span>
            </th>
          )}
          {(currentLayout === 'SW' || currentLayout === 'SY') && (
            <th data-title='+-LW %' className='min-w-20 text-center'>
              +-LW
            </th>
          )}
          {(currentLayout === 'SW' || currentLayout === 'SQT' || currentLayout === 'SYT') && (
            <th data-title='Locations' className='cursor-pointer text-center' onClick={SortByChange}>
              Locations<span className='up'></span>
              <span className=''></span>
            </th>
          )}
          {currentLayout === 'SW' && (
            <th data-title='+-LW' className='min-w-16 text-center'>
              +-LW
            </th>
          )}
          {currentLayout === 'SW' && (
            <th data-title='Per Theatre $' className='cursor-pointer text-center' onClick={SortByChange}>
              Avg. Per <br />
              Location<span className='up'></span>
              <span className=''></span>
            </th>
          )}
          {(currentLayout === 'SW' || currentLayout === 'SQT' || currentLayout === 'SYT') && (
            <th data-title='Total To-Date' className='cursor-pointer text-center' onClick={SortByChange}>
              Total <br /> To-Date<span className='up'></span>
              <span className=''></span>
            </th>
          )}
          {currentLayout === 'SW' && (
            <th data-title='Weeks' className='cursor-pointer text-center' onClick={SortByChange}>
              Weeks<span className='up'></span>
              <span className=''></span>
            </th>
          )}
          {currentLayout === 'AY' && (
            <th data-title='Total' className='text-center'>
              Total
            </th>
          )}
          {currentLayout === 'AY' && (
            <th data-title='+-LY' className='text-center'>
              +-LY
            </th>
          )}
          {(currentLayout === 'SY' || currentLayout === 'AY') && (
            <th data-title='Releases' className='text-center'>
              Releases
            </th>
          )}
          {(currentLayout === 'SY' || currentLayout === 'AY') && (
            <th data-title='Top Titles' className='text-left'>
              Top Titles
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map((item, index) => {
            {
              if (currentLayout === 'SW') {
                if (toggleon ? item.weekly_gross : item.weekend_gross_order && item.weekend_gross_order >= 1) {
                  cntr++;
                  return (
                    <tr id={'bx' + index + 1} className={`box-office-res-row ` + (index % 2 === 0 ? 'even' : 'odd')} role='row' key={index}>
                      <td data-title='Rank'>{item.rank}</td>
                      <td data-title='Title'>
                        <h2 className='movtable_title mb-0 leading-relaxed text-left'>
                          <Link href={item.permalink}>
                            <strong>{item.title}</strong>
                          </Link>
                        </h2>
                      </td>
                      <td data-title='Distributor'>
                        <Link href={item.distributor_link} className='text-left block'>
                          <strong>{item.distributor_name}</strong>
                        </Link>
                      </td>
                      <td data-title={toggleon ? 'Weekly $' : 'Weekend $'}>${toggleon ? item.weekly_gross && item.weekly_gross : item.weekend_gross && item.weekend_gross}</td>
                      <td data-title='+-LW %' className={toggleon ? (item.weekly_gross_change < 0 ? 'redtxt' : '') : item.weekend_gross_change < 0 ? 'redtxt' : ''} suppressHydrationWarning>
                        {toggleon ? item.weekly_gross_change && parseFloat(item.weekly_gross_change).toFixed(1) : item.weekend_gross_change && parseFloat(item.weekend_gross_change).toFixed(1)} %
                      </td>
                      <td data-title={(toggleon ? 'Weekly ' : 'Weekend ') + 'Locations #'} suppressHydrationWarning>
                        {toggleon ? item.weekly_locations && item.weekly_locations.toLocaleString() : item.weeked_locations && item.weeked_locations.toLocaleString()}
                      </td>
                      <td
                        data-title={(toggleon ? 'Weekly ' : 'Weekend ') + 'Locations +-LW'}
                        className={
                          toggleon
                            ? item.weekly_locations_change && item.weekly_locations_change < 0
                              ? 'redtxt'
                              : ''
                            : item.weeked_locations_change && item.weeked_locations_change < 0
                              ? 'redtxt'
                              : ''
                        }>
                        {toggleon ? (item.weekly_locations_change === 0 ? '-' : item.weekly_locations_change) : item.weeked_locations_change === 0 ? '-' : item.weeked_locations_change}
                      </td>

                      <td data-title='Avg. Per Location $' suppressHydrationWarning>
                        $
                        {toggleon ? item.per_theater_avg_weekly && Math.round(item.per_theater_avg_weekly).toLocaleString() : item.per_theater_avg && Math.round(item.per_theater_avg).toLocaleString()}
                      </td>
                      <td data-title='Total $' suppressHydrationWarning>
                        ${toggleon ? item.weekly_total && item.weekly_total.toLocaleString() : item.weekend_total && item.weekend_total.toLocaleString()}
                      </td>
                      <td data-title='Weeks'>{item.week}</td>
                    </tr>
                  );
                }
              } else {
                cntr++;
                return (
                  <tr id={'bx' + index + 1} className={`box-office-res-row ` + (index % 2 === 0 ? 'even' : 'odd')} role='row' key={index}>
                    {(currentLayout === 'SQT' || currentLayout === 'SYT') && <td data-title='Rank'>{item.rank}</td>}
                    {(currentLayout === 'SQT' || currentLayout === 'SYT') && (
                      <td data-title='Title'>
                        <h2 className='movtable_title mb-0 leading-relaxed text-left'>
                          <a href={item.permalink}>
                            <strong>{item.title}</strong>
                          </a>
                        </h2>
                      </td>
                    )}
                    {(currentLayout === 'SQT' || currentLayout === 'SYT') && (
                      <td data-title='Distributor'>
                        <a href={item.distributor_link} className='text-left block'>
                          <strong>{item.distributor_name}</strong>
                        </a>
                      </td>
                    )}
                    {currentLayout === 'AY' && (
                      <td data-title='Year' className='text-left'>
                        {item.year}
                      </td>
                    )}
                    {(currentLayout === 'SY' || currentLayout === 'AY') && (
                      <td data-title='Dates' className='text-left'>
                        {currentLayout === 'SY' ? item.dates : item.yearly_dates}
                      </td>
                    )}
                    {(currentLayout === 'SY' || currentLayout === 'AY') && <td data-title='Film Week'>{currentLayout === 'SY' ? item.filmWeek : item.yearly_filmWeek}</td>}
                    {currentLayout === 'SY' && (
                      <td data-title={toggleon ? 'weekly $' : 'Weekend $'}>${toggleon ? item.weekly_total && item.weekly_total : item.weekend_total && item.weekend_total}</td>
                    )}
                    {(currentLayout === 'SQT' || currentLayout === 'SYT') && <td data-title='Releases Date'>{item.release_date}</td>}
                    {(currentLayout === 'SQT' || currentLayout === 'SYT') && (
                      <td data-title='Total $'>
                        ${currentLayout === 'SQT' ? item.total_in_quarter && item.total_in_quarter.toLocaleString() : item.total_in_year && item.total_in_year.toLocaleString()}
                      </td>
                    )}
                    {currentLayout === 'SY' && (
                      <td data-title='+-LW %' className={toggleon ? (item.weekly_gross_change < 0 ? 'redtxt' : '') : item.weekend_gross_change < 0 ? 'redtxt' : ''}>
                        {toggleon
                          ? item.weekly_gross_change && parseFloat(item.weekly_gross_change.toString()).toFixed(1)
                          : item.weekend_gross_change && parseFloat(item.weekend_gross_change).toFixed(1)}{' '}
                        %
                      </td>
                    )}
                    {(currentLayout === 'SQT' || currentLayout === 'SYT') && <td data-title={'Locations #'}>{item.locations && item.locations.toLocaleString()}</td>}
                    {(currentLayout === 'SQT' || currentLayout === 'SYT') && <td data-title='Total $'>${item.total_to_date && item.total_to_date.toLocaleString()}</td>}
                    {currentLayout === 'AY' && <td data-title={'Yearly Total'}>${item.yearly_total && item.yearly_total.toLocaleString()}</td>}
                    {currentLayout === 'AY' && (
                      <td data-title='+-LW %' className={item.yearly_gross_change < 0 ? 'redtxt' : ''}>
                        {item.yearly_gross_change && parseFloat(item.yearly_gross_change.toString()).toFixed(1)} %
                      </td>
                    )}
                    {(currentLayout === 'SY' || currentLayout === 'AY') && <td data-title='Releases'>{item.releases}</td>}
                    {(currentLayout === 'SY' || currentLayout === 'AY') && (
                      <td data-title='Top Titles'>
                        <h5 className='movtable_title mb-0 leading-relaxed text-left'>
                          {item.top_movies?.map((movie: any, i: number) => (
                            <Link href={movie.permalink} title={movie.title} className='inline-block'>
                              <strong className='mr-3 overflow-ellipsis overflow-hidden whitespace-nowrap max-w-48 inline-block'>
                                {i + 1}-{movie.title}
                              </strong>
                            </Link>
                          ))}
                        </h5>
                      </td>
                    )}
                  </tr>
                );
              }
            }
          })
        ) : (
          <tr className='text-center'>
            <td colSpan={11}>
              <strong style={{ fontSize: 22 }}>Data not available for this time period.</strong>
            </td>
          </tr>
        )}
        {cntr === 0 && data.length > 0 && (
          <tr className='text-center'>
            <td colSpan={11}>
              <strong style={{ fontSize: 22 }}>Data not available for this time period.</strong>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BoxOfficeResultsTableView;
