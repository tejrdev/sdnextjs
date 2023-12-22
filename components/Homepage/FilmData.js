import React from 'react';
import Link from 'next/link';

export const convertToInternationalCurrencySystem = (labelValue) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(1) + 'B'
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(1) + 'M'
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(1) + 'K'
    : Math.abs(Number(labelValue));
};
function FilmData({ data, tag }) {
  return (
    <>
      {data.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {index < 5 ? (
              <li key={index}>
                {' '}
                <p className="df fww just-between">
                  {tag === 'latest' || tag === 'home_latest' ? (
                    <>
                      <Link href={item.permalink.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} title={item.title}>
                        <span>{index + 1 + ' - ' + item.title + (tag === 'home_latest' ? ' (' + item.distributor_name + ')' : '')}</span>{' '}
                      </Link>
                      <span>{'$' + convertToInternationalCurrencySystem(item.weekend_gross)}</span>
                    </>
                  ) : (
                    <Link href={item.link} title={item.title}>
                      <span>{item.release_date + item.title + (tag === 'upcomming' ? ' (' + item.distributor_name + ')' : '')}</span>
                    </Link>
                  )}
                </p>
              </li>
            ) : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

export default FilmData;
