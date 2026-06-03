import Announcements from './Announcements';
import Headlines from './Headlines';
import Media from './Media';

import { motion } from "motion/react"
import { FadeinUp } from '@/components/Anim/FadeinUp';

const Updates = ({ data }) => {
  return (
    <section className="film_updates">
      <div className="container">
        <div className="seclinespace">
          <motion.div
            variants={FadeinUp}
            initial="init"
            whileInView="anim"
            viewport={{ once: true }} className="top_txt df fww just-between">
            <div className="secnav df fww">
              <h2>
                Media  <i className="fal fa-angle-right"></i>
              </h2>
            </div>
          </motion.div>
          <div className="film_updatesbox df fww">
            {/* {<Announcements data={data.announcements} />} */}
            <Media videos={data.media_section_video} images={data.media_section_imgs} />
            <Headlines data={data.headlines_data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Updates;
