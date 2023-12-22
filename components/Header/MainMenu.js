import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const $ = require('jquery');

function MainMenu({ data }) {
  const router = useRouter();
  useEffect(() => {
    $('#menu-main-menu li').on('click', function () {
      $('#menu-main-menu li').removeClass('active');
      $(this).addClass('active');
    });
  }, []);
  return (
    <ul id="menu-main-menu" className="primary-menu enumenu_ul desk">
      {data.main_menu.map((item, id) => {
        const menu_id = 'menu-item-' + item.ID;
        let classes = 'menu-item menu-item-type-post_type menu-item-object-page';
        classes += menu_id;
        id = 0 ? (classes += 'menu-item-first') : null;
        return (
          <li id={menu_id} className={classes + (item.url.replace(process.env.NEXT_PUBLIC_MENU_URL1, '') === router.pathname + '/' ? ' active' : '')} key={item.ID}>
            {item.url.indexOf('themoviehub.com') === -1 ? (
              <Link href={item.url.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} className="menu-image-title-after menu-image-not-hovered firstLevel">
                <span className="menu-image-title-after menu-image-title">{item.title}</span>
              </Link>
            ) : (
              <a href={item.url} className="menu-image-title-after menu-image-not-hovered firstLevel">
                <span className="menu-image-title-after menu-image-title">{item.title}</span>
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default MainMenu;
