import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import validator from 'validator';

const PollResult = ({ result, resultImage }) => {
  const [EmailSubmitted, setEmailSubmitted] = useState(false);
  const email = localStorage.getItem('email') || '';
  const ip_address = localStorage.getItem('user_ip');
  const [Email, setEmail] = useState('');
  const [EmailError, setEmailError] = useState(null);
  const [EmailSuccess, setEmailSuccess] = useState(null);

  const validationEmail = (email) => {
    if (email !== null && validator.isEmail(email)) return true;
    else return false;
  };

  const SubsciberUser = () => {
    if (validationEmail(Email || '') === false) {
      setEmailError('Please Enter Valid Email');
      return;
    } else {
      setEmailError(null);
    }
    // to subscribe user to the newsletter

    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/poll_quiz_new/quiz_newsletter.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&ip_address=' + ip_address + '&email=' + Email)
      .then((res) => {
        if (res.data.sucess === 'Done') {
          setEmailSuccess('Email subscribed successfully');
        } else if (res.data.sucess === 'already exit') {
          setEmailError('Email already subscribed');
        } else {
          setEmailError('Something went wrong');
          return;
        }
        setTimeout(() => {
          setEmailSubmitted(true);
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  if (email !== '' || EmailSubmitted) {
    return <div className='card pollresult w-[289px] h-[550px] border-2 border-gold rounded bg-gold-yellow p-3 relative' dangerouslySetInnerHTML={{ __html: result }}></div>;
  } else {
    return (
      <div className='card w-[289px] h-[550px] border-2 border-gold rounded bg-gold-yellow p-3 relative'>
        <figure className='mb-5'>
          <img src={resultImage} alt='' />
        </figure>
        <h3 className='mb-5'>
          Great job! <br />
          Want to be the first to take next week's quiz? Sign up now!
        </h3>
        <div className='emailsubmit'>
          <input type='email' name='' id='' value={Email || ''} onChange={(e) => setEmail(e.target.value)} className='w-full bg-transparent' placeholder='Enter your email' />
          {EmailSuccess ? <div className='text-green-600 mt-1'> {EmailSuccess}</div> : null}
          {EmailError ? <div className='text-red-600 mt-1'> {EmailError}</div> : null}
          <button type='submit' className='btn my-2' onClick={SubsciberUser}>
            Subscribe
          </button>
        </div>
        <p>
          By clicking Sign Up you're confirming that you agree with our <Link href='/terms-use/'>Terms and Conditions.</Link>
        </p>
      </div>
    );
  }
};

export default PollResult;
