import { useState, useEffect } from 'react';
import Togglebtn from '@/components/All/Togglebtn';
import Link from 'next/link';

// const dataPlan = {
//    "individual": [
//       {
//          "duration": "Monthly",
//          "price": "$79.99",
//          "interval": "Month",
//          "btn": "try it for free",
//          "link": "#"
//       },
//       {
//          "duration": "Annual",
//          "saving": "38% savings",
//          "price": "$599.99",
//          "interval": "Year",
//          "btn": "try it for free",
//          "link": "#"
//       }
//    ],
//    "team": [
//       {
//          "duration": "Monthly team",
//          "price": "$790.99",
//          "interval": "Month",
//          "btn": "try it for free",
//          "link": "#"
//       },
//       {
//          "duration": "Annual",
//          "price": "$5990.99",
//          "interval": "Year",
//          "btn": "try it for free",
//          "link": "#"
//       }
//    ]
// }
export const Planselect = ({ activeprice }) => {
  const [toggleon, setToggleon] = useState(false);
  const [dataPlan, setDataPlan] = useState([]);
  const [planname, setPlanname] = useState('');
  const [annualSaving, setannualSaving] = useState('28% savings');
  const togglehandle = (e) => setToggleon(!toggleon);

  // useEffect(() => {
  //    toggleon ? setPlanname(dataPlan.team) : setPlanname(dataPlan.individual);
  // }, [toggleon]);
  const priceClick = (data) => activeprice(data);

  useEffect(() => {
    // Get Prices form stripe for subscription
    const getPriceList = async () => {
      const res = await fetch('/api/stripe/getPriceList', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await res.json();

      setDataPlan(response.ProductPrices.data.sort((a, b) => (a.recurring.interval == 'month' ? -1 : 1)));
      const def = response.ProductPrices.data.filter((a) => {
        return a.recurring.interval === 'month';
      });
      if (def.length) setPlanname(def[0].recurring.interval);
      // .then((data) => setClientSecret(data.clientSecret));
    };
    getPriceList();
  }, []);

  return (
    <div className='planselect'>
      {/* <Togglebtn toggleleft={'Individual'} toggleright={"Team"} ontoggle={togglehandle} /> */}
      <div className='planbox df fww just-between'>
        {dataPlan.map((item, i) => (
          <div
            className={'planboxitem ' + (item.recurring.interval === planname ? 'active' : '')}
            key={i}
            data-plan={item.nickname}
            data-price={item.unit_amount / 100}
            onClick={() => {
              setPlanname(item.recurring.interval);
              priceClick(item.unit_amount / 100);
            }}>
            <h3>
              {item.recurring.interval === 'month' ? 'Monthly' : 'Annual'} {item.recurring.interval === 'year' ? <span> {annualSaving}</span> : null}
            </h3>
            <div className='planprice' id={item.id}>
              <h2>${item.unit_amount / 100}</h2> / {item.recurring.interval}
            </div>
            {/* <Link href={item.link} className="cardcta ghostbtn goldbtn uppercase">{item.btn}</Link> */}
          </div>
        ))}
      </div>
    </div>
  );
};

const Paychoose = ({ align, choose }) => {
  return (
    <div className={'payopt ' + align}>
      <p>
        Get your <strong>30 day free trial</strong> which gives you <strong>full access</strong> to all of our features. <br /> Cancel anytime, no questions asked...
      </p>
      {choose && <h3>Choose your subscription.</h3>}
      <Planselect />
    </div>
  );
};

export default Paychoose;
