import { useState, useEffect, useRef, useCallback } from 'react';


const Boxofficetitle = ({ title, description }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const titleRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      setIsScrolled(rect.top <= 0);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);


  return (
    <div className={isScrolled ? 'box_title pt-4 md:pt-5 top-0 bg-white z-10 px-3 md:px-4' : 'box_title pt-4 md:pt-5'} ref={titleRef}>
      <div className='container'>
        <div className='boxtitleinweek text-center'>
          {/* <h1 className='block lg:inline-block align-top pvr pr-0 md:pr-14 pt-3 pb-4 transition-all duration-300 ease-out text-center'>{title}</h1> */}
          <h1 className="block lg:inline-block align-top pvr pr-0 lg:pt-3 transition-all duration-300 ease-out text-center">{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Boxofficetitle;
