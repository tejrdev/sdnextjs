import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Pagination = ({ totalPages, setCurrentPage, requestFrom = '', currentPage }) => {
  const router = useRouter();
  requestFrom = requestFrom || '';

  const setDistributorPage = (e) => {
    const currPage = parseInt(e.target.attributes['data-page'].value);
    setCurrentPage(currPage);
    const elem = document.getElementsByClassName('alldist_list')[0];
    elem?.scrollIntoView({
      behavior: 'smooth',
    });

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const state = params.get('state') || '';
    if (state !== '') {
      router.replace(
        {
          query: { ...router.query, state: state, pageno: currPage },
        },
        undefined,
        {
          scroll: false,
          shallow: true,
        }
      );
    } else {
      router.replace(
        {
          query: { ...router.query, pageno: currPage },
        },
        undefined,
        {
          scroll: false,
          shallow: true,
        }
      );
    }
  };
  const pages = Array.apply(null, Array(totalPages)).map(function (x, i) {
    return i;
  });
  const PrevClick = (e) => {
    setCurrentPage(currentPage - 1);
    const elem = document.getElementsByClassName('alldist_list')[0];
    elem?.scrollIntoView({
      behavior: 'smooth',
    });

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const state = params.get('state');
    router.replace(
      {
        query: { ...router.query, state: state, pageno: currentPage - 1 },
      },
      undefined,
      {
        scroll: false,
        shallow: true,
      }
    );
  };
  const NextClick = (e) => {
    setCurrentPage(currentPage + 1);
    const elem = document.getElementsByClassName('alldist_list')[0];
    elem?.scrollIntoView({
      behavior: 'smooth',
    });

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const state = params.get('state');
    router.replace(
      {
        query: { ...router.query, state: state, pageno: currentPage + 1 },
      },
      undefined,
      {
        scroll: false,
        shallow: true,
      }
    );
  };

  return (
    <div className={'distfilm_pagenation ' + (requestFrom === '' ? 'df fww' : '')} id='distibuotr-pag-nav' style={requestFrom !== '' ? { width: '100%' } : null}>
      <div id={requestFrom === 'TopNavigation' ? 'top-navigation' : 'distibuotr-pagination'} className='text-center'>
        <nav className='navigation pagination' aria-label='Posts'>
          <span className='h2 screen-reader-text'>Posts navigation</span>
          {totalPages === 1 ? null : (
            <div className='nav-links'>
              {currentPage === 1 ? null : (
                <span className='prev page-numbers' onClick={PrevClick}>
                  Previous &lt;
                </span>
              )}

              {pages.map((item, index) => {
                const classname = currentPage === item + 1 ? 'page-numbers current' : 'page-numbers';
                if (index < 1 || totalPages < 11 || (currentPage < 6 && index < 9) || (index > currentPage - 6 && index < currentPage + 3) || index > totalPages - 2) {
                  return (
                    <span key={index} aria-current='page' className={classname} data-page={item + 1} onClick={setDistributorPage}>
                      <span className='meta-nav screen-reader-text'>Page </span>
                      {item + 1}
                    </span>
                  );
                } else {
                  if (index === currentPage - 6 || index === currentPage + 3 || (currentPage < 6 && index === totalPages - 2)) {
                    return (
                      <span className='page-numbers dots' key={index}>
                        …
                      </span>
                    );
                  } else {
                    return null;
                  }
                }
              })}
              {currentPage === totalPages ? null : (
                <span className='next page-numbers' onClick={NextClick}>
                  Next &gt;
                </span>
              )}
            </div>
          )}
        </nav>
      </div>
      {requestFrom === '' || requestFrom === 'Talent' ? (
        <div className='pageof'>
          {currentPage} of {totalPages}
        </div>
      ) : null}
    </div>
  );
};

export default Pagination;
