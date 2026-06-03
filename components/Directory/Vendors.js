import React from 'react';
import VendorBox from './VendorBox';
import Recommended from './Recommended';
import Link from 'next/link';

function Vendors({ data, tag }) {
  return (
    <div className='container'>
      <div className='msnlist_block  df fww just-between'>
        <div className='vend_row'>
          {data &&
            data.map((item, index) => {
              return <React.Fragment key={index}>{index < 2 ? <VendorBox data={item} key={index} tag_data={tag} /> : null}</React.Fragment>;
            })}
        </div>
        <div className='recomendbox'>
          <div className='recomendbox_in'>
            {data &&
              data.map((item, index) => {
                return <React.Fragment key={index}>{index > 1 ? <Recommended data={item} key={index} tag='vendors' /> : null}</React.Fragment>;
              })}
            <h4 className='mt-2'>
              <Link href={`/directory/${tag === 'vendors' ? 'vendors' : 'film-festivals'}`}>
                More Listings <i className='fal fa-angle-right'></i>
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vendors;
