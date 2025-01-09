const BoxOfficeEvents = ({ data }) => {
  return (
    <div className='eventweekinfo'>
      <div className='container'>
        <div className={'eventweekinfoin sm:flex flex-wrap pt-5 pb-1 border-t border-solid border-gray-500' + (data && data.length > 0 ? 'hasevent' : '')}>
          {data && data.length > 0 && (
            <>
              <h4 className='displayinline pr-0 sm:pr-5'>Events This Week: </h4>
              <ul className='flex flex-wrap m-0 list-none' id='event_data'>
                {data.map((item, index) => {
                  return (
                    <li className='flex flex-wrap w-[150px] leading-snug pb-2 pr-2' key={index}>
                      <div className='event_thumb max-w-24 mb-1'>{item.img && <img src={item.img} alt={item.title} />}</div>
                      <div className='event_title'>
                        <a href={item.link} target='_blank' className='text-black'>
                          <span dangerouslySetInnerHTML={{ __html: item.title }}></span>
                          <time>{' ' + item.event_date}</time>
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoxOfficeEvents;
