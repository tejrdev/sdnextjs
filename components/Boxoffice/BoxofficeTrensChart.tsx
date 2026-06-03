import React, { useMemo, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { convertToInternationalCurrencySystem } from '../Homepage/FilmData'
import createFilmCalendar from '../../utils/filmCalendar'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const WEEKS_PER_QUARTER = 13

// Quarter to week range mapping
const quarterRanges: Record<number, { start: number; end: number }> = {
    1: { start: 0, end: 13 },   // W1-W13
    2: { start: 13, end: 26 },  // W14-W26
    3: { start: 26, end: 39 },  // W27-W39
    4: { start: 39, end: 52 }   // W40-W52
}

const BoxofficeTrensChart = ({ data, quarter, blinkerWeek, selectedYears }: { data: any; quarter: 1 | 2 | 3 | 4; blinkerWeek: number; selectedYears: number[] }) => {
    const { start, end } = quarterRanges[quarter]
    const [selectedWeek, setSelectedWeek] = useState(blinkerWeek);

    // Filter data based on selected years
    const filteredData = useMemo(() => {
        if (!data || !Array.isArray(data)) return data
        return data.filter((series: any) => selectedYears.includes(Number(series.name)))
    }, [data, selectedYears])

    // Calculate index of blinker week within the current quarter (0-based)
    const blinkerWeekIndex = blinkerWeek - start - 1
    const isBlinkerWeekInQuarter = blinkerWeekIndex >= 0 && blinkerWeekIndex < WEEKS_PER_QUARTER

    // Generate week labels for the selected quarter
    const chartCategories = useMemo(() =>
        Array.from({ length: WEEKS_PER_QUARTER }, (_, i) => `W${start + i + 1}`),
        [start])

    // Calculate cumulative sum from W1, then slice for the selected quarter
    const chartSeries = useMemo(() => {
        if (!filteredData || !Array.isArray(filteredData)) return filteredData
        return filteredData.map((series: any) => {
            const fullData = series.week_data || []
            // Calculate cumulative sum from W1 to end of selected quarter
            let runningTotal = 0
            const fullCumulativeData = fullData.slice(0, end).map((value: number) => {
                runningTotal += Math.round(value / 1000000) // convert to millions
                return runningTotal
            })
            // Slice only the quarter's portion of the cumulative data
            const quarterData = fullCumulativeData.slice(start, end)
            // Pad with null for remaining weeks (chart will skip these points, but tooltips work)
            const paddedData: (number | null)[] = [...quarterData]
            while (paddedData.length < WEEKS_PER_QUARTER) {
                paddedData.push(null)
            }
            return {
                ...series,
                data: paddedData
            }
        })
    }, [filteredData, start, end])
    // Calculate dynamic Y-axis max based on the data
    const yAxisMax = useMemo(() => {
        if (!chartSeries || !Array.isArray(chartSeries)) return 1500
        const allValues = chartSeries
            .flatMap((series: any) => series.data || [])
            .filter((val: number | null) => val !== null) as number[]
        const maxValue = Math.max(...allValues, 0)
        // Round up to nearest 500 for clean axis labels
        return Math.ceil(maxValue / 500) * 500 + 500
    }, [chartSeries])

    const yAxisMin = useMemo(() => {
        if (!chartSeries || !Array.isArray(chartSeries)) return 0
        const allValues = chartSeries
            .flatMap((series: any) => series.data || [])
            .filter((val: number | null) => val !== null) as number[]
        const minValue = Math.min(...allValues)
        return Math.floor(minValue / 500) * 500
    }, [chartSeries])
    // Build discrete markers - highlight blinker week with larger markers
    const discreteMarkers = useMemo(() => {
        const markers: { seriesIndex: number; dataPointIndex: number; size: number; className?: string }[] = []
        const seriesCount = chartSeries?.length || 0

        // Add end markers for each series
        for (let i = 0; i < seriesCount; i++) {
            markers.push({ seriesIndex: i, dataPointIndex: chartCategories.length - 1, size: i === seriesCount - 1 ? 7 : 6 })
        }

        // Add blinking marker for blinker week on the last series (current year)
        if (isBlinkerWeekInQuarter && seriesCount > 0) {
            markers.push(
                { seriesIndex: seriesCount - 1, dataPointIndex: blinkerWeekIndex, size: 8, className: 'apexcharts-marker-blinker' as any }
            )
        }
        return markers
    }, [chartCategories.length, chartSeries?.length, isBlinkerWeekInQuarter, blinkerWeekIndex])

    // Color configurations mapped to years (2017-2025) - high contrast palette
    const yearColorMap: Record<number, { chartColor: string; highlightColor: string; accentBg: string }> = {
        2017: { chartColor: '#8B4513', highlightColor: 'text-amber-700', accentBg: 'bg-amber-700' },       // Saddle Brown
        2018: { chartColor: '#DC143C', highlightColor: 'text-rose-500', accentBg: 'bg-rose-500' },         // Crimson
        2019: { chartColor: '#00CED1', highlightColor: 'text-cyan-400', accentBg: 'bg-cyan-400' },         // Dark Turquoise
        2020: { chartColor: '#FF1493', highlightColor: 'text-pink-500', accentBg: 'bg-pink-500' },         // Deep Pink
        2021: { chartColor: '#32CD32', highlightColor: 'text-lime-500', accentBg: 'bg-lime-500' },         // Lime Green
        2022: { chartColor: '#10B981', highlightColor: 'text-emerald-400', accentBg: 'bg-emerald-500' },         // Dodger Blue
        2023: { chartColor: '#FF4500', highlightColor: 'text-orange-500', accentBg: 'bg-orange-500' },     // Orange Red
        2024: { chartColor: '#9400D3', highlightColor: 'text-violet-600', accentBg: 'bg-violet-600' },     // Dark Violet
        2025: { chartColor: '#FFD700', highlightColor: 'text-yellow-400', accentBg: 'bg-yellow-400' },      // Gold
        2026: { chartColor: '#F97316', highlightColor: 'text-orange-500', accentBg: 'bg-orange-500' },      // Orange
        2027: { chartColor: '#8B4513', highlightColor: 'text-amber-700', accentBg: 'bg-amber-700' },       // Saddle Brown
        2028: { chartColor: '#DC143C', highlightColor: 'text-rose-500', accentBg: 'bg-rose-500' },         // Crimson
    }

    // Get colors for selected years in order
    const activeColors = useMemo(() => {
        if (!filteredData || filteredData.length === 0) return ['#F04646', '#8B3DFF', '#F6B800']
        return filteredData.map((series: any) => yearColorMap[Number(series.name)]?.chartColor || '#888888')
    }, [filteredData])

    // Style configurations for each series based on filtered data
    const styleConfig = useMemo(() => {
        if (!filteredData) return []
        return filteredData.map((series: any) => yearColorMap[Number(series.name)] || { highlightColor: 'text-gray-400', accentBg: 'bg-gray-500' })
    }, [filteredData])

    // Handle chart click to select week
    const handleChartClick = (event: any, chartContext: any, config: any) => {
        if (config.dataPointIndex !== undefined && config.dataPointIndex >= 0) {
            const clickedWeek = start + config.dataPointIndex + 1
            setSelectedWeek(clickedWeek)
        }
    }

    const chartOptions: ApexOptions = {
        chart: {
            type: 'line',
            toolbar: { show: false },
            zoom: { enabled: false },
            background: 'transparent',
            foreColor: '#fff',
            events: {
                dataPointSelection: handleChartClick,
                markerClick: handleChartClick
            }
        },
        stroke: {
            curve: 'straight',
            width: 3
        },
        dataLabels: {
            enabled: false
        },
        colors: activeColors,
        markers: {
            size: activeColors.map(() => 1),
            hover: { size: 6 },
            strokeColors: activeColors,
            colors: activeColors,
            discrete: discreteMarkers
        },
        grid: {
            strokeDashArray: 0,
            borderColor: '#7b7b7b',
            xaxis: { lines: { show: true } },
            yaxis: { lines: { show: true } },
            padding: { left: 10, right: 10 }
        },
        legend: {
            show: false
        },
        tooltip: {
            theme: 'dark',
            x: {
                formatter: (val, opts) => {
                    const weekLabel = chartCategories[opts.dataPointIndex]
                    return weekLabel ? `Week ${weekLabel.replace('W', '')}` : String(val)
                }
            },
            y: {
                formatter: (val) => {
                    if (val === null || val === undefined) return 'No data yet'
                    return val >= 1000 ? `$${(val / 1000).toFixed(3)}B` : `$${val.toFixed(1)}M`
                }
            }
        },
        xaxis: {
            categories: chartCategories,
            position: 'bottom',
            axisBorder: { color: 'rgba(255,255,255,0.25)' },
            axisTicks: { show: false },
            labels: {
                style: {
                    colors: chartCategories.map((_, i) => {
                        const weekNum = start + i + 1
                        return weekNum === selectedWeek ? '#F6B800' : '#f8f8f8'
                    }),
                    fontWeight: 600,
                    cssClass: 'cursor-pointer'
                }
            },
            tooltip: {
                enabled: true,
                formatter: (val, opts) => {
                    const weekLabel = chartCategories[(opts as any).dataPointIndex]
                    return weekLabel ? `${weekLabel.replace('Week', 'W')}` : String(val)
                }
            }
        },
        yaxis: {
            min: yAxisMin,
            max: yAxisMax,
            tickAmount: 7,
            labels: {
                style: { colors: '#f8f8f8' },
                formatter: (value) => '$' + (value >= 1000 ? `${(value / 1000).toFixed(1)}B` : `${value.toFixed(0)}M`)
            }
        },
        responsive: [
            {
                breakpoint: 640,
                options: {
                    chart: { height: 460 },
                    yaxis: {
                        labels: {
                            formatter: (value) => '$' + (value >= 1000 ? `${(value / 1000).toFixed(1)}B` : `${value.toFixed(0)}M`)
                        }
                    }
                }
            }
        ]
    }

    //get week dates from week number
    const getWeekDates = (weekNumber: number, year: number) => {
        const filmCalendar = createFilmCalendar(year)
        const weeks = filmCalendar.getAllWeeks();
        //check if week exists
        if (!weeks.find((week) => week.weekNumber === weekNumber)) {
            return {
                startDate: null,
                endDate: null,
                formattedRange: 'No data yet',
            };
        }
        const weekDates = weeks.find((week) => week.weekNumber === weekNumber);
        return {
            formattedRange: filmCalendar.formatDateRange(weekDates?.startDate, weekDates?.endDate),
        };
    }
    // Ref for chart container to attach xaxis click handlers
    const chartRef = useRef<HTMLDivElement>(null)

    // Add click handlers to X-axis labels
    useEffect(() => {
        const chartContainer = chartRef.current
        if (!chartContainer) return

        const handleXAxisClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            // Check if clicked on xaxis label
            if (target.classList.contains('apexcharts-xaxis-label') || target.closest('.apexcharts-xaxis-label')) {
                const labelElement = target.classList.contains('apexcharts-xaxis-label')
                    ? target
                    : target.closest('.apexcharts-xaxis-label')
                const text = labelElement?.textContent
                if (text && text.startsWith('W')) {
                    const weekNum = parseInt(text.replace('W', ''))
                    if (!isNaN(weekNum)) {
                        setSelectedWeek(weekNum)
                    }
                }
            }
        }

        chartContainer.addEventListener('click', handleXAxisClick)
        return () => chartContainer.removeEventListener('click', handleXAxisClick)
    }, [selectedWeek, start])

    // Generate weekStats dynamically from filtered data (most recent year first)
    const weekStats = useMemo(() => {
        if (!filteredData || !Array.isArray(filteredData)) return []

        // Calculate quarter start week based on selected week
        const getQuarterStart = (week: number) => {
            if (week <= 13) return 1      // Q1: 1-13
            if (week <= 26) return 14     // Q2: 14-26
            if (week <= 39) return 27     // Q3: 27-39
            return 40                      // Q4: 40-52
        }
        const quarterStartWeek = getQuarterStart(selectedWeek)

        return filteredData.map((series: any, index: number) => {
            const weeklyData = series.week_data || []

            // Calculate quarter total: sum from quarter start to selected week
            const quarterTotal = weeklyData
                .slice(quarterStartWeek - 1, selectedWeek)
                .reduce((sum: number, val: number) => sum + (val || 0), 0)

            // Calculate year total: sum from week 1 to selected week
            const yearTotal = weeklyData
                .slice(0, selectedWeek)
                .reduce((sum: number, val: number) => sum + (val || 0), 0)

            return {
                year: String(series.name),
                highlight: 'Week ' + selectedWeek,
                highlightColor: styleConfig[index]?.highlightColor || 'text-gray-400',
                dateRange: getWeekDates(selectedWeek, Number(series.name))?.formattedRange,
                weekly_total: series.week_data[selectedWeek - 1] ? '$' + convertToInternationalCurrencySystem(series.week_data[selectedWeek - 1]) : 'No data yet',
                weekend_total: series.weekend_data?.[selectedWeek - 1] ? '$' + convertToInternationalCurrencySystem(series.weekend_data[selectedWeek - 1]) : 'No data yet',
                quarter_total: quarterTotal > 0 ? '$' + convertToInternationalCurrencySystem(quarterTotal) : 'No data yet',
                year_total: yearTotal > 0 ? '$' + convertToInternationalCurrencySystem(yearTotal) : 'No data yet',
                accentBg: styleConfig[index]?.accentBg || 'bg-gray-500'
            }
        }).sort((a, b) => Number(b.year) - Number(a.year))
    }, [filteredData, selectedWeek])




    return (
        <div className="bg-stone-900 text-white rounded-3xl w-full">
            <div className="rounded-2xl md:pl-2" ref={chartRef}>
                <ReactApexChart key={`${quarter}-${selectedWeek}-${selectedYears.join('-')}`} options={chartOptions} series={chartSeries} type="line" height={410} />
            </div>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="sm:w-20">
                    <p className="text-3xl font-extrabold tracking-tight">Q{quarter}</p>
                </div>
                <div className={`grid gap-4 sm:flex-1 ${weekStats.length <= 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-5'}`}>
                    {weekStats.map((stat) => (
                        <div key={stat.year} className="space-y-1">
                            <div className="flex items-center gap-2 mb-6">
                                <p className="text-base font-semibold text-gray-100 uppercase tracking-wider mb-0">{stat.year}</p>
                                <div className={`h-1 w-12 rounded-full ${stat.accentBg}`} />
                            </div>
                            <p className={`text-base font-semibold ${stat.highlightColor}`}>{stat.highlight} <br />
                                {stat.dateRange}</p>
                            {/* <p className="text-base">{stat.dateRange}</p> */}
                            <p className="text-base">
                                <span title="Weekend Total">3-Day:</span> <span className="text-white">{stat.weekend_total}</span>
                                <br />
                                <span title="Weekly Total">7-Day:</span> <span className="text-white">{stat.weekly_total}</span>
                                <br />
                                <span title="Quarterly To Date" className='mr-3'>QTD:</span> <span className="text-white">{stat.quarter_total}</span>
                                <br />
                                <span title="Yearly To Date" className='mr-3'>YTD:</span> <span className="text-white">{stat.year_total}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BoxofficeTrensChart