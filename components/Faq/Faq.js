import { Faqitems } from '@/pages/pro/faq'

const Faq = ({data}) => { 
  return (
    <section className="talentfaq toplinesec">
      <div className="container">
        <div className="top_txt">
          <h2>Frequently Asked Questions <i class="fal fa-angle-right"></i></h2>
        </div>
        <div className='faqinfobox'>
        {data.map((item, index) => {
            return (
              <Faqitems key={index} question={item.q} answer={item.a} />
            )
        })}

          
        </div>
      </div>
    </section>
  )
}

export default Faq