/**
 * Represents social media information for a talent
 */
interface TalentSocialMedia {
   link: string;
   name: string;
   class: string;
}

/**
 * Represents a talent/celebrity with their basic information
 */
export interface Talent {
   name: string;
   dates: string;
   link: string;
   title: string;
   img: string;
   telent_have: string;
   birthdate?: string;
   birthplace?: string;
   content: string;
   talent_social_media?: TalentSocialMedia[];
   movie_link: string;
   movie_name: string;
}

/**
 * Represents a group of trending talents
 */
interface TrendingTalent {
   title: string;
   talents: Talent[];
}

/**
 * Represents the complete talent data structure
 */
export interface TalentData {
   popular_talent: Talent[];
   trending_talent: TrendingTalent;
   brithday_talent: {
      title: string;
      talents: Talent[];
   };
   talent_list: Talent[];
}

/**
 * Represents paginated talent list data
 */
interface TalentListData {
   max_page: number;
   total_talent: number;
   talent: Talent[];
}

/**
 * Represents SEO data for talent pages
 */
interface TalentSEOData {
   children?: unknown[] | undefined;
   tag?: unknown[] | undefined;
}

/**
 * Props interface for talent components
 */
export interface Props {
   SEOdata: TalentSEOData;
   Talent_Data: TalentData;
   error?: any;
}