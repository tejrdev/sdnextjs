import Link from 'next/link';
import PostitemsLT from './PostitemsLT';

const Latest_posts = ({ data, requestFrom, title, href = null }: { data?: any; requestFrom?: string; title?: string; href?: string | null }) => {
  return (
    <section className='Latest_posts'>
      <div className='container'>
        <div className='top_txt flex flex-wrap justify-between items-start mb-2'>
          <h2 className='sm:mr-2 w-full xsm:w-auto inline-block'>{title}</h2>
          {href && (
            <Link href={href} className='btn'>
              View All
            </Link>
          )}
        </div>
        <div className='ltpostitems lg:flex flex-wrap justify-between'>
          {data?.slice(0, 4).map((item, index) => (
            <PostitemsLT key={index} item={item} requestFrom={requestFrom} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Latest_posts;
