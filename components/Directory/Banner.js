import { motion } from "motion/react"
import { FadeinUp } from '@/components/Anim/FadeinUp';


function Banner({ data }) {
  return (
    <section className='dirctorybnr  mt-11 sm:mt-15'>
      <div className='container'>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='top_txt text-center mx-auto max-w-screen-lg'>
          <h1 className="mb-5">{data.banner_title}</h1>
          {/* <p> Your company may already be listed.</p>
          <a href='#srchlisting' className='btn capz my-3 sm:my-5 sm:mb-8'>
            Search for your listing
          </a> */}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className='dirheromedia mx-auto max-w-4xl'>
          <img src={data.banner_img_bg} alt='' />
        </motion.div>
      </div>
    </section>
  );
}

export default Banner;
