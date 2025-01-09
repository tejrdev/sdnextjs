import React from 'react';
import Link from 'next/link';

function Headlines({ data, tag }) {
  return (
    <>
      {data &&
        data.map((item, id) => {
          if (tag === 'quick_links') {
            item = item.link;
            if (!item) return;
          }

          let title = item.title;
          let length = 0;
          tag === 'headline' ? (length = 67) : (length = 27);
          if (title.length > length) title = title.substr(0, length) + '...';
          return (
            <React.Fragment key={id}>
              {id < 6 ? (
                <p>
                  <Link href={item.link ? item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '') : item.url.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} target='_blank' rel='noreferrer' className='blacktxt'>
                    {(item.upcoming ? item.upcoming : '') + '' + title}
                  </Link>
                </p>
              ) : null}
            </React.Fragment>
          );
        })}
    </>
  );
}

export default Headlines;
