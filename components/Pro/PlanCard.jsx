const PlanCard = ({ id, title, price, pricespan, children, btn, goldcard = false, btnEvent, annualSaving }) => {
  return (
    <div id={id} className={'planboxitem pointer ' + (goldcard ? 'goldcard' : '')} data-plan={pricespan} data-price={price}>
      <h3>
        {title} {pricespan === 'year' ? <span> {annualSaving}</span> : null}
      </h3>
      <div className='planprice'>
        <h2>${price}</h2> {'/' + pricespan}
      </div>
      {children}
      {btn && <button className='btn uppercase w100' onClick={btnEvent}> {btn} </button>}
    </div>
  );
};

export default PlanCard;
