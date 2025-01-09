import React, { useState, useEffect } from 'react';
import axios from 'axios';


if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
}
const LOADER = 'Loading..';
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const $ = require('jquery');
const NewsLettersp = ({ children, active }) => {
  const [movieTime, setMovieTime] = useState('active');

  const [loaderLetter, setLoaderLetter] = useState(' ');
  const [groups, setGroups] = useState([]);
  const [intersets, setIntersets] = useState([]);

  useEffect(() => {
    var grouplidtst_url = API_URL + '/mailchimp/group_list.php';
    fetch(grouplidtst_url)
      .then((response) => response.json())
      .then((data) => {
        setGroups(data);
      });
  }, []);

  useEffect(() => {
    var membersd_url = API_URL + '/mailchimp/memberinfo-sd.php';
    axios
      .get(membersd_url, {
        params: {
          auth: window.btoa(LOGGED_EMAIL),
        },
      })
      .then((res) => {
        const returnedValues = res.data;
        setIntersets(returnedValues);
      })
      .catch((err) => console.log('Email Profile Newsletter: ', err));
  }, []);

  const arrayIntersets = [];
  const newsToggle = (Value) => {
    $('.newstoggle_' + Value).toggleClass('off');
    $('.newstoggle_' + Value)
      .closest('.newssubscribe_items_' + Value)
      .toggleClass('unsuboff');
  };

  const cancelToggle = (Value) => {
    $('.newstoggle_' + Value)
      .closest('.newssubscribe_items_' + Value)
      .toggleClass('unsuboff');
    $('.newstoggle_' + Value)
      .closest('.newssubscribe_items_' + Value)
      .find('.newstoggle_' + Value)
      .toggleClass('off');
  };

  const unsubScribeToggle = (Value) => {
    $('.newstoggle_' + Value)
      .closest('.newssubscribe_items_' + Value)
      .toggleClass('unsuboff');

    $('.unsubbtn_' + Value).text(function (i, text) {
      return text === 'unsubscribe' ? 'subscribe' : 'unsubscribe';
    });
  };

  const saveNewsletter = () => {
    setLoaderLetter(LOADER);
    var groupLists = {};

    $('.newstoggle').each((index) => {
      $('.newstoggle_' + groups[index]['cat_id']).hasClass('off');
      if ($('.newstoggle_' + groups[index]['cat_id']).hasClass('off') === true) {
        groupLists[groups[index]['cat_id']] = false;
      } else {
        groupLists[groups[index]['cat_id']] = true;
      }
    });


    var emailnews_url = API_URL + '/login/email_newsletter.php';
    const addProfile = axios
      .get(emailnews_url, {
        params: {
          auth: window.btoa(LOGGED_EMAIL),
          type: 'POST',
          intersets: groupLists,
        },
      })
      .then((res) => {
        setLoaderLetter('');
        document.getElementById('skip').click();
      })
      .catch((err) => console.log('Profile Steps Newsletter: ', err));
  };

  return (
    <>
      <div className={` prostep_item ${active}`}>
        <div className="prefere_newslatter">
          <div className="top_txt" style={{ borderTop: '0px' }}>
            <h2>Newsletters</h2>
            <p>Signup to receive our exciting newsletters </p>
          </div>
          <div className="newssubscribe df fww just-between">
            {groups.map((currentValue, index) => {

              if (currentValue.cat_name !== 'Movie Times') {
                return (

                  <div className={`newssubscribe_item newssubscribe_items_${currentValue.cat_id}`}>
                    <div className="newssubscribe_intro">
                      <div className="top_title">
                        <h5>{currentValue.cat_name}</h5>
                        <div
                          className={`newstoggle  newstoggle_${currentValue.cat_id} ${intersets.includes(currentValue.cat_id) ? '' : 'off'}`}
                          onClick={() => newsToggle(currentValue.cat_id)}
                          id={currentValue.cat_id}
                        >
                          <div className="nwtoggleg"></div>
                          <div className="nwtogglehandle"></div>
                        </div>
                      </div>
                      <div className="newssubscribe_info df fww">
                        <p>
                          {currentValue.intersets_conent}
                          <span>
                            <strong>{currentValue.intersets_day}</strong>
                          </span>
                        </p>
                        <div className="preview_btn">
                          <a href={currentValue.links} className="btn ghostbtn" target="_self">
                            preview
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="newsltr_unsubscribe text-center">
                      <h5>
                        Are You Sure You Want To {intersets.includes(currentValue.cat_id) ? 'Unsubscribe' : 'Subscribe'} From {currentValue.cat_name}?
                      </h5>
                      <div className="unsubscribe_btn">
                        <span className={`btn ghostbtn unsubbtn unsubbtn_${currentValue.cat_id}`} onClick={() => unsubScribeToggle(currentValue.cat_id)} target="_self">
                          {intersets.includes(currentValue.cat_id) ? 'unsubscribe' : 'subscribe'}
                        </span>
                        <span className={`btn ghostbtn canclenewsbtn canclenewsbtn_${currentValue.cat_id}`} onClick={() => cancelToggle(currentValue.cat_id)} target="_self">
                          cancel
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }

            })}
          </div>
          <div className="top_txt" style={{ borderTop: '0px' }}>
            <br />
          </div>
        </div>

        <div className="prostep_save text-center">
          {loaderLetter}
          <div className="savebtn">
            <input type="button" className="btn" value="SAVE & CONTINUE" onClick={saveNewsletter} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};
export default NewsLettersp;
