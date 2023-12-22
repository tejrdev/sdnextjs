import React from 'react';

import MovieListing from './movieListing';
import TalentListing from './talentListing';
import TheatreListing from './theatreListing';
import DirectoryListing from './directoryListing';
import Headlines from './headlines';
import dynamic from 'next/dynamic';
import Head from 'next/head';
//import useLoginCheck from '../useLoginCheck';

var LOGGED_EMAIL = '';
if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
  var LOGIN_TYPE = localStorage.getItem('from');
  var LOGGED_AVATAR = localStorage.getItem('avatar');
  var LOGGED_AVATAR_TITLE = localStorage.getItem('avatarTitle');
}
const Intro = dynamic(() => import('./intro'), {
  ssr: false,
});

const Logged = dynamic(() => import('./logged'), {
  ssr: false,
});

const FavoriteMain = () => {
  //console.clear = () => {}
  return (
    <>
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <div className='favorateinfo pvr'>
        <Intro />
        {<Logged />}
        <div className='container'>
          <MovieListing />
          <TalentListing />
          <TheatreListing />
          <Headlines />
          <DirectoryListing />
        </div>
      </div>
    </>
  );
};

export default FavoriteMain;
