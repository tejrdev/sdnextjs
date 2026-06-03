import React, { useMemo, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { BoxOfficeResultTableProps } from '../../../../types/boxofficeresults';

const BoxOfficeResultTable: React.FC<BoxOfficeResultTableProps> = ({ data = [], toggleon = false, tableConfig = [], OnSortByChange, currentLayout, sortarrow = '', asds = '', selectedYear = 0 }) => {
  // Store toggleon in state to ensure it's properly tracked
  const [isToggleOn, setIsToggleOn] = useState(toggleon);

  // Update state when prop changes
  useEffect(() => {
    setIsToggleOn(toggleon);
  }, [toggleon]);

  // Memoized cell content renderer
  const renderCellContent = useCallback(
    (item, column) => {
      if (!item || !column) return '-';

      switch (column.key) {
        case 'title':
          return (
            <h2 className='movtable_title mb-0 leading-relaxed text-left'>
              <Link href={item.permalink ? item.permalink : '#'} title={item.title} >
                <strong>{item.title}</strong>
              </Link>
            </h2>
          );

        case 'distributor_name':
          return (
            <Link href={item.distributor_link ? item.distributor_link : '#'} className='text-left block'>
              <strong>{item.distributor_name}</strong>
            </Link>
          );
        case 'rating':
          return <span>{item?.rating ? item.rating : '-'}</span>;
        case 'weekly_gross_order':
        case 'weekend_gross_order':
        case 'weekly_total':
        case 'weekend_total':
        case 'per_theater_avg':
        case 'weekly_locations':
        case 'weeked_locations':
        case 'total_quarter':
        case 'total_year':
        case 'total':
        case 'total_to_date':
        case 'weekly_gross':
        case 'weekend_gross': {
          const value = column.roundoffReqd ? Math.round(item[column.key]) : typeof item[column.key] === 'string' ? parseFloat(item[column.key].replace(/,/g, '')) : parseFloat(item[column.key]);

          return value ? `${column.isCurrency ? '$' : ''}${value.toLocaleString()}` : '-';
        }

        case 'weekly_gross_change':
        case 'weekend_gross_change':
        case 'weekly_locations_change':
        case 'weeked_locations_change':
        case 'LW':
        case 'LW_weekend':
        case 'LW_weekly':
        case 'LY_weekend':
        case 'LY_weekly':
        case 'ly':
        case 'LY': {
          const changeValue = typeof item[column.key] === 'string' ? parseFloat(item[column.key].replace(/,/g, '')) : parseFloat(item[column.key]);

          return <span className={changeValue < 0 ? 'redtxt' : ''}>{changeValue ? (column.pctField ? `${changeValue.toFixed(1)}%` : changeValue.toLocaleString()) : '-'}</span>;
        }
        case 'top_movies': case 'top_movies_weekend':
          return (
            <h5 className='movtable_title mb-0 leading-relaxed text-left'>
              {item[column.key]?.slice(0, 3)?.map((movie: any, i: number) => {
                return (
                  <Link
                    href={movie.link ? movie.link : movie.permalink ? movie.permalink : '#'}
                    title={`${movie.title} | Rating: ${movie?.rating} | Distributor: ${movie?.distributor ? movie?.distributor : movie?.distributor_name}`}
                    className='block'
                    key={i}>
                    <strong className='mr-3 overflow-hidden text-black block hover:text-blue'>
                      {i + 1}- {movie.title} ($
                      {currentLayout === 'AY' ? parseInt(movie.total)?.toLocaleString() : isToggleOn ? parseInt(movie.weekly_gross)?.toLocaleString() : parseInt(movie.weekend_gross)?.toLocaleString()}
                      )
                    </strong>
                  </Link>
                );
              })}
            </h5>
          );

        case 'year':
          return (
            <Link href={`/box-office/totals/${item.year}`} >
              <b>{item.year}</b>
            </Link>
          );

        case 'rating_year':
          return (
            <Link href={`/box-office/highest-grossing/${item.year ? item.year : new Date().getFullYear()}/${item.rating ? item.rating : 'all'}`}>
              <b>{item.year}</b>
            </Link>
          );
        case 'dates':
        case 'dates_weekend':
          return (
            <Link href={`/box-office/results/${selectedYear}/W${item.film_week}?tab=${toggleon ? 'weekly' : 'weekend'}`}>
              <b>{item[column.key]}</b>
            </Link>
          );
        case 'G_total':
          return (
            <Link href={`/box-office/highest-grossing/${item.year ? item.year : new Date().getFullYear()}/g`} className='underline text-black hover:text-blue'>
              <span>
                {item.G_total ? '$' + item.G_total.toLocaleString() : '-'} <br />
                {item.G_total_per !== '0%' ? item.G_total_per : ''}
              </span>
            </Link>
          );
        case 'PG_total':
          return (
            <Link href={`/box-office/highest-grossing/${item.year ? item.year : new Date().getFullYear()}/pg`} className='underline text-black hover:text-blue'>
              <span>
                {item.PG_total ? '$' + item.PG_total.toLocaleString() : '-'} <br />
                {item.PG_total_per !== '0%' ? item.PG_total_per : ''}
              </span>
            </Link>
          );
        case 'PG_13_total':
          return (
            <Link href={`/box-office/highest-grossing/${item.year ? item.year : new Date().getFullYear()}/pg-13`} className='underline text-black hover:text-blue'>
              <span>
                {item.PG_13_total ? '$' + item.PG_13_total.toLocaleString() : '-'} <br />
                {item.PG_13_total_per !== '0%' ? item.PG_13_total_per : ''}
              </span>
            </Link>
          );
        case 'R_total':
          return (
            <Link href={`/box-office/highest-grossing/${item.year ? item.year : new Date().getFullYear()}/r`} className='underline text-black hover:text-blue'>
              <span>
                {item.R_total ? '$' + item.R_total.toLocaleString() : '-'} <br />
                {item.R_total_per !== '0%' ? item.R_total_per : ''}
              </span>
            </Link>
          );
        case 'other_total':
          return (
            // <Link href={`/box-office-results/highest-grossing-movies/mpaa-ratings/Other/${item.year ? item.year : new Date().getFullYear()}/`} className='underline text-black hover:text-blue'>
            <span>
              {item.other_total ? '$' + item.other_total.toLocaleString() : '-'} <br />
              {item.other_total_per !== '0%' ? item.other_total_per : ''}
            </span>
            // </Link>
          );
        case 'yearly_total':
          return (
            <span>
              {item.yearly_total ? '$' + item.yearly_total.toLocaleString() : '-'} <br />
              {item.total_per !== '0%' ? item.total_per : ''}
            </span>
          );
        case 'release_year':
          return <span>{new Date(item.release_date).getFullYear()}</span>;
        case 'rankCol':
          return <span>{item.rank}</span>;
        default:
          return item[column.key] || '-';
      }
    },
    [isToggleOn, currentLayout]
  );

  // Memoized sort handler
  const handleSort = useCallback(
    (key: string) => {
      OnSortByChange?.(key);
    },
    [OnSortByChange]
  );

  // Memoized table header
  const TableHeader = useMemo(
    () => (
      <thead>
        <tr>
          {tableConfig.map((column, index) => {
            if (column.key === 'total_year' && selectedYear === 0) {
              return null;
            }
            return (
              <th
                key={`${column.key}-${index}`}
                data-title={column.title}
                className={`${column.sortable ? 'cursor-pointer' : ''} text-center ${column.max_width || ''}`}
                onClick={() => column.sortable && handleSort(column.key)}>
                {column.title_link ? <Link href={column.title_link} className='underline text-black hover:text-blue'>{column.title}</Link> : column.title}
                {column.sortable && (
                  <>
                    <span className={`${sortarrow.includes(column.key) ? 'up ' + asds : 'up'}`} />
                    <span className='' />
                  </>
                )}
              </th>
            )
          })}
        </tr>
      </thead>
    ),
    [tableConfig, sortarrow, asds, handleSort]
  );

  // Memoized empty state
  const EmptyState = useMemo(
    () => (
      <tr className='text-center'>
        <td colSpan={tableConfig.length}>
          <strong style={{ fontSize: 22 }}>Data not available for this time period.</strong>
        </td>
      </tr>
    ),
    [tableConfig.length]
  );

  // Render table rows and check if we have any rows to display
  const { tableRows, hasRows } = useMemo(() => {
    const rows = data
      .map((item, index) => {
        const shouldRender = currentLayout === 'SW' ? (isToggleOn ? item.weekly_gross && parseInt(item.weekly_gross_order) >= 1 : item.weekend_gross_order && parseInt(item.weekend_gross_order) >= 1) : true;

        if (shouldRender) {
          return (
            <tr key={`row-${index}`} id={`bx${index + 1}`} className={`box-office-res-row ${index % 2 === 0 ? 'even' : 'odd'}`} role='row'>
              {tableConfig.map((column, colIndex) => {
                if (column.key === 'total_year' && selectedYear === 0) {
                  return null;
                }
                return (
                  <td key={`cell-${index}-${colIndex}`} data-title={column.title} className={column.className} suppressHydrationWarning>
                    {renderCellContent(item, column)}
                  </td>
                )
              })}
            </tr>
          );
        }
        return null;
      })
      .filter(Boolean);

    return {
      tableRows: rows,
      hasRows: rows && rows.length > 0
    };
  }, [data, currentLayout, isToggleOn, tableConfig, renderCellContent, selectedYear]);

  return (
    <div className={`Weekendbox filter_tabsinfo ${isToggleOn ? 'sturelease_grid' : 'sturelease_table'}`} data-title={isToggleOn ? 'Weekly' : 'Weekend'}>
      <div className='resultyear_table tablebox mb-10' id={isToggleOn ? 'Weekly_box_html' : 'Weekendbox_data'}>
        <div className='datatable_wrap'>
          <table className='responsive dataTable box-office-res-tbl' id={isToggleOn ? 'box-office-res-weekly-tbl' : 'box-office-res-weekend-tbl'}>
            {TableHeader}
            <tbody>
              {hasRows ? tableRows : EmptyState}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Memoize the entire component
export default React.memo(BoxOfficeResultTable);
