import React from 'react';
import './css/profile.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import FOURABT from './SignupSteps/images/sdprofile.svg';
import axios from 'axios';

import useLoginCheck from './useLoginCheck';
const LOGGED_EMAIL = localStorage.getItem('email');
const LOGIN_TYPE = localStorage.getItem('from');
const LOGGED_AVATAR = localStorage.getItem('avatar');
const LOGGED_AVATAR_TITLE = localStorage.getItem('avatarTitle');
const SUCCESS = 'Profile Details Updated Successfully';
const LOADER = ' Please wait..While we are saving the details..';
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const $ = require('jquery');
const Profile = () => {
  const navigate = useNavigate();
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

  const loginCheck = useLoginCheck();

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
      });
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
        navigate('/verify_email', { replace: true });
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
        });
        // setUserLocation(json.results[0].formatted);
      });
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  return (
    <>
      {loginCheck}
      <section className="profileinfo">
        <div className="container">
          <div className="top_txt df fww">
            <h2 className="first-letter">{state.firstName ? `Welcome! ${state.firstName} ${state.lastName} ` : ''}</h2>

            <div className="pro_edit_savebtn">
              <button className="btn savebtn ghostbtn" onClick={handleSubmit}>
                Save Changes
              </button>
              {successProfile ? <div className="successmsg "> {successProfile}</div> : ''}
              {loaderProfile}
            </div>
          </div>
          <div className="profileinfobox grid">
            <div className="avatar_fieldsave">
              <p className="labeltxt">Profile Image</p>
              <div className="avtarchangeremove df fww">
                <div className="avtarpicbox">
                  <div className="avtarpicinfo pvr">
                    {LOGGED_AVATAR ? <img src={LOGGED_AVATAR} alt={LOGGED_AVATAR_TITLE} className="objctimg_box" /> : <img src={FOURABT} alt="" className="objctimg_box" />}

                    {selectedFile && <img src={preview} className="objctimg_box" />}
                  </div>
                  <div className="latter_box">TB</div>
                </div>
                <div className="uploadsbtninfo pvr  df fww">
                  <Link href="/avatar/" className="logo" title="Change Image" rel="home">
                    <button className="uploadsbtn btn goldbtn">CHANGE IMAGE</button>
                  </Link>

                  <p className="filename"></p>
                </div>
              </div>
            </div>
            <div className="profile_field">
              <p className="labeltxt">First Name</p>
              <input type="text" className="proinputfield" name="firstName" value={state.firstName} onChange={handleChange} placeholder="Firstname" />
            </div>
            <div className="profile_field">
              <p className="labeltxt">Last Name</p>
              <input type="text" className="proinputfield" name="lastName" value={state.lastName} onChange={handleChange} placeholder="Lastname" />
            </div>
            <div className="profile_field">
              <p className="labeltxt">Username</p>
              <input type="text" className="proinputfield" onChange={handleChange} name="userName" value={state.userName} placeholder="Username" disabled />
            </div>
            {LOGIN_TYPE !== 'gmail' ? (
              <div className="profile_field">
                <p className="labeltxt">Password</p>
                <div className="passeditbox proinputfield df fww pvr">
                  <input type="text" defaultValue="" placeholder="● ● ● ● ● ●" />
                  <a className="editbox" onClick={getForgotEmail}>
                    Change Password
                  </a>
                </div>
                {loader === 1 ? <span>Loading..</span> : ''}
                {passSuccess}
              </div>
            ) : (
              ''
            )}

            <div className="profile_field">
              <p className="labeltxt">Email</p>
              <input type="text" className="proinputfield" name="email" value={state.email} placeholder="email@gmail.com " onChange={handleChange} disabled />
            </div>
            <div className="profile_field">
              <p className="labeltxt">Phone</p>
              <div className="phonebox pvr">
                <select className="countrycode" placeholder="+1" name="countryCode" value={state.countryCode ? state.countryCode : '+1'} onChange={handleChange}>
                  <option value="+1">+1</option>
                  <option value="+2">+2</option>
                  <option value="+3">+3</option>
                  <option value="+4">+4</option>
                </select>

                <input type="text" className="proinputfield" name="phone" value={state.phone} placeholder="XXX-XXX-XXXX" onChange={handleChange} />
              </div>
            </div>
            <div className="profile_field">
              <p className="labeltxt">Website</p>
              <input type="text" className="proinputfield" name="website" value={state.website} onChange={handleChange} placeholder="sreendollars.com" />
            </div>
            <div className="profile_field">
              <p className="labeltxt">Country</p>
              <select name="country" value={state.country ? state.country : 'USA'} onChange={handleChange}>
                <option value="USA" selected={state.country ? state.country : 'USA'}>
                  USA
                </option>
                <option value="Canada" selected={state.country ? state.country : 'Canada'}>
                  Canada
                </option>
              </select>
            </div>
            <div className="profile_field">
              <p className="labeltxt">Job Title</p>
              <input type="text" className="proinputfield" name="jobTitle" value={state.jobTitle} placeholder="Job Title" onChange={handleChange} />
            </div>
            <div className="profile_field">
              <p className="labeltxt">Organization</p>
              <input type="text" className="proinputfield" name="organization" value={state.organization} placeholder="Organization" onChange={handleChange} />
            </div>
            <div className="profile_field">
              <p className="labeltxt">Background</p>
              <input type="text" className="proinputfield" name="background" value={state.background} placeholder="Background" onChange={handleChange} />
            </div>
            <div className="profile_field">
              <p className="labeltxt">Type of Organization</p>
              <input type="text" className="proinputfield" name="typeOrg" value={state.typeOrg} placeholder="Type of Organization" onChange={handleChange} />
            </div>
            <div className="profile_field">
              <p className="labeltxt">Location</p>
              <p className="locationinfo pvr">
                <input type="text" className="proinputfield" name="location" value={userLocation !== '' ? userLocation : state.location} placeholder="Location" onChange={handleChange} />
                <i className="fas fa-location" onClick={getLocation}></i>
              </p>
            </div>
            <div className="profile_field">
              <p className="labeltxt">Favorite Movie Genres</p>
              <ul className="generetype">
                {showFavGenre.map((genreList) => {
                  return <li>{genreList.charAt(0).toUpperCase() + genreList.slice(1)}</li>;
                })}
                <li>
                  <Link href="/favorite_genre">
                    <button className="btn">Update</button>{' '}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="prefere_newslatter">
              <div className="top_txt">
                <h2>Newsletters</h2>
                <p>Subscribed Newsletters (Use the toggle button to unsubscribe from the listed newsletter)</p>
              </div>
              <div className="newssubscribe df fww just-between">
                {groups.map((currentValue, index) => {
                  return (
                    <div className={`newssubscribe_item newssubscribe_items_${currentValue.cat_id}`}>
                      <div className="newssubscribe_intro">
                        <div className="top_title">
                          <h5>{currentValue.cat_name}</h5>
                          <div
                            className={`newstoggle  newstoggle_${currentValue.cat_id} ${intersets.includes(currentValue.cat_id) ? '' : 'off'}`}
                            onClick={() => newsToggle(currentValue.cat_id)}
                            id={currentValue.cat_id}
                          >
                            <div className="nwtoggleg"></div>
                            <div className="nwtogglehandle"></div>
                          </div>
                        </div>
                        <div className="newssubscribe_info df fww">
                          <p>
                            {currentValue.intersets_conent}

                            <span>
                              <strong>{currentValue.intersets_day}</strong>
                            </span>
                          </p>
                          <div className="preview_btn">
                            <a href={currentValue.links} className="btn ghostbtn" target="_self">
                              preview
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="newsltr_unsubscribe text-center">
                        <h5>
                          Are You Sure You Want To {intersets.includes(currentValue.cat_id) ? 'Unsubscribe' : 'Subscribe'} From {currentValue.cat_name}?
                        </h5>
                        <div className="unsubscribe_btn">
                          <span className={`btn ghostbtn unsubbtn unsubbtn_${currentValue.cat_id}`} onClick={() => unsubScribeToggle(currentValue.cat_id)} target="_self">
                            {intersets.includes(currentValue.cat_id) ? 'unsubscribe' : 'subscribe'}
                          </span>
                          <span  className={`btn ghostbtn canclenewsbtn canclenewsbtn_${currentValue.cat_id}`} onClick={() => cancelToggle(currentValue.cat_id)} target="_self">
                            cancel
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pro_savebtn text-center">
              {successProfile ? <div className="successmsg "> {successProfile}</div> : ''}
              {loaderProfile}
              <button className="btn savebtn ghostbtn" onClick={handleSubmit}>
                SAVE CHANGES
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
