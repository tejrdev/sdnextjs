import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import Link from 'next/link';

const Counter = ({ data, requestFrom }) => {
  const [startCount, setStartCount] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      setStartCount(true);
    }
  }, [inView]);

  return (
    <section className='counter'>
      <div className='container'>
        <div className='counterbox grid '>
          {data.map((item, index) => {
            const isBOxOffice = item.name.toUpperCase() === 'DOMESTIC BOX OFFICE';
            const suffix = isBOxOffice ? 'B+' : '';
            const prefix = isBOxOffice ? '$' : '';
            return (
              <div className='counteritem' key={index} ref={ref}>
                {startCount &&
                  (requestFrom === 'directory' ? (
                    <Link href={'/directory/' + item.name.toLowerCase().replace(/ /g, '-')} className='text-black'>
                      <div className='h1'>
                        <CountUp start={100} end={parseInt(item.count)} duration={3} suffix={suffix} prefix={prefix} separator=',' />
                      </div>
                      <div className='countname uppercase'>{item.name}</div>
                    </Link>
                  ) : (
                    <>
                      <div className='h1'>
                        <CountUp start={item.countstart} end={item.countend} duration={3} suffix={suffix} prefix={prefix} separator=',' />
                      </div>
                      <div className='countname uppercase'>{item.name}</div>
                    </>
                  ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Counter;
