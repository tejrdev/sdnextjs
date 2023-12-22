import React, { useState, useEffect, useRef, useContext } from 'react';
import { checkLocalStorageVariable } from '../../components/Login/localStorageUtil';
import { useSession, getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Planselect } from '@/components/Products/Paychoose';
import LayoutPro from '@/components/Layout/LayoutPro';
import ForgotPassword from '../../components/Login/ForgotPassword';
import validator from 'validator';
//checkout reducer for get and pass to state
import { useDispatch } from 'react-redux';
import { checkout } from '../../redux/features/checkout/checkoutSlice';
import { createCustomer } from '@/components/Pro/Stripe';
import Loader from '@/components/Loader';

const $ = require('jquery');
const ENCT_KEY = process.env.NEXT_PUBLIC_ENC_KEY;
var CryptoJS = require('crypto-js');

const SIGNIN_ERROR = ' Error: Email Id Not Registered';

const SIGN_SUCCESS = 'Success: Email Id Registerd Successfully';

const VALID_PASS = 'Please Enter Valid PASSWORD';
const VALID_EMAIL = 'Please Enter Valid Email';
const VALID_DETAIL = 'Please Enter Valid Details';
const CHECK_TERMS = 'Please Check Terms & Conditions';
const SIGN_SUCCESS_EMAIL = 'Please Check Your Email To Activate Your Account';
const API_URL = process.env.NEXT_PUBLIC_SD_API;

const SignUp = () => {
  const router = useRouter();
  const [signEmail, setSignEmail] = useState(null);
  const [signPassword, setSignPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [signupSucess, setSignupSucess] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');
  const [signupEmailError, setSignupEmailError] = useState(null);
  const [signupCheckError, setSignupCheckError] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [verifyOTPError, setVerifyOTPError] = useState(null);
  const [verifyOTPSucess, setVerifyOTPSucess] = useState(null);

  //useDispatch updates the store with the state from a component, as defined by your logic inside the checkoutslice.js
  const dispatch = useDispatch();

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setPasswordVisible(!passwordVisible);
    } else if (field === 'confirmPassword') {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  const time = new Date();
  time.setDate(time.getDate() + 30);
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const trialEndDate = time.toLocaleDateString('en-US', dateOptions);

  useEffect(() => {
    const userLoggedIn = checkLocalStorageVariable('email');
    const enc_login = checkLocalStorageVariable('enc_email');
    if (userLoggedIn && enc_login) {
      router.push('/pro');
    }
    // Listen to paste on the document
    document.addEventListener('paste', function (e) {
      // if the target is a text input
      if (e.target.type === 'text' && e.target.classList.contains('otpinputsbox')) {
        var data = e.clipboardData.getData('Text');
        var Numericdata = parseInt(data) || 0;
        if (data.length === 6 && Numericdata !== 0) {
          data = data.toString().split('');
          // find all other text inputs
          [].forEach.call(document.querySelectorAll('input[type=text]'), (node, index) => {
            // And set input value to the relative character
            node.value = data[index];
          });
        }
      }
    });
  }, []);

  const validationEmail = (email) => {
    if (email !== null && validator.isEmail(email)) return true;
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

  const handleChange = (event) => {
    !event.target.checked ? setSignupCheckError(CHECK_TERMS) : setSignupCheckError('');
    // setIsAgree(current => !current);
  };

  const clickGoogle = () => {
    $('.nsm7Bb-HzV7m-LgbsSe-MJoBVe').click();
  };

  async function signUpWithGoogle() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sign_status', 'signup');
    }
    signIn('google', { callbackUrl: '/gsuccess' });
  }

  const handleSignUp = async (e) => {
    $('#loadericons').show();
    e.preventDefault();
    var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;
    // if (validationEmail(signEmail) === false) {
    //   setSignupEmailError(VALID_EMAIL);
    //   $("#loadericons").hide();
    // } else {
    //   setSignupEmailError(null);
    // }

    let inputCode;
    $('.otpinputs input').each((index, item) => {
      if (index === 0) {
        inputCode = item.value;
      } else {
        inputCode += item.value;
      }
    });
    inputCode = parseInt(inputCode);

    if (inputCode === verificationCode) {
      setVerifyOTPError(null);
      setVerifyOTPSucess('Code verified successfully.');
    } else {
      setVerifyOTPSucess(null);
      setVerifyOTPError('Invalid code, Please try again!');
      $('#loadericons').hide();
      return false;
    }

    // if (reg.test(signPassword) === false || signPassword.length == 0) {
    //   setSignupError(VALID_PASS);
    //   $("#loadericons").hide();
    // } else {
    //   setSignupError("");
    // }

    // if (reg.test(signPassword) === false || validationEmail(signEmail) === false) {
    //   setSignupEmailError("Please enter valid password");
    //   return false;
    // } else {
    if (signEmail !== '' && signPassword !== '' && reg.test(signPassword) === true && validationEmail(signEmail) === true) {
      setSignupError('');
      setSignupEmailError(null);
      var signup_url = API_URL + '/SD_PRO/signup.php';
      const response = await axios.get(signup_url, {
        params: {
          auth: window.btoa(signEmail),
          t: window.btoa(signPassword),
          p: window.btoa(''),
          typeLink: 'default',
        },
      });
      var myObject = response.data;

      if (myObject['user_error'] === 1) {
        $('#loadericons').hide();
        setSuccess(null);
        setError(true);
        const SIGN_ALREADY = `Good news!   ${signEmail} has already signed up for Screendollars PRO.`;
        setSignupSucess(SIGN_ALREADY);

        setSignEmail(null);
        setSignPassword(null);
        setConfirmPassword(null);

        setTimeout(() => {
          router.push('/pro/login');
        }, 3000);
      } else {
        $('#loadericons').hide();
        setSuccess(SIGN_SUCCESS_EMAIL);
        setError(false);
        setSignupError(null);
        setSignEmail(null);
        setSignPassword(null);
        setConfirmPassword(null);
        const userAvatar = myObject['user_avatar'];
        const userAvatarTitle = myObject['avatar_title'];
        const userName = myObject['user_name'];
        const userEmail = myObject['user_email'];
        const notifications = myObject['notifications'];
        const userTypeLink = myObject['type_link'];
        const dataToStore = JSON.stringify(notifications);
        localStorage.setItem('myNotifciations', dataToStore);
        if (typeof window !== 'undefined') {
          setSuccess(true);
          setError(false);
          const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(userEmail), ENCT_KEY).toString();
          //alert('inside success case');
          localStorage.setItem('enc_email', encryptedUser);
          localStorage.setItem('email', userEmail);
          localStorage.setItem('avatar', userAvatar);
          localStorage.setItem('avatarTitle', userAvatarTitle);
          localStorage.setItem('username', userName);
          localStorage.setItem('type_link', userTypeLink);
          localStorage.setItem('from', '');

          //on success, create customer in stripe
          // createCustomer(signEmail);
          const cust = await createCustomer(signEmail);
          const subscriberPlan = $('.pricinginfo .planboxitem.active').data('plan');
          dispatch(checkout({ user: signEmail, stripeCustomer: cust.customer.id, stripePlan: subscriberPlan }));

          setInterval(() => {
            //for removing localstoragevarialbe after 24 hrs
            alert('Session Time Out!');
            localStorage.clear();
            location.reload();
            router.push('/pro');
          }, 86400000);
          setTimeout(function () {
            // window.location.href = "/pro/thankyou";
            router.push('/pro/checkout');
            setSuccess('');
            setError('');
          }, 1000);
        }
      }
    } else {
      $('#loadericons').hide();
      setSuccess(null);
      setError(true);
      setSignupError(VALID_DETAIL);
      setSignEmail(null);
      setSignPassword(null);
      setConfirmPassword(null);
    }
    // }
  };

  const SendEmailToCustomer = async (email, otp) => {
    // send emaill to customer for OTP verification
    const encryptedCode = btoa(otp);
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/otp.php?email_id=' + email + '&otp=' + encryptedCode);
      // console.log(response);
      return response.data;
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    }
  };

  const pVerifyEmail = async (e) => {
    $('#loadericons').show();
    e.preventDefault();

    var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;
    if (validationEmail(signEmail) === false) {
      setSignupEmailError(VALID_EMAIL);
      $('#loadericons').hide();
    } else {
      setSignupEmailError(null);
    }
    if (reg.test(signPassword) === false) {
      setSignupError(VALID_PASS);
      $('#loadericons').hide();
      return false;
    } else {
      setSignupError('');
    }

    if (reg.test(signPassword) === false || validationEmail(signEmail) === false) {
      setSignupEmailError('Please enter valid password');
      return false;
    }
    if (confirmPassword !== signPassword) {
      setSignupEmailError("Passwords didn't match");
      $('#loadericons').hide();
      return false;
    }

    const code = Math.floor(100000 + Math.random() * 900000);
    setVerificationCode(code);
    // console.log(code);
    $('#loadericons').hide();
    setVerifyOTPError(null);
    setVerifyOTPSucess(null);
    const res = await SendEmailToCustomer(signEmail, code);
    if (res.registered === 'true') {
      const SIGN_ALREADY = `Good news!   ${signEmail} has already signed up for Screendollars PRO.`;
      setSignupSucess(SIGN_ALREADY);
      setTimeout(() => {
        router.push('/pro/login');
      }, 3000);
      return false;
    } else if (res.status === 200) {
      $('.loginbox').hide();
      $('.optsigninbox').show();
      setVerifyOTPSucess(res.message);
      return true;
    }
  };
  return (
    <>
      <section className='profileinfobox'>
        <div className='container'>
          <Link href='/' title='Sign In' id='redirectLogin'>
            {' '}
          </Link>
          <h1 className='text-center '>Sign Up Now to Try It for Free</h1>
          <div className='pricesignup df fww'>
            <div className='pricinginfo'>
              <h3>Pricing</h3>
              <h5>Choose Your Billing Option</h5>
              <Planselect />
              <p>
                Your subscription <strong>begins with a 30-day free trial</strong>
              </p>
              <ul className='goldbullet'>
                <li>Cancel anytime</li>
                <li>
                  <strong>You won't be charged</strong> if you cancel before <strong>{trialEndDate}</strong>
                </li>
                <li>We’ll email a reminder two days before your free trial ends</li>
                <li>Payment details provided in the next step</li>
              </ul>
            </div>
            <div className='login_signin'>
              <div className='loginbox'>
                <h3>Enter Your Contact Information</h3>
                <p className='noregister'>
                  Already have an account?{' '}
                  <Link href={'/pro/login'} className='accountsigning'>
                    Sign In
                  </Link>
                </p>
                <div className='googlesignin'>
                  <span onClick={signUpWithGoogle}>Sign Up with Google</span>
                  <div className='ormaillogin greytxt'>
                    <span>
                      <small>or Sign Up with Email</small>
                    </span>
                  </div>
                </div>
                {success ? <div className='successmsg '> Account Created Successfully</div> : ''}
                {signupEmailError ? (
                  <div className=' validations'>
                    {' '}
                    <div className='errormsg '> {signupEmailError}</div>
                  </div>
                ) : (
                  ''
                )}
                {signupSucess ? <div className='successmsg '> {signupSucess}</div> : ''}
                {signupError ? <div className='errormsg '> {signupError}</div> : ''}
                {signupCheckError ? (
                  <div className=' validations'>
                    {' '}
                    <div className='errormsg '> {signupCheckError}</div>
                  </div>
                ) : (
                  ''
                )}
                <form>
                  <div className='signing_inbox'>
                    <div className='fieldbox'>
                      <label>
                        {' '}
                        <strong>Email</strong>
                        <sup>*</sup>
                      </label>
                      <input type='email' placeholder='Enter your email' onChange={(e) => setSignEmail(e.target.value)} />{' '}
                    </div>
                    <div className='fieldbox'>
                      <label>
                        {' '}
                        <strong>Choose Password</strong>
                        <sup>*</sup>
                      </label>
                      <input type={passwordVisible ? 'text' : 'password'} placeholder='Enter Password' required='' onChange={(e) => setSignPassword(e.target.value)} className='passinfoinput' />
                      <i className={passwordVisible ? 'eyeico fas fa-eye' : 'eyeico fas fa-eye-slash'} onClick={() => togglePasswordVisibility('password')}></i>
                    </div>
                    <p className='passinstruction greytxt'>
                      <small>Must contain at least 8 characters including 1 number, 1 capital letter and 1 special character. </small>
                    </p>
                    <div className='fieldbox'>
                      <input type={confirmPasswordVisible ? 'text' : 'password'} placeholder='Confirm Password' required='' onChange={(e) => setConfirmPassword(e.target.value)} className='passinfoinput' />
                      <i className={confirmPasswordVisible ? 'eyeico fas fa-eye' : 'eyeico fas fa-eye-slash'} onClick={() => togglePasswordVisibility('confirmPassword')}></i>
                    </div>
                    {/* <div>
                    <button onClick={pVerifyEmail}>Verify Email</button>
                    <input type='text' id='verification-code' />
                  </div> */}
                    <div className='fieldbox df just-between checklink'>
                      <div className='checklinkitem'>
                        <input style={{ display: 'none' }} type='checkbox' name='term' id='termCheck' value='yes' defaultChecked={true} onChange={handleChange} />
                        <label htmlFor='termCheck'>
                          <span>
                            I agree to the <a href='#'>Terms & Conditions.</a>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <span id='loadericons' className='displaynone'>
                        Loading ...
                      </span>
                      <input type='submit' value='continue' onClick={pVerifyEmail} className='uppercase ' />
                    </div>
                  </div>
                </form>
              </div>
              <div className='signup_box' style={{ display: 'none' }}></div>

              <div className='optsigninbox' style={{ display: 'none' }}>
                <h3>Verify Your Contact Information</h3>
                <p>
                  Please Check Your Inbox. We Have Sent a 6-Digit Code to <br /> <strong>{signEmail}</strong>
                </p>
                <h5>
                  <strong>Enter 6-Digit Code</strong>
                </h5>
                <div id='otpinputs' className='otpinputs df fww'>
                  <input className='otpinputsbox' type='text' inputMode='numeric' maxLength='1' />
                  <input className='otpinputsbox' type='text' inputMode='numeric' maxLength='1' />
                  <input className='otpinputsbox' type='text' inputMode='numeric' maxLength='1' />
                  <input className='otpinputsbox' type='text' inputMode='numeric' maxLength='1' />
                  <input className='otpinputsbox' type='text' inputMode='numeric' maxLength='1' />
                  <input className='otpinputsbox' type='text' inputMode='numeric' maxLength='1' />
                </div>
                {verifyOTPSucess ? <div className='successmsg '> {verifyOTPSucess}</div> : ''}
                {verifyOTPError ? <div className='errormsg '> {verifyOTPError}</div> : ''}
                <input type='submit' value='verify & signup' className='wpcf7-form-control wpcf7-submit loginClick input uppercase otpctasubmit' onClick={handleSignUp} />
              </div>

              {/* <ForgotPassword /> */}

              <div hidden className='signup-loader'>
                <Loader />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
SignUp.getLayout = function (page) {
  return <LayoutPro>{page}</LayoutPro>;
};
