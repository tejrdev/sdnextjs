import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Link } from 'next/router';
import axios from 'axios';
const $ = require('jquery');

const SIGN_SUCCESS = 'Success: Email Id Registerd Successfully';
const SIGN_ALREADY = ' Error: Email Id Already Exists';
const SIGNIN_ERROR = ' Error: Email Id Not Registered';
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const SD_API_URL = process.env.PUBLIC_URL;
const REDIRECT_URL = '';
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

const GoogleSign = (props) => {
  const { method } = props;
  const [gsignupEmailSucess, setGsignupEmailSucess] = useState('');
  const [gsignupEmailError, setGsignupEmailError] = useState('');
  const [gsigninEmailSucess, setGsigninEmailSucess] = useState('');
  const [gsigninEmailError, setGsigninEmailError] = useState('');
  const signupGoogle = async (credentials) => {
    $('#loadericons').show(); //alert('coing from ggole');
    var signup_url = API_URL + '/login/signup.php';
    const response = await axios.get(signup_url, {
      params: {
        auth: window.btoa(credentials.email),
        t: window.btoa(credentials.given_name),
        p: window.btoa(credentials.picture),
      },
    });
    var responseDetails = Object.values(response.data);
    $('#loadericons').hide();

    if (responseDetails[0] === 1) {
      setGsignupEmailError(SIGN_ALREADY);
    } else {
      setGsignupEmailSucess(SIGN_SUCCESS);
      var activate_url = SD_API_URL + '/activate/';

      window.location.href = activate_url + responseDetails[0];
    }

    setTimeout(function () {
      setGsignupEmailError('');
      setGsignupEmailSucess('');
    }, 3000);
  };

  const handleSignIn = async (userDetail) => {
    var login_url = API_URL + '/login/';
    const response = await axios.get(login_url, {
      params: {
        auth: window.btoa(userDetail.email),
        t: '',
        from: 'gmail',
      },
    });

    const responseLength = response.data;
    // alert(responseLength.user_avatar);
    if (responseLength.length === 0) {
      setGsigninEmailError(SIGNIN_ERROR);
      setTimeout(function () {
        setGsigninEmailError('');
      }, 3000);
    } else {
      localStorage.setItem('email', userDetail.email);
      localStorage.setItem('from', 'gmail');
      localStorage.setItem('avatar', responseLength.user_avatar);

      document.getElementById('redirectLoginGoogle').click();
      window.location.reload(false);
    }
  };

  return (
    <>
      {method === 'signup' ? (
        <>
          <span id="gSignup">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                signupGoogle(parseJwt(credentialResponse.credential));
              }}
              onError={() => {
                console.log('Signup Failed');
              }}
            />
          </span>
          {gsignupEmailSucess ? <div className="successmsg "> {gsignupEmailSucess}</div> : ''}
          {gsignupEmailError ? <div className="errormsg "> {gsignupEmailError}</div> : ''}
        </>
      ) : (
        ''
      )}

      {method === 'signingoogle' ? (
        <>
          <Link href="/" title="Sign In" id="redirectLoginGoogle">
            {' '}
          </Link>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              //const userDetail = parseJwt(credentialResponse.credential);
              handleSignIn(parseJwt(credentialResponse.credential));
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />

          <div>
            <br />
          </div>
          {gsigninEmailError ? <div className="errormsg "> {gsigninEmailError}</div> : ''}
        </>
      ) : (
        ''
      )}
    </>
  );
};
export default GoogleSign;
