import React from 'react';
import OfficeItem from './OfficeItem';

const BoxOffice = ({ data, tag, title }) => {
  return (
    <div className="officecomin hmgrybg">
      <div className="grybtmline df fww just-between">
        <h5>
          <a href="/film-data/releases-by-week/?y=2021&week=21">
            {tag === 'boxoffice' ? 'Box Office' : 'Coming Soon'}{' '}
            <i className="far fa-angle-right"></i>
          </a>
        </h5>
        {tag === 'boxoffice' ? (
          <p>
            <em> {title}</em>
          </p>
        ) : null}
      </div>
      <div className="officecom_box df fww">
        {data &&
          data.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {index < 3 ? <OfficeItem item={item} tag={tag} /> : null}
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default BoxOffice;
