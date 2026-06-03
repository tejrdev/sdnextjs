import HighestGrossingMoviesComponent from '@/components/Boxoffice/HighestGrossiing';

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking',
    };
}

interface Context {
    params: {
        year: string;
        rating: string;
        genre: string;
    };
}

export async function getStaticProps(context: Context) {
    const { params } = context;
    const year = params.year;
    const rating = params.rating;
    const genre = params.genre;

    let API_Year = year;
    let API_Rating = rating;
    let API_Genre = genre;
    if (year.toLowerCase() === 'all-years') {
        API_Year = '';
    }
    if (rating.toLowerCase() === 'all-ratings') {
        API_Rating = '';
    } else {
        API_Rating = API_Rating.replace('-rated', '');
    }
    if (genre.toLowerCase() === 'all-genres') {
        API_Genre = '';
    } else {
        API_Genre = API_Genre.replace('-genre', '');
    }
    const BoxOffice = await fetch(process.env.NEXT_PUBLIC_SD_API + '/movie-boxoffice/top-movie-list.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&a_year=' + API_Year + '&a_rating=' + API_Rating + '&a_genre=' + API_Genre);
    const BoxOfficeResultData = await BoxOffice.json();
    return {
        props: { BoxOfficeResultData, year, rating, genre },
        revalidate: 10,
    };
}


interface HighestGrossingMoviesByGenreProps {
    // Add your props here
    BoxOfficeResultData: any;
    year: string;
    rating: string;
    genre: string;
}

const HighestGrossingMoviesByGenre: React.FC<HighestGrossingMoviesByGenreProps> = ({ BoxOfficeResultData, year, rating, genre }) => {
    return (
        <HighestGrossingMoviesComponent BoxOfficeResultData={BoxOfficeResultData} year={year} rating={rating} genre={genre} />
    );
};


export default HighestGrossingMoviesByGenre;