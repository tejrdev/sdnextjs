import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useLoginCheck from '../useLoginCheck';
if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
}
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const LOADER = 'Loading..';
const FavGenres = () => {
  const [loaderGenres, setLoaderGenres] = useState('');
  const [checked, setChecked] = useState([]);
  const loginCheck = useLoginCheck();
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
    setLoaderGenres(LOADER);

    var formData = new FormData();
    //  var imagefile = document.querySelector('#file');
    var genre_url = API_URL + '/login/fav_genres.php';
    formData.append('auth', LOGGED_EMAIL);
    formData.append('type', 'POST');
    formData.append('values', JSON.stringify(arryITems));
    axios
      .post(genre_url, formData)
      .then((res) => {
        setLoaderGenres('');
        location.replace('/profile');
        window.location.reload(false);
      })
      .catch((err) => console.log('work error: ', err));
  };
  const getGenres = async () => {
    var genre_url = API_URL + '/login/fav_genres.php';
    await axios
      .get(genre_url, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          process: window.btoa('GET'),
        },
      })
      .then((res) => {
        setChecked(JSON.parse(JSON.stringify(res.data)));
      })
      .catch((err) => console.log('work get error ', err));
  };

  useEffect(() => {
    getGenres();
  }, []);
  return (
    <>
    {loginCheck}
    <section className="profileinfo">
      <div className="prostep_item active">
        <div className="top_txt">
          <h2>What Are Your Favorite Movie Genres?</h2>
        </div>
        <form>
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
                <input type="checkbox" id="Comedy" name="Comedy" value="Comedy" onChange={handleCheck} checked={checked.includes('Comedy') ? 'checked' : ''} />
                <label htmlFor="Comedy">Comedy</label>
              </li>
              <li>
                <input type="checkbox" id="Crime" name="Crime" value="Crime" onChange={handleCheck} checked={checked.includes('Crime') ? 'checked' : ''} />
                <label htmlFor="Crime">Crime</label>
              </li>
              <li>
                <input type="checkbox" id="Studio" name="Studio" value="Studio" onChange={handleCheck} checked={checked.includes('Studio') ? 'checked' : ''} />
                <label htmlFor="Studio">Studio</label>
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
                <input type="checkbox" id="Noir" name="Noir" value="Noir" onChange={handleCheck} checked={checked.includes('Noir') ? 'checked' : ''} />
                <label htmlFor="Noir">Film-Noir</label>
              </li>
              <li>
                <input type="checkbox" id="Game-Show" name="Game-Show" value="Game-Show" onChange={handleCheck} checked={checked.includes('Game-Show') ? 'checked' : ''} />
                <label htmlFor="Game-Show">Game-Show</label>
              </li>
              <li>
                <input type="checkbox" id="History" name="History" value="History" onChange={handleCheck} checked={checked.includes('History') ? 'checked' : ''} />
                <label htmlFor="History">History</label>
              </li>
              <li>
                <input type="checkbox" id="other" name="other" value="other" onChange={handleCheck} checked={checked.includes('other') ? 'checked' : ''} />
              </li>
              <li>
                <label htmlFor="Other">Other</label>
                <input type="text" placeholder="Please Enter Your Choice Of Genre So We Can Make Your Experience Better" />
              </li>
            </ul>
          </div>
          <div className="prostep_save text-center">
            {loaderGenres}
            <div className="savebtn">
              <a className="btn" onClick={saveGenres}>
                SAVE
              </a>
            </div>
            <div className="savebtn">
              <br />
            </div>
          </div>
        </form>
      </div>
    </section>
    </>
  );
};
export default FavGenres;
