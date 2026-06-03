import { Logocard } from './Listingsearch';
import React from 'react';

function RecentUpdates({ data, tag }) {
  return (
    <div className='container flex flex-wrap'>
      <div className='top_txt max-w-full lg:max-w-[135px]'>
        <h3> {tag === 'recent_post' ? 'Recent Updates' : 'Recently Viewed'} </h3>
      </div>
      <div className={'distbottom_sponcersupdate grid gap-4 ' + (tag === 'recent_post' ? 'recentupdates' : '')}>
      {data && data.length > 0 &&
          data.slice(0, 3).map((item, index) => {
            return <Logocard cardinfo={item} nobg key={index} />;
          })}
      </div>
    </div>
  );
}

export default RecentUpdates;
