import axios from 'axios';
import { useState, useEffect } from 'react';

const $ = require('jquery');

const ContactFrom = ({ data }) => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [telephone, setTelephone] = useState('');
  const [website, setWebsite] = useState('');
  const [comments, setComments] = useState('');
  const [EmailFormClass, setEmailFormClass] = useState('wpcf7-form');

  useEffect(() => {
    $(document).on('click', '#sc-advs-form .submitbtn .wpcf7-submit', function (e) {
      // alert(1)  ;
      $('.wpcf7-error_message').html('');
      //$('.sd_contact_message').hide();
      $('.wpcf7-spinner').css('visibility', 'visible');
      var form_data = new FormData();
      form_data.append('key-name', $('[name="key-name"]').val());
      form_data.append('key-lastname', $('[name="key-lastname"]').val());
      form_data.append('key-email', $('[name="key-email"]').val());
      form_data.append('key-Organization', $('[name="key-Organization"]').val());
      form_data.append('key-Telephone', $('[name="key-Telephone"]').val());
      form_data.append('key-Website', $('[name="key-Website"]').val());
      form_data.append('textarea-892', $('[name="textarea-892"]').val());

      axios
        .post(process.env.NEXT_PUBLIC_MENU_URL + 'wp-json/contact-form-7/v1/contact-forms/65283/feedback', form_data, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => {
          $('.wpcf7-spinner').css('visibility', 'hidden');
          if (res.data.status === 'mail_sent') {
            setEmailFormClass('wpcf7-form sent');

            $('[name="key-name"]').val('');
            $('[name="key-lastname"]').val('');
            $('[name="key-email"]').val('');
            $('[name="key-Organization"]').val('');
            $('[name="key-Telephone"]').val('');
            $('[name="key-Website"]').val('');
            $('[name="textarea-892"]').val('');

            $('.wpcf7-error_message').html('<p class="wpcf7-not-valid-tip sucess">' + res.data.message + '</p>');
            //$('.sd_contact_message').removeClass('hide');
            //$('.sd_contact_message').show('hide');
          } else {
            setEmailFormClass('wpcf7-form invalid');
            $('.wpcf7-error_message').html('<p class="wpcf7-not-valid-tip error">' + res.data.message + '</p>');
            //$('.sd_contact_message').removeClass('hide');
            //$('.sd_contact_message').hide();
          }
        })
        .catch((err) => console.log(err));
    });
  }, []);

  return (
    <section className="addus_contact secspace">
      <div className="container">
        <div className="addcontbox df fww">
          {data.title.length ? (
            <div className="top_txt">
              <h3> {data.title} </h3>
            </div>
          ) : (
            ''
          )}
          <div className="addcnt">
            <form className={EmailFormClass} id="sc-advs-form">
              <div className="fromgroup">
                <span className="wpcf7-form-control-wrap">
                  <input type="text" name="key-name" value={name} size="40" className="wpcf7-form-control wpcf7-text" placeholder="First Name*" onChange={(e) => setName(e.target.value)} />
                  <span className="wpcf7-not-valid-tip"></span>
                </span>
              </div>
              <div className="fromgroup">
                <span className="wpcf7-form-control-wrap">
                  <input type="text" name="key-lastname" value={lastname} size="40" className="wpcf7-form-control wpcf7-text" placeholder="Last Name" onChange={(e) => setLastname(e.target.value)} />
                </span>
              </div>
              <div className="fromgroup">
                <span className="wpcf7-form-control-wrap" data-name="key-email">
                  <input type="email" name="key-email" value={email} size="40" className="wpcf7-form-control wpcf7-text wpcf7-email" placeholder="Email*" onChange={(e) => setEmail(e.target.value)} />
                  <span className="wpcf7-not-valid-tip"></span>
                </span>
              </div>
              <div className="fromgroup">
                <span className="wpcf7-form-control-wrap" data-name="key-Organization">
                  <input
                    type="text"
                    name="key-Organization"
                    value={organization}
                    size="40"
                    className="wpcf7-form-control wpcf7-text"
                    placeholder="Organization"
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                </span>
              </div>
              <div className="fromgroup">
                <span className="wpcf7-form-control-wrap">
                  <input
                    type="text"
                    name="key-Telephone"
                    value={telephone}
                    size="40"
                    className="wpcf7-form-control wpcf7-text"
                    placeholder="Telephone"
                    onChange={(e) => setTelephone(e.target.value)}
                  />
                </span>
              </div>
              <div className="fromgroup">
                <span className="wpcf7-form-control-wrap">
                  <input type="text" name="key-Website" value={website} size="40" className="wpcf7-form-control wpcf7-text" placeholder="Website" onChange={(e) => setWebsite(e.target.value)} />
                </span>
              </div>
              <div className="fromgroup">
                <span className="wpcf7-form-control-wrap">
                  <textarea
                    name="textarea-892"
                    cols="40"
                    value={comments}
                    rows="10"
                    className="wpcf7-form-control wpcf7-textarea"
                    placeholder="Question or Comment"
                    onChange={(e) => setComments(e.target.value)}
                  ></textarea>
                </span>
              </div>
              <div className="submitbtn">
                <input type="button" value="Submit" className="wpcf7-form-control has-spinner wpcf7-submit" />
                <span className="wpcf7-spinner"></span>
              </div>
              <div className="wpcf7-error_message"></div>
            </form>
          </div>

          <div className="abtmovie_mediabox">
            <div className="abtinfo_slider-img">
              <div className="abtinfo_sliditem">
                {data.contact_content_img.length ? (
                  <div className="abt_infoslidimg">
                    <img src={data.contact_content_img} alt="contact img" />
                  </div>
                ) : (
                  ''
                )}{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFrom;
