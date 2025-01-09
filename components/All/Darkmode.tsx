import { useEffect } from 'react'
import sun from '../../public/images/Light_dark.svg'
import moon from '../../public/images/moon.svg'

const Darkmode = () => {
   const toggleDarkMode = () => {
      document.querySelector('html')?.classList.toggle('dark');
   };

   useEffect(() => {
      const darkToggle = document.getElementById('dark-toggle');
      if (darkToggle) {
         darkToggle.addEventListener('click', toggleDarkMode);
      }

      // Cleanup the event listener on unmount
      return () => {
         if (darkToggle) {
            darkToggle.removeEventListener('click', toggleDarkMode);
         }
      };
   }, []);
   return (
      <div id="dark-toggle" className='dark:text-slate-50 right-3 2xl:right-4 fixed top-48 2xl:top-12 cursor-pointer z-20 bg-white dark:bg-black p-2 rounded-full'>
         <span title='Switch to light mode ' className='hidden dark:block'><img src={sun.src} alt='light' /></span>
         <span title='Switch to dark mode ' className='dark:hidden block'><img src={moon.src} alt='dark' /></span>
      </div>
   )
}

export default Darkmode