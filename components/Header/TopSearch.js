import { useState } from 'react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import CustomSelect from './CustomSelect';

const $ = require('jquery');
const custom_options = [
  { name: 'All', value: 'all' },
  { name: 'Movies', value: 'film_data' },
  { name: 'News', value: 'post' },
  { name: 'Distributors', value: 'studios_distributors' },
  { name: 'Vendors', value: 'vendors' },
  { name: 'Exhibitor', value: 'exhibitors' },
  { name: 'Theatre', value: 'theatres' },
  { name: 'Film Festivals', value: 'film_festival' },
  { name: 'Talent', value: 'filmtalent' },
];

function TopSearch() {
  const router = useRouter();
  const serach_text = router.query.s || '';
  const post_type = router.query.post_type || '';
  let sel_post_type = 'All';
  const pathname = usePathname();
  const [search, setSearch] = useState(serach_text);
  const selected_PostType = custom_options.filter((item) => item.value == post_type);
  if (selected_PostType.length > 0) sel_post_type = selected_PostType[0].name;

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const onSearchClicked = (e) => {
    e.preventDefault();
    const sd_postType = $(e.target).closest('.search_box').find('.custom-options .custom-option.selection').data('value');
    router.push('/search?s=' + search + '&post_type=' + sd_postType);
    //if on mobile screen close menu
    if ($('.search_box').closest('#site-navigation').length) $('.menu-icon').click();
    //if already on search page, refresh the route to get updated result
    if (pathname.indexOf('/search') > -1) {
      setTimeout(() => {
        router.reload();
      }, 1000);
    }
  };

  return (
    <form role='search' method='get' id='search_blog_header' className='search_box'>
      <div className='head_searchbar df fww dark:border-gray-200' id='search_blog_page'>
        <div className='select_filters '>
          <div className='custom-select-wrapper'>
            <CustomSelect custom_options={custom_options} Default_val={sel_post_type} />
          </div>
        </div>
        <div className='findinput df fww'>
          <input type='input' id='s' name='s' placeholder='Search Screendollars' tabIndex='0' value={search} onChange={onSearchChange} className='dark:bg-slate-950' />
        </div>
        <input type='hidden' id='id_top_search_posttype' name='post_type' value={post_type} />
        <button type='submit' id='top_search_header' onClick={onSearchClicked}>
          <i className='far fa-search dark:text-slate-50'></i>
        </button>
      </div>
    </form>
  );
}

export default TopSearch;
