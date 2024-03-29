// import '../../Header/magnific-popup.min.css';
import { useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

// const $ = require('jquery');

function VendorBox({ data, key_data, tag_data }) {
  const SliderSetting = {
    slidesToShow: 1,
    speed: 300,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    centerPadding: '0',
    focusOnSelect: true,
    arrows: false,
    dots: true,
  };
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

      $('#' + popup_data).find('.wpcf7-error_message').html(''); 
      $('#' + popup_data).find('.fp_sendmsgform .thankyoutxt').hide(); 
      $('#' + popup_data).find('.wpcf7-spinner').css('visibility', 'visible'); 
      var form_data = new FormData(); 
      form_data.append( 'message-name', $('#' + popup_data).find('input[name="message-name"]').val() ); 
      form_data.append( 'message-email', $('#' + popup_data).find('input[name="message-email"]').val() ); 
      form_data.append( 'message-Organization', $('#' + popup_data).find('input[name="message-Organization"]').val() ); 
      form_data.append( 'message-phone', $('#' + popup_data).find('input[name="message-phone"]').val() ); 
      form_data.append( 'message-title', $('#' + popup_data).find('input[name="message-title"]').val() ); 
      form_data.append( 'message-message', $('#' + popup_data).find('[name="message-message"]').val() ); 
      form_data.append( 'page-url', $('#' + popup_data).find('input[name="page-url"]').val() ); 
      form_data.append( 'page-title', $('#' + popup_data).find('input[name="page-title"]').val() ); 
      form_data.append( 'email-id', $('#' + popup_data).find('input[name="email-id"]').val() ); 
      form_data.append( 'email-distributor', $('#' + popup_data).find('input[name="email-distributor"]').val() ); 
      form_data.append( 'email-vender', $('#' + popup_data).find('input[name="email-vender"]').val() ); 
      form_data.append( 'send_message_org', $('#' + popup_data).find('input[name="send_message_org"]').val() ); 
      form_data.append( 'page-ids', $('#' + popup_data).find('input[name="page-ids"]').val() );
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
            $('#' + popup_data).find('.fp_sendmsgform .thankyoutxt').show();

            $('#' + popup_data).find('input[name="message-name"]').val('');
            $('#' + popup_data).find('input[name="message-email"]').val('');
            $('#' + popup_data).find('input[name="message-Organization"]').val('');
            $('#' + popup_data).find('input[name="message-phone"]').val('');
            $('#' + popup_data).find('input[name="message-title"]').val('');
            $('#' + popup_data).find('[name="message-message"]').val('');
          } else {
            $('#' + popup_data).find('.wpcf7-error_message').html('<p class="wpcf7-not-valid-tip error">' + res.data.message + '</p>');
            $('#' + popup_data).find('.fp_sendmsgform .thankyoutxt').hide();
          }
        })
        .catch((err) => console.log(err));
    });
  }, []);
  return (
    <div className="vendorbox df fww just-between sponcehov sponcerline">
      <div className="startsponser">
            <div className="starico">
              <i className="fas fa-star"></i>
            </div>
            Featured
          </div>
        <div className="vendbox_media ">
          
          <Slider {...SliderSetting} className="vendbox_mediaslide w100">
            <div className="vendbox_mediasliditem">
              <figure>
                <a href={data.url}>
                  <img src={data.img} alt="" />
                </a>
              </figure>
            </div>
          </Slider>
        </div>
      <div className="vendbox_info">
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
