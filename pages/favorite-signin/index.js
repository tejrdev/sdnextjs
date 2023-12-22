import React from 'react';
import {useState} from 'react';
import dynamic from 'next/dynamic';
import Image from "next/image";
import favstaticbg from "../../public/images/favstaticbg.jpg";


const Intro= dynamic(() => import('./intro'), {
        ssr: false,
      })


const FavoriteMain = () =>{
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const passshow = () =>{
    setPasswordVisible(!passwordVisible);
  }
return (<>
    <Intro />

    <section className="staticfavsec pvr">
    <div className="container">
        <Image className='favstaticbg' src={favstaticbg} alt=' ' />
    </div>

    <div className="login_signin ">
  <div className="loginbox">
    <h2>Sign In</h2>
    <p className="greytxt">
      <small>Screendollars: Everything about the Movies</small>
    </p>
    <div className="googlesignin">
      <span>Sign In with Google</span>
      <div className="ormaillogin greytxt">
        <span>
          <small>or Sign In with Email </small>
        </span>
      </div>
    </div>
    <div className="signing_inbox">
      <div className="fieldbox">
        <label for="user">
          <strong>Email</strong>
          <sup>*</sup>
        </label>
        <input name="csrfToken" type="hidden" value="" />
        <input type="email" id="user" placeholder="Enter your email" value="" />
      </div>
      <div className="fieldbox">
        <label>
          <strong for="userpassword">Password</strong>
          <sup>*</sup>
        </label>
        <input type={passwordVisible ? 'text' : 'password'} className='passinfoinput smallinput' minlength="8" placeholder="Enter password" value="" />
        <i className={passwordVisible ? 'eyeico fas fa-eye' : 'eyeico fas fa-eye-slash'} onClick={() => passshow('')}></i>
      </div>
      <div className="fieldbox df just-between checklink">
        <div className="checklinkitem">
          <input type="checkbox" name="remember" className="displaynone" id="rememberCheck" value="Yes" checked="" />
          <label for="rememberCheck">
            <span>Remember me</span>
          </label>
        </div>
        <a className="forgotpas_link" href="/login/#">Forgot Password?</a>
      </div>
      <div>
        <span id="loadericon" className="displaynone">Loading ...</span>
        <input type="submit" className="wpcf7-form-control wpcf7-submit loginClick input" value="SIGN IN" />
      </div>
    </div>
    <p className="noregister">Not registered yet? <a className="accountgenerate" href="/login/#">Create an account</a>
    </p>
  </div>
  <div className="signup_box" style={{display: "none"}}>
    <h2>Sign Up</h2>
    <p className="greytxt">
      <small>Screendollars: Everything about the Movies </small>
    </p>
    <div className="googlesignin">
      <span>Sign Up with Google</span>
      <div className="ormaillogin greytxt">
        <span>
          <small>or Sign Up with Email</small>
        </span>
      </div>
    </div>
    <div className="signing_inbox">
      <div className="fieldbox">
        <label>
          <strong>Email</strong>
          <sup>*</sup>
        </label>
        <input type="email" placeholder="Enter your email" />
      </div>
      <div className="fieldbox">
        <label>
          <strong>Choose Password</strong>
          <sup>*</sup>
        </label>
        <input type={passwordVisible ? 'text' : 'password'} className='passinfoinput smallinput' placeholder="Enter password" />
        <i className={passwordVisible ? 'eyeico fas fa-eye' : 'eyeico fas fa-eye-slash'} onClick={() => passshow('')}></i>
      </div>
      <p className="passinstruction greytxt">
        <small>Must contain at least 8 characters including 1 number and 1 special character. </small>
      </p>
      <div className="fieldbox df just-between checklink">
        <div className="checklinkitem">
          <input type="checkbox" name="term" id="termCheck" value="yes" checked="" style={{display: "none"}} />
          <label for="termCheck">
            <span>I agree to the <a href={'https://live.screendollars.com/wp-content/themes/screendollars/assets/doc/Terms-of-use-agreement-Screendollars.pdf'} target='_blank'>Terms &amp; Conditions.</a>
            </span>
          </label>
        </div>
      </div>
      <div>
        <span id="loadericons" className="displaynone">Loading ...</span>
        <input type="submit" className="wpcf7-form-control wpcf7-submit loginClick input" value="SIGN UP" />
      </div>
    </div>
    <p className="noregister">Already have an account? <span className="accountsigning">Sign In</span>
    </p>
  </div>
  <div className="verifymail" style={{display: "none"}}>
    <span className="popclose">+</span>
    <h2>Verify Email</h2>
    <p>
      <small>Enter the email associated with your profile and we’ll send you a link to create a new password.</small>
    </p>
    <div>
      <input type="submit" className="wpcf7-form-control wpcf7-submit loginClick input" value="RE-SEND" />
    </div>
  </div>
  <div className="forgotpass" style={{display: "none"}}>
    <span className="popclose" id="pop_cloase">+</span>
    <h2>Forgot Password?</h2>
    <p>
      <small>Enter the email associated with your profile and we’ll send you a link to create a new password.</small>
    </p>
    <div className="fieldbox">
      <label>
        <strong>Email</strong>
        <sup>*</sup>
      </label>
      <input type="email" placeholder="Enter your email" value="" />
    </div>
    <div>
      <input type="submit" className="wpcf7-form-control wpcf7-submit loginClick input" value="SEND LINK" />
    </div>
    <p className="noregister">Link not received? <span className="sendingagain">Send again.</span>
    </p>
  </div>
</div>
</section>

    </>
    )

}


export default FavoriteMain;