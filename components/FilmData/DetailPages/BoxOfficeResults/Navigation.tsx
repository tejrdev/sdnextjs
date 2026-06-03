import Link from 'next/link';
import { useRouter } from 'next/router';
import { JSONData } from '@/components/shared/JSONData';

// const box_office_menu = JSONData.BoxOfficeResultsMenuItems;

const BoxOfficeResultsNavigation = () => {
  const router = useRouter();

  const isActive = (itemLink: string) => {
    // Get the pathname without query parameters
    const pathname = router.asPath.split('?')[0];

    // Handle "Selected Week" - should only match exact path or paths with year/week parameters
    if (itemLink === '/box-office-results/') {
      // Match exact path or paths like /box-office-results/?year=2024&week=1
      return pathname === '/box-office-results' ||
        pathname === '/box-office-results/' ||
        (pathname.startsWith('/box-office-results/') &&
          !pathname.includes('/highest-grossing-movies/202') &&
          !pathname.includes('/yearly-totals') &&
          !pathname.includes('/highest-grossing') &&
          !pathname.includes('/quarterly-top-movies'));
    }



    // Handle "Selected Year" - check if current path matches the pattern with any year
    if (itemLink.includes('/box-office-results/highest-grossing-movies/')) {

      if (pathname === itemLink) return true;

      // Handle "Yearly Top" - check if current path matches the pattern with any year
      if (itemLink.includes('/box-office-results/highest-grossing-movies/mpaa-ratings/')) {
        return /\/box-office-results\/highest-grossing-movies\/mpaa-ratings\/[A-Z0-9-]+\/\d{4}\//.test(pathname);
      }

      // Handle "Quarterly Top" - check if current path matches the pattern with any year and quarter
      if (itemLink.includes('/box-office-results/highest-grossing-movies/quarterly/')) {
        return /\/box-office-results\/highest-grossing-movies\/quarterly\/\d{4}\/Q[1-4]\//.test(pathname);
      }

      if (itemLink !== '/box-office-results/highest-grossing-movies/' && itemLink !== '/box-office-results/highest-grossing-movies/all-time/') {
        return /\/box-office-results\/highest-grossing-movies\/\d{4}\//.test(pathname);
      }
    }


    // For other menu items, use exact path matching (without query parameters)
    return pathname === itemLink;
  };

  return (
    <section className='cat_nav'>
      <div className='container'>
        <div className='cat_navbox'>
          <ul id='menu-film-data' className='catnav_items df fww'>
            {/* {box_office_menu.map((item, index) => {
              return (
                <li key={index} className={'menu-item ' + (isActive(item.link) ? 'active' : '')}>
                  <Link href={item.link} title={item.title}>
                    {item.title}
                  </Link>
                </li>
              );
            })} */}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BoxOfficeResultsNavigation;
