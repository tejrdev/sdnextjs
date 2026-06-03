import Link from "next/link";
import defaultMoviePoster from '@/public/images/sdplaceholder2.jpg';

interface Movie {
    permalink?: string;
    link: string;
    img: string;
    title: string;
    release_date?: string;
    is_featured?: boolean;
    distributor_name: string;
    distributor_link: string;
    primary_genres: string;
    primary_genre: any[];
}

const MovieCard = ({ item, requestFrom }: { item: Movie, requestFrom?: string }) => {
    return (
        <div className="card-item border border-gray-100 rounded-lg bg-white p-[2px]">
            <Link href={item.permalink ? item.permalink : item.link} className="text-black hover:text-blue">
                <figure className="card_media relative lg:pb-[140%] pb-[120%]  rounded-lg overflow-hidden flex justify-center">
                    <img src={item.img != '' ? item.img : defaultMoviePoster.src} alt={item.title} className="w-full h-full object-cover absolute top-0 left-0" />
                    {item.release_date && <span className={`absolute top-2 inline-block text-center bg-white/80 px-4 py-1 rounded-2xl text-black text-sm uppercase ${requestFrom === 'upcoming-movies' ? 'uppercase' : ''}`}>{item.release_date}</span>}
                    {item.is_featured && <span className="feature_Flag absolute bottom-2 right-2 inline-flex items-center gap-1 text-center bg-orangegold/90 px-4 py-1 rounded-2xl text-black">Featured
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M160 96C160 78.3 145.7 64 128 64C110.3 64 96 78.3 96 96L96 544C96 561.7 110.3 576 128 576C145.7 576 160 561.7 160 544L160 422.4L222.7 403.6C264.6 391 309.8 394.9 348.9 414.5C391.6 435.9 441.4 438.5 486.1 421.7L523.2 407.8C535.7 403.1 544 391.2 544 377.8L544 130.1C544 107.1 519.8 92.1 499.2 102.4L487.4 108.3C442.5 130.8 389.6 130.8 344.6 108.3C308.2 90.1 266.3 86.5 227.4 98.2L160 118.4L160 96z" /></svg>
                    </span>}

                </figure>
            </Link>
            <div className="card_content p-3">
                <h3 className="mb-0"><Link href={item.link} className="text-black hover:text-blue line-clamp-2" title={item.title}>{item.title}</Link></h3>
                <Link href={item.distributor_link} className="text-lg text-black hover:text-blue block mb-1 truncate" title={item.distributor_name}>{item.distributor_name}</Link>
                {typeof item.primary_genres === 'string' && item.primary_genres && <div className="cta_btn roundbtn min-w-40 opacity-70 hover:opacity-100 transition-all duration-300 my-2 cursor-default pointer-events-none">{item.primary_genres}</div>}
                {Array.isArray(item.primary_genre) && item.primary_genre.length > 0 && item.primary_genre.map((genre: any, index: number) => <Link href={genre.value}><div className="cta_btn roundbtn min-w-40 opacity-70 hover:opacity-100 transition-all duration-300 my-2 cursor-default pointer-events-none" key={index}>{genre.name}</div></Link>)}
            </div>
        </div>
    );
}

export default MovieCard;