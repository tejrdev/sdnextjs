import Link from 'next/link';
import { HiOutlineGlobeAlt, HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import SocialLinksRound from '@/components/DetailPages/SocialLinksRound';
import PressRelease from '@/components/DetailPages/PressRelease';
import FeaturedEvents from '@/components/DetailPages/FeaturedEvents';
import { GetStaticPaths } from 'next';
import Gallery from '@/components/DetailPages/Gallery';
import DirectoryDetailPageForm from '@/components/shared/DirectoryDetailPageForm';
import DirectoryKeyContacts from '@/components/shared/DirectoryKeyContacts';
import 'glightbox/dist/css/glightbox.css';
import { useEffect } from 'react';
import ClaimListing from '@/components/shared/ClaimListing';
import { JSONData } from '@/components/shared/JSONData';
import HeadComponent from '@/components/HeadComponent';

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticProps = async (context) => {
    const { params } = context;
    const associat = params?.associat as string;

    const association = await fetch(`${process.env.NEXT_PUBLIC_SD_API}/detail_pages/associations-detail.php?url=${process.env.NEXT_PUBLIC_BACKEND_URL}/associations/${associat}&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`);
    const associationDetail = await association.json();
    return {
        props: { associationDetail, associat },
        revalidate: 60,
    };
};

const AssociationDetail = ({ associationDetail, associat }: { associationDetail: any, associat: string }) => {
    const websiteLink = associationDetail?.web_links.find((link) => link.select_media === 'Website')?.link || null;
    const associationSEOData = JSONData?.Association_SEOData?.find((data) => data.key === associat);

    const metaTitle = associationSEOData?.metaTitle || '';
    const metaDescription = associationSEOData?.metaDescription || '';
    const canonicalUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/associations/${associat}`;

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
    }, [associationDetail]);

    return (
        <div>
            <HeadComponent data={associationSEOData} meta_title={metaTitle} meta_description={metaDescription} canonical_url={canonicalUrl} />
            <section className="tophero">
                <div className="container py-8 md:py-10">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                        <div className="w-full max-w-[269px]">
                            <div className="aspect-[269/171] overflow-hidden rounded-[7px] bg-neutral-300 border border-gray-400">
                                <img
                                    src={associationDetail?.img}
                                    alt=""
                                    width="269"
                                    height="171"
                                    className="block size-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="w-full pt-2">
                                <SocialLinksRound data={associationDetail?.web_links} />
                            </div>
                        </div>

                        <div className="min-w-0 flex-1 space-y-2">
                            <h1 className="">{associationDetail?.title}</h1>
                            <ClaimListing listingId={associat} listingType="associations" listing_title={associationDetail?.title} claimed={associationDetail?.is_claimed} is_claimed_under_process={associationDetail?.is_claimed_under_process} />
                            <p className="m-0 font-bold">{associationDetail?.address}</p>
                            <span className="m-0" dangerouslySetInnerHTML={{ __html: associationDetail?.content }} />
                            <div className="flex flex-wrap gap-3 pt-1 md:gap-4">
                                {websiteLink && (
                                    <a
                                        href={websiteLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-black p-[2px] font-medium text-black transition-colors hover:bg-neutral-50">
                                        <span className="flex size-7 items-center justify-center rounded-full bg-black text-white">
                                            <HiOutlineGlobeAlt className="size-4" aria-hidden />
                                        </span>
                                        <span className="pr-3 inline-block">Visit Webpage</span>
                                    </a>
                                )}
                                <a
                                    href="#directory-detail-page-form"
                                    className="inline-flex items-center gap-2 rounded-full border border-black p-[2px] font-medium text-black transition-colors hover:bg-neutral-50 glightboxmsg">
                                    <span className="flex size-7 items-center justify-center rounded-full bg-black text-white">
                                        <HiOutlineMail className="size-4" aria-hidden />
                                    </span>
                                    <span className="pr-3 inline-block ">Send Message</span>
                                </a>
                                {associationDetail?.key_contacts && associationDetail?.key_contacts.length > 0 &&
                                    <a
                                        href="#disc_keycontact"
                                        className="inline-flex items-center gap-2 rounded-full border border-black p-[2px] font-medium text-black transition-colors hover:bg-neutral-50 glightboxinfo">
                                        <span className="flex size-7 items-center justify-center rounded-full bg-black text-white">
                                            <HiOutlinePhone className="size-4" aria-hidden />
                                        </span>
                                        <span className="pr-3 inline-block ">Key Contacts</span>
                                    </a>}
                            </div>
                            <DirectoryKeyContacts contacts={associationDetail?.key_contacts} popupId="disc_keycontact" />
                            <DirectoryDetailPageForm
                                recipientTitle={associationDetail?.title ?? ''}
                                emailDistributor={associationDetail?.email_distributor}
                                sendMessageOrg={associationDetail?.send_send_message_org}
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* <Claimlisting
                listingId={associationDetail?.id}
                listingType="associations"
                listing_title={associationDetail?.title}
                claimed={associationDetail?.is_claimed}
                is_claimed_under_process={associationDetail?.is_claimed_under_process}
            /> */}
            {associationDetail?.gallery_images && associationDetail?.gallery_images.length > 0 ? (
                <Gallery data={associationDetail?.gallery_images} />
            ) : null}
            {associationDetail?.press_release && associationDetail?.press_release.length > 0 && <PressRelease data={associationDetail?.press_release} />}
            {associationDetail?.featured_events && associationDetail?.featured_events.length > 0 && <FeaturedEvents data={associationDetail?.featured_events} />}
        </div>
    );
};
export default AssociationDetail;
