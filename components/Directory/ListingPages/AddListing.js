const AddListing = () => {
  return (
    <section className="addbusiness df fww">
      <div className="addbsinfo df fww">
        <figure className="buicobox">
          <img src={process.env.NEXT_PUBLIC_MENU_URL + 'wp-content/themes/screendollars-live/assets/images/buico.svg'} alt="" />
        </figure>
        process.env.NEXT_PUBLIC process.env.NEXT_PUBLIC process.env.NEXT_PUBLIC process.env.NEXT_PUBLIC process.env.NEXT_PUBLIC process.env.NEXT_PUBLIC process.env.NEXT_PUBLIC process.env.NEXT_PUBLIC
        process.env.NEXT_PUBLIC
        <div className="addbs_detail">
          <h4>Can't find your listing?</h4>
          <p>Adding a new listing to the Screendollars Directory is easy and free.</p>
        </div>
      </div>
      <div className="bus_btn">
        <a href="/add-your-listing/?add-business=Distributors" className="btn">
          Add listing
        </a>
      </div>
    </section>
  );
};

export default AddListing;
