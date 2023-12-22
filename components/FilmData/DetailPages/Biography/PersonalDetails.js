const PersonalDetails = ({ data }) => {
  return (
    <section className="persnolinfo toplinesec" id="personal_details">
      <div className="container">
        <div className="top_txt">
          <h2>
            Personal Details <i className="fal fa-angle-right"></i>
          </h2>
        </div>
        <div
          className="persnolinfo_box"
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
      </div>
    </section>
  );
};

export default PersonalDetails;
