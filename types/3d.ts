// 3D movies page type definitions

export interface SEOData {
    title?: string;
    description?: string;
    keywords?: string;
    [key: string]: any;
}

export interface Movie {
    id: string | number;
    title: string;
    [key: string]: any;
}

export interface ThreeDData {
    movies: Movie[];
    tops_movies_more_info?: string;
    [key: string]: any;
}

export interface ThreeDProps {
    SEOdata: SEOData;
    ThreeDData: ThreeDData;
}
