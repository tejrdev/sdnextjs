import { useState, useEffect } from 'react';
const annualSaving = '28% savings';
import PlanCard from '@/components/Pro/PlanCard';

const PlanOptions = ({ planClickEvent }) => {
  const [selectedPlan, setSelectedPlan] = useState('month');
  const [PlanOptions, setPlanOptions] = useState([]);
  useEffect(() => {
    const getPriceList = async () => {
      const res = await fetch('/api/stripe/getPriceList', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productKey: process.env.NEXT_PUBLIC_STRIPE_PRO_PRODUCT_KEY }),
      });
      const response = await res.json();
      setPlanOptions(response.ProductPrices.data.sort((a, b) => (a.recurring.interval == 'month' ? -1 : 1)));
    };
    getPriceList();
  }, []);

  const changePlan = (e) => {
    // document.querySelector('.planboxitem.goldcard').classList.remove('goldcard');
    // e.target.closest('.planboxitem').classList.add('goldcard');
    const plan = e.target.closest('.planboxitem').getAttribute('data-plan');
    setSelectedPlan(plan);
  };

  return (
    <section className='planeselection'>
      <div className='container'>
        <div className='proplaninfo grid'>
          {PlanOptions.map((item, i) => (
            <div key={i} onClick={changePlan}>
              <PlanCard id={item.id} title={item.recurring.interval === 'month' ? 'Monthly' : 'Annual'} price={item.unit_amount / 100} pricespan={item.recurring.interval} btn={'select plan'} goldcard={item.recurring.interval === selectedPlan ? 1 : 0} btnEvent={planClickEvent} annualSaving={annualSaving} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanOptions;
