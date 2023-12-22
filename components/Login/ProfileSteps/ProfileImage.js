import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {useRouter} from 'next/router';
import axios from 'axios';
import SDPRO from '../images/sdprofile.svg';
import BOY1 from '../images/Boy1.svg';
import BOY2 from '../images/Boy2.svg';
import BOY3 from '../images/Boy3.svg';
import BOY4 from '../images/Boy4.svg';
import BOY5 from '../images/Boy5.svg';
import BOY6 from '../images/Boy6.svg';
import GIRL1 from '../images/Girl1.svg';
import GIRL2 from '../images/Girl2.svg';
import GIRL3 from '../images/Girl3.svg';
import GIRL4 from '../images/Girl4.svg';


var LOGGED_AVATAR_TITLE = 'Boy1';
if (typeof window !== 'undefined') {
  var LOGGED_AVATAR_TITLE = localStorage.getItem('avatarTitle');
  if(LOGGED_AVATAR_TITLE===''){
    var LOGGED_AVATAR_TITLE = 'Boy1';
  }
  //var LOGGED_AVATAR = localStorage.getItem('avatar');
 var LOGGED_AVATAR ='';
var LOGGED_EMAIL = localStorage.getItem('email');

}

const LOADER = 'Loading...';
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const USER_EXISTS_ERROR = 'Username Already Exists !';

const ProfileImage = ({ children, active }) => {
  const router =useRouter();
  const fileDetail = useRef();
  const [selectedFile, setSelectedFile] = useState();
  const [avatarIconValue, setAvatarIconValue] = useState(LOGGED_AVATAR_TITLE);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [imageType, setImageType] = useState('avatar');
  const [preview, setPreview] = useState(LOGGED_AVATAR);
  const [loaderProfile, setLoaderProfile] = useState('');
  const [username, setUsername] = useState('');
  const [usernameCheck, setUsernameCheck] = useState('');
  const [usernameLoader, setUsernameLoader] = useState('');
  const[usernameStatus,setUsernameStatus] = useState(0);
  const [show, setShow] = useState('save');

  const getUserNameStatus = async (event) => {
    setUsernameLoader(LOADER);
    var formData = new FormData();

    formData.append('user_login', username);
    formData.append('id', LOGGED_EMAIL);
    var user_exists_url = API_URL + '/login/user_exists.php';
    const userexistence = await axios
      .post(user_exists_url, formData, {})
      .then((res) => {
        setUsernameLoader('');
        setUsernameCheck(' ');
        if (res.data === 1) {
          setUsernameCheck(USER_EXISTS_ERROR);
          setUsernameStatus(1);
          return false;
        }if(res.data === 0){
          setUsernameStatus(2);//sucess
        }
      })
      .catch((err) => console.log('upload: ', err));
  };

  const activeAvtar = (value, avatarUrl) => {
    setAvatarIconValue(value);
    setImageType('avatar');
    setShow('save');
    setSelectedAvatar(avatarUrl.src);

  };
  const saveAvatar = async () => {
    getUserNameStatus();
    if (imageType === 'profile') {
      document.getElementById('submitImage').click();
    }
   // console.log(imageType);console.log(usernameStatus);
    if (imageType === 'avatar' && usernameStatus===2) {
      setLoaderProfile(LOADER);
      var avatarstatic_url = API_URL + '/login/avatar-static.php';
      const getDetails = await axios.get(avatarstatic_url, {
        params: {
          id: window.btoa(LOGGED_EMAIL),
          im: window.btoa(selectedAvatar),
          username: username,
          avatar: avatarIconValue,
        },
      });
      setLoaderProfile('');
      let urlElements = window.location.href.split('/profile_steps');
      localStorage.setItem('avatar',  urlElements[0]+selectedAvatar);
      localStorage.setItem('avatarTitle', avatarIconValue);
      router.push('/steps_success');

    }
  };
  const setImage = async (event) => {
    event.preventDefault();
    getUserNameStatus();
    setLoaderProfile(LOADER);
    var formData = new FormData();
    if(usernameStatus===2){
       //  var imagefile = document.querySelector('#file');
    formData.append('file', selectedFile);
    formData.append('email', LOGGED_EMAIL);
    formData.append('username', username);
    var avatarprofile_url = API_URL + '/login/avatar-profile.php';
    const uploadAwait = await axios
      .post(avatarprofile_url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setLoaderProfile('');
        localStorage.setItem('avatar', res.data);
        setPreview(LOGGED_AVATAR);
        router.push('/steps_success');
      })
      .catch((err) => console.log('upload: ', err));
    }

  };

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setShow('upload');

    setSelectedFile(e.target.files[0]);
    setAvatarIconValue(e.target.files[0].name);
    setImageType('profile');
  };
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setSelectedAvatar(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <>
      <div className={` prostep_item ${active}`}>
        <div className="top_txt text-center">
          <h2>Personalize Your Experience </h2>
        </div>

        <div className="prostep_pic">
          <div className="fieldbox">
            <div className="tagbox  df fww unicuser">
              <label>
                <strong>Choose a Username </strong>
              </label>
              <div className="taginfo df fww">
                <i className="fal fa-info-circle"></i>
                <p>This Include Distributors, Exhibitors, Vendors And Film Festivals Etc...</p>
              </div>
            </div>
            <span className="redtxt">{usernameCheck}</span>
            <input type="text" placeholder="Enter text" value={username} onChange={(e) => setUsername(e.target.value)} onBlur={getUserNameStatus} />
            {usernameLoader}
          </div>
          <div className="top_txt df fww tagbox">
            <label>
              <strong>Profile Image </strong>
            </label>
            <div className="taginfo df fww">
              <i className="fal fa-info-circle"></i>
              <p>This Include Distributors, Exhibitors, Vendors And Film Festivals Etc...</p>
            </div>
          </div>

          <div className="proupdateimg df fww">
            <div className="prosteppicimg  m20">

              <Image src={preview ? preview : SDPRO} rel="preload"
                as="image" title="Profile image"  alt="Profile image" width="150"  height="150"/>
            </div>
            <form method="POST" onSubmit={setImage}>
              <div className="uploadsbtninfo pvr  df fww">
                <button className="uploadsbtn btn goldbtn">upload Image</button>
                <p className="greytxt">
                  <small>
                    (“Image size recommended to be no smaller than 100x100 pixels”)
                  </small>
                </p>
                <input type="file" className="imgInp" name="uploadImage" ref={fileDetail} onChange={onSelectFile} />
                <p className="filename"></p>
              </div>
              <input type="submit" value="Submit File with form" onSubmit={setImage} id="submitImage" style={{ display: 'none' }} />
            </form>
          </div>
          <div className="orliner">
            <span>OR</span>
          </div>
          <div className="chooseavatar">
            <p>Select one of these: </p>
            <div className="avatarsinfo grid gap16">

              <div className={'avtarpic  ' + (avatarIconValue === 'Boy1' ? 'active' : ' ')}
              onClick={() => activeAvtar('Boy1', BOY1)}>

                <Image src={BOY1} rel="preload"
                as="image" title="Boy1" className="animation" alt="Boy1"
               />
              </div>
              <div className={'avtarpic  ' + (avatarIconValue === 'Boy2' ? 'active' : ' ')}
              onClick={() => activeAvtar('Boy2', BOY2)}>
                <Image src={BOY2} rel="preload"
                as="image" title="Boy2" className="animation" alt="Boy2" />
              </div>
              <div className={'avtarpic  ' + (avatarIconValue === 'Boy3' ? 'active' : ' ')}
              onClick={() => activeAvtar('Boy3', BOY3)}>

                <Image src={BOY3} title="Boy3" className="animation" alt="Boy3" />
              </div>
              <div className={'avtarpic  ' + (avatarIconValue === 'Boy4' ? 'active' : ' ')}
              onClick={() => activeAvtar('Boy4', BOY4)}>

                <Image src={BOY4} rel="preload" title="Boy4"  alt="Boy4" />
              </div>
              <div className={'avtarpic  ' + (avatarIconValue === 'Boy5' ? 'active' : ' ')}
                onClick={() => activeAvtar('Boy5', BOY5)}>

                  <Image src={BOY5} rel="preload" title="Boy5"  alt="Boy5" />
                </div>
                <div className={'avtarpic  ' + (avatarIconValue === 'Boy6' ? 'active' : ' ')}
                onClick={() => activeAvtar('Boy6', BOY6)}>

                  <Image src={BOY6} rel="preload" title="Boy6"  alt="Boy6" />
                </div>
              <div className={'avtarpic  ' + (avatarIconValue === 'Girl1' ? 'active' : ' ')}
              onClick={() => activeAvtar('Girl1', GIRL1)}>
                <Image src={GIRL1} title="Girl2"  alt="Girl2" />
              </div>
              <div className={'avtarpic  ' + (avatarIconValue === 'Girl2' ? 'active' : ' ')}
              onClick={() => activeAvtar('Girl2', GIRL2)}>
                <Image src={GIRL2} title="Girl2"  alt="Girl2" />
              </div>
              <div className={'avtarpic  ' + (avatarIconValue === 'Girl3' ? 'active' : ' ')}
              onClick={() => activeAvtar('Girl3', GIRL3)}>

                <Image src={GIRL3}  title="Girl3"  alt="Girl3" />
              </div>
              <div className={'avtarpic  ' + (avatarIconValue === 'Girl4' ? 'active' : ' ')}
              onClick={() => activeAvtar('Girl4', GIRL4)}>
                <Image src={GIRL4}  title="Girl4"  alt="Girl4" />
              </div>
            </div>
          </div>
        </div>
        <div className="prostep_save text-center">
          {loaderProfile}
          <div className="savebtnlast">
            {show === 'upload' ? (
              <span>
                <input type="button" className="btn" value="SAVE & CONTINUE   " onClick={setImage} />
              </span>
            ) : (
              ''
            )}
            {show === 'save' ? (
              <div className="savebtnlast">
                <button className="btn" onClick={saveAvatar}>
                SAVE & CONTINUE
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default ProfileImage;
