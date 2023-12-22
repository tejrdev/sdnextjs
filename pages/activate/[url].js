import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Link } from 'next/link';
var CryptoJS = require("crypto-js");
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const ENCT_KEY = process.env.NEXT_PUBLIC_ENC_KEY;
const activate = () => {
    const router = useRouter();
    const objectContent = router.query;
    const loginAfterSignup = async () => {
    //console.log(objectContent.url);

      var login_after_signupurl = API_URL + '/login/login_after_signup.php';
      const response = await axios.get(login_after_signupurl, {
        params: {
          auth: objectContent.url,
          activation: 'Done',
          from: '',
        },
      });

      let urlElements = window.location.href.split('/activate');
      const user_login = JSON.parse(JSON.stringify(response?.data?.user_login));

      if (user_login === 1) {
        const userEmail = JSON.parse(JSON.stringify(response?.data?.user_email));
        const userAvatarTitle = JSON.parse(JSON.stringify(response?.data?.avatar_title));
        var userAvatar = '';
        if (userAvatar) {
          userAvatar = urlElements[0] + JSON.parse(JSON.stringify(response?.data?.user_avatar));
        }
        if (typeof window !== 'undefined') {
         const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(userEmail), ENCT_KEY).toString();
        localStorage.setItem('enc_email', encryptedUser);
        localStorage.setItem('email', userEmail);
        localStorage.setItem('avatar', userAvatar);
        localStorage.setItem('avatarTitle', userAvatarTitle);
        localStorage.setItem('from', '');
        }
        //  navigate('/profile_steps');
       router.push('/profile_steps');
        setTimeout(() => {
            router.push('/profile_steps');
        }, 2000);
      } else {
        router.push('/login');

        // navigate('/login');
      }
    };

    if (typeof window !== 'undefined') {
      // run logic that read/write localStorage
     // console.log('usecasetextung');
      loginAfterSignup();
      }

      useEffect(() => {

        loginAfterSignup();
      }, []);

      return (
        <>
      <section className="profileinfo">
        <div className="container">
          <div className="top_txt df fww">
            <h2 className="first-letter">Please Wait we are redirecting you to profile page..</h2>
          </div></div></section>
        </>
      );
}


export default activate;