const Heading = ({ title, content }) => {
  return (
    <div className="page_introbox text-center">
      <div className="page_heading">
        <h1 className="h2 dark:text-white">{title}</h1>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Heading;
