import axios from 'axios';
import { useState, useEffect } from 'react';

const $ = require('jquery');

function FooterSubscriber() {
  const [newsLetterEmail, setNewsLetterEmail] = useState('');
  const [EmailFormClass, setEmailFormClass] = useState('wpcf7-form ftrmail_subscribe df');
  useEffect(() => {
    $(document).on('click', '#newsltr_form .btn', function (e) {
      e.preventDefault();
      $('.news_from_message').html('');
      $('#newsltr_form .wpcf7-spinner').css('visibility', 'visible');
      var form_data = new FormData();
      const email_value =document.getElementById("footer_user_email").value;

      form_data.append('your-email',email_value);
      axios
        .post(process.env.NEXT_PUBLIC_MENU_URL + '/wp-json/contact-form-7/v1/contact-forms/946/feedback', form_data, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          $('#newsltr_form .wpcf7-spinner').css('visibility', 'hidden');
          if (res.data.status === 'mail_sent') {
            setEmailFormClass('wpcf7-form ftrmail_subscribe df sent');

            $('.news_from_message').html('<p class="sucess">' + res.data.message + '</p>');
            $('#newsltr_form input[name="your-email"]').val();
          } else {
            setEmailFormClass('wpcf7-form ftrmail_subscribe df invalid');
            $('.news_from_message').html('<span class="wpcf7-not-valid-tip error">' + res.data.message + '</span>');
          }
          setNewsLetterEmail(' ');
        })
        .catch((err) => console.log(err));
    });
  }, []);

  return (
    <div role="form" className="wpcf7" lang="en-US" dir="ltr">
      <div className="wpcf7-error_message news_from_message"></div>
      <form method="post" className={EmailFormClass} noValidate="novalidate" data-status="init" id="newsltr_form">
        <div className="ftrmail_subscribe df">
          <span className="wpcf7-form-control-wrap" data-name="your-email">
            <input type="email" id="footer_user_email" name="your-email" value={newsLetterEmail} size="40" className="wpcf7-form-control" placeholder="Enter your email" onChange={(e) =>setNewsLetterEmail(e.target.value)} />
          </span>
          <button className="btn" type="button" title="Sign up to receive the Screendollars Newsletter" >
            Sign Me Up
          </button>
          <span className="wpcf7-spinner"></span>
        </div>
      </form>
    </div>
  );
}

export default FooterSubscriber;
