import ClearFilters from './ClearFilters';
import StateFilter from '@/components/Directory/ListingPages/StateFilter';
import MultiSelectFilter from './MultiSelectFilter';
import { useState } from 'react';

const Filters = ({ setListingFilter, data, tag, associated = [], amenities = [], stateValue = '', onAmenitiesChange = {}, onAssociationsChange = {}, onClearAllClick }) => {
  let filter_options;
  if (tag === 'vendor' || tag === 'distributor') {
    filter_options = Object.entries(data).map(([value]) => ({ name: value, value }));
  }

  const [checked, setChecked] = useState(false);

  const AllChangeEvent = () => {
    setListingFilter('');
    if (tag === 'theatre') {
      onAmenitiesChange('');
      onAssociationsChange('');
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
        {(tag === 'exhibitor' || tag === 'theatre') && <StateFilter setStateFilter={setListingFilter} data={data} stateValue={stateValue} />}
        {(tag === 'distributor' || tag === 'vendor' || tag === 'filmfestival') && (
          <div className='dist_filterbox' id={tag === 'distributor' ? 'distributor_filter' : ''}>
            {tag === 'vendor' && filter_options && <MultiSelectFilter data={filter_options} title='Vendors With' setMultiSelectFilter={setListingFilter} checking={checked} />}
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
