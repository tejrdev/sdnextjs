'use client'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Link from 'next/link';
import ReadTimeIcon from './ReadTimeIcon';
import Image from 'next/image';

const BlogBanner = ({ data, requestFrom }) => {
    const SliderSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        dots: true,
        arrows: false,
    }
    return (

        <div className="newsbanner bg-gray-400">
            <Slider {...SliderSettings} className="equalslideimg">
                {data && data?.map((item: any, index: number) => (
                    <div className="blogbanner_item relative z-[1]" key={index}>
                        <div className="mediainfo absolute top-0 left-0 w-full h-full z-[-1]">
                            <Image src={item.artical_img} alt={item.artical_title} width={1920} height={566} className="w-full h-full object-cover object-center absolute left-0 z-[-1]" />
                            <div className="imgfig bg-gradient-to-r from-gray-900 to-transparent absolute top-0 left-0 w-full h-full"></div>
                        </div>
                        <div className="container text-white ">
                            <div className="lg:w-1/2 w-full pt-20 pb-16 sm:pt-28 sm:pb-16">
                                <h2>{item.artical_title}</h2>
                                <div className="sm:flex items-center gap-8">
                                    {requestFrom === "news" ? <Link href={item.artical_cat_link}><p className="text-lg text-white">{item.artical_cat_name}</p></Link>
                                        : <p className="text-lg">{item.date}</p>}
                                    {item.read_time && <p className="text-lg flex items-center gap-2 text-white">
                                        <ReadTimeIcon color="white" width={16} height={16} />
                                        {item.read_time} </p>
                                    }
                                </div>
                                <div className="cta_btn">
                                    <Link href={item.artical_link}><button className="orangebtn min-w-40">Read Now</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default BlogBanner