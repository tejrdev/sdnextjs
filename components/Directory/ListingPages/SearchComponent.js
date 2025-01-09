const SearchComponent = ({ tag, onSearchClick, searchText, setSearchText }) => {
  let title, placeholder;

  switch (tag) {
    case 'theatre':
      title = 'All Theatres';
      placeholder = 'Search Theatres';
      break;
    case 'exhibitor':
      title = 'All Exhibitors';
      placeholder = 'Search Exhibitors';
      break;
    case 'vendor':
      title = 'All Vendors';
      placeholder = 'Search Vendors';
      break;
    case 'distributor':
      title = 'All Distributors';
      placeholder = 'Search Distributors';
      break;
    case 'film-festival':
      title = 'All Film Festivals';
      placeholder = 'Search Festivals';
      break;
  }

  const searchDirectory = (e) => {
    e.preventDefault();
    onSearchClick();
  };

  const onSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };
  return (
    <>
      <h1 className='h3'>{title} </h1>
      <form action='' className='dircsearch_list pvr'>
        <input type='text' name='' id='' value={searchText} onChange={onSearchChange} placeholder={placeholder} className='w-100' />
        <button type='submit' id='top_search_header' onClick={searchDirectory}>
          <i className='far fa-search'></i>
        </button>
      </form>
    </>
  );
};

export default SearchComponent;
