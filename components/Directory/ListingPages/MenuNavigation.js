import Link from 'next/link';

const MenuNavigation = () => {
  return (
    <section className="cat_nav ">
      {
      <div className="container">
        <div className="cat_navbox">
          <ul id="menu-directory" className="df fww catnav_items">
            <li
              id="menu-item-1092"
              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-first menu-item-1092"
            >
              <Link href="/directory/distributors/">Distributors</Link>
            </li>
            <li
              id="menu-item-268"
              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-268"
            >
              <Link href="/directory/exhibitors/">Exhibitors</Link>
            </li>
            <li
              id="menu-item-66139"
              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-66139"
            >
              <Link href="/directory/theatres/">Theatres</Link>
            </li>
            {/* <li
              id="menu-item-269"
              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-269"
            >
              <Link href="/directory/calendar/">Calendar</Link>
            </li> */}
            <li id="menu-item-220" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-220">
              <Link href="/directory/vendors/">Vendors</Link></li>
            <li
              id="menu-item-270"
              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-270"
            >
              <Link href="/directory/film-festivals/">Film Festivals</Link>
            </li>
            <li
              id="menu-item-271"
              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-last menu-item-271"
            >
              <Link href="/directory/calendar-of-events/">
                Calendar of Events
              </Link>
            </li>
          </ul>
        </div>
      </div>
    }
    </section>
  );
};

export default MenuNavigation;
