import React, { useState, useEffect, useRef, useContext } from 'react';
import { useSession,getSession,signIn } from 'next-auth/react';
//import GoogleSign from './GoogleSign';
import axios from 'axios';

import validator from 'validator';
const $ = require('jquery');



const SIGNIN_ERROR = ' Error: Email Id Not Registered';


const SIGN_SUCCESS = 'Success: Email Id Registerd Successfully';
const SIGN_ALREADY = ' Error: Email Id Already Exists';
const VALID_PASS = 'Please Enter Valid PASSWORD';
const VALID_EMAIL = 'Please Enter Valid Email';
const VALID_DETAIL = 'Please Enter Valid Details';
const CHECK_TERMS = 'Please Check Terms & Conditions';
const SIGN_SUCCESS_EMAIL = 'Please Check Your Email To Activate Your Account';
const API_URL = process.env.NEXT_PUBLIC_SD_API;

const SignUp = () => {
  const [signEmail, setSignEmail] = useState(null);
  const [signPassword, setSignPassword] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');
  const [signupEmailError, setSignupEmailError] = useState(null);
  const [signupCheckError, setSignupCheckError] = useState(null);

  const [passwordVisible, setPasswordVisible] = useState(false);



  const { data: session, status } = useSession();


  const [gsignupEmailSucess, setGsignupEmailSucess] = useState('');
  const [gsignupEmailError, setGsignupEmailError] = useState('');
  const [gsigninEmailSucess, setGsigninEmailSucess] = useState('');
  const [gsigninEmailError, setGsigninEmailError] = useState('');


  const validationEmail = (email) => {
    if (validator.isEmail(email)) return true;
    else return false;
  };
  const signupSubmit = (e) => {
    e.preventDefault();
    $('#loadericon').show();
    var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,10}$/;
    //alert(reg.test(signPassword));
    setSignupEmailError(validationEmail(signEmail) === false ? VALID_EMAIL : '');
    setSignupError(reg.test(signPassword) === false ? VALID_PASS : '');

  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      signupSubmit();
    }
  };

  const passshow = () =>{
    setPasswordVisible(!passwordVisible);
  }

  const handleChange = (event) => {
    !event.target.checked ? setSignupCheckError(CHECK_TERMS) : setSignupCheckError('');
    // setIsAgree(current => !current);
  };

  const clickGoogle = () => {
    $('.nsm7Bb-HzV7m-LgbsSe-MJoBVe').click();
  };

  async function signUpWithGoogle (){
    if (typeof window !== 'undefined') {
      localStorage.setItem('sign_status','signup');
    }
    signIn('google',{callbackUrl:'/success'});
  }




  const handleSignUp = async (e) => {
    $('#loadericons').show();
    e.preventDefault();
    var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;



if((validationEmail(signEmail)) === false){
  setSignupEmailError(VALID_EMAIL);  $('#loadericons').hide();
}else{
  setSignupEmailError(null);
}


    if((reg.test(signPassword)) === false){
      setSignupError(VALID_PASS); $('#loadericons').hide();
    }else{
      setSignupError('');
    }


    if (reg.test(signPassword) === false || validationEmail(signEmail) === false) {
     // console.log('inside error');
      setSignupEmailError('Please enter valid password');
      return false;
    } else {
      if (signEmail !== '' && signPassword !== '' && reg.test(signPassword) === true && validationEmail(signEmail) === true) {
        setSignupError('');setSignupEmailError(null);
        var signup_url = API_URL + '/login/signup.php';
        const response = await axios.get(signup_url, {
          params: {
            auth: window.btoa(signEmail),
            t: window.btoa(signPassword),
            p: window.btoa(''),
          },
        });
        var responseDetails = Object.values(response.data);
        $('#loadericons').hide();
        if (responseDetails[0] === 1) {
          setSuccess(null);
          setError(true);
          setSignupError(SIGN_ALREADY);
        } else {
          setSuccess(SIGN_SUCCESS_EMAIL);
          setError(false);
          setSignupError(' ');
          setSignEmail(null);
          setSignPassword(null);
        }
      } else {
        $('#loadericons').hide();
        setSuccess(null);
        setError(true);
        setSignupError(VALID_DETAIL);
        setSignEmail(null);
        setSignPassword(null);
      }

      setTimeout(function () {
        setError(null);
        setSignEmail(null);
        setSignPassword(null);
      }, 3000);
    }
  };

  return (
    <>
      {/* <h2>Sign Up</h2>
      <p className="greytxt">
        <small>Screendollars:  Everything about the Movies </small>
      </p> */}
      <div className="googlesignin">
        <span onClick={signUpWithGoogle}>Sign Up with Google</span>
       {/* <GoogleSign method="signup" /> */ }

        <div className="ormaillogin greytxt">
          <span>
            <small>or Sign Up with Email</small>
          </span>
        </div>
      </div>

      {success ? <div className="successmsg "> {success}</div> : ''}
      {signupEmailError ? (
        <div className=" validations">
          {' '}
          <div className="errormsg "> {signupEmailError}</div>
        </div>
      ) : (
        ''
      )}
      {signupError === true ? <div className="errormsg "> {signupError}</div> : ''}
      {signupCheckError ? (
        <div className=" validations">
          {' '}
          <div className="errormsg "> {signupCheckError}</div>
        </div>
      ) : (
        ''
      )}

      <div className="signing_inbox">

        <div className="fieldbox">
          <label>
            {' '}
            <strong>Email</strong>
            <sup>*</sup>
          </label>
          <input type="email" placeholder="Enter your email" onChange={(e) => setSignEmail(e.target.value)}  />{' '}
        </div>
        <div className="fieldbox">
          <label>
            {' '}
            <strong>Choose Password</strong>
            <sup>*</sup>
          </label>
          <input type={passwordVisible ? 'text' : 'password'} className='passinfoinput smallinput'  placeholder="Enter password" onChange={(e) => setSignPassword(e.target.value)} />
          <i className={passwordVisible ? 'eyeico fas fa-eye' : 'eyeico fas fa-eye-slash'} onClick={() => passshow('')}></i>
        </div>
        <p className="passinstruction greytxt">
          <small>Must contain at least 8 characters including 1 number, 1 capital letter and 1 special character. </small>
        </p>
        <div className="fieldbox df just-between checklink">
          <div className="checklinkitem">
            <input style={{ display: 'none' }} type="checkbox" name="term" id="termCheck" value="yes" defaultChecked={true} onChange={handleChange} />
            <label htmlFor="termCheck">
              <span>
                I agree to the <a href={process.env.NEXT_PUBLIC_MENU_URL + 'wp-content/themes/screendollars/assets/doc/Terms-of-use-agreement-Screendollars.pdf'} target='_blank'>Terms & Conditions.</a>
              </span>
            </label>
          </div>
        </div>
        <div>
          <span id="loadericons" className="displaynone">
            Loading ...
          </span>
          <input type="submit" value="SIGN UP" className="wpcf7-form-control wpcf7-submit loginClick input" onClick={handleSignUp} />
        </div>

      </div>
      <p className="noregister">
      Already have an account?  {' '}
        <span className="accountsigning">
          Sign In
        </span>
      </p>
    </>
  );
};

export default SignUp;
