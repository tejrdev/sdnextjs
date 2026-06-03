import ClearFilters from './ClearFilters';
import StateFilter from '@/components/Directory/ListingPages/StateFilter';
import MultiSelectFilter from './MultiSelectFilter';
import { useState } from 'react';

const Filters = ({ setListingFilter, data, tag, associated = [], amenities = [], stateValue = '', onAmenitiesChange = {}, onAssociationsChange = {}, onClearAllClick }) => {
  let filter_options;
  if (tag === 'distributor') {
    //tag === 'vendor' ||
    filter_options = Object.entries(data).map(([value]) => ({ name: value, value }));
  } else if (tag === 'vendor') {
    filter_options = data.map((category) => {
      const options = Object.entries(category.data).map(([name, value]) => ({ name, value }));
      return { title: category.title, catnames: options };
    });
  }

  const [checked, setChecked] = useState(false);

  const AllChangeEvent = () => {
    setListingFilter('');
    if (tag === 'theatre') {
      onAmenitiesChange('');
      onAssociationsChange('');
    } else if (tag === 'vendor') {
      document.querySelectorAll('.vandcats input[type="checkbox"]:checked').forEach((item) => {
        item.checked = false;
      });
    }
    setChecked(!checked);

    //clear search & make sortby default
    onClearAllClick();
  };

  const setAmenities = (amennities) => {
    onAmenitiesChange(amennities);
  };
  const setAssociatedWith = (associatedWith) => {
    onAssociationsChange(associatedWith);
  };
  return (
    <div className='dist_filter'>
      <div className='filter_box'>
        <ClearFilters AllChangeEvent={AllChangeEvent} />
        {(tag === 'exhibitor' || tag === 'theatre') && <StateFilter setStateFilter={setListingFilter} data={data} stateValue={stateValue} tag={tag} />}
        {(tag === 'distributor' || tag === 'vendor' || tag === 'filmfestival') && (
          <div className='dist_filterbox' id={tag === 'distributor' ? 'distributor_filter' : ''}>
            {tag === 'vendor' && filter_options &&
              <div className='mb-6'><MultiSelectFilter data={filter_options} tag='vendor' title='Vendors With' setMultiSelectFilter={setListingFilter} checking={checked} /></div>}
            {tag === 'distributor' && filter_options && <MultiSelectFilter data={filter_options} title='Distribution Type' setMultiSelectFilter={setListingFilter} checking={checked} />}
            {tag === 'filmfestival' && data && <MultiSelectFilter data={data} title='Film Festivals Category' setMultiSelectFilter={setListingFilter} checking={checked} />}
          </div>
        )}
        {tag === 'theatre' && (
          <div className='filtercheckboxes'>
            {amenities && amenities?.length > 0 && <MultiSelectFilter data={amenities} title='Amenities' collapsible={true} setMultiSelectFilter={setAmenities} checking={checked} />}
            {associated && associated?.length > 0 && <MultiSelectFilter data={associated} title='Associations' setMultiSelectFilter={setAssociatedWith} checking={checked} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
