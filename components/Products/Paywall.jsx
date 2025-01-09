import Link from "next/link"
import { useState, useEffect, useRef } from 'react'

const Paywall = () => {
   const [link,setLink] =useState('');
   const [email,setEmail] =useState('');
   useEffect(()=>{
       setLink(localStorage.getItem('type_link'));
       setEmail(localStorage.getItem('email'));
   },[])

   return (
      <section className="paywall secspace">
         <div className="container">
            <div className="paywallin text-center">
               <div className="text-center protitle">
                  <span className="protag uppercase">pro exclusive</span>
               </div>
               <h3>This content is only available to <br/>Screendollars Pro subscribers.</h3>
               {/* <h3>Unlock this newsletter and all of <Link href={'/pro/signup/'}>our pro content</Link> by subscribing to the screendollars pro. you will get <strong>30 day free trial</strong> which gives you full access to all of <Link href={'/pro/'}>our features.</Link> </h3>
                <div className="paypriceing">
                  <h2>$79.99</h2> / month
               </div> */}
               <Link className="btn uppercase" href={'/pro/signup/'}>register for free</Link>
               {/*niche vale do option me se koi ek aayega */}
               {(link !== 'pro' && link !== 'default') ? (
               <p className="mb-0">Already have a profile? <Link href={'/pro/signup/'}>Sign in</Link>.</p>
               ) : (
               <p className="mb-0">You're logged in as <strong>{email}</strong> <br/> <Link href={'/pro/signup/'}><strong>Subscribe now</strong></Link> to access Screendollars Pro content.</p>
               )}
            </div>
         </div>
      </section>
   )
}

export default Paywall