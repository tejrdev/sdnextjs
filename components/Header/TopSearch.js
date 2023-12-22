import CustomSelect from './CustomSelect';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

function TopSearch() {
  const router = useRouter();
  const  serach_text  = router.query.s;
  const  SD_post_type = router.query.post_type;
  var  SD_post_type_name = 'All';
  if(SD_post_type === 'film_data'){
     SD_post_type_name = 'Film Data';
  } else if(SD_post_type === 'post'){
    SD_post_type_name = 'News';
  } else if(SD_post_type === 'studios_distributors'){
    SD_post_type_name = 'Distributors';
  } else if(SD_post_type === 'vendors'){
    SD_post_type_name = 'Vendors';
  } else if(SD_post_type === 'exhibitors'){
    SD_post_type_name = 'Exhibitor';
  } else if(SD_post_type === 'theatres'){
    SD_post_type_name = 'Theatre';
  } else if(SD_post_type === 'film_festival'){
  } else if(SD_post_type === 'theatres'){
    SD_post_type_name = 'Film Festivals';
  } else if(SD_post_type === 'filmtalent'){
    SD_post_type_name = 'Talent';
  } else {}

  const [search, setSearch] = useState(serach_text);
  const [selectVal, setSelectVal] = useState('');
 // const [searchParameter, setSearchParameter] = useSearchParams();
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const setUrlParam = (value) => {
    //setSelectVal(value);
    SD_post_type_name = value;

  };
  const onSearchClicked = (e) => {
    // e.preventDefault();
    // window.location.pathname = '';
   // var s_data = $('#search_blog_header .custom-option.selection').data('value');
    //if(s_data == '' ) s_data = "All";
    //$('#search_blog_header #id_top_search_posttype').val(s_data);
  };
  const custom_options = [
    { name: 'All', value: 'all' },
    { name: 'Film Data', value: 'film_data' },
    { name: 'News', value: 'post' },
    { name: 'Distributors', value: 'studios_distributors' },
    { name: 'Vendors', value: 'vendors' },
    { name: 'Exhibitor', value: 'exhibitors' },
    { name: 'Theatre', value: 'theatres' },
    { name: 'Film Festivals', value: 'film_festival' },
    { name: 'Talent', value: 'filmtalent' },
  ];


  return (
    <div className="top_search">
      <form role="search" method="get" id="search_blog_header" className="search_box" action={process.env.NEXT_PUBLIC_PUBLIC_URL+'/search'}>
        <div className="head_searchbar df fww" id="search_blog_page">
          <div className="select_filters">
            <div className="custom-select-wrapper">
              <CustomSelect custom_options={custom_options} onChange={setUrlParam} Default_val={SD_post_type_name} />
            </div>
          </div>
          <div className="findinput df fww">
            <input type="input" id="s" name="s" placeholder="Search Screendollars" tabIndex="0" value={search} onChange={onSearchChange}  />
          </div>
          <input type="hidden" id="id_top_search_posttype" name="post_type" value={SD_post_type} />
          <button type="submit" id="top_search_header" onClick={onSearchClicked}>
            <i className="far fa-search"></i>
          </button>
        </div>
        {/*<div className="srch_txt">search</div>*/}
      </form>
    </div>
  );
}

export default TopSearch;
