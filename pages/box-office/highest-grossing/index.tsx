import HighestGrossingMoviesComponent from '@/components/Boxoffice/HighestGrossiing';


export async function getStaticProps() {
    const BoxOffice = await fetch(process.env.NEXT_PUBLIC_SD_API + '/movie-boxoffice/top-movie-list.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
    const BoxOfficeResultData = await BoxOffice.json();

    return {
        props: { BoxOfficeResultData },
        revalidate: 10,
    };
}

interface HighestGrossingMoviesProps {
    // Add your props here
    BoxOfficeResultData: any;
}

const HighestGrossingMovies: React.FC<HighestGrossingMoviesProps> = ({ BoxOfficeResultData }) => {
    return (
        <HighestGrossingMoviesComponent BoxOfficeResultData={BoxOfficeResultData} />
    );
};


export default HighestGrossingMovies;