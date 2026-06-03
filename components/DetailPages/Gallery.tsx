import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';
import 'glightbox/dist/css/glightbox.css';

interface GalleryItem {
    url?: string;
    caption?: string;
}

interface GalleryProps {
    data: (GalleryItem | string)[];
    title?: string;
}

const Gallery: React.FC<GalleryProps> = ({ data, title }) => {
    const [showViewAllModal, setShowViewAllModal] = useState(false);
    const lightboxRef = useRef<any>(null);

    const sliderSettings = {
        slidesToShow: 5,
        slidesToScroll: 2,
        speed: 300,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        dots: false,
        arrows: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    // Normalize data to always have objects with url property
    const normalizedData: GalleryItem[] = data.map((item) => {
        if (typeof item === 'string') {
            return { url: item, caption: '' };
        }
        return { url: item.url || '', caption: item.caption || '' };
    });

    // Initialize gLightbox for gallery images (both slider and grid)
    useEffect(() => {
        if (typeof window === 'undefined' || normalizedData.length === 0) return;

        const initLightbox = () => {
            import('glightbox').then((GLightboxModule) => {
                const GLightbox = GLightboxModule.default;

                if (lightboxRef.current) {
                    lightboxRef.current.destroy();
                }

                // Initialize gLightbox for all gallery images (slider + grid)
                lightboxRef.current = GLightbox({
                    selector: '.glightbox-gallery',
                    touchNavigation: true,
                    keyboardNavigation: true,
                    closeButton: true,
                    loop: false,
                });
            });
        };

        const timer = setTimeout(() => {
            initLightbox();
        }, 100);

        return () => {
            clearTimeout(timer);
            if (lightboxRef.current) {
                lightboxRef.current.destroy();
                lightboxRef.current = null;
            }
        };
    }, [normalizedData, showViewAllModal]); // Re-initialize when modal opens

    const handleViewAllClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setShowViewAllModal(true);
    };

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && showViewAllModal) {
                setShowViewAllModal(false);
            }
        };

        if (showViewAllModal) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [showViewAllModal]);

    const getImageUrl = (item: GalleryItem): string => {
        return item.url || '';
    };

    const getImageCaption = (item: GalleryItem): string => {
        return item.caption || '';
    };

    if (!normalizedData.length) {
        return null;
    }

    return (
        <>
            <section className='photoslid dlsecspace thdetial_gallery toplinesec'>
                <div className='container'>
                    <div className='top_txt df fww just-between'>
                        <h2>
                            Gallery <i className='fal fa-angle-right'></i>
                        </h2>
                        {normalizedData.length > 5 && (
                            <div className='viewmovrebtn'>
                                <a
                                    href='#media_galleryall'
                                    className='allgallery btn goldbtn'
                                    onClick={handleViewAllClick}
                                >
                                    View All
                                </a>
                            </div>
                        )}
                    </div>
                    <div className='photo_slidbox'>
                        <Slider {...sliderSettings} className='roundslickarrow'>
                            {normalizedData.map((item, index) => {
                                const imageUrl = getImageUrl(item);
                                const caption = getImageCaption(item);
                                return (
                                    <div className='photo_sliditem' key={index}>
                                        <div className='media_mvbox'>
                                            <a
                                                className='glightbox-gallery media_gallery'
                                                href={imageUrl}
                                                data-title={caption}
                                            >
                                                <div className='photoinfoimg pvr bg-slate-200'>
                                                    <img
                                                        src={imageUrl}
                                                        alt={caption}
                                                        className='objctimg_box'
                                                        loading='lazy'
                                                    />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            </section>

            {/* View All Modal */}
            {showViewAllModal && (
                <div
                    className='media_galleryall_modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'
                    onClick={() => setShowViewAllModal(false)}
                >
                    <div
                        className='media_galleryall bg-white relative mx-auto my-14 w-full max-w-6xl rounded-md p-8 pt-11 max-h-[90vh] overflow-y-auto'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className='absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-900'
                            onClick={() => setShowViewAllModal(false)}
                            aria-label='Close modal'
                        >
                            ×
                        </button>
                        {normalizedData.length === 0 ? (
                            <p className='text-center text-gray-500 py-8'>No images available</p>
                        ) : (
                            <ul className='list-none grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 m-0 p-0'>
                                {normalizedData.map((item, index) => {
                                    const imageUrl = getImageUrl(item);
                                    const caption = getImageCaption(item);

                                    if (!imageUrl) {
                                        console.warn(`Gallery item at index ${index} has no URL:`, item);
                                        return null;
                                    }

                                    return (
                                        <li
                                            key={index}
                                            className='media_galleryall_item list-none'
                                        >
                                            <a
                                                className='glightbox-gallery block w-full'
                                                href={imageUrl}
                                                data-title={caption}
                                            >
                                                <div className='photoinfogallery relative w-full bg-slate-200 overflow-hidden rounded-md' style={{ paddingBottom: '100%' }}>
                                                    <img
                                                        src={imageUrl}
                                                        alt={caption || `Gallery image ${index + 1}`}
                                                        className='absolute top-0 left-0 w-full h-full object-cover'
                                                        loading='lazy'
                                                        onError={(e) => {
                                                            console.error('Image failed to load:', imageUrl);
                                                            (e.target as HTMLImageElement).style.display = 'none';
                                                        }}
                                                    />
                                                </div>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Gallery;
