import Link from 'next/link';
import { useRouter } from 'next/router';
import TopSearch from './TopSearch';

function MainMenu({ data }) {
  const router = useRouter();
  /*console.log(data);*/
  function getCurrentQuarter() {
    const month = new Date().getMonth(); // Get the current month (0-11)

    if (month >= 0 && month <= 2) {
      return 'Q1'; // Q1: January to March
    } else if (month >= 3 && month <= 5) {
      return 'Q2'; // Q2: April to June
    } else if (month >= 6 && month <= 8) {
      return 'Q3'; // Q3: July to September
    } else {
      return 'Q4'; // Q4: October to December
    }
  }
  /*console.log(data);
  console.log('router.asPath', router.asPath);
  data.main_menu[1].sub_menu_items[1].url = '/box-office/totals/2025/Q3/';*/
  return (
    <ul id='menu-main-menu' className='primary-menu enumenu_ul desk'>
      {data.main_menu.map((item, id) => {
        const isActive = item.url === '/' ? router.asPath === '/' : router.asPath.indexOf(item.url) > -1;
        return (
          <li className={isActive ? ' active navitem' : 'navitem'} key={id}>
            <Link href={item.url} className={item?.sub_menu_items?.length > 0 ? 'menubelow' : ''}>
              <span className='dark:text-slate-50 uppercase'>{item.title}</span>
              {item?.sub_menu_items?.length > 0 && <i className='fa fa-caret-down ml-2 deskarrow'></i>}
            </Link>
            {item?.sub_menu_items?.length > 0 && <ul className='sub-menu sb-menu top-[100%]'>
              {item?.sub_menu_items?.map((child, index) => {
                return (
                  <li key={index} className={router.asPath === child.url || router.asPath.includes(child.url) ? ' activeitem' : ''}>
                    <Link href={child?.url} className={'relative ' + (child?.sub_sub_menu_items?.length > 0 ? 'menubelow' : '')}>
                      <span className='dark:text-slate-50 capitalize'>{child?.title}</span>
                      {child?.sub_sub_menu_items?.length > 0 && <i className='fa fa-caret-right ml-2 absolute right-1 top-2'></i>}
                    </Link>
                    {child?.sub_sub_menu_items?.length > 0 && <ul className='sub-sub-menu sb-sub-menu left-48 top-0'>
                      {child?.sub_sub_menu_items?.map((sub_sub_child, index) => (
                        /* console.log('router.asPath', router.asPath, 'sub_sub_child', sub_sub_child, router.asPath === sub_sub_child.url),*/
                        <li key={index} className={router.asPath === sub_sub_child.url ? ' activeitem' : ''}>
                          <Link href={sub_sub_child?.url}>
                            <span className='dark:text-slate-50 capitalize'>{sub_sub_child?.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>}
                  </li>
                )
              })}
            </ul>}
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
