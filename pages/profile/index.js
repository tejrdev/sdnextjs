import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../redux/features/auth/authSlice';
import FOURABT from '../../public/sdprofile.svg';
import { checkLocalStorageVariable } from '../../components/Login/localStorageUtil';
import CheckoutForm from '@/components/CheckoutForm';
const ENCT_KEY = process.env.NEXT_PUBLIC_ENC_KEY;
var CryptoJS = require('crypto-js');
import LinkImage from '../../public/images/Link.png';
import WithReduxLayout from '@/components/Layout/WithReduxLayout';

const SUCCESS = 'Profile Details Updated Successfully';
const LOADER = ' Please wait..While we are saving the details..';
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const $ = require('jquery');
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const appearance = {
  theme: 'stripe',
};
const cardoptions = {
  mode: 'setup',
  currency: 'usd',
  appearance,
};

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  //check for Pro Subscriber
  const { user, subscriber, latitude, longitude, pincode } = useSelector((state) => state.auth);
  const { subscriptionId } = useSelector((state) => state.checkout);
  const ProInd = CryptoJS.AES.decrypt(subscriber, ENCT_KEY)
    .toString(CryptoJS.enc.Utf8)
    .replace(user + '_', '');

  useEffect(() => {
    const userLoggedIn = checkLocalStorageVariable('email');
    const enc_login = checkLocalStorageVariable('enc_email');
    if (!userLoggedIn && !enc_login) {
      router.push('/login');
    }
  }, []);

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phone: '',
    country: 'USA',
    countryCode: '+1',
    jobTitle: '',
    organization: '',
    background: '',
    typeOrg: '',
    location: '',
    pincode: '',
    latitude: '',
    longitude: '',
  });

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [showFavGenre, setShowFavGenre] = useState([]);
  const [loader, setLoader] = useState('');
  const [passSuccess, setPassSuccess] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [loaderProfile, setLoaderProfile] = useState('');
  const [successProfile, setSuccessProfile] = useState('');
  const [groups, setGroups] = useState([]);
  const [intersets, setIntersets] = useState([]);
  const [subscriptionRenewsOn, setSubscriptionRenewsOn] = useState('');
  const [subscriptionIdWP, setsubscriptionIdWP] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardExpMonth, setCardExpMonth] = useState('');
  const [cardExpYear, setCardExpYear] = useState('');
  const [cardLast4digit, setCardLast4digit] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [emailLink, setEmailLink] = useState('');
  const [blnPaymentUpdate, setblnPaymentUpdate] = useState(false);
  const [paymentUpdateMsg, setPaymentUpdateMsg] = useState('Your payment details has been updated successfully.');
  const [blnCancelSubscription, setblnCancelSubscription] = useState(false);
  const [cancelSubscriptionMsg, setCancelSubscriptionMsg] = useState('Your subscription has been cancelled successfully.');
  const [blnShowCancelWarning, setblnShowCancelWarning] = useState(false);
  const [planPrice, setPlanPrice] = useState('');
  const [subscriberPlan, setSubscriberPlan] = useState('');

  if (typeof window !== 'undefined') {
    var LOGGED_EMAIL = localStorage.getItem('email');
    var LOGIN_TYPE = localStorage.getItem('from');
    var LOGGED_AVATAR = localStorage.getItem('avatar');
    //  LOGGED_AVATAR = '';
    var LOGGED_AVATAR_TITLE = localStorage.getItem('avatarTitle');
    //console.log(LOGGED_AVATAR);
    // return false;
  }
  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  useEffect(() => {
    var group_list = API_URL + '/mailchimp/group_list.php';
    fetch(group_list)
      .then((response) => response.json())
      .then((data) => {
        setGroups(data);
      });
  }, []);

  useEffect(() => {
    var member_list = API_URL + '/mailchimp/memberinfo-sd.php';
    axios
      .get(member_list, {
        params: {
          auth: window.btoa(LOGGED_EMAIL),
        },
      })
      .then((res) => {
        const returnedValues = res.data;
        setIntersets(returnedValues);
      })
      .catch((err) => console.log('Email Profile Newsletter: ', err));
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      var profile_url = API_URL + '/login/profile_details.php';
      const getDetails = await axios.get(profile_url, {
        params: {
          id: window.btoa(LOGGED_EMAIL),
        },
      });

      const useValues = getDetails.data;
      setState({
        firstName: useValues.firstName,
        lastName: useValues.lastName,
        userName: useValues.user_login,
        email: useValues.email,
        phone: useValues.phone,
        country: useValues.country,
        website: useValues.website,
        countryCode: useValues.countryCode,
        jobTitle: useValues.jobTitle,
        organization: useValues.organization,
        background: useValues.background,
        typeOrg: useValues.typeOrg,
        location: useValues.location,
        pincode: useValues.location,
        latitude: useValues.location,
        longitude: useValues.location,
      });

      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const time = new Date(useValues.endDate);
      time.setDate(time.getDate() + 1);
      setSubscriptionRenewsOn(time.toLocaleDateString('en-US', dateOptions));
      setCardType(useValues.cardBrand);
      setCardExpMonth(useValues.exp_month);
      setCardExpYear(useValues.exp_year);
      setCardLast4digit(useValues.last4);
      setPaymentType(useValues.paymentType);
      setEmailLink(useValues.linkEmail);
      setPlanPrice(useValues.planPrice);
      setSubscriberPlan(useValues.subscriberPlan);
      if (subscriptionId !== '' && subscriptionId !== undefined) {
        setsubscriptionIdWP(subscriptionId);
      } else {
        setsubscriptionIdWP(useValues.subscriptionId);
      }
      console.log(useValues.subscriptionCancel);
    };
    getProfile();
    // var decoded_string = Base64.decode('SsOzenNlZiA=');
    // console.log(decoded_string); // => József
  }, []);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleSubmit = (e) => {
    var groupLists = {};

    $('.newstoggle').each((index) => {
      $('.newstoggle_' + groups[index]['cat_id']).hasClass('off');
      if ($('.newstoggle_' + groups[index]['cat_id']).hasClass('off') === true) {
        groupLists[groups[index]['cat_id']] = false;
      } else {
        groupLists[groups[index]['cat_id']] = true;
      }
    });
    e.preventDefault();

    setLoaderProfile(LOADER);
    var profile_add = API_URL + '/login/profile_add.php';
    const addProfile = axios
      .get(profile_add, {
        params: {
          auth: window.btoa(LOGGED_EMAIL),
          keys: state,
          type: 'Profile',
          intersets: groupLists,
        },
      })
      .then((res) => {
        setLoaderProfile('');
        setSuccessProfile(SUCCESS);
        dispatch(auth({ user, subscriber, latitude: state.latitude, longitude: state.longitude, pincode: state.pincode }));

        setTimeout(function () {
          setLoaderProfile('');
          setSuccessProfile('');
        }, 3000);
      })
      .catch((err) => console.log('Profile Newsletter: ', err));
  };

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const getGenres = async () => {
    var fav_genre_url = API_URL + '/login/fav_genres.php';
    await axios
      .get(fav_genre_url, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          process: window.btoa('GET'),
        },
      })
      .then((res) => {
        var arrayValues = Object.values(JSON.parse(JSON.stringify(res.data)));

        setShowFavGenre(arrayValues);
      })
      .catch((err) => console.log('work get error ', err));
  };

  useEffect(() => {
    getGenres();
  }, []);
  const arrayIntersets = [];
  const newsToggle = (Value) => {
    $('.newstoggle_' + Value).toggleClass('off');
    $('.newstoggle_' + Value)
      .closest('.newssubscribe_items_' + Value)
      .toggleClass('unsuboff');
  };

  const cancelToggle = (Value) => {
    $('.newstoggle_' + Value)
      .closest('.newssubscribe_items_' + Value)
      .toggleClass('unsuboff');
    $('.newstoggle_' + Value)
      .closest('.newssubscribe_items_' + Value)
      .find('.newstoggle_' + Value)
      .toggleClass('off');
  };

  const unsubScribeToggle = (Value) => {
    $('.newstoggle_' + Value)
      .closest('.newssubscribe_items_' + Value)
      .toggleClass('unsuboff');

    $('.unsubbtn_' + Value).text(function (i, text) {
      return text === 'unsubscribe' ? 'subscribe' : 'unsubscribe';
    });
  };

  const getForgotEmail = (e) => {
    e.preventDefault();
    setLoader(1); //alert(state.email);
    var forgoturl = API_URL + '/login/forgot_password.php';
    axios
      .get(forgoturl, {
        params: {
          auth: window.btoa(state.email),
        },
      })
      .then((res) => {
        var resultContent = Object.values(res.data);
        //  console.log(Object.values(res.data));

        location.replace('/verify_email');
        setTimeout(function () {
          setLoader('');
        }, 3000);
      });
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  };
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = (pos) => {
    const crd = pos.coords;
    const coordinatesUrl = `https://api.opencagedata.com/geocode/v1/json?q=${crd.latitude}+${crd.longitude}&key=7bcf32f4394e4c56820a138c135722e2`;
    fetch(coordinatesUrl)
      .then((res) => res.json())
      .then((json) => {
        setState({
          ...state,
          ['location']: json.results[0].formatted,
          ['pincode']: json.results[0].components.postcode,
          ['latitude']: crd.latitude,
          ['longitude']: crd.longitude,
        });
      });
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  const handleEditPayment = (e) => {
    e.preventDefault();
    $('.cardeditbox').toggle();
    setblnPaymentUpdate(false);
  };

  const showCancelWarn = (e) => {
    e.preventDefault();
    setblnShowCancelWarning((current) => !current);
  };
  const cancelSubscription = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId: subscriptionIdWP }),
      })
        .then((res) =>
          res.json().then((subscriptionObj) => {
            if (subscriptionObj.deleted && subscriptionObj.deleted.status === 'canceled') {
              // const ProInd = 'Y';//cancel subscription after end date, not immidiately
              const subscription = {
                subscriptionId: subscriptionIdWP,
                userEmail: user,
              };
              // const subscriber = CryptoJS.AES.encrypt(subscription.userEmail + '_' + ProInd, ENCT_KEY).toString();
              // console.log(subscription, subscriptionObj);
              // dispatch(auth({ user: subscription.userEmail, subscriber: subscriber, latitude, longitude, pincode }));
              CancelSubscriptionWP(subscription);
            }
          })
        )
        .catch((e) => console.log(e));
    } catch (err) {
      console.error(err);
    }
  };

  const CancelSubscriptionWP = async (subscription) => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/cancel_subscription.php?userEmail=' + subscription.userEmail);
      localStorage.setItem('type_link', 'default');
      setblnCancelSubscription(true);
      return response.data;
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    }
  };
  const updatePaymentSec = (payment) => {
    setCardType(payment.cardBrand);
    setCardExpMonth(payment.exp_month);
    setCardExpYear(payment.exp_year);
    setCardLast4digit(payment.last4);
    setPaymentType(payment.paymentType);
    setEmailLink(payment.linkEmail);
    setblnPaymentUpdate(true);
  };
  return (
    <>
      <section className='profileinfo'>
        <div className='container'>
          <div className='top_txt df fww'>
            <h2 className='first-letter'>{state.firstName ? `Welcome! ${state.firstName} ${state.lastName} ` : ''}</h2>

            <div className='pro_edit_savebtn'>
              <button className='btn savebtn ghostbtn' onClick={handleSubmit}>
                Save Changes
              </button>
              {successProfile ? <div className='successmsg '> {successProfile}</div> : ''}
              {loaderProfile}
            </div>
          </div>
          <div className='profileinfobox grid'>
            <div className='avatar_fieldsave'>
              <p className='labeltxt'>Profile Image</p>
              <div className='avtarchangeremove df fww'>
                <div className='avtarpicbox'>
                  <div className='avtarpicinfo pvr'>
                    {LOGGED_AVATAR ? <Image src={LOGGED_AVATAR} rel='preload' as='image' title={LOGGED_AVATAR_TITLE} alt={LOGGED_AVATAR_TITLE} width='35' height='35' className='objctimg_box' /> : <Image src={FOURABT} rel='preload' as='image' title='sd_user' alt='sd_user' width='35' height='35' className='objctimg_box' />}

                    {selectedFile && <Image src={preview} rel='preload' as='image' title='sd_user' alt='sd_user' width='35' height='35' className='objctimg_box' />}
                  </div>
                  <div className='latter_box'>TB</div>
                </div>
                <div className='uploadsbtninfo pvr  df fww'>
                  <Link href='/avatar/' className='logo' title='Change Image' rel='home'>
                    <button className='uploadsbtn btn goldbtn'>CHANGE IMAGE</button>
                  </Link>

                  <p className='filename'></p>
                </div>
              </div>
            </div>
            <div className='profile_field'>
              <p className='labeltxt'>First Name</p>
              <input type='text' className='proinputfield' name='firstName' value={state.firstName} onChange={handleChange} placeholder='Enter First Name' />
            </div>
            <div className='profile_field'>
              <p className='labeltxt'>Last Name</p>
              <input type='text' className='proinputfield' name='lastName' value={state.lastName} onChange={handleChange} placeholder='Enter Last Name' />
            </div>
            <div className='profile_field'>
              <p className='labeltxt'>Username</p>
              <input type='text' className='proinputfield' onChange={handleChange} name='userName' value={state.userName} placeholder='Enter User Name' disabled />
            </div>
            {LOGIN_TYPE !== 'gmail' ? (
              <div className='profile_field'>
                <p className='labeltxt'>Password</p>
                <div className='passeditbox proinputfield df fww pvr'>
                  <input type='text' defaultValue='' placeholder='● ● ● ● ● ●' />
                  <a className='editbox' onClick={getForgotEmail}>
                    Change Password
                  </a>
                </div>
                {loader === 1 ? <span>Loading..</span> : ''}
                {passSuccess}
              </div>
            ) : (
              ''
            )}

            <div className='profile_field'>
              <p className='labeltxt'>Email</p>
              <input type='text' className='proinputfield' name='email' value={state.email} placeholder='email@gmail.com ' onChange={handleChange} disabled />
            </div>
            <div className='profile_field'>
              <p className='labeltxt'>Phone</p>
              <div className='phonebox pvr'>
                <select className='countrycode' placeholder='+1' name='countryCode' value={state.countryCode ? state.countryCode : '+1'} onChange={handleChange}>
                  <option value='+1'>+1</option>
                  <option value='+2'>+2</option>
                  <option value='+3'>+3</option>
                  <option value='+4'>+4</option>
                </select>

                <input type='text' className='proinputfield' name='phone' value={state.phone} placeholder='e.g. (800) 555-1212' onChange={handleChange} />
              </div>
            </div>
            <div className='profile_field'>
              <p className='labeltxt'>Website</p>
              <input type='text' className='proinputfield' name='website' value={state.website} onChange={handleChange} placeholder='e.g.mycompany.com' />
            </div>
            <div className='profile_field'>
              <p className='labeltxt'>Country</p>
              <select name='country' value={state.country ? state.country : 'USA'} onChange={handleChange}>
                <option value='USA' selected={state.country ? state.country : 'USA'}>
                  USA
                </option>
                <option value='Canada' selected={state.country ? state.country : 'Canada'}>
                  Canada
                </option>
              </select>
            </div>
            <div className='profile_field'>
              <p className='labeltxt'>Job Title</p>
              <input type='text' className='proinputfield' name='jobTitle' value={state.jobTitle} placeholder='Enter Job Title' onChange={handleChange} />
            </div>
            <div className='profile_field'>
              <p className='labeltxt'>Organization</p>
              <input type='text' className='proinputfield' name='organization' value={state.organization} placeholder='Enter Company or Organization Name ' onChange={handleChange} />
            </div>
            <div className='profile_field'>
              <p className='labeltxt'>Background</p>
              <input type='text' className='proinputfield' name='background' value={state.background} placeholder='Background' onChange={handleChange} />
            </div>
            <div className='profile_field'>
              <p className='labeltxt'>Type of Organization</p>
              <input type='text' className='proinputfield' name='typeOrg' value={state.typeOrg} placeholder='Type of Organization' onChange={handleChange} />
            </div>
            <div className='profile_field'>
              <p className='labeltxt'>Location</p>
              <p className='locationinfo pvr'>
                <input type='text' className='proinputfield' name='location' value={userLocation !== '' ? userLocation : state.location} placeholder='Location' onChange={handleChange} />
                <i className='fas fa-location' onClick={getLocation}></i>
              </p>
            </div>
            <div className='profile_field'>
              <p className='labeltxt'>Favorite Movie Genres</p>
              <ul className='generetype'>
                {showFavGenre && showFavGenre.map((genreList) => {
                  return <li>{genreList.charAt(0).toUpperCase() + genreList.slice(1)}</li>;
                })}
                <li>
                  <Link href='/favorite_genre'>
                    <button className='btn'>Update</button>{' '}
                  </Link>
                </li>
              </ul>
            </div>

            <div className='prefere_newslatter'>
              <div className='top_txt'>
                <h2>Newsletters</h2>
                <p>Subscribed Newsletters (Use the toggle button to unsubscribe from the listed newsletter)</p>
              </div>
              <div className='newssubscribe df fww just-between'>
                {groups.map((currentValue, index) => {
                  if (currentValue.cat_name !== 'Movie Times' && currentValue.cat_name !== 'The Film Verdict') {
                    return (
                      <div className={`newssubscribe_item newssubscribe_items_${currentValue.cat_id}`}>
                        <div className='newssubscribe_intro'>
                          <div className='top_title'>
                            <h5>{currentValue.cat_name}</h5>
                            <div className={`newstoggle  newstoggle_${currentValue.cat_id} ${intersets.includes(currentValue.cat_id) ? '' : 'off'}`} onClick={() => newsToggle(currentValue.cat_id)} id={currentValue.cat_id}>
                              <div className='nwtoggleg'></div>
                              <div className='nwtogglehandle'></div>
                            </div>
                          </div>
                          <div className='newssubscribe_info df fww'>
                            <p>
                              {currentValue.intersets_conent}

                              <span>
                                <strong>{currentValue.intersets_day}</strong>
                              </span>
                            </p>
                            <div className='preview_btn'>
                              <a href={currentValue.links} className='btn ghostbtn' target='_self'>
                                preview
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className='newsltr_unsubscribe text-center'>
                          <h5>
                            Are You Sure You Want To {intersets.includes(currentValue.cat_id) ? 'Unsubscribe' : 'Subscribe'} From {currentValue.cat_name}?
                          </h5>
                          <div className='unsubscribe_btn'>
                            <span className={`btn ghostbtn unsubbtn unsubbtn_${currentValue.cat_id}`} onClick={() => unsubScribeToggle(currentValue.cat_id)} target='_self'>
                              {intersets.includes(currentValue.cat_id) ? 'unsubscribe' : 'subscribe'}
                            </span>
                            <span className={`btn ghostbtn canclenewsbtn canclenewsbtn_${currentValue.cat_id}`} onClick={() => cancelToggle(currentValue.cat_id)} target='_self'>
                              cancel
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            {ProInd === 'Y' && (
              <div className='prosubscription'>
                <h2>Subscription</h2>
                <div className='subscribrow'>
                  <p>Plan</p>
                  <div className='subscribitemrow df fww'>
                    <p>
                      <strong>
                        Pro {subscriberPlan} ${planPrice}
                      </strong>
                    </p>
                    {/* <button className='ghostbtn goldbtn uppercase'>change plan</button> */}
                    <button className='ghostbtn redbtn uppercase' onClick={showCancelWarn}>
                      cancel subscription
                    </button>
                    {blnShowCancelWarning && (
                      <div className='pro_unsubscribe'>
                        <h5>Are You Sure You Want To Cancel Your Subscription?</h5>
                        <div className='unsubscribe_btn'>
                          <span className={`btn ghostbtn`} onClick={cancelSubscription} target='_self'>
                            Yes
                          </span>
                          <span className={`btn ghostbtn`} onClick={showCancelWarn} target='_self'>
                            No
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className='subscribrow'>
                  <div className='df fww subtwocol'>
                    <div className=''>
                      <p>Subscription renews on</p>
                      <div className='subscribitemrow df fww'>
                        <p>
                          <strong>{subscriptionRenewsOn}</strong>
                        </p>
                        {/* <button className='ghostbtn goldbtn uppercase'>renew now</button> */}
                      </div>
                    </div>
                    {/* <div className="">
                    <p>Last Payment</p>
                    <div className="subscribitemrow df fww">
                      <p><strong>9 November, 2022</strong></p>
                      <button className="ghostbtn goldbtn uppercase">9 November, 2022</button>
                    </div>
                  </div> */}
                  </div>
                </div>
                <div className='subscribrow'>
                  <p>Payment Method</p>
                  <div className='subscribitemrow'>
                    {paymentType === 'link' ? (
                      <>
                        <p>
                          <Image src={LinkImage} as='image' title='Link' alt='Link' width='60' height='30' className='' />
                          account with <strong>{emailLink} </strong>
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          <strong>
                            {cardType} ending in {cardLast4digit}
                          </strong>
                        </p>
                        <p>
                          Expiry {cardExpMonth}/{cardExpYear}
                        </p>
                      </>
                    )}
                    <div className='df fww gap16'>
                      {/* <button className='ghostbtn redbtn uppercase'>remove</button> */}
                      <button className='ghostbtn goldbtn uppercase' onClick={handleEditPayment}>
                        edit
                      </button>
                    </div>

                    <div className='cardeditbox' style={{ display: 'none' }}>
                      <Elements options={cardoptions} stripe={stripePromise}>
                        <CheckoutForm requestfrom='profilepage' updatePayment={updatePaymentSec} />
                      </Elements>
                    </div>
                    {blnPaymentUpdate ? <div className='successmsg '> {paymentUpdateMsg}</div> : ''}
                  </div>
                </div>
              </div>
            )}
            {blnCancelSubscription ? <div className='successmsg '> {cancelSubscriptionMsg}</div> : ''}

            <div className='pro_savebtn'>
              {successProfile ? <div className='successmsg '> {successProfile}</div> : ''}
              {loaderProfile}
              <button className='btn savebtn ghostbtn' onClick={handleSubmit}>
                SAVE CHANGES
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Profile.getLayout = function (page) {
  return <WithReduxLayout layout='withRedux'>{page}</WithReduxLayout>;
};
export default Profile;
