import PieChart from '@/components/All/PieChart';
import { BoxOfficeRatingChartProps, ChartDataItem } from '@/types/boxofficeresults';

const BoxOfficeRatingChart: React.FC<BoxOfficeRatingChartProps> = ({ data }) => {

    let chartfeedlabel: string[] = ['G', 'PG', 'PG-13', 'R', 'Other'];
    const chartdata: any = [];
    data.forEach((item: any) => {
        chartdata.push({
            labels: chartfeedlabel,
            year: item?.year,
            series: [item?.G_total ?? 0, item?.PG_total ?? 0, item?.PG_13_total ?? 0, item?.R_total ?? 0, item?.other_total ?? 0],
        });
    });
    // console.log(chartdata);
    return (
        <div className='chart-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 py-4 md:py-6 border-t border-gray-200'>
            {chartdata.map((item: ChartDataItem) => (
                <div key={item.year} className='flex flex-col items-center justify-center bg-white rounded-lg shadow-sm border border-gray-200 pt-4 hover:shadow-md hover:bg-gray-50 transition-shadow duration-300'>
                    <PieChart data={item} />
                </div>
            ))}
        </div>
    );
};

export default BoxOfficeRatingChart;