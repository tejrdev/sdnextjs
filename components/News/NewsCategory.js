import Link from 'next/link';
import { motion } from "motion/react"
import { FadeinUp } from '@/components/Anim/FadeinUp';
import Aritem from '../Article/Aritem';

const NewsCategory = ({ data }) => {
  return (
    <section className="newscatgegory mb-7 sm:mb-10">
      <div className="container">
        <motion.div variants={FadeinUp}
          initial="init"
          whileInView="anim"
          viewport={{ once: true }} className="top_txt flex flex-wrap justify-between items-start">
          <h2>
            <Link href={data.link.replace(process.env.NEXT_PUBLIC_BACKEND_URL, '')}>
              {data.title}
            </Link>
          </h2>
          <div className="viewmovrebtn">
            <Link href={data.link.replace(process.env.NEXT_PUBLIC_BACKEND_URL, '')} className="btn mb-3">
            View All
            </Link>
          </div>
        </motion.div>
        <motion.div variants={FadeinUp}
          initial="init"
          whileInView="anim"
          viewport={{ once: true }} className="newscatbox grid gap-4 md:gap-7 auto-fit-[300px]">
          {data.post_data &&
            data.post_data?.slice(0, 3).map((item, index) => {
              return (
                <Aritem key={index} item={item} figpadding='pb-[68%] xsm:pb-[62%] lg:pb-[70%]' newstag />
              );
            })}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsCategory;
