import Link from 'next/link';
import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';

interface CastItem {
    link: string;
    img: string;
    name: string;
    talent_name: string;
}

export interface CelebmovieSliderData {
    link: string;
    title: string;
    cast?: CastItem[];
}

interface CelebmovieSliderProps {
    data: CelebmovieSliderData;
}

const CelebmovieSlider = ({ data }: CelebmovieSliderProps) => {
    const SliderSetting = {
        slidesToShow: 3,
        speed: 300,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        centerPadding: '0',
        focusOnSelect: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    return (
        <div className='celebbox w-full lg:w-[calc(50%-32px)] mb-4 sm:mb-7'>
            <h4>
                <Link href={data.link}>{data.title}</Link>
            </h4>
            <Slider {...SliderSetting} className='celeb_slider roundslickarrow 2xl:-ml-5'>
                {data?.cast?.map((item, index) => {
                    return (
                        <div className='celeb_item text-center md:px-3' key={index}>
                            <a href={item.link} className='text-black'>
                                <figure className='pvr h-36 w-[121px] rounded-[10px] mx-auto mb-2'>
                                    <img src={item.img} alt='' className='objctimg_box' />
                                </figure>
                                <h5 className='mb-1'>{item.name}</h5>
                                <span>{item.talent_name}</span>
                            </a>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default CelebmovieSlider;

