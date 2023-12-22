import React, { useState, useEffect } from 'react';
import { signIn, getCsrfToken } from 'next-auth/react';
import { useSession, getSession } from 'next-auth/react';
import LayoutPro from '@/components/Layout/LayoutPro';
import Link from 'next/link';
import { useRouter } from 'next/router';
//checkout reducer for get and pass to state
import { useDispatch } from 'react-redux';
import { checkout } from '../redux/features/checkout/checkoutSlice';

import axios from 'axios';
var CryptoJS = require('crypto-js');

const SUCCESS = 'Success : Please check you email id for reseting password';
const GLOGIN_ERROR = 'Error : Email Id is not registered';
//const LOGGED_EMAIL = localStorage.getItem('email');
const API_URL = process.env.NEXT_PUBLIC_SD_API;
// const DEFAULT_URL =process.env.NEXT_PUBLIC_LOGIN_URL;
const SIGN_SUCCESS = 'Success: Email Id Registerd Successfully';
const SIGN_ALREADY = ' Error: Email Id Already Exists';
const SIGNIN_ERROR = ' Error: Email Id Not Registered';

const SIGNIN_MESSAGE = 'Please wait ...While we are validating details';
const ENCT_KEY = process.env.NEXT_PUBLIC_ENC_KEY;
const $ = require('jquery');

const gsuccess = () => {
  //console.clear();

  const router = useRouter();
  const { data: session, status } = useSession();
  const [gsigninEmailSucess, setGsigninEmailSucess] = useState('');
  const [gmessage, setGmessage] = useState('');
  const [gsigninEmailError, setGsigninEmailError] = useState('');
  const [gsigninEmailAlready, setGsigninEmailAlready] = useState('');
  //useDispatch updates the store with the state from a component, as defined by your logic inside the checkoutslice.js
  const dispatch = useDispatch();

  // Create customer in stripe
  const createCustomer = async (signEmail) => {
    const planId = $('.pricinginfo .planboxitem.active .planprice').attr('id');
    const res = await fetch('/api/stripe/create-customer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: signEmail }),
    });

    const response = await res.json();

    console.log(response);
    dispatch(checkout({ user: signEmail, stripeCustomer: response.customer.id, planId }));
  };

  useEffect(() => {
    const DEFAULT_URL = window.location.origin + '/';
    if (session !== undefined) {
      if (typeof window !== 'undefined') {
        var signStatus = localStorage.getItem('sign_status');
      }
      if (signStatus === 'login') {
        const statusEmailCheck = async () => {
          $('#loadericons').show();
          $('#loadericons').html(SIGNIN_MESSAGE);
          var login_url = API_URL + '/login/';
          const response = await axios
            .get(login_url, {
              params: {
                auth: window.btoa(session?.user?.email),
                t: '',
                from: 'gmail',
              },
            })
            .then((response) => {
              $('#loadericons').hide();
              $('#loadericons').html(' ');
              if (Number(response.data['user_login']) === 1) {
                if (typeof window !== 'undefined') {
                  const responseDetails = response.data;
                  // console.log(responseDetails,'---');

                  const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(session?.user?.email), ENCT_KEY).toString();
                  if (session?.user?.image !== undefined) {
                    const imageUrl = session.user.image;
                    localStorage.setItem('avatar', imageUrl);
                  } else {
                    localStorage.setItem('avatar', '');
                  }
                  localStorage.setItem('enc_email', encryptedUser);
                  localStorage.setItem('email', session?.user?.email);
                  localStorage.setItem('avatarTitle', '');
                  localStorage.setItem('username', '');
                  localStorage.setItem('from', 'gmail');
                  localStorage.setItem('type_link', responseDetails['type_link']);
                  if (responseDetails['type_link'] !== 'pro') {
                    //call stripe API
                    createCustomer(session?.user?.email);
                    router.push('/pro/checkout');
                  } else {
                    router.push('/pro');
                  }
                  //window.location.href='https://screendollars.com/pro/';
                  // window.location.href='http://localhost:3000/pro/';
                  // window.location.href = DEFAULT_URL + "pro/";
                }
              } else {
                setGsigninEmailError(GLOGIN_ERROR);
              }
            })
            .catch((error) => {
              console.error('An error occurred:', error);
            });
        };
        statusEmailCheck();
        // setTimeout(function () {
        //   //window.location.href='http://localhost:3000/pro/login';
        //   window.location.href = DEFAULT_URL + "pro/login";
        //   // window.location.href='https://screendollars.com/pro/login';
        // }, 3000);
      }
      if (signStatus === 'signup') {
        // alert('signup');
        $('#loadericons').show();
        $('#loadericons').html(SIGNIN_MESSAGE);
        const signupGoogle = async () => {
          var signup_url = API_URL + '/SD_PRO/signup.php';
          var picture = session?.user?.image;
          const response = await axios.get(signup_url, {
            params: {
              auth: window.btoa(session?.user?.email),
              t: window.btoa(session?.user?.name),
              p: window.btoa(picture),
              typeLink: 'default',
            },
          });
          var responseDetails = response.data;
          $('#loadericons').html(' ');
          $('#loadericons').hide();
          if (responseDetails['user_error'] === 1) {
            const SIGN_ALREADY = `Good news!  ${session?.user?.email} has already signed up for Screendollars PRO.  Click here to sign in `;
            setGsigninEmailAlready(SIGN_ALREADY);
            setTimeout(function () {
              window.location.href = DEFAULT_URL + 'pro/login';
            }, 3000);
          } else {
            setGsigninEmailSucess(SIGN_SUCCESS);
            setGmessage(null);
            $('#loadericons').hide();
            $('#loadericons').html(' ');
            const userAvatar = responseDetails['user_avatar'];
            const userAvatarTitle = responseDetails['avatar_title'];
            const userName = responseDetails['user_name'];
            const userEmail = responseDetails['user_email'];
            const notifications = responseDetails['notifications'];
            const userTypeLink = 'default';
            const userFrom = responseDetails['user_from'];
            const dataToStore = JSON.stringify(notifications);
            localStorage.setItem('myNotifciations', dataToStore);
            if (typeof window !== 'undefined') {
              const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(userEmail), ENCT_KEY).toString();
              //alert('inside success case');
              localStorage.setItem('enc_email', encryptedUser);
              localStorage.setItem('email', userEmail);
              if (session?.user?.image !== undefined) {
                const imageUrl = session.user.image;
                localStorage.setItem('avatar', imageUrl);
              } else {
                localStorage.setItem('avatar', '');
              }
              localStorage.setItem('avatarTitle', userAvatarTitle);
              localStorage.setItem('username', userName);
              localStorage.setItem('type_link', userTypeLink);
              localStorage.setItem('from', 'gmail');
            }
            // window.location.href='https://screendollars.com/pro/thankyou';
            // window.location.href='http://localhost:3000/pro/thankyou';
            // window.location.href = DEFAULT_URL + "pro/thankyou";

            //call stripe API
            createCustomer(userEmail);
            router.push('/pro/checkout');
          }
        };
        signupGoogle();
      }
    }
  });
  return (
    <>
      <section className='profileinfobox'>
        <div className='container'>
          <Link href='/' title='Sign In' id='redirectLogin'>
            {' '}
          </Link>
          <div className='login_signin '>
            <div className='loginbox'>
              {gsigninEmailError ? <div className='errormsg '> {gsigninEmailError}</div> : ''}
              <div className='validationmsg' id='loadericons' style={{ display: 'none' }}></div>
              {gsigninEmailAlready ? (
                <div className='successmsg '>
                  {' '}
                  <span>{gsigninEmailAlready}</span>
                  <Link href='pro/login'>Login</Link>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default gsuccess;
gsuccess.getLayout = function (page) {
  return <LayoutPro>{page}</LayoutPro>;
};
