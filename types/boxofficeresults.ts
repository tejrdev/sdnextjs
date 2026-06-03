export type TopTitle = {
  title: string;
  link: string;
  distributor: string;
  distributor_link: string | '';
  total: string;
  rating: string;
  weekend_gross: number | null;
  weekly_gross: number | null;
};

export type AllYearSummery = {
  data: [
    {
      year: number;
      year_date: string;
      total_week: string;
      ly: number;
      movies_total: number;
      total: number;
      quarter: any[];
      top_movies: TopTitle[];
    }
  ];
};

export interface TableColumn {
  key: string;
  title: string;
  sortable?: boolean;
  className?: string;
  max_width?: string;
  roundoffReqd?: boolean;
  isCurrency?: boolean;
  pctField?: boolean;
  title_link?: string;
}

export interface BoxOfficeResultTableProps {
  data: Array<any>;
  toggleon?: boolean;
  tableConfig: TableColumn[];
  OnSortByChange?: (key: string) => void;
  currentLayout?: string;
  sortarrow?: string;
  asds?: string;
  selectedYear?: number;
}

export interface RatingDataItem {
  G: string;
  G_movies: number;
  G_total: number;
  G_total_per: string;
  PG: string;
  PG_movies: number;
  PG_total: number;
  PG_total_per: string;
  PG_13: string;
  PG_13_movies: number;
  PG_13_total: number;
  PG_13_total_per: string;
  R: string;
  R_movies: number;
  R_total: number;
  R_total_per: string;
  other: string;
  other_movies: number;
  other_total: number;
  other_total_per: string;
  total_per: string;
  year: number;
  yearly_total: number;
}

export interface ChartDataItem {
  labels: string[];
  year: number;
  series: number[];
}

export interface BoxOfficeRatingChartProps {
  data: RatingDataItem[];
}

export interface PieChartData {
  labels: string[];
  year: number;
  series: number[];
}

export interface PieChartProps {
  data: PieChartData;
}