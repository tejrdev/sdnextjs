import React from 'react';
import Link from 'next/link';
const Success = () => {
  return (
    <>
      <section className="profilesteps">
        <section className="popnext_info">
          <div className="container">
            <div className="top_txt text-center">
              <h2>Thanks! Your New Profile Has Been Created</h2>
              <p>Please take a moment to tell us more about yourself so we can provide information related to your interests.</p>
              <div>
                {' '}
                <Link href="/profile" title="Continue" className="btn" rel="home">
                  Continue
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};
export default Success;
