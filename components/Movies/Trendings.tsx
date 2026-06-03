import flame from '@/public/images/flam.png';
import MovieCard from '@/components/shared/MovieCard';
const Trendings = ({ data }: { data: any[] }) => {
    return (
        <section className="trandings  py-10 lg:py-14 text-white bg-stone-900">
            <div className="container">
                <div className="top_txt">
                    <h2 className="capitalize mb-4 lg:mb-6">
                        Trending Movies <img src={flame.src} alt="flame" className="w-9 h-12" />
                    </h2>
                </div>
                <div className="trandingmovies">
                    <div className="grid gap-4 lg:gap-5 lg:gap-y-7 grid-cols-[repeat(auto-fill,minmax(230px,1fr))] text-center ">
                        {data?.slice(0, 4)?.map((item: any, index: number) => (
                            <MovieCard key={index} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Trendings