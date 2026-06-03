import Link from 'next/link';
import React from 'react';
import { BoxOfficeTile } from './TileCardType';

const BoxOfficeTileCard = ({ currentLayout, item, toggleon, index, isOpen = true }: BoxOfficeTile) => {
  const weekly_gross_change = item.weekly_gross_change ?? 0;
  const weekend_gross_change = item.weekend_gross_change ?? 0;
  const weekly_gross = item.weekly_gross ?? 0;
  const weekend_gross = item.weekend_gross ?? 0;
  const gross_amount = toggleon ? weekly_gross : weekend_gross;
  const weekly_total = item.weekly_total ?? 0;
  const weekend_total = item.weekend_total ?? 0;
  const total_amount = toggleon ? weekly_total : weekend_total;
  const dates = toggleon ? item.dates : item.dates_weekend;
  const top_movies = currentLayout === 'SY' ? toggleon ? item.top_movies : item.top_movies_weekend : item.top_movies;

  const gross_change = currentLayout === 'SY' ? toggleon ? item.LW_weekly ?? 0 : item.LW_weekend ?? 0 : toggleon ? weekly_gross_change : weekend_gross_change;
  const gross_change_class = gross_change < 0 ? 'redtxt' : gross_change > 0 ? 'text-green-500' : '';
  const yrly_gross_change = currentLayout === 'AY' ? item.ly ?? 0 : toggleon ? item.LY_weekly ?? 0 : item.LY_weekend ?? 0;
  const yrly_gross_change_class = yrly_gross_change < 0 ? 'redtxt' : yrly_gross_change > 0 ? 'text-green-500' : '';

  return (
    <div className={'card lg:max-w-80 ' + (isOpen ? 'border border-solid border-gray-400 rounded-md p-2' : '')} key={index}>
      {currentLayout === 'SW' || currentLayout === 'ATT' ? (
        <h4>
          <Link className='text-gold' href={item.permalink ? item.permalink : '#'}>
            {/* //movie title for selected week */}
            {currentLayout === 'ATT' ? `${item.rank} - ${item?.title}` : `${index + 1} - ${item?.title}`}
          </Link>
        </h4>
      ) : (
        <h4 className='text-gold'>
          {/* //Week dates for selected year */}
          {currentLayout === 'SY' && dates}
          {/* //quarter for All Years */}
          {currentLayout === 'AY' && 'Q' + (index + 1)}
          {currentLayout === 'RY' && `${item?.year}`}
        </h4>
      )}

      {currentLayout === 'SW' ||
        (currentLayout === 'ATT' && (
          <>
            <p className=''>
              <Link className='text-black' href={item.distributor_link ? item.distributor_link : '#'} title={item?.distributor_name}>
                {item?.distributor_name}
              </Link>
            </p>
            {currentLayout === 'ATT' && (
              <p>
                Release Year<strong>{item.release_date ? new Date(item.release_date).getFullYear() : '-'}</strong>
              </p>
            )}
            <p>
              Rating<strong>{item?.rating ? item?.rating : '-'}</strong>
            </p>
          </>
        ))}
      {currentLayout === 'AY' && (
        <p className=''>
          Dates<strong>{item?.dates}</strong>
        </p>
      )}
      {currentLayout !== 'ATT' && currentLayout !== 'RY' && (
        <p className=''>
          {currentLayout === 'SW' ? 'Week' : currentLayout === 'SY' ? 'Film Week' : 'Film Weeks'}
          <strong>{item.week ? item.week : item.film_week}</strong>
        </p>
      )}
      {currentLayout !== 'RY' && (
        <p className=''>
          Total {currentLayout !== 'AY' && currentLayout !== 'ATT' && (toggleon ? 'Weekly' : 'Weekend')}
          <strong>
            {currentLayout === 'AY'
              ? item.total && '$' + item.total.toLocaleString()
              : currentLayout === 'ATT'
                ? item.total_to_date && '$' + item.total_to_date.toLocaleString()
                : gross_amount === 0
                  ? '-'
                  : '$' + gross_amount.toLocaleString()}
          </strong>
        </p>
      )}
      {currentLayout !== 'AY' && currentLayout !== 'ATT' && currentLayout !== 'RY' && (
        <p className=''>
          ±LW
          {gross_change === 0 ? <strong> - </strong> : <strong className={gross_change_class}>{parseFloat(gross_change.toString())?.toFixed(1)} %</strong>}
        </p>
      )}
      {(currentLayout === 'SY' || currentLayout === 'AY') && (
        <p className=''>±LY{yrly_gross_change === 0 ? <strong> - </strong> : <strong className={yrly_gross_change_class}>{parseFloat(yrly_gross_change.toString())?.toFixed(1)} %</strong>}</p>
      )}
      {currentLayout === 'SW' && (
        <p className='border-b-0'>
          Total To-Date
          <strong>${total_amount.toLocaleString()}</strong>
        </p>
      )}
      {(currentLayout === 'SY' || currentLayout === 'AY') && (
        <p className='border-b-0'>
          <span className='block mb-1 w-full'>Top Titles </span>
          <h5 className='mb-0 leading-relaxed text-left'>
            {top_movies?.slice(0, 3)?.map((movie: any, i: number) => (
              <Link href={movie.permalink ? movie.permalink : movie.link ? movie.link : '#'} title={movie.title} className='block leading-relaxed' key={i}>
                <strong className='mr-3 max-w-64 overflow-ellipsis overflow-hidden whitespace-nowrap text-black block hover:text-blue'>
                  {i + 1}- {movie.title}
                </strong>
                {currentLayout === 'SY' && <span className='block mb-1'>($ {toggleon ? parseInt(movie.weekly_gross)?.toLocaleString() : parseInt(movie.weekend_gross).toLocaleString()})</span>}
              </Link>
            ))}
          </h5>
        </p>
      )}
      {currentLayout === 'RY' && (
        <>
          {item.G && (
            <p>
              {item.G}
              <strong className='text-right'>
                {item.G_total_per}
                <br />${item.G_total ? item.G_total.toLocaleString() : '-'}
              </strong>
            </p>
          )}
          {item.PG && (
            <p>
              {item.PG}
              <strong className='text-right'>
                {item.PG_total_per}
                <br />${item.PG_total ? item.PG_total.toLocaleString() : '-'}
              </strong>
            </p>
          )}
          {item.PG_13 && (
            <p>
              {item.PG_13}
              <strong className='text-right'>
                {item.PG_13_total_per}
                <br />${item.PG_13_total ? item.PG_13_total.toLocaleString() : '-'}
              </strong>
            </p>
          )}
          {item.R && (
            <p>
              {item.R}
              <strong className='text-right'>
                {item.R_total_per}
                <br />${item.R_total ? item.R_total.toLocaleString() : '-'}
              </strong>
            </p>
          )}
          {item.other && (
            <p>
              Other
              <strong className='text-right'>
                {item.other_total_per}
                <br />${item.other_total ? item.other_total.toLocaleString() : '-'}
              </strong>
            </p>
          )}
          {item.yearly_total && (
            <p>
              Total
              <strong className='text-right'>
                {item.total_per}<br />${item.yearly_total ? item.yearly_total.toLocaleString() : '-'}
              </strong>
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default BoxOfficeTileCard;
