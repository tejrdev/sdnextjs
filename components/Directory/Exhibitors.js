import React from 'react';
import ExibitionBox from './ExibitionBox';
import Recommended from './Recommended';
import Link from 'next/link';

function Exhibitors({ data }) {
  return (
    <div className='container'>
      <div className='top_txt df fww'>
        <h2>
          {/* <a href={data.link}>
            Exhibitors <i className="fal fa-angle-right"></i>
          </a> */}
          <Link href={data.link.replace(process.env.NEXT_PUBLIC_MENU_URL, '')}>
            Exhibitors<i className='fal fa-angle-right'></i>
          </Link>
        </h2>
      </div>
      <div className='msnlist_block  df fww just-between'>
        <div className='exhib_row'>
          {data.data &&
            data.data.map((item, index) => {
              return <React.Fragment key={index}>{index < 2 ? <ExibitionBox data={item} key={index} /> : null}</React.Fragment>;
            })}
        </div>
        <div className='recomendbox'>
          <div className='recomendbox_in'>
            {data.data &&
              data.data.map((item, index) => {
                return <React.Fragment key={index}>{index > 1 ? <Recommended data={item} key={index} tag='exhibitors' /> : null}</React.Fragment>;
              })}
            <h4>
              <Link href={data.link.replace(process.env.NEXT_PUBLIC_MENU_URL, '')}>
                More Listings <i className='fal fa-angle-right'></i>
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exhibitors;
