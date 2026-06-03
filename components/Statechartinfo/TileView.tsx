import { useState } from 'react';
import Link from 'next/link';

const TileView = ({ requestFrom, DisplayBy = '', selectedYear = '', tabledata, tableConfig }) => {
  const [ShowAll, setShowAll] = useState(false);
  const [viewbtn, setViewbtn] = useState(true);

  const renderFieldContent = (item, config) => {
    switch (config.key) {
      case 'market':
        return `${item[config.key]}%`;
      case 'box_office':
        return `$${item.box_office.toLocaleString()}`;
      case 'headquaters':
        return DisplayBy === 'exhibitors'
          ? item.headquaters
          : item.top_exhi?.slice(0, 3).map((exhibitor, id) => (
              <Link key={id} href={exhibitor.url}>
                {id === 0 ? ' ' : ', '}
                {exhibitor.title}
              </Link>
            ));
      default:
        return item[config.key];
    }
  };

  return (
    <>
      <div className='tilecontent grid gap-4 auto-fill-[292px]'>
        {(ShowAll ? tabledata : tabledata?.slice(0, 12))?.map((item, index) => (
          <div className='griditem border border-gray-400 rounded-md py-3 px-1' key={index}>
            {tableConfig.map((config, fieldIndex) => (
              <p key={fieldIndex} className={config.key === 'headquaters' ? 'flex flex-wrap mb-0' : config.key === 'title' ? '' : 'flex justify-between'}>
                <label className='px-2' htmlFor=''>
                  {config.title}
                </label>
                <span className={config.key === 'headquaters' ? 'px-2 ml-auto inline-block align-top text-right' : config.key === 'title' ? 'px-2 ml-auto inline-block w-full' : 'px-2 ml-auto'}>
                  <strong {...(config.key === 'box_office' && { suppressHydrationWarning: true })}>{renderFieldContent(item, config)}</strong>
                </span>
              </p>
            ))}
          </div>
        ))}
      </div>
      {tabledata.length > 16 && (
        <div className={`text-center my-5 ${!viewbtn ? 'sticky bottom-0 bg-white py-2 bg-opacity-85 border-t border-gray-200' : ''}`}>
          <button
            className='btn'
            onClick={() => {
              setShowAll(!ShowAll);
              setViewbtn(!viewbtn);
            }}>
            {viewbtn ? 'View All' : 'Show Less'}
          </button>
        </div>
      )}
    </>
  );
};

export default TileView;
