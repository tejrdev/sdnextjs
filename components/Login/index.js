import React, { useState, useEffect, useRef } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import LoginContext from '../../../context/LoginProvider';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import validator from 'validator';
import GoogleSign from './GoogleSign';
import './css/login.css';
//import AuthContext from "../../../context/AuthProvider";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
const LOGIN_URL = '/login';

//import { useGoogleLogin } from '@react-oauth/google';
//import './news.css';

const FORGOT_SUCCESS = 'Success : Please check you email id for reseting password';
const FORGOT_ERROR = 'Error : Email Id Does Not Exists';
const VALID_CHECK = 'Erorr : Invalid Details. Please try again later!';
const LOGGED_EMAIL = localStorage.getItem('email');
const API_URL = process.env.NEXT_PUBLIC_SD_API;

const $ = require('jquery');

const Login = () => {
  //console.clear();
  const navigate = useNavigate();

  // const { emailStatus, loginAction, emailAction } = useContext(LoginContext);

  //const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

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

  const clickGoogleSignin = () => {
    // $('#gSignin.nsm7Bb-HzV7m-LgbsSe-BPrWId').click();
    // alert('signin clicked');
    // var parent = document.getElementById('gSignin');
    // var children = parent.querySelectorAll('nsm7Bb-HzV7m-LgbsSe-BPrWId');
    // children.click();
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

      // setAuth({ userEmail });
      setUser('');
      setPwd('');
      setSuccess(true);
      setError(false);

      // loginAction('1'); //set login status in login provider
      // emailAction(user);//set email in login provider
      const emailStatus = user;
      var avatarImage = '';
      let urlElements = window.location.href.split('/login');
      if (userAvatar) {
        avatarImage = userAvatar;
      }
      localStorage.setItem('email', user);
      localStorage.setItem('avatar', avatarImage);
      localStorage.setItem('avatarTitle', userAvatarTitle);
      localStorage.setItem('from', '');
      document.getElementById('redirectLogin').click();
      window.location.reload(false);
      setTimeout(function () {
        setSuccess('');
        setError('');
      }, 3000);
    } else {
      setSuccess(false);
      setError(true);
      setErrMsg(VALID_CHECK);
      setTimeout(function () {
        setSuccess('');
        setError('');
      }, 3000);
    }
  };
  return (
    <>
      <section className="profileinfobox">
        <div className="container">
          <Link href="/" title="Sign In" id="redirectLogin">
            {' '}
          </Link>
          <div className="login_signin ">
            <div className="loginbox">
              <h2>Sign In</h2>
              <p className="greytxt">
                <small>EVERYTHING about the MOVIES</small>
              </p>
              <div className="googlesignin">
                <GoogleSign method="signingoogle" />

                <div className="ormaillogin greytxt">
                  <span>
                    <small>or Sign In With Email</small>
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
                <div className="fieldbox">
                  <label htmlFor="user">
                    {' '}
                    <strong>Email</strong>
                    <sup>*</sup>
                  </label>
                  <input type="email" id="user" ref={userRef} value={user} placeholder="Enter your email" onChange={(e) => validateEmail(e)} />
                </div>
                <div className="fieldbox">
                  <label>
                    {' '}
                    <strong htmlFor="userpassword">Password</strong>
                    <sup>*</sup>
                  </label>
                  <input type="password" value={pwd} minLength="8" placeholder="Enter your password" onChange={(e) => setPwd(e.target.value)} />
                </div>
                <div className="fieldbox df just-between checklink">
                  <div className="checklinkitem">
                    <input type="checkbox" name="remember" className="displaynone" id="rememberCheck" value={remember} defaultChecked={true} />
                    <label htmlFor="rememberCheck">
                      <span>Remember me</span>
                    </label>
                  </div>
                  <span className="forgotpas_link">
                    Forgot Password?
                  </span>
                </div>
                <div>
                  <span id="loadericon" className="displaynone">
                    Loading ...
                  </span>
                  <input type="submit" onClick={handleSubmit} value="SIGN IN" className="wpcf7-form-control wpcf7-submit loginClick input" />
                </div>
              </div>
              <p className="noregister">
                Not Registered Yet?{' '}
                <span className="accountgenerate">
                  Create An Account
                </span>
              </p>
            </div>
            <div className="signup_box" style={{ display: 'none' }}>
              <SignUp />
            </div>

            <ForgotPassword />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
