import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import quorum from '@/public/quorum.png';
import Image from 'next/image';

const DetaildailChart = ({ data, advticket = false }) => {
  const [isClient, setIsClient] = useState(false);
  const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
  useEffect(() => {
    setIsClient(true);
  }, []);
  !isClient && null; // Return null if rendering on the server-side

  const dailchartData = {
    series: [data.topticketPersent.toFixed()],
    options: {
      chart: {
        type: 'radialBar',
        offsetY: -20,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#e7e7e7',
            strokeWidth: '97%',
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: 2,
              left: 0,
              color: '#999',
              opacity: 1,
              blur: 2,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: '22px',
            },
          },
        },
      },
      grid: {
        padding: {
          top: -10,
        },
      },
      fill: {
        type: 'solid',
        colors: `${data.dailercolor}`,
      },
      labels: ['Average Results'],
    },
  };
  return (
    <>
      <div className={'chartheadtop ' + (advticket ? 'text-center' : 'df fww just-between')}>
        <div className='proex'>
          <h4 className='protag uppercase'>
            <strong>pro exclusive</strong>
          </h4>
        </div>
        {/* {!advticket && (
          <div className='brandingpartner df fww'>
            <p>in partnership with</p>
            <figure className='text-center'>
              <Image src={quorum} alt='screendollars logo' width={226} height={73} />
            </figure>
          </div>
        )} */}
      </div>
      <div className='dailchart df fww'>
        <div className='dailchartart text-center'>
          <ReactApexChart options={dailchartData.options} series={dailchartData.series} type='radialBar' height={250} className='radialchart' />
        </div>
        <div className='dailchartinfo'>
          <h5>
            <strong>{data.dialername}</strong>
          </h5>
          <div className='dailchartinfobox' dangerouslySetInnerHTML={{ __html: data.dailerinfo }}></div>
        </div>
      </div>
    </>
  );
};

export default DetaildailChart;
