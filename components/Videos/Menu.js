import Link from "next/link";

const Menu = ({ data }) => {
  return (
    <ul className="video_menu filter_tabs">
      {data.map((item, index) => {
        return (
          <li
            id="menu-item-128712"
            className={'menu-item menu-item-type-post_type menu-item-object-page ' + (item.url.replace(process.env.NEXT_PUBLIC_BACKEND_URL, '') === window.location.pathname ? 'active' : '')}
          >
            <Link title={item.attr_title} href={item.url.replace(process.env.NEXT_PUBLIC_BACKEND_URL, '')} dangerouslySetInnerHTML={{ __html: item.title }}></Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
