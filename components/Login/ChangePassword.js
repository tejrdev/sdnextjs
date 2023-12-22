import './css/login.css';
import React, { useState, useEffect, useRef } from 'react';
import validator from 'validator';

//import AuthContext from "../../../context/AuthProvider";
import { useNavigate, useParams } from 'react-router-dom';
import {useRouter } from 'next/router';
import axios from 'axios';
const LOGIN_URL = '/login';

const $ = require('jquery');
const MATCH = 'Password Doesnot Match';
const VALID_PASS = 'Please enter password in valid format';
const VALID_CPASS = 'Please enter confirm password in valid format';
const SUCCESS = 'Password Changed Successfully!';
const LOADER = 'Updating Password..Please wait..';
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const ChangePassword = () => {
  const router = useRouter();
  const { id } = useParams();
  const password = useRef();
  const navigate = useNavigate();
  const [newpass, setNewPass] = useState('');
  const [cnewpass, setCNewPass] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [validPass, setValidPass] = useState('');
  const [validcPass, setValidcPass] = useState('');
  const [changeSucess, setChangeSucess] = useState('');
  const [loader, setLoader] = useState('');
  const validPassword = (value) => {
    var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,10}$/;
    //alert(reg.test(signPassword));
    return reg.test(value);
    //setSignupError(reg.test(signPassword) === false ? VALID_PASS : '');
  };

  const saveNewPassword = async (e) => {
    e.preventDefault();
    // alert(password.current.value + "test case");
    setLoader(LOADER);
    if (newpass == '') {
      setErrorPass(MATCH);
    }
    if (validPassword(newpass) === false || newpass === '') {
      setValidPass(VALID_PASS);
    }
    if (validPassword(cnewpass) === false || cnewpass === '') {
      setValidcPass(VALID_CPASS);
    } else {
      var changepassword_url = API_URL + '/login/change_password.php';
      axios
        .get(changepassword_url, {
          params: {
            auth: id,
            t: window.btoa(newpass),
          },
        })
        .then((res) => {
          var resultContent = Object.values(res.data);
          setLoader('');

          setChangeSucess(SUCCESS);

          navigate('/login');
        });
    }
  };

  const checkPassword = () => {
    if (validPassword(newpass) === false || newpass === '') setValidPass(VALID_PASS);
  };
  const checkCPassword = () => {
    if (validPassword(cnewpass) === false || cnewpass === '') setValidcPass(VALID_PASS);
  };

  $('.login_signin .fa-eye').on('click', function () {
    $(this).toggleClass('fa-eye-slash');
    if ($(this).prev().attr('type') == 'password') {
      $(this).prev().attr('type', 'text');
    } else {
      $(this).prev().attr('type', 'password');
    }
  });

  return (
    <>
      <section className="profileinfobox">
        <div className="container">
          <div className="login_signin">
            <div className="forgotchange">
              <h2>Change Password</h2>
              {changeSucess ? (
                <div className=" ">
                  <div className="successmsg"> {changeSucess}</div>
                </div>
              ) : (
                ''
              )}
              <p>
                <small>Enter your new password.</small>
              </p>
              <form>
                <div className="fieldbox">
                  <label>
                    <strong>Enter New Password</strong>
                    <sup>*</sup>
                  </label>
                  <input ref={password} type="password" placeholder="Min. 8 Characters" required="" onChange={(e) => setNewPass(e.target.value)} value={newpass} onBlur={checkPassword} />
                  <i className="fas fa-eye"></i>
                  {validPass ? <span className="span-errormsg "> {validPass}</span> : ''}
                </div>
                <div className="fieldbox">
                  <label>
                    <strong>Confirm New Password</strong>
                    <sup>*</sup>
                  </label>
                  <input type="password" placeholder="Min. 8 Characters" required="" onChange={(e) => setCNewPass(e.target.value)} onBlur={checkCPassword} value={cnewpass} />
                  <i className="fas fa-eye"></i>
                  {errorPass ? <span className="span-errormsg "> {errorPass}</span> : ''}
                  <br />
                  {validcPass ? <span className="span-errormsg "> {validcPass}</span> : ''}
                </div>
                <p>
                  <small>Password must be 8 or more characters and contain at least 1 number and 1 special character.</small>
                </p>
                <div>
                  {loader}
                  <input value="Save Password" type="submit" className="loginClick input" onClick={saveNewPassword} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
