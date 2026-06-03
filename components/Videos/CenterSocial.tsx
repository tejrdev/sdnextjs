import YT from '../../public/images/YoutubeLogo.svg'
import Xtwt from '../../public/images/XLogo.svg'
import Insta from '../../public/images/InstagramLogo.svg'
import FB from '../../public/images/FacebookLogo.svg'
import IN from '../../public/images/LinkedinLogo.svg'
import { motion } from "motion/react"
import { FadeinUp } from '@/components/Anim/FadeinUp';


const CenterSocial = () => {
   return (
      <div className='centersocial pt-9 sm:pt-10 md:pt-11 pb-3 sm:pb-4 '>
         <div className="container">
            <motion.div variants={FadeinUp}
               initial="init"
               whileInView="anim"
               viewport={{ once: true }}
               className="top_txt">
               <h2 className='text-center dark:text-white leading-snug'>Follow us for <br /> everyday updates from Hollywood.</h2>
            </motion.div>
            <motion.ul
               variants={FadeinUp}
               initial="init"
               whileInView="anim"
               viewport={{ once: true }}
               className='flex list-none justify-center space-x-2 md:space-x-8 mt-6'>
               <li><a href="https://www.youtube.com/c/Screendollars"><img src={YT.src} alt="" /></a></li>
               <li><a href="https://twitter.com/screendollars"><img src={Xtwt.src} alt="" /></a></li>
               <li><a href="https://www.instagram.com/screendollars/"><img src={Insta.src} alt="" /></a></li>
               <li><a href="https://www.facebook.com/Screendollars-112268833968674/?modal=admin_todo_tour"><img src={FB.src} alt="" /></a></li>
               <li><a href="#"><img src={IN.src} alt="" /></a></li>
            </motion.ul>
         </div>
      </div>
   )
}

export default CenterSocial

