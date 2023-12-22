import React, { useState, useEffect } from 'react';
import axios from 'axios';

if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
}
const LOADER = 'Loading..';
const API_URL = process.env.NEXT_PUBLIC_SD_API;

const FavGenres = ({ children, active }) => {
  const [loaderGenres, setLoaderGenres] = useState('');
  const [checked, setChecked] = useState([]);
  const [other, setOther] = useState('');

  const handleCheck = (e) => {
    var updateList = [...checked];
    if (e.target.checked) updateList = [...checked, e.target.value];
    else updateList.splice(checked.indexOf(e.target.value), 1);
    setChecked(updateList);
  };
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ',' + item;
      })
    : '';

  const saveGenres = () => {
    const arryITems = checkedItems.split(',');
    //   console.log(JSON.stringify(arryITems), '--arrayitems');
    //  console.log(JSON.parse(JSON.stringify(arryITems)));
    var fav_genres_url = API_URL + '/login/fav_genres.php';
    setLoaderGenres(LOADER);

    var formData = new FormData();
    //  var imagefile = document.querySelector('#file');
    formData.append('auth', LOGGED_EMAIL);
    formData.append('type', 'POST');
    formData.append('values', JSON.stringify(arryITems));
    axios
      .post(fav_genres_url, formData)
      .then((res) => {
        // alert(res.data);
        setLoaderGenres('');
        document.getElementById('skip').click();
      })
      .catch((err) => console.log('work error: ', err));
  };
  const getGenres = async () => {
    var fav_genres_url = API_URL + '/login/fav_genres.php';
    await axios
      .get(fav_genres_url, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          process: window.btoa('GET'),
        },
      })
      .then((res) => {
        setChecked(JSON.parse(JSON.stringify(res.data))); //alert(JSON.parse(JSON.stringify(res.data)));
      })
      .catch((err) => console.log('work get error ', err));
  };

  useEffect(() => {
    getGenres();
  }, []);

  const replaceOther = (e) => {
    var value = e.target.value;
    setOther(value);
    const checkValues = checkedItems.replace('other', 'other, other-' + value);

  };

  return (
    <>
      <div className={` prostep_item ${active}`}>
        <div className="top_txt">
          <h2>What Are Your Favorite Movie Genres? </h2>
        </div>
        <div className="prostep_checkchoice genrechoice">
          <ul>
            <li>
              <input type="checkbox" id="Action" name="Action" value="Action" onChange={handleCheck} checked={checked.includes('Action') ? 'checked' : ''} />
              <label htmlFor="Action">Action</label>
            </li>
            <li>
              <input type="checkbox" id="Adventure" name="Adventure" value="Adventure" onChange={handleCheck} checked={checked.includes('Adventure') ? 'checked' : ''} />
              <label htmlFor="Adventure">Adventure</label>
            </li>
            <li>
              <input type="checkbox" id="Animation" name="Animation" value="Animation" onChange={handleCheck} checked={checked.includes('Animation') ? 'checked' : ''} />
              <label htmlFor="Animation">Animation</label>
            </li>
            <li>
              <input type="checkbox" id="Biography" name="Biography" value="Biography" onChange={handleCheck} checked={checked.includes('Biography') ? 'checked' : ''} />
              <label htmlFor="Biography">Biography</label>
            </li>
            <li>
              <input type="checkbox" id="Comedy" name="Comedy" value="Comedy" onChange={handleCheck} checked={checked.includes('Comedy') ? 'checked' : ''} />
              <label htmlFor="Comedy">Comedy</label>
            </li>
            <li>
              <input type="checkbox" id="Crime" name="Crime" value="Crime" onChange={handleCheck} checked={checked.includes('Crime') ? 'checked' : ''} />
              <label htmlFor="Crime">Crime</label>
            </li>
            <li>
              <input type="checkbox" id="Documentary" name="Documentary" value="Documentary" onChange={handleCheck} checked={checked.includes('Documentary') ? 'checked' : ''} />
              <label htmlFor="Documentary">Documentary</label>
            </li>
            <li>
              <input type="checkbox" id="Drama" name="Drama" value="Drama" onChange={handleCheck} checked={checked.includes('Drama') ? 'checked' : ''} />
              <label htmlFor="Drama">Drama</label>
            </li>
            <li>
              <input type="checkbox" id="Family" name="Family" value="Family" onChange={handleCheck} checked={checked.includes('Family') ? 'checked' : ''} />
              <label htmlFor="Family">Family</label>
            </li>
            <li>
              <input type="checkbox" id="History" name="History" value="History" onChange={handleCheck} checked={checked.includes('History') ? 'checked' : ''} />
              <label htmlFor="History">History</label>
            </li>
            <li>
              <input type="checkbox" id="Horror" name="Horror" value="Horror"
              onChange={handleCheck} checked={checked.includes('Horror') ? 'checked' : ''} />
              <label htmlFor="Horror">Horror</label>
            </li>
            <li>
              <input type="checkbox" id="Musical" name="Musical" value="Musical"
              onChange={handleCheck} checked={checked.includes('Musical') ? 'checked' : ''} />
              <label htmlFor="Musical">Musical</label>
            </li>
            <li>
              <input type="checkbox" id="Rom-Com" name="Rom-Com" value="Rom-Com"
              onChange={handleCheck} checked={checked.includes('Rom-Com') ? 'checked' : ''} />
              <label htmlFor="Rom-Com">Rom-Com</label>
            </li>
            <li>
              <input type="checkbox" id="Sci-Fi" name="Sci-Fi" value="Sci-Fi"
               onChange={handleCheck} checked={checked.includes('Sci-Fi') ? 'checked' : ''} />
              <label htmlFor="Sci-Fi">Sci-Fi</label>
            </li>
            <li>
              <input type="checkbox" id="Superhero" name="Superhero" value="Superhero" onChange={handleCheck}
              checked={checked.includes('Superhero') ? 'checked' : ''} />
              <label htmlFor="Superhero">Superhero</label>
            </li>
            <li>
              <input type="checkbox" id="Thriller" name="Thriller" value="Thriller" onChange={handleCheck} checked={checked.includes('Thriller') ? 'checked' : ''} />
              <label htmlFor="Thriller">Thriller</label>
            </li>

            <li>
              <input type="checkbox" id="Other" name="Other" value="Other" onChange={handleCheck} checked={checked.includes('Other') ? 'checked' : ''} />
              <label htmlFor="Other">Other</label>
              <input type="text" onChange={replaceOther} value={other} placeholder="Please Enter Your Choice Of Genre So We Can Make Your Experience Better" />
            </li>
          </ul>
        </div>
        <div className="prostep_save text-center">
          {loaderGenres}
          <div className="savebtn">
            <input type="button" className="btn" value="SAVE & CONTINUE" onClick={saveGenres} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default FavGenres;
