'use client'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Image from 'next/image';
import Link from 'next/link';


const HeroBanner = ({ data, static_banner_image, scrollToId, title, description }: { data?: any[], static_banner_image: string, scrollToId: string, title: string, description: string }) => {
    const SliderSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: data && data.length > 1 ? true : false,
        autoplay: false,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        dots: true,
        arrows: false,
    }

    const handleScrollToMovies = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const element = document.getElementById(scrollToId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    const staticBannerSlide = (
        <div className="upcomingbanner_item relative z-[1]" key="static-banner">
            <div className="mediainfo absolute top-0 left-0 w-full h-full z-[-1]">
                <Image src={static_banner_image} alt="Upcoming Movies" width={1920} height={566} className="w-full h-full object-cover object-center absolute left-0 z-[-1]" />
                <div className="imgfig bg-gradient-to-r from-gray-900 to-transparent absolute top-0 left-0 w-full h-full"></div>
            </div>
            <div className="container text-white ">
                <div className="lg:w-1/2 w-full pt-20 pb-16 sm:pt-28 sm:pb-16">
                    <a
                        href='#upcoming-movies-list'
                        onClick={handleScrollToMovies}
                        className='text-white hover:text-white cursor-pointer'
                    >
                        <h2 className="hover:text-gold focus:text-gold transition-all duration-300 inline-block">{title}</h2>
                        <div className="sm:flex items-center gap-8 max-w-96 ">
                            <p className="text-lg md:text-xl lg:leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )

    const propSlides = Array.isArray(data) && data.length > 0
        ? data
            .map((item: any, index: number) => (
                <div className="upcomingbanner_item relative z-[1]" key={`prop-banner-${index}`}>
                    <div className="mediainfo absolute top-0 left-0 w-full h-full z-[-1]">
                        <Image src={item.poster_image} alt="Upcoming Movies" width={1920} height={566} className="w-full h-full object-cover object-center absolute left-0 z-[-1]" />
                        <div className="imgfig bg-gradient-to-r from-gray-900 to-transparent absolute top-0 left-0 w-full h-full"></div>
                    </div>
                    <div className="container text-white ">
                        <div className="lg:w-1/2 w-full pt-20 pb-16 sm:pt-28 sm:pb-16">
                            <h2 className="   inline-block">
                                <Link href={item.movie_url} className='text-white hover:text-orangegold focus:text-orangegold cursor-pointer transition-all duration-300'>
                                    {item.movie_title}
                                </Link>
                            </h2>
                            <div className="max-w-[600px] ">
                                <Link href={item.distributor_link} className='text-white hover:text-gold focus:text-gold cursor-pointer transition-all duration-300'>
                                    <p className="text-lg md:text-xl lg:leading-relaxed">{item.distributor_name}</p>
                                </Link>
                                <ul className='ml-0 my-2 moviebnr'>
                                    {/* ?.sort((a, b) => b.is_primary - a.is_primary) */}
                                    {item?.genre?.split(',').map((genre: any, i: number) => {
                                        const isPrimaryGenre = genre.trim() === item.primary_genres.trim();
                                        return (
                                            <li key={i} className='text-sm inline-block align-top mr-2 mb-2'>
                                                <p className={`hover:no-underline px-3 rounded-3xl capitalize border border-gold pb-[2px] mb-0  userselect-none ${isPrimaryGenre ? 'font-bold  bg-black border-2 ' : ''}`}>
                                                    {genre}
                                                </p>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <p className="text-lg md:text-xl lg:leading-relaxed">{item.synopsis}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        : []

    return (
        <div className="newsbanner bg-gray-400">
            <Slider {...SliderSettings} className="equalslideimg">
                {[staticBannerSlide, ...propSlides]}
            </Slider>
        </div>
    )
}

export default HeroBanner;