import Link from "next/link"
import MovieCard from "@/components/shared/MovieCard";


const MovieList = ({ data }: { data: any[] }) => {
    return (
        <section className="upcoming-movieslist py-10 lg:py-14 bg-zinc-100" id="upcoming-movies-list">
            <div className="container">
                <div className="grid gap-4 lg:gap-5 lg:gap-y-7 grid-cols-[repeat(auto-fill,minmax(230px,1fr))] text-center ">
                    {data?.slice(0, 12).map((item: any, index: number) => (
                        <MovieCard key={index} item={item} />
                    ))}
                </div>
                <div className="cta_btn text-center mt-6 lg:mt-10">
                    <Link href="/movies/release-schedule?requestFrom=upcoming-movies" className="bg-orangegold text-black hover:bg-black hover:text-white min-w-40 transition-all duration-300 mt-2 lg:text-xl text-lg px-8 py-1.5 rounded-2xl font-bold capitalize">View Release schedule</Link>
                </div>
            </div>
        </section >
    )
}

export default MovieList
