import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from "next/router";
import { checkLocalStorageVariable } from "../localStorageUtil";
import SDPRO from './images/sdprofile.svg';
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
const LOADER = 'Loading...';


const API_URL = process.env.NEXT_PUBLIC_SD_API;

if (typeof window !== 'undefined') {
  var LOGGED_AVATAR_TITLE = localStorage.getItem('avatarTitle');
  var LOGGED_AVATAR = localStorage.getItem('avatar');
var LOGGED_EMAIL = localStorage.getItem('email');
}
const Avatar = () => {

  const [fileData, setFileData] = useState();
  const [avatarIcon, setAvatarIcon] = useState();
  const [avatarIconValue, setAvatarIconValue] = useState(LOGGED_AVATAR_TITLE);
  const [avatarIcoStatus, setAvatarIconStatus] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [preview, setPreview] = useState();
  const [show, setShow] = useState('save');
  const [loader, setLoader] = useState('');

  const fileDetail = useRef();

  const router = useRouter();
  useEffect(() => {
    const userLoggedIn   = checkLocalStorageVariable("email");
    const enc_login      = checkLocalStorageVariable('enc_email');
    if (!userLoggedIn && !enc_login ) {
        router.push("/login");
    }
  }, []);

  function handleFile() {
    //  alert((fileDetail.current.files[0].name));
    setFileData(fileDetail.current.files[0].name);
    // console.log(fileDetail.current.files[0], '-coming here');
  }
  useEffect(() => {
    if (!LOGGED_EMAIL) {
      location.replace('/');
    }
  }, []);
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

  const onSelectFile = (e) => {
    //alert('coming here');
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setShow('upload');
    setSelectedFile(e.target.files[0]);
    setAvatarIconValue(e.target.files[0].name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var avatar_urll = API_URL + '/login/upload.php';
    var formData = new FormData();
    //  var imagefile = document.querySelector('#file');
    formData.append('image', selectedFile);
    const uploadAwait = await axios
      .post(avatar_urll, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log('Avatar: ', err));
  };

  const setImage = () => {
    setLoader(LOADER);
    var formData = new FormData();
    //  var imagefile = document.querySelector('#file');
    var avatar_profileull = API_URL + '/login/avatar-profile.php';
    formData.append('file', selectedFile);
    formData.append('email', LOGGED_EMAIL);
    const uploadAwait = axios
      .post(avatar_profileull, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setLoader('');
        localStorage.setItem('avatar', res.data);
        setPreview(LOGGED_AVATAR);
        window.location.reload(false);
        location.replace('/profile');
      })
      .catch((err) => console.log('upload avatar: ', err));
  };

  const saveAvatar = async (e) => {
    e.preventDefault();
    setLoader(LOADER);
    var avatar_avatarurl = API_URL + '/login/avatar.php';
    const getDetails = await axios.get(avatar_avatarurl, {
      params: {
        id: window.btoa(LOGGED_EMAIL),
        im: window.btoa(selectedAvatar),
        avatar: avatarIconValue,
      },
    });
    localStorage.setItem('avatar', selectedAvatar);
    localStorage.setItem('avatarTitle', avatarIconValue);
    setLoader('');
    location.replace('/profile');
    window.location.reload(false);
  };

  const activeAvtar = (value, avatarUrl) => {
    setAvatarIconValue(value);
    setSelectedAvatar(avatarUrl.src);
    setShow('save');
  };

  return (
    <>
      <form>
        <section className="page_intro">
          <div className="container">
            <div className="prostep_item active">
              <div className="top_txt text-center">
                <h2>Personalize Your Experience</h2>
              </div>

              <div className="prostep_pic">
                <div className="top_txt df fww tagbox">
                  <label>
                    <strong>Profile Image</strong>
                    <sup>*</sup>
                  </label>
                  <div className="taginfo df fww">
                    <i className="fal fa-info-circle"></i>
                    <p>This Include Distributors, Exhibitors, Vendors And Film Festivals Etc...</p>
                  </div>
                </div>

                <div className="proupdateimg df fww">
                  <div className="prosteppicimg  m20">

                    <Image src={preview ? preview : SDPRO}
                as="image" title="SD Profile"  width="150" height="150" alt="Avatar image" />
                  </div>

                  <div className="uploadsbtninfo pvr  df fww">
                    <button className="uploadsbtn btn goldbtn">upload Image</button>
                    <p className="greytxt">
                      <small>
                        (Image Resolution Should <br /> Be of Min 100x100 PX )
                      </small>
                    </p>
                    <input type="file" className="imgInp" ref={fileDetail} onChange={onSelectFile} />
                    <p className="filename"></p>
                  </div>
                </div>
                <div className="orliner">
                  <span>OR</span>
                </div>
                <div className="chooseavatar">
                  <p>Choose from below</p>
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
                {loader}
                {show === 'upload' ? (
                  <span>
                    <input type="button" className="btn" value="Save" onClick={setImage} />
                  </span>
                ) : (
                  ''
                )}
                {show === 'save' ? (
                  <div className="savebtnlast">
                    <button className="btn" onClick={saveAvatar}>
                      SAVE
                    </button>
                  </div>
                ) : (
                  ''
                )}

                <div className="remiinebtn">
                  <br />
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default Avatar;
