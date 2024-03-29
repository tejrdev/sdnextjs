import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
var CryptoJS = require('crypto-js');
const ENCT_KEY = process.env.NEXT_PUBLIC_ENC_KEY;
const API_URL = process.env.NEXT_PUBLIC_SD_API;
import loginprofile from '../../public/images/loginprofileon.svg';
import Premium from '../../public/Premium.svg';
import axios from 'axios';
const $ = require('jquery');
const imageWidth = {
  width: '35px',
  borderRadius: '20px',
};

const Logout = () => {
  const router = useRouter();
  const [notifications, setNotficatons] = useState([]);
  const [openClass, setOpenClass] = useState('');
  useEffect(() => {
    const storedDataJSON = localStorage.getItem('myNotifications');
    if (storedDataJSON !== null) {
      try {
        setNotficatons(JSON.parse(storedDataJSON));
      } catch (error) {
        setNotficatons([]);
      }
    }
  }, []);

  const loggedout = (value) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('enc_email');
      localStorage.removeItem('email');
      localStorage.removeItem('avatar');
      localStorage.removeItem('avatarTitle');
      localStorage.removeItem('from');
      localStorage.setItem('type_link', '');
      localStorage.removeItem('type_link');
      localStorage.clear();
    }
    window.location.href = '/api/auth/federated-logout';
    // router.push('/');
  };

  if (typeof window !== 'undefined') {
    var login = localStorage.getItem('email');
    var enc_login = localStorage.getItem('enc_email');
    var LOGGED_EMAIL = localStorage.getItem('email');
    var enc_emailcheck = '';
    if (enc_login !== '' && enc_login !== null) {
      var bytes = CryptoJS.AES.decrypt(enc_login, ENCT_KEY);
      try {
        enc_emailcheck = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      } catch (error) {
        enc_emailcheck = '';
      }
    }
    var avatarImage = localStorage.getItem('avatar');
    var type_link = localStorage.getItem('type_link');
  }

  const openNotificaton = () => {
    if (openClass == '') {
      setOpenClass('open');
    } else {
      setOpenClass('');
    }
  };

  useEffect(() => {
    $('.headsignout .signico').click(function () {
      $(this).toggleClass('open');
    });
    $('.notifynav').click(function () {
      $(this).parent().next().addClass('open');
    });
    $('.notifyclose').click(function () {
      $(this).parent().hide();
    });
    $('.closenotifybox').click(function () {
      $('.notifybox li').hide();
      $(this).parent().parent().hide();
    });
  }, []);
  const redirectMessage = (url) => {
    router.push(url);
  };

  useEffect(() => {
    listNotifications();
  }, []);

  const listNotifications = async () => {
    var url = API_URL + '/notifications/all.php';
    await axios
      .get(url, {
        params: {
          email: window.btoa(login),
        },
      })
      .then((res) => {
        setNotficatons(res.data);
      })
      .catch((err) => console.log('Notify lists error ', err));
  };

  const dismissAll = () => {
    const notificationsAll = document.querySelectorAll('.notification');
    //setOpenClass('');
    let arrayNotify = [];
    notificationsAll.forEach(function (notification) {
      arrayNotify.push(notification.dataset.notificationId);
      //notification.style.display = 'none';
      const notificationId = notification.dataset.notificationId;
      //console.log(notificationId);
      //saveArchivedStatus(notificationId);
    });
    const disable = async () => {
      var url = API_URL + '/notifications/dismissAll.php';
      await axios
        .get(url, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
          },
        })
        .then((res) => {
          // console.log(res.data);
          setNotficatons([]);
          setOpenClass('');
        })
        .catch((err) => console.log('Notify lists error ', err));
    };
    disable();
  };

  const dismissSingle = (id, type) => {
    document.addEventListener('DOMContentLoaded', function () {
      const notificationsSingle = document.getElementById(id);
      if (notificationsSingle) {
        notificationsSingle.style.display = 'none';
      }
    });

    const disableSingle = async () => {
      var url = API_URL + '/notifications/dismissSingle.php';
      await axios
        .get(url, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            message: window.btoa(type),
          },
        })
        .then((res) => {
          //  console.log(res.data);
          setNotficatons(res.data);
          setOpenClass('open');
          if (notifications.length === 0) setOpenClass('');
        })
        .catch((err) => console.log('Notify single list error ', err));
    };
    disableSingle();
  };

  const switchtoPro = () => {
    router.push('/pro/checkout');
    // const switchpro = async () => {
    //  var switch_url = API_URL + '/SD_PRO/switch.php';
    //  await axios
    //    .get(switch_url, {
    //    params: {
    //      email: window.btoa(LOGGED_EMAIL),
    //    },
    //    })
    //    .then((res) => {
    //          localStorage.setItem('type_link', 'pro');
    //          router.push('/pro/thankyou');
    //    })
    //    .catch((err) => console.log('Switch error ', err));
    //  };
    //  switchpro();
  };

  return (
    <>
      {login === enc_emailcheck ? (
        <div className='userin df fww'>
          <div className='favheadbtn'>
            <Link href='/favorite' className='ghostbtn'>
              Favorites<i className='far fa-heart '></i>
            </Link>
          </div>
          <div className={type_link === 'pro' ? 'headsignout  proico' : 'headsignout'}>
            <div className='signico '>
              <figure className='pvr'>
                {avatarImage ? <Image src={avatarImage} rel='preload' as='image' title={login} alt='profile' width='35' height='35' style={{ borderRadius: '50px' }} /> : <Image src={loginprofile} rel='preload' as='image' title={login} width='35' height='35' style={{ borderRadius: '50px' }} alt='profile' />}

                {notifications.length > 0 ? <span className='notifydot' title='Notifications'></span> : ''}
              </figure>
            </div>

            <ul className='profileiconav'>
              <li>
                <Link href='/profile' className='logo' title='Screendollars' rel='home'>
                  {' '}
                  <i className='fas fa-user'></i> Your Profile
                </Link>
              </li>
              {type_link === 'default' || type_link === null ? (
                <li>
                  <label htmlFor='' onClick={switchtoPro}>
                    <span className='ico'>
                      <Image src={Premium} width={16} height={16} alt='upgradeto pro' className='premium_img' />
                    </span>
                    Upgrade to Pro{' '}
                  </label>
                </li>
              ) : (
                ''
              )}
              {notifications.length > 0 ? (
                <li className='notifynav pvr' onClick={openNotificaton}>
                  <i className='fas fa-bell'></i> Notifications ({notifications.length}) <span className='notifydot' title='Notifications'></span>
                </li>
              ) : (
                ''
              )}
              <li>
                <label htmlFor='' onClick={() => loggedout('clicked')}>
                  {' '}
                  <i className='fas fa-sign-out-alt'></i> Log Out{' '}
                </label>
              </li>

              {notifications.length > 0 ? (
                <>
                  <ul className={'notifybox ' + openClass}>
                    <li className='df fww just-between'>
                      <strong onClick={openNotificaton}>Notifications </strong>{' '}
                      <span className='closenotifybox' onClick={() => dismissAll(notifications)}>
                        Dismiss All
                      </span>
                    </li>
                    {notifications.map((curent, index) => {
                      const notifyMessage = curent.message;
                      const id = curent.id;
                      const type = curent.type;
                      const url = curent.link;

                      return (
                        <React.Fragment key={index}>
                          <li className='pvr notification' id={id}>
                            <span onClick={() => redirectMessage(url)}> {notifyMessage} </span>{' '}
                            <span className='notifyclose' onClick={() => dismissSingle(id, type)}>
                              {' '}
                              +{' '}
                            </span>
                          </li>
                        </React.Fragment>
                      );
                    })}
                    {/* <li className="pvr"><a href="#"> ---Your User Profile Has Not Yet Been Completed. <br/> Please Complete Your Profile. </a><span className="notifyclose"> + </span></li> */}
                  </ul>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div className='userin df fww' style={{ display: '' }}>
          <div className='favheadbtn'>
            <Link href='/favorite/' className='ghostbtn'>
              Favorites <i className='far fa-heart '></i>
            </Link>
          </div>
          <div className='headsign'>
            <div className='signico'>
              <Link href='/login' title='Sign In'>
                <Image src={loginprofile} rel='preload' as='image' title={login} alt='profile' />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
