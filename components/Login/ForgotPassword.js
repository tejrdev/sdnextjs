import React, { useState, useEffect, useRef } from 'react';
import validator from 'validator';
import axios from 'axios';
import jquery from 'jquery';

const FORGOT_SUCCESS = 'Success : Please check you email id for reseting password';
const FORGOT_ERROR = 'Error : Email Id Does Not Exists';
const VALID_CHECK = 'Error : Please enter valid email id';
const LOADER = 'Sending..Please wait..';
const $ = require('jquery');

const ForgotPassword = () => {
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [loader, setLoader] = useState('');
  const [forgot, setForgot] = useState('');
  const [errMsd, setErrMsg] = useState('');
  const [emailError, setEmailError] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotSucess, setForgotSucess] = useState('');

  useEffect(() => {
    setErrMsg('');
  }, [user]);

  const getForgotEmail = (e) => {
    e.preventDefault();
    setLoader(LOADER);
    setForgotError('');
    if (validator.isEmail(forgot)) {
      var forgot_password_url = process.env.NEXT_PUBLIC_SD_API + '/login/forgot_password.php';
      axios
        .get(forgot_password_url, {
          params: {
            auth: window.btoa(forgot),
          },
        })
        .then((res) => {
          //jquery('#sd_forgot_pass').val('');
          if(res.data.errors){
            setForgotError(res.data.errors);
          }else{
            setTimeout(function () {
              setForgotSucess('');
              setForgotError('');
              document.getElementById('pop_cloase').click();
           }, 3000);
           setForgotSucess(FORGOT_SUCCESS);
          }
          setLoader('');           
        });
    } else {
      setEmailError(VALID_CHECK);
      setLoader('');
    }
  };

  return (
    <>
      <div className="verifymail" style={{ display: 'none' }}>
        <span className="popclose">+</span>
        <h2>Verify Email</h2>
        <p>
          <small>Enter the email associated with your profile
            and we’ll send you a link to create a new password.</small>
        </p>
        <div>
          <input type="submit" value="RE-SEND" className="wpcf7-form-control wpcf7-submit loginClick input" />
        </div>
      </div>
      <div className="forgotpass" style={{ display: 'none' }}>
        <span className="popclose" id="pop_cloase">
          +
        </span>
        <h2>Forgot Password?</h2>
        <p>
          <small>Enter the email associated with your profile and we’ll send you a link to create a new password.</small>
        </p>
        {forgotError ? (
          <div ref={errRef} className=" {forgotError ? 'successerror' : ''}">
            <div className="errormsg "> {forgotError}</div>
          </div>
        ) : (
          ''
        )}
        {emailError ? <div className="errormsg "> {emailError}</div> : ''}
        {forgotSucess ? (
          <div ref={errRef} className=" {forgotSucess ? 'successerror' : ''}">
            <div className="successmsg"> {forgotSucess}</div>
          </div>
        ) : (
          ''
        )}
        <div className="fieldbox">
          <label>
            {' '}
            <strong>Email</strong>
            <sup>*</sup>
          </label>
          <input
            id="sd_forgot_pass"
            type="email"
            value={forgot}
            placeholder="Enter your email"
            onChange={(e) => {
              setForgot(e.target.value);
            }}
            onFocus={() => setEmailError('')}
          />{' '}
        </div>
        <div>
          {loader}
          <input type="submit" value="SEND LINK" className="wpcf7-form-control wpcf7-submit loginClick input" onClick={getForgotEmail} />
        </div>
        {/* }
        <p className="noregister">
        Link not received?  {' '}
          <span className="sendingagain">
             Send again.
          </span>
        </p>
          */}
      </div>
    </>
  );
};

export default ForgotPassword;
