import React, { useState, useEffect } from 'react';
import axios from 'axios';
if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
  }
const LOADER = 'Loading..';
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const Work = ({ children, active }) => {
  const [loaderWork, setLoaderWork] = useState('');

  //const [checked, setChecked] = useState(['filmProduction', 'vendor', 'analytics', 'broadcast']);
  const [checked, setChecked] = useState('');
  const [other, setOther] = useState('');
  const [workType, setWorkType] = useState('');

  // Generate string of checked items

  const handleCheck = (e) => {
    var selectValue =e.target.value;
    setChecked(selectValue);
    setWorkType(selectValue);

  };

  const replaceOther = (e) => {
    var value = e.target.value;
    setOther(value);
    checked.replace('other', 'other, other-' + value);
  };

  const saveWork = () => {
    setLoaderWork(LOADER);
    var work_url = API_URL + '/login/work.php';
    var formData = new FormData();
    //  var imagefile = document.querySelector('#file');
    formData.append('auth', LOGGED_EMAIL);
    formData.append('type', 'POST');
    formData.append('values', checked);
    axios
      .post(work_url, formData)
      .then((res) => {
        // alert(res.data);
        setLoaderWork('');
        document.getElementById('skip').click();
      })
      .catch((err) => console.log('work error: ', err));
  };

  const getWork = async () => {
    var work_url = API_URL + '/login/work.php';
    await axios
      .get(work_url, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          process: window.btoa('GET'),
        },
      })
      .then((res) => {
        setWorkType(res.data); //console.log(JSON.parse(JSON.stringify(res.data)));
       // setChecked(JSON.parse(JSON.stringify(res.data)));
      })
      .catch((err) => console.log('work get error ', err));
  };

  useEffect(() => {
    getWork();
  }, []);

  return (
    <>
      <div className={`prostep_item ${active} `}>
        <div className="top_txt">
          <h2>What Areas of the Industry Do You Work in?</h2>
        </div>

        <div className="prostep_checkchoice">
          <ul>
          <li>
              <input
                type="radio"
                id="filmProduction"
                name="filmProduction"
                value="filmProduction"
                onChange={handleCheck}
                checked={workType === 'filmProduction'}
              />

              <label htmlFor="filmProduction">Production</label>
            </li>
            <li>
              <input
                type="radio"
                id="studio"
                name="studio"
                value="studio"
                onChange={handleCheck}
                checked={workType === 'studio'}
              />

              <label htmlFor="studio">Studio</label>
            </li>
            <li>
              <input
                type="radio"
                id="distribution"
                name="workType"
                value="distribution"
                onChange={handleCheck}
                checked={workType === 'distribution'}
              />
              <label htmlFor="distribution">Distribution</label>
            </li>
            <li>
              <input
                type="radio"
                id="movietheatre"
                name="workType"
                value="movietheatre"
                onChange={handleCheck}
                checked={workType === 'movietheatre'}
              />
              <label htmlFor="movietheatre">Exhibition (Theatre or Exhibitor)</label>
            </li>
            <li>
              <input
                type="radio"
                id="marketing"
                name="marketing"
                value="marketing"
                onChange={handleCheck}
                checked={workType === 'marketing'}
              />

              <label htmlFor="marketing">Marketing or Public Relations</label>
            </li>
            <li>
              <input
                type="radio"
                id="filmfestival"
                name="filmfestival"
                value="filmfestival"
                onChange={handleCheck}
                checked={workType === 'filmfestival'}
              />
              <label htmlFor="filmfestival">Filmfestival</label>
            </li>
            <li>
              <input
                type="radio"
                id="analytics"
                name="analytics"
                value="analytics"
                onChange={handleCheck}
                checked={workType === 'analytics'}
              />
              <label htmlFor="analytics">Finance, Research or Analysis</label>
            </li>
            <li>
              <input
                type="radio"
                id="onlinemediacompany"
                name="onlinemediacompany"
                value="onlinemediacompany"
                onChange={handleCheck}
                checked={workType === 'onlinemediacompany'}
              />

              <label htmlFor="onlinemediacompany">Publisher</label>
            </li>
            <li>
              <input
                type="radio"
                id="broadcast"
                name="broadcast"
                value="broadcast"
                onChange={handleCheck}
                checked={workType === 'broadcast'}
              />

              <label htmlFor="broadcast">Broadcast Media</label>
            </li>
            <li>
              <input
                type="radio"
                id="vendor"
                name="workType"
                value="vendor"
                onChange={handleCheck}
                checked={workType === 'vendor'}
              />
              <label htmlFor="vendor">Vendor</label>
            </li>
            <li>
              <input
                type="radio"
                id="other"
                name="other"
                value="other"
                onChange={handleCheck}
                checked={workType === 'other'}
              />

              <label htmlFor="other">Other</label>
              <input type="text" onChange={replaceOther} value={other}
              placeholder="Please Specify So We Can Make Your Experience Better" />
            </li>
          </ul>
        </div>

        <div className="prostep_save text-center">
          {' '}
          {loaderWork}
          <div className="savebtn">
            <input type="button" className="btn" value="SAVE & CONTINUE " onClick={saveWork} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Work;
