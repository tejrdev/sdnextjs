import React, { use } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
// import { auth } from '../../redux/features/auth/authSlice';
import FOURABT from '../../public/images/sdprofile.svg';
// import { checkLocalStorageVariable } from '../../components/Login/localStorageUtil';
import CheckoutForm from '@/components/CheckoutForm';
// const ENCT_KEY = process.env.NEXT_PUBLIC_ENC_KEY;
// var CryptoJS = require('crypto-js');
import LinkImage from '../../public/images/Link.png';
import WithReduxLayout from '@/components/Layout/WithReduxLayout';
import { getCustomer } from '@/components/Pro/Stripe';
import { Faqitems } from '../pro/faq';
import Loader from '@/components/Loader';

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
  // const dispatch = useDispatch();
  //check for Pro Subscriber
  const { user } = useSelector((state) => state.auth);
  // const { subscriptionId } = useSelector((state) => state.checkout);
  // const ProInd = CryptoJS.AES.decrypt(subscriber, ENCT_KEY)
  //   .toString(CryptoJS.enc.Utf8)
  //   .replace(user + '_', '');

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
    showmanagelisting: '',
  });

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [showFavGenre, setShowFavGenre] = useState([]);
  const [loader, setLoader] = useState('');
  // const [passSuccess, setPassSuccess] = useState('');
  // const [userLocation, setUserLocation] = useState('');
  const [loaderProfile, setLoaderProfile] = useState('');
  const [successProfile, setSuccessProfile] = useState('');
  const [groups, setGroups] = useState([]);
  const [intersets, setIntersets] = useState([]);

  //payment related variables
  const [userLoggedIn, setUserLoggedIn] = useState('');
  const [StripeCustomer, setStripeCustomer] = useState('');
  // const [subscriptionRenewsOn, setSubscriptionRenewsOn] = useState('');
  const [blnPaymentUpdate, setblnPaymentUpdate] = useState(false);
  const [blnCancelSubscription, setblnCancelSubscription] = useState(false);
  const paymentUpdateMsg = 'Your payment details has been updated successfully.';
  const cancelSubscriptionMsg = 'Your subscription has been cancelled successfully.';
  const [blnShowCancelWarning, setblnShowCancelWarning] = useState(false);
  const [InvoiceDataLoaded, setInvoiceDataLoaded] = useState(false);
  const [InvoiceData, setInvoiceData] = useState([]);
  const [SubscriptionDataLoaded, setSubscriptionDataLoaded] = useState(false);
  const [SubscriptionData, setSubscriptionData] = useState([]);
  const [ShowEditSubscription, setShowEditSubscription] = useState(false);
  const [EditSubscriptionData, setEditSubscriptionData] = useState([]);
  const [EditPaymentData, setEditPaymentData] = useState([]);
  const NoInvoiceMsg = 'No invoices found.';
  const NoSubscriptionMsg = 'No subscription found.';
  const [blnShowNoInvoiceMsg, setblnShowNoInvoiceMsg] = useState(false);
  const [blnShowNoSubscriptionMsg, setblnShowNoSubscriptionMsg] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('email')) {
      localStorage.removeItem('email');
      router.push('/login');
    }
    setUserLoggedIn(localStorage.getItem('email'));
  }, []);

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
        showmanagelisting: useValues.showmanagelisting,
      });

      // const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      // const time = new Date(useValues.endDate);
      // time.setDate(time.getDate() + 1);
      // setSubscriptionRenewsOn(time.toLocaleDateString('en-US', dateOptions));
      // console.log(useValues.subscriptionCancel);
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
        // dispatch(auth({ user, subscriber, latitude: state.latitude, longitude: state.longitude, pincode: state.pincode }));

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

  const getStripeCustomerID = async () => {
    let stripeCustomer = '';
    //get customer id
    const cust = await getCustomer(userLoggedIn);
    const customer = cust?.customer?.data;
    if (customer.length) {
      stripeCustomer = customer[0].id;
      setStripeCustomer(stripeCustomer);
    } else {
      //no customer found in stripe
      setblnShowNoInvoiceMsg(true);
      setblnShowNoSubscriptionMsg(true);
      return;
    }
    return stripeCustomer;
  };
  const LoadInvoiceData = async () => {
    let customer;
    if (StripeCustomer === '') {
      customer = await getStripeCustomerID();
    } else {
      customer = StripeCustomer;
    }

    if (customer) {
      // get invoices
      const res = await fetch('/api/stripe/get-invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: customer }),
      });
      const { invoices } = await res.json();
      setInvoiceData(invoices.data);
      setInvoiceDataLoaded(true);
    }
  };
  const LoadSubscriptionData = async () => {
    let customer;
    if (StripeCustomer === '') {
      customer = await getStripeCustomerID();
    } else {
      customer = StripeCustomer;
    }

    // get subscriptions
    const sub_res = await fetch('/api/stripe/get-subscriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId: customer }),
    });
    const { subscriptions } = await sub_res.json();
    setSubscriptionData(subscriptions.data);
    setSubscriptionDataLoaded(true);
  };
  const [accopen, setAccopen] = useState(false);
  const accInvoiceOpen = () => {
    if (!InvoiceDataLoaded) LoadInvoiceData();
    setAccopen(false);
  };
  const accSubscriptionOpen = () => {
    if (!SubscriptionDataLoaded) LoadSubscriptionData();
    setAccopen(false);
  };

  const scrollDivRef = useRef(null);
  const EditSubscription = async (index) => {
    const subscriptionData = SubscriptionData[index];
    const custPaymentMethod = subscriptionData.default_payment_method;

    // get payment data
    const res = await fetch('/api/stripe/get-payment-method', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ custPaymentMethod, email: LOGGED_EMAIL }),
    });
    const { paymentMethod } = await res.json();
    setShowEditSubscription(true);
    setEditSubscriptionData(subscriptionData);
    setEditPaymentData(paymentMethod);
    setAccopen(true);
    scrollDivRef.current && scrollDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  };

  const updatePaymentSection = async (updatedPaymentMethod, subscriptionData) => {
    // get payment data
    const res = await fetch('/api/stripe/get-payment-method', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ custPaymentMethod: updatedPaymentMethod }),
    });
    const { paymentMethod } = await res.json();
    setShowEditSubscription(true);
    setEditSubscriptionData(subscriptionData);
    setEditPaymentData(paymentMethod);
    const updatedSubscription = SubscriptionData.filter((item) => item.id == subscriptionData.id);
    updatedSubscription[0].default_payment_method = updatedPaymentMethod;
    setblnPaymentUpdate(true);
    setTimeout(() => {
      setblnPaymentUpdate(false);
    }, 2000);
  };

  const cancelStripeSubscription = async (e, subscriptionId) => {
    e.preventDefault();
    console.log(subscriptionId);
    try {
      await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId }),
      })
        .then((res) =>
          res.json().then((subscriptionObj) => {
            if (subscriptionObj.deleted && subscriptionObj.deleted.status === 'canceled') {
              console.log('cancel subscription for user: ' + user + ' with subscription ' + subscriptionId);
              const updatedSubscriptionData = SubscriptionData.filter((item) => item.id !== subscriptionId);
              setblnShowCancelWarning(false);
              setblnCancelSubscription(true);
              setTimeout(() => {
                setblnCancelSubscription(false);
                setShowEditSubscription(false);
              }, 2000);
              setSubscriptionData(updatedSubscriptionData);
              CancelSubscriptionFromWP(subscriptionId);
            }
          })
        )
        .catch((e) => console.log(e));
    } catch (err) {
      console.error(err);
    }
  };

  const CancelSubscriptionFromWP = async (subscriptionId) => {
    const subscptn = 'subscriptionId=' + subscriptionId + '&userEmail=' + user;
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/new_user_stipe_response.php?' + subscptn);
      $('.signup-loader').hide();
      return response.data;
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    }
  };
  return (
    <>
      <section className='profileinfo'>
        <div className='container'>
          <div className='top_txt df fww'>
            <h2 className='first-letter'>{state.firstName ? `Welcome! ${state.firstName} ${state.lastName} ` : ''}</h2>

            <div className='pro_edit_savebtn'>
              {state.showmanagelisting === 'true' ? (
                <Link href='/managelisting-admin/'>
                  <button className='btn savebtn ghostbtn mr-4'>Manage Listing</button>
                </Link>
              ) : null}

              {/* <button className='btn savebtn ghostbtn' onClick={handleSubmit}>
                Save Changes
              </button> */}
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
                {/* {passSuccess} */}
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
              <select name='country' defaultValue={state.country ? state.country : 'USA'} onChange={handleChange}>
                <option value='USA'> USA </option>
                <option value='Canada'> Canada </option>
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
                <input type='text' className='proinputfield' name='location' value={state.location} placeholder='Location' onChange={handleChange} />
                <i className='fas fa-location' onClick={getLocation}></i>
              </p>
            </div>
            <div className='profile_field'>
              <p className='labeltxt'>Favorite Movie Genres</p>
              <ul className='generetype'>
                {showFavGenre &&
                  showFavGenre.map((genreList, index) => {
                    return <li key={index}>{genreList.charAt(0).toUpperCase() + genreList.slice(1)}</li>;
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
                      <div className={`newssubscribe_item newssubscribe_items_${currentValue.cat_id}`} key={index}>
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

            <div className='pro_savebtn'>
              {successProfile ? <div className='successmsg '> {successProfile}</div> : ''}
              {loaderProfile}
              <button className='btn savebtn ghostbtn' onClick={handleSubmit}>
                SAVE CHANGES
              </button>
            </div>
          </div>
          <div className='invoicesubscribe'>
            <Faqitems question={'Invoice History'} accopen={accInvoiceOpen}>
              {InvoiceDataLoaded ? (
                InvoiceData.length > 0 ? (
                  <table className='responsive dataTable'>
                    <thead>
                      <tr>
                        <th data-title='InvoiceNo'>Invoice No</th>
                        <th data-title='InvoiceDate'>Invoice Date</th>
                        <th data-title='InvoiceItem'>Invoice Item</th>
                        <th data-title='InvoiceAmount'>Invoice Amount</th>
                        <th data-title='InvoiceLink'>Invoice Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {InvoiceData.map((invoice, index) => {
                        const date = new Date(invoice.effective_at * 1000).toLocaleDateString('en-US');
                        return (
                          <tr id={index + 1} className='' role='row' key={index}>
                            <td data-title='InvoiceNo'>{invoice.number}</td>
                            <td data-title='InvoiceDate'>{date}</td>
                            <td data-title='InvoiceItem'>{invoice.lines?.data && invoice.lines?.data[0].description}</td>
                            <td data-title='InvoiceAmount'>${invoice.amount_paid / 100}</td>
                            <td data-title='InvoiceLink'>
                              <a target='_blank' href={invoice.hosted_invoice_url}>
                                {invoice.number}
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <span>{NoInvoiceMsg}</span>
                )
              ) : (
                <>
                  {blnShowNoInvoiceMsg ? (
                    <span>{NoInvoiceMsg}</span>
                  ) : (
                    <div className='pvr container' style={{ marginBottom: 40 }}>
                      <div className='lodarhight'>
                        <Loader />
                      </div>
                    </div>
                  )}
                </>
              )}
            </Faqitems>
            <Faqitems question={'Active Subscriptions'} accopen={accSubscriptionOpen}>
              {SubscriptionDataLoaded ? (
                SubscriptionData.length > 0 ? (
                  <table className='responsive dataTable'>
                    <thead>
                      <tr>
                        <th data-title='SubscriptionItem'>Subscription Item</th>
                        <th data-title='SubscriptionStartDate'> Start Date</th>
                        <th data-title='SubscriptionEndDate'> Renew Date</th>
                        <th data-title='SubscriptionAmount'> Amount</th>
                        <th data-title='UpdateSubscription'> Manage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SubscriptionData.map((subscription, index) => {
                        const startDate = new Date(subscription.current_period_start * 1000).toLocaleDateString('en-US');
                        const endDate = new Date(subscription.current_period_end * 1000).toLocaleDateString('en-US');
                        return (
                          <>
                            <tr id={index + 1} className='' role='row' key={index}>
                              <td data-title='SubscriptionItem'>{subscription.metadata?.item}</td>
                              <td data-title='SubscriptionStartDate'>{startDate}</td>
                              <td data-title='SubscriptionEndDate'>{endDate}</td>
                              <td data-title='SubscriptionAmount'>${subscription.plan.amount / 100}</td>
                              <td
                                data-title='UpdateSubscription'
                                onClick={() => {
                                  EditSubscription(index);
                                }}>
                                <span className='bluetxt'>Update</span>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <span>{NoSubscriptionMsg}</span>
                )
              ) : (
                <>
                  {blnShowNoSubscriptionMsg ? (
                    <span>{NoSubscriptionMsg}</span>
                  ) : (
                    <div className='pvr container' style={{ marginBottom: 40 }}>
                      <div className='lodarhight'>
                        <Loader />
                      </div>
                    </div>
                  )}
                </>
              )}
            </Faqitems>
            {ShowEditSubscription && accopen && (
              <div className='prosubscription' ref={scrollDivRef}>
                <h2>Subscription</h2>
                <div className='subscribrow'>
                  <div className='subscribitemrow df fww'>
                    <p>
                      <strong>{EditSubscriptionData.metadata.item + ' (' + EditSubscriptionData.metadata.listingType + ')'}</strong> {/* Pro {subscriberPlan} ${planPrice} */}
                      <div>
                        Frequency: <strong>{EditSubscriptionData.items?.data[0]?.plan?.interval === 'month' ? 'Monthly' : 'Yearly'}</strong>
                      </div>
                      Price: <strong>${EditSubscriptionData.items?.data[0]?.plan?.amount_decimal / 100}</strong>
                    </p>
                    <button className='ghostbtn redbtn uppercase' onClick={showCancelWarn}>
                      cancel subscription
                    </button>
                    {blnShowCancelWarning && (
                      <div className='pro_unsubscribe'>
                        <h5>Are You Sure You Want To Cancel Your Subscription?</h5>
                        <div className='unsubscribe_btn'>
                          <span
                            className={`btn ghostbtn`}
                            onClick={(e) => {
                              cancelStripeSubscription(e, EditSubscriptionData.id);
                            }}
                            target='_self'>
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
                          <strong>{new Date(EditSubscriptionData.current_period_end * 1000).toLocaleDateString('en-US')}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='subscribrow'>
                  <p>Payment Method</p>
                  <div className='subscribitemrow'>
                    {EditPaymentData?.type === 'link' ? (
                      <>
                        <p>
                          <Image src={LinkImage} as='image' title='Link' alt='Link' width='60' height='30' className='' />
                          account with <strong>{EditPaymentData?.link?.email} </strong>
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          <strong>
                            {EditPaymentData?.card?.brand} ending in {EditPaymentData?.card?.last4}
                          </strong>
                        </p>
                        <p>
                          Expiry {EditPaymentData?.card?.exp_month}/{EditPaymentData?.card?.exp_year}
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
                        <CheckoutForm requestfrom='profilepagePayment' updatePayment={updatePaymentSection} editSubscriptionId={EditSubscriptionData.id} />
                      </Elements>
                    </div>
                    {blnPaymentUpdate ? <div className='successmsg '> {paymentUpdateMsg}</div> : ''}
                  </div>
                </div>
                {blnCancelSubscription ? <div className='successmsg '> {cancelSubscriptionMsg}</div> : ''}
              </div>
            )}
          </div>

          <div>{/* <button onClick={LoadInvoiceData}>Show Invoice History</button> */}</div>
        </div>
      </section>
    </>
  );
};

Profile.getLayout = function (page) {
  return <WithReduxLayout layout='withRedux'>{page}</WithReduxLayout>;
};
export default Profile;
