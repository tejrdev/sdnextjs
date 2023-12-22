import Link from 'next/link';

const WeekendChanges = ({ item, index }) => {
  return (
    <div className='weekend-changing-listing-block'>
      <div className='weekend-date'>
        <h3>
          <Link href={item.year_week_link}>
            {item.year} WEEK {item.week}
          </Link>
          {item.startdate} - {item.enddate}
        </h3>
      </div>
      <div className='weekend-changing-listing--right'>
        <div className='weekend-changing-block'>
          <span className={item.previous_year_data?.color + 'txt weekend-changing--digit pvr'}>
            {item.previous_year_data?.percentage}%{/* prettier-ignore */}
            <i class={'fas ' + (item.previous_year_data?.color === 'green' ? 'fa-sort-up' : (item.previous_year_data?.color === 'red' ? 'fa-sort-down' : 'fa-minus'))}></i>
          </span>
          <h3>{item.previous_year_data?.title}</h3>
          <p>
            {item.previous_year_data?.projected_title}: ${item.previous_year_data?.projected_weeks_gross}M (Projected) <br />
            {item.previous_year_data?.actual_weeks_gross_title}: ${item.previous_year_data?.actual_weeks_gross}M ({index === 0 ? 'Actual' : 'Projected'})
          </p>
        </div>
        <div className='weekend-changing-block'>
          <span className={item.last_year_data?.color + 'txt weekend-changing--digit pvr'}>
            {item.last_year_data?.percentage}%{/* prettier-ignore */}
            <i class={'fas ' + (item.last_year_data?.color === 'green' ? 'fa-sort-up' : (item.last_year_data?.color === 'red' ? 'fa-sort-down' : 'fa-minus'))}></i>
          </span>
          <h3>{item.last_year_data?.title}</h3>
          <p>
            {item.last_year_data?.projected_weeks_gross_title}: ${item.last_year_data?.projected_weeks_gross}M (Projected) <br />
            {/* {item.last_year_data?.actual_weeks_gross_title}: ${item.last_year_data?.actual_weeks_gross}M ({index === 0 ? 'Actual' : 'Projected'}) */}
            {item.last_year_data?.actual_weeks_gross_title}: ${item.last_year_data?.actual_weeks_gross}M (Actual)
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeekendChanges;
