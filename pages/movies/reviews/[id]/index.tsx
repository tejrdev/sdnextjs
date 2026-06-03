import Page404 from '@/components/Page404';
import ArticleBanner from '@/components/News/DetailPages/ArticleDetail/ArticleBanner';
import DetailSection from '@/components/News/DetailPages/ArticleDetail/DetailSection';
import Recommanded from '@/components/News/DetailPages/ArticleDetail/Recommanded';
import CategoryNavigation from '@/components/FilmData/DetailPages/CategoryNavigation';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';
import { ErrorDisplay } from '@/components/ErrorBoundary';
import HeadComponent from '@/components/HeadComponent';


export async function getStaticPaths() {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking', //indicates the type of fallback
    };
}


export async function getStaticProps(context) {
    const { params } = context;
    const post_id = params.id;

    const defaultData = {
        Movie_review_data: {
            data: [],
            error: '',
        },
    };

    const fetchConfigs = [
        {
            url: `${process.env.NEXT_PUBLIC_SEO_LINK}movies/reviews/${post_id}`,
            key: 'data',
            defaultData: { children: [] },
        },
        {
            url: `${process.env.NEXT_PUBLIC_SD_API}/movie-review/movie-review-detail.php?url=${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/reviews/${post_id}&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
            key: 'Movie_review_data',
            defaultData: defaultData.Movie_review_data,
        },
    ];
    const config = await getStaticPropsWithErrorHandling(fetchConfigs);
    return config;
}

const MovieReview = ({ data, Movie_review_data, error }) => {
    if (error) {
        return <ErrorDisplay error={error} />;
    }

    // Generate JSON-LD schema
    const generateJsonLd = () => {

        return {
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
                "@type": "Movie",
                "name": Movie_review_data.movies_title,
                "url": Movie_review_data.movie_url,
                "image": Movie_review_data.poster_img,
                "datePublished": Movie_review_data.release_date,
                "director": Movie_review_data.director,
                "genre": Movie_review_data.genre,
                "actor": Movie_review_data.actor,
            },
            "author": {
                "@type": "Organization",
                "name": "Screendollars",
                "url": "https://screendollars.com"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Screendollars",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://api.screendollars.com/wp-content/uploads/2022/06/SD-LOGO-1.png"
                }
            },
            "datePublished": Movie_review_data.published_date,
            "reviewBody": Movie_review_data.review_content,
            "name": Movie_review_data.movies_title,
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": Movie_review_data.internal_movie_rating,
                "bestRating": "5",
                "worstRating": "1"
            }
        };
    };

    return (
        <>
            <HeadComponent data={data} jsonSchema={generateJsonLd()} />
            {Movie_review_data.error ? (
                <Page404 />
            ) : (
                <>
                    {/* <CategoryNavigation /> */}
                    <ArticleBanner data={Movie_review_data} />
                    <DetailSection data={Movie_review_data} category="Movie Reviews" />
                    {Movie_review_data.recomoded.posts && <Recommanded recomoded={Movie_review_data.recomoded} />}
                </>
            )}
        </>
    );
};

export default MovieReview;
