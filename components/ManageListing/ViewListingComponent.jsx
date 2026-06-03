const ViewListingComponent = ({ user }) => {
  return (
    <section className='listingtop'>
      <div className='container'>
        <h3>Welcome {user} !</h3>
        <div className='listingfilterbox df fww'>
          <h1>Manage Your Listing For</h1>
        </div>
      </div>
    </section>
  );
};

export default ViewListingComponent;
