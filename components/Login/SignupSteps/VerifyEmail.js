import React,{useEffect} from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const VerifyEmail = () => {



const VerifyMessage = dynamic(() => import('./VerifyMessage'), {
  ssr: false,
})

return (
    <>
      <section className="profileinfobox">
        <div className="container">
          <div className="login_signin ">
            <div className="forgotpass">
              <Link href="/profile">
                <span className="popclose">+</span>
              </Link>
              <h2>Verify Profile</h2>
              <VerifyMessage />

              <div>
                <input value="RESEND LINK" type="submit" className="loginClick input" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerifyEmail;
