import { useState, useEffect } from 'react';
import look from './claimfrom.module.scss';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import axios from 'axios';
import { useRouter } from 'next/router';

const Claimlisting = () => {
  const router = useRouter();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmailid] = useState('');
  const [request, setRequest] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    setEmailid(userEmail);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var blnError = false;
    setError('');
    $('#loadericon').show();
    if ($('#firstname').val() === '' || $('#firstname').val() === undefined) {
      setError('First Name is required');
      blnError = true;
    } else if ($('#lastname').val() === '' || $('#lastname').val() === undefined) {
      setError('Last Name is required');
      blnError = true;
    } else if ($('#email').val() === '' || $('#email').val() === undefined) {
      setError('Email is required');
      blnError = true;
    } else if ($('#request').val() === '' || $('#request').val() === undefined) {
      setError('Request is required');
      blnError = true;
    } else if ($('[type="tel"]').val() === '' || $('[type="tel"]').val() === undefined) {
      setError('Phone Number is required');
      blnError = true;
    } else setError('');

    if (blnError) {
      $('#loadericon').hide();
      return false;
    }

    const finalFormEndpoint = e.target.action;
    const listingType = localStorage.getItem('listing_type');
    const listingId = localStorage.getItem('listing_id');
    const listingTitle = localStorage.getItem('listing_title');
    const data = Array.from(e.target.elements)
      .filter((input) => input.id)
      .reduce((obj, input) => Object.assign(obj, { [input.id]: input.value }), {});
    Object.assign(data, { 'tel': $('.intl-tel-input input').val().replace(/\s/g, '') });
    Object.assign(data, { 'listingType': listingType });
    Object.assign(data, { 'listingId': listingTitle });
    Object.assign(data, { 'listingTypeUrl': process.env.NEXT_PUBLIC_LOGIN_URL + listingType + '/' + listingId });

    const responsefromWP = await submitDataToWP(finalFormEndpoint, data);
    // console.log(responsefromWP);
    if (responsefromWP.error) {
      setError(responsefromWP.error);
    } else {
      router.push('/claim-listing/claimlist-success');
    }
    $('#loadericon').hide();
  };
  const submitDataToWP = async (FormEndpoint, data) => {
    const dataString = 'email=' + data.email + '&firstname=' + data.firstname + '&lastname=' + data.lastname + '&listingId=' + data.listingId + '&listingType=' + data.listingType + '&listingTypeUrl=' + data.listingTypeUrl + '&request=' + data.request + '&tel=' + data.tel;
    try {
      const response = await axios.get(FormEndpoint + '?' + dataString);
      return response.data;
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    }
  };

  return (
    <section className={look.claimform}>
      <form action={process.env.NEXT_PUBLIC_SD_API + '/claim-listing/user-claim.php'} onSubmit={handleSubmit} method='POST'>
        <div className='container'>
          <div className={look.clamformbox}>
            <h2>Claim Your Listing</h2>
            <p>enter your details and business email we'll send you an email regarding the steps of claiming your listing.</p>
            <div className='claiminbox'>
              <div className={look.fieldbox + ' fieldbox'}>
                <label htmlFor='email'>
                  <strong>Your Email</strong>
                  <sup>*</sup>
                </label>
                <input type='email' id='email' placeholder='Enter your email' required='' value={email} disabled></input>
              </div>
              <div className={look.fieldbox + ' fieldbox'}>
                <label htmlFor='firstname'>
                  <strong>Your First Name</strong>
                  <sup>*</sup>
                </label>
                <input type='text' id='firstname' placeholder='Enter your first name' required='' value={firstname} onChange={(e) => setFirstName(e.target.value)}></input>
              </div>
              <div className={look.fieldbox + ' fieldbox'}>
                <label htmlFor='lastname'>
                  <strong>Your last name</strong>
                  <sup>*</sup>
                </label>
                <input type='text' id='lastname' placeholder='Enter your last name' required='' value={lastname} onChange={(e) => setLastName(e.target.value)}></input>
              </div>
              <div className={look.fieldbox + ' fieldbox'}>
                <label htmlFor='phone'>
                  <strong>Your Phone</strong>
                  <sup>*</sup>
                </label>
                <IntlTelInput preferredCountries={['US', 'CA', 'gb', 'IN']} id='phone' style={{ width: '100%' }} />
              </div>
              <div className={look.fieldbox + ' fieldbox'}>
                <label htmlFor='request'>
                  <strong>Your Claim Request</strong>
                </label>
                <textarea type='text' id='request' rows='4' placeholder='Tell about your organization and your request to claim this listing' value={request} onChange={(e) => setRequest(e.target.value)}></textarea>
              </div>
              <div>
                {error ? <div className='errormsg '> {error}</div> : ''}
                <span id='loadericon' className='displaynone'>
                  Loading ...
                </span>
                <input type='submit' className='claimClick btn w100' defaultValue='SUBMIT' />
                <p className={look.cancellink + ' greytxt text-center '}>cancel</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Claimlisting;
