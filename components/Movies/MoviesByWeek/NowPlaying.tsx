'use client'

import { useState, useMemo } from 'react';
import MovieCard from '@/components/shared/MovieCard';

const INITIAL_COUNT = 8;

const NowPlaying = ({ data }: { data: any[] }) => {
    const [releaseType, setReleaseType] = useState<'Wide' | 'All'>('Wide');
    const [expandedWide, setExpandedWide] = useState(false);
    const [expandedAll, setExpandedAll] = useState(false);

    const filteredData = useMemo(() => {
        if (!data?.length) return [];
        return releaseType === 'Wide'
            ? data.filter((item: any) => item.release_pattern === 'Wide')
            : data;
    }, [data, releaseType]);

    const isExpanded = releaseType === 'Wide' ? expandedWide : expandedAll;
    const displayData = isExpanded ? filteredData : (filteredData?.slice(0, INITIAL_COUNT) ?? []);
    const totalCount = filteredData?.length ?? 0;
    const showAllButton = totalCount > INITIAL_COUNT && !isExpanded;

    const handleShowAll = () => {
        if (releaseType === 'Wide') setExpandedWide(true);
        else setExpandedAll(true);
    };

    return (
        <section className="nowplaying py-8 md:py-12 lg:py-14 bg-zinc-100" id="nowplaying-movies-list">
            <div className="container">
                <div className="top_txt">
                    <h2 className="uppercase">
                        Now Playing in Theatres
                    </h2>
                    <div className="releasetabs">
                        <ul className="inline-flex flex-wrap gap-2 rounded-full bg-black/90 list-none p-1.5 ml-0">
                            <li
                                onClick={() => setReleaseType('Wide')}
                                className={`px-5 py-1.5 font-medium transition-colors rounded-full border ${releaseType === 'Wide' ? 'bg-orangegold text-black cursor-pointer border-orangegold' : 'bg-black/90 text-gray-300 border-gray-400 hover:text-white cursor-pointer'}`}
                            >
                                Wide Releases
                            </li>
                            <li
                                onClick={() => setReleaseType('All')}
                                className={`px-5 py-1.5 font-medium transition-colors rounded-full border ${releaseType === 'All' ? 'bg-orangegold text-black cursor-pointer border-orangegold' : 'bg-black/90 text-gray-300 border-gray-400 hover:text-white cursor-pointer'}`}
                            >
                                All Releases
                            </li>
                        </ul>
                    </div>
                    <div className="moviesreleases">
                        <div className="grid gap-4 lg:gap-5 lg:gap-y-7 grid-cols-[repeat(auto-fill,minmax(230px,1fr))] text-center ">
                            {displayData?.map((item: any, index: number) => (
                                <MovieCard key={index} item={item} />
                            ))}
                        </div>
                        {showAllButton && (
                            <div className="cta_btn mt-6 lg:mt-10">
                                <span
                                    role="button"
                                    tabIndex={0}
                                    onClick={handleShowAll}
                                    onKeyDown={(e) => e.key === 'Enter' && handleShowAll()}
                                    className="inline-block hover:underline cursor-pointer font-medium"
                                >
                                    + Show all ({totalCount})
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NowPlaying;