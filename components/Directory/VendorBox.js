// import '../../Header/magnific-popup.min.css';
import { useEffect } from 'react';
import axios from 'axios';

// const $ = require('jquery');

function VendorBox({ data, key_data, tag_data }) {
  useEffect(() => {
    const $ = window.jQuery;
    $('.termtxt').magnificPopup({
      type: 'inline',
      preloader: false,
      focus: '#name',
      callbacks: {
        beforeOpen: function () {
          if ($(window).width() < 700) {
            this.st.focus = false;
          } else {
            this.st.focus = '#name';
          }
        },
        open: function () {},
        close: function () {},
      },
    });

    $(document).on('click', '.sd_popup_from .submitbtn input', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      let popup_data = $(this).data('ids');

      $('#' + popup_data)
        .find('.wpcf7-error_message')
        .html('');
      $('#' + popup_data)
        .find('.fp_sendmsgform .thankyoutxt')
        .hide();
      $('#' + popup_data)
        .find('.wpcf7-spinner')
        .css('visibility', 'visible');
      var form_data = new FormData();
      form_data.append(
        'message-name',
        $('#' + popup_data)
          .find('input[name="message-name"]')
          .val()
      );
      form_data.append(
        'message-email',
        $('#' + popup_data)
          .find('input[name="message-email"]')
          .val()
      );
      form_data.append(
        'message-Organization',
        $('#' + popup_data)
          .find('input[name="message-Organization"]')
          .val()
      );
      form_data.append(
        'message-phone',
        $('#' + popup_data)
          .find('input[name="message-phone"]')
          .val()
      );
      form_data.append(
        'message-title',
        $('#' + popup_data)
          .find('input[name="message-title"]')
          .val()
      );
      form_data.append(
        'message-message',
        $('#' + popup_data)
          .find('[name="message-message"]')
          .val()
      );

      form_data.append(
        'page-url',
        $('#' + popup_data)
          .find('input[name="page-url"]')
          .val()
      );
      form_data.append(
        'page-title',
        $('#' + popup_data)
          .find('input[name="page-title"]')
          .val()
      );
      form_data.append(
        'email-id',
        $('#' + popup_data)
          .find('input[name="email-id"]')
          .val()
      );
      form_data.append(
        'email-distributor',
        $('#' + popup_data)
          .find('input[name="email-distributor"]')
          .val()
      );
      form_data.append(
        'email-vender',
        $('#' + popup_data)
          .find('input[name="email-vender"]')
          .val()
      );
      form_data.append(
        'send_message_org',
        $('#' + popup_data)
          .find('input[name="send_message_org"]')
          .val()
      );
      form_data.append(
        'page-ids',
        $('#' + popup_data)
          .find('input[name="page-ids"]')
          .val()
      );
      axios
        .post(process.env.NEXT_PUBLIC_MENU_URL + '/wp-json/contact-form-7/v1/contact-forms/1625/feedback', form_data, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          $('#' + popup_data)
            .find('.wpcf7-spinner')
            .css('visibility', 'hidden');
          if (res.data.status === 'mail_sent') {
            $('#' + popup_data)
              .find('.fp_sendmsgform .thankyoutxt')
              .show();

            $('#' + popup_data)
              .find('input[name="message-name"]')
              .val('');
            $('#' + popup_data)
              .find('input[name="message-email"]')
              .val('');
            $('#' + popup_data)
              .find('input[name="message-Organization"]')
              .val('');
            $('#' + popup_data)
              .find('input[name="message-phone"]')
              .val('');
            $('#' + popup_data)
              .find('input[name="message-title"]')
              .val('');
            $('#' + popup_data)
              .find('[name="message-message"]')
              .val('');
          } else {
            $('#' + popup_data)
              .find('.wpcf7-error_message')
              .html('<p class="wpcf7-not-valid-tip error">' + res.data.message + '</p>');
            $('#' + popup_data)
              .find('.fp_sendmsgform .thankyoutxt')
              .hide();
          }
        })
        .catch((err) => console.log(err));
    });
  }, []);
  return (
    <div className="vendorbox df fww just-between">
      <div className="vendfeature">
        <div className="vendbox_media sponcehov">
          <div className="startsponser">
            <div className="starico">
              <i className="fas fa-star"></i>
            </div>
            Featured
          </div>
          <div className="vendbox_mediaslide">
            <div className="vendbox_mediasliditem">
              <figure>
                <a href={data.url}>
                  <img src={data.img} alt="" />
                </a>
              </figure>
            </div>
          </div>
        </div>
      </div>
      <div className="vendbox_info">
        <div className="contactbtnpop">
          <a href={'#vend_Contact_' + data.sd_page_id} className="btn termtxt">
            contact
          </a>{' '}
        </div>
        <div id={'vend_Contact_' + data.sd_page_id} className="white-popup-block vend_Contact  newsuppopbox mfp-hide">
          <div className="formpop_info greyinput_field">
            <div className="fpinfo_head">
              <h4>Send Message To: {data.title}</h4>
            </div>
            <div className="fp_body df fww">
              <div className="fp_sendmsgform">
                <div className="key_info">
                  <ul>
                    <li className="thankyoutxt">
                      <div>
                        <strong>Thank You!</strong>
                      </div>
                      <strong> Your message has been sent to {data.title}</strong>
                    </li>
                  </ul>
                </div>
                <div className="fp_form">
                  <div className="wpcf7" id="">
                    <div className="screen-reader-response">
                      <p role="status" aria-live="polite" aria-atomic="true"></p>
                    </div>
                    <form action="" method="post" className="wpcf7-form init sd_popup_from" data-status="init">
                      <div className="fm_formrow">
                        <div className="fromgroup">
                          <span className="wpcf7-form-control-wrap" data-name="message-name">
                            <input type="text" name="message-name" size="40" className="" placeholder="Name" />
                          </span>
                        </div>
                        <div className="fromgroup">
                          <span className="wpcf7-form-control-wrap" data-name="message-email">
                            <input type="email" name="message-email" size="40" className="" placeholder="Email" />
                          </span>
                        </div>
                        <div className="fromgroup state_selectbox">
                          <span className="wpcf7-form-control-wrap" data-name="text-state">
                            <select name="text-state" className="wpcf7-form-control wpcf7-select">
                              {tag_data === 'vendors' && (
                                <optgroup label="Vendor">
                                  <option value="Product Service Information">Product Service Information</option>
                                  <option value="Trade Show">Trade Show</option>
                                  <option value="Employment">Employment</option>
                                </optgroup>
                              )}
                              {tag_data === 'filmfestival' && (
                                <optgroup label="Film Festival">
                                  <option value="Film Submission">Film Submission</option>
                                  <option value="Dates">Dates</option>
                                  <option value="Policies">Policies</option>
                                  <option value="Employment">Employment</option>
                                  <option value="Other Business">Other Business</option>
                                </optgroup>
                              )}
                            </select>
                          </span>
                        </div>
                      </div>
                      <div className="fm_formrow last">
                        <div className="fromgroup">
                          <span className="wpcf7-form-control-wrap" data-name="message-phone">
                            <input type="text" name="message-phone" size="40" className="wpcf7-form-control wpcf7-text" placeholder="Phone" />
                          </span>
                        </div>
                        <div className="fromgroup">
                          <span className="wpcf7-form-control-wrap" data-name="message-title">
                            <input type="text" name="message-title" size="40" className="wpcf7-form-control wpcf7-text" placeholder="Title" />
                          </span>
                        </div>
                        <div className="fromgroup">
                          <span className="wpcf7-form-control-wrap" data-name="message-Organization">
                            <input type="text" name="message-Organization" size="40" className="wpcf7-form-control wpcf7-text" placeholder="Company or Organization" />
                          </span>
                        </div>
                      </div>
                      <div className="fm_formrow full">
                        <div className="fromgroup">
                          <span className="wpcf7-form-control-wrap" data-name="message-message">
                            <textarea
                              name="message-message"
                              cols="40"
                              rows="10"
                              className="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required"
                              placeholder="Message, Questions or Comments"
                            ></textarea>
                          </span>
                        </div>
                        <div className="submitbtn text-center">
                          <input data-ids={'vend_Contact_' + data.sd_page_id} type="button" value="send message" className="wpcf7-form-control wpcf7-submit popup_submit" />
                          <span className="wpcf7-spinner"></span>
                        </div>
                      </div>

                      <input type="hidden" name="page-url" value={process.env.NEXT_PUBLIC_MENU_URL1 + data.url} />
                      <input type="hidden" name="page-title" value={data.title} />                      
                      <input type="hidden" name="email-distributor" value={data.email_distributor} />
                      
                      <input type="hidden" name="send_message_org" value={data.send_send_message_org} />
                      

                      <div className="wpcf7-error_message"></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h4>
          <a href={data.url}>{data.title}</a>
        </h4>
        <p>
          <strong>{data.category}</strong>
        </p>
        <p>{data.content}</p>
      </div>
    </div>
  );
}

export default VendorBox;
