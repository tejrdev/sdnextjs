type TopTitle = {
   permalink: string | '';
   title: string;
   link: string;
   distributor: string;
   total: string;
   distributor_link: string | '';
   rating: string | '';
   weekend_gross: number | null;
   weekly_gross: number | null;
};


type QuarterlyData = {
   dates: string,
   filmweeks: string,
   quarterly_total: number,
   yearly_gross_change: number,
   releases: number,
   top_titles: TopTitle[]
}

export interface Boxofficetiletype {
   data: [{
      "title": string;
      "permalink": string;
      "rank": number;
      "distributor_name": string;
      "distributor_link": string;
      "rating": string;
      "weekly_total": number;
      "weekend_total": number;
      "week": number;
      "weekend_gross": number;
      "weekend_gross_order": number;
      "weekend_gross_change": any;
      "weekly_gross": number;
      "weekly_gross_order": string;
      "weekly_gross_change": any;
      "locations": string;
      "weeked_locations": string;
      "weeked_locations_change": number;
      "weekly_locations": string;
      "weekly_locations_change": number;
      "per_theater_avg": number;
      "per_theater_avg_weekly": number;

      "dates": string;
      "yearly_dates": string;
      "filmWeek": number;
      "yearly_filmWeek": string;
      "year": number;
      "release_date": string;
      "total_to_date": number;
      "total_in_quarter": number;
      "total_in_year": number;
      "yearly_gross_change": number;
      "yearly_total": number;
      "releases": number;
      "top_movies": TopTitle[];
      "quarterly_data": QuarterlyData[];

      "year_date": string;
      "total_week": string;
      "ly": number;
      "movies_total": number;
      "total": number;
      "quarter": any[];
   }],
   "tableon"?: boolean;
   "toggleon"?: boolean,
   "OnSortByChange"?: Function,
   "currentLayout"?: string,
   "selectedYear"?: number,
   "selectedQuarter"?: string,
}


