import React, { useState, useEffect } from 'react';
import {useRouter } from 'next/router';
import axios from 'axios';
const MATCH = 'Password Doesnot Match';
const VALID_PASS = 'Please enter password in valid format';
const VALID_CPASS = 'Please enter confirm password in valid format';
const SUCCESS = 'Password Changed Successfully!';
const LOADER = 'Updating Password..Please wait..';
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const  Create = () => {
    const router = useRouter();
    const id  = router.query.id;
    console.log(id,'--url page');

    const [newpass, setNewPass] = useState('');
    const [cnewpass, setCNewPass] = useState('');
    const [errorPass, setErrorPass] = useState('');
    const [validPass, setValidPass] = useState('');
    const [validcPass, setValidcPass] = useState('');
    const [changeSucess, setChangeSucess] = useState('');

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signupError, setSignupError] = useState(null);
    const [success, setSuccess] = useState('');

    const [loader, setLoader] = useState('');

    useEffect(()=>{  emailExists();  },[])

    const emailExists = async () => {
        var url = API_URL + '/login/create_exists.php';
        await axios
          .get(url, {
          params: {
            email: window.btoa(id)
          },
          })
          .then((res) => {
         setSignupError(null);if(res.data==1){setSignupError('Email id already exists'); return false;}

          })
          .catch((err) => console.log('create exist error ', err));
        };

    const validPassword = (value) => {
      var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;
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
          var changepassword_url = API_URL + '/login/create_account.php';

        await  axios.get(changepassword_url, {
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


    const checkPassword = () => {
     // alert(password+'--pasword'+ validPassword(password));
        if (validPassword(password) === false || password === '') {  setValidPass(VALID_PASS); }
        else{ setValidPass(' ');}
    };

    const checkCPassword = () => {
       // if (validPassword(cnewpass) === false || cnewpass === '') setValidcPass(VALID_PASS);
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
          setPasswordVisible(!passwordVisible);
        } else if (field === 'confirmPassword') {
          setConfirmPasswordVisible(!confirmPasswordVisible);
        }
      };


    return (
        <>
          <section className="profileinfobox">
            <div className="container">
              <div className="login_signin">
                <div className="forgotchange">
                  <h2>Create Account</h2>
                  {changeSucess ? (
                    <div className=" ">
                      <div className="successmsg"> {changeSucess}</div>
                    </div>
                  ) : (
                    ''
                  )}

                  {signupError && <div className="errormsg">{signupError}</div>}

                  <form>
                  <div className="fieldbox">
                   <label>
                        <strong>Email</strong>
                        <sup>*</sup>
                      </label>
                  <input type="email" id="user" placeholder="Enter your email" value={id} disabled />
                  </div>
                    <div className="fieldbox">
                      <label>
                        <strong>Password</strong>
                        <sup>*</sup>
                      </label>
                      <div className='pvr'>
                        <input  type={passwordVisible ? 'text' : 'password'} placeholder="Enter Password" required="" onChange={(e) => setPassword(e.target.value)} value={password} onBlur={checkPassword} />
                      <i className={passwordVisible ? 'fas fa-eye' : 'fas fa-eye-slash'}  onClick={() => togglePasswordVisibility('password')}></i>
                      </div>
                      {validPass ? <span className="span-errormsg "> {validPass}</span> : ''}
                    </div>
                      <div className="fieldbox">
                      <label>
                        <strong>Confirm New Password</strong>
                        <sup>*</sup>
                      </label>
                      <input  type={confirmPasswordVisible ? 'text' : 'password'} placeholder="Re-Enter Password" required="" onChange={(e) => setConfirmPassword(e.target.value)} onBlur={checkCPassword} value={confirmPassword} />
                      <i  className={confirmPasswordVisible ? 'fas fa-eye' : 'fas fa-eye-slash'}  onClick={() => togglePasswordVisibility('confirmPassword')}></i>
                      {errorPass ? <span className="span-errormsg "> {errorPass}</span> : ''}
                      <br />
                      {validcPass ? <span className="span-errormsg "> {validcPass}</span> : ''}
                  </div>
                    <p>
                      <small>Password must be 8 or more characters and contain at least 1 number, 1 capital letter and 1 special character.</small>
                    </p>
                    <div>
                      {loader}
                      <input value="Create Account" type="submit" className="loginClick input"  />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      );
}

export default  Create;