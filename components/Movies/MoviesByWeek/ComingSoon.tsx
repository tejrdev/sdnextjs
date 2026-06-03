import React from 'react'
import MovieCard from '@/components/shared/MovieCard';
import Link from 'next/link';

const ComingSoon = ({ data }: { data: any[] }) => {
    return (
        <section className="comingsoon py-8 md:py-12 lg:py-14 bg-zinc-100">
            <div className="container">
                <div className="top_txt">
                    <h2 className="capitalize mb-4 lg:mb-6">
                        Coming Soon
                    </h2>
                </div>

                <div className="comingsoonmovies">
                    <div className="grid gap-4 lg:gap-5 lg:gap-y-7 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] text-center ">
                        {data?.map((item: any, index: number) => (
                            <MovieCard key={index} item={item} />
                        ))}
                    </div>
                    <div className="cta_btn text-center mt-6 lg:mt-10">
                        <Link href="/movies/upcoming-movies" className="bg-orangegold text-black hover:bg-black hover:text-white min-w-40 transition-all duration-300 mt-2 lg:text-xl text-lg px-8 py-1.5 rounded-2xl font-bold capitalize">View All Upcoming Movies</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ComingSoon