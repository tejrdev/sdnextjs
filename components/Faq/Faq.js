import { Faqitems } from '@/pages/pro/faq';

import { motion } from "motion/react"
import { FadeinUp } from '@/components/Anim/FadeinUp';


const Faq = ({ data, center = false }) => {
  return (
    <section className='talentfaq toplinesec' id='faqs'>
      <div className='container'>
        <motion.div
          variants={FadeinUp}
          initial="init"
          whileInView="anim"
          viewport={{ once: true }}
          className={'top_txt capitalize ' + (center && 'text-center')}>
          <h2>Frequently Asked Questions {center ? '' : <i className='fal fa-angle-right'></i>}</h2>
        </motion.div>
        <motion.div
          variants={FadeinUp}
          initial="init"
          whileInView="anim"
          viewport={{ once: true }}
          className='faqinfobox mt-4'>
          {data.map((item, index) => {
            return <Faqitems key={index} question={item.q ? item.q : item.ttile ? item.ttile : item.question ? item.question : item.title} answer={item.a ? item.a : item.answer ? item.answer : item.content} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;
