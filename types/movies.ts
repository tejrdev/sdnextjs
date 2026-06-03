/**
 * Represents a news item related to a film
 */
interface FilmNews {
   link: string;
   title: string;
   title_full: string;
   img: string;
   icon_img: string;
   source: string;
   date: string;
}

/**
 * Represents a cast member in a film
 */
interface FilmCast {
   link: string;
   img: string;
   name: string;
   talent_name: string;
}

/**
 * Represents a video related to a film
 */
interface FilmVideo {
   link: string;
   title?: string;
   img?: string;
}

/**
 * Represents an image related to a film
 */
interface FilmImage {
   link: string;
   img: string;
   title?: string;
}

/**
 * Represents a filter option for movie images
 */
interface MovieImageFilter {
   id?: string;
   name?: string;
}

/**
 * Represents domestic box office details
 */
interface DomesticDetails {
   week: string;
   weekly_gross: string;
   weekend_gross: number;
   locations: number;
   locations_2: string;
   weekly_gross_temp: string;
   weekend_gross_temp: string;
   weekend_gross_change: string;
   weekly_gross_change: string;
   locations_change: string;
   locations_2_change: string;
   average: string;
   average_2: string;
   to_date: string;
}

/**
 * Represents new domestic box office details
 */
interface DomesticDetailsNew {
   count: string;
   weekend_gross: string;
   weekly_gross: string;
   weeked_locations: string;
   weekly_locations: number;
   weekly_gross_temp: string;
   weekend_gross_temp: string;
   weekend_gross_change: string;
   weekly_gross_change: string;
   weeked_locations_change: string;
   weekly_locations_change: string;
   weeked_locations_adv: string;
   weekly_locations_adv: string;
   weekly_todate: string;
   weeked_todate: string;
}

/**
 * Represents box office data for a re-release
 */
interface ReReleaseBoxOffice {
   release_date: string;
   release_name: string;
   distributor: string;
   domestic_gross: string;
   worldwide_gross: string;
   international_gross: string;
   domestic_details: DomesticDetails[];
   domestic_details_new: DomesticDetailsNew[];
}

/**
 * Represents a comparable film
 */
interface ComparableFilm {
   title?: string;
   id?: string;
}

/**
 * Represents advance ticket column data
 */
interface AdvanceTicketColumn {
   name?: string;
   data?: unknown;
}

/**
 * Represents box office film data
 */
interface BoxOfficeFilmsData {
   table_total: string;
}

/**
 * Represents forecast data
 */
interface Forecast {
   chart_class: string;
}

/**
 * Represents box office film end of year data
 */
interface BoxOfficeFilmEndLY {
   count: string;
   weekend_gross: string;
   weekend_gross_change: string;
   weeked_locations: string;
   weeked_locations_change: string;
   weeked_locations_adv: string;
   weeked_todate: string;
   weekly_gross: string;
   weekly_gross_change: string;
   weekly_locations: string;
   weekly_locations_change: string;
   weekly_locations_adv: string;
   weekly_todate: string;
}

/**
 * Represents chart data
 */
interface ChartData {
   title: string;
   w_end: string;
   w_ly: string;
   tot_ly: string;
}

/**
 * Represents dialer data
 */
interface DialerData {
   dialername: string;
   dailerinfo: string;
   topticketPersent: number;
   dailercolor: string;
}

/**
 * Represents chart series data
 */
interface ChartSeries {
   series: unknown[];
   xaxis?: unknown[];
}

/**
 * Represents awareness, interest, or film force data
 */
interface MetricData {
   dailer: DialerData;
   linerchart: ChartSeries;
}

/**
 * Represents detailed information about a film
 */
type filmsdetail_data = {
   primary_genre: Genre[];
   title: string;
   edit_link: string;
   film_titles: Number;
   id: string;
   favorite: boolean;
   error: string;
   content: string;
   release_date_year: string;
   news: FilmNews[];
   additional_key_dates: string;
   landscape_image: string;
   trailer_link: string;
   watch_now: string;
   poster_img: string;
   dis_title_link: string;
   dis_title: string;
   imdbrating_img: string;
   imdbrating: string;
   rotten_critics_score_img: string;
   rotten_critics_score: string;
   rotten_audience_score_img: string;
   rotten_audience_score: string;
   rating: string;
   runtime: string;
   genre: string;
   public_movie_website: string;
   public_movie_img: string;
   distributor_movie_page: string;
   facebook: string;
   instagram: string;
   twitter: string;
   wikipedia: string;
   format: string;
   soundmix: string;
   aspect_ratio: string;
   comments: string;
   film_country: string;
   film_language: string;
   film_page_view: null;
   synopsis: string;
   plot_summary: string;
   story_line: string;
   top_cast: FilmCast[];
   film_video: FilmVideo[];
   movie_images: FilmImage[];
   movie_images_filter: MovieImageFilter[];
   production_budget: string;
   boxoffice_domestic: string;
   boxoffice_international: string;
   worldwide_total_collection: string;
   re_release_boxoffice: ReReleaseBoxOffice[];
   box_office_show: string;
   total_is_estimate_notes: null;
   comparable_films: ComparableFilm[];
   advanceticket_cols: AdvanceTicketColumn[];
   movie_frist_week_collection: string;
   boxoffice_films_data: BoxOfficeFilmsData;
   forcast_show: string;
   forcast: Forecast;
   boxoffice_films_end_ly: BoxOfficeFilmEndLY[];
   release_date_note: string;
   release_date: string;
   release_date_count_down: string;
   release_date_info: string;
   chart: ChartData[];
   awreness: MetricData;
   intrest: MetricData;
   FILMFORCE: MetricData;
   advanceticket: {
      dailer: DialerData;
      linerchart: ChartSeries;
   };
   similar_movies: SimilarMovie[];
   fun_facts: FunFact[];
   movie_faqs: MovieFaq[];
   movie_review: MovieReview[];
};

interface FunFact {
   facts: string;
}

interface MovieFaq {
   question: string;
   answer: string;
}

interface MovieReview {
   title: string;
   img_url: string;
   article_content: string;
   link: string;
}

interface SimilarMovie {
   title: string;
   link: string;
   img_url: string;
   runtime: string;
   genre: string;
   rating: string;
}

/**
 * Represents SEO data for a movie
 */
interface MovieSEOData {
   children?: unknown[] | undefined;
   tag: unknown[] | undefined;
}

/**
 * Props interface for movie components
 */
export interface MovieProps {
   SEOdata: MovieSEOData;
   FilmDetailsData: filmsdetail_data;
   film_id: string;
   error?: any;
}

/**
 * Interface for movie search result item
 */
export interface MovieSearchItem {
   id: string;
   title: string;
   link: string;
   img?: string;
   year?: string;
   genre?: string;
   distributor?: string;
   distributor_link?: string;
   release_year?: string;
   release_date?: string;
   rating?: string;
   dist_pattern?: string;
   box_office_total?: string;
}

/**
 * Interface for distributor search result item
 */
export interface DistributorSearchItem {
   id: string;
   title: string;
}

/**
 * Interface for distributor search response
 */
export interface DistributorSearchResponse {
   search_list: DistributorSearchItem[];
}

/**
 * Interface for movie search response
 */
export interface MovieSearchResponse {
   movies: MovieSearchItem[];
}

/**
 * Interface for movie list item
 */
export interface MovieListItem {
   title: string;
   distributor: string;
   distributor_link: string;
   release_year: string;
   release_date: string;
   rating: string;
   dist_pattern: string;
   box_office_total: string;
   link: string;
}

/**
 * Interface for movies A-Z API response
 */
export interface MoviesAZResponse {
   movies: MovieListItem[];
   max_page: number;
   title?: string;
   content?: string;
   total_movies?: number;
}

/**
 * Interface for movies A-Z page props
 */
export interface MoviesAZProps {
   data: any; // SEO data
   FilmsData: MoviesAZResponse;
   alphabet?: string;
}

/**
 * Interface for FilmFilter component props
 */
export interface FilmFilterProps {
   data: string[];
   tag: string;
   setSelectedValue: (value: string, tag: string) => void;
   currentValue: string;
   cls?: string;
   mobsize?: boolean;
   disabled?: boolean;
}

/**
 * Represents a genre with name and value
 */
export interface Genre {
   is_primary: boolean;
   name: string;
   value: string;
}

/**
 * Represents movie list data structure
 */
export interface Movielisttype {
   data: {
      id: number;
      title: string;
      link: string;
      permalink: string;
      img: string;
      poster_url: string;
      rating: string;
      runtime: string;
      genre: string;
      primary_genre: Genre[];
      distributor_name: string;
      release?: string;
      synopsis: string;
      pattern?: string;
      Locations?: string;
      release_date?: string;
      distributor_link?: string;
      total_quarter?: string;
      total_year?: string;
      total_to_date?: string;
      rank?: number;
   };
   quarter?: string;
   totalyear?: string;
   index?: number;
   title?: string;
   requestFrom?: string;
   selectedLayout?: string;
   isAllYears?: boolean;
}