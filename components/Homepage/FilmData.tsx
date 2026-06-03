import React from 'react';
import Link from 'next/link';

export const convertToInternationalCurrencySystem = (labelValue: string | number): string | number => {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
        ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(3) + 'B'
        : // Six Zeroes for Millions
        Math.abs(Number(labelValue)) >= 1.0e6
            ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(1) + 'M'
            : // Three Zeroes for Thousands
            Math.abs(Number(labelValue)) >= 1.0e3
                ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(1) + 'K'
                : Math.abs(Number(labelValue));
};

interface FilmDataItem {
    permalink?: string;
    title: string;
    distributor_name?: string;
    weekend_gross?: string | number;
    link?: string;
    release_date?: string;
}

interface FilmDataProps {
    data?: FilmDataItem[];
    tag: 'latest' | 'home_latest' | 'upcomming' | string;
}

function FilmData({ data, tag }: FilmDataProps) {
    return (
        <>
            {data?.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        {index < 5 ? (
                            <li key={index}>
                                {' '}
                                <p className="df fww just-between">
                                    {tag === 'latest' || tag === 'home_latest' ? (
                                        <>
                                            <Link href={item.permalink?.replace(process.env.NEXT_PUBLIC_BACKEND_URL || '', '') || ''} title={item.title} className='blacktxt'>
                                                <span>{index + 1 + ' - ' + item.title + (tag === 'home_latest' ? ' (' + item.distributor_name + ')' : '')}</span>{' '}
                                            </Link>
                                            <span>{'$' + convertToInternationalCurrencySystem(item.weekend_gross || 0)}</span>
                                        </>
                                    ) : (
                                        <Link href={item.link || ''} title={item.title} className='blacktxt'>
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

