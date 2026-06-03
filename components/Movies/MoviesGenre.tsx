import Link from 'next/link';
import React from 'react'

const MoviesGenre = ({ data }: { data: any[] }) => {
    return (
        <section className="movies-genre py-8 md:py-12 lg:py-14 bg-zinc-900">
            <div className="container">
                <div className="top_txt">
                    <h2 className="capitalize mb-4 lg:mb-6 text-white">
                        Movies By Genre
                    </h2>
                </div>

                <div className="movies-genre-list grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
                    {data?.map((item: any, index: number) => (
                        <div className="fmgenre_item" key={index}>
                            <Link href={`/movies/genres/${item.select_genre.toLowerCase()}`}>
                                <span className="fmgenre_itemin df fww border-white border-2 rounded-md">
                                    <figure className="pvr">
                                        <img src={item.genre_image} alt="" className="objctimg_box" />
                                        <figcaption className="genmiddlename">{item.select_genre}</figcaption>
                                    </figure>
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    )
}

export default MoviesGenre