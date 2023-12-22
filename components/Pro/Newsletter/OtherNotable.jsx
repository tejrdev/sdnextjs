import Link from 'next/link';

const OtherNotable = ({ item }) => {
  return (
    <>
      {item.other_notables.length > 0 && (
        <div className='other-notable-sec'>
          <h2>OTHER NOTABLES</h2>
          <div className='other-notable--listing'>
            {item.other_notables.map((notable, ii) => {
              return (
                <Link href={notable.link} title=''>
                  <span>{notable.title + ' (' + notable.distributor + ')'}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default OtherNotable;
