import { useEffect } from 'react';
// import '../../Header/magnific-popup.min.css';

const KeyContacts = ({ data }) => {
  //const $ = window.jQuery;

  useEffect(() => {
  const $ = window.jQuery;
    $('.termtxt').magnificPopup({
      type: 'inline',
      preloader: false,
      focus: '#name',

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
      },
    });
  }, []);
  return (
    <>
      <div className="disc_keycontact  white-popup-block mfp-hide" mfp-align-top="" id="disc_keycontact">
        <label htmlFor="">
          <img src={process.env.NEXT_PUBLIC_MENU_URL1 + '/wp-content/themes/screendollars/assets/images/userproico.svg'} alt="" />
          Key Contacts{' '}
        </label>
        <ul className="togletxt df fww">
          {data.key_contacts.map((item, index) => {
            return (
              <li key={index}>
                {item.name} <br />
                {item.contact_title ? <> {item.contact_title} <br /></> : ''}
                {item.contact_email ? <a href={"mailto:"+item.contact_email}> {item.contact_email} <br /> </a> : ''}
                {item.contact_no1 ? item.contact_no1 : ''}
                
              </li>
            );
          })}
        </ul>
      </div>
      <a className="termtxt printdochide" href="#disc_keycontact" data-effect="mfp-move-from-top">
        <img src={process.env.NEXT_PUBLIC_MENU_URL1 + '/wp-content/themes/screendollars/assets/images/userproico.svg'} alt="Key Contacts" /> Key Contacts
      </a>
    </>
  );
};

export default KeyContacts;
