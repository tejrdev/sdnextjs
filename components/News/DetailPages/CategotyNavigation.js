import Link from 'next/link';

const CategotyNavigation = ({ data }) => {
  return (
    <section className="cat_nav articel_dtlnav">
      <div className="container">
        <div className="cat_navbox">
          <ul id="menu-articles" className="catnav_items df fww">
            {data.map((item, index) => {
              return (
                <li
                  key={index}
                  className={'menu-item menu-item-type-post_type menu-item-object-page ' }
                >
                  <Link href={item.url.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} title={item.title}>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CategotyNavigation;
