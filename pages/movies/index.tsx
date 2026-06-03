import UpcomingMovies from '@/components/Movies/UpcomingMovies'
import Editorial from '@/components/Movies/Editorial'
import Trendings from '@/components/Movies/Trendings'
import Reviews from '@/components/Movies/Reviews';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';
import HeadComponent from '@/components/HeadComponent';
import NewsletterSubscriber from '@/components/shared/NewsletterSubscriber';
import MoviesGenre from '@/components/Movies/MoviesGenre';

interface FilmDataProps {
    SEOdata?: any;
    MoviesData?: any;
}
export const getStaticProps = async () => {
    const fetchConfigs = [
        {
            url: `${process.env.NEXT_PUBLIC_SEO_LINK}movies`,
            key: 'SEOdata',
            defaultData: {},
        },
        {
            url: `${process.env.NEXT_PUBLIC_SD_API}/movies_listing/sd-movie-list.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
            key: 'MoviesData',
            defaultData: {},
        }
    ];

    return await getStaticPropsWithErrorHandling(fetchConfigs);
};

const Movies = ({ SEOdata, MoviesData }: FilmDataProps) => {
    return (
        <>
            <HeadComponent data={SEOdata} />
            <div className='moviesPage'>
                <UpcomingMovies week_start_date={MoviesData?.week_start_date} movies={MoviesData?.week_movies} currentWeek={parseInt(MoviesData?.week)} />
                {/* <div className='trandingsechere bg-stone-900 py-8 md:py-12 lg:py-14 text-white border-t border-zinc-800'>
                <div className='container'>
                    <h2>Trending Movies section here</h2>
                </div>
            </div> */}
                <Trendings data={MoviesData?.trending_movies} />
                <Reviews data={MoviesData?.movie_review} bgin />
                <MoviesGenre data={MoviesData?.genre_list} />
                <Editorial data={MoviesData?.moive_article} />
                <NewsletterSubscriber />
            </div>
        </>
    )
}

export default Movies;