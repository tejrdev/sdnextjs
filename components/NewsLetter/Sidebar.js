const Sidebar = ({ data }) => {
  return (
    <ul className="article-sidebar  " id="sd_sidebar_list">
      {data.map((item, index) => {
        return (
          <li className={index === 0 ? 'active' : ''} key={index}>
            <a href={item.href}>
              <h5>{item.title}</h5>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Sidebar;
