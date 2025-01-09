import Link from 'next/link';

const CallToAction = ({ user, ProInd, extraClass }) => {
  return (
    <>
      {/* //user not logged in */}
      {!user && (
        <div className={'ctabox ' + (extraClass !== '' ? extraClass : '')}>
          <Link href='/pro/signup' className='btn uppercase'>
            Try it for free
          </Link>
        </div>
      )}
      {/* //user logeeg in but not a pro */}
      {user && ProInd !== 'Y' && (
        <div className={'ctabox ' + (extraClass !== '' ? extraClass : '')}>
          <Link href='/pro/checkout' className='btn uppercase'>
            Switch to Pro
          </Link>
        </div>
      )}
    </>
  );
};

export default CallToAction;
