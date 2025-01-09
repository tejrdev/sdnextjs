import Link from 'next/link';
import { useRouter } from 'next/router';

const MenuNavigation = () => {
  const router = useRouter();
  const DirectoryMenu = [
    { name: 'Distributors', link: '/directory/distributors', detailPageRoute: '/studios-distributors/[id]' },
    { name: 'Exhibitors', link: '/directory/exhibitors' , detailPageRoute: '/exhibitors/[id]'},
    { name: 'Theatres', link: '/directory/theatres', detailPageRoute: '/theatres/[id]' },
    { name: 'Vendors', link: '/directory/vendors', detailPageRoute: '/vendors/[id]' },
    { name: 'Film Festivals', link: '/directory/film-festivals', detailPageRoute: '/film-festival/[id]' },
  ];
  return (
    <section className='cat_nav '>
      <div className='container'>
        <div className='cat_navbox'>
          <ul id='menu-directory' className='df fww catnav_items'>
            {DirectoryMenu.map((item, index) => (
              <li key={index} className={'menu-item' + ((router.asPath.indexOf(item.link) > -1) || (router.route === item.detailPageRoute) ? ' active' : '')}>
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MenuNavigation;
