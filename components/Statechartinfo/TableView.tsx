import { useState } from 'react';
import Link from 'next/link';
const TableView = ({ requestFrom, DisplayBy = '', tabledata, tableConfig, requestSort, sortarrow, asds, selectedYear = '' }) => {
  const [ShowAll, setShowAll] = useState(false);
  const [viewbtn, setViewbtn] = useState(true);

  const ChangeSortBy = (key: string) => {
    requestSort(key);
  };

  const renderCellContent = (item, config) => {
    switch (config.key) {
      case 'title':
        const href = DisplayBy === 'states' ? `/directory/theatres/?state=${item.url}` : `${item.url}`;
        return <Link href={href}>{item.title}</Link>;
      case 'box_office':
        return `$${item.box_office.toLocaleString()}`;
      case 'market':
        return `${item.market}%`;
      case 'headquaters':
        if (DisplayBy === 'exhibitors') return item.headquaters;
        else if (DisplayBy === 'states')
          return (
            <div className='top_exhibitors'>
              {item.top_exhi?.slice(0, 3).map((exhibitor, id) => (
                <Link key={id} href={exhibitor.url}>
                  {id === 0 ? ' ' : ', '}
                  {exhibitor.title}
                </Link>
              ))}
            </div>
          );

      default:
        return item[config.key];
    }
  };

  return (
    <div className='tablecontent'>
      <div className='datatable_wrap'>
        <table className='w-full responsive dataTable tableshort statedisttable'>
          <thead>
            <tr>
              {tableConfig.map((item, index) => (
                <th
                  data-title={item.title}
                  className={`${item.sortable ? 'cursor-pointer' : ''} text-center ${item.max_width}`}
                  onClick={() => {
                    item.sortable && ChangeSortBy(item.key);
                  }}
                  key={index}>
                  {item.title}
                  {item.sortable && (
                    <>
                      <span className={`${sortarrow.includes(item.key) ? 'up ' + asds : 'up'}`}></span>
                      <span className=''></span>
                    </>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(ShowAll ? tabledata : tabledata?.slice(0, 20))?.map((item, index) => (
              <tr className='border-b border-gray-400 text-center' key={index}>
                {tableConfig.map((config, cellIndex) => (
                  <td
                    key={cellIndex}
                    data-title={config.title}
                    className={`${config.key === 'title' ? 'text-left' : 'text-center'}`}
                    {...(config.key === 'box_office' && { suppressHydrationWarning: true })}>
                    {renderCellContent(item, config)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tabledata.length > 16 && (
        <div className={`text-center my-5 ${!viewbtn ? 'sticky bottom-0 bg-white py-2 bg-opacity-85 border-t border-gray-200' : ''}`}>
          <button
            className='btn'
            onClick={() => {
              setShowAll(!ShowAll);
              setViewbtn(!viewbtn);
            }}>
            {viewbtn ? 'View All' : 'Show Less'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TableView;
