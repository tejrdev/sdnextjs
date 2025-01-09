const NewsletterTitleBlock = ({ Pro_data }) => {
  return (
    <div className='newsletter--title-block'>
      {Pro_data.change_last_year_data && (
        <div className='weekend-changing-block'>
          <span className={Pro_data.change_last_year_data?.color + 'txt weekend-changing--digit pvr'}>
            {Pro_data.change_last_year_data?.percentage}%{/* prettier-ignore */}
            <i className={'fas ' + (Pro_data.change_last_year_data?.color === 'green' ? 'fa-sort-up' : (Pro_data.change_last_year_data?.color === 'red' ? 'fa-sort-down' : 'fa-minus'))}></i>
          </span>
          <h3>{Pro_data.change_last_year_data.title}</h3>
          <p>
            {Pro_data.change_last_year_data.projected_weeks_gross_title}: ${Pro_data.change_last_year_data.projected_weeks_gross}M (Projected) <br />
            {Pro_data.change_last_year_data.actual_weeks_gross_title}: ${Pro_data.change_last_year_data.actual_weeks_gross}M (Actual)
          </p>
        </div>
      )}
      <h2>{Pro_data.title}</h2>
    </div>
  );
};

export default NewsletterTitleBlock;
