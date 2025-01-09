import { Faqitems } from '@/pages/pro/faq';

const Faq = ({ data, center=false }) => {
  return (
    <section className='talentfaq toplinesec' id='faqs'>
      <div className='container'>
        <div className={'top_txt' + center && 'text-center capitalize'}>
          <h2>Frequently Asked Questions {center ? '' : <i className='fal fa-angle-right'></i>}</h2>
        </div>
        <div className='faqinfobox mt-4'>
          {data.map((item, index) => {
            return <Faqitems key={index} question={item.q ? item.q : item.ttile ? item.ttile : item.title} answer={item.a ? item.a : item.content} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
