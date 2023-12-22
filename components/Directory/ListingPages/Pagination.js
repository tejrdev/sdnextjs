import { useState } from "react";

const Pagination = ({ totalPages, setCurrentPage, requestFrom }) => {
  requestFrom = requestFrom || "";
  const [currentDistPage, setcurrentDistPage] = useState(1);

  const setDistributorPage = (e) => {
    const currPage = parseInt(e.target.attributes["data-page"].value);
    setCurrentPage(currPage);
    setcurrentDistPage(currPage);
  };
  const pages = Array.apply(null, Array(totalPages)).map(function (x, i) {
    return i;
  });
  const PrevClick = (e) => {
    setCurrentPage(currentDistPage - 1);
    setcurrentDistPage(currentDistPage - 1);
  };
  const NextClick = (e) => {
    setCurrentPage(currentDistPage + 1);
    setcurrentDistPage(currentDistPage + 1);
  };

  return (
    <div className={"distfilm_pagenation " + (requestFrom === "" ? "df fww" : "")} id='distibuotr-pag-nav' style={requestFrom !== "" ? { width: "100%" } : null}>
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
                const classname = currentDistPage === item + 1 ? "page-numbers current" : "page-numbers";
                if (index < 2 || (index > currentDistPage - 5 && index < currentDistPage + 3) || index > totalPages - 3) {
                  return (
                    <span key={index} aria-current='page' className={classname} data-page={item + 1} onClick={setDistributorPage}>
                      <span className='meta-nav screen-reader-text'>Page </span>
                      {item + 1}
                    </span>
                  );
                } else {
                  if (index === currentDistPage - 5 || index === currentDistPage + 3) {
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
      {requestFrom === "" || requestFrom === "Talent" ? (
        <div className='pageof'>
          {currentDistPage} of {totalPages}
        </div>
      ) : null}
    </div>
  );
};

export default Pagination;
