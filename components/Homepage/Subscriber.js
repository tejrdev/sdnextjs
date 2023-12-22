import axios from 'axios';
import { useState, useEffect } from 'react';
import dataJSON from '../../components/data.json';
import $ from 'jquery';

function Subscriber({ title, content }) {
  useEffect(() => {
    $(document).on('click', '#wpcf7_f946_o2_home .btn', function (e) {
      e.preventDefault();
      $('#wpcf7_f946_o2_home .news_from_message').html('');
      $('#wpcf7_f946_o2_home .wpcf7-spinner').css('visibility', 'visible');
      var form_data = new FormData();
      // alert( $('#wpcf7_f946_o2_home input[name="your-email"]').val()+'--values');return false;
      form_data.append('your-email', $('#wpcf7_f946_o2_home input[name="your-email"]').val());
      // form_data.append('your-email', $('#otehrsub')[0].checked);
      axios
        .post(process.env.NEXT_PUBLIC_MENU_URL + '/wp-json/contact-form-7/v1/contact-forms/946/feedback', form_data, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          $('#wpcf7_f946_o2_home .wpcf7-spinner').css('visibility', 'hidden');
          if (res.data.status === 'mail_sent') {
            setEmailFormClass('wpcf7-form ftrmail_subscribe df sent');

            $('#wpcf7_f946_o2_home .news_from_message').html('<p class="sucess">' + res.data.message + '</p>');
            $('#wpcf7_f946_o2_home input[name="your-email"]').val();
            $('#otehrsub')[0].checked = false;
          } else {
            setEmailFormClass('wpcf7-form ftrmail_subscribe df invalid');
            $('#wpcf7_f946_o2_home .news_from_message').html('<span class="wpcf7-not-valid-tip error">' + res.data.message + '</span>');
          }
        })
        .catch((err) => console.log(err));
    });
  }, []);

  const onNewsLetterEmailChange = (e) => {
    setNewsLetterEmail(e.target.value);
  };
  const [NewsLetterEmail, setNewsLetterEmail] = useState('');
  const [EmailFormClass, setEmailFormClass] = useState('wpcf7-form ftrmail_subscribe df mailchimp-ext-0.5.62 init');
  return (
    <div className='container'>
      <div className='seclinespace'>
        <div className=' hmsubscribe_in df fww'>
          <div className='hmsubscribe_txt'>
            <h3>
              {title ? title : dataJSON.home_newsletter.title} <i className='far fa-angle-right'></i>
            </h3>
            {content ? <strong dangerouslySetInnerHTML={{ __html: content }}></strong> : <p dangerouslySetInnerHTML={{ __html: dataJSON.home_newsletter.content }}></p>}
          </div>
          <div className={'hm_subscribeinput m-0'}>
            <div className='wpcf7' id='wpcf7_f946_o2_home'>
              <div className='wpcf7-error_message news_from_message'></div>
              <form className={EmailFormClass} noValidate='novalidate' data-status='init'>
                <div className='ftrmail_subscribebox df'>
                  <span className='wpcf7-form-control-wrap' data-name='your-email'>
                    <input type='email' name='your-email' value={NewsLetterEmail} size='40' className='wpcf7-form-control wpcf7-text' placeholder='Enter your email' onChange={(e) => onNewsLetterEmailChange(e)} />
                  </span>
                  <input type='hidden' name='form-type' id='form-type' value='newsltr_form' />
                  <button className='btn' type='button' title='Sign up to receive the Screendollars Newsletter'>
                    Sign Me Up{' '}
                  </button>
                  <span className='wpcf7-spinner'></span>
                </div>
                <div className='othersubscribes'>
                  <input type='checkbox' id='otehrsub' name='otehrsub' />
                  <label htmlFor='otehrsub'>Add Box Office Forecasts (Wednesdays)</label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscriber;
