import { useState } from 'react'
import look from './claimsuccess.module.scss'

const claimlistsuccess = () => {
  const [clamaccshow, setClamaccshow] =useState(false);
  const cliamacc_created = () => {
    setClamaccshow(!clamaccshow);
  };
  return (
    <section className={look.claimsuccess + " secspace text-center"}>
      <div className="container">
        {console.log(clamaccshow)}
        {!clamaccshow && 
          <div className={look.claimthanks + ' claimthanks'}>
          <h1>Thank You for Submitting Your Claim</h1>
          <p>we have received your request to claim your business and we willshortly reach out to you for the verification process on your email or phone.</p>
          <button type='submit' className={look.nexbtn + " btn uppercase"} onClick={cliamacc_created}>CONTINUE</button>
        </div>
        }
        { clamaccshow && 
          <div className={ look.claim_acccreated + ' claim_acccreated'} >
          <h1>Your Account Has Been Created ! </h1>
          <p>We request you to follow the steps to fill in your information and choices. based on that we will provide you related content and it will make your experience on screendollars better.</p>
          
            <button className={look.nexbtn + " btn uppercase"}>CONTINUE</button>
        </div>
        }

      </div>
    </section>
  )
}

export default claimlistsuccess