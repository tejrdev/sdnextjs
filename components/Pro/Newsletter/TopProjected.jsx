import HomePageAds from '@/components/Homepage/HomePageAds';
import Link from 'next/link';

const TopProjected = ({ item }) => {
  return (
    <div className='top-projected-wrap'>
      <div className='top-projected--listing-block'>
        <h2>PROJECTED TOP 3</h2>
        <ul>
          {item.top_3_projected_movies.map((movie, i) => {
            return (
              <li key={i}>
                <Posterearnings info={movie} />
                {/* <Link href={movie.link} title=''>
                  <figure className='pvr'>
                    <img className='objimg' src={movie.img} alt='' />
                  </figure>
                  <p>
                    {movie.title}
                    <data>{movie.box_office}</data>
                  </p>
                </Link> */}
              </li>
            );
          })}
        </ul>
      </div>
      <HomePageAds cls='stnavadd' format='horizontal' />
    </div>
  );
};

export default TopProjected;

export const Posterearnings = ({ info = {} }) => {
  return (
    <div className='filmearingininfo'>
      <Link href={info.link} title=''>
        <figure className='pvr'>
          <img className='objimg' src={info.img} alt='' />
        </figure>
        <h4>
          {info.title}
          <data>{info.box_office ? info.box_office : info.total}</data>
        </h4>
      </Link>
    </div>
  );
};
