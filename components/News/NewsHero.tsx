import Link from 'next/link';
import Aritem from '../Article/Aritem';
import PostitemsLT from '../Article/PostitemsLT';

const NewsHero = ({ data, title = 'Movie Reviews', href = null }) => {
  if (!data || data.length === 0) return null;
  return (
    <section className='newshero'>
      <div className='container'>
        <div className='top_txt flex flex-wrap justify-between items-start mb-2'>
          <h2 className='sm:mr-2 w-full xsm:w-auto inline-block'>{title}</h2>
          {href && (
            <Link href={href} className='btn'>
              View All
            </Link>
          )}
        </div>
        <div className='newsherobox lg:flex gap-10 xl:gap-16 space-y-5 lg:space-y-0'>
          <div className='lg:flex-1'>{data?.[0] && <Aritem item={data[0]} newstag figpadding='pb-[62%] xsm:pb-[52%] lg:pb-[72%]' />}</div>
          <div className='lg:flex-1'>
            {data?.slice(1).slice(0, 3).map((item, index) => (
              <PostitemsLT key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsHero;
