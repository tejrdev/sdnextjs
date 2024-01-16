import React from 'react';
import DistributorMedia from './DistributorMedia';
import Recommended from './Recommended';
import Link from 'next/link';

function Distributors({ data }) {
  return (
    <div className="container">
      <div className="top_txt df fww">
        <h2>
          {/* <a href={data.link}> */}
          <Link href={data.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
            Distributors<i className="fal fa-angle-right"></i>
          </Link>

          {/* </a> */}
        </h2>
        <ul className="distcat_name df fww">
          {data.links.map((item, index) => {
            return (
              <li key={index}>
                {/* <a href={item.url}>{item.title}</a> */}
                <Link href={item.url.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="dist_box df fww">
        {data.data &&
          data.data.map((item, index) => {
            return <React.Fragment key={index}>{index < 2 ? <DistributorMedia data={item} key={index} /> : null}</React.Fragment>;
          })}
        <div className="recomendbox">
          <div className="recomendbox_in">
            
            {data.data &&
              data.data.map((item, index) => {
                return <React.Fragment key={index}>{index > 1 ? <Recommended data={item} key={index} tag="distributors" /> : null}</React.Fragment>;
              })}
              <h4><Link href={data.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>More Listings <i className="fal fa-angle-right"></i></Link></h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Distributors;
