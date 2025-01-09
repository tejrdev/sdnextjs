import Link from 'next/link';
import sdplaceholder2 from '../../../../public/sdplaceholder2.jpg';

export const moviesampledata = {
  'id': 1,
  'title': 'Deadpool & Wolverine',
  'rating': 'PG-13',
  'link': '#',
  'img': 'https://picsum.photos/150/224',
  'runtime': '2h 7m',
  'genre': 'Action, Comedy, Sci-Fi',
  'primary_genre': [
    { name: 'Fantasy', value: '/movie-genres/fantasy' },
    { name: 'Musical', value: '/movie-genres/musical' },
    { name: 'Romance', value: '/movie-genres/romance' },
  ],
  'distributor_name': 'Walt Disney Studios Motion Pictures',
  'release': 'Wide (4,000 Locations)',
  'synopsis': 'Wolverine is recovering from his injuries when he crosses paths with the loudmouth Deadpool. They team up to defeat a common enemy.',
};

interface genre {
  'name': string;
  'value': string;
}
interface Movielisttype {
  'data': {
    'id': number;
    'title': string;
    'link': string;
    'img': string;
    'rating': string;
    'runtime': string;
    'genre': string;
    'primary_genre': genre[];
    'distributor_name': string;
    'release'?: string;
    'synopsis': string;
    'pattern'?: string;
    'Locations'?: string;
    'release_date'?: string;
  };
  'index': number;
  'title'?: string;
}

const TopQmovies = () => {
  return (
    <section>
      <h3 className='mb-5 pb-3 sm:pb-5 border-b border-solid border-gray-300 sm:pr-40 sm:-mt-14'>Top 20 Movies - {'Q1'} - 2024</h3>
      <div className='flex flex-wrap gap-y-5 mb-8'>
        {Array.from({ length: 6 }).map((_, i) => (
          <Movielist key={i} data={moviesampledata} index={i} />
        ))}
      </div>
    </section>
  );
};

export default TopQmovies;

export const Movielist = ({ data, index, title }: Movielisttype) => {
  return (
    <div className='topmovies card pr-3 inline-flex flex-wrap xsm:flex-nowrap relative w-full lg:w-1/2'>
      {index > -1 && <div className='cardnum absolute left-0 top-0 font-bold text-2xl'>{index + 1}</div>}
      <div className='cardimg w-[150px]'>
        <Link href={data.link}>
          <img src={(data.img === null || data.img === "" || data.img === 'https://live.screendollars.com/wp-content/themes/screendollars-live/assets/images/noimgico.jpg') ? sdplaceholder2.src : data.img} alt='' />
        </Link>
      </div>
      <div className='cardinfo xsm:pl-4 w-full xsm:w-3/4 pt-3 xsm:pt-0 max-w-96'>
        <h4 className='mb-1'>
          <Link href={data.link}>{data.title}</Link>
        </h4>
        <ul className='ratinginfo_tags mb-1 ml-0'>
          {data.rating && (
            <li>
              <span>{data?.rating}</span>
            </li>
          )}
          {data?.runtime && <li>{data.runtime}</li>}
          {/* {data?.genre && <li>{data.genre}</li>} */}
          {data?.primary_genre && data?.primary_genre.length > 0 && (
            <li>
              <ul className='ml-0 mt-2'>
                {data?.primary_genre?.map((item, i) => (
                  <li key={i} className='text-sm inline-block align-top mr-2 mb-2'>
                    <Link href={item.value} className='cursor-pointer hover:no-underline px-3 rounded-3xl text-black capitalize border border-gray-400 pb-[2px] hover:bg-gray-100'>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>
        {/* {data?.distributor_name && <p className='mb-1'>{data?.distributor_name}</p>} */}
        {title ? (
          <>
            {/* <p className='mb-1'>{title}</p> */}
            <p className='mb-1'>
              {data?.release_date + (data?.pattern ? ' | ' + data?.pattern : '')}
              {data?.Locations ? ' (' + data.Locations + ' Locations)' : ''}
            </p>
          </>
        ) : (
          <p className='mb-1'>{data?.release}</p>
        )}

        <p className='line-clamp-3'>{data?.synopsis}</p>
      </div>
    </div>
  );
};
