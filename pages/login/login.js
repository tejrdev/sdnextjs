import React, { useState, useEffect, useRef } from 'react';
import { signIn, getCsrfToken } from 'next-auth/react';
import { useSession,getSession } from 'next-auth/react';
import SignUp from '../../components/Login/SignUp';
//import ForgotPassword from './ForgotPassword';
import validator from 'validator';
//import GoogleSign from './GoogleSign';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
const LOGIN_URL = '/login';



const FORGOT_SUCCESS = 'Success : Please check you email id for reseting password';
const FORGOT_ERROR = 'Error : Email Id Does Not Exists';
const VALID_CHECK = 'Erorr : Invalid Details. Please try again later!';
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const DEFAULT_URL =process.env.NEXT_PUBLIC_LOGIN_URL;

const $ = require('jquery');

const Login = ({ csrfToken }) => {
  console.clear();

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
  const [forgotError, setForgotError] = useState('');
  const [forgotSucess, setForgotSucess] = useState('');



  async function signInWithGoogle (){
    signIn('google',{callbackUrl:'/success'});
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

    const res = await signIn('credentials', {
      redirect: false,
      email: user,
      password: pwd,
      callbackUrl: `${window.location.origin}`,
    })

    if (res?.error) {
      setError(true);
      $('#loadericon').hide();
    } else {
      $('#loadericon').hide();
      setError(false);
      setSuccess(true);
    }
   // alert(res.url);return false;
    if (res.url) router.replace('/');
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
              { /* <GoogleSign method="signingoogle" />*/ }

              <button onClick={signInWithGoogle} >Sign in with google</button>

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
                  <input  name="csrfToken"  type="hidden"  defaultValue={csrfToken}  />
                  <input type="email" id="user" ref={userRef} value={user} required placeholder="Enter your email" onChange={(e) => validateEmail(e)} />
                </div>
                <div className="fieldbox">
                  <label>
                    {' '}
                    <strong htmlFor="userpassword">Password</strong>
                    <sup>*</sup>
                  </label>
                  <input type="password" value={pwd} minLength="8"  required placeholder="Enter your password" onChange={(e) => setPwd(e.target.value)} />
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
                Not Registered Yet?{' '}
                <Link href="#" className="accountgenerate">
                  Create An Account
                </Link>
              </p>
            </div>
            <div className="signup_box" style={{ display: 'none' }}>
             <SignUp />
            </div>

              {/*  <ForgotPassword /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
