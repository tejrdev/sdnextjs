import Link from 'next/link';
import { motion } from "motion/react"
import { FadeinUp } from '@/components/Anim/FadeinUp';


const QuickLinks = ({ data }) => {
  return (
    <section className="rscalanderbox toplinesec">
      <div className="container">
        <div className="rscalbox_inner">
          <motion.div
            variants={FadeinUp}
            initial="init"
            whileInView="anim"
            viewport={{ once: true }}
            className="top_txt df fww just-between">
            <h2 className="m-0">
              <strong>
                Quick Links <i className="far fa-angle-right"></i>
              </strong>
            </h2>
          </motion.div>
          <motion.ul
            variants={FadeinUp}
            initial="init"
            whileInView="anim"
            viewport={{ once: true }}
            className="df fww gap-5">
            {data.map((item, index) => {
              //console.log(item.href);
              return (
                <li key={index}>
                  <Link href={item.href.trim()} className="" title={item.name} target={item.target}>
                    <figure>
                      <img src={item.img} alt="" />
                    </figure>
                    <h6>{item.name}</h6>
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
