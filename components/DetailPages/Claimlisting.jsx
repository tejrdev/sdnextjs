import look from './Claimlisting.module.scss';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { IoCloseCircleOutline } from 'react-icons/io5';

const Claimlisting = ({ listingId, listingType, listing_title, claimed }) => {
  claimed = claimed || '';
  const claimref = useRef(null);
  const router = useRouter();
  const [userLoggedIn, setUserLoggedIn] = useState('');
  const [requestFromQRCode, setRequestFromQRCode] = useState('');

  const handleClick = () => {
    claimref.current.style.height = 0;
  };

  useEffect(() => {
    const $ = window.jQuery;
    const email = localStorage.getItem('email');
    const enc_login = localStorage.getItem('enc_email');
    const requestFromQRCode = localStorage.getItem('requestFromQRCode'); //'true';
    setUserLoggedIn(email);
    setRequestFromQRCode(requestFromQRCode);
    localStorage.removeItem('requestFromQRCode'); //remove this var after setting state variable
    $('.claim-listing').magnificPopup({
      type: 'inline',
      preloader: false,
      focus: '#name',
      disableOn: function () {
        if (email && enc_login) {
          $('.pRedirectToLogin').click();
          return false;
        }
        return true;
      },
      // When elemened is focused, some mobile browsers in some cases zoom in
      // It looks not nice, so we disable it:
      callbacks: {
        beforeOpen: function () {
          if ($(window).width() < 700) {
            this.st.focus = false;
          } else {
            this.st.focus = '#name';
          }
        },
      },
    });

    $(document).on('click', '.pRedirectToLogin', function (e) {
      e.preventDefault();
      localStorage.setItem('listing_type', listingType);
      localStorage.setItem('listing_id', listingId);
      localStorage.setItem('listing_title', listing_title);
      //redirect to login if not sign in
      $('.mfp-close').click();
      if (!userLoggedIn && !enc_login) {
        router.push('/login');
      } else {
        router.push('/claim-listing');
      }
    });
  }, []);
  const manageListing = () => {
    localStorage.setItem('listing_type', listingType);
    localStorage.setItem('listing_id', listingId);
    localStorage.setItem('listing_title', listing_title);
    router.push('/managelisting-admin');
  };
  return (
    <section className={look.Claiming + ' secspace toplinesec claiming'} ref={claimref}>
      <div className='container'>
        <div className={look.cliamlistbox + ' theater_infobox df fww pvr'}>
          <div className='theater_socialmedia'></div>
          <div className={look.theater_infodetail}>
            <div className={look.df + ' df fww'}>
              {/* check whether listing is climed or not */}
              {claimed !== '' ? (
                // claimed then check whether user is logged in or not
                userLoggedIn !== '' && userLoggedIn !== null ? (
                  // logged in then check whether user is manager of this listing or not
                  claimed === userLoggedIn ? (
                    // if manager then show this
                    <>
                      <h3>This listing has been claimed. </h3>
                      <p className='w-full'>
                        You are the manager of this listing. Click
                        <Link className={look.ghostbtn + ' ghostbtn goldbtn uppercase printdochide'} href={'/managelisting-admin'} onClick={manageListing}>
                          here
                        </Link>
                        to update your information.
                      </p>
                      <p className='w-full'>
                        Click
                        <Link className={look.ghostbtn + ' ghostbtn goldbtn uppercase printdochide'} href={'/contact-us'}>
                          here
                        </Link>
                        to contact the Screendollars support team with any questions.
                      </p>
                    </>
                  ) : (
                    // if not manager then show this
                    <>
                      <h3>This listing has been claimed. </h3>
                      <p className='w-full'>
                        Click
                        <Link className={look.ghostbtn + ' ghostbtn goldbtn uppercase printdochide'} href={'/contact-us'}>
                          here
                        </Link>
                        to contact the Screendollars support team with any questions.
                      </p>
                    </>
                  )
                ) : (
                  // if user is not logged in then show this

                  <>
                    <h3 style={{ marginBottom: '40px' }}>This listing has been claimed. </h3>
                    <p className='w-full'>
                      If you are a manager of this listing,
                      <Link className='btn uppercase pRedirectToLogin' href={'/login'} title='Log In'>
                        log in
                      </Link>
                      to update information.
                    </p>
                    <p className='w-full'>
                      Click
                      <Link className={look.ghostbtn + ' ghostbtn goldbtn uppercase printdochide'} href={'/contact-us'}>
                        here
                      </Link>
                      to contact the Screendollars support team with any questions.
                    </p>
                  </>
                )
              ) : (
                // if listing is not claimed then
                <>
                  {/* check if user is coming from View listing QR code func. */}
                  {requestFromQRCode === 'true' ? (
                    //user coming from view listing page
                    <>
                      <h3>This listing has not yet been claimed.</h3>
                      <p className='w-full'>Tell us what do you think about this listing? [It’s OK as is] [I’d like to make a few changes] </p>
                      <p className='w-full'>
                        Click
                        <Link className={look.ghostbtn + ' ghostbtn goldbtn uppercase printdochide'} href={'/contact-us'}>
                          here
                        </Link>
                        to contact the Screendollars support team with any questions.
                      </p>
                    </>
                  ) : (
                    //normal user flow
                    <>
                      <h3>This listing has not yet been claimed.</h3>
                      <p className='w-full'>
                        Click
                        <a className={look.ghostbtn + ' claim-listing termtxt ghostbtn goldbtn uppercase printdochide'} href='#claimsignin' data-effect='mfp-move-from-top'>
                          here
                        </a>
                        to claim this listing.
                      </p>
                    </>
                  )}

                  {/* <p className='w100'>Verify to immediately update theatre information, respond to reviews, and more!</p> */}
                  <span className={look.closeclaim} onClick={handleClick}>
                    <IoCloseCircleOutline />
                  </span>
                </>
              )}
            </div>
          </div>
          <div className='disc_keycontact  white-popup-block mfp-hide' mfp-align-top='' id='claimsignin' style={{ maxWidth: 400 }}>
            <h2>Please Sign In</h2>
            <p>In Order To Claim Your Listing You Must Sign In / Sign Up To Screendollars</p>
            <Link className='btn uppercase pRedirectToLogin' href={'/login'} title='Sign In'>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Claimlisting;
