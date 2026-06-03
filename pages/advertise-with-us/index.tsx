import { useState, useEffect, MouseEvent } from 'react';
import Image_content from '../../components/AdvertisePage/Image_content';
import Sponsorship from '../../components/AdvertisePage/Sponsorship';
import ContactFrom from '../../components/AdvertisePage/ContactFrom';
import HeadComponent from '../../components/HeadComponent';
import banner_ads from '../../public/images/banner_ads.jpg';
import premimum_listing from '../../public/images/premimum_listing.jpg';
import spotlite_articel from '../../public/images/spotlite_articel.jpg';
import campain from '../../public/images/campain.jpg';
import adsusbnrimg from '../../public/images/adsusbnrimg.jpg';
import adscontact from '../../public/images/adscontact.jpg';
import Link from 'next/link';
import { GetStaticProps } from 'next';

interface SEOData {
    [key: string]: any;
}

interface ImageData {
    url?: string;
}

interface ButtonData {
    url?: string;
    title?: string;
}

interface AdvContentItem {
    title?: string;
    content?: string;
    buttons?: ButtonData;
    button_target?: string;
    img?: ImageData;
    section?: string;
    list?: Array<{
        image?: string;
        title?: string;
        description?: string;
        short_title?: string;
    }>;
}

interface AdvertiseData {
    adv_content?: AdvContentItem[];
    [key: string]: any;
}

interface AdvertisePageProps {
    SEOdata: SEOData;
    AdvertiseData: AdvertiseData;
}

export const getStaticProps: GetStaticProps<AdvertisePageProps> = async () => {
    // Fetch data from external API
    const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'advertise-with-us');
    const SEOdata = await res.json();

    // advertise page static data
    let AdvertiseData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/Advertise_with_us_page/sd-advertise.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
    AdvertiseData = await AdvertiseData.json();

    return {
        props: { SEOdata, AdvertiseData },
        revalidate: 60, // In seconds
    };
};

const AdvertisePage = ({ SEOdata, AdvertiseData }: AdvertisePageProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedImageAlt, setSelectedImageAlt] = useState<string>('');

    const openImagePopup = (imageSrc: string, imageAlt: string): void => {
        setSelectedImage(imageSrc);
        setSelectedImageAlt(imageAlt);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeImagePopup = (): void => {
        setSelectedImage(null);
        setSelectedImageAlt('');
        document.body.style.overflow = 'unset'; // Restore scrolling
    };

    // Handle ESC key to close popup
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent): void => {
            if (event.key === 'Escape' && selectedImage) {
                closeImagePopup();
            }
        };

        if (selectedImage) {
            window.addEventListener('keydown', handleEscKey);
        }

        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [selectedImage]);

    return (
        <>
            <HeadComponent data={SEOdata} />
            <div className='addus'>
                <section className='addus_banner'>
                    <div className='container'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-8 md:py-10 lg:py-16'>
                            {/* Left Section - Text Content */}
                            <div className='text-center lg:text-left space-y-6'>
                                <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
                                    {AdvertiseData?.adv_content?.[0]?.title}
                                </h2>
                                <p className='text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0' dangerouslySetInnerHTML={{ __html: AdvertiseData?.adv_content?.[0]?.content || '' }}>
                                </p>
                                <div className='pt-4'>
                                    <Link href={AdvertiseData?.adv_content?.[0]?.buttons?.url || '#'} className='bg-gold hover:bg-darkgold text-gray-900 font-semibold px-4 py-2 rounded-md text-lg focus:text-black
                  transition-all duration-300 transform hover:scale-102 hover:text-black' target={AdvertiseData?.adv_content?.[0]?.button_target}>
                                        {AdvertiseData?.adv_content?.[0]?.buttons?.title}
                                    </Link>
                                </div>
                            </div>

                            {/* Right Section - Visual Content */}
                            <div className='relative flex justify-center'>
                                <figure className='relative w-full border border-gray-200 rounded-sm'>
                                    <img src={AdvertiseData?.adv_content?.[0]?.img?.url} className='size-full rounded-sm' alt='publication_image' loading='lazy' />
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='sdstetestics bg-gold-yellow py-6 sm:py-10 lg:py-14'>
                    <div className='container'>
                        <div className='sdstetesticsinfo'>
                            <div className='font-normal mb-4 lg:mb-8' dangerouslySetInnerHTML={{ __html: AdvertiseData?.adv_content?.[1]?.content || '' }}></div>
                        </div>
                    </div>
                </section>

                <section className='sdadsfeaters py-6 sm:py-10 lg:py-14'>
                    <div className='container'>
                        <div className='sdadsfeatersinfo'>
                            <h2 className='font-bold text-gray-900 leading-tight mb-4 lg:mb-8'>{AdvertiseData?.adv_content?.[2]?.title}</h2>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12'>
                                {AdvertiseData?.adv_content?.[2]?.list?.map((item, index) => (
                                    <div className='sdadsfeatersitem ' key={index}>
                                        <figure className='relative w-full border border-gray-200 rounded-md mb-4'>
                                            <img
                                                src={item.image}
                                                className='size-full rounded-md cursor-pointer hover:opacity-90 transition-opacity'
                                                alt={item.title || ''}
                                                loading='lazy'
                                                onClick={() => openImagePopup(item.image || '', item.title || '')}
                                            />
                                            <span className='absolute  left-0 top-0 bg-gold-yellow border border-gold font-bold text-gray-900 text-sm px-2 py-1 rounded-tl-md rounded-br-md capitalize'>{item.short_title}</span>
                                        </figure>
                                        <h3 className='font-bold text-gray-900 leading-tight'>{item.title}</h3>
                                        <p className='text-gray-700 leading-relaxed text-sm'>{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className='sdadscontact  bg-gold-yellow relative overflow-hidden mb-6 sm:mb-10 lg:mb-14'>
                    <div className='container'>
                        <div className='sdadscontactinfo relative py-6 sm:py-10 lg:py-14'>
                            <div className='sdadscontactinfo_txt w-full md:w-1/2 pr-4 md:pr-8 lg:pr-12'>
                                <h3 className='font-bold text-gray-900 leading-tight mb-4 lg:mb-8'>
                                    {AdvertiseData?.adv_content?.[3]?.title}
                                </h3>
                                <div className='pt-4'>
                                    <Link href={AdvertiseData?.adv_content?.[3]?.buttons?.url || '#'} className='bg-gold hover:bg-darkgold text-gray-900 font-semibold px-4 py-2 rounded-md text-lg transition-all duration-300 transform hover:scale-102 focus:text-black'>
                                        {AdvertiseData?.adv_content?.[3]?.buttons?.title}
                                    </Link>
                                </div>
                            </div>
                            <div className='sdadscontactinfo_img w-full md:w-1/2 md:absolute md:right-0 md:top-0 h-full mt-6 md:mt-0'>
                                <img src={AdvertiseData?.adv_content?.[3]?.img?.url} className='size-full object-cover' alt='publication_image' loading='lazy' />
                            </div>
                        </div>
                    </div>
                </section>

                {AdvertiseData.adv_content?.map((item, index) => {
                    switch (item.section) {
                        case 'contact_section':
                            return <ContactFrom data={item} key={index} />;
                        default:
                            return null;
                    }
                })}

                {/* Image Popup Modal */}
                {selectedImage && (
                    <div
                        className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4'
                        onClick={closeImagePopup}
                    >
                        <div className='relative max-w-7xl max-h-full'>
                            <button
                                onClick={closeImagePopup}
                                className='absolute -top-10 right-0 text-white hover:text-gray-300 text-3xl font-bold transition-colors'
                                aria-label='Close image popup'
                            >
                                ×
                            </button>
                            <img
                                src={selectedImage}
                                alt={selectedImageAlt}
                                className='max-w-full max-h-[90vh] object-contain rounded-md'
                                onClick={(e: MouseEvent<HTMLImageElement>) => e.stopPropagation()}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdvertisePage;

