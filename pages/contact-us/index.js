import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

const $ = require('jquery');

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'contact-us');
  const data = await res.json();

  // contact page static data
  let ContactpageData = await fetch(
    process.env.NEXT_PUBLIC_SD_API + '/contact_us_page/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  ContactpageData = await ContactpageData.json();

  return {
    props: { data, ContactpageData },
    revalidate: 10, // In seconds
  };
}

const ContactUs = ({ data , ContactpageData }) => {
  /*const [ContactPageDataLoaded, setcontactPageDataLoaded] = useState(false);
  const [ContactpageData, setcContactPage] = useState([]);*/
  const [yourname, setYourName] = useState('');
  const [lastname, setLastName] = useState('');
  const [youremail, setEmailid] = useState('');
  const [organization, setOrganization] = useState('');
  const [tel, setTel] = useState('');
  const [website, setWebsite] = useState('');
  const [commentsm, setCommentsm] = useState('');
  const [EmailFormClass, setEmailFormClass] = useState('wpcf7-form');

  /*useEffect(() => {
    loadContactPageData();
  }, []);*/

  useEffect(() => {
    $(document).on('click', '#sc-contact-form .submitbtn .btn', function (e) {
      // alert(1)  ;
      $('.wpcf7-error_message').html('');
      $('.sd_contact_message').hide();
      $('.wpcf7-spinner').css('visibility', 'visible');
      var form_data = new FormData();

      form_data.append('your-name', $('[name="your-name"]').val());
      form_data.append('last-name', $('[name="last-name"]').val());
      form_data.append('your-email', $('[name="your-email"]').val());
      form_data.append('your-organization', $('[name="your-organization"]').val());
      form_data.append('your-tele', $('[name="your-tele"]').val());
      form_data.append('your-web', $('[name="your-web"]').val());
      form_data.append('your-message', $('[name="your-message"]').val());

      axios
        .post(process.env.NEXT_PUBLIC_MENU_URL + 'wp-json/contact-form-7/v1/contact-forms/5/feedback', form_data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          //console.log(res);
          $('.wpcf7-spinner').css('visibility', 'hidden');
          if (res.data.status === 'mail_sent') {
            setEmailFormClass('wpcf7-form sent');
            $('[name="your-name"]').val('');
            $('[name="last-name"]').val('');
            $('[name="your-email"]').val('');
            $('[name="your-organization"]').val('');
            $('[name="your-tele"]').val('');
            $('[name="your-web"]').val('');
            $('[name="your-message"]').val('');
            $('.sd_contact_message').removeClass('hide');
            $('.sd_contact_message').show('hide');
          } else {
            setEmailFormClass('wpcf7-form invalid');

            $('.wpcf7-error_message').html('<p class="wpcf7-not-valid-tip error">' + res.data.message + '</p>');
            $('.sd_contact_message').removeClass('hide');
            $('.sd_contact_message').hide();
          }
        })
        .catch((err) => console.log(err));
    });
  }, []);

  /*const loadContactPageData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/contact_us_page/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setcContactPage(res.data);
        setcontactPageDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };*/

  return (
    <>
      <Head >
        {(data.children[0].children).map( (item, index) => {
            const attributes = item.tag.toUpperCase();

            switch (attributes) {
              case 'TITLE':
                return <title key={index}>{item.html}</title>;
              case 'META':
                const name = item.name || '';
                if(name !== ''){
                return <meta key={index} name={item.name} content={item.content} />;
                } else{
                return <meta key={index} property={item.property} content={item.content} />;
                }
              case 'LINK':
                return <link key={index} rel={item.rel} href={item.href} />;
              case 'SCRIPT':
                return (
                  <script key={index} type={item.type} class={item.class} 
                     dangerouslySetInnerHTML={{ __html: item.html }}>
                  </script>
                );
              default:
                return null;
            }
          })}
      </Head>
      
        <section className="contactus">
          <div className="container">
            <div className="top_txt">
              <h2>{ContactpageData.left_block_title}</h2>
              <h3>{ContactpageData.form_content}</h3>
            </div>
            <div className="contactus_row df fww">
              <div className="contact_coltop">
                <div className="cnt_img">
                  <img rel="preload" as="image" src={ContactpageData.logo} alt={ContactpageData.logo_alt} />
                </div>
                <div className="contact_info df fww">
                  {ContactpageData.contact_location.length ? (
                    <div className="cticon_item">
                      <a href={ContactpageData.contact_location_link} target="_blank">
                        <div className="ct_icon">
                          <img rel="preload" as="image" src={ContactpageData.location_icon} alt="location" />
                        </div>
                        {ContactpageData.contact_location}
                      </a>{' '}
                    </div>
                  ) : (
                    ''
                  )}
                  {ContactpageData.contact_number.length ? (
                    <div className="cticon_item">
                      <a href={ContactpageData.call_link} title="call us">
                        <div className="ct_icon">
                          <img src={ContactpageData.call_icon} alt="call us" rel="preload" as="image" />
                        </div>
                        <p>{ContactpageData.contact_number}</p>
                      </a>
                    </div>
                  ) : (
                    ''
                  )}
                  {ContactpageData.email_address.length ? (
                    <div className="cticon_item">
                      <a href={ContactpageData.email_address_link}>
                        <div className="ct_icon">
                          <img rel="preload" as="image" src={ContactpageData.email_address_icon} alt="email us" />
                        </div>
                        <p>{ContactpageData.email_address}</p>
                      </a>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              <div className="contact_colbtm">
                <form action="" method="post" className={EmailFormClass + ' wpcf7-form mailchimp-ext-0.5.62 init'} id="sc-contact-form">
                  <div className="cnt_field">
                    <span className="wpcf7-form-control-wrap" data-name="your-name">
                      <input
                        type="text"
                        name="your-name"
                        value={yourname}
                        size="40"
                        className="wpcf7-form-control wpcf7-text"
                        placeholder="First Name:"
                        onChange={(e) => setYourName(e.target.value)}
                      />
                    </span>
                  </div>
                  <div className="cnt_field">
                    <span className="wpcf7-form-control-wrap" data-name="last-name">
                      <input type="text" name="last-name" value={lastname} size="40" className="wpcf7-form-control wpcf7-text" placeholder="Last Name:" onChange={(e) => setLastName(e.target.value)} />
                    </span>
                  </div>
                  <div className="cnt_field">
                    <span className="wpcf7-form-control-wrap" data-name="your-email">
                      <input
                        type="email"
                        name="your-email"
                        value={youremail}
                        size="40"
                        className="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required"
                        placeholder="Email:"
                        onChange={(e) => setEmailid(e.target.value)}
                      />
                    </span>
                  </div>
                  <div className="cnt_field">
                    <span className="wpcf7-form-control-wrap" data-name="your-organization">
                      <input
                        type="text"
                        name="your-organization"
                        value={organization}
                        size="40"
                        className="wpcf7-form-control wpcf7-text"
                        placeholder="Organization:"
                        onChange={(e) => setOrganization(e.target.value)}
                      />
                    </span>
                  </div>
                  <div className="cnt_field">
                    <span className="wpcf7-form-control-wrap" data-name="your-tele">
                      <input type="tel" name="your-tele" value={tel} size="40" className="wpcf7-form-control wpcf7-text wpcf7-tel" placeholder="Telephone:" onChange={(e) => setTel(e.target.value)} />
                    </span>
                  </div>
                  <div className="cnt_field">
                    <span className="wpcf7-form-control-wrap" data-name="your-web">
                      <input
                        type="text"
                        name="your-web"
                        value={website}
                        size="40"
                        className="wpcf7-form-control wpcf7-text"
                        aria-invalid="false"
                        placeholder="Website:"
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </span>
                  </div>
                  <div className="cnt_field commentfield">
                    <span className="wpcf7-form-control-wrap" data-name="your-message">
                      <textarea
                        name="your-message"
                        cols="40"
                        rows="10"
                        value={commentsm}
                        className="wpcf7-form-control wpcf7-textarea"
                        placeholder="Question or Comment:"
                        onChange={(e) => setCommentsm(e.target.value)}
                      ></textarea>
                    </span>
                  </div>
                  <div className="cnt_field submitbtn">
                    <button type="button" className="btn">
                      {' '}
                      Submit
                    </button>
                    <span className="wpcf7-spinner"></span>
                  </div>
                  <div className="wpcf7-error_message"></div>
                </form>

                <div
                  className="sd_contact_message hide"
                  dangerouslySetInnerHTML={{
                    __html: ContactpageData.content_message,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      
    </>
  );
};

export default ContactUs;
