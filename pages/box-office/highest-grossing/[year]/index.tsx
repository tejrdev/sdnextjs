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
    };
}

export async function getStaticProps(context: Context) {
    const { params } = context;
    const year = params.year;
    let API_Year = year;
    if (year.toLowerCase() === 'all-years') {
        API_Year = '';
    }
    const BoxOffice = await fetch(process.env.NEXT_PUBLIC_SD_API + '/movie-boxoffice/top-movie-list.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&a_year=' + API_Year);
    const BoxOfficeResultData = await BoxOffice.json();

    return {
        props: { BoxOfficeResultData, year },
        revalidate: 10,
    };
}


interface HighestGrossingMoviesByYearProps {
    // Add your props here
    BoxOfficeResultData: any;
    year: string;
}

const HighestGrossingMoviesByYear: React.FC<HighestGrossingMoviesByYearProps> = ({ BoxOfficeResultData, year }) => {
    return (
        <HighestGrossingMoviesComponent BoxOfficeResultData={BoxOfficeResultData} year={year} />
    );
};


export default HighestGrossingMoviesByYear;