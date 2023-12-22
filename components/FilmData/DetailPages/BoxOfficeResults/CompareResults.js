import React from 'react';

const CompareResults = ({ data }) => {
  return (
    <>
      <ul className="filter_tabs df fww ">
        {data.map((item, index) => {
          return (
            <li
              className={index === 1 ? 'tab_itemsall active' : 'tab_itemsall'}
              data-title={item.year}
              key={index}
            >
              {item.year}
            </li>
          );
        })}
      </ul>
      <div className="compare_tabbox tabsblock">
        {data.map((item, index) => {
          return (
            <div
              className="filter_tabsdata"
              data-title={item.year}
              key={index}
              style={{ display: index === 1 ? 'block' : 'none' }}
            >
              {item.year_data.no_data ? (
                <p>{item.year_data.no_data}</p>
              ) : (
                <>
                  <h4>Total Box Office</h4>

                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.year_data.total_box_office,
                    }}
                  ></p>
                  <h4>Top Openers</h4>
                  {item.year_data.top_openers.map((openers, id) => {
                    return (
                      <React.Fragment key={id}>
                        <h5>
                          <a href={openers.link} title={openers.title}>
                            {openers.title}{' '}
                            <span>{'(' + openers.distibutor + ')'}</span>
                          </a>
                        </h5>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: openers.total_gross,
                          }}
                        ></p>
                      </React.Fragment>
                    );
                  })}
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CompareResults;
