import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { PieChartProps } from '@/types/boxofficeresults';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const PieChart: React.FC<PieChartProps> = ({ data }) => {

    const state = {
        series: data?.series || [],
        options: {
            labels: data?.labels || [],
            legend: {
                position: 'top',
                fontSize: '14px',
                fontWeight: 600,
                itemMargin: {
                    horizontal: 8,
                    vertical: 8,
                },
                horizontalAlign: 'center',
                offsetY: -10,
                markers: {
                    width: 12,
                    height: 12,
                    radius: 6,
                },
            },
            colors: ["#2E93fA", "#66DA26", "#ffcd56", "#E91E63", "#9c1ee9",
                "#999999", "#FF8A80", "#80D8FF", "#A5D6A7", "#FFD180",
                "#FFAB91", "#B39DDB", "#81C784", "#F48FB1", "#90CAF9",
                "#CE93D8", "#FFE082", "#EF9A9A", "#4DB6AC", "#FFCC80",
                "#9FA8DA", "#FF7043", "#26C6DA", "#7E57C2", "#D4E157"],
            tooltip: {
                fillSeriesColor: false,
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {

                    return (
                        '<div class="arrow_box">' +
                        '<span class="serisename"><span class="colordot" style="' +
                        `background:${w.globals.colors[seriesIndex]}; display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:5px;` +
                        '"></span>' +
                        w.globals.labels[seriesIndex] +
                        '</span> :' +
                        '<span> $' +
                        (series[seriesIndex] ?? 0).toLocaleString('en-US') +
                        '</span>' +
                        '</div>'
                    );
                },
            },
            plotOptions: {
                pie: {
                    startAngle: 360,
                    endAngle: 0,
                },
            },

        },
    };
    return (
        <div className='chart-container w-full'>
            <h3 className='text-center text-xl md:text-2xl font-bold mb-4 text-gray-800'>{data?.year}</h3>
            <div className='w-full h-full'>
                <Chart options={state.options as ApexOptions} series={state.series} type='pie' width='100%' />
            </div>
        </div>
    )
}

export default PieChart