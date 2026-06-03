import React from 'react';
import DistributorMedia from './DistributorMedia';
import Recommended from './Recommended';
import Link from 'next/link';

function Distributors({ data }) {
  return (
    <div className='container'>
      <div className='dist_box df fww'>
        {data &&
          data.map((item, index) => {
            return <React.Fragment key={index}>{index < 2 ? <DistributorMedia data={item} key={index} /> : null}</React.Fragment>;
          })}
        <div className='recomendbox'>
          <div className='recomendbox_in'>
            {data &&
              data.map((item, index) => {
                return <React.Fragment key={index}>{index > 1 ? <Recommended data={item} key={index} tag='distributors' /> : null}</React.Fragment>;
              })}
            <h4 className='mt-2'>
              <Link href='/directory/distributors'>
                More Listings <i className='fal fa-angle-right'></i>
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Distributors;
