import Info from './Info';
import Sidebar from './Sidebar';

const NewsDetail = () => {
  return (
    <section className="sidebar_blockarea">
      <div className="container">
        <div className="sidebar_blockiner df fww">
          <Sidebar />
          <Info />
        </div>
      </div>
    </section>
  );
};

export default NewsDetail;
