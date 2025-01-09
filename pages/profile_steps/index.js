import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useRouter } from "next/router";
import { checkLocalStorageVariable } from "../../components/Login/localStorageUtil";

import MovieLover from '../../components/Login/ProfileSteps/MovieLover';
import Industry from '../../components/Login/ProfileSteps/Industry';
import Reminder from '../../components/Login/ProfileSteps/Reminder';
import Describe from '../../components/Login/ProfileSteps/Describe';
import Work from '../../components/Login/ProfileSteps/Work';
import About from '../../components/Login/ProfileSteps/About';
import FavTheatres from '../../components/Login/ProfileSteps/FavTheatres';
import FavGenres from '../../components/Login/ProfileSteps/FavGenres';
import FavActors from '../../components/Login/ProfileSteps/FavActors';
import NewsLettersp from '../../components/Login/ProfileSteps/NewsLettersp';
import ProfileImage from '../../components/Login/ProfileSteps/ProfileImage';
import useLoginCheck from '../../components/Login/useLoginCheck';

const $ = require('jquery');
var active = 'active';
if (typeof window !== 'undefined') {
    var LOGGED_EMAIL = localStorage.getItem('email');
}

const LOADER = 'Loading..';
const MOVIELOVER = 'movielover';
const INDUSTRY = 'industry';

const ProfileSteps = () => {
  const [step, setStep] = useState(1);
  const [tick, setTick] = useState({ 'li1':true});
  const [checkMovie, setCheckMovie] = useState('');

  const router = useRouter();
  useEffect(() => {
    const userLoggedIn   = checkLocalStorageVariable("email");
    const enc_login      = checkLocalStorageVariable('enc_email');
    if (!userLoggedIn && !enc_login ) {
        router.push("/login");
    }
  }, []);


  useEffect(() => {

    if(step==='li1'){
      setTick({
        ...tick,
        ['li1']: true,
      });
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

        if (step === 1) {
          setStep(step + 1);
          setTick({
            ...tick,
            ['li1']: true,
          });
        } else {
          setStep(step + 1);
          setTick({
            ...tick,
            [ticElement]: true,
          });
        }
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
                  <li className={step === 1 ? active : tick?.li1 ? 'tick' : ''}>
                    <i className="far fa-check"></i>
                    <strong> 1</strong>
                  </li>
                  <li className={step === 2 ? active : tick?.li2 ? 'tick' : ''}>
                    <i className="far fa-check"></i>
                    <strong> 2</strong>
                  </li>
                  <li className={step === 3 ? active : tick?.li3 ? 'tick' : ''}>
                    <i className="far fa-check"></i>
                    <strong> 3</strong>
                  </li>
                  <li className={step === 4 ? active : tick?.li4 ? 'tick' : ''}>
                    <i className="far fa-check"></i>
                    <strong> 4</strong>
                  </li>
                  <li className={step === 5 ? active : tick?.li5 ? 'tick' : ''}>
                    <i className="far fa-check"></i>
                    <strong> 5</strong>
                  </li>
                  <li className={step === 6 ? active : tick?.li6 ? 'tick' : ''}>
                    <i className="far fa-check"></i>
                    <strong> 6</strong>
                  </li>
                  <li className={step === 7 ? active : tick?.li7 ? 'tick' : ''}>
                    <i className="far fa-check"></i>
                    <strong> 7</strong>
                  </li>
                  <li className={step === 8 ? active : tick?.li8 ? 'tick' : ''}>
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
                <Reminder steps={step}/>{' '}
              </Describe>
              <Work active={step === 2 ? active : ''}>
                <Reminder steps={step}/>
              </Work>
              <About active={step === 3 ? active : ''}>
                {' '}
                <Reminder steps={step}/>
              </About>
              <FavTheatres active={step === 4 ? active : ''}>
                {' '}
                <Reminder steps={step}/>
              </FavTheatres>
              <FavGenres active={step === 5 ? active : ''}>
                <Reminder steps={step}/>
              </FavGenres>
              <FavActors active={step === 6 ? active : ''}>
                <Reminder steps={step}/>{' '}
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

export default ProfileSteps;
