const FestivalImg = ({ data }) => {
  return (
    <section className="joinads toplinesec">
      <div className="container">
        <div className="top_txt"></div>
        <a href={data.festival_link} target="_blank" rel="noreferrer">
          <img src={data.banner_image} alt="" />
        </a>
      </div>
    </section>
  );
};

export default FestivalImg;
