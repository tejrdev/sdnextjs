/**
 * Represents SEO data for directory pages
 */
interface DirectorySEOData {
   children?: any[] | undefined;
}

/**
 * Represents distributor data
 */
type distributors_data = {
   distributors_list: any[];
   distributors_list_total_page_number: number;
   parent_link: string;
   parent_title: string;
   page_link: string;
   page_title: string;
   filter_options: string;
};

/**
 * Props interface for distributor components
 */
export interface DistributorProps {
   SEOdata: DirectorySEOData;
   distributorsData: distributors_data;
}

/**
 * Represents exhibitor data
 */
type exhibitors_data = {
   exhibitor_list: any[];
   total_page_number: number;
   parent_link: string;
   parent_title: string;
   page_link: string;
   page_title: string;
   filter_options: string;
};

/**
 * Props interface for exhibitor components
 */
export interface ExbProps {
   SEOdata: DirectorySEOData;
   exhibitorsData: exhibitors_data;
}

/**
 * Represents film festival data
 */
type filmfestival_data = {
   film_fastival_list: any[];
   total_page_number: number;
   parent_link: string;
   parent_title: string;
   page_link: string;
   page_title: string;
   filter_options: string;
};

/**
 * Props interface for film festival components
 */
export interface FilmfProps {
   SEOdata: DirectorySEOData;
   filmfestivalsData: filmfestival_data;
}

/**
 * Represents theatre data
 */
type theatres_data = {
   theator_list: any[];
   total_page_number: number;
   parent_link: string;
   parent_title: string;
   page_link: string;
   page_title: string;
   filter_options: string;
   associated_list: any;
   amenities_list: any;
};

/**
 * Props interface for theatre components
 */
export interface TheatreProps {
   SEOdata: DirectorySEOData;
   theatresData: theatres_data;
}

/**
 * Represents vendor data
 */
type vendors_data = {
   vendor_list: any[];
   total_page_number: number;
   parent_link: string;
   parent_title: string;
   page_link: string;
   page_title: string;
   filter_options: string;
   new_filter_options: string;
};

/**
 * Props interface for vendor components
 */
export interface VandorProps {
   SEOdata: DirectorySEOData;
   vendorsData: vendors_data;
}

export interface DirectoryData {
  directory_count: any;
  search_data: any;
  distributors: any;
  exhibitors: any;
  vendor: any;
  film_festival: any;
  recent_post: any;
  recent_view: {
    data: any;
  };
  featured_list: any;
  faqs: any;
}