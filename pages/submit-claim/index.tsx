import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import validator from 'validator';
import axios from 'axios';
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { auth } from '../../redux/features/auth/authSlice';
import WithReduxLayout from '@/components/Layout/WithReduxLayout';
var CryptoJS = require('crypto-js');
const ENCT_KEY = process.env.NEXT_PUBLIC_ENC_KEY;

const SubmitClaim = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState<string>('');
  const [EmailError, setEmailError] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState<number>(0);
  const [verifyOTPError, setVerifyOTPError] = useState<string | null>(null);
  const [verifyOTPSucess, setVerifyOTPSucess] = useState<string | null>(null);
  const [inputCode, setInputCode] = useState<string | number>('');
  const [GoToNextStep, setGoToNextStep] = useState<boolean>(false);
  const [ShowLoader, setShowLoader] = useState<boolean>(false);
  const [ListingUrl, setListingUrl] = useState<string>('');
  const loginUser = localStorage.getItem('email');
  const enc_email = localStorage.getItem('enc_email');
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (!redirect) return;
    router.push('/claim-listing/claimlist-success?listingUrl=' + ListingUrl);
  }, [redirect]);

  const validationEmail = (email: string) => {
    if (email !== null && validator.isEmail(email)) return true;
    else return false;
  };

  useEffect(() => {
    const { email, listingUrl } = router.query;
    if (listingUrl) {
      setShowLoader(true);
      setListingUrl(listingUrl as string);
      const login_User = localStorage.getItem('email');
      if (login_User !== null && login_User !== undefined) {
        setEmail(login_User);
      }
      const claimListing = async (email: string) => {
        const data = await CheckQRClaimUser(email, 0, 'from_login_already_exist_user', listingUrl?.toString());
        if (data.sucess !== undefined) {
          setRedirect(true);
        } else {
          setEmailError(data.error);
        }
      };
      //user coming from login page after entering email and redirected to login
      if (email === login_User) {
        setEmail(email);
        setTimeout(() => {
          claimListing(email);
          setShowLoader(false);
        }, 100);
      } else {
        setShowLoader(false);
      }
    }
  }, [router.query]);

  const CheckQRClaimUser = async (email: string, otp: number, requestfor: string, url = '' as string, resendOTP = false as boolean): Promise<any> => {
    const params: Record<string, string> = {};
    const encryptedCode = btoa(otp.toString());

    // Add required parameters
    params.email = email;
    params.listing = ListingUrl || url;
    params.code = encryptedCode.toString();
    params.requestfor = requestfor;

    // Add conditional parameters
    if (loginUser && enc_email) {
      params.login = 'true';
    }
    if (resendOTP === true) {
      params.resend = 'true';
    }
    if (requestfor === 'for_profile_creation') {
      params.createprofile = 'true';
    }
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SD_API}/claim-listing/user-claim-manual.php`, { params });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const pVerifyEmail = async (e: React.FormEvent | MouseEvent, resendOTP: boolean = false): Promise<boolean> => {
    e.preventDefault();
    // Type assertion to HTMLElement
    if ((e.target as HTMLElement).classList.contains('opacity-50')) {
      return false;
    }

    setShowLoader(true);
    if (validationEmail(Email || '') === false) {
      setEmailError('Please Enter Valid Email');
      setShowLoader(false);
      return false;
    } else {
      setEmailError(null);
    }
    let code: number;
    if (!resendOTP) {
      code = Math.floor(100000 + Math.random() * 900000);
      setVerificationCode(code);
    } else {
      code = verificationCode;
    }
    setVerifyOTPError(null);
    setVerifyOTPSucess(null);
    setInputCode('');

    if (!Email) return false;

    //check whether email already exist, send email address and code to WP
    const data = await CheckQRClaimUser(Email, code, 'from_verify_claim', ListingUrl.toString(), resendOTP);
    //  const data = await res.json();
    //if email exist then
    if (data?.userExist === 'true') {
      //  >> check whether user logged in or not
      //    >>>> redirect to login if not logged in
      if (data?.login_fail) {
        localStorage.removeItem('email');
        router.replace({
          pathname: '/login',
          query: { from: encodeURIComponent(router.asPath) + '&email=' + Email },
        });
      }
      //  >>>> if logged in and same email then claim the listing and approve it and redirect the user to listing page
      else {
        if (data?.claimsubmited) {
          setRedirect(true);
        } else if (data?.sucess) {
          setEmailError(data.sucess);
        } else {
          setVerifyOTPError(data.message);
          setShowLoader(false);
          return false;
        }
      }
    }
    //if email not exist then verify email with otp, go to next step
    else if (data?.email_send === 'true') {
      setVerifyOTPSucess(data.message);
      setGoToNextStep(true);
      //enable resend otp button after 10 seconds
      setTimeout(() => {
        const button = document.getElementById('resendOTP');
        if (button) {
          button.classList.remove('opacity-50');
        }
      }, 10000);
    } else {
      setEmailError(data.error);
      setShowLoader(false);
      return false;
    }

    setShowLoader(false);
    return false;
  };

  const pVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoader(true);
    setVerifyOTPError(null);
    setVerifyOTPSucess(null);

    if (parseInt(inputCode.toString()) === verificationCode) {
      setVerifyOTPError(null);
      setVerifyOTPSucess('Code matches... Verification successful...');

      // create profile for customer and claim the listing and redirect to listing page
      const data = await CheckQRClaimUser(Email, 0, 'for_profile_creation');
      if (data?.profile_create) {
        const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(Email), ENCT_KEY).toString();
        localStorage.setItem('enc_email', encryptedUser);
        localStorage.setItem('email', Email);
        localStorage.setItem('avatar', '');
        localStorage.setItem('avatarTitle', '');
        localStorage.setItem('username', '');
        localStorage.setItem('type_link', '');
        localStorage.setItem('from', '');
        localStorage.setItem('latitude', '');
        localStorage.setItem('longitude', '');
        localStorage.setItem('pincode', '');
        const subscriber = CryptoJS.AES.encrypt(Email + '_' + 'N', ENCT_KEY).toString();
        dispatch(auth({ user: Email, subscriber }));
        setTimeout(() => {
          setShowLoader(false);
          setRedirect(true);
        }, 2000);
      }
    } else {
      setVerifyOTPSucess(null);
      setVerifyOTPError('Code does not match...  Try again or send new code');
      setShowLoader(false);
      return false;
    }
  };

  const GoToPreviousStep = () => {
    if (!GoToNextStep) {
      //go back to claim listing page
      router.back();
    } else {
      //go back to previous step
      setGoToNextStep(false);
    }
  };

  return (
    <div className='emailverifyflow min-h-96 flex flex-wrap items-center content-center'>
      <div className='container'>
        <div className='backlink w-full font-bold' onClick={GoToPreviousStep}>
          <Link href={'#'}>
            <FaChevronLeft className='inline-block text-sm mb-1' /> Back
          </Link>
        </div>
        {!GoToNextStep && (
          <div className='emialin max-w-md p-8 mx-auto border border-gray-300 my-3'>
            {!redirect && (
              <>
                <h2>Enter Your Email</h2>
                <p>In order to claim this listing so you can make changes to the information, we need to verify your email address. </p>
                <input type='email' name='email' id='email' value={Email || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder='Enter your email' className='my-3' />
                <button
                  className='btn uppercase w-full'
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    pVerifyEmail(e);
                  }}>
                  Continue
                </button>
              </>
            )}

            {EmailError ? <div className='errormsg my-2'> {EmailError}</div> : null}
            {ShowLoader ? (
              <div className='nowshow_sliderbox pvr' style={{ minHeight: 200, marginBottom: 20 }}>
                <div className='secloder'>
                  <div className='secspinner'></div>
                </div>
              </div>
            ) : null}
          </div>
        )}
        {GoToNextStep && (
          <div className='emailverifyflow min-h-96 flex flex-wrap items-center content-center'>
            <div className='digitin max-w-md p-8 mx-auto border border-gray-300 my-3'>
              {!redirect && (
                <>
                  <h2>Enter 6-Digit Code</h2>
                  <p>
                    Hello {Email} <br />
                    We have sent you a Verification Code. Please enter that code here.
                  </p>
                  <input type='text' maxLength={6} name='code' id='code' value={inputCode || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputCode(e.target.value)} placeholder='Enter 6-Digit Code' className='mb-3' />
                  <button
                    className='btn uppercase  w-full'
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      pVerifyOTP(e);
                    }}>
                    submit
                  </button>

                  <p className='mt-2'>
                    Didn't receive a code?
                    <button
                      // disabled
                      id='resendOTP'
                      className=' inline-block cursor-pointer ml-2 text-blue opacity-50'
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        pVerifyEmail(e, true);
                      }}>
                      Send New Code
                    </button>
                  </p>
                </>
              )}

              {verifyOTPSucess ? <div className='successmsg my-2'> {verifyOTPSucess}</div> : ''}
              {verifyOTPError ? <div className='errormsg my-2'> {verifyOTPError}</div> : ''}

              {ShowLoader ? (
                <div className='nowshow_sliderbox pvr' style={{ minHeight: 200, marginBottom: 20 }}>
                  <div className='secloder'>
                    <div className='secspinner'></div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

SubmitClaim.getLayout = function (page) {
  return <WithReduxLayout layout='withRedux'>{page}</WithReduxLayout>;
};

export default SubmitClaim;
