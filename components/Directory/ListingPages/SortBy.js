import { useRouter } from 'next/router';

const SortBy = ({ tag, onSortByChange, currentSortBy }) => {
  const router = useRouter();
  let sortby;
  switch (tag) {
    case 'theatre':
      sortby = 'Theatre Name A-Z';
      break;
    case 'exhibitor':
      sortby = 'Exhibitor Name A-Z';
      break;
    case 'vendor':
      sortby = 'Vendor Name A-Z';
      break;
    case 'distributor':
      sortby = 'Distributor Name A-Z';
      break;
    case 'film-festival':
      sortby = 'Festival Name A-Z';
      break;
  }

  const SortByChange = (e) => {
    const sortby = e.target.value;
    onSortByChange(sortby);
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const state = params.get('state');
    let pageno = params.get('pageno');
    if (event.isTrusted) pageno = 1;
    let searchQuery = '';
    if (sortby !== '') searchQuery = { ...router.query, state, sortby, pageno };
    router.replace({ query: searchQuery }, undefined, { scroll: false, shallow: true });
  };
  return (
    <div className='dirshort df fww'>
      <label htmlFor=''>Sort</label>
      <select name='listing' className='globalselect' value={currentSortBy} onChange={SortByChange}>
        <option value='name'>{sortby}</option>
        {(tag === 'theatre' || tag === 'film-festival') && <option value='city'>City Name A-Z</option>}
        {tag === 'exhibitor' && <option value='screen'># Screens</option>}
      </select>
    </div>
  );
};

export default SortBy;
