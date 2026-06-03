import Link from 'next/link';
import { useRouter } from 'next/router';
import { JSONData } from '@/components/shared/JSONData';

const MoviesMenuItems = JSONData.MoviesMenuItems;
const CategoryNavigation = () => {
  const router = useRouter();
  return (
    <section className='cat_nav'>
      <div className='container'>
        <div className='cat_navbox'>
          <div className='catnav_items'>
          <ul id='menu-film-data' className=' df fww m-0 p-0 list-none justify-start xl:justify-between '>
            {MoviesMenuItems.map((item, index) => {
              return (
                <li key={index} className={'menu-item ' + (router.asPath.indexOf(item.link) > -1 ? 'active' : '')}>
                  <Link href={item.link} title={item.title}>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryNavigation;
