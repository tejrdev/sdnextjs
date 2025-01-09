import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
var CryptoJS = require('crypto-js');
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const ENCT_KEY = process.env.NEXT_PUBLIC_ENC_KEY;

const activate = () => {
  const router = useRouter();
  const objectContent = router.query;

  const loginAfterSignup = async () => {
    var login_after_signupurl = API_URL + '/login/login_after_signup.php';
    const response = await axios.get(login_after_signupurl, {
      params: {
        userId: objectContent.url,
      },
    });

    if (response?.data?.error) {
      localStorage.removeItem('email');
      router.push('/login');
    } else {
      const userEmail = JSON.parse(JSON.stringify(response?.data?.data?.user_email));
      const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(userEmail), ENCT_KEY).toString();
      localStorage.setItem('enc_email', encryptedUser);
      localStorage.setItem('email', userEmail);
      setTimeout(() => {
        router.push('/profile_steps');
      }, 2000);
    }
  };

  useEffect(() => {
    loginAfterSignup();
  }, []);

  return (
    <>
      <section className='profileinfo'>
        <div className='container'>
          <div className='top_txt df fww'>
            <h2 className='first-letter'>Please Wait we are redirecting you to profile page..</h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default activate;
