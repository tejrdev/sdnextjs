import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Reminder from './Reminder';
import Describe from './Describe';
import Work from './Work';
import About from './About';
import FavTheatres from './FavTheatres';
import FavGenres from './FavGenres';
import FavActors from './FavActors';
import NewsLettersp from './NewsLettersp';
import ProfileImage from './ProfileImage';
import useLoginCheck from '../useLoginCheck';

const $ = require('jquery');
var active = 'active';
if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
  }
const LOADER = 'Loading..';
const MOVIELOVER = 'movielover';
const INDUSTRY = 'industry';

const Industry = () => {
  const [step, setStep] = useState(1);
  const [tick, setTick] = useState({
    ['li1']: true,
  });
  const [checkMovie, setCheckMovie] = useState('');

  const loginCheck = useLoginCheck();
  useEffect(() => {
    if (!LOGGED_EMAIL) {
      location.replace('/');
      window.location.reload(false);
    }
  }, []);
  useEffect(() => {
    if (JSON.parse(window.sessionStorage.getItem('step')) === null) {
      setStep();
    } else {
      setStep(JSON.parse(window.sessionStorage.getItem('step')));
    }

    if (JSON.parse(window.sessionStorage.getItem('tickParts')) === null) {
      setTick();
    } else {
      setTick(JSON.parse(window.sessionStorage.getItem('tickParts')));
    }
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem('step', step);
  }, [step]);

  useEffect(() => {
    window.sessionStorage.setItem('tickParts', JSON.stringify(tick));
  }, [tick]);

  const nextStep = () => {
    if (step <= 8) {
      var ticElement = 'li' + step;

      if (checkMovie === MOVIELOVER && step === 1) {
        ticElement = 'li2';
        setStep(step + 2);
        setTick({
          ...tick,
          [ticElement]: true,
        });
      } else {
        setStep(step + 1);
        setTick({
          ...tick,
          [ticElement]: true,
        });
      }
    }
  };
  const prevStep = () => {
    if (step > 0) {
      var ticElement = 'li' + step;
      if (checkMovie === MOVIELOVER && step === 3) {
        setTick({
          ...tick,
          ['li2']: false,
          ['li3']: false,
        });

        setStep(step - 2);
      } else {
        setStep(step - 1);
        setTick({
          ...tick,
          [ticElement]: false,
        });
      }
    }
  };

  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <>
      {loginCheck}
      <section className="profilesteps">
        <div className="container">
          <div className="profilestepbox">
            <div className="prsteps_top df fww">
              {step === 1 ? (
                <div className="backarow" style={{ visibility: 'hidden' }} onClick={prevStep}>
                  <i className="fas fa-long-arrow-left"></i> Back
                </div>
              ) : (
                <div className="backarow" onClick={prevStep}>
                  <i className="fas fa-long-arrow-left"></i> Back
                </div>
              )}

              <div className="prostepcount text-center">
                <ul className="df fww">
                  <li className={step === 1 ? active : tick.li1 ? 'tick' : ''}>
                    <i className="far fa-check"></i>
                    <strong> 1</strong>
                  </li>
                  <li className={step === 2 ? active : tick.li2 ? 'tick' : ''}>
                    <i className="far fa-check"></i>
                    <strong> 2</strong>
                  </li>
                  <li className={step === 3 ? active : tick.li3 ? 'tick' : ''}>
                    <i className="far fa-check"></i>
                    <strong> 3</strong>
                  </li>
                  <li className={step === 4 ? active : tick.li4 ? 'tick' : ''}>
                    <i className="far fa-check"></i>
                    <strong> 4</strong>
                  </li>
                  <li className={step === 5 ? active : tick.li5 ? 'tick' : ''}>
                    <i className="far fa-check"></i>
                    <strong> 5</strong>
                  </li>
                  <li className={step === 6 ? active : tick.li6 ? 'tick' : ''}>
                    <i className="far fa-check"></i>
                    <strong> 6</strong>
                  </li>
                  <li className={step === 7 ? active : tick.li7 ? 'tick' : ''}>
                    <i className="far fa-check"></i>
                    <strong> 7</strong>
                  </li>
                  <li className={step === 8 ? active : tick.li8 ? 'tick' : ''}>
                    <i className="far fa-check"></i>
                    <strong> 8</strong>
                  </li>
                </ul>
              </div>
              {step !== 8 ? (
                <div className="skiparow" onClick={nextStep} id="skip">
                  Skip <i className="fas fa-long-arrow-right"></i>
                </div>
              ) : (
                <div className="skiparow" style={{ visibility: 'hidden' }} id="skip">
                  Skip <i className="fas fa-long-arrow-right"></i>
                </div>
              )}
            </div>
            <div className="prostep_info">
              <Describe active={step === 1 ? active : ''}>
                <Reminder steps={step} />{' '}
              </Describe>
              <Work active={step === 2 ? active : ''}>
                <Reminder steps={step}  />
              </Work>
              <About active={step === 3 ? active : ''}>

                <Reminder steps={step}/>
              </About>
              <FavTheatres active={step === 4 ? active : ''}>

                <Reminder steps={step}/>
              </FavTheatres>
              <FavGenres active={step === 5 ? active : ''}>
                <Reminder steps={step}/>
              </FavGenres>
              <FavActors active={step === 6 ? active : ''}>
                <Reminder steps={step}/>
              </FavActors>
              <NewsLettersp active={step === 7 ? active : ''}>
                <Reminder steps={step}/>
              </NewsLettersp>
              <ProfileImage active={step === 8 ? active : ''}>
                <Reminder steps={step}/>
              </ProfileImage>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Industry;
