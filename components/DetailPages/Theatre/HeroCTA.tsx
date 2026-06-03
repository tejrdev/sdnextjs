import DirectoryDetailPageForm from '@/components/shared/DirectoryDetailPageForm';
import DirectoryKeyContacts from '@/components/shared/DirectoryKeyContacts';
import { useEffect, useRef, useState } from 'react';
import 'glightbox/dist/css/glightbox.css';


const HeroCTA = ({ websiteLink, title, email_distributor, send_send_message_org, key_contacts, gallery_images, phone_no }: { websiteLink: string, title: string, email_distributor: string, send_send_message_org: string, key_contacts: any[], gallery_images: any[], phone_no: string }) => {
    const handleViewAllClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setShowViewAllModal(true);
    };
    const [showViewAllModal, setShowViewAllModal] = useState(false);
    const lightboxRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || gallery_images?.length === 0) return;

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
    }, [gallery_images, showViewAllModal]);

    useEffect(() => {
        let lightbox: { destroy: () => void } | null = null;
        import('glightbox').then((mod) => {
            const GLightbox = mod.default;
            lightbox = GLightbox({
                selector: '.glightboxinfo, .glightboxmsg',
                skin: 'round',
                closeButton: false,
                height: 'auto',
                width: '700px',
            });
            document.addEventListener('click', (e) => {
                if (e.target instanceof HTMLElement && e.target.closest('.myglightclose')) {
                    (lightbox as any).close();
                }
            });
        });

        return () => {
            lightbox?.destroy();
        };
    }, [gallery_images, showViewAllModal]);

    return (
        <div className="mb-5">
            <div className="flex flex-wrap gap-3 justify-between items-center">
                <div className="flex flex-wrap gap-3 pt-1 md:gap-4">
                    {websiteLink && (
                        <a
                            href={websiteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white p-[2px] font-medium text-white transition-colors hover:bg-neutral-50 focus:text-gray-200">
                            <span className="flex size-7 items-center justify-center rounded-full bg-white text-black hover:bg-neutral-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
                                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
                                </svg>
                            </span>
                            <span className="pr-3 inline-block">Visit Website</span>
                        </a>
                    )}
                    <a
                        href="#directory-detail-page-form"
                        className="inline-flex items-center gap-2 rounded-full border border-white p-[2px] font-medium text-white transition-colors hover:bg-neutral-50 glightboxmsg">
                        <span className="flex size-7 items-center justify-center rounded-full bg-white text-black hover:bg-neutral-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                            </svg>
                        </span>
                        <span className="pr-3 inline-block ">Send Message</span>
                    </a>
                    {phone_no && (
                        <a
                            href={`tel:${phone_no.replace(/[^0-9]/g, '')}`}
                            className="inline-flex items-center gap-2 rounded-full border border-white p-[2px] font-medium text-white transition-colors hover:bg-neutral-50 md:pointer-events-none">
                            <span className="flex size-7 items-center justify-center rounded-full bg-white text-black hover:bg-neutral-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                </svg>
                            </span>
                            <span className="pr-3 inline-block ">{phone_no}</span>
                        </a>
                    )}
                    {key_contacts && key_contacts.length > 0 &&
                        <a
                            href="#disc_keycontact"
                            className="inline-flex items-center gap-2 rounded-full border border-white p-[2px] font-medium text-white transition-colors hover:bg-neutral-50 glightboxinfo">
                            <span className="flex size-7 items-center justify-center rounded-full bg-white text-black hover:bg-neutral-50">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                </svg> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                </svg>
                            </span>
                            <span className="pr-3 inline-block ">Key Contacts</span>
                        </a>}
                </div>
                <div className="galcta pt-1">
                    {gallery_images && gallery_images?.length > 4 && (
                        <a href="#media_galleryall" className="bg-gray-600 hover:bg-gray-200 glightboxmsg text-white px-6 py-1 capitalize rounded-full font-medium transition-all duration-300" onClick={handleViewAllClick}>
                            view all {gallery_images?.length} photos
                        </a>
                    )}
                </div>
                <DirectoryKeyContacts contacts={key_contacts} popupId="disc_keycontact" />
                <DirectoryDetailPageForm
                    recipientTitle={title ?? ''}
                    emailDistributor={email_distributor}
                    sendMessageOrg={send_send_message_org}
                />
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
                            {gallery_images?.length === 0 ? (
                                <p className='text-center text-gray-500 py-8'>No images available</p>
                            ) : (
                                <ul className='list-none grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 m-0 p-0'>
                                    {gallery_images?.map((item, index) => {
                                        const imageUrl = item.url;
                                        const caption = item.caption;

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
            </div>
        </div>
    )
}

export default HeroCTA