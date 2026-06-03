import HeroCTA from "./HeroCTA"
import ClaimListing from '@/components/shared/ClaimListing';
import defaultimage from '@/public/images/thherobg.svg';
import Countday from '@/components/countdownday/countdown';

const TheaterHero = ({ listingId, listingType, data }) => {
    const HeroCTAData = {
        websiteLink: data.website,
        title: data.title,
        email_distributor: data.email_distributor,
        send_send_message_org: data.send_send_message_org,
        key_contacts: data.key_contacts,
        gallery_images: data.gallery_images,
        phone_no: data.phone_no,
    }
    const defaultImage = defaultimage.src;

    const bnrimages = Array.from({ length: 4 }, (_, index) => {
        return data.gallery_images?.[index]?.url || defaultImage;
    });

    const allnullimages = bnrimages.every(image => image === null);

    return (
        <div className="theater-hero relative">
            <div className="theater-hero-media overflow-hidden">
                <div className="imgfig bg-gradient-to-t from-black from-0% via-black/65 via-50% to-transparent to-90% absolute top-0 left-0 w-full h-full z-[1]"></div>
                {1 == 1 ?
                    (<div className={`w-full flex flex-wrap min-w-[1920px] ${allnullimages ? 'min-h-[200px]' : 'min-h-[275px]'}`}>
                        {
                            bnrimages && bnrimages.length > 0 && bnrimages?.map((image: string, index: number) => (
                                <figure key={index} className={`relative w-1/4 ${allnullimages ? 'aspect-[435/265]' : 'aspect-[435/415]'} overflow-hidden bg-gray-800`}>
                                    {image !== null && <img src={image} alt={`hero image ${index + 1}`} className="object-cover object-center h-full w-full bg-gray-100" />}
                                </figure>
                            ))
                        }
                    </div>) :
                    (<div className={`w-full flex flex-wrap min-w-[1920px] ${allnullimages ? 'min-h-[200px]' : 'min-h-[275px]'}`}>
                        <figure className={`relative w-full ${allnullimages ? 'aspect-[435/165]' : 'aspect-[435/80]'} overflow-hidden bg-gray-800`}>
                            {data?.hero_img !== null && <img src={data?.hero_img} alt={`hero image`} className="object-cover object-center h-full w-full bg-gray-100" />}
                        </figure>
                    </div>)
                }
            </div>
            <div className="absolute bottom-0 left-0 w-full z-[26]">
                <div className="container">
                    <div className="theater-hero-info">
                        <div className="flex items-center gap-4 mb-3">
                            <span className="inline-block bg-white text-black font-bold uppercase tracking-wider px-6 py-0.5 rounded-full">{data.top_title ? data.top_title : data.page_title}</span>
                            <p className='mb-0 text-white flex flex-wrap gap-2 items-center'>
                                {data.exhibitor_parent_url && (
                                    <a href={data.exhibitor_parent_url} rel='noreferrer' target='_blank' className='text-white underline hover:no-underline hover:text-gold focus:text-white'>
                                        {data.exhibitor_parent}
                                    </a>
                                )}

                                {data.top_title == 'Theatre' && data.theatre_screens ? data.theatre_screens : null}
                                {data.top_title == 'Theatre' && data.theatre_screens && data.seats ? ', ' : ''}
                                {data.seats ? data.seats : null}

                                {data.no_locations ? data.no_locations : null}
                                {/* {data.no_locations && data.exhibitor_screens ? ', ' : ''} */}
                                {data.exhibitor_screens ? ', ' + data.exhibitor_screens : null}
                                {data.number_of_states ? ', ' + data.number_of_states : null}
                            </p>
                        </div>
                        <h1 className="text-white tracking-normal"><span dangerouslySetInnerHTML={{ __html: data.title }}></span></h1>
                        <div className="my-3"><ClaimListing listingId={listingId} listingType={listingType} listing_title={data.title} claimed={data.is_claimed} is_claimed_under_process={data.is_claimed_under_process} bgblack /></div>
                        <div>
                            {data.address && (
                                <div className='address_direction df fww'>
                                    <p className='mr-2 mb-2'>
                                        <span className='inline-flex gap-2 items-start align-middle mr-2 shrink-0 text-lg text-white' aria-hidden='true'>

                                            <svg width="26" height="26" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M29.5547 13.9387L16.0543 0.43875C15.4692 -0.14625 14.5167 -0.14625 13.9392 0.43875L0.438764 13.9387C-0.146255 14.5237 -0.146255 15.4763 0.438764 16.0613L13.9392 29.5537V29.5613C14.5242 30.1463 15.4768 30.1463 16.0618 29.5613L29.5622 16.0613C30.1472 15.4687 30.1472 14.5237 29.5547 13.9387ZM17.9968 18.7462V14.9962H11.9966V19.4962H8.99649V13.4963C8.99649 12.6638 9.66399 11.9963 10.4965 11.9963H17.9968V8.24624L23.247 13.4963L17.9968 18.7462Z" fill="#ffffff" />
                                            </svg>
                                            {data.address}
                                        </span>
                                    </p>

                                </div>
                            )}
                            {listingType === 'film-festivals' && data.up_start_date && (
                                <div className='festivedate mt-3 ml-1 text-white'>
                                    <div className='text-left'>
                                        <strong> Upcoming Dates: </strong>
                                        <p className='mb-1 flex items-center'>
                                            {data.up_start_date} {data.up_end_date}
                                        </p>
                                    </div>
                                    {data.festival_count_down < 36 && data.festival_count_down != '' && data.festival_count_down != null && (
                                        <span className='releasedateinfo'>
                                            <strong>
                                                Begins In <Countday data={data.festival_count_down} />
                                            </strong>
                                        </span>
                                    )}
                                    <p className='festivedate mt-3 text-base'>
                                        <strong></strong>
                                    </p>
                                </div>
                            )}
                        </div>
                        <HeroCTA {...HeroCTAData} />
                    </div>
                </div>
            </div>
        </div >
    )
};

export default TheaterHero;