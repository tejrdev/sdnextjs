import React, { useState, useEffect } from 'react';
import axios from 'axios';
if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
}
const LOADER = 'Loading..';
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const About = ({ children, active }) => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    jobTitle: '',
    organization: '',
    website: '',
  });
  const [loaderProfile, setLoaderProfile] = useState('');
  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const profileAdd = () => {
    setLoaderProfile(LOADER);
    var profile_saveurl = API_URL + '/login/profile_save.php';
    let formData = new FormData();
    formData.append('auth', LOGGED_EMAIL);
    formData.append('type', 'SAVE');
    formData.append('keys', JSON.stringify(state));
    fetch(profile_saveurl, {
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

  const getProfile = async () => {
    var profile_detailurl = API_URL + '/login/profile_details.php';
    const getDetails = await axios.get(profile_detailurl, {
      params: {
        id: window.btoa(LOGGED_EMAIL),
      },
    });

    const useValues = getDetails.data;
    setState({
      firstName: useValues.firstName,
      lastName: useValues.lastName,
      phone: useValues.phone,
      website: useValues.website,
      jobTitle: useValues.jobTitle,
      organization: useValues.organization,
    });
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div className={`prostep_item ${active}`}>
        <div className="top_txt">
          <h2>Tell s More About Yourself</h2>
        </div>
        <div className="proin_form generalform_info grid">
          <div className="fieldbox">
            <label>
              <strong>First Name</strong>
            </label>
            <input type="text" name="firstName" value={state.firstName} onChange={handleChange} placeholder="Enter First Name" />
          </div>
          <div className="fieldbox">
            <label>
              <strong>Last Name</strong>
            </label>
            <input type="text" name="lastName" value={state.lastName} onChange={handleChange} placeholder="Enter Last Name" />
          </div>
          <div className="fieldbox">
            <label>
              <strong>Job Title</strong>
            </label>
            <input type="text" name="jobTitle" value={state.jobTitle} placeholder="Enter Job Title" onChange={handleChange} />
          </div>
          <div className="fieldbox">
            <label>
              <strong>Organization</strong>
            </label>
            <input type="text" name="organization" value={state.organization} placeholder="Enter Company or Organization Name" onChange={handleChange} />
          </div>
          <div className="fieldbox">
            <label>
              <strong>Phone</strong>
            </label>
            <input type="tel" name="phone" value={state.phone} placeholder="e.g. (800) 555-1212" onChange={handleChange} />
          </div>
          <div className="fieldbox">
            <label>
              <strong>Website</strong>
            </label>
            <input type="text" name="website" value={state.website} onChange={handleChange} placeholder="e.g.mycompany.com" />
          </div>
        </div>
        <div className="prostep_save text-center">
          {loaderProfile}
          <div className="savebtn">
            <input type="button" onClick={profileAdd} value="SAVE & CONTINUE" />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};
export default About;
