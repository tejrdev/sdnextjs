const BoxOfficeResult = ({ data, toggleon }) => {
  const tdStyle = {
    border: '1px solid rgb(197, 197, 197)',
    borderCollapse: 'collapse',
    padding: '6px',
  };

  let cntr = 0;
  return (
    <div className={'Weekendbox filter_tabsinfo ' + (toggleon ? 'sturelease_grid' : 'sturelease_table')} data-title={toggleon ? 'Weekly' : 'Weekend'}>
      <div className='result_table tablebox' id={toggleon ? 'Weekly_box_html' : 'Weekendbox_data'}>
        <div className='datatable_wrap'>
          <table className='responsive dataTable box-office-res-tbl' id={toggleon ? 'box-office-res-weekly-tbl' : 'box-office-res-weekend-tbl'}>
            <thead>
              <tr>
                <th data-title='Rank'>Rank</th>
                <th data-title='Title'>Title</th>
                <th data-title='Distributor'>Distributor</th>
                <th data-title='Week'>Week</th>
                <th data-title='Rating'>Rating</th>
                <th data-title='#'>#</th>
                <th data-title='+-LW'>+-LW</th>
                <th data-title={toggleon ? 'Weekly' : 'Weekend $'}> {toggleon ? 'Weekly ' : 'Weekend '}$</th>
                <th data-title='+-LW' className='w-20'>
                  +-LW
                </th>
                <th data-title=' Per Theatre $'> Per Theatre $</th>
                <th data-title='Total $ To-Date'>Total $ To-Date</th>
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                data.map((item, index) => {
                  if (toggleon ? parseInt(item.weekly_gross_order) >= 1 : parseInt(item.weekend_gross_order) >= 1) {
                    cntr++;
                    return (
                      <tr id={index + 1} className={'box-office-res-row ' + (index % 2 === 0 ? 'even' : 'odd')} role='row' key={index}>
                        <td data-title='Rank' style={{ tdStyle }}>
                          {cntr}
                        </td>
                        <td data-title='Title' style={{ tdStyle }}>
                          <h2 className='movtable_title mb-0 leading-relaxed'>
                            <a href={item.permalink}>
                              <strong>{item.title}</strong>
                            </a>
                          </h2>
                        </td>
                        <td data-title='Distributor' style={{ tdStyle }}>
                          <a href={item.distributor_link}>
                            <strong>{item.distributor_name}</strong>
                          </a>
                        </td>
                        <td data-title='Week' style={{ tdStyle }}>
                          {item.week}
                        </td>
                        <td data-title='Rating' style={{ tdStyle }}>
                          {item.rating}
                        </td>
                        <td data-title={(toggleon ? 'weekly ' : 'Weekend ') + 'Locations #'} style={{ tdStyle }} suppressHydrationWarning>
                          {toggleon ? item.weekly_locations && item.weekly_locations.toLocaleString() : item.weeked_locations && item.weeked_locations.toLocaleString()}
                        </td>
                        <td
                          data-title={(toggleon ? 'weekly ' : 'Weekend ') + 'Locations +-LW'}
                          style={{ tdStyle }}
                          className={toggleon ? (item.weekly_locations_change < 0 ? 'redtxt' : '') : item.weeked_locations_change < 0 ? 'redtxt' : ''}
                          suppressHydrationWarning>
                          {toggleon ? (item.weekly_locations_change === 0 ? '-' : item.weekly_locations_change) : item.weeked_locations_change === 0 ? '-' : item.weeked_locations_change}
                        </td>
                        <td data-title={toggleon ? 'weekly $' : 'Weekend $'} style={{ tdStyle }} suppressHydrationWarning>
                          ${toggleon ? item.weekly_gross && item.weekly_gross.toLocaleString() : item.weekend_gross && item.weekend_gross.toLocaleString()}
                        </td>
                        <td
                          data-title='+-LW'
                          style={{ tdStyle }}
                          className={toggleon ? (item.weekly_gross_change < 0 ? 'redtxt' : '') : item.weekend_gross_change < 0 ? 'redtxt' : ''}
                          suppressHydrationWarning>
                          {toggleon ? item.weekly_gross_change && parseFloat(item.weekly_gross_change).toFixed(1) : item.weekend_gross_change && parseFloat(item.weekend_gross_change).toFixed(1)} %
                        </td>
                        <td data-title='Per theatre Average $' style={{ tdStyle }} suppressHydrationWarning>
                          $
                          {toggleon
                            ? item.per_theater_avg_weekly && Math.round(item.per_theater_avg_weekly).toLocaleString()
                            : item.per_theater_avg && Math.round(item.per_theater_avg).toLocaleString()}
                        </td>
                        <td data-title='Total $' style={{ tdStyle }} suppressHydrationWarning>
                          ${toggleon ? item.weekly_total && item.weekly_total.toLocaleString() : item.weekend_total && item.weekend_total.toLocaleString()}
                        </td>
                      </tr>
                    );
                  }
                })
              ) : (
                <tr className='text-center'>
                  <td colspan='11'>
                    <strong style={{ fontSize: 22 }}>Data not available for this time period.</strong>
                  </td>
                </tr>
              )}
              {data.length > 0 && cntr === 0 && (
                <tr className='text-center'>
                  <td colspan='11'>
                    <strong style={{ fontSize: 22 }}>Data not available for this time period.</strong>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BoxOfficeResult;
