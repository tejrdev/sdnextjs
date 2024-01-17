import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Pagination = ({ totalPages, setCurrentPage, requestFrom }) => {
  const router = useRouter();
  requestFrom = requestFrom || '';
  const [currentDistPage, setcurrentDistPage] = useState(1);

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const pageno = params.get('pageno');
    setTimeout(() => {
      if (pageno !== '' && pageno !== null) {
        setCurrentPage(pageno);
        setcurrentDistPage(pageno);
        $('#distibuotr-pagination .page-numbers[data-page="' + pageno + '"]').click();
      }
    }, 1000);
  }, []);
  const setDistributorPage = (e) => {
    const currPage = parseInt(e.target.attributes['data-page'].value);
    setCurrentPage(currPage);
    setcurrentDistPage(currPage);
    const elem = document.getElementsByClassName('alldist_list')[0];
    elem?.scrollIntoView({
      behavior: 'smooth',
    });

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const state = params.get('state');
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
  };
  const pages = Array.apply(null, Array(totalPages)).map(function (x, i) {
    return i;
  });
  const PrevClick = (e) => {
    setCurrentPage(currentDistPage - 1);
    setcurrentDistPage(currentDistPage - 1);
    const elem = document.getElementsByClassName('alldist_list')[0];
    elem?.scrollIntoView({
      behavior: 'smooth',
    });

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const state = params.get('state');
    router.replace(
      {
        query: { ...router.query, state: state, pageno: currentDistPage - 1 },
      },
      undefined,
      {
        scroll: false,
        shallow: true,
      }
    );
  };
  const NextClick = (e) => {
    setCurrentPage(currentDistPage + 1);
    setcurrentDistPage(currentDistPage + 1);
    const elem = document.getElementsByClassName('alldist_list')[0];
    elem?.scrollIntoView({
      behavior: 'smooth',
    });

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const state = params.get('state');
    router.replace(
      {
        query: { ...router.query, state: state, pageno: currentDistPage + 1 },
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
      <div id='distibuotr-pagination' className='text-center'>
        <nav className='navigation pagination' aria-label='Posts'>
          <span className='h2 screen-reader-text'>Posts navigation</span>
          {totalPages === 1 ? null : (
            <div className='nav-links'>
              {currentDistPage === 1 ? null : (
                <span className='prev page-numbers' onClick={PrevClick}>
                  Previous &lt;
                </span>
              )}

              {pages.map((item, index) => {
                const classname = currentDistPage === item + 1 ? 'page-numbers current' : 'page-numbers';
                if (index < 1 || totalPages < 11 || (currentDistPage < 6 && index < 9) || (index > currentDistPage - 6 && index < currentDistPage + 3) || index > totalPages - 2) {
                  return (
                    <span key={index} aria-current='page' className={classname} data-page={item + 1} onClick={setDistributorPage}>
                      <span className='meta-nav screen-reader-text'>Page </span>
                      {item + 1}
                    </span>
                  );
                } else {
                  if (index === currentDistPage - 6 || index === currentDistPage + 3 || (currentDistPage < 6 && index === totalPages - 2)) {
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
              {currentDistPage === totalPages ? null : (
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
          {currentDistPage} of {totalPages}
        </div>
      ) : null}
    </div>
  );
};

export default Pagination;
