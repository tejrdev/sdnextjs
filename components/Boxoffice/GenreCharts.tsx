import React from 'react';
import PieChart from '@/components/All/PieChart';

interface ProcessedYearData {
    year: number;
    genres: Array<{
        name: string;
        total: number;
        per_count: string;
    }>;
    labels: string[];
    series: number[];
}

interface GenreChartsProps {
    data: ProcessedYearData[];
}

const GenreCharts: React.FC<GenreChartsProps> = ({ data }) => {
    return (
        <div className='chart-container grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 py-4 md:py-6 border-t border-gray-200'>
            {data.map((yearData) => (
                <div
                    key={yearData.year}
                    className='flex flex-col items-center justify-center bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md hover:bg-gray-50 transition-shadow duration-300'
                >
                    <PieChart
                        data={{
                            year: yearData.year,
                            labels: yearData.labels,
                            series: yearData.series,
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default GenreCharts;