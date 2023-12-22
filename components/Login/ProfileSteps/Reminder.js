import React, {useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const Reminder = ({link, steps}) => {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    var LOGGED_EMAIL = localStorage.getItem('email');
  }

  const setReminder =  () => {
    var reminder_url = API_URL + '/profile_steps/reminder.php';
    if(link===undefined){link =''}
     axios
    .get(reminder_url, {
    params: {
      email: window.btoa(LOGGED_EMAIL),
      type:window.btoa('profile-steps'),
      link:window.btoa(link),
      steps :window.btoa(steps),
      times : 0,
      status: 'active'
    },
    })
    .then((res) => {
      //console.log(res.data);
      router.push('/profile');
    })
    .catch((err) => console.log('Reminder error ', err));
    };

  return (
    <>
      <div className="remiinebtn">
        <Link href="#" onClick={setReminder} title="Remind Later">
          Remind Me Later
        </Link>
      </div>
    </>
  );
};
export default Reminder;
