import Aboutslider from '../../components/AboutUs/Aboutslider';
import HeadComponent from '../../components/HeadComponent';
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
// import { FaXTwitter } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa";
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
// import about_banner from '../../public/images/about_banner.jpg';
// import aboutstroy from '../../public/images/aboutstroy.jpg';

import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';

// Import types from separate file
import {
    SEOData,
    AboutData,
    AboutUSProps,
    TransformedCountData
} from '../../types/aboutsd';

export async function getStaticProps() {
    /* console.log(process.env.NEXT_PUBLIC_SEO_LINK + 'about-screendollars'); */
    const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'about-screendollars');
    const SEOdata: SEOData = await res.json();

    // about page static data
    const AboutResponse = await fetch(process.env.NEXT_PUBLIC_SD_API + '/about_us_page/about-page.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
    const AboutData: AboutData = await AboutResponse.json();

    return {
        props: { SEOdata, AboutData },
        revalidate: 60, // In seconds
    };
}

const AboutUS: React.FC<AboutUSProps> = ({ SEOdata, AboutData }) => {

    const [startCount, setStartCount] = useState(false);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    useEffect(() => {
        if (inView) {
            setStartCount(true);
        }
    }, [inView]);

    // Transform the data to match CountUp expectations
    const transformCountData = (data: Array<{ title: string; count: string;[key: string]: any }>): TransformedCountData[] => {
        if (!data || !Array.isArray(data)) return [];

        return data.map(item => {
            const countStr = item.count || '';
            // Extract number and suffix (e.g., "15K+" -> value: 15, suffix: "K+")
            const match = countStr.match(/^([\d,]+)([KkMm]?)(\+?)$/);

            if (match) {
                const value = parseInt(match[1].replace(/,/g, ''));
                const multiplier = match[2]; // Keep original case (K or M)
                const plusSign = match[3];

                // Keep K/M as part of suffix
                const suffix = multiplier + plusSign;

                return {
                    title: item.title,
                    value: value,
                    suffix: suffix,
                    prefix: '',
                    separator: ','
                };
            }

            // If no match, return as is with value 0
            return {
                title: item.title,
                value: 0,
                suffix: '',
                prefix: '',
                separator: ','
            };
        });
    };

    const glanceData = AboutData.glance?.data ? transformCountData(AboutData.glance.data) : [];

    const SliderSetting = {
        slidesToShow: 1,
        speed: 300,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        centerPadding: '0',
        focusOnSelect: true,
        arrows: true,
        dots: true,
    };

    return (
        <>
            <HeadComponent data={SEOdata} />
            <div className='aboutus'>
                <section className='aboutintro secspace'>
                    <div className='container'>
                        <div className='aboutintro_box text-center'>
                            {/* <div className='about_toptxt' dangerouslySetInnerHTML={{ __html: AboutData.banner_title }}></div> */}
                            <h1 className='max-w-3xl mx-auto'>{AboutData.page_title}</h1>
                            <p dangerouslySetInnerHTML={{ __html: AboutData.content || '' }} className=' mx-auto max-w-2xl'></p>
                            <div className='introbnr mt-8 mx-auto max-w-[995px] rounded-md overflow-hidden border border-gray-300'>
                                {AboutData.banner_img && <img src={AboutData.banner_img} alt="About us intro banner" />}
                            </div>
                        </div>
                    </div>
                </section>

                <section className='sdstory secspace'>
                    <div className='container'>
                        <div className='sdstory_box grid gap-6 grid-cols-1 sm:grid-cols-2 items-start md:items-center'>
                            <div className='sdstory_content max-w-xl'>
                                <h2 className='mb-3 md:mb-4'>{AboutData.our_story?.title}</h2>
                                <p dangerouslySetInnerHTML={{ __html: AboutData.our_story?.story_content || '' }}></p>
                            </div>
                            <div className='sdstory_image  rounded-md overflow-hidden'>
                                {AboutData?.our_story?.image?.url && <img src={AboutData.our_story?.image?.url} alt="About us story" className='border border-gray-600 rounded-md' />}
                            </div>
                        </div>
                    </div>
                </section>

                <section className='testimonials secspace'>
                    <div className='container'>
                        <div className='testi_box'>
                            <h2 className='text-center mb-4 sm:mb-6 md:mb-9'>{AboutData.testimonial_title}</h2>
                            <Slider className='testi_content text-center roundslickarrow' {...SliderSetting}>
                                {AboutData.testimonial.map((testimonial, index) =>
                                    <div className='testi_item' key={index}>
                                        <p className='text-darkgold italic max-w-4xl mx-auto text-xl'>{testimonial.testimonial_content}</p>
                                        <div className='testi_author flex items-center gap-6 justify-center mt-6 '>
                                            {testimonial.person_image && <div className='testi_author_info flex flex-wrap items-center gap-2 w-96 border-r border-gray-600'>
                                                <figure className='border border-gray-600 mb-1 md:mb-3 size-24 relative rounded-full'>
                                                    <img src={testimonial.person_image?.url} alt="About us team" className='object-cover absolute size-full rounded-full left-0' />
                                                </figure>
                                                <div className='testi_author_info w-[calc(100%-105px)] text-left pl-5'>
                                                    <h5 className='mb-0'>{testimonial.name}</h5>
                                                    <p><span className='line-clamp-2' title={testimonial.designation}>{testimonial.designation},</span> {testimonial.company_name}</p>
                                                </div>
                                            </div>}
                                            <div className='testi_author_logo'>
                                                <img src={testimonial.company_logo?.url} alt="testimonail bran logo" className='size-40 max-h-20 w-auto' />
                                            </div>
                                        </div>
                                    </div>
                                )
                                }
                            </Slider>
                        </div>
                    </div>
                </section>

                <section className='aboutcounts secspace'>
                    <div className='container'>
                        <div className='aboutcounts_box'>
                            <h2 className='text-center'>{AboutData.glance?.title}</h2>
                            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-y-10 mt-8 ' ref={ref}>
                                {glanceData.map((countitem, index) => {
                                    return (
                                        <div className='aboutcount_item text-center sm:text-left' key={index}>
                                            {startCount && (
                                                <h3 className='font-bold mb-3 text-4xl sm:text-5xl md:text-7xl'>
                                                    <CountUp start={5} end={countitem.value} duration={3} suffix={countitem.suffix} prefix={countitem.prefix} separator={countitem.separator} />
                                                </h3>
                                            )}
                                            <h5 className='text-medium text-sm sm:text-base md:text-lg'>{countitem.title}</h5>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>



                <section className='aboutTeam secspace'>
                    <div className='container'>
                        <div className='aboutTeam_box'>
                            <div className='top_txt'>
                                <h2 >{AboutData.team_members.title}</h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: AboutData.team_members.content || '',
                                    }}></div>
                            </div>
                            <div className='flex flex-wrap justify-center gap-5 mt-8 gap-y-10 lg:-ml-5'>
                                {AboutData.team_members.team_member_data.map((item, index) => {
                                    return (
                                        <div className='aboutTeam_item w-full max-w-[282px]' key={index}>
                                            <figure className='border border-gray-600 rounded-sm mb-1 md:mb-3  pb-[108%] relative'>
                                                <img src={item.image.url} alt={item.title} className='object-cover absolute size-full rounded-sm' />
                                            </figure>
                                            <h4 className='mb-1 capitalize'>{item.title}</h4>
                                            <p className='capitalize mb-2'>{item.designation}</p>
                                            <div className='teamsocial flex flex-wrap'>
                                                {item?.linkedin_link?.url?.length && (
                                                    <a href={item.linkedin_link.url} className='pr-4 text-black hover:text-gold text-lg' title={item.linkedin_link.title} target='_blank'>
                                                        < FaLinkedin />
                                                    </a>
                                                )}
                                                {item?.twitter_link?.url?.length && (
                                                    <a href={item.twitter_link.url} className='pr-4 text-black hover:text-gold text-lg' title={item.twitter_link.title} target='_blank'>
                                                        <FaXTwitter />
                                                    </a>
                                                )}
                                                {item?.email_id && (<a href={'mailto:' + item.email_id} className='pr-4 text-black hover:text-gold text-lg' title='Email Me'>
                                                    <FaRegEnvelope />
                                                </a>
                                                )}

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AboutUS;
