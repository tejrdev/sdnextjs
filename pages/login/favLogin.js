import React, { useState, useEffect, useRef } from 'react';
import { signIn, getCsrfToken } from 'next-auth/react';
import { useSession,getSession } from 'next-auth/react';
import SignUp from '../../components/Login/SignUp';
import ForgotPassword from '../../components/Login/ForgotPassword';
import validator from 'validator';
//import GoogleSign from './GoogleSign';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
var CryptoJS = require("crypto-js");
const LOGIN_URL = '/login';



const SUCCESS = 'Login Sucessfully. Please wait while we are redirecting.. ';
const VALID_CHECK = 'Error : Invalid Details. Please try again later!';
//const LOGGED_EMAIL = localStorage.getItem('email');
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const DEFAULT_URL =process.env.NEXT_PUBLIC_LOGIN_URL;
const ENCT_KEY = process.env.NEXT_PUBLIC_ENC_KEY;

const $ = require('jquery');

const FavLogin = ({ csrfToken }) => {
  const userRef = useRef();
  const errRef = useRef();
  const router = useRouter();
  const { data: session, status } = useSession()
  const [isLoading,setIsLoading] = useState(true);
  var username ='';

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

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [forgotError, setForgotError] = useState('');
  const [forgotSucess, setForgotSucess] = useState('');



  async function signInWithGoogle (){
    if (typeof window !== 'undefined') {
       localStorage.setItem('sign_status','login');//login
    }

    signIn('google',{callbackUrl:'/success'});
  }


  const passshow = () =>{
    setPasswordVisible(!passwordVisible);
  }


  if (status === "authenticated") {
    //console.log(session,'-coming here');
   // console.log(session.user.email,session.user.name,session.user.email,session.user.image)
    var username = session.user.email;
  }


  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const validateEmail = (e) => {
    var email = e.target.value;

    if  ( email !== null &&  validator.isEmail(email)) {
      setUser(email);
      setEmailError('');
    } else {
      setUser(email);
      setEmailError('Please Enter Valid Email');
    }
  };

  const validationEmail = (email) => {
    if (email !== null && validator.isEmail(email)) {
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
      //console.log(JSON.parse(JSON.stringify(response?.data?.user_email)));
      const userAvatar = JSON.parse(JSON.stringify(response?.data?.user_avatar));
      const userAvatarTitle = JSON.parse(JSON.stringify(response?.data?.avatar_title));
      const userName = JSON.parse(JSON.stringify(response?.data?.user_name));
      // setAuth({ userEmail });
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
        setSuccess(true);setError(false);
        const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), ENCT_KEY).toString();
        //alert('inside success case');
        localStorage.setItem('enc_email', encryptedUser);
        localStorage.setItem('email', user);
        localStorage.setItem('avatar', avatarImage);
        localStorage.setItem('avatarTitle', userAvatarTitle);
        localStorage.setItem('username', userName);
        localStorage.setItem('from', '');
        setTimeout(function () {
          router.push('/favorite');

          setSuccess('');
          setError('');
          window.location.reload();
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
    <><form>
      <section className="profileinfobox">
        <div className="container">
          <Link href="/" title="Sign In" id="redirectLogin">
            {' '}
          </Link>
          <div className="login_signin ">
            <div className="loginbox">
              <h2></h2>
              <p className="greytxt">
                <small>Sign in or Sign up to keep track of your favorite Movies and Stars and find showtimes at theatres near you.</small>
              </p>
              <div className="googlesignin">
              { /* <GoogleSign method="signingoogle" />*/ }
              <span onClick={signInWithGoogle}>Sign In with Google</span>
                <div className="ormaillogin greytxt">
                  <span>
                    <small>or Sign In with Email </small>
                  </span>
                </div>
              </div>
              <div className="signing_inbox">

                {error ? (
                  <div ref={errRef} className=" {errMsg ? 'successerror' : ''}" id="errormessage">
                    <div className="errormsg "> {errMsg}</div>
                  </div>
                ) : (
                  ''
                )}
                {emailError ? <div className="errormsg "> {emailError} </div> : ''}
                {success ? <div className="successmsg "> {SUCCESS} </div> : ''}
                <div className="fieldbox">
                  <label htmlFor="user">
                    {' '}
                    <strong>Email</strong>
                    <sup>*</sup>
                  </label>
                  <input  name="csrfToken"  type="hidden"  defaultValue={csrfToken}  />
                  <input type="email" id="user" ref={userRef} value={user} placeholder="Enter your email" required  onChange={(e) => validateEmail(e)} />
                </div>
                <div className="fieldbox">
                  <label>
                    {' '}
                    <strong htmlFor="userpassword">Password</strong>
                    <sup>*</sup>
                  </label>
                  <input type={passwordVisible ? 'text' : 'password'} className='passinfoinput smallinput' value={pwd} minLength="8" placeholder="Enter password"  required onChange={(e) => setPwd(e.target.value)} />
                  <i className={passwordVisible ? 'eyeico fas fa-eye' : 'eyeico fas fa-eye-slash'} onClick={() => passshow('')}></i>
                </div>
                <div className="fieldbox df just-between checklink">
                  <div className="checklinkitem">
                    <input type="checkbox" name="remember" className="displaynone" id="rememberCheck" value={remember} defaultChecked={true} />
                    <label htmlFor="rememberCheck">
                      <span>Remember me</span>
                    </label>
                  </div>
                  <Link href="#" className="forgotpas_link">
                    Forgot Password?
                  </Link>
                </div>
                <div>
                  <span id="loadericon" className="displaynone">
                    Loading ...
                  </span>
                  <input type="submit" onClick={handleSubmit} value="SIGN IN"
                  className="wpcf7-form-control wpcf7-submit loginClick input" />
                </div>

              </div>
              <p className="noregister">
              Not registered yet?{' '}
                <Link href="#" className="accountgenerate">
                    Create an account
                </Link>
              </p>
            </div>
            <div className="signup_box" style={{ display: 'none' }}>
             <SignUp />
            </div>

              <ForgotPassword />
          </div>
        </div>
      </section>
      </form>
    </>
  );
};

export default FavLogin;
