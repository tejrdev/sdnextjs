import look from './Claimlisting.module.scss';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { FaRegQuestionCircle } from 'react-icons/fa';

const Claimlisting = ({ listingId, listingType, listing_title, claimed, is_claimed_under_process }) => {
  claimed = claimed || '';
  is_claimed_under_process = is_claimed_under_process || '';
  const claimref = useRef(null);
  const claimokref = useRef(null);
  const router = useRouter();
  const [userLoggedIn, setUserLoggedIn] = useState('');
  const [requestFromQRCode, setRequestFromQRCode] = useState('');
  const [claimURL, setclaimURL] = useState('');
  const [ClaimUnderProcess, setClaimUnderProcess] = useState(false);
  const currentURL = router.asPath;

  const handleClick = () => {
    claimref.current.style.height = 0;
  };

  //const handleQRClick = () => (claimokref.current.style.height = 0);
  useEffect(() => {
    const $ = window.jQuery;
    const email = localStorage.getItem('email') || '';
    const enc_login = localStorage.getItem('enc_email') || '';
    const requestFromQRCode = localStorage.getItem('requestFromQRCode') || '';
    const claimURL = localStorage.getItem('claimURL') || '';

    setUserLoggedIn(email);
    setRequestFromQRCode(requestFromQRCode);
    setclaimURL(claimURL);
    if (is_claimed_under_process === 'true') {
      if(claimed === email)      setClaimUnderProcess(true);
    }

    if (email !== '' && enc_login !== '' && claimed === '' && is_claimed_under_process === '') {
      setClaimUnderProcess(false);
      const listingUrl = process.env.NEXT_PUBLIC_FRONTEND_URL +'/' + listingType + '/' + listingId;
      $.ajax({
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
      document.querySelector('section.claiming').style.display = 'none';
    }
  }, [requestFromQRCode]);
  const manageListing = () => {
    localStorage.setItem('listing_type', listingType);
    localStorage.setItem('listing_id', listingId);
    localStorage.setItem('listing_title', listing_title);
    router.push('/managelisting-admin');
  };

  const pVerifyClaim = (e) => {
    const enc_login = localStorage.getItem('enc_email');
    const listingUrl = process.env.NEXT_PUBLIC_FRONTEND_URL +'/' + listingType + '/' + listingId;
    let redirectURL = '/verify-claim?listingUrl=' + listingUrl;
    if (userLoggedIn && enc_login) {
      redirectURL += '&email=' + userLoggedIn;
    }
    router.push(redirectURL);
  };

  const pSubmitClaim = (e) => {
    const enc_login = localStorage.getItem('enc_email');
    const listingUrl = process.env.NEXT_PUBLIC_FRONTEND_URL +'/' + listingType + '/' + listingId;
    let redirectURL = '/submit-claim?listingUrl=' + listingUrl;
    if (userLoggedIn && enc_login) {
      redirectURL += '&email=' + userLoggedIn;
    }
    router.push(redirectURL);
  };
  return (
    <section className={look.Claiming + ' secspace toplinesec claiming'} ref={claimref}>
      <div className='container'>
        <div className={look.cliamlistbox + ' theater_infobox df fww pvr'}>
          <div className='theater_socialmedia'></div>
          <div className={look.theater_infodetail}>
            <div className={look.df + ' df fww'}>
              {/* check whether listing is climed or not */}
              {claimed !== '' && is_claimed_under_process !== 'true' ? (
                // claimed then check whether user is logged in or not
                userLoggedIn !== '' && userLoggedIn !== null ? (
                  // logged in then check whether user is manager of this listing or not
                  claimed === userLoggedIn ? (
                    // if manager then show this
                    <>
                      <h3>
                        This listing has been claimed and you are a manager of this listing.
                        <Link className={'cursor-pointer underline hover:no-underline tracking-wide font-bold mx-2 '} href={'/managelisting-admin'} onClick={manageListing}>
                          Click here
                        </Link>
                        to make changes.
                      </h3>
                    </>
                  ) : (
                    // if not manager then show this
                    <>
                      <h3>This listing has been claimed </h3>
                      <Link href='/contact-us' className='inline-block mr-4 mt-2 align-top text-gray-600' title='Click here to contact us with any questions. '>
                        <FaRegQuestionCircle className='text-lg' />
                      </Link>
                    </>
                  )
                ) : (
                  // if user is not logged in then show this
                  <h3 className='mb-3'>This listing has been claimed. </h3>
                )
              ) : (
                // if listing is not claimed then
                <>
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
                  ) : //check whether login user has requested for claim
                  ClaimUnderProcess ? (
                    //if user has requested for claim
                    <>
                      <h3>Your claim to manage this listing is being reviewed.</h3>
                      <p className='w-full'>You will receive an email from Screendollars when your claim request is approved.</p>
                    </>
                  ) : (
                    //normal user flow
                    <h3>
                      This listing has not yet been claimed. If you are the manager,
                      <a href='#' className='mx-2 font-bold underline' onClick={pSubmitClaim}>
                        click here
                      </a>
                      to claim it.
                    </h3>
                  )}

                  {/* <p className='w100'>Verify to immediately update theatre information, respond to reviews, and more!</p> */}
                  <span className={look.closeclaim} onClick={handleClick}>
                    <IoCloseCircleOutline />
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Claimlisting;
