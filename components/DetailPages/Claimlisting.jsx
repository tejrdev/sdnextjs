import look from './Claimlisting.module.scss'
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const Claimlisting = () => {
   const claimref = useRef(null);
   const [claimlist, setClaimlist] = useState(true);
   const handleClick = () => {
      claimref.current.style.height = 0;
   }
   useEffect(() => {
      const $ = window.jQuery;
      $('.termtxt').magnificPopup({
         type: 'inline',
         preloader: false,
         focus: '#name',

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
   }, []);
   return (
      <section className={look.Claiming + " secspace toplinesec "} ref={claimref}>
         <div className="container">
            <div className={look.cliamlistbox + " theater_infobox df fww pvr"}>
               <div className="theater_socialmedia"></div>
               <div className={look.theater_infodetail}>
                  <div className={look.df + " df fww"}>
                     {claimlist ? 
                        <h3>Own this business?</h3> : 
                        <h3>You are authorized to manage this listing</h3>
                     }
                     {claimlist ?  <a className={look.ghostbtn + " termtxt ghostbtn goldbtn uppercase printdochide"} href="#claimsignin" data-effect="mfp-move-from-top">
                        Claim Listing</a> :

                        <Link className={look.ghostbtn + " ghostbtn goldbtn uppercase printdochide"} href={"/managelisting-admin/"}> manage listing </Link>}

                  </div>
                  <p className='w100'>Verify to immediately update theatre information, respond to reviews, and more!</p>
                  <span className={look.closeclaim} onClick={handleClick}>+</span>
               </div>
               <div className="disc_keycontact  white-popup-block mfp-hide" mfp-align-top="" id="claimsignin" style={{ maxWidth: 400 }}>
                  <h2>Please Sign In</h2>
                  <p>In Order To Claim Your Listing You Must Sign In / Sign Up To Screendollars</p>
                  <Link className="btn uppercase" href={'/login'} title='Sign In'>Sign in</Link>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Claimlisting