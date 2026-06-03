export const BoxOfficeResultTableConfig = (currentLayout: string, toggleon: boolean) => {
  return currentLayout === 'SW'
    ? [//selected week
      { title: 'Rank', sortable: true, max_width: 'min-w-20', key: 'rank' },
      { title: 'Title', sortable: true, max_width: 'min-w-40', key: 'title' },
      { title: 'Rating', sortable: true, max_width: 'min-w-16', key: 'rating' },
      { title: 'Distributor', sortable: true, max_width: '', key: 'distributor_name' },
      { title: toggleon ? 'Total Weekly' : 'Total Weekend', sortable: true, max_width: 'w-26', key: toggleon ? 'weekly_gross_order' : 'weekend_gross_order', isCurrency: true },
      { title: '+-LW', sortable: false, max_width: 'max-w-14', key: toggleon ? 'weekly_gross_change' : 'weekend_gross_change', pctField: true },
      { title: 'Locations', sortable: true, max_width: 'min-w-30', key: toggleon ? 'weekly_locations' : 'weeked_locations' },
      { title: '+-LW', sortable: false, max_width: 'max-w-14', key: toggleon ? 'weekly_locations_change' : 'weeked_locations_change' },
      { title: 'Avg. Per Location', sortable: true, max_width: 'max-w-20', key: 'per_theater_avg', isCurrency: true, roundoffReqd: true },
      { title: 'Total To-Date', sortable: true, max_width: 'max-w-24', key: toggleon ? 'weekly_total' : 'weekend_total', isCurrency: true },
      { title: 'Weeks', sortable: true, max_width: 'min-w-22', key: 'week' },
    ]
    : currentLayout === 'SY' ? [//selected year
      { title: 'dates', sortable: false, max_width: 'min-w-40', key: toggleon ? 'dates' : 'dates_weekend' },
      { title: 'Film Week', sortable: true, max_width: 'min-w-30', key: 'film_week' },
      { title: toggleon ? 'Total Weekly' : 'Total Weekend', sortable: true, max_width: 'w-26', key: toggleon ? 'weekly_gross' : 'weekend_gross', isCurrency: true },
      { title: '+-LW', sortable: false, max_width: 'max-w-14', key: 'LW', pctField: true },
      { title: '+-LY', sortable: false, max_width: 'max-w-14', key: 'LY', pctField: true },
      { title: 'Top Movies', sortable: false, max_width: 'max-w-64', key: 'top_movies' },
    ] : currentLayout === 'AY' ? [//all year
      { title: 'Year', sortable: true, max_width: 'w-24', key: 'year' },
      { title: 'Dates', sortable: false, max_width: 'min-w-40', key: 'year_date' },
      { title: 'Film Weeks', sortable: false, max_width: 'min-w-30', key: 'total_week' },
      { title: 'Total', sortable: false, max_width: 'w-24', key: 'total', isCurrency: true },
      { title: '+-LY', sortable: false, max_width: 'min-w-30', key: 'ly', pctField: true },
      { title: 'Releases', sortable: true, max_width: 'max-w-24', key: 'movies_total' },
      { title: 'Top Titles', sortable: false, max_width: 'min-w-30', key: 'top_movies' },
    ] : [//top movies quarterly/yearly
      { title: 'Rank', sortable: true, max_width: 'min-w-20', key: 'rank' },
      { title: 'Title', sortable: true, max_width: 'min-w-40', key: 'title' },
      { title: 'Distributor', sortable: true, max_width: 'min-w-30', key: 'distributor_name' },
      { title: 'Release Date', sortable: true, max_width: 'w-40', key: 'release_date' },
      { title: currentLayout === 'SQT' ? 'Total in Quarter' : 'Total in Year', sortable: true, max_width: 'w-24', key: currentLayout === 'SQT' ? 'total_quarter' : 'total_year', isCurrency: true },
      { title: 'Locations', sortable: true, max_width: 'min-w-30', key: 'locations' },
      { title: 'Total To-Date', sortable: true, max_width: 'max-w-24', key: 'total_to_date', isCurrency: true },
    ];
} 
