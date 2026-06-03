import Aritem from '../Article/Aritem';
import { motion } from "motion/react"
import { FadeinUp } from '@/components/Anim/FadeinUp';

const Headlines = ({ data }) => {
  return (
    <section className="newshedline mt-7 sm:mt-10 mb-7 sm:mb-10">
      <div className="container">
        <motion.div variants={FadeinUp}
          initial="init"
          whileInView="anim"
          viewport={{ once: true }}
          className="top_txt df fww just-between">
          <h2>
            <a href={data.link.replace(process.env.NEXT_PUBLIC_BACKEND_URL, '')}>
              Headlines 
            </a>
          </h2>
          <div className="viewmovrebtn">
            <a href={data.link.replace(process.env.NEXT_PUBLIC_BACKEND_URL, '')} className="btn goldbtn">
              View More
            </a>
          </div>
        </motion.div>
        <div className="newscatbox grid gap-4 md:gap-7 auto-fit-[300px]">
          {data.data &&
            data.data?.slice(0, 3).map((item, index) => {
              return (
                <motion.div variants={FadeinUp}
                  initial="init"
                  whileInView="anim"
                  viewport={{ once: true }}
                  className="" key={index}>
                  <Aritem item={item} key={index} figpadding='pb-[68%] xsm:pb-[62%] lg:pb-[70%]' newstag />
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Headlines;
