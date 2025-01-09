import Link from 'next/link';
import { useRouter } from 'next/router';
import TopSearch from './TopSearch';

const $ = require('jquery');

function MainMenu({ data }) {
  const router = useRouter();
  return (
    <ul id='menu-main-menu' className='primary-menu enumenu_ul desk'>
      {data.main_menu.map((item, id) => {
        const menu_id = 'menu-item-' + item.ID;
        let classes = 'menu-item menu-item-type-post_type menu-item-object-page';
        classes += menu_id;
        id = 0 ? (classes += 'menu-item-first') : null;
        return (
          <li id={menu_id} className={classes + (router.asPath.replace('/category', '/news').indexOf(item.url) > -1 ? ' active' : '')} key={item.ID}>
            {item.url.indexOf('themoviehub.com') === -1 ? (
              <Link href={item.url} className='menu-image-title-after menu-image-not-hovered firstLevel'>
                <span className='menu-image-title-after menu-image-title dark:text-slate-50'>{item.title}</span>
              </Link>
            ) : (
              <a href={item.url} className='menu-image-title-after menu-image-not-hovered firstLevel'>
                <span className='menu-image-title-after menu-image-title dark:text-slate-50'>{item.title}</span>
              </a>
            )}
          </li>
        );
      })}

      <li className='mnusearch'>
        <TopSearch />
      </li>
    </ul>
  );
}

export default MainMenu;
