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
  };
}

export async function getStaticProps(context: Context) {
  const { params } = context;
  let year = params.year;
  let rating = params.rating;
  let API_Year = year;
  let API_Rating = rating;
  if (year.toLowerCase() === 'all-years') {
    API_Year = '';
  }
  if (rating.toLowerCase() === 'all-ratings') {
    API_Rating = '';
  } else {
    API_Rating = API_Rating.replace('-rated', '');
  }

  const BoxOffice = await fetch(process.env.NEXT_PUBLIC_SD_API + '/movie-boxoffice/top-movie-list.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&a_year=' + API_Year + '&a_rating=' + API_Rating);
  const BoxOfficeResultData = await BoxOffice.json();

  return {
    props: { BoxOfficeResultData, year, rating },
    revalidate: 10,
  };
}


interface HighestGrossingMoviesByRatingProps {
  // Add your props here
  BoxOfficeResultData: any;
  year: string;
  rating: string;
}

const HighestGrossingMoviesByRating: React.FC<HighestGrossingMoviesByRatingProps> = ({ BoxOfficeResultData, year, rating }) => {
  return (
    <HighestGrossingMoviesComponent BoxOfficeResultData={BoxOfficeResultData} year={year} rating={rating} />
  );
};


export default HighestGrossingMoviesByRating;