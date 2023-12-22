import { useEffect, useState } from 'react';
import useLoginCheck from '../useLoginCheck';
import axios from 'axios';
import Image from 'next/image';
import INDST from '../images/indst_pro.svg';
import POPMOVIE from '../images/popmovie.svg';
var active = 'active';
if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
}
const LOADER = 'Loading..';
const MOVIELOVER = 'movielover';
const INDUSTRY = 'industry';
const API_URL = process.env.NEXT_PUBLIC_SD_API;

const DescribeMovie = ({ children, active, movielover, industry, loader }) => {
  const [type, setType] = useState('');
  const [checkMovie, setCheckMovie] = useState('');
  const [loaderProfile, setLoaderProfile] = useState('');
  const loginCheck = useLoginCheck();


  const getDescribeData = (val) => {
    setCheckMovie(val);
  };

  const movieUpdate = (value) => {
    if (value === MOVIELOVER) {
      setCheckMovie(value);
      location.replace('/profile_steps/movieLover');
    }
    if (value === INDUSTRY) {
      setCheckMovie(value);
      location.replace('/profile_steps');
    }
  };

  const postDescribe = () => {
    setLoaderProfile(LOADER);
    var describe_url = API_URL + '/login/describe.php';
    let formData = new FormData();
    formData.append('auth', LOGGED_EMAIL);
    formData.append('type', checkMovie);
    fetch(describe_url, {
      credentials: 'same-origin',
      method: 'POST',
      body: formData,
    }).then(function (response) {
      if (response.ok) {
        setLoaderProfile('');
      }
      document.getElementById('skip').click();
    });
  };
  const getDescribe = async () => {
    var getdescribe_url = API_URL + '/login/describe.php';
    await axios
      .get(getdescribe_url, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          process: window.btoa('GET'),
        },
      })
      .then((res) => {
        // setCheckMovie(res.data);
        setCheckMovie(MOVIELOVER);
      })
      .catch((err) => console.log('describe get error ', err));
  };

  useEffect(() => {
    getDescribe();
  }, []);

  return (
    <>
      {loginCheck}
      <div className={`prostep_item ${active}`}>
        <div className="top_txt">
          <h2>What Describes You Best?</h2>
        </div>
        <form method="POST">
          <div className="discribebest_box grid">
            <div className={checkMovie === 'industry' ? 'decbestiem active' : 'decbestiem'} onClick={() => movieUpdate('industry')}>
              <div className="top_ico">
                <Image src={INDST} rel="preload" as="image" title="industry" className="animation" alt="industry" />
              </div>
              <h6>Industry Professional</h6>
              <p>(For those who work with information about movies and related business matters. )</p>
            </div>
            <div className={checkMovie === 'movielover' ? 'decbestiem active' : 'decbestiem'} onClick={() => movieUpdate('movielover')}>
              <div className="top_ico">
                <Image src={POPMOVIE} rel="preload" as="image" title="pop movie" className="animation" alt="pop movie" />
              </div>
              <h6>Movie Lover</h6>
              <p>(For those who love to watch movies and want to learn about what’s happening in Hollywood. )</p>
            </div>
          </div>
          <div className="prostep_save text-center">
            {loaderProfile}
            <div className="savebtn">
              <input type="button" className="btn" value="SAVE & CONTINUE" onClick={postDescribe} />
            </div>
            {children}
          </div>
        </form>
      </div>
    </>
  );
};
export default DescribeMovie;
