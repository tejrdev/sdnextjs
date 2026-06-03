'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import defaultMoviePoster from '@/public/images/sdplaceholder2.jpg';


const MoviesByMonth = ({ initialData, currentMonth, currentYear }: { initialData: any, currentMonth: number, currentYear: number }) => {
    const [expandedMonths, setExpandedMonths] = useState<Set<number>>(new Set());
    const [monthlyData, setMonthlyData] = useState<any>(initialData);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const navigationMonths = monthNames.slice(currentMonth - 1, currentMonth + 5);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [DataChanged, setDataChanged] = useState(false);
    const [loading, setLoading] = useState(false);

    // Update monthlyData when initialData changes (from parent fetch)
    useEffect(() => {
        if (initialData && initialData.movies && initialData.movies.length > 0) {
            setMonthlyData(initialData);
        }
    }, [initialData]);

    useEffect(() => {
        const fetchMonthlyData = async () => {
            try {
                setLoading(true);
                const MonthlyDataResponse = await fetch(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/upcoming-movies_y_m.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&a_year=' + currentYear + '&a_month=' + selectedMonth);
                const MonthlyData = await MonthlyDataResponse.json();
                setMonthlyData(MonthlyData);
            } catch (error) {
                console.error('Error fetching monthly data:', error);
            } finally {
                setLoading(false);
            }
        };
        if (DataChanged) {
            fetchMonthlyData();
            setDataChanged(false);
        }
    }, [selectedMonth]);

    return (
        <section className="upcoming-monthlist py-10 lg:py-14 text-white bg-stone-900">
            <div className="container">
                <div className="top_info">
                    <h2>Browse By Month</h2>
                    <ul className="monthSelector bg-white rounded-full p-2 flex  flex-wrap gap-2 list-none mb-2 md:mb-3 ml-0 mt-3 md:mt-5
                    [&>li]:bg-stone-900 [&>li]:text-gray-300 [&>li]:cursor-pointer [&>li]:rounded-2xl [&>li]:px-2 [&>li]:py-1 [&>li]:capitalize 
                    [&>li:hover]:bg-orangegold [&>li:hover]:text-black [&>li]:min-w-12 [&>li]:text-center [&>li.active]:bg-orangegold [&>li.active]:text-black">
                        {navigationMonths.map((month: string, index: number) => (
                            <li key={index} className={selectedMonth === monthNames.indexOf(month) + 1 ? 'active' : ''} onClick={() => { setSelectedMonth(monthNames.indexOf(month) + 1); setDataChanged(true); }}>{month}</li>
                        ))}
                    </ul>
                </div>
                {loading && (
                    <div className="relative min-h-[100px] mt-6 flex items-center justify-center bg-transparent">
                        <div className="w-12 h-12 rounded-full border-2 border-white border-t-transparent animate-spin" aria-hidden />
                    </div>
                )}
                {!loading && (
                    <div className="flex flex-wrap gap-4">
                        {monthlyData?.movies?.slice(0, expandedMonths.has(selectedMonth) ? monthlyData?.movies?.length : 4).map((item: any, index: number) => (
                            <div className="card-item w-full md:w-[calc(50%-16px)]" key={index}>
                                <div className="rounded-lg relative border border-gray-200 z-[1] w-full flex flex-wrap p-[2px] bg-stone-900">
                                    <div className="card-media ">
                                        {item.hero_img && <Image src={item.hero_img} alt={item.title} width={460} height={168} className="w-full h-full object-cover absolute top-0 left-0 z-[-2] rounded-lg" />}
                                        <div className="imgfig bg-gradient-to-r from-gray-900 to-transparent absolute top-0 left-0 w-full h-full z-[-1] rounded-lg"></div>
                                        <div className="card-item-image rounded-lg overflow-hidden mr-4 w-[113px] h-[168px]">
                                            <Link href={item.link} className="rounded-lg relative border border-gray-200 z-[1] w-full  bg-stone-900">
                                                <Image src={item.img != '' ? item.img : defaultMoviePoster.src} alt={item.title} width={113} height={168} className="w-full h-full object-cover" />
                                            </Link>
                                        </div>

                                    </div>
                                    <div className="card-item-content text-neutral-200 w-[calc(100%-133px)]">
                                        <div className="release-date text-right mt-1 mr-1"><span className="inline-block text-center bg-white/80 px-4 py-1 rounded-2xl text-black uppercase">{item.release_date}</span></div>
                                        <h3 className="card-item-title"><Link href={item.link} className="text-gray-200 hover:text-white">{item.title}</Link></h3>
                                        <Link href={item.distributor_link}> <p className="card-item-description text-gray-200 hover:text-white">{item.distributor_name}</p></Link>
                                        {item.primary_genres && item.primary_genres.length > 0 && <div className="card-item-tag border border-gray-300 rounded-2xl px-4 py-0.5 inline-block text-gray-300 font-bold bg-black/60">{item.primary_genres}</div>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {!loading && monthlyData?.total_movies_month > 4 && !expandedMonths.has(selectedMonth) && (
                    <div className="mt-6 flex justify-center">
                        <button
                            type="button"
                            onClick={() => setExpandedMonths(prev => new Set(prev).add(selectedMonth))}
                            className="inline-flex items-center gap-2 bg-gray-300 hover:bg-gray-200 text-gray-900 font-bold px-6 py-1 rounded-full transition-colors duration-200 text-base"
                        >
                            Show All ({monthlyData?.total_movies_month})
                            <span
                                className="inline-block transition-transform duration-200 rotate-180"
                                aria-hidden
                            />
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default MoviesByMonth;