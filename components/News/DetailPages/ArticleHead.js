const ArticleHead = ({ title }) => {
  return (
    <section className="articel_head">
      <div className="container">
        <div className="articel_headbox">
          <div className="page_introbox text-center">
            <h1 className="h2">{title}</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleHead;
