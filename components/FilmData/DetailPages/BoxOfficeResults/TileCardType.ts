type TopTitle = {
  permalink: string;
  title: string;
};

export interface TileCard {
  title?: string;
  permalink?: string;
  dates?: string;
  dates_weekend?: string;
  rating?: string;
  distributor_name?: string;
  distributor_link?: string;
  filmWeek?: number;
  weekly_gross?: number;
  weekend_gross?: number;
  weekly_gross_change?: number;
  weekend_gross_change?: number;
  yearly_gross_change?: number;
  weekly_total?: number;
  weekend_total?: number;
  top_movies: TopTitle[];
  top_movies_weekend?: TopTitle[];
  week?: number;
  film_week?: number
  filmweeks?: string;
  quarterly_total?: number;
  releases?: number;
  LW?: number;
  LY?: number;
  ly?: number;
  LW_weekly?: number;
  LW_weekend?: number;
  LY_weekly?: number;
  LY_weekend?: number;
  total?: number;
  total_to_date?: number;
  year?: number;
  data?: any;
  G_total_per?: number;
  G_total?: number;
  PG_total_per?: number;
  PG_total?: number;
  PG_13_total_per?: number;
  PG_13_total?: number;
  R_total_per?: number;
  R_total?: number;
  other_total_per?: number;
  other_total?: number;
  G?: string;
  PG?: string;
  PG_13?: string;
  R?: string;
  other?: string;
  total_per?: number;
  yearly_total?: number;
  release_date?: string;
  rank?: number;
};

export interface BoxOfficeTile {
  currentLayout: string;
  item: TileCard;
  toggleon: boolean;
  index: number;
  isOpen?: boolean
};
