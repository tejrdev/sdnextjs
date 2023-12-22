const Menu = ({ data }) => {
  return (
    <ul className="video_menu filter_tabs">
      {data.map((item, index) => {
        return (
          <li
            id="menu-item-128712"
            className={'menu-item menu-item-type-post_type menu-item-object-page ' + (item.url.replace(process.env.NEXT_PUBLIC_MENU_URL1, '') === window.location.pathname ? 'active' : '')}
          >
            <a title={item.attr_title} href={item.url.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} dangerouslySetInnerHTML={{ __html: item.title }}></a>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
