import React, { useState, useEffect } from 'react';

import { useSession,getSession } from 'next-auth/react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import axios from 'axios';
const SUCCESS = 'Success : Please check you email id for reseting password';
const GLOGIN_ERROR = 'Error : Email Id is not registered';
//const LOGGED_EMAIL = localStorage.getItem('email');
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const SIGN_SUCCESS = 'Success: Email Id Registerd Successfully';
const SIGN_ALREADY = ' Error: Email Id Already Exists';


const $ = require('jquery');

const verifyingstatus = () => {
  //console.clear();

  const router = useRouter();
  const { data: session, status } = useSession();
  const [gsigninEmailSucess, setGsigninEmailSucess] = useState('');
  const [gsigninEmailError, setGsigninEmailError] = useState('');
  const [gemailError, setGEmailError] = useState('');
  const [gsignupEmailSucess, setGsignupEmailSucess] = useState('');
  const [gsignupEmailError, setGsignupEmailError] = useState('');



  useEffect(() => {
    $('.loginbox .accountgenerate').on('click', function () {
      $(this).parents('.loginbox').next().show();
      $(this).parents('.loginbox').hide();
    });

  });

  useEffect(()=>{
    if (session !== undefined) {
      //  console.log(session,'-coming here');

      //console.log( session?.user?.email, session?.user?.name, session?.user?.image,'--coming in signup sucess')
      const signupGoogle = async () => {
        $('#loadericons').show();
        //console.log( session?.user?.email, session?.user?.name, session?.user?.image,'--coming in signup sucess')
       // return false;
        var signup_url = API_URL + '/login/signup.php';
        var picture = session?.user?.image ;
        const response = await axios.get(signup_url, {
          params: {
            auth: window.btoa(session?.user?.email),
            t: window.btoa(session?.user?.name),
            p: window.btoa(picture),
          },
        });
        var responseDetails = Object.values(response.data);
        $('#loadericons').hide();

        if (responseDetails[0] === 1) {
          setGsignupEmailError(SIGN_ALREADY);
        } else {
          setGsignupEmailSucess(SIGN_SUCCESS);

          var activate_url = API_URL + '/activate/';
          window.location.href = activate_url + responseDetails[0];
        }

        setTimeout(function () {
          setGsignupEmailError('');
          setGsignupEmailSucess('');
        }, 3000);
      };

      signupGoogle();
      }




})


  return (
    <>
      <section className="profileinfobox">
        <div className="container">
          <Link href="/" title="Sign In" id="redirectLogin">
            {' '}
          </Link>
          <div className="login_signin ">
            <div className="loginbox">
            {gsigninEmailError ? <div className="errormsg "> {gsigninEmailError}</div> : ( <div className=" ">Please wait ...While we are adding details </div>)}

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default verifyingstatus;
