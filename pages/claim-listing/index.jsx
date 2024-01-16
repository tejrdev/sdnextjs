import React from 'react'
import look from './claimfrom.module.scss'
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';

const Claimlisting = () => {
  return (
    <section className={look.claimform}>
        <div className="container">
          <div className={look.clamformbox}>
            <h2>Claim Your Listing</h2>
            <p>enter your details and business email we'll send you an email regarding the steps of claiming your listing.</p>
            <div className="claiminbox">
              <div className={look.fieldbox +" fieldbox"}>
                <label htmlFor="user"> <strong>Your Email</strong><sup>*</sup></label>
                <input type="email" id="user" placeholder="Enter your email" required="" value=""></input>
              </div>
              <div className={look.fieldbox +" fieldbox"}>
                <label htmlFor="user"> <strong>Your First Name</strong><sup>*</sup></label>
                <input type="text" id="user" placeholder="Enter your first name" required="" value=""></input>
              </div>
              <div className={look.fieldbox +" fieldbox"}>
                <label htmlFor="user"> <strong>Enter your last name</strong><sup>*</sup></label>
                <input type="text" id="user" placeholder="Enter your email" required="" value=""></input>
              </div>
              <div className={look.fieldbox +" fieldbox"}>
                <label htmlFor="user"> <strong>Your Phone</strong><sup>*</sup></label>
                <IntlTelInput preferredCountries={['US','CA','gb','IN']} style={{width:'100%'}}/>
              </div>
              <div className={look.fieldbox +" fieldbox"}>
                <label htmlFor="user"> <strong>Your Claim Request</strong></label>
                <textarea type="text" id="user" rows="4" placeholder="Tell about your organization and your request to claim this listing" value=""></textarea>
              </div>
              <div>
                <span id="loadericon" className="displaynone">Loading ...</span>
                <input type="submit" className="claimClick btn w100" value="SIGN IN"/>
                <p className={look.cancellink + ' greytxt text-center '}>cancel</p>
              </div>

            </div>
          </div>
        </div>
    </section>
  )
}

export default Claimlisting