import React from 'react';
const VerifyMessage= () => {
    if (typeof window !== 'undefined') {
    var LOGGED_EMAIL = localStorage.getItem('email');

    }
    const verify_content = `We have sent an email to ${LOGGED_EMAIL} with a link to review the details of your new profile and confirm your subscription`
    const sub_content = `Don’t worry… it’s free!  We’re just happy to have you as a regular visitor to our website`;

    return (<>
    <p><small>{verify_content}</small></p>
    <p><small>{sub_content}</small></p>
    </>)

}

export default VerifyMessage;
