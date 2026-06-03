import React, { useState } from 'react';

const CompareResults = ({ data }) => {
  const [ActiveTab, setActiveTab] = useState(1);
  return (
    <>
      <ul className='filter_tabs df fww '>
        {data.map((item, index) => {
          return (
            <li className={`tab_itemsall ${index === ActiveTab ? ' active' : ''} `} data-title={item.year} key={index} onClick={() => setActiveTab(index)}>
              {item.year}
            </li>
          );
        })}
      </ul>
      <div className='compare_tabbox tabsblock'>
        {data.map((item, index) => {
          return (
            <div className='filter_tabsdata' data-title={item.year} key={index} style={{ display: index === ActiveTab ? 'block' : 'none' }}>
              {item.year_data.no_data ? (
                <p>{item.year_data.no_data}</p>
              ) : (
                <>
                  <h4>Total Box Office</h4>

                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.year_data.total_box_office,
                    }}></p>
                  <h4>Top Openers</h4>
                  {item.year_data.top_openers.map((openers, id) => {
                    return (
                      <React.Fragment key={id}>
                        <h5>
                          <a href={openers.link} title={openers.title}>
                            {openers.title} <span>{'(' + openers.distibutor + ')'}</span>
                          </a>
                        </h5>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: openers.total_gross,
                          }}></p>
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
