import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
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
  const id = router.query.id;
  const password = useRef();
  const [newpass, setNewPass] = useState('');
  const [cnewpass, setCNewPass] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [validPass, setValidPass] = useState('');
  const [validcPass, setValidcPass] = useState('');
  const [changeSucess, setChangeSucess] = useState('');
  const [loader, setLoader] = useState('');
  const [LinkExpired, setLinkExpired] = useState(false);

  const checkforLinkExpired = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SD_API}/login/change_password.php?auth=${id}`);

      if (!res.ok) {
        console.error('Failed to fetch:', res.status);
        setErrorPass('Something went wrong.');
        return;
      }

      const text = await res.text();

      if (!text) {
        console.error('Empty response from server for checkforLinkExpired');
        setErrorPass('Unexpected server response.');
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('Invalid JSON:', text);
        setErrorPass('Invalid server response.');
        return;
      }

      if (data.link_expired) {
        setErrorPass(data.error || 'Link has expired.');
        setLinkExpired(true);
      }
    } catch (err) {
      console.error('checkforLinkExpired error:', err);
      setErrorPass('Network or server error.');
    }
  };
  checkforLinkExpired();

  const validPassword = (value) => {
    var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;
    //alert(reg.test(signPassword));
    return reg.test(value);
    //setSignupError(reg.test(signPassword) === false ? VALID_PASS : '');
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
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

      await axios
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
          router.push('/login');
        });
    }
  };

  const passshow = () => {
    setPasswordVisible(!passwordVisible);
  };

  const checkPassword = () => {
    if (validPassword(newpass) === false || newpass === '') setValidPass(VALID_PASS);
  };
  const checkCPassword = () => {
    if (validPassword(cnewpass) === false || cnewpass === '') setValidcPass(VALID_PASS);
  };

  return (
    <>
      <section className='profileinfobox'>
        <div className='container'>
          {!LinkExpired ? (
            <div className='login_signin'>
              <div className='forgotchange'>
                <h2>Change Password</h2>
                {changeSucess ? (
                  <div className=' '>
                    <div className='successmsg'> {changeSucess}</div>
                  </div>
                ) : (
                  ''
                )}
                <p>
                  <small>Enter your new password.</small>
                </p>
                <form>
                  <div className='fieldbox'>
                    <label>
                      <strong>Enter New Password</strong>
                      <sup>*</sup>
                    </label>
                    <div className='pvr'>
                      <input
                        ref={password}
                        type={passwordVisible ? 'text' : 'password'}
                        className='passinfoinput smallinput'
                        placeholder='Min. 8 Characters'
                        required=''
                        onChange={(e) => setNewPass(e.target.value)}
                        value={newpass}
                        onBlur={checkPassword}
                      />
                      <i className={passwordVisible ? 'eyeico fas fa-eye' : 'eyeico fas fa-eye-slash'} onClick={() => passshow('')}></i>
                    </div>
                    {validPass ? <span className='span-errormsg '> {validPass}</span> : ''}
                  </div>
                  <div className='fieldbox'>
                    <label>
                      <strong>Confirm New Password</strong>
                      <sup>*</sup>
                    </label>
                    <div className='pvr'>
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        className='passinfoinput smallinput'
                        placeholder='Min. 8 Characters'
                        required=''
                        onChange={(e) => setCNewPass(e.target.value)}
                        onBlur={checkCPassword}
                        value={cnewpass}
                      />
                      <i className={passwordVisible ? 'eyeico fas fa-eye' : 'eyeico fas fa-eye-slash'} onClick={() => passshow('')}></i>
                    </div>
                    {errorPass ? (
                      <div>
                        <span className='span-errormsg '> {errorPass}</span>
                      </div>
                    ) : (
                      ''
                    )}
                    {validcPass ? (
                      <div>
                        <span className='span-errormsg '> {validcPass}</span>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <p>
                    <small>Password must be 8 or more characters and contain at least 1 number, 1 capital letter and 1 special character.</small>
                  </p>
                  <div>
                    {loader}
                    <input value='Save Password' type='submit' className='loginClick input' onClick={saveNewPassword} />
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className='min-h-40'>
              <h1 className='text-red-600 text-center my-20'> {errorPass}</h1>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
