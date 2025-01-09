import Link from 'next/link';
import { useRouter } from 'next/router';

const CategotyNavigation = ({ data }) => {
  const router = useRouter();
  return (
    <section className='cat_nav articel_dtlnav'>
      <div className='container'>
        <div className='cat_navbox'>
          <ul id='menu-articles' className='catnav_items df fww'>
            {data.map((item, index) => {
              const url = item.url.replace(process.env.NEXT_PUBLIC_MENU_URL1, '');
              return (
                <li key={index} className={'menu-item' + (router.asPath.indexOf(url) > -1 ? ' active' : '')}>
                  <Link href={url} title={item.title}>
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
