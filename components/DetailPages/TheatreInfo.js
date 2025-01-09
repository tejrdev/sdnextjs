// import '../../Header/magnific-popup.min.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import SocialLinks from './SocialLinks';
import KeyContacts from './KeyContacts';
import AddToAny from '../../components/AddToAny';
import Countday from '../../components/countdownday/countdown';
import AdminEditLink from './AdminEditLink';

import ICA from '@/public/images/ica.png';
import NATO from '@/public/images/natotheater.png';
import UDITOA from '@/public/images/sditoa.png';
import AHC from '@/public/images/AHC-logo_bw_HI-3.png';
import MTA from '@/public/images/mtacLogo.png';
//import Heroimg from '@/public/images/detailherobg.jpg';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const ERRORLOGIN = 'Please Login First! ';
if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
}

const TheatreInfo = ({ data, requestfrom, favoriteList }) => {
  const API_URL = process.env.NEXT_PUBLIC_SD_API;
  var ID = data.id;
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [organization, setOrganization] = useState('');
  const [telephone, setTelephone] = useState('');
  const [website, setWebsite] = useState('');
  const [comments, setComments] = useState('');
  const [EmailFormClass, setEmailFormClass] = useState('wpcf7-form');
  const [domLoaded, setDomLoaded] = useState(false);
  const [items, setItems] = useState([]);
  let theatermap = data.directions.replace(/#/g, '%20');
  //console.log(data)

  let address = data.address;
  address = address;

  const SliderSetting = {
    slidesToShow: 1,
    speed: 300,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerPadding: '0',
    focusOnSelect: true,
    arrows: false,
    dots: false,
  };

  useEffect(() => {
    if (favoriteList == 1) {
      setItems([ID]);
    }
  }, [favoriteList]);
  //console.log(data,'---thhheatre data');

  useEffect(() => {
    const $ = window.jQuery;

    setDomLoaded(true);
    $(document).on('click', 'li.sharing span', function () {
      $(this).parent().find('.addtoany_shortcode').toggleClass('open');
    });
    $('.formpop').magnificPopup({
      type: 'inline',
      preloader: false,
      focus: '#name',
      closeOnContentClick: false,
      // When elemened is focused, some mobile browsers in some cases zoom in
      // It looks not nice, so we disable it:
      callbacks: {
        beforeOpen: function () {
          if ($(window).width() < 700) {
            this.st.focus = false;
          } else {
            this.st.focus = '#name';
          }
        },
        open: function () {
          $('.back_page').click(function (e) {
            e.preventDefault();
            $(this).parents('.formpopbox').find('.mfp-close').trigger('click');
          });

          // hide_the_contact_filed();
        },
        close: function () {
          if (window.innerWidth < 640) {
            $('.keyfom_btn').next().slideUp();
            $('.keyfom_btn').removeClass('open');
          }
        },
      },
    });

    $('.image-link').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeMarkup: '<button title="closing" type="button" class="mfp-close">×</button>',
      mainClass: 'mfp-no-margins mfp-with-zoom theaterimg',
      image: {
        verticalFit: true,
      },
      zoom: {
        enabled: true,
        duration: 300,
      },
    });

    $('.readmore_btn').click(function () {
      $(this).closest('.theater_infodisc').toggleClass('open');
      $(this).hide();
    });
    if ($('.theater_infodiscin').height() < 236) {
      $('.theater_infodiscin').next('.readmore_btn').hide();
    } else {
      $('.theater_infodiscin').next('.readmore_btn').show('inline-block');
      $('.theater_infodiscin').css('height', '232px');
    }

    $(document).on('click', '.submitbtn input', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      $('.wpcf7-error_message').html('');
      $('.fp_sendmsgform .thankyoutxt').hide();
      $('.wpcf7-spinner').css('visibility', 'visible');
      var form_data = new FormData();
      form_data.append('message-name', $('input[name="message-name"]').val());
      // form_data.append('text-state', $('input[name="message-name"]').val());
      form_data.append('message-email', $('input[name="message-email"]').val());
      form_data.append('message-Organization', $('input[name="message-Organization"]').val());
      form_data.append('message-phone', $('input[name="message-phone"]').val());
      form_data.append('message-title', $('input[name="message-title"]').val());
      form_data.append('message-subject', $('input[name="message-subject"]').val());
      form_data.append('message-message', $('[name="message-message"]').val());

      form_data.append('page-url', $('input[name="page-url"]').val());
      form_data.append('page-title', $('input[name="page-title"]').val());
      //form_data.append('email-id', $('input[name="email-id"]').val());
      form_data.append('email-distributor', $('input[name="email-distributor"]').val());
      //form_data.append('email-vender', $('input[name="email-vender"]').val());
      form_data.append('send_message_org', $('input[name="send_message_org"]').val());
      //form_data.append('page-ids', $('input[name="page-ids"]').val());
      axios
        .post(process.env.NEXT_PUBLIC_MENU_URL + '/wp-json/contact-form-7/v1/contact-forms/1625/feedback', form_data, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          $('.wpcf7-spinner').css('visibility', 'hidden');
          if (res.data.status === 'mail_sent') {
            setEmailFormClass('wpcf7-form sent');
            $('.fp_sendmsgform .thankyoutxt').show();

            $('input[name="message-name"]').val('');
            $('input[name="message-email"]').val('');
            $('input[name="message-Organization"]').val('');
            $('input[name="message-phone"]').val('');
            $('input[name="message-title"]').val('');
            $('[name="message-message"]').val('');
            $('input[name="message-subject"]').val('');
          } else {
            setEmailFormClass('wpcf7-form invalid');
            $('.wpcf7-error_message').html('<p class="wpcf7-not-valid-tip error">' + res.data.message + '</p>');
            $('.fp_sendmsgform .thankyoutxt').hide();
          }
        })
        .catch((err) => console.log(err));
    });
  }, []);

  const favoriteHeart = (favoriteId, favoriteType) => {
    const addFavoriteAll = async () => {
      if (LOGGED_EMAIL === null || LOGGED_EMAIL === '') {
        alert(ERRORLOGIN);
        return false;
      }
      var favmobvie_addurl = API_URL + '/login/favorite_all.php';
      // setLoadingFav(LOADER);
      await axios
        .get(favmobvie_addurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            favoriteType: window.btoa(favoriteType),
            favoriteId: window.btoa(favoriteId),
          },
        })
        .then((res) => {
          // console.log(res.data);
          setItems(res.data);
        });
    };
    addFavoriteAll();
  };
  const imgurl = data.img ? data.img : data.logo;
  const associated_with = {
    'National Association of Theatre Owners (NATO)': NATO,
    'United Drive-In Theatre Owners Association (UDITOA)': UDITOA,
    'Independent Cinema Alliance (ICA)': ICA,
    'Art House Convergence (AHC)': AHC,
    'Movie Theatre Association Of Canada (MTA)': MTA,
  };

  let phoneNumbers = data.phone_no;
  let splitNumbers = phoneNumbers?.split(/\s*,\s*/);

  let vancat = data.category;
  let splitvancat = vancat?.split(/\s*,\s*/);

  return (
    <section className={'theater_infobox printarea ' + (data.hero_img ? 'pt-2' : ' pt-9 lg:pt-10')}>
      {data.hero_img && (
        <div className='detailherobg relative z-0 mb-1'>
          <img src={data.hero_img} alt='Hero Image' className='objimg' />
        </div>
      )}
      <div className='container'>
        <div className='theaterinfo_box df fww just-between relative z-0'>
          <div className='print_top hide printdochide'>
            <div className='top_info'>
              <h2 className='h5'>{data.top_title ? data.top_title : data.page_title}</h2>
            </div>
          </div>

          <AdminEditLink data={data} />
          <div className='theater_socialmedia sm:-order-none pr-0 w-full max-w-64 sm:w-48 lg:w-[250px] sm:pr-5 lg:pr-14'>
            <div className='theater_socialsticky'>
              <div className='theaterinfo_media p-1 border border-gray-400 rounded-md '>
                <figure className='brandimg pvr w-full min-h-32 flex items-center justify-center'>
                  {imgurl && imgurl.substring(imgurl.lastIndexOf('/') + 1) === 'noimgico.jpg' ? (
                    <img src={imgurl} alt='' className={data.top_title === 'Theatre' ? 'objimg' : ''} />
                  ) : (
                    <a href={imgurl} className='image-link'>
                      <img src={imgurl} alt='' className={data.top_title === 'Theatre' ? 'objimg' : ''} />
                      <div className='figoverlay'>
                        <i className='far fa-search-plus'></i>
                      </div>
                    </a>
                  )}
                </figure>
              </div>
              <div className='border-b border-gray-300'>
                <SocialLinks data={data} />
              </div>

              {requestfrom === 'filmfestival' ? (
                <>
                  {data.up_start_date && (
                    <div className='festivedate border-b border-gray-300 mt-3 text-base'>
                      <div className='text-center'>
                        <strong> Upcoming Dates: </strong>
                        <p className='mb-1 w-32 mx-auto'>
                          {data.up_start_date} {data.up_end_date}
                        </p>
                      </div>
                      {data.festival_count_down < 36 && (
                        <span className='releasedateinfo'>
                          <strong>
                            Begins In <Countday data={data.festival_count_down} />
                          </strong>
                        </span>
                      )}
                      <p className='festivedate mt-3 text-base'>
                        <strong></strong>
                      </p>
                    </div>
                  )}
                </>
              ) : null}

              <div className='theater_econtact pt-2 hidden sm:block'>
                <ul className='list-none m-0 text-center'>
                  {data.website && (
                    <li className='mb-2 inline-block'>
                      <a href={data.website} target='_blank' rel='noreferrer' className='text-black hover:underline'>
                        <i className='far fa-globe mr-2'></i>Official Website
                      </a>
                    </li>
                  )}

                  {/* data.email_id && (
                    <li className='mb-2 inline-block max-w-full'>
                      <a href={'mailto:' + data.email_id} target='_blank' rel='noreferrer' className='text-black hover:underline' title={data.email_id}>
                        <i className='far fa-envelope mr-2'></i>
                        <span className='inline-block truncate align-top' style={{ maxWidth: 'calc(100% - 34px)' }}>
                          {data.email_id}
                        </span>
                      </a>
                    </li>
                  ) */}
                  {data.phone_no && (
                    <li className='mb-2 inline-block'>
                      {splitNumbers?.map((item, i) => (
                        <a href={`tel:` + parseInt(item.replace(/[^0-9]/g, ''))} target='_blank' key={i} rel='noreferrer' className='text-black hover:underline relative pl-6 flex'>
                          <span className='block' title={item}>
                            <i className='far fa-phone-alt mr-2 absolute left-0 top-0'></i>
                            {item}
                          </span>
                        </a>
                      ))}

                      {/* <a href={`tel:` + parseInt(data.phone_no.replace(/[^0-9]/g, ''))} target='_blank' rel='noreferrer' className='text-black hover:underline relative pl-6 flex'>
                        <span className='inline' title={data.phone_no}>
                          {data.phone_no}
                        </span>
                      </a> */}
                    </li>
                  )}

                  <li className='sendmsg_btn printdochide inline-block'>
                    {/* {(data?.top_title === "Distributor" && data?.distribution_type[0] === "INACTIVE" && data?.top_title === "Exhibitor") ? "" :
                      <a href='#send_message' className='formpop text-black hover:underline'>
                        <img src={process.env.NEXT_PUBLIC_MENU_URL + 'wp-content/themes/screendollars-live/assets/images/chat.svg'} alt='' className='img-state inline-block mr-1 max-w-4' /> Send Message inactive
                      </a>}
                    {(data?.top_title !== "Distributor" && data?.top_title !== undefined) &&
                      <a href='#send_message' className={'formpop text-black hover:underline '}>
                        <img src={process.env.NEXT_PUBLIC_MENU_URL + 'wp-content/themes/screendollars-live/assets/images/chat.svg'} alt='' className='img-state inline-block mr-1 max-w-4' /> Send Message dist
                      </a>} */}
                    {(data?.distribution_type !== undefined && data?.distribution_type[0] === "INACTIVE") ? "" :
                      <a href='#send_message' className={'formpop text-black hover:underline '}>
                        <img src={process.env.NEXT_PUBLIC_MENU_URL + 'wp-content/themes/screendollars-live/assets/images/chat.svg'} alt='' className='img-state inline-block mr-1 max-w-4' /> Send Message
                      </a>}
                    <div id='send_message' className='white-popup-block  mfp-hide formpopbox'>
                      <div className='formpop_info'>
                        <div className='fpinfo_head'>
                          <h4>
                            Send Message to <span dangerouslySetInnerHTML={{ __html: data.title }}></span>
                          </h4>
                        </div>
                        <div className='fp_body df fww'>
                          <div className='fp_sendmsgform'>
                            <div className='key_info'>
                              <ul>
                                <li className='thankyoutxt'>
                                  <div>
                                    <strong>Thank You!</strong>
                                  </div>
                                  <strong>Your message has been sent to {data.title}.</strong>
                                </li>
                              </ul>
                            </div>
                            <div className='fp_form'>
                              <div role='form' className='wpcf7' id='wpcf7-f1625-o2' lang='en-US' dir='ltr'>
                                <div className='screen-reader-response'>
                                  <p role='status' aria-live='polite' aria-atomic='true'></p>
                                  <ul></ul>
                                </div>
                                <form className={EmailFormClass}>
                                  <div className='fm_formrow'>
                                    <div className='fromgroup'>
                                      <span className='wpcf7-form-control-wrap' data-name='message-name'>
                                        <input type='text' name='message-name' value={name} size='40' className='wpcf7-form-control wpcf7-text wpcf7-validates-as-required' placeholder='Name' onChange={(e) => console.log(e.target.value)} />
                                      </span>
                                    </div>
                                    <div className='fromgroup'>
                                      <span className='wpcf7-form-control-wrap' data-name='message-email'>
                                        <input type='email' name='message-email' value={email} size='40' className='wpcf7-text wpcf7-email' placeholder='Email' onChange={(e) => console.log(e.target.value)} />
                                      </span>
                                    </div>

                                    <div className='fromgroup state_selectbox'>
                                      <span className='wpcf7-form-control-wrap' data-name='text-state'>
                                        <input type='text' name='message-subject' value={''} size='40' className='wpcf7-text wpcf7-subject' placeholder='Subject' onChange={(e) => setSubject(e.target.value)} />
                                      </span>
                                    </div>
                                  </div>
                                  <div className='fm_formrow last'>
                                    <div className='fromgroup'>
                                      <span className='wpcf7-form-control-wrap' data-name='message-phone'>
                                        <input type='text' name='message-phone' value={telephone} size='40' className='wpcf7-form-control wpcf7-text' aria-invalid='false' placeholder='Phone' onChange={(e) => setTelephone(e.target.value)} />
                                      </span>
                                    </div>
                                    <div className='fromgroup'>
                                      <span className='wpcf7-form-control-wrap' data-name='message-title'>
                                        <input type='text' name='message-title' value={website} size='40' className='wpcf7-form-control wpcf7-text' aria-invalid='false' placeholder='Title' onChange={(e) => setWebsite(e.target.value)} />
                                      </span>
                                    </div>
                                    <div className='fromgroup'>
                                      <span className='wpcf7-form-control-wrap' data-name='message-Organization'>
                                        <input type='text' name='message-Organization' value={organization} size='40' className='wpcf7-form-control wpcf7-text' aria-invalid='false' placeholder='Company or Organization' onChange={(e) => setOrganization(e.target.value)} />
                                      </span>
                                    </div>
                                  </div>
                                  <div className='fm_formrow full'>
                                    <div className='fromgroup'>
                                      <span className='wpcf7-form-control-wrap' data-name='message-message'>
                                        <textarea name='message-message' cols='40' rows='10' className='wpcf7-form-control wpcf7-textarea' placeholder='Message, Questions or Comments' onChange={(e) => setComments(e.target.value)}></textarea>
                                      </span>
                                    </div>
                                    <div className='submitbtn text-center mfp-prevent-close'>
                                      <input type='button' value='send message' className='wpcf7-form-control wpcf7-submit mfp-prevent-close' />
                                      <span className='wpcf7-spinner'></span>
                                    </div>
                                  </div>
                                  <input type='hidden' name='page-url' value={data.page_link} />
                                  <input type='hidden' name='page-title' value={data.title} />
                                  {/* <input type="hidden" name="email-id" value={data.form_emailid} /> */}
                                  <input type='hidden' name='email-distributor' value={data.email_distributor} />
                                  {/* <input type="hidden" name="email-vender" value={data.email_vender} /> */}
                                  <input type='hidden' name='send_message_org' value={data.send_send_message_org} />
                                  {/* <input type="hidden" name="page-ids" value={data.page_ids} /> */}
                                  <div className='wpcf7-error_message'></div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  {data.key_contacts && !!data.key_contacts?.length && (
                    <li className='my-2 pt-2 border-t border-gray-300 inline-block w-full'>
                      <KeyContacts data={data} />
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className='theater_infodetail'>
            {/* <div className='theaterinfo_media p-1 border border-gray-400 rounded-md mb-2 max-w-44 sm:hidden'>
              <figure className='brandimg pvr w-full min-h-32 flex items-center justify-center'>
                {imgurl && imgurl.substring(imgurl.lastIndexOf('/') + 1) === 'noimgico.jpg' ? (
                  <img src={imgurl} alt='' className={data.top_title === 'Theatre' ? 'objimg' : ''} />
                ) : (
                  <a href={imgurl} className='image-link'>
                    <img src={imgurl} alt='' className={data.top_title === 'Theatre' ? 'objimg' : ''} />
                    <div className='figoverlay'>
                      <i className='far fa-search-plus'></i>
                    </div>
                  </a>
                )}
              </figure>
            </div> */}
            <div className='theater_detsiltop df fww just-between'>
              <div className='top_txtboxtheater'>
                <h2 className='h5'>{data.top_title ? data.top_title : data.page_title}</h2>

                <p>
                  {data.exhibitor_parent_url && (
                    <a href={data.exhibitor_parent_url} rel='noreferrer' target='_blank'>
                      {data.exhibitor_parent}
                    </a>
                  )}

                  {data.top_title == 'Theatre' && data.theatre_screens ? data.theatre_screens : null}
                  {data.top_title == 'Theatre' && data.theatre_screens && data.seats ? ', ' : ''}
                  {data.seats ? data.seats : null}

                  {data.no_locations ? data.no_locations : null}
                  {/* {data.no_locations && data.exhibitor_screens ? ', ' : ''} */}
                  {data.exhibitor_screens ? ', ' + data.exhibitor_screens : null}
                  {data.number_of_states ? ', ' + data.number_of_states : null}
                </p>
              </div>
              <div className='theater_pintshare printdochide'>
                <ul className='df fww'>
                  <li className='pritbtn' style={{ display: 'none' }}>
                    Print
                  </li>
                  <li className='sharing'>
                    <span>
                      <i className='far fa-share-alt'></i>Share
                    </span>
                    {domLoaded && <AddToAny />}
                  </li>
                </ul>
              </div>
            </div>
            <div className='theaterbasics df fww'>
              <div className={data.top_title === 'Distributor' ? '' : 'theaterbasics_left'}>
                <h1 className='h2'>
                  {data.sponser_class && <i className='fas fa-badge-check'></i>}
                  <span dangerouslySetInnerHTML={{ __html: data.title }}></span>
                  {data.top_title === 'Distributor' ? (
                    <>
                      <span onClick={() => favoriteHeart(ID, 'fav_dist_listing')} className={items.includes(ID) ? 'favheart  redtxt biofavico' : 'favheart biofavico '}>
                        <i className={items.includes(ID) ? 'fas fa-heart' : 'far fa-heart '}></i>
                      </span>
                    </>
                  ) : (
                    ''
                  )}
                  {data.top_title === 'Theatre' ? (
                    <>
                      <span onClick={() => favoriteHeart(ID, 'fav_theatres')} className={items.includes(ID) ? 'favheart  redtxt biofavico mt-[6px] lg:mt-[2px] mx-3 ' : 'favheart biofavico mt-[6px] lg:mt-[2px] mx-3 '}>
                        <i className={items.includes(ID) ? 'fas fa-heart' : 'far fa-heart '}></i>
                      </span>
                      {/* <span className="drivenicon">
                    Drive IN
                    <span className="line"></span>
                  </span> */}
                      {data.top_title === 'Theatre' && data.detail_drive_in_icon === 'yes' ? (
                        <span>
                          <img className='diveiconlist' src='https://www.live.screendollars.com/wp-content/themes/screendollars-live/assets/images/drive-in-icon.png' alt='Drive In' />
                        </span>
                      ) : null}
                    </>
                  ) : (
                    ''
                  )}
                  {data.top_title === 'Exhibitor' ? (
                    <>
                      <span onClick={() => favoriteHeart(ID, 'fav_exhibitors')} className={items.includes(ID) ? 'favheart  redtxt biofavico' : 'favheart biofavico '}>
                        <i className={items.includes(ID) ? 'fas fa-heart' : 'far fa-heart '}></i>
                      </span>
                    </>
                  ) : (
                    ''
                  )}
                  {requestfrom === 'VendorDetails' ? (
                    <>
                      <span onClick={() => favoriteHeart(ID, 'fav_vendors')} className={'ml-1  ' + (items.includes(ID) ? 'favheart  redtxt biofavico' : 'favheart biofavico ')}>
                        <i className={items.includes(ID) ? 'fas fa-heart' : 'far fa-heart '}></i>
                      </span>
                    </>
                  ) : (
                    ''
                  )}
                  {requestfrom === 'filmfestival' ? (
                    <>
                      <span onClick={() => favoriteHeart(ID, 'fav_filmfestivals')} className={items.includes(ID) ? 'favheart  redtxt biofavico' : 'favheart biofavico '}>
                        <i className={items.includes(ID) ? 'fas fa-heart' : 'far fa-heart '}></i>
                      </span>
                    </>
                  ) : (
                    ''
                  )}
                </h1>

                {data.address && (
                  <div className='address_direction df fww'>
                    <p className='mr-2 mb-2'>
                      <i className='fas fa-map-marker-alt'></i>
                      {address}
                    </p>

                    {data.top_title === 'Distributor' && (
                      <p className='printdochide'>
                        <a href={data.directions} target='_blank' rel='noreferrer'>
                          <i className='fas fa-directions'></i>
                          Get Directions
                        </a>
                      </p>
                    )}
                  </div>
                )}

                <div className='theater_econtact'>
                  <ul className='flex flex-wrap list-none ml-0 mb-2 sm:hidden'>
                    {data.website && (
                      <li className='mb-1 mr-4'>
                        <a href={data.website} target='_blank' rel='noreferrer' className='text-black'>
                          <i className='far fa-globe mr-1'></i>Official Website
                        </a>
                      </li>
                    )}

                    {data.email_id && (
                      <li className='mb-1 mr-4'>
                        <a href={'mailto:' + data.email_id} target='_blank' rel='noreferrer' className='text-black'>
                          <i className='far fa-envelope mr-1'></i>
                          {data.email_id}
                        </a>
                      </li>
                    )}
                    <li className='mb-1 mr-4'>
                      {data.phone_no && (
                        <a href={`tel:` + parseInt(data.phone_no.replace(/-/g, ' '))} target='_blank' rel='noreferrer' className='text-black'>
                          <i className='far fa-phone-alt mr-1'></i>
                          {data.phone_no}
                        </a>
                      )}
                    </li>
                    <li className="sendmsg_btn printdochide mb-1 mr-4">
                      {(data?.distribution_type !== undefined && data?.distribution_type[0] === "INACTIVE") ? "" :
                        <a href='#send_message' className={'formpop text-black hover:underline '}>
                          <img src={process.env.NEXT_PUBLIC_MENU_URL + 'wp-content/themes/screendollars-live/assets/images/chat.svg'} alt='' className='img-state inline-block mr-1 max-w-4' /> Send Message
                        </a>}
                    </li>
                    {data.key_contacts && !!data.key_contacts?.length && (
                      <li className='mb-1 mr-4'>
                        <KeyContacts data={data} />
                      </li>

                    )}
                  </ul>
                </div>

                {data.category && (
                  <div className='detailtaging'>
                    <ul className='df fww tags'>
                      {splitvancat?.map((item, i) => (
                        <li key={i}>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {data.distribution_type && (
                  <div className='detailtaging'>
                    <ul className='df fww tags'>
                      {data.distribution_type?.map((item, i) => (
                        <li key={i}>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {data.genre && !!data.genre?.length && (
                  <div className='detailtaging'>
                    <ul className='df fww tags'>
                      {data.genre.map((item, i) => (
                        <li key={i}>
                          <span>{item.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {data.content && (
                  <div className='theater_infodisc'>
                    <div className='theater_infodiscin' dangerouslySetInnerHTML={{ __html: data.content }}></div>
                    <div className='readmore_btn printdochide'>Read More</div>
                  </div>
                )}
              </div>
              {data.top_title !== 'Distributor' && (
                <div className='theaterbasics_right'>
                  <div className='getonmap'>
                    {/* http://maps.apple.com/?q=5+Mile+Drive-In+Movie+Theater&sll=42.0577278,-86.1158347 */}
                    <a href={data.directions.replace('google', 'apple')} target='_blank'>
                      <iframe width='232' height='253' id='gmap_canvas' src={theatermap + '&t=&z=13&ie=UTF8&iwloc=&output=embed'} frameBorder='0' scrolling='no' marginHeight='0' marginWidth='0'></iframe>
                    </a>
                  </div>
                  {data.associated_with && data.associated_with.length > 0 && data.associated_with[0] !== '' && (
                    <div className='theater_associate text-center w100'>
                      <p>Associated With</p>
                      <Slider {...SliderSetting} className='associatesider'>
                        {data.associated_with.map((item, i) => (
                          <div className='associateitem text-center' key={i}>
                            <Image src={associated_with[item]} alt='' />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheatreInfo;
