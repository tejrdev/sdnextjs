import React, { useState, useEffect, useRef } from 'react';
import { signIn, getCsrfToken } from 'next-auth/react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { checkLocalStorageVariable } from '../../components/Login/localStorageUtil';
import { Planselect } from '@/components/Products/Paychoose';
import LayoutPro from '@/components/Layout/LayoutPro';
import { auth, reset as resetAuth } from '../../redux/features/auth/authSlice';
import { checkout, reset as resetCheckout } from '../../redux/features/checkout/checkoutSlice';
import { createCustomer } from '@/components/Pro/Stripe';
import { useDispatch } from 'react-redux';

import SignUp from './signup';
import ForgotPassword from '../../components/Login/ForgotPassword';
import validator from 'validator';
//import GoogleSign from './GoogleSign';
import Link from 'next/link';
import axios from 'axios';
var CryptoJS = require('crypto-js');
const LOGIN_URL = '/login';

const SUCCESS = 'Login Sucessfully. Please wait while we are redirecting.. ';
const VALID_CHECK = 'Error : Invalid Details. Please try again later!';
//const LOGGED_EMAIL = localStorage.getItem('email');
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const DEFAULT_URL = process.env.NEXT_PUBLIC_LOGIN_URL;
const ENCT_KEY = process.env.NEXT_PUBLIC_ENC_KEY;

const $ = require('jquery');

export default function Login({ csrfToken }) {
  const userRef = useRef();
  const errRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  var username = '';

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [signEmail, setSignEmail] = useState('');
  const [signPassword, setSignPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [remember, setRemember] = useState('Yes');
  const [forgot, setForgot] = useState('');
  const [loggedMessge, setLoggedMessge] = useState('');
  const [emailError, setEmailError] = useState('');

  const [forgotError, setForgotError] = useState('');
  const [forgotSucess, setForgotSucess] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const userLoggedIn = checkLocalStorageVariable('email');
    const enc_login = checkLocalStorageVariable('enc_email');
    if (userLoggedIn && enc_login) {
      router.push('/pro');
    }
  }, []);

  const passshow = () =>{
    setPasswordVisible(!passwordVisible);
  }

  async function signInWithGoogle() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sign_status', 'login'); //login
    }

    //signIn('google',{callbackUrl:DEFAULT_URL+'gsuccess'});  window.location.href='http://sd-nextjs.vercel.app/pro';
    signIn('google', { callbackUrl: '/gsuccess' });
    // signIn('google',{callbackUrl:'https://screendollars.com/gsuccess'});
  }

  if (status === 'authenticated') {
    //console.log(session,'-coming here');
    // console.log(session.user.email,session.user.name,session.user.email,session.user.image)
    var username = session.user.email;
  }

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setUser(email);
      setEmailError('');
    } else {
      setUser(email);
      setEmailError('Please Enter Valid Email');
    }
  };

  const validationEmail = (email) => {
    if (validator.isEmail(email)) {
      return true;
    } else {
      return false;
    }
  };

  const signupEmail = (value) => {
    var result = validationEmail(value);
    if (result === true) {
      setSignEmail(value);
      setSignupError('');
    } else {
      setSignEmail('');
      setSignupError('Please enter valid email');
    }
  };

  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  useEffect(() => {
    $('.loginbox .accountgenerate').on('click', function () {
      $(this).parents('.loginbox').next().show();
      $(this).parents('.loginbox').hide();
    });
    $('.signup_box .accountsigning').on('click', function () {
      $(this).parents('.signup_box').prev().show();
      $(this).parents('.signup_box').hide();
    });

    $('.login_signin .popclose').click(function () {
      $(this).parents('.login_signin ').find('.loginbox').show();
      $(this).parent().hide();
    });

    $('.forgotpas_link').click(function () {
      $(this).parents('.login_signin').find('.forgotpass').show();
      $(this).closest('.loginbox').hide();
    });
  });

  const getForgotEmail = (e) => {
    e.preventDefault();
    axios
      .get(API_URL + '/forgot_password/', {
        params: {
          auth: window.btoa(forgot),
        },
      })
      .then((res) => {
        var resultContent = Object.values(res.data);
        if (resultContent.length === 0) setForgotError(FORGOT_ERROR);
        else setForgotSucess(FORGOT_SUCCESS);

        setTimeout(function () {
          setForgotSucess('');
          setForgotError('');
        }, 3000);
      });
  };

  const handleSubmit = async (e) => {
    $('#loadericon').show();
    e.preventDefault();
    var url_login = API_URL + '/login/';
    const response = await axios.get(url_login, {
      params: {
        auth: window.btoa(user),
        t: window.btoa(pwd),
        from: '',
      },
    });
    var responseDetails = Object.entries(response.data);
    $('#loadericon').hide();
    if (responseDetails.length && emailError === '') {
      const error = response.data.error ? JSON.parse(JSON.stringify(response?.data?.error)) : '';
      if (error !== '') {
        setSuccess(false);
        setError(true);
        setErrMsg(error);
        setTimeout(function () {
          setSuccess('');
          setError('');
        }, 10000);
        return false;
      }

      const userAvatar = JSON.parse(JSON.stringify(response?.data?.user_avatar));
      const userAvatarTitle = JSON.parse(JSON.stringify(response?.data?.avatar_title));
      const userName = JSON.parse(JSON.stringify(response?.data?.user_name));
      const typeLink = JSON.parse(JSON.stringify(response?.data?.type_link));
      const notifications = JSON.stringify(response?.data?.notifications);
      const startDate = JSON.parse(JSON.stringify(response?.data?.startDate));
      const endDate = JSON.parse(JSON.stringify(response?.data?.endDate));
      const customer = JSON.parse(JSON.stringify(response?.data?.customer));
      const latitude = JSON.parse(JSON.stringify(response?.data?.latitude));
      const longitude = JSON.parse(JSON.stringify(response?.data?.longitude));
      const pincode = JSON.parse(JSON.stringify(response?.data?.pincode));
      const dataToStore = notifications;
      localStorage.setItem('myNotifciations', dataToStore);
      setUser('');
      setPwd('');
      setSuccess(true);
      setError(false);

      const emailStatus = user;
      var avatarImage = '';
      let urlElements = window.location.href.split('/login');
      if (userAvatar) {
        avatarImage = userAvatar;
      }

      if (typeof window !== 'undefined') {
        setSuccess(true);
        setError(false);
        const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), ENCT_KEY).toString();
        //alert('inside success case');
        localStorage.setItem('enc_email', encryptedUser);
        localStorage.setItem('email', user);
        localStorage.setItem('avatar', avatarImage);
        localStorage.setItem('avatarTitle', userAvatarTitle);
        localStorage.setItem('username', userName);
        localStorage.setItem('type_link', typeLink);
        localStorage.setItem('from', '');
        localStorage.setItem('latitude', latitude);
        localStorage.setItem('longitude', longitude);
        localStorage.setItem('pincode', pincode);

        const ProInd = typeLink === 'pro' ? 'Y' : 'N';
        // if (typeLink !== 'pro') {//add this condition after receiving customerID from WP
        let stripeCustomer = customer;
        //create customer in Stripe
        if (customer === '' || customer === null || customer === undefined) {
          const cust = await createCustomer(user);
          stripeCustomer = cust.customer.id;
        }
        dispatch(checkout({ user, stripeCustomer }));
        // }
        const subscriber = CryptoJS.AES.encrypt(user + '_' + ProInd, ENCT_KEY).toString();
        dispatch(auth({ user, subscriber, endDate, latitude, longitude, pincode }));

        setInterval(() => {
          //for removing localstoragevarialbe after 24 hrs
          alert('Session Time Out!');
          localStorage.clear();
          location.reload();
          router.push('/pro');
        }, 86400000);
        setTimeout(function () {
          if (typeLink === 'pro') {
            router.push('/pro');
          } else {
            router.push('/pro/checkout');
          }
          // window.location.href = "/pro";
          setSuccess('');
          setError('');
        }, 3000);
      }
    } else {
      setSuccess(false);
      setError(true);
      setErrMsg(VALID_CHECK);
      setTimeout(function () {
        setSuccess('');
        setError('');
      }, 10000);
    }
  };

  return (
    <>
      <form>
        <section className='profileinfobox'>
          <div className='container'>
            <Link href='/' title='Sign In' id='redirectLogin'>
              {' '}
            </Link>
            {/* <h1 className='text-center uppercase'>Sign up now to TRY IT for free !</h1> */}
            <div className='pricesignup df fww'>
              {/* <div className="pricinginfo">
              <h3>Pricing starting November 1</h3>
              <p>Billing options</p>
              <Planselect />
            </div> */}
              <div className='login_signin'>
                <div className='loginbox'>
                  {/* <h2>Sign In</h2>
                <p className="greytxt">
                  <small>Screendollars:  Everything about the Movies</small>
                </p> */}
                  <div className='googlesignin'>
                    {/* <GoogleSign method="signingoogle" />*/}
                    <span onClick={signInWithGoogle}>Sign In with Google</span>
                    <div className='ormaillogin greytxt'>
                      <span>
                        <small>or Sign In with Email </small>
                      </span>
                    </div>
                  </div>
                  <div className='signing_inbox'>
                    {error ? (
                      <div ref={errRef} className=" {errMsg ? 'successerror' : ''}" id='errormessage'>
                        <div className='errormsg '> {errMsg}</div>
                      </div>
                    ) : (
                      ''
                    )}
                    {emailError ? <div className='errormsg '> {emailError} </div> : ''}
                    {success ? <div className='successmsg '> {SUCCESS} </div> : ''}
                    <div className='fieldbox'>
                      <label htmlFor='user'>
                        {' '}
                        <strong>Email</strong>
                        <sup>*</sup>
                      </label>
                      <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                      <input type='email' id='user' ref={userRef} value={user} placeholder='Enter your email' onChange={(e) => validateEmail(e)} />
                    </div>
                    <div className='fieldbox'>
                      <label>
                        {' '}
                        <strong htmlFor='userpassword'>Password</strong>
                        <sup>*</sup>
                      </label>
                      <input type={passwordVisible ? 'text' : 'password'} value={pwd} minLength='8' placeholder='Enter password' onChange={(e) => setPwd(e.target.value)} className='passinfoinput'/>
                      <i className={passwordVisible ? 'eyeico fas fa-eye' : 'eyeico fas fa-eye-slash'} onClick={() => passshow('')}></i>
                    </div>
                    <div className='fieldbox df just-between checklink'>
                      <div className='checklinkitem'>
                        <input type='checkbox' name='remember' className='displaynone' id='rememberCheck' value={remember} defaultChecked={true} />
                        <label htmlFor='rememberCheck'>
                          <span>Remember me</span>
                        </label>
                      </div>
                      <Link href='#' className='forgotpas_link'>
                        Forgot Password?
                      </Link>
                    </div>
                    <div>
                      <span id='loadericon' className='displaynone'>
                        Loading ...
                      </span>
                      <input type='submit' onClick={handleSubmit} value='SIGN IN' className='wpcf7-form-control wpcf7-submit loginClick input' />
                    </div>
                  </div>
                  <p className='noregister'>
                    Not registered yet?{' '}
                    <Link href='/pro/signup' className='accountgenerate'>
                      Create an account
                    </Link>
                  </p>
                </div>
                <div className='signup_box' style={{ display: 'none' }}></div>

                <ForgotPassword />
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}

Login.getLayout = function (page) {
  return <LayoutPro>{page}</LayoutPro>;
};
