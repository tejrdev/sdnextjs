import { useState } from 'react';
import Loader from '../Loader';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const $ = require('jquery');
const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);

const ListingDetailComponent = ({ data, userLoggedIn, ListingURL, ListingType }) => {
  const [ListingDetail, setListingDetail] = useState({
    name: data.name || '' || '',
    address: data.address || '',
    city: data.city || '',
    state: data.state || '',
    zippostal_code: data.zippostal_code || '',
    country: data.country || '',
    phone_no: data.phone_no || '',
    website: data.website || '',
    facebook_link: data.facebook_link || '',
    instagram_link: data.instagram_link || '',
    twitter_link: data.twitter_link || '',
    youtube_link: data.youtube_link || '',
    wikipedia_link: data.wikipedia_link || '',
    content: data.content || '',
    amenities: data.amenities || [],
    send_message_email: data.send_message_email || '',
    headquaters: data.headquaters || '',
    key_contacts: data.key_contacts || [],
    no_screens: data.no_screens || '',
    no_locations: data.no_locations || '',
    seats: data.seats || '',
    display_drive_in_icon: data.display_drive_in_icon || false,
    states_active: data.states_active || [],
    distribution_type: data.distribution_type || [],
    startprevDate: data.startprevDate || '',
    endprevDate: data.endprevDate || '',
    upcoming_start: data.upcoming_start || '',
    upcoming_end: data.upcoming_end || '',
    film_festival_type: data.film_festival_type || [],
    genre: data.genre || [],
  });

  let StateOptions;
  if (data.state_listing) {
    StateOptions = Object.values(data.state_listing.split(',')).map((value, id) => ({
      id,
      value,
    }));
  }

  const [blnShowLoader, setblnShowLoader] = useState(false);
  const [resMessage, setResMessage] = useState('');
  const [error, setError] = useState(false);

  setTimeout(() => {
    $('select[name="state"]').val(data.state);
    $('select[name="country"]').val(data.country);
  }, 1000);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setListingDetail({
      ...ListingDetail,
      [name]: value,
    });
  };

  const pSaveListingData = async (e) => {
    e.preventDefault();
    if (ListingType === 'film-festival' && ListingDetail.genre.length === 0) {
      alert('select atlist one genre for Film Festival.');
      return false;
    }
    setblnShowLoader(true);
    const formData = new FormData();
    formData.append('email', userLoggedIn);
    formData.append('listingTypeUrl', ListingURL);
    formData.append('listingType', ListingType);
    for (var key in ListingDetail) {
      if (key === 'key_contacts' || key === 'upcoming_dates') {
        formData.append(key, JSON.stringify(ListingDetail[key]));
      } else {
        formData.append(key, ListingDetail[key]);
      }
    }
    try {
      const data = await fetch(process.env.NEXT_PUBLIC_SD_API + '/claim-listing/save_claim_data.php', {
        method: 'post',
        body: formData,
      });
      const res = await data.json();
      if (res) {
        if (res.error !== '') {
          setError(true);
        }
        setResMessage(res.note);
        setTimeout(() => {
          setResMessage('');
        }, 2000);
      } else {
        setError(true);
        setResMessage('something went wrong, Please try again!');
      }
    } catch (err) {
      console.error(err);
    }
    setblnShowLoader(false);
  };
  const setAmenities = (event) => {
    const amenities = data.amenities;
    const amenity = event.target.name;
    if (event.target.checked) {
      amenities.push(amenity);
    } else {
      amenities.splice(amenities.indexOf(amenity), 1);
    }
    setListingDetail({
      ...ListingDetail,
      amenities: amenities,
    });
  };
  const setAssociat = (event) => {
    const associated = data.associated;
    const associatewith = event.target.name;
    if (event.target.checked) {
      associated.push(associatewith);
    } else {
      associated.splice(associated.indexOf(associatewith), 1);
    }
    setListingDetail({
      ...ListingDetail,
      associated: associated,
    });
  };

  const setDistributionTypes = (event) => {
    const DistributionTypes = data.distribution_type;
    const distribution_type = event.target.name;
    if (event.target.checked) {
      DistributionTypes.push(distribution_type);
    } else {
      DistributionTypes.splice(DistributionTypes.indexOf(distribution_type), 1);
    }
    setListingDetail({
      ...ListingDetail,
      distribution_type: DistributionTypes,
    });
  };
  const setFestivalTypes = (event) => {
    const FestivalTypes = data.film_festival_type;
    const film_festival_type = event.target.name;
    if (event.target.checked) {
      FestivalTypes.push(film_festival_type);
    } else {
      FestivalTypes.splice(FestivalTypes.indexOf(film_festival_type), 1);
    }
    setListingDetail({
      ...ListingDetail,
      film_festival_type: FestivalTypes,
    });
  };
  const setGenres = (event) => {
    const Genres = data.genre;
    const genre = event.target.name;
    if (event.target.checked) {
      Genres.push(genre);
    } else {
      Genres.splice(Genres.indexOf(genre), 1);
    }
    setListingDetail({
      ...ListingDetail,
      genre: Genres,
    });
  };
  const setDriveInIcon = (event) => {
    setListingDetail({
      ...ListingDetail,
      display_drive_in_icon: event.target.checked,
    });
  };
  const addKeyContact = (e) => {
    e.preventDefault();
    const contact = {};
    $('.keycontactfeed input.proinputfield').each((index, item) => {
      contact[item.name] = item.value;
    });
    if (ListingDetail.key_contacts) {
      const contacts = ListingDetail.key_contacts;
      contacts.push(contact);
      setListingDetail({
        ...ListingDetail,
        key_contacts: contacts,
      });
    } else {
      const key_Contact = [];
      key_Contact.push(contact);
      setListingDetail({
        ...ListingDetail,
        key_contacts: key_Contact,
      });
    }
    $('.keycontactfeed input.proinputfield').each((index, item) => {
      item.value = '';
    });
  };

  const deleteKeyContact = (e) => {
    e.preventDefault();
    const contacts = ListingDetail.key_contacts;
    const delIndex = $(e.target).closest('li').index();
    contacts.splice(delIndex, 1);
    // console.log(contacts);
    setListingDetail({
      ...ListingDetail,
      key_contacts: contacts,
    });
  };

  const setOperatingLoc = (event) => {
    const states_active = data.states_active;
    const state = event.target.innerHTML;
    if (states_active.indexOf(state) > -1) {
      //state uncheck
      states_active.splice(states_active.indexOf(state), 1);
    } else {
      states_active.push(state);
    }
    setListingDetail({
      ...ListingDetail,
      states_active: states_active,
    });
  };

  const handleDatechange = (date, key) => {
    const dateValue = dateFormatter.format(date);
    setListingDetail({
      ...ListingDetail,
      [key]: dateValue,
    });
  };
  return (
    <section className='listingfeed toplinesec'>
      <div className='container'>
        <div className='top_txt'></div>
        <form action='' className='profileinfobox grid mb-0'>
          <div className='profile_field'>
            <label htmlFor='' className='labeltxt'>
              Name
            </label>
            <div className='from_fieldbox'>
              <input type='text' placeholder='Enter Name' name='name' value={ListingDetail.name} onChange={handleOnChange} className='proinputfield' />
            </div>
          </div>
          <div className='profile_field'>
            <label htmlFor='' className='labeltxt'>
              Street Address
            </label>
            <div className='from_fieldbox'>
              <input type='text' placeholder='Enter Street Address' name='address' value={ListingDetail.address} onChange={handleOnChange} className='proinputfield' />
            </div>
          </div>
          <div className='profile_field'>
            <p className='labeltxt'>City</p>
            <input type='text' placeholder='Enter City' name='city' value={ListingDetail.city} onChange={handleOnChange} className='proinputfield' />
          </div>
          <div className='profile_field'>
            <p className='labeltxt'>State / Province</p>
            <select name='state' className='selectin'>
              {StateOptions.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
                    {item.value}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='profile_field'>
            <label htmlFor='' className='labeltxt'>
              Zip / Postal Code
            </label>
            <div className='from_fieldbox'>
              <input type='text' placeholder='Enter Zip / Postal Code' name='zippostal_code' value={ListingDetail.zippostal_code} onChange={handleOnChange} className='proinputfield' />
            </div>
          </div>
          <div className='profile_field'>
            <p className='labeltxt'>Country</p>
            <select name='country'>
              <option value='USA'>USA</option>
              <option value='Canada'>Canada</option>
            </select>
          </div>
          <div className='profile_field'>
            <p className='labeltxt'>Phone</p>
            <div className='pvr'>
              <input type='text' className='proinputfield' name='phone_no' placeholder='e.g. (800) 555-1212' value={ListingDetail.phone_no} onChange={handleOnChange} />
            </div>
          </div>
          <div className='profile_field'>
            <label htmlFor='' className='labeltxt'>
              Email
            </label>
            <div className='from_fieldbox'>
              <input type='text' placeholder='Enter Email Address' name='send_message_email' value={ListingDetail.send_message_email} onChange={handleOnChange} className='proinputfield' />
            </div>
          </div>
          <div className='profile_field'>
            <label htmlFor='' className='labeltxt'>
              Official Website
            </label>
            <div className='from_fieldbox'>
              <input type='text' placeholder='Enter Website' name='website' value={ListingDetail.website} onChange={handleOnChange} className='proinputfield' />
            </div>
          </div>
          {data.headquaters && (
            <div className='profile_field'>
              <label htmlFor='' className='labeltxt'>
                Headquaters
              </label>
              <div className='from_fieldbox'>
                <input type='text' placeholder='Enter Headquaters' name='headquaters' value={ListingDetail.headquaters} onChange={handleOnChange} className='proinputfield' />
              </div>
            </div>
          )}
          <div className='profile_field'>
            <label htmlFor='' className='labeltxt'>
              Facebook
            </label>
            <div className='from_fieldbox'>
              <input type='text' placeholder='Enter Facebook Link' name='facebook_link' value={ListingDetail.facebook_link} onChange={handleOnChange} className='proinputfield' />
            </div>
          </div>
          <div className='profile_field'>
            <label htmlFor='' className='labeltxt'>
              Instagram
            </label>
            <div className='from_fieldbox'>
              <input type='text' placeholder='Enter Instagram Link' name='instagram_link' value={ListingDetail.instagram_link} onChange={handleOnChange} className='proinputfield' />
            </div>
          </div>
          <div className='profile_field'>
            <label htmlFor='' className='labeltxt'>
              Twitter/X
            </label>
            <div className='from_fieldbox'>
              <input type='text' placeholder='Enter Twitter/X Link' name='twitter_link' value={ListingDetail.twitter_link} onChange={handleOnChange} className='proinputfield' />
            </div>
          </div>
          <div className='profile_field'>
            <label htmlFor='' className='labeltxt'>
              Youtube
            </label>
            <div className='from_fieldbox'>
              <input type='text' placeholder='Enter Youtube Link' name='youtube_link' value={ListingDetail.youtube_link} onChange={handleOnChange} className='proinputfield' />
            </div>
          </div>
          <div className='profile_field'>
            <label htmlFor='' className='labeltxt'>
              Wikipedia
            </label>
            <div className='from_fieldbox'>
              <input type='text' placeholder='Enter Wikipedia Link' name='wikipedia_link' value={ListingDetail.wikipedia_link} onChange={handleOnChange} className='proinputfield' />
            </div>
          </div>
          {(ListingType === 'theatres' || ListingType === 'exhibitors') && (
            <div className='profile_field'>
              <label htmlFor='' className='labeltxt'>
                Number of Screens
              </label>
              <div className='from_fieldbox'>
                <input type='text' placeholder='Enter Number of Screens' name='no_screens' value={ListingDetail.no_screens} onChange={handleOnChange} className='proinputfield' />
              </div>
            </div>
          )}
          {ListingType === 'theatres' && (
            <>
              <div className='profile_field'>
                <label htmlFor='' className='labeltxt'>
                  Number of Seats/Cars
                </label>
                <div className='from_fieldbox'>
                  <input type='text' placeholder='Enter Number of Seats/Cars' name='seats' value={ListingDetail.seats} onChange={handleOnChange} className='proinputfield' />
                </div>
              </div>

              <div className='profile_field'>
                <input type='checkbox' name='Display Drive In Icon' id='ShowDriveinIcon' onChange={setDriveInIcon} checked={ListingDetail.display_drive_in_icon} />
                <label htmlFor='ShowDriveinIcon'>Drive-In?</label>
              </div>
            </>
          )}
          {ListingType === 'exhibitors' && (
            <div className='profile_field'>
              <label htmlFor='' className='labeltxt'>
                Number of Locations
              </label>
              <div className='from_fieldbox'>
                <input type='text' placeholder='Enter Number of Locations' name='no_locations' value={ListingDetail.no_locations} onChange={handleOnChange} className='proinputfield' />
              </div>
            </div>
          )}
          <div className='profile_field fullgrid'>
            <label htmlFor='' className='labeltxt'>
              Description
            </label>
            <div className='from_fieldbox'>
              <textarea name='content' id='' cols='30' rows='5' value={ListingDetail.content} onChange={handleOnChange} className='proinputfield' placeholder='Enter Description'></textarea>
            </div>
          </div>

          {ListingType === 'studios-distributors' && data.distribution_type_list && (
            <div className='profile_field fullgrid'>
              <label htmlFor='' className='labeltxt'>
                Distribution Type
              </label>
              <div className='from_fieldbox checkoptions'>
                <ul>
                  {data.distribution_type_list.map((item, index) => {
                    return (
                      <li key={index}>
                        <input type='checkbox' name={item} id={item} onChange={setDistributionTypes} checked={data.distribution_type && data.distribution_type.indexOf(item) > -1 ? true : false} />
                        <label htmlFor={item}>{item}</label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

          {ListingType === 'film-festival' && (
            <>
              {data.film_festival_type_list && (
                <div className='profile_field fullgrid'>
                  <label htmlFor='' className='labeltxt'>
                    Festival Type
                  </label>
                  <div className='from_fieldbox checkoptions'>
                    <ul>
                      {data.film_festival_type_list.map((item, index) => {
                        return (
                          <li key={index}>
                            <input type='checkbox' name={item} id={item} onChange={setFestivalTypes} checked={data.film_festival_type && data.film_festival_type.indexOf(item) > -1 ? true : false} />
                            <label htmlFor={item}>{item}</label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
              {data.genre_list && (
                <div className='profile_field fullgrid'>
                  <label htmlFor='' className='labeltxt'>
                    Genres
                  </label>
                  <div className='from_fieldbox checkoptions'>
                    <ul>
                      {data.genre_list.map((item, index) => {
                        return (
                          <li key={index}>
                            <input type='checkbox' name={item} id={item} onChange={setGenres} checked={data.genre && data.genre.indexOf(item) > -1 ? true : false} />
                            <label htmlFor={item}>{item}</label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
              {/* <div className='profile_field'>
                <label htmlFor='' className='labeltxt'>
                  Previous Festival Start Date
                </label>
                <div className='from_fieldbox'>
                  <DatePicker dateFormat='MMMM d, yyyy' showIcon icon='far fa-calendar-alt' selected={ListingDetail.startprevDate} onChange={(date) => handleDatechange(date, 'upcoming_dates.startprevDate')} />
                </div>
              </div>
              <div className='profile_field'>
                <label htmlFor='' className='labeltxt'>
                  Previous Festival End Date
                </label>
                <div className='from_fieldbox'>
                  <DatePicker dateFormat='MMMM d, yyyy' showIcon icon='far fa-calendar-alt' selected={ListingDetail.endprevDate} onChange={(date) => handleDatechange(date, 'upcoming_dates.endprevDate')} />
                </div>
              </div> */}
              <div className='profile_field'>
                <label htmlFor='' className='labeltxt'>
                  Upcoming Festival Start Date
                </label>
                <div className='from_fieldbox'>
                  <DatePicker dateFormat='MMMM d, yyyy' showIcon icon='far fa-calendar-alt' selectsStart startDate={ListingDetail.upcoming_start} endDate={ListingDetail.upcoming_end} maxDate={ListingDetail.upcoming_end} selected={ListingDetail.upcoming_start} onChange={(date) => handleDatechange(date, 'upcoming_start')} />
                </div>
              </div>
              <div className='profile_field'>
                <label htmlFor='' className='labeltxt'>
                  Upcoming Festival End Date
                </label>
                <div className='from_fieldbox'>
                  <DatePicker dateFormat='MMMM d, yyyy' showIcon icon='far fa-calendar-alt' selectsEnd startDate={ListingDetail.upcoming_start} endDate={ListingDetail.upcoming_end} minDate={ListingDetail.upcoming_start} selected={ListingDetail.upcoming_end} onChange={(date) => handleDatechange(date, 'upcoming_end')} />
                </div>
              </div>
              {/* <div className='profile_field'>
                <label htmlFor='' className='labeltxt'>
                  Is Virtual?
                </label>
                <div className='from_fieldbox checkoptions'>
                  <ul>
                    <li>
                      <input type='checkbox' name={'Yes'} id={'Yes'} />
                      <label htmlFor={'Yes'}>Yes</label>
                    </li>
                    <li>
                      <input type='checkbox' name={'No'} id={'No'} />
                      <label htmlFor={'No'}>No</label>
                    </li>
                  </ul>
                </div>
              </div> */}
            </>
          )}

          {data.amenities_list && (
            <>
              <div className='profile_field fullgrid toplinesec'>
                <h3>Amenities</h3>
                {data.amenities_list.map((item, i) => (
                  <div className={'profile_aminity ' + (i == 6 ? 'fullbox' : '')} key={i}>
                    <label htmlFor='' className='labeltxt'>
                      {item.title}
                    </label>
                    <div className='from_fieldbox checkoptions'>
                      <ul>
                        {item.data.map((aminity, index) => {
                          return (
                            <li key={index}>
                              <input type='checkbox' name={aminity.name} id={aminity.name} onChange={setAmenities} checked={data.amenities && data.amenities.indexOf(aminity.name) > -1 ? true : false} />
                              <label htmlFor={aminity.name}>{aminity.value}</label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className='from_fieldbox checkoptions'>
                <ul>
                  {data.amenities_list.map((item, index) => {
                    return (
                      <li key={index}>
                        <input type='checkbox' name={item} id={item} onChange={setAmenities} checked={data.amenities && data.amenities.indexOf(item) > -1 ? true : false} />
                        <label htmlFor={item}>{item}</label>
                      </li>
                    );
                  })}
                </ul>
              </div> */}
            </>
          )}
          {data.associated_list && (
            <div className='profile_field fullgrid'>
              <h3> Associations </h3>
              <div className='from_fieldbox checkoptions associeate'>
                <ul>
                  {data.associated_list.map((item, index) => {
                    return (
                      <li key={index}>
                        <input type='checkbox' name={item} id={item} onChange={setAssociat} checked={data.associated && data.associated.indexOf(item) > -1 ? true : false} />
                        <label htmlFor={item}>{item}</label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
          {ListingType === 'exhibitors' && (
            <div className='profile_field fullgrid'>
              <h3> Operating Locations </h3>

              <h6>
                <strong> U.S. States</strong>
              </h6>
              <ul className='list_azfilter df fww'>
                {StateOptions.map((item, index) => {
                  if (index < 51) {
                    return (
                      <li key={index} className={ListingDetail.states_active.indexOf(item.value) > -1 ? 'active' : ''} onClick={setOperatingLoc}>
                        <span>{item.value}</span>
                      </li>
                    );
                  }
                })}
              </ul>

              <h6>
                <strong> Canadian Provinces</strong>
              </h6>
              <ul className='list_azfilter df fww'>
                {StateOptions.map((item, index) => {
                  if (index >= 51) {
                    return (
                      <li key={index} class={ListingDetail.states_active.indexOf(item.value) > -1 ? 'active' : ''} onClick={setOperatingLoc}>
                        <span>{item.value}</span>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          )}
          <div className='keycontactfeed fullgrid'>
            <h2 className='h3 m-0'>
              Key Contacts <small>Up to 4 Contacts</small>
            </h2>
            <ul className='cntinfo df fww'>
              {ListingDetail.key_contacts &&
                ListingDetail.key_contacts.map((item, index) => {
                  return (
                    <li key={index}>
                      <i className='fal fa-user'></i>
                      <p>{item.name}</p>
                      <p>{item.contact_title}</p>
                      <p>{item.contact_no}</p>
                      <p>{item.contact_email}</p>
                      <p onClick={deleteKeyContact} className='redtxt pointer'>
                        Remove <i className='fas fa-trash'></i>
                      </p>
                    </li>
                  );
                })}
            </ul>

            {
              <div className='profileinfobox grid mb-0'>
                <div className='profile_field'>
                  <label htmlFor='' className='labeltxt'>
                    Contact Name
                  </label>
                  <div className='from_fieldbox'>
                    <input type='text' name='name' placeholder='Enter Name' className='proinputfield' />
                  </div>
                </div>
                <div className='profile_field'>
                  <label htmlFor='' className='labeltxt'>
                    Position
                  </label>
                  <div className='from_fieldbox'>
                    <input type='text' name='contact_title' placeholder='Enter Position' className='proinputfield' />
                  </div>
                </div>
                <div className='profile_field'>
                  <p className='labeltxt'>Phone</p>
                  <div className='pvr'>
                    <input type='text' className='proinputfield' name='contact_no' placeholder='e.g. (800) 555-1212' />
                  </div>
                </div>
                <div className='profile_field'>
                  <label htmlFor='' className='labeltxt'>
                    Email
                  </label>
                  <div className='from_fieldbox'>
                    <input type='text' name='contact_email' placeholder='Enter Email' className='proinputfield' />
                  </div>
                </div>
                <div className='profile_field fullgrid'>
                  <input type='submit' className='submitbtn ghostbtn goldbtn uppercase' onClick={addKeyContact} value='add key contact' />
                </div>
              </div>
            }
          </div>
          <div className='profile_field fullgrid text-center'>
            <input type='submit' className='submitbtn btn' value='Save' onClick={pSaveListingData} />
          </div>
          {blnShowLoader && (
            <div className='managloading pvr container fullgrid w100' style={{ marginBottom: 40 }}>
              <div className='lodarhight'>
                <Loader />
              </div>
            </div>
          )}
          <div className='text-center fullgrid'>{resMessage !== '' && <div className={error ? 'errormsg' : 'successmsg'}> {resMessage}</div>}</div>
        </form>
      </div>
    </section>
  );
};

export default ListingDetailComponent;
