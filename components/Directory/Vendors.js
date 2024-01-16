import React from 'react';
import VendorBox from './VendorBox';
import Recommended from './Recommended';
import Link from 'next/link';

function Vendors({ data, tag }) {
  return (
    <div className="container">
      <div className="top_txt df fww">
        <h2>
          <Link href={data.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
            {tag === 'vendors' ? 'Vendors' : 'Film Festival'}
            {''}
            <i className="fal fa-angle-right"></i>
          </Link>
        </h2>
      </div>
      <div className="msnlist_block  df fww just-between">
        <div className="vend_row">
          {data.data &&
            data.data.map((item, index) => {
              return <React.Fragment key={index}>{index < 2 ? <VendorBox data={item} key={index} tag_data={tag} /> : null}</React.Fragment>;
            })}
        </div>
        <div className="recomendbox">
          <div className="recomendbox_in">
            
            {data.data &&
              data.data.map((item, index) => {
                return <React.Fragment key={index}>{index > 1 ? <Recommended data={item} key={index} tag="vendors" /> : null}</React.Fragment>;
              })}
              <h4><Link href={data.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>More Listings <i className="fal fa-angle-right"></i></Link></h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vendors;
