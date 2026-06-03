import axios from 'axios';
import { useState, useEffect } from 'react';
import driveinicon from '../../public/images/driveinicon2.svg';

import SocialLinks from './SocialLinks';
import AddToAny from '../../components/AddToAny';
import Countday from '../../components/countdownday/countdown';
import AdminEditLink from './AdminEditLink';
import DirectoryDetailPageForm from '@/components/shared/DirectoryDetailPageForm';
import DirectoryKeyContacts from '@/components/shared/DirectoryKeyContacts';
import ClaimListing from '@/components/shared/ClaimListing';
import 'glightbox/dist/css/glightbox.css';
import Image from 'next/image';
import userproico from '@/public/images/userproico.svg';
import chaticon from '@/public/images/chat.svg';

const ERRORLOGIN = 'Please Login First! ';
if (typeof window !== 'undefined') {
    var LOGGED_EMAIL = localStorage.getItem('email');
}

const DirectoryInfo = ({ listingId, listingType, data, requestfrom, favoriteList }) => {
    const API_URL = process.env.NEXT_PUBLIC_SD_API;
    const ID = data.id as number;
    const [domLoaded, setDomLoaded] = useState(false);
    const [items, setItems] = useState<number[]>([]);
    let theatermap = data?.directions?.replace(/#/g, '%20');

    let address = data.address;
    address = address;


    useEffect(() => {
        let lightbox: { destroy: () => void } | null = null;
        let lightboximg: { destroy: () => void } | null = null;
        import('glightbox').then((mod) => {
            const GLightbox = mod.default;
            lightbox = GLightbox({
                selector: '.glightboxinfo, .glightboxmsg',
                skin: 'round',
                closeButton: false,
                height: 'auto',
                width: '700px',
            });
            lightboximg = GLightbox({
                selector: '.glightboximg',
                skin: 'imgonly',
                closeButton: true,
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
            lightboximg?.destroy();
        };
    }, [data]);

    useEffect(() => {
        if (favoriteList == 1) {
            setItems([ID]);
        }
    }, [favoriteList]);

    useEffect(() => {
        const $ = window.jQuery;

        setDomLoaded(true);
        $(document).on('click', 'li.sharing span', function () {
            $(this).parent().find('.addtoany_shortcode').toggleClass('open');
        });

        $('.readmore_btn').click(function () {
            $(this).closest('.theater_infodisc').toggleClass('open');
            $(this).hide();
        });
        if ($('.theater_infodiscin').height() < 186) {
            $('.theater_infodiscin').next('.readmore_btn').hide();
        } else {
            $('.theater_infodiscin').next('.readmore_btn').show('inline-block');
            $('.theater_infodiscin').css('height', '182px');
        }

    }, []);

    const favoriteHeart = (favoriteId, favoriteType) => {
        const addFavoriteAll = async () => {
            if (LOGGED_EMAIL === null || LOGGED_EMAIL === '') {
                alert(ERRORLOGIN);
                return false;
            }
            var favmobvie_addurl = API_URL + '/login/favorite_all.php';
            // setLoadingFav(LOADER);
            await axios
                .get(favmobvie_addurl, {
                    params: {
                        email: window.btoa(LOGGED_EMAIL),
                        favoriteType: window.btoa(favoriteType),
                        favoriteId: window.btoa(favoriteId),
                    },
                })
                .then((res) => {
                    // console.log(res.data);
                    setItems(res.data);
                });
        };
        addFavoriteAll();
    };
    const imgurl = data.img ? data.img : data.logo;

    let phoneNumbers = data.phone_no;
    let splitNumbers = phoneNumbers?.split(/\s*,\s*/);
    let splitvancat;
    if (data?.category?.length) {
        let vancat = data?.category;
        splitvancat = vancat?.split(/\s*,\s*/);
    }

    return (
        <section className={'theater_infobox printarea ' + (data.hero_img ? 'pt-2' : ' pt-9 lg:pt-2')}>
            {data.hero_img && (
                <div className='detailherobg relative z-0 mb-4'>
                    <img src={data.hero_img} alt='Hero Image' className='objimg' />
                </div>
            )}
            <div id='bannerDiv' className='container'>
                <div className='theaterinfo_box df fww just-between relative z-[1] pt-9 md:pt-6'>
                    <div className='print_top hide printdochide'>
                        <div className='top_info'>
                            <h2 className='h5'>{data.top_title ? data.top_title : data.page_title}</h2>
                        </div>
                    </div>

                    <AdminEditLink data={data} />
                    <div className='theater_socialmedia sm:-order-none pr-0 w-full max-w-64 sm:w-48 lg:w-[250px] sm:pr-5 lg:pr-14'>
                        <div className='theater_socialsticky'>
                            <div className={`theaterinfo_media p-1 border  pvr rounded-md ${data.is_featured === 1 ? 'border-gold' : 'border-gray-400'}`}>
                                {data.is_featured === 1 && <div className='featuredtag'>Featured</div>}
                                <figure className={`brandimg pvr w-full min-h-32 flex items-center justify-center ${data.is_featured === 1 ? ' border-gold' : ''}`}>
                                    {imgurl && imgurl.substring(imgurl.lastIndexOf('/') + 1) === 'noimgico.jpg' ? (
                                        <img src={imgurl} alt='' className={data.top_title === 'Theatre' ? 'objimg' : ''} />
                                    ) : (
                                        <a href={imgurl} className='image-link glightboximg'>
                                            <img src={imgurl} alt='' className={data.top_title === 'Theatre' ? 'objimg' : ''} />
                                            <div className='figoverlay'>
                                                <i className='far fa-search-plus'></i>
                                            </div>
                                        </a>
                                    )}
                                </figure>
                            </div>
                            <div className='border-b border-gray-300'>
                                <SocialLinks data={data} />
                            </div>

                            {requestfrom === 'filmfestival' && data.up_start_date && (
                                <div className='festivedate border-b border-gray-300 mt-3 text-base'>
                                    <div className='text-center'>
                                        <strong> Upcoming Dates: </strong>
                                        <p className='mb-1 w-32 mx-auto'>
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

                            <div className='theater_econtact printdochide  pt-2 hidden sm:block'>
                                <ul className='list-none m-0 text-center'>
                                    {data.website && (
                                        <li className='mb-2 inline-block'>
                                            <a href={data.website} target='_blank' rel='noreferrer' className='text-black hover:underline'>
                                                <i className='far fa-globe mr-2'></i>Official Website
                                            </a>
                                        </li>
                                    )}
                                    {data.phone_no && (
                                        <li className='mb-2 inline-block'>
                                            {splitNumbers?.map((item, i) => (
                                                <a href={`tel:` + parseInt(item.replace(/[^0-9]/g, ''))} target='_blank' key={i} rel='noreferrer' className='text-black hover:underline relative pl-6 flex'>
                                                    <span className='block' title={item}>
                                                        <i className='far fa-phone-alt mr-2 absolute left-0 top-0'></i>
                                                        {item}
                                                    </span>
                                                </a>
                                            ))}

                                            {/* <a href={`tel:` + parseInt(data.phone_no.replace(/[^0-9]/g, ''))} target='_blank' rel='noreferrer' className='text-black hover:underline relative pl-6 flex'>
                        <span className='inline' title={data.phone_no}>
                          {data.phone_no}
                        </span>
                      </a> */}
                                        </li>
                                    )}

                                    <li className='sendmsg_btn printdochide inline-block'>
                                        {/* {(data?.top_title === "Distributor" && data?.distribution_type[0] === "INACTIVE" && data?.top_title === "Exhibitor") ? "" :
                      <a href='#send_message' className='formpop text-black hover:underline'>
                        <img src={process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-content/themes/screendollars-live/assets/images/chat.svg'} alt='' className='img-state inline-block mr-1 max-w-4' /> Send Message inactive
                      </a>}
                    {(data?.top_title !== "Distributor" && data?.top_title !== undefined) &&
                      <a href='#send_message' className={'formpop text-black hover:underline '}>
                        <img src={process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-content/themes/screendollars-live/assets/images/chat.svg'} alt='' className='img-state inline-block mr-1 max-w-4' /> Send Message dist
                      </a>} */}
                                        {data?.distribution_type !== undefined && data?.distribution_type[0] === 'INACTIVE' ? (
                                            ''
                                        ) : (
                                            <>
                                                <a href='#directory-detail-page-form' className='text-black hover:underline glightboxmsg'>
                                                    <Image src={chaticon} alt='Send Message' width={20} height={20} /> Send Message
                                                </a>
                                                <DirectoryDetailPageForm recipientTitle={data?.title || ''} emailDistributor={data?.email_distributor} sendMessageOrg={data?.send_send_message_org} />
                                            </>
                                        )}
                                    </li>

                                    {data.key_contacts && !!data.key_contacts?.length && (
                                        <li className='my-2 pt-2 border-t border-gray-300 inline-block w-full'>
                                            <a href='#disc_keycontact' className=' termtxt printdochide text-black hover:underline glightboxinfo'>
                                                <Image src={userproico} alt="Key Contacts" width={20} height={20} /> Key Contacts
                                            </a>
                                            <DirectoryKeyContacts contacts={data?.key_contacts} />
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='theater_infodetail'>
                        <div className='theater_detsiltop df fww just-between'>
                            <div className='top_txtboxtheater'>
                                <h2 className='h5'>{data.top_title ? data.top_title : data.page_title}</h2>

                                <p className='mb-0'>
                                    {data.exhibitor_parent_url && (
                                        <a href={data.exhibitor_parent_url} rel='noreferrer' target='_blank'>
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
                            <div className='theater_pintshare printdochide'>
                                <ul className='df fww'>
                                    <li className='pritbtn' style={{ display: 'none' }}>
                                        Print
                                    </li>
                                    <li className='sharing'>
                                        <span>
                                            <i className='far fa-share-alt'></i>Share
                                        </span>
                                        {domLoaded && <AddToAny />}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='theaterbasics df fww relative '>
                            <div className={data.top_title === 'Theatre' ? 'theaterbasics_left' : ''}>
                                <h1 className='h2'>
                                    {data.sponser_class && <i className='fas fa-badge-check mr-1'></i>}
                                    <span dangerouslySetInnerHTML={{ __html: data.title }}></span>
                                    {data.top_title === 'Distributor' ? (
                                        <>
                                            <span onClick={() => favoriteHeart(ID, 'fav_dist_listing')} className={'ml-2 mt-2 ' + (items.includes(ID) ? 'favheart  redtxt biofavico' : 'favheart biofavico ')}>
                                                <i className={items.includes(ID) ? 'fas fa-heart' : 'far fa-heart '}></i>
                                            </span>
                                        </>
                                    ) : (
                                        ''
                                    )}
                                    {data.top_title === 'Theatre' ? (
                                        <>
                                            <span
                                                onClick={() => favoriteHeart(ID, 'fav_theatres')}
                                                className={items.includes(ID) ? 'favheart  redtxt biofavico mt-[6px] lg:mt-[2px] mx-3 ' : 'favheart biofavico mt-[6px] lg:mt-[8px] mx-3 '}>
                                                <i className={items.includes(ID) ? 'fas fa-heart' : 'far fa-heart '}></i>
                                            </span>
                                            {data.top_title === 'Theatre' && data.detail_drive_in_icon === 'yes' ? (
                                                <span>
                                                    <img className='diveiconlist' src={driveinicon.src} alt='Drive In' />
                                                </span>
                                            ) : null}
                                        </>
                                    ) : (
                                        ''
                                    )}
                                    {data.top_title === 'Exhibitor' ? (
                                        <>
                                            <span onClick={() => favoriteHeart(ID, 'fav_exhibitors')} className={'ml-2 mt-2 ' + (items.includes(ID) ? 'favheart  redtxt biofavico' : 'favheart biofavico ')}>
                                                <i className={items.includes(ID) ? 'fas fa-heart' : 'far fa-heart '}></i>
                                            </span>
                                        </>
                                    ) : (
                                        ''
                                    )}
                                    {requestfrom === 'VendorDetails' ? (
                                        <>
                                            <span onClick={() => favoriteHeart(ID, 'fav_vendors')} className={'ml-2 mt-2 ' + (items.includes(ID) ? 'favheart  redtxt biofavico' : 'favheart biofavico ')}>
                                                <i className={items.includes(ID) ? 'fas fa-heart' : 'far fa-heart '}></i>
                                            </span>
                                        </>
                                    ) : (
                                        ''
                                    )}
                                    {requestfrom === 'filmfestival' ? (
                                        <>
                                            <span onClick={() => favoriteHeart(ID, 'fav_filmfestivals')} className={'ml-2 mt-2 ' + (items.includes(ID) ? 'favheart  redtxt biofavico' : 'favheart biofavico ')}>
                                                <i className={items.includes(ID) ? 'fas fa-heart' : 'far fa-heart '}></i>
                                            </span>
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </h1>
                                <ClaimListing listingId={listingId} listingType={listingType} listing_title={data.title} claimed={data.is_claimed} is_claimed_under_process={data.is_claimed_under_process} />
                                {data.address && (
                                    <div className='address_direction df fww'>
                                        <p className='mr-2 mb-2'>
                                            <i className='fas fa-map-marker-alt'></i>
                                            {address}
                                        </p>

                                        {data.top_title === 'Distributor' && (
                                            <p className='printdochide'>
                                                <a href={data.directions} target='_blank' rel='noreferrer'>
                                                    <i className='fas fa-directions'></i>
                                                    Get Directions
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div className='theater_econtact'>
                                    <ul className='flex flex-wrap list-none ml-0 mb-2 sm:hidden'>
                                        {data.website && (
                                            <li className='mb-1 mr-4'>
                                                <a href={data.website} target='_blank' rel='noreferrer' className='text-black'>
                                                    <i className='far fa-globe mr-1'></i>Official Website
                                                </a>
                                            </li>
                                        )}

                                        {data.email_id && (
                                            <li className='mb-1 mr-4'>
                                                <a href={'mailto:' + data.email_id} target='_blank' rel='noreferrer' className='text-black'>
                                                    <i className='far fa-envelope mr-1'></i>
                                                    {data.email_id}
                                                </a>
                                            </li>
                                        )}
                                        <li className='mb-1 mr-4'>
                                            {data.phone_no && (
                                                <a href={`tel:` + parseInt(data.phone_no.replace(/-/g, ' '))} target='_blank' rel='noreferrer' className='text-black'>
                                                    <i className='far fa-phone-alt mr-1'></i>
                                                    {data.phone_no}
                                                </a>
                                            )}
                                        </li>
                                        <li className='sendmsg_btn printdochide mb-1 mr-4'>
                                            {data?.distribution_type !== undefined && data?.distribution_type[0] === 'INACTIVE' ? (
                                                ''
                                            ) : (
                                                <a href='#directory-detail-page-form' className='termtxt printdochide text-black hover:underline glightboxmsg'>
                                                    <Image src={chaticon} alt='Send Message' width={20} height={20} /> Send Message
                                                </a>
                                            )}
                                        </li>
                                        {data.key_contacts && !!data.key_contacts?.length && (
                                            <li className='mb-1 mr-4'>
                                                <a href='#disc_keycontact' className='termtxt printdochide text-black hover:underline glightboxinfo'>
                                                    <Image src={userproico} alt="Key Contacts" width={20} height={20} /> Key Contacts
                                                </a>
                                                <DirectoryKeyContacts contacts={data?.key_contacts} />
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                {data?.category && data?.category.length > 0 && (
                                    <div className='detailtaging'>
                                        <ul className='df fww tags'>
                                            {splitvancat.length > 0 &&
                                                splitvancat?.map((item, i) => (
                                                    <li key={i}>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}

                                {data.distribution_type && (
                                    <div className='detailtaging'>
                                        <ul className='df fww tags printdochide'>
                                            {data.distribution_type?.map((item, i) => (
                                                <li key={i}>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {data.genre && !!data.genre?.length && (
                                    <div className='detailtaging'>
                                        <ul className='df fww tags'>
                                            {data.genre.map((item, i) => (
                                                <li key={i}>
                                                    <span>{item.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {data.content && (
                                    <div className='theater_infodisc'>
                                        <div className='theater_infodiscin' dangerouslySetInnerHTML={{ __html: data.content }}></div>
                                        <div className='readmore_btn printdochide'>Read More</div>
                                    </div>
                                )}
                            </div>
                            {data.top_title === 'Theatre' && (
                                <div className='theaterbasics_right printdochide'>
                                    <div className='getonmap'>
                                        {/* http://maps.apple.com/?q=5+Mile+Drive-In+Movie+Theater&sll=42.0577278,-86.1158347 */}
                                        <a href={data.directions.replace('google', 'apple')} target='_blank'>
                                            <iframe
                                                width='232'
                                                height='253'
                                                id='gmap_canvas'
                                                src={theatermap + '&t=&z=13&ie=UTF8&iwloc=&output=embed'}
                                                frameBorder={0}
                                                scrolling="no"
                                                marginHeight={0}
                                                marginWidth={0}></iframe>
                                        </a>
                                    </div>
                                    {/*data.associated_with && data.associated_with.length > 0 && data.associated_with[0] !== '' && (
                    <div className='theater_associate text-center w100'>
                      <p>Associated With</p>
                      <Slider {...SliderSetting} className='associatesider'>
                        {data.associated_with.map((item, i) => (
                          <div className='associateitem text-center' key={i}>
                            <Image src={associated_with[item]} alt='' />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  )*/}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DirectoryInfo;

