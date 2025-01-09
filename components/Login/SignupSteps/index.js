import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/index.css';
import INDST from './images/indst_pro.svg';
import POPMOVIE from './images/popmovie.svg';
import MOVIETIME from './images/movietime.svg';
import WEEKELY from './images/weeklynewslatter.svg';
import SDPROFILE from './images/sdprofile.svg';
import JON from './images/jon.png';
import FILM_VERDICT from './images/film_verdictico.svg';

const $ = require('jquery');
const LOGGED_EMAIL = localStorage.getItem('email');
const SignupSteps = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!LOGGED_EMAIL) {
      navigate('/');
    }
  }, []);

  var tikcount = 0;
  function activetik() {
    $('.profilestepbox').each(function () {
      let _this = $(this);
      tikcount = _this.find('.prostepcount li.active').index();
      /* _this.find('.prostepcount li').addClass( function (index) {
                return index < tikcount ? 'on' : 'off';
            })
             $('.prostepcount li').each(function(index){
                 index < tikcount ? _this.addClass('on') : _this.removeClass('on');
             });*/
      $(`.prostepcount li`).removeClass('tick');
      $(`.prostepcount li:lt(${tikcount})`).addClass('tick');
    });
  }

  $('.backarow').on('click', function () {
    let _this = $(this).parents('.profilestepbox');
    _this.find('.prostep_item.active').prev().addClass('active');
    _this.find('.prostep_item.active').next().removeClass('active');
    _this.find('.prostepcount li.active').prev().addClass('active');
    _this.find('.prostepcount li.active').next().removeClass('active');
    if (_this.find('.prostepcount ul li.active').index() === 0) {
      $(this).css('visibility', 'hidden');
    }
    if (_this.find('.prostepcount ul li.active').index() + 1 === _this.find('.prostepcount ul li').length) {
      $(this).css('visibility', 'hidden');
    } else {
      _this.find('.skiparow').css('visibility', 'visible');
    }
    activetik();
  });

  $('.skiparow').on('click', function () {
    let _this = $(this).parents('.profilestepbox');
    _this.find('.prostep_item.active').next().addClass('active');
    _this.find('.prostep_item.active').prev().removeClass('active');
    if (_this.find('.prostepcount ul li.active').index() + 1 === _this.find('.prostepcount ul li').length) {
      $(this).css('visibility', 'hidden');
    }
  });

  $('.prostep_item .savebtn , .skiparow').on('click', function () {
    let _this = $(this).parents('.profilestepbox');
    $(this).parents('.prostep_item').removeClass('active');
    $(this).parents('.prostep_item').next().addClass('active');
    _this.find('.prostepcount li.active').next().addClass('active');
    _this.find('.prostepcount li.active').prev().removeClass('active');
    if (_this.find('.prostepcount ul li.active').index() === 0) {
      $(this).css('visibility', 'hidden');
    } else {
      _this.find('.backarow').css('visibility', 'visible');
    }

    if (_this.find('.prostepcount ul li.active').index() + 1 === _this.find('.prostepcount ul li').length) {
      _this.find('.skiparow').css('visibility', 'hidden');
    } else {
      _this.find('.skiparow').css('visibility', 'visible');
    }
    activetik();
    //console.log( tikcount);
  });

  return (
    <>
      <section className="profilesteps">
        <div className="container">
          <div className="profilestepbox">
            <div className="prsteps_top df fww">
              <div className="backarow" style={{ visibility: 'hidden' }}>
                <i className="fas fa-long-arrow-left"></i> Back
              </div>
              <div className="prostepcount text-center">
                <ul className="df fww">
                  <li className="active">
                    <i className="far fa-check"></i>
                    <strong> 1</strong>
                  </li>
                  <li>
                    <i className="far fa-check"></i>
                    <strong> 2</strong>
                  </li>
                  <li>
                    <i className="far fa-check"></i>
                    <strong> 3</strong>
                  </li>
                  <li>
                    <i className="far fa-check"></i>
                    <strong> 4</strong>
                  </li>
                  <li>
                    <i className="far fa-check"></i>
                    <strong> 5</strong>
                  </li>
                  <li>
                    <i className="far fa-check"></i>
                    <strong> 6</strong>
                  </li>
                  <li>
                    <i className="far fa-check"></i>
                    <strong> 7</strong>
                  </li>
                  <li>
                    <i className="far fa-check"></i>
                    <strong> 8</strong>
                  </li>
                </ul>
              </div>
              <div className="skiparow">
                Skip <i className="fas fa-long-arrow-right"></i>
              </div>
            </div>
            <div className="prostep_info">
              <div className="prostep_item   ">
                <div className="top_txt">
                  <h2>What Describes You Best?</h2>
                </div>
                <div className="discribebest_box grid">
                  <div className="decbestiem">
                    <div className="top_ico">
                      <img src={INDST} alt="" />
                    </div>
                    <h6>Industry Professional </h6>
                    <p>(For those who work with information about movies and related business matters.)</p>
                  </div>
                  <div className="decbestiem">
                    <div className="top_ico">
                      <img src={POPMOVIE} alt="Popcorn Movie" />
                    </div>
                    <h6>Movie Lover</h6>
                    <p>(For those who love to watch movies and want to learn about what’s happening in Hollywood.)</p>
                  </div>
                </div>
                <div className="prostep_save text-center">
                  <div className="savebtn">
                    <a href="" className="btn">
                      save & continue
                    </a>
                  </div>
                  <div className="remiinebtn">
                    <a href="">Remind Me Later</a>
                  </div>
                </div>
              </div>
              <div className="prostep_item  ">
                <div className="top_txt">
                  <h2>What Type Of Company Or Organization Do You Work For?</h2>
                </div>
                <div className="prostep_checkchoice">
                  <ul>
                    <li>
                      <input type="checkbox" id="check1" name="check1" />
                      <label htmlFor="check1"> Distribution Company</label>
                    </li>
                    <li>
                      <input type="checkbox" id="check2" name="check2" />
                      <label htmlFor="check2">Vendor</label>
                    </li>
                    <li>
                      <input type="checkbox" id="check3" name="check3" />
                      <label htmlFor="check3">Movie Theatre/Cinema</label>
                    </li>
                    <li>
                      <input type="checkbox" id="check4" name="check4" />
                      <label htmlFor="check4">Analytics/Measurement/Research</label>
                    </li>
                    <li>
                      <input type="checkbox" id="check5" name="check5" />
                      <label htmlFor="check5">Filmfestival</label>
                    </li>
                    <li>
                      <input type="checkbox" id="check6" name="check6" />
                      <label htmlFor="check6">Online Media Company</label>
                    </li>
                    <li>
                      <input type="checkbox" id="check7" name="check7" />
                      <label htmlFor="check7">Film Production</label>
                    </li>
                    <li>
                      <input type="checkbox" id="check8" name="check8" />
                      <label htmlFor="check8">Print/Broadcast Media Company</label>
                    </li>
                    <li>
                      <input type="checkbox" id="check9" name="check9" />
                      <label htmlFor="check9">Marketing/Advertising Company</label>
                    </li>
                    <li>
                      <input type="checkbox" id="check10" name="check10" />
                      <label htmlFor="check10">Studio</label>
                    </li>
                    <li>
                      <input type="checkbox" id="check11" name="check11" />
                      <label htmlFor="check11">Other</label>
                      <input type="text" placeholder="Please Specify So We Can Make Your Experience Better" />
                    </li>
                  </ul>
                </div>
                <div className="prostep_save text-center">
                  <div className="savebtn">
                    <a href="" className="btn">
                      save & continue
                    </a>
                  </div>
                  <div className="remiinebtn">
                    <a href="">Remind Me Later</a>
                  </div>
                </div>
              </div>
              <div className="prostep_item  active">
                <div className="top_txt">
                  <h2>Tell Us More About Yourself.</h2>
                </div>
                <div className="proin_form generalform_info grid">
                  <div className="fieldbox">
                    <label>
                      <strong>First Name</strong>
                      <sup>*</sup>
                    </label>
                    <input type="email" placeholder="Your first name" />
                  </div>
                  <div className="fieldbox">
                    <label>
                      <strong>Last Name</strong>
                      <sup>*</sup>
                    </label>
                    <input type="email" placeholder="Your last name" />
                  </div>
                  <div className="fieldbox">
                    <label>
                      <strong>Job Title</strong>
                      <sup>*</sup>
                    </label>
                    <input type="email" placeholder="What you do?" />
                  </div>
                  <div className="fieldbox">
                    <label>
                      <strong>Organization</strong>
                      <sup>*</sup>
                    </label>
                    <input type="email" placeholder="Where you work at?" />
                  </div>
                  <div className="fieldbox">
                    <label>
                      <strong>Phone</strong>
                      <sup>*</sup>
                    </label>
                    <input type="tel" placeholder="(000)000-0000" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
                  </div>
                  <div className="fieldbox">
                    <label>
                      <strong>Website</strong>
                      <sup>*</sup>
                    </label>
                    <input type="email" placeholder="Enter your website" />
                  </div>
                </div>
                <div className="prostep_save text-center">
                  <div className="savebtn">
                    <a href="" className="btn">
                      save & continue
                    </a>
                  </div>
                  <div className="remiinebtn">
                    <a href="">Remind Me Later</a>
                  </div>
                </div>
              </div>
              <div className="prostep_item fluid  ">
                <div className="prostep_itemsub">
                  <div className="top_txt text-center">
                    <h2>What Country You're From?</h2>
                    <p>Based on that we will suggest you some of the nearby local theatres</p>
                  </div>
                  <div className="proin_form fav_movie">
                    <div className="fieldbox">
                      <label>
                        <strong>Country</strong>
                      </label>
                      <select name="country" id="">
                        <option value="1">USA</option>
                        <option value="2">Canada</option>
                      </select>
                    </div>
                  </div>
                  <div className="prostep_save text-center">
                    <div className="savebtn">
                      <a href="" className="btn">
                        save & continue
                      </a>
                    </div>
                    <div className="remiinebtn">
                      <a href="">Remind Me Later</a>
                    </div>
                  </div>
                </div>
                <div className="prostep_itemsub">
                  <div className="top_txt text-center">
                    <h2>Your Favorite Movie Theatre</h2>
                    <p>
                      Sorry! We Currently Don't Support Your Country To Show You Showtimes Of Different Movies Near You... <br /> We Are Working On It.
                    </p>
                  </div>
                  <div className="prostep_save text-center">
                    <div className="savebtn">
                      <a href="" className="btn">
                        save & continue
                      </a>
                    </div>
                    <div className="remiinebtn">
                      <a href="">Remind Me Later</a>
                    </div>
                  </div>
                </div>
                <div className="prostep_itemsub">
                  <div className="top_txt text-center">
                    <h2>What Are Your Favorite Local Theatres?</h2>
                    <p>Enter Your Location, So That We Can Recommend Local Theatres.</p>
                  </div>
                  <div className="proin_form ">
                    <div className="fieldbox fav_movie ddd">
                      <label>
                        <strong>Location</strong>
                      </label>
                      <input type="text" placeholder="Enter City & State or ZIP Code" />
                      <span className="selectlocation">
                        <i className="fas fa-location"></i> Use my current location
                      </span>
                    </div>

                    <div className="theaterlocate">
                      <p className="text-center">Click on "Favorite" button to add any of this theatres to your favorite list</p>
                      <div className="exb_infocard grid">
                        <div className="exb_infocarditem">
                          <h4>AMC 19th Street East 6</h4>
                          <p>335 N. Maple Drive Suite 340, Beverly Hills, CA 90210, USA</p>
                          <p>6 Screens</p>
                          <div className="theaters_features">
                            <ul className="df fww">
                              <li>Parking</li>
                              <li>Dine-in</li>
                              <li>iMAX</li>
                              <li>4dX</li>
                              <li>Dolby aTMOS</li>
                              <li>Recliners</li>
                            </ul>
                          </div>
                          <div className="favoritebox">
                            <a href="">
                              Favorite<i className="far fa-heart"></i>
                            </a>
                          </div>
                        </div>
                        <div className="exb_infocarditem">
                          <h4>AMC 19th Street East 6</h4>
                          <p>335 N. Maple Drive Suite 340, Beverly Hills, CA 90210, USA</p>
                          <p>6 Screens</p>
                          <div className="theaters_features">
                            <ul className="df fww">
                              <li>Parking</li>
                              <li>Dine-in</li>
                              <li>iMAX</li>
                              <li>4dX</li>
                              <li>Dolby aTMOS</li>
                              <li>Recliners</li>
                            </ul>
                          </div>
                          <div className="favoritebox">
                            <a href="">
                              Favorite<i className="far fa-heart"></i>
                            </a>
                          </div>
                        </div>
                        <div className="exb_infocarditem">
                          <h4>AMC 19th Street East 6</h4>
                          <p>335 N. Maple Drive Suite 340, Beverly Hills, CA 90210, USA</p>
                          <p>6 Screens</p>
                          <div className="theaters_features">
                            <ul className="df fww">
                              <li>Parking</li>
                              <li>Dine-in</li>
                              <li>iMAX</li>
                              <li>4dX</li>
                              <li>Dolby aTMOS</li>
                              <li>Recliners</li>
                            </ul>
                          </div>
                          <div className="favoritebox">
                            <a href="">
                              Favorite<i className="far fa-heart"></i>
                            </a>
                          </div>
                        </div>
                        <div className="exb_infocarditem">
                          <h4>AMC 19th Street East 6</h4>
                          <p>335 N. Maple Drive Suite 340, Beverly Hills, CA 90210, USA</p>
                          <p>6 Screens</p>
                          <div className="theaters_features">
                            <ul className="df fww">
                              <li>Parking</li>
                              <li>Dine-in</li>
                              <li>iMAX</li>
                              <li>4dX</li>
                              <li>Dolby aTMOS</li>
                              <li>Recliners</li>
                            </ul>
                          </div>
                          <div className="favoritebox">
                            <a href="">
                              Favorite<i className="far fa-heart"></i>
                            </a>
                          </div>
                        </div>
                        <div className="exb_infocarditem">
                          <h4>AMC 19th Street East 6</h4>
                          <p>335 N. Maple Drive Suite 340, Beverly Hills, CA 90210, USA</p>
                          <p>6 Screens</p>
                          <div className="theaters_features">
                            <ul className="df fww">
                              <li>Parking</li>
                              <li>Dine-in</li>
                              <li>iMAX</li>
                              <li>4dX</li>
                              <li>Dolby aTMOS</li>
                              <li>Recliners</li>
                            </ul>
                          </div>
                          <div className="favoritebox">
                            <a href="">
                              Favorite<i className="far fa-heart"></i>
                            </a>
                          </div>
                        </div>
                        <div className="exb_infocarditem">
                          <h4>AMC 19th Street East 6</h4>
                          <p>335 N. Maple Drive Suite 340, Beverly Hills, CA 90210, USA</p>
                          <p>6 Screens</p>
                          <div className="theaters_features">
                            <ul className="df fww">
                              <li>Parking</li>
                              <li>Dine-in</li>
                              <li>iMAX</li>
                              <li>4dX</li>
                              <li>Dolby aTMOS</li>
                              <li>Recliners</li>
                            </ul>
                          </div>
                          <div className="favoritebox">
                            <a href="">
                              Favorite<i className="far fa-heart"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="prostep_save text-center">
                    <div className="savebtn">
                      <a href="" className="btn">
                        save & continue
                      </a>
                    </div>
                    <div className="remiinebtn">
                      <a href="">Remind Me Later</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prostep_item ">
                <div className="top_txt">
                  <h2>What Are Your Favorite Movie Genres?</h2>
                </div>
                <div className="prostep_checkchoice genrechoice">
                  <ul>
                    <li>
                      <input type="checkbox" id="checkgen1" name="checkgen1" />
                      <label htmlFor="checkgen1"> Action</label>
                    </li>
                    <li>
                      <input type="checkbox" id="checkgen2" name="checkgen2" />
                      <label htmlFor="checkgen2">Adventure</label>
                    </li>
                    <li>
                      <input type="checkbox" id="checkgen3" name="checkgen3" />
                      <label htmlFor="checkgen3">Animation</label>
                    </li>
                    <li>
                      <input type="checkbox" id="checkgen4" name="checkgen4" />
                      <label htmlFor="checkgen4">Comedy</label>
                    </li>
                    <li>
                      <input type="checkbox" id="checkgen5" name="checkgen5" />
                      <label htmlFor="checkgen5">Crime</label>
                    </li>
                    <li>
                      <input type="checkbox" id="checkgen6" name="checkgen6" />
                      <label htmlFor="checkgen6">Studio</label>
                    </li>
                    <li>
                      <input type="checkbox" id="checkgen7" name="checkgen7" />
                      <label htmlFor="checkgen7">Documentary</label>
                    </li>
                    <li>
                      <input type="checkbox" id="checkgen8" name="checkgen8" />
                      <label htmlFor="checkgen8">Drama</label>
                    </li>
                    <li>
                      <input type="checkbox" id="checkgen9" name="checkgen9" />
                      <label htmlFor="checkgen9">Family</label>
                    </li>
                    <li>
                      <input type="checkbox" id="checkgen10" name="checgen10" />
                      <label htmlFor="checkgen10">Film-Noir</label>
                    </li>
                    <li>
                      <input type="checkbox" id="checkgen11" name="checgen11" />
                      <label htmlFor="checkgen11">Game-Show</label>
                    </li>
                    <li>
                      <input type="checkbox" id="checkgen12" name="checgen12" />
                      <label htmlFor="checkgen12">History</label>
                    </li>
                    <li>
                      <input type="checkbox" id="checkgen13" name="checgen13" />
                      <label htmlFor="checkgen13">Other</label>
                      <input type="text" placeholder="Please Enter Your Choice Of Genre So We Can Make Your Experience Better" />
                    </li>
                  </ul>
                </div>
                <div className="prostep_save text-center">
                  <div className="savebtn">
                    <a href="" className="btn">
                      save & continue
                    </a>
                  </div>
                  <div className="remiinebtn">
                    <a href="">Remind Me Later</a>
                  </div>
                </div>
              </div>
              <div className="prostep_item   ">
                <div className="top_txt text-center">
                  <h2>Tell Us A Few Of Your Favorite Actors And Directors.</h2>
                  <p>We'll Send You Their Biographies And Share Updates On Their Latest Movies</p>
                  <div className="favaddinput w100 pvr">
                    <input type="text" placeholder="Enter Movie Name" list="favmoviename1" />
                    <button className="btn goldbtn">add to favorite</button>
                    <ul id="favmoviename1" className="favmoviename hide">
                      {/* <li value="Java">Java</li>
                                        <li value="JavaScript">JavaScript</li>
                                        <li value="Python">Python</li>
                                        <li value="PHP">PHP</li>*/}
                    </ul>
                  </div>
                </div>
                <div className="profav_telent">
                  <ul className="castcrew_people grid gap16">
                    <li>
                      <div className="cast_pic bgimage" style={{ backgroundImage: `url(${JON})` }}></div>
                      <div className="cast_info">
                        <h5>
                          <a href="" target="_self">
                            Jon M. Chu{' '}
                            <span className="favheart">
                              <i className="far fa-heart"></i>
                            </span>
                          </a>
                        </h5>
                        <p>
                          <a href="" target="_self">
                            X-Men: Apocalypse
                          </a>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="cast_pic bgimage" style={{ backgroundImage: `url(${JON})` }}></div>
                      <div className="cast_info">
                        <h5>
                          <a href="" target="_self">
                            Jon M. Chu{' '}
                            <span className="favheart">
                              <i className="far fa-heart"></i>
                            </span>
                          </a>
                        </h5>
                        <p>
                          <a href="" target="_self">
                            X-Men: Apocalypse
                          </a>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="cast_pic bgimage" style={{ backgroundImage: `url(${JON})` }}></div>
                      <div className="cast_info">
                        <h5>
                          <a href="" target="_self">
                            Jon M. Chu{' '}
                            <span className="favheart">
                              <i className="far fa-heart"></i>
                            </span>
                          </a>
                        </h5>
                        <p>
                          <a href="" target="_self">
                            X-Men: Apocalypse
                          </a>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="cast_pic bgimage" style={{ backgroundImage: `url(${JON})` }}></div>
                      <div className="cast_info">
                        <h5>
                          <a href="" target="_self">
                            Jon M. Chu{' '}
                            <span className="favheart">
                              <i className="far fa-heart"></i>
                            </span>
                          </a>
                        </h5>
                        <p>
                          <a href="" target="_self">
                            X-Men: Apocalypse
                          </a>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="cast_pic bgimage" style={{ backgroundImage: `url(${JON})` }}></div>
                      <div className="cast_info">
                        <h5>
                          <a href="" target="_self">
                            Jon M. Chu{' '}
                            <span className="favheart">
                              <i className="far fa-heart"></i>
                            </span>
                          </a>
                        </h5>
                        <p>
                          <a href="" target="_self">
                            X-Men: Apocalypse
                          </a>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="cast_pic bgimage" style={{ backgroundImage: `url(${JON})` }}></div>
                      <div className="cast_info">
                        <h5>
                          <a href="" target="_self">
                            Jon M. Chu{' '}
                            <span className="favheart">
                              <i className="far fa-heart"></i>
                            </span>
                          </a>
                        </h5>
                        <p>
                          <a href="" target="_self">
                            X-Men: Apocalypse
                          </a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="prostep_save text-center">
                  <div className="savebtn">
                    <a href="" className="btn">
                      save & continue
                    </a>
                  </div>
                  <div className="remiinebtn">
                    <a href="">Remind Me Later</a>
                  </div>
                </div>
              </div>
              <div className="prostep_item">
                <div className="top_txt text-center">
                  <h2>Choose Newsletter you want to subscribe.</h2>
                  <p>
                    Screendollars' Email Newsletters Provides You With Fun And Useful Information About The Movies And The Movie Business. We recommend signing up for these newsletters however you can
                    uncheck if you don't want any one of listed.
                  </p>
                </div>
                <div className="discribebest_box grid three_col">
                  <div className="decbestiem">
                    <div className="top_ico">
                      <img src={MOVIETIME} alt="Movie Time" />
                    </div>
                    <h6>Movie Times</h6>
                    <p className="greytxt">
                      previewing movies and top stars for the upcoming weekend <span>- Delivered every Thursday</span>
                    </p>
                  </div>
                  <div className="decbestiem">
                    <div className="top_ico">
                      <img src={WEEKELY} alt="weeklynewslatter" />
                    </div>
                    <h6>Industry Newsletter</h6>
                    <p className="greytxt">
                      our award-winning industry report enjoyed by over 150,000 professionals every week <span>- Delivered every Sunday</span>
                    </p>
                  </div>
                  <div className="decbestiem">
                    <div className="top_ico">
                      <img src={FILM_VERDICT} alt="Film Verdict" />
                    </div>
                    <h6>The Film Verdict</h6>
                    <p className="greytxt">original reviews of exciting new movies premiering at Film Festivals around the world</p>
                  </div>
                </div>
                <div className="prostep_save text-center">
                  <div className="savebtn">
                    <a href="" className="btn">
                      save & continue
                    </a>
                  </div>
                  <div className="remiinebtn">
                    <a href="">Remind Me Later</a>
                  </div>
                </div>
              </div>
              <div className="prostep_item ">
                <div className="top_txt text-center">
                  <h2>Personalize Your Screendollars Experience</h2>
                </div>

                <div className="prostep_pic">
                  <div className="fieldbox">
                    <div className="tagbox  df fww unicuser">
                      <label>
                        <strong>Username</strong>
                        <sup>*</sup>
                      </label>
                      <div className="taginfo df fww">
                        <i className="fal fa-info-circle"></i>
                        <p>This Include Distributors, Exhibitors, Vendors And Film Festivals Etc...</p>
                      </div>
                    </div>
                    <input type="text" placeholder="Choose a unique username" />
                  </div>
                  <div className="top_txt df fww tagbox">
                    <label>
                      <strong>Avatar Image</strong>
                      <sup>*</sup>
                    </label>
                    <div className="taginfo df fww">
                      <i className="fal fa-info-circle"></i>
                      <p>This Include Distributors, Exhibitors, Vendors And Film Festivals Etc...</p>
                    </div>
                  </div>

                  <div className="proupdateimg df fww">
                    <div className="prosteppicimg  m20">
                      <img src={SDPROFILE} alt="Sd Profile" />
                    </div>
                    <div className="uploadsbtninfo pvr  df fww">
                      <button className="uploadsbtn btn goldbtn">upload Image</button>
                      <p className="greytxt">
                        <small>
                          (Image Resolution Should <br /> Be of Min 100x100 PX )
                        </small>
                      </p>
                      <input type="file" className="imgInp" />
                      <p className="filename"></p>
                    </div>
                  </div>
                  <div className="orliner">
                    <span>OR</span>
                  </div>
                  <div className="chooseavatar">
                    <p>Choose from below</p>
                    <div className="avatarsinfo grid gap16">
                      <div className="latter_box">TB</div>
                      <div className="avtarpic">
                        <img src={SDPROFILE} alt="Sd Profile" />
                      </div>
                      <div className="avtarpic">
                        <img src={SDPROFILE} alt="Sd Profile" />
                      </div>
                      <div className="avtarpic">
                        <img src={SDPROFILE} alt="Sd Profile" />
                      </div>
                      <div className="avtarpic">
                        <img src={SDPROFILE} alt="Sd Profile" />
                      </div>
                      <div className="avtarpic">
                        <img src={SDPROFILE} alt="Sd Profile" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="prostep_save text-center">
                  <div className="savebtnlast">
                    <a href="" className="btn">
                      Submit
                    </a>
                  </div>
                  <div className="remiinebtn">
                    <a href="">Remind Me Later</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupSteps;
