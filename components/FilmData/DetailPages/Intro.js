const Intro = ({ title, content }) => {
  return (
    <section className="page_intro">
      <div className="container">
        <div className="page_introbox text-center">
          <div className="page_heading">
            <h1 className="h2">{title} </h1>
          </div>
          <p>{content}</p>{' '}
        </div>
      </div>
    </section>
  );
};

export default Intro;
