import Link from 'next/link'
import React from 'react'
import defaultMoviePoster from '@/public/images/sdplaceholder2.jpg';
import meterimg from '@/public/images/meterrate.png';
const Buzzmeter = () => {
    const buzzmeterData = {
        "title": "The Super Mario",
        "link": "/movie/the-super-mario-galaxy-movie/",
        "img": "https://api.screendollars.com/wp-content/uploads/2025/09/MV5BNDMyODQzZjAtNmYxYS00YjNiLWEzYTMtNzgyZWE5ODBkZDVhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "hero_img": "https://api.screendollars.com/wp-content/uploads/2025/09/image_2026-01-25_180928612.png",
        "description": "The Super Mario Galaxy Movie is a American computer-animated science fiction film."
    }
    return (
        <section className='buzzmeter py-8 md:py-12 lg:py-14 bg-zinc-100 border-t border-zinc-200'>
            <div className='container'>
                <div className="top_txt">
                    <h2 className='flex items-center gap-3'> <img src={meterimg.src} alt="meter" className="inline-block" /> Screendollars Buzz Meter</h2>
                    <p className='max-w-3xl text-lg'>Tracking the pulse of audience excitement for upcoming movies.</p>
                </div>
                <div className="grid gap-4 lg:gap-5 lg:gap-y-7 grid-cols-[repeat(auto-fill,minmax(230px,1fr))] text-center md:mt-7">
                    {Array.from({ length: 4 }).map((_, index: number) => (
                        <div className="card-item border border-gray-100 rounded-lg bg-white p-[2px]" key={index}>
                            <Link href={buzzmeterData.link} className="text-black hover:text-blue">
                                <figure className="card_media relative lg:pb-[140%] pb-[120%]  rounded-lg overflow-hidden flex justify-center">
                                    <img src={buzzmeterData.img != '' ? buzzmeterData.img : defaultMoviePoster.src} alt={buzzmeterData.title} className="w-full h-full object-cover absolute top-0 left-0" />

                                </figure>
                            </Link>
                            <div className="card_content p-3">
                                <h3 className="mb-1"> <Link href={buzzmeterData.link} className="text-black hover:text-blue"> {buzzmeterData.title} </Link></h3>
                                <p className='mb-2'>{buzzmeterData.description}</p>
                                {<Link href={buzzmeterData.link} className="cta_btn roundbtn min-w-40 transition-all duration-300 my-2">View Details</Link>}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section >
    )
}

export default Buzzmeter