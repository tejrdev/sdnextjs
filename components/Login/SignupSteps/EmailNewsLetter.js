import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MOVIETIME from './images/movietime.svg';
import WEEKLY_NEWSLETTER from './images/weeklynewslatter.svg';
import FILM_VERDICT from './images/film_verdictico.svg';

const LOGGED_EMAIL = localStorage.getItem('email');
const LOADER = 'Please wait.. While we are saving the details';
const SUCCESS = 'Profile Details Updated Successfully';
const EmailNewsletter = () => {
  const [movieTime, setMovieTime] = useState('');
  const [weekly, setWeekly] = useState('');
  const [filmVerdict, setFilmVerdict] = useState('');
  const [filmVerdictClass, setFilmVerdictClass] = useState('');
  const [weeklyClass, setWeeklyClass] = useState('');
  const [movieTimeClass, setMovieTimeClass] = useState('');
  const [loader, setLoader] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    if (!LOGGED_EMAIL) {
      navigate('/');
    }
  }, []);
  const newsLetterList = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/login/email_newsletter.php', {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          process: window.btoa('GET'),
        },
      })
      .then((res) => {
        const returnedValues = res.data;

        setMovieTime(returnedValues.movietime);
        setWeekly(returnedValues.weekly);
        setFilmVerdict(returnedValues.film_verdict);

        setMovieTimeClass(returnedValues.movietime);
        setWeeklyClass(returnedValues.weekly);
        setFilmVerdictClass(returnedValues.film_verdict);
      })
      .catch((err) => console.log('Email Newsletter: ', err));
  };
  useEffect(() => {
    newsLetterList();
  }, []);

  const saveNewsletter = () => {
    setLoader(LOADER);

    var formData = new FormData();
    formData.append('auth', LOGGED_EMAIL);
    formData.append('type', 'POST');
    formData.append('movieTime', movieTimeClass);
    formData.append('weekly', weeklyClass);
    formData.append('filmVerdict', filmVerdictClass);
    axios
      .post(process.env.NEXT_PUBLIC_SD_API + '/login/email_newsletter.php', formData)
      .then((res) => {
        setLoader('');
        navigate('/profile');
      })
      .catch((err) => console.log('Profile email error: ', err));
  };

  const updateMovieTime = () => {
    if (movieTime === undefined) {
      setMovieTime('active');
      setMovieTimeClass('active');
    }
    if (movieTime === 'active' && movieTime !== undefined) {
      setMovieTime('');
      setMovieTimeClass('');
    }
    if (movieTime !== 'active' && movieTime !== undefined) {
      setMovieTime('active');
      setMovieTimeClass('active');
    }
  };
  const updateWeekly = () => {
    if (weekly === undefined) {
      setWeekly('active');
      setWeeklyClass('active');
    }
    if (weekly === 'active' && weekly !== undefined) {
      setWeekly('');
      setWeeklyClass('');
    }
    if (weekly !== 'active' && weekly !== undefined) {
      setWeekly('active');
      setWeeklyClass('active');
    }
  };
  const updateFilm = () => {
    if (filmVerdict === undefined) {
      setFilmVerdict('active');
      setFilmVerdictClass('active');
    }
    if (filmVerdict === 'active' && weekly !== undefined) {
      setFilmVerdict('');
      setFilmVerdictClass('');
    }
    if (filmVerdict !== 'active' && weekly !== undefined) {
      setFilmVerdict('active');
      setFilmVerdictClass('active');
    }
  };
  return (
    <>
      <section className='profileinfo'>
        <div className='prostep_item active'>
          <div className='top_txt text-center'>
            <h2>Choose Newsletter you want to subscribe.</h2>
            <p>Screendollars' Email Newsletters Provides You With Fun And Useful Information About The Movies And The Movie Business. We recommend signing up for these newsletters however you can uncheck if you don't want any one of listed.</p>
          </div>
          <div className='discribebest_box grid three_col'>
            <div className={movieTime === 'active' ? `decbestiem active` : `decbestiem`}>
              <div className='top_ico' onClick={updateMovieTime}>
                <img src={MOVIETIME} alt='Movie Times' />
              </div>
              <h6>Movie Times</h6>
              <p className='greytxt'>
                previewing movies and top stars for the upcoming weekend <span>- Delivered every Thursday</span>
              </p>
            </div>
            <div className={weekly === 'active' ? `decbestiem active` : `decbestiem`}>
              <div className='top_ico' onClick={updateWeekly}>
                <img src={WEEKLY_NEWSLETTER} alt='Weekly Newletter' />
              </div>
              <h6>Industry Newsletter</h6>
              <p className='greytxt'>
                our award-winning industry report enjoyed by over 150,000 professionals every week <span>- Delivered every Sunday</span>
              </p>
            </div>
            <div className={filmVerdict === 'active' ? `decbestiem active` : `decbestiem`}>
              <div className='top_ico' onClick={updateFilm}>
                <img src={FILM_VERDICT} alt='Film Verdict' />
              </div>
              <h6>The Film Verdict</h6>
              <p className='greytxt'>original reviews of exciting new movies premiering at Film Festivals around the world</p>
            </div>
          </div>
          <div className='prostep_save text-center'>
            {loader}
            <div className='savebtn'>
              <input type='button' className='btn' value='save & continue' onClick={saveNewsletter} />
            </div>
            <div className='savebtn'>
              <br />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EmailNewsletter;
