import { useEffect } from 'react';
const $ = require('jquery');

const FilterWrap = ({ data, id }) => {
  return (
    <div className="boxoffice_filter_wrap">
      <ul id={id} dangerouslySetInnerHTML={{ __html: data }}></ul>
    </div>
  );
};

export default FilterWrap;
