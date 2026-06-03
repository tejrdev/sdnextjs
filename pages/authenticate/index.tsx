import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { auth } from '../../redux/features/auth/authSlice';
import WithReduxLayout from '@/components/Layout/WithReduxLayout';
import Loader from '@/components/Loader';

var CryptoJS = require('crypto-js');
const ENCT_KEY = process.env.NEXT_PUBLIC_ENC_KEY;

const Authenticate = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = router.query.token || '';
  const email: any = router.query.email || '';
  const redirectURL: any = router.query.redirectURL || '';

  useEffect(() => {
    const AuthenticateUser = async () => {
      if (email) {
        const response = await fetch(process.env.NEXT_PUBLIC_SD_API + '/mobile_user?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&email=' + email + '&token=' + token);
        const userData = await response.json();

        const isProInd: string = userData.pro_user === 'yes' ? 'pro' : '';
        const encryptedUser: string = CryptoJS.AES.encrypt(JSON.stringify(email), ENCT_KEY).toString();
        const trialStartDate = userData.trialStartDate;
        const trialEndDate = userData.trialEndDate;
        const avatarImage = userData.user_avatar;
        const userAvatarTitle = userData.avatar_title;

        localStorage.setItem('enc_email', encryptedUser);
        localStorage.setItem('email', email);
        localStorage.setItem('type_link', isProInd);
        localStorage.setItem('avatar', avatarImage);
        localStorage.setItem('avatarTitle', userAvatarTitle);

        //check whether trail expires or not >> if yes, redirect to checkout
        let ProInd = isProInd === 'pro' ? 'Y' : 'N';
        let dateDiff = 0;
        if (trialEndDate !== '' && trialEndDate !== null && trialEndDate !== undefined) {
          dateDiff = (new Date(trialEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
          if (dateDiff < 0) ProInd = 'N';
        }
        const subscriber = CryptoJS.AES.encrypt(email + '_' + ProInd, ENCT_KEY).toString();
        dispatch(auth({ email, subscriber, trialStartDate, trialEndDate }));
        if (dateDiff < 0) router.push('/pro/trialexpire/');

        router.push(redirectURL);
      }
    };
    AuthenticateUser();
  }, []);

  return <Loader />;
};

const props = {
  layout: 'withRedux',
};

Authenticate.getLayout = function (page: any) {
  return <WithReduxLayout {...props}>{page}</WithReduxLayout>;
};

export default Authenticate;
