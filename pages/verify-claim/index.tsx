import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import validator from 'validator';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../../redux/features/auth/authSlice';
import WithReduxLayout from '@/components/Layout/WithReduxLayout';
var CryptoJS = require('crypto-js');
const ENCT_KEY = process.env.NEXT_PUBLIC_ENC_KEY;

const VerifyClaim = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<number>(0);
  const [ErrorMsg, setErrorMsg] = useState<string | null>(null);
  const [SucessMsg, setSucessMsg] = useState<string | null>(null);
  const [inputCode, setInputCode] = useState<string | number>('');
  const [GoToNextStep, setGoToNextStep] = useState<boolean>(false);
  const [ShowLoader, setShowLoader] = useState<boolean>(false);
  const [ListingUrl, setListingUrl] = useState<string>('');
  const loginUser = localStorage.getItem('email');
  const enc_email = localStorage.getItem('enc_email');
  const [redirect, setRedirect] = useState<boolean>(false);
  const [RedirectUrl, setRedirectUrl] = useState<string>('');
  const [InitialLoader, setInitialLoader] = useState<boolean>(true);
  const [UserExist, setUserExist] = useState<boolean>(false);

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!redirect) return;

    const redirectTimeout = setTimeout(() => {
      router.push(RedirectUrl);
      // console.log(RedirectUrl);
    }, 5000);
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => (prevCount !== 0 ? prevCount - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimeout);
    };
  }, [redirect]);

  const validationEmail = (email: string) => {
    if (email !== null && validator.isEmail(email)) return true;
    else return false;
  };

  useEffect(() => {
    const { email, listingUrl } = router.query;
    if (listingUrl) {
      // setShowLoader(true);
      const redirectUrl = listingUrl?.toString().replace('' + process.env.NEXT_PUBLIC_FRONTEND_URL, window.location.origin) + '?qrclaim=true';
      setRedirectUrl(redirectUrl as string);
      setListingUrl(listingUrl as string);
      const login_User = localStorage.getItem('email');
      if (login_User !== null && login_User !== undefined) {
        setEmail(login_User);
        setUserExist(true);
      }
      const claimListing = async (email: string) => {
        const data = await CheckQRClaimUser(email, 0, 'from_login_already_exist_user', listingUrl?.toString());
        if (data.sucess !== undefined) {
          setRedirect(true);
          setInitialLoader(false);
        } else {
          setErrorMsg(data.error);
        }
      };
      //user coming from login page after entering email and redirected to login
      if (email === login_User) {
        setEmail(email);
        setTimeout(() => {
          claimListing(email);
        }, 100);
      } else {
        setInitialLoader(false);
      }
    }
  }, [router.query]);

  const CheckQRClaimUser = async (email: string, otp: number, requestfor: string, url = '' as string, resendOTP = false as boolean): Promise<any> => {
    localStorage.removeItem('requestFromQRCode');
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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SD_API}/claim-listing/user-qr-claim.php`, { params });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const pVerifyEmail = async (e: React.FormEvent | MouseEvent, resendOTP: boolean = false): Promise<boolean> => {
    e.preventDefault();
    setErrorMsg(null);
    // Type assertion to HTMLElement
    if ((e.target as HTMLElement).classList.contains('opacity-50')) {
      return false;
    }

    setShowLoader(true);
    if (validationEmail(Email || '') === false) {
      setErrorMsg('Please Enter Valid Email');
      setShowLoader(false);
      return false;
    }
    let code: number;
    if (!resendOTP) {
      code = Math.floor(100000 + Math.random() * 900000);
      setVerificationCode(code);
    } else {
      code = verificationCode;
    }
    setErrorMsg(null);
    setSucessMsg(null);
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
        setSucessMsg('Email ' + Email + ' has an existing profile. Redirecting to login page...');
        localStorage.removeItem('email');
        setTimeout(() => {
          router.replace({
            pathname: '/login',
            query: { from: encodeURIComponent(router.asPath) + '&email=' + Email, loginEmail: Email },
          });
        }, 3000);
      }
      //  >>>> if logged in and same email then claim the listing and approve it and redirect the user to listing page
      else {
        if (data?.claimapproved) {
          // router.push(RedirectUrl.toString());
          setRedirect(true);
          //  console.log('user will be redirected to listing page with you are manager of listing message');
        } else if (data?.sucess) {
          setSucessMsg(data.sucess);
        } else {
          setErrorMsg(data.message);
          setShowLoader(false);
          return false;
        }
      }
    }
    //if email not exist then verify email with otp, go to next step
    else if (data?.email_send === 'true') {
      setSucessMsg(data.message);
      setGoToNextStep(true);
      //enable resend otp button after 10 seconds
      setTimeout(() => {
        const button = document.getElementById('resendOTP');
        if (button) {
          button.classList.remove('opacity-50');
        }
      }, 10000);
    } else {
      setErrorMsg(data.error);
      setShowLoader(false);
      return false;
    }

    setShowLoader(false);
    return false;
  };

  const pVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoader(true);
    setErrorMsg(null);
    setSucessMsg(null);

    if (parseInt(inputCode.toString()) === verificationCode) {
      setSucessMsg('Code matches... Verification successful...');

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
      setSucessMsg(null);
      setErrorMsg('Code does not match...  Try again or send new code');
      setShowLoader(false);
      return false;
    }
  };

  return (
    <div className='emailverifyflow min-h-96 flex flex-wrap items-center content-center'>
      <div className='container'>
        {InitialLoader ? (
          <div className='nowshow_sliderbox pvr' style={{ minHeight: 200, marginBottom: 20 }}>
            <div className='secloder'>
              <div className='secspinner'></div>
            </div>
          </div>
        ) : (
          <>
            {!UserExist && (
              <>
                {!GoToNextStep ? (
                  <>
                    {!redirect && (
                      <div className='emialin max-w-md p-8 mx-auto border border-gray-300 my-3'>
                        <h2>Enter Your Email</h2>
                        <p>Please provide us with your email address:</p>

                        <input type='email' name='email' id='email' value={Email || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder='Enter your email' className='my-3' />
                        <button
                          className='btn uppercase w-full'
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            pVerifyEmail(e);
                          }}>
                          Continue
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {!redirect && (
                      <div className='digitin max-w-md p-8 mx-auto border border-gray-300 my-3'>
                        <h2>Enter 6-Digit Code</h2>
                        <p>We need to verify that you are the owner of {Email}. We have sent you an email with a One-Time Password. Please check your inbox to find that message and enter the One-Time Password we have sent you:</p>
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
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {ShowLoader && (
              <div className='nowshow_sliderbox pvr' style={{ minHeight: 80, marginBottom: 20 }}>
                <div className='secloder'>
                  <div className='secspinner'></div>
                </div>
              </div>
            )}
            {redirect ? (
              <div className='digitin max-w-md p-8 mx-auto border border-gray-300 my-3'>
                {!UserExist ? (
                  <>
                    We have created a new profile for <strong>{Email}</strong> and assigned as a manager of this listing.
                  </>
                ) : (
                  <>
                    Thanks for your feedback. We have assigned <strong>{Email}</strong> as a manager of this listing.
                  </>
                )}
                {countdown > 0 ? ' You will be redirected to that page in ' + countdown + ' seconds...' : ' Redirecting now...'}
              </div>
            ) : (
              <div className='digitin max-w-md pb-8 mx-auto mb-3'>
                {SucessMsg ? <div className='successmsg my-2'> {SucessMsg}</div> : ''}
                {ErrorMsg ? <div className='errormsg my-2'> {ErrorMsg}</div> : ''}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

VerifyClaim.getLayout = function (page) {
  return <WithReduxLayout layout='withRedux'>{page}</WithReduxLayout>;
};

export default VerifyClaim;
