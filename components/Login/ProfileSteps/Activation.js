import React, { useEffect } from 'react';
import axios from 'axios';
import  Link  from 'next/link';
import { useRouter } from 'next/router';
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const Activation = () => {
  const { id } = useParams();
  const router = useRouter();
  const loginAfterSignup = async () => {
    var login_after_signupurl = API_URL + '/login/login_after_signup.php';
    const response = await axios.get(login_after_signupurl, {
      params: {
        auth: id,
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
      localStorage.setItem('email', userEmail);
      localStorage.setItem('avatar', userAvatar);
      localStorage.setItem('avatarTitle', userAvatarTitle);
      localStorage.setItem('from', '');
      //  navigate('/profile_steps');
      window.location.href = urlElements[0] + '/profile_steps';
      setTimeout(() => {
        //navigate('/profile_steps');
        router.push('/profile_steps');
      }, 2000);
    } else {
      window.location.href = urlElements[0] + '/login';

      // navigate('/login');
    }
  };

  useEffect(() => {
    loginAfterSignup();
  }, []);

  return (
    <>
      <Link href="/profile_steps" id="profileSteps"></Link>
    </>
  );
};

export default Activation;
