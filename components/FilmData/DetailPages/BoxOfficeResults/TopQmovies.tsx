import Link from 'next/link';
import sdplaceholder2 from '../../../../public/images/sdplaceholder2.jpg';
import { Genre, Movielisttype } from '../../../../types/movies';

const TopQmovies = ({ data, selectedYear, selectedQuarter, selectedLayout }) => {
  return (
    <section>
      {data.length > 0 ? (
        <>
          {selectedLayout !== 'ATP' && (
            <h3 className='mb-5 pb-3 sm:pb-5 border-b border-solid border-gray-300 sm:pr-40'>
              {/* Top {data.length} Movies - {selectedLayout === 'SQT' ? selectedQuarter + ' - ' : ''} {selectedYear} */}
            </h3>
          )}

          <div className='flex flex-wrap gap-y-5 mb-8'>
            {data.map((item, index: number) => (
              <Movielist key={index} data={item} index={index} requestFrom='TopQmovies' quarter={selectedQuarter} totalyear={selectedYear} selectedLayout={selectedLayout} isAllYears={selectedYear === 0} />
            ))}
          </div>
        </>
      ) : (
        <div className='card border border-solid border-gray-400 rounded-md p-2 text-center font-bold text-2xl mb-5'>Data not available for this time period!</div>
      )}
    </section>
  );
};

export default TopQmovies;

export const Movielist = ({ data, index = -1, title, requestFrom = '', quarter, totalyear, selectedLayout = '', isAllYears = false }: Movielisttype) => {
  const imgSrc = requestFrom === 'TopQmovies' ? data?.poster_url : data?.img;

  return (
    <div className='topmovies card pr-3 inline-flex flex-wrap xsm:flex-nowrap relative w-full lg:w-1/2'>
      {index > -1 && <div className='cardnum absolute left-0 top-0 font-bold text-2xl text-right w-11'>{selectedLayout === 'ATP' ? data.rank : index + 1}</div>}
      <div className='cardimg w-[150px]'>
        <Link href={data.link ? data.link : data.permalink ? data.permalink : '#'} className='rounded-md block border border-gray-300 '>
          <img
            src={
              data.img === null || data.img === '' || data.img === process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-content/themes/screendollars-live/assets/images/noimgico.jpg'
                ? sdplaceholder2.src
                : imgSrc
            }
            alt={data.title}
            className='rounded-md '
          />
        </Link>
      </div>
      <div className='cardinfo xsm:pl-4 w-full xsm:w-3/4 pt-3 xsm:pt-0 max-w-96'>
        <h4 className='mb-0'>
          <Link href={data.link ? data.link : data.permalink ? data.permalink : '#'}>{data.title} ({data.release_date ? new Date(data.release_date).getFullYear() : ''})</Link>
        </h4>
        {requestFrom === 'TopQmovies' && (
          <p className='mb-1'>
            <Link href={data.distributor_link || '#'}>{data.distributor_name}</Link>
          </p>
        )}
        <ul className='ratinginfo_tags mb-1 ml-0 text-sm'>
          {data.rating && (
            <li>
              <span>{data?.rating}</span>
            </li>
          )}
          {data?.runtime && <li>{data.runtime}</li>}
          {data?.genre && (
            <li className='w-[calc(100%-141px)] truncate' title={data?.genre}>
              {data?.genre}
            </li>
          )}
          {data?.primary_genre && data?.primary_genre.length > 0 && (
            <li>
              <ul className='ml-0 mt-2'>
                {data?.primary_genre?.map((item, i) => (
                  <li key={i} className='text-[13px] inline-block align-top mr-2 mb-2'>
                    <Link href={item.value} className='cursor-pointer hover:no-underline px-3 rounded-3xl text-black capitalize border border-gray-400 py-[2px] hover:bg-gray-100'>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>
        {/* {data?.distributor_name && <p className='mb-1'>{data?.distributor_name}</p>} */}
        {requestFrom === 'TopQmovies' ? (
          <p className='mb-2 text-[13px]'>
            {data?.pattern ? data?.pattern : ''}
            {data?.Locations ? ' (' + data.Locations + ' Locations)' : ''}
          </p>
        ) : title ? (
          <>
            {/* <p className='mb-1'>{title}</p> */}
            <p className='mb-2  text-sm'>
              {data?.release_date + (data?.pattern ? ' | ' + data?.pattern : '')}
              {data?.Locations ? ' (' + data.Locations + ' Locations)' : ''}
            </p>
          </>
        ) : (
          <p className='mb-1'>{data?.release}</p>
        )}

        <p className='line-clamp-3  text-[13px] mb-3'>{data?.synopsis}</p>
        <p className='text-[13px]'>
          {selectedLayout === 'SQT' && data?.total_year && (
            <strong>
              {quarter}: ${data?.total_quarter} |{' '}
            </strong>
          )}
          {data?.total_to_date && <strong className='inline-block'>Total To-Date: ${data?.total_to_date} </strong>}
          {selectedLayout === 'SYT' && data?.total_year && !isAllYears && <strong> | Total In Year: ${data?.total_year}  </strong>}
        </p>
      </div>
    </div>
  );
};
