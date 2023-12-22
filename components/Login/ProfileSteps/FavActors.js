import react, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_SD_API;

if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
}
const LOADER = 'Loading...';
const redTxt = {
  color: '#EF404E',
};
const FavActors = ({ children, active }) => {
  const [searchActor, setSearchActor] = useState();
  const [loadActor, setLoadActor] = useState();
  const [actorList, setActorList] = useState([]);
  const [favTheatre, setFavTheatre] = useState([]);
  const [already, setAlready] = useState([]);
  const [checked, setChecked] = useState([]);
  const [loaderTheatre, setLoaderTheatre] = useState();
  const [items, setItems] = useState([]);

  const listActors = async () => {
    var profile_saveurl = API_URL + '/login/fav_actors.php';
    await axios
      .get(profile_saveurl, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          s_text: window.btoa('blank'),
        },
      })
      .then((res) => {
        var objectRelated = res.data.talent;

        var mapValues = Object.values(objectRelated);
        // alert(mapValues.length)
        if (mapValues.length > 0) {
          var favCheck = mapValues[0]['fav'];
          var favActorsIds = mapValues[0]['fav_list'];
          if (favCheck === true) {
            setItems(JSON.parse(mapValues[0]['fav_actorlist']));
          }
          setActorList(mapValues);
        }
        setLoadActor('');
      })
      .catch((err) => console.log('Actors lists error ', err));
  };
  useEffect(() => {
    listActors();
  }, []);

  const favoriteActors = async () => {
    setLoadActor(LOADER);
    var profile_saveurl = API_URL + '/login/fav_actors.php';
    await axios
      .get(profile_saveurl, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          s_text: window.btoa(searchActor),
        },
      })
      .then((res) => {
        var objectRelated = res.data.talent;
        var mapValues = Object.values(objectRelated);
        setActorList(mapValues);
        setLoadActor('');
      })
      .catch((err) => console.log('Actors fetch error ', err));
  };

  const addFavorite = (value) => {
    if (items.includes(value) === true) {
      var setNewItems = items.splice(items.indexOf(value), -1);
      const newArr = items.filter((a) => {
        return value !== a;
      });
      setItems(newArr);
      return false;
    } else {
      items.push(value);
      const newArr = items.filter((a) => a);
      setItems(newArr);
      return false;
    }
  };

  const saveActorData = () => {
    setLoaderTheatre(LOADER);

    var formData = new FormData();
    //  var imagefile = document.querySelector('#file');
    formData.append('auth', LOGGED_EMAIL);
    formData.append('type', 'POST');
    formData.append('values', JSON.stringify(items));
    var favactors_url = API_URL + '/login/fav_actors_add.php';
    axios
      .post(favactors_url, formData)
      .then((res) => {
        // alert(res.data);
        setLoaderTheatre('');
        document.getElementById('skip').click();
      })
      .catch((err) => console.log('actor error: ', err));
  };

  return (
    <>
      <div className={` prostep_item ${active}`}>
        <div className="top_txt text-center">
          <h2>Tell Us a Few of Your Favorite Actors and Directors?</h2>
          <p>We will share with you our unique biographies and updates on their movies. </p>
          <div className="favaddinput w100 pvr">
            <input type="text" placeholder="Enter any actor or director" list="favmoviename1" onChange={(e) => setSearchActor(e.target.value)} />
            <button className="btn goldbtn" onClick={favoriteActors}>
            ADD TO MY FAVORITES
            </button>
            {loadActor}

          </div>
        </div>
        <div className="profav_telent">
          <ul className="castcrew_people grid gap16">
            {actorList.map((currentElement) => {
              const id = currentElement.id;
              return (
                <li key={id}>
                  <div className="cast_pic bgimage" style={{ backgroundImage: `url(${currentElement.img})` }}></div>
                  <div className="cast_info" onClick={() => addFavorite(id)}>
                    <h5>
                      {currentElement.name}
                      <span className={items.includes(id) ? 'favheart  redtxt' : 'favheart '}>
                        <i className={items.includes(id) ? 'fas fa-heart' : 'far fa-heart '}></i>
                      </span>
                    </h5>
                    <p>{currentElement.telent_have}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="prostep_save text-center">
          {loaderTheatre}
          <div className="savebtn">
            <input className="btn" type="button" value="SAVE & CONTINUE" onClick={saveActorData} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};
export default FavActors;
