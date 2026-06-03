// Blog page shared type definitions

export interface SEOChildNode {
    tag?: string;
    name?: string;
    html?: string;
    content?: string;
    [key: string]: any;
}

export interface SEOData {
    tag?: any[];
    children?: Array<{ children?: SEOChildNode[] } & Record<string, any>>;
    [key: string]: any;
}

export interface TopMovieItem {
    title_new?: string;
    link?: string;
    img?: string;
    release_year?: string | number;
    director_name?: string;
    [key: string]: any;
}

export interface ArticleDetailData {
    error?: string;
    title?: string;
    is_spolight?: 'yes' | 'no' | string;
    top_movies?: TopMovieItem[];
    top_content?: string;
    recomoded?: any;
    [key: string]: any;
}

export interface PageProps {
    SEOdata: SEOData;
    ArticleDetailData: ArticleDetailData;
    error?: string;
    post_id: string;
    news_category: string;
    blog_category: string;
}
