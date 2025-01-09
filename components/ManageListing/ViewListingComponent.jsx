import React from 'react';

const ViewListingComponent = ({ data, user, callToAction }) => {
  return (
    <section className='listingtop'>
      <div className='container'>
        <h3>Welcome {user} !</h3>
        <div className='listingfilterbox df fww'>
          <h1>Manage Your Listing For</h1>
          <div className='filterviewsave df fww'>
            <div className='select_filters selectbox'>
              <div className='custom-select-wrapper'>
                <select name='listing' className='selectin globalselect bold'>
                  <option value='0'>Select Listing</option>
                  {data.claiming_list &&
                    data.claiming_list.map((item, index) => {
                      return (
                        <React.Fragment key={index}>
                          {item.approved && (
                            <option value={item.claim_for} key={index} title={item.title} type={item.claim_type}>
                              {item.title + ' (' + item.claim_type + ')'}
                            </option>
                          )}
                        </React.Fragment>
                      );
                    })}
                </select>
              </div>
            </div>
            <span className='ghostbtn goldbtn uppercase' onClick={callToAction}>
              View Listing
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewListingComponent;
