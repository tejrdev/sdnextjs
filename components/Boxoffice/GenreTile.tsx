import React from 'react';

interface ProcessedGenreData {
    name: string;
    total: number;
    per_count: string;
}

interface ProcessedYearData {
    year: number;
    genres: ProcessedGenreData[];
    labels: string[];
    series: number[];
}

interface GenreTileProps {
    data: ProcessedYearData[];
}

const GenreTile: React.FC<GenreTileProps> = ({ data }) => {
    return (
        <div className='genre_tile grid gap-5 mb-10 grid-cols-[repeat(auto-fill,minmax(261px,1fr))]'>
            {data.map((yearData) => (
                <div
                    key={yearData.year}
                    className='card lg:max-w-80 border border-solid border-gray-400 rounded-md p-2 
                    [&>*]:flex [&>*]:m-0 [&>*]:py-2 [&>*]:justify-between [&>*]:flex-wrap divide-y divide-gray-300'
                >
                    <h4 className="text-gold text-lg font-semibold mb-2">{yearData.year}</h4>
                    {yearData.genres.map((genre, index) => (
                        genre.total > 0 && (
                            <p key={index} className="flex justify-between items-center">
                                <span className="text-gray-700">{genre.name}</span>
                                <strong className='text-right'>
                                    ${genre.total.toLocaleString()}
                                    <span className='block text-sm text-gray-600'>({genre.per_count})</span>
                                </strong>
                            </p>
                        )
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GenreTile;