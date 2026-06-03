'use client'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Link from 'next/link';
import { motion } from "motion/react"
import { FadeinUp } from '@/components/Anim/FadeinUp';
import ReadTimeIcon from '@/components/shared/ReadTimeIcon';

const NewsBanner = ({ data }) => {
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
    const slideimg = 'https://picsum.photos/1920/566';
    return (

        <Slider {...SliderSettings} className="equalslideimg">
            {data && data.map((item, index) => (
                <div className="newsbanner_item relative z-[1]" key={index}>
                    <div className="mediainfo absolute top-0 left-0 w-full h-full z-[-1]">
                        <img src={item.artical_img} alt={item.artical_title} className="w-full h-full object-cover object-center absolute left-0 z-[-1]" />
                        <div className="imgfig bg-gradient-to-r from-gray-900 to-transparent absolute top-0 left-0 w-full h-full"></div>
                    </div>
                    <div className="container text-white ">
                        <div className="lg:w-1/2 w-full pt-20 pb-16 sm:pt-28 sm:pb-16">
                            <Link href={item.artical_link}><h2 className='text-white'>{item.artical_title}</h2></Link>
                            <div className="sm:flex items-center gap-8">
                                <Link href={item.artical_cat_link}><p className="text-lg text-white">{item.artical_cat_name}</p></Link>
                                {item.read_time && <p className="text-lg flex items-center gap-2 text-white">
                                    <ReadTimeIcon color="white" width={16} height={16} />
                                    {item.read_time}
                                </p>}
                            </div>
                            <div className="cta_btn">
                                <Link href={item.artical_link}><button className="orangebtn min-w-40">Read Now</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    )
}

export default NewsBanner