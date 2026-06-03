import React from 'react';
import OfficeItem from './OfficeItem';
import Link from 'next/link';

const BoxOffice = ({ data, tag, title }) => {
  return (
    <div className='officecomin hmgrybg'>
      <div className='grybtmline df fww just-between'>
        <h5>
          <Link href={tag === 'boxoffice' ? '/box-office-results/' : '/movies/releases-by-week/'}>
            {tag === 'boxoffice' ? 'Box Office' : 'Coming Soon'} <i className='far fa-angle-right'></i>
          </Link>
        </h5>
        {tag === 'boxoffice' ? (
          <p>
            <em> {title}</em>
          </p>
        ) : null}
      </div>
      <div className='officecom_box df fww'>
        {data &&
          data.map((item, index) => {
            return <React.Fragment key={index}>{index < 3 ? <OfficeItem item={item} tag={tag} /> : null}</React.Fragment>;
          })}
      </div>
    </div>
  );
};

export default BoxOffice;
