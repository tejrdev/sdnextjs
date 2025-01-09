import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Reminder from './Reminder';
import DescribeMovie from './DescribeMovie';
import About from './About';
import FavTheatres from './FavTheatres';
import FavGenres from './FavGenres';
import FavActors from './FavActors';
import NewsLettersp from './NewsLettersp';
import ProfileImage from './ProfileImage';
import useLoginCheck from '../useLoginCheck';
import { useRouter } from "next/router";
import { checkLocalStorageVariable } from "../localStorageUtil";

const $ = require('jquery');
var active = 'active';
const LINK ="movieLover";
if (typeof window !== 'undefined') {
var LOGGED_EMAIL = localStorage.getItem('email');
}
const LOADER = 'Loading..';
const MOVIELOVER = 'movielover';
const INDUSTRY = 'industry';

const MovieLover = () => {
  const [step, setStep] = useState(1);
  const [tick, setTick] = useState({
    ['li1']: true,
  });
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
              <DescribeMovie active={step === 1 ? active : ''}>
                <Reminder   link={LINK} steps={step}/>{' '}
              </DescribeMovie>
              <About active={step === 2 ? active : ''}>
                {' '}
                <Reminder link={LINK} steps={step} />
              </About>
              <FavTheatres active={step === 3 ? active : ''}>
                {' '}
                <Reminder link={LINK} steps={step} />
              </FavTheatres>
              <FavGenres active={step === 4 ? active : ''}>
                <Reminder  link={LINK} steps={step}/>
              </FavGenres>
              <FavActors active={step === 5 ? active : ''}>
                <Reminder link={LINK} steps={step}/>{' '}
              </FavActors>
              <NewsLettersp active={step === 6 ? active : ''}>
                <Reminder link={LINK} steps={step}/>
              </NewsLettersp>
              <ProfileImage active={step === 7 ? active : ''}>
                <Reminder link={LINK} steps={step}/>
              </ProfileImage>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieLover;
