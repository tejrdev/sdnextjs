import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';

type ClaimListingProps = {
    listingId: string;
    listingType: string;
    listing_title: string;
    claimed: string;
    is_claimed_under_process: string;
    bgblack?: boolean;
};

const ClaimListing = ({ listingId, listingType, listing_title, claimed, is_claimed_under_process, bgblack = false }: ClaimListingProps) => {
    claimed = claimed || '';
    is_claimed_under_process = is_claimed_under_process || '';
    const router = useRouter();
    const [userLoggedIn, setUserLoggedIn] = useState('');
    const [requestFromQRCode, setRequestFromQRCode] = useState('');
    const [claimURL, setclaimURL] = useState('');
    const [ClaimUnderProcess, setClaimUnderProcess] = useState(false);
    const currentURL = router.asPath;

    useEffect(() => {
        const email = localStorage.getItem('email') || '';
        const enc_login = localStorage.getItem('enc_email') || '';
        const requestFromQRCode = localStorage.getItem('requestFromQRCode') || '';
        const claimURL = localStorage.getItem('claimURL') || '';

        setUserLoggedIn(email);
        setRequestFromQRCode(requestFromQRCode);
        setclaimURL(claimURL);
        if (is_claimed_under_process === 'true') {
            if (claimed === email) setClaimUnderProcess(true);
        }

        if (email !== '' && enc_login !== '' && claimed === '' && is_claimed_under_process === '') {
            setClaimUnderProcess(false);
            const listingUrl = process.env.NEXT_PUBLIC_FRONTEND_URL + '/' + listingType + '/' + listingId;
            axios.post(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/check_submit_claim.php', {
                type: 'POST',
                url: process.env.NEXT_PUBLIC_SD_API + '/detail_pages/check_submit_claim.php',
                data: {
                    login_user: email,
                    url: listingUrl,
                },
                success: function (response) {
                    const resp = JSON.parse(response);
                    if (resp?.is_claimed_under_process === 'true') {
                        setClaimUnderProcess(true);
                    }
                },
            });
        }
    }, []);

    useEffect(() => {
        if (requestFromQRCode === 'true' && claimed === '' && currentURL === claimURL) {
            const qrcodeDiv = document.getElementById('QRCodeListingDiv');
            const bannerDiv = document.getElementById('bannerDiv');
            if (qrcodeDiv !== null && bannerDiv !== null) bannerDiv.prepend(qrcodeDiv);
            (document.querySelector('section.claiming') as HTMLElement).style.display = 'none';
        }
    }, [requestFromQRCode]);
    const manageListing = () => {
        localStorage.setItem('listing_type', listingType);
        localStorage.setItem('listing_id', listingId);
        localStorage.setItem('listing_title', listing_title);
        router.push('/managelisting-admin');
    };

    const pVerifyClaim = () => {
        const enc_login = localStorage.getItem('enc_email');
        const listingUrl = process.env.NEXT_PUBLIC_FRONTEND_URL + '/' + listingType + '/' + listingId;
        let redirectURL = '/verify-claim?listingUrl=' + listingUrl;
        if (userLoggedIn && enc_login) {
            redirectURL += '&email=' + userLoggedIn;
        }
        router.push(redirectURL);
    };

    const pSubmitClaim = () => {
        const enc_login = localStorage.getItem('enc_email');
        const listingUrl = process.env.NEXT_PUBLIC_FRONTEND_URL + '/' + listingType + '/' + listingId;
        let redirectURL = '/submit-claim?listingUrl=' + listingUrl;
        if (userLoggedIn && enc_login) {
            redirectURL += '&email=' + userLoggedIn;
        }
        router.push(redirectURL);
    };

    return (
        <section className='claiminfo mt-[-12px] claiming'>
            {/* check whether listing is climed or not */}
            {claimed !== '' && is_claimed_under_process !== 'true' ? (

                <div className='claimedinfo group relative inline-flex'>
                    {/* //show claimed icon and text */}
                    <div className='claimedinfo-icon inline-flex items-center gap-2 text-[23px] text-indigo-400 font-medium border-t-8 border-t-transparent pb-2'>
                        {/* <svg width='20' height='20' className='icon_svg shrink-0 text-cyan-700 size-5' fill='currentColor'>
                            <path d="M10 1.5625A8.4375 8.4375 0 1 0 18.4375 10 8.44625 8.44625 0 0 0 10 1.5625Zm4.2575 6.85-4.5 4.5a.9375.9375 0 0 1-1.325 0L6.37375 10.855a.9375.9375 0 0 1 1.325-1.325l1.39625 1.39375 3.8375-3.8375a.9375.9375 0 0 1 1.325 1.32625Z"></path>
                        </svg> */}
                        <svg width="26" height="26" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31.6849 13.3193L30.0086 11.6461C29.8042 11.4424 29.6422 11.2003 29.5318 10.9336C29.4214 10.667 29.3649 10.3812 29.3654 10.0926V8.13234C29.3642 6.93969 28.89 5.79622 28.0468 4.95275C27.2036 4.10928 26.0603 3.63467 24.8677 3.63305H22.9074C22.3258 3.63149 21.7683 3.40097 21.3554 2.99139L19.6807 1.31509C18.8364 0.472938 17.6925 0 16.5 0C15.3075 0 14.1636 0.472938 13.3193 1.31509L11.6461 2.99139C11.2328 3.40134 10.6748 3.63236 10.0926 3.63458H8.1308C6.93816 3.63621 5.79485 4.11081 4.95166 4.95428C4.10848 5.79776 3.63427 6.94123 3.63305 8.13387V10.0926C3.63381 10.3811 3.5775 10.6668 3.46738 10.9335C3.35726 11.2001 3.19549 11.4423 2.99139 11.6461L1.31509 13.3193C0.472938 14.1636 0 15.3075 0 16.5C0 17.6925 0.472938 18.8364 1.31509 19.6807L2.99139 21.3539C3.19577 21.5576 3.35782 21.7997 3.46821 22.0664C3.5786 22.333 3.63514 22.6188 3.63458 22.9074V24.8677C3.6358 26.0603 4.11001 27.2038 4.9532 28.0473C5.79638 28.8907 6.93969 29.3653 8.13234 29.367H10.0926C10.6744 29.3689 11.232 29.6 11.6446 30.0101L13.3193 31.6849C14.1634 32.5274 15.3074 33.0006 16.5 33.0006C17.6926 33.0006 18.8366 32.5274 19.6807 31.6849L21.3539 30.0101C21.7672 29.6002 22.3252 29.3692 22.9074 29.367H24.8692C26.0618 29.3653 27.2052 28.8907 28.0483 28.0473C28.8915 27.2038 29.3657 26.0603 29.367 24.8677V22.9074C29.3664 22.6188 29.4229 22.333 29.5333 22.0664C29.6437 21.7997 29.8058 21.5576 30.0101 21.3539L31.6849 19.6807C32.5271 18.8364 33 17.6925 33 16.5C33 15.3075 32.5271 14.1636 31.6849 13.3193ZM21.9188 14.2404L15.7785 20.3807C15.6718 20.4878 15.545 20.5728 15.4054 20.6308C15.2658 20.6888 15.1161 20.7186 14.9649 20.7186C14.8137 20.7186 14.6641 20.6888 14.5244 20.6308C14.3848 20.5728 14.258 20.4878 14.1513 20.3807L11.0812 17.3105C10.8778 17.0923 10.7671 16.8036 10.7724 16.5053C10.7776 16.2071 10.8985 15.9225 11.1094 15.7116C11.3204 15.5006 11.6049 15.3798 11.9032 15.3745C12.2015 15.3693 12.4901 15.48 12.7084 15.6833L14.9649 17.9414L20.2916 12.6163C20.5099 12.4129 20.7985 12.3022 21.0968 12.3075C21.3951 12.3127 21.6796 12.4335 21.8906 12.6445C22.1015 12.8554 22.2224 13.14 22.2276 13.4383C22.2329 13.7365 22.1222 14.0252 21.9188 14.2434V14.2404Z" fill="#7192FF" />
                        </svg>
                        Claimed
                    </div>
                    <div
                        className='invisible absolute left-0 top-full z-50 w-[min(18rem,calc(100vw-2rem))] rounded-md bg-[#333] px-3 py-2.5 text-left text-sm font-normal text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:visible group-hover:opacity-100'
                        role='tooltip'>
                        <span
                            className='pointer-events-none absolute -top-1 left-3 h-0 w-0 border-x-[6px] border-x-transparent border-b-[6px] border-b-[#333]'
                            aria-hidden
                        />
                        {
                            // claimed then check whether user is logged in or not
                            userLoggedIn !== '' && userLoggedIn !== null ? (
                                // logged in then check whether user is manager of this listing or not
                                <>
                                    <p className='m-0 leading-snug'>
                                        {claimed === userLoggedIn ? 'This business has been claimed and you are a manager of this business.' : 'This business has been claimed by the owner or a representative.'}
                                    </p>
                                    {claimed === userLoggedIn ?
                                        <>
                                            <Link className={'cursor-pointer underline hover:no-underline tracking-wide font-bold mr-2 text-white hover:text-orange-400'} href={'/managelisting-admin'} onClick={manageListing}>
                                                Click here
                                            </Link>
                                            to make changes.
                                        </> : <Link href='/claim-your-buisness' className='mt-1.5 inline-block text-sm text-[#4A9EFF] underline hover:text-[#6BB0FF]'>
                                            Learn more
                                        </Link>}
                                </>
                            ) : (
                                // if user is not logged in then show this
                                <p className='mb-0'>This listing has been claimed. </p>
                            )
                        }
                    </div>
                </div>
            ) : (
                // if listing is not claimed then
                <div className='unclaimedinfo group relative inline-flex items-center gap-1.5 text-sm kkk'>
                    {/* check if user is coming from View listing QR code func. */}
                    {requestFromQRCode === 'true' && currentURL === claimURL ? (
                        //user coming from view listing page
                        <div id='QRCodeListingDiv' className='listingthink overflow-hidden'>
                            <div className=' flex flex-wrap border-b border-b-gray-400 py-3 mb-1 relative justify-between'>
                                <h3>
                                    Thanks for reviewing your listing. Tell us what you think.
                                    <Link href='/contact-us' className='inline-block mx-4 mt-1 align-top text-gray-600' title='Click here to contact us with any questions. '>
                                        <FaRegQuestionCircle />{' '}
                                    </Link>
                                </h3>
                                <div className='cta space-x-3 '>
                                    <a href='#' className='btn ghostbtn mb-2 font-semibold' data-changes-req='no' onClick={pVerifyClaim}>
                                        It's good
                                    </a>
                                    <a href='#' className='btn ghostbtn font-semibold ' data-changes-req='yes' onClick={pVerifyClaim}>
                                        I’d like to make changes
                                    </a>
                                </div>
                                {/* <span className='absolute text-2xl right-2 top-2 cursor-pointer' onClick={handleQRClick}>
                            <IoCloseCircleOutline />
                          </span> */}
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className='unclaimedinfo-icon inline-flex items-center gap-1.5 text-lg'>
                                <Link href='#' className={`${bgblack ? 'text-white hover:text-white' : 'text-black'} underline hover:no-underline decoration-${bgblack ? 'white' : 'black'} underline-offset-2 hover:text-${bgblack ? 'white/90' : 'black/90'} font-medium border-t-[6px] border-t-transparent pb-2`}>
                                    Unclaimed
                                </Link>
                                <span className={`inline-flex shrink-0 ${bgblack ? 'text-white' : 'text-black'} mt-1 aria-hidden`}>
                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-5 w-5 mt-1'>
                                        <path d="M8 14.75A6.75 6.75 0 1 1 14.75 8 6.757 6.757 0 0 1 8 14.75Zm0-12A5.25 5.25 0 1 0 13.25 8 5.256 5.256 0 0 0 8 2.75Z"></path><path d="M8 8.895a.75.75 0 0 1-.75-.75v-3a.75.75 0 1 1 1.5 0v3a.75.75 0 0 1-.75.75Zm0 2.955a.99.99 0 0 1-1-1 1.01 1.01 0 0 1 .29-.7 1.02 1.02 0 0 1 1.09-.22.917.917 0 0 1 .33.22.869.869 0 0 1 .12.15.57.57 0 0 1 .09.17c.03.06.05.124.06.19A.992.992 0 0 1 8 11.85Z"></path>
                                    </svg>
                                </span>
                            </div>
                            {
                                //check whether login user has requested for claim
                                ClaimUnderProcess ? (
                                    //if user has requested for claim
                                    <div
                                        className='invisible absolute left-0 top-full z-50 w-[min(22rem,calc(100vw-2rem))] rounded-md bg-[#2d2d2d] p-4 text-left text-sm font-normal text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:visible group-hover:opacity-100'
                                        role='tooltip'>
                                        <span
                                            className='pointer-events-none absolute -top-1 left-3 h-0 w-0 border-x-[6px] border-x-transparent border-b-[6px] border-b-[#2d2d2d]'
                                            aria-hidden
                                        />
                                        <p className='m-0 mb-3 font-bold leading-snug'>
                                            Your claim to manage this listing is being reviewed.
                                        </p>
                                        <p className='m-0 mb-3'>
                                            You will receive an email from Screendollars when your claim request is approved.
                                        </p>
                                    </div>
                                ) : (
                                    //normal user flow
                                    <div
                                        className='invisible absolute left-0 top-full z-50 w-[min(22rem,calc(100vw-2rem))] rounded-md bg-[#2d2d2d] p-4 text-left text-sm font-normal text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:visible group-hover:opacity-100'
                                        role='tooltip'>
                                        <span
                                            className='pointer-events-none absolute -top-1 left-3 h-0 w-0 border-x-[6px] border-x-transparent border-b-[6px] border-b-[#2d2d2d]'
                                            aria-hidden
                                        />
                                        <p className='m-0 mb-3 font-bold leading-snug'>
                                            This business has not yet been claimed by the owner or a representative.
                                        </p>
                                        <p className='m-0 mb-3 leading-snug'>
                                            <a href='#' className='font-normal text-[#4A9EFF] underline hover:text-orange-400' onClick={pSubmitClaim}>
                                                Claim this business
                                            </a>
                                        </p>
                                    </div>
                                )}
                        </>)
                    }

                </div>
            )
            }
        </section >
    );
};

export default ClaimListing;