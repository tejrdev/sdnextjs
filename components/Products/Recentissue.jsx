import Image from 'next/image';
import Link from 'next/link';
import { HiArrowNarrowRight } from 'react-icons/hi';
import Projectionvideo from '@/public/pro/projectionvideo.jpg';
import Playicov2 from '@/public/images/playicov2.png';
import newslettersun from '@/public/pro/newslettersun.png';
import newsletterwed from '@/public/pro/newsletterwed.png';
import newsletterfri from '@/public/pro/newsletterfri.png';
import q3news from '@/public/pro/q3news.png';
import q2news from '@/public/pro/q2news.png';
import newslast from '@/public/pro/newslast.png';
import CallToAction from '../Pro/CallToAction';

export const Postercta = ({ btn, data, download }) => {
  return (
    <div className={'rsitem text-center ' + (data.var ? data.var : '')}>
      <figure>
        <span className='pvr'>
          <Image src={data.poster_thumbnail ? data.poster_thumbnail : data.media} className='objctimg_box' alt='' width={282} height={398} />
        </span>
        {data.title && (
          <figcaption className='uppercase'>
            <strong>{data.title}</strong>
          </figcaption>
        )}
      </figure>
      <Link href={data.link + '#advanced'} className='btn uppercase' download={download}>
        {btn} <HiArrowNarrowRight />
      </Link>
    </div>
  );
};

const Recentissue = ({ data, user, ProInd, requestFrom }) => {
  const sunletter = {
    'media': 'https://tejrdev.github.io/api/apisrc/fourabtsld.jpg',
    'title': 'Sun - Newsletter  (PDF)',
    'link': '#',
  };

  return (
    // <section className="recentissue secspace">
    //    <div className="container">
    //       <div className="top_txt text-center">
    //          <h2 className="uppercase">Browse the latest</h2>
    //       </div>
    //       <div className="rsiboxinfo df fww">
    //          <div className="rspronewsleter">
    //             <h3 className="uppercase">{data.pro_newsletter.title}</h3>
    //             <div className="rsibox grid gap16">
    //             {/* <Postercta btn={"download sample"} data={sunletter} download/> */}

    //                {data.pro_newsletter.newsletter_data.map((item, i) =>
    //                   <div className={"rsitem text-center pvr"} key={i}>
    //                   <figure>
    //                      <span className="">
    //                         <Image src={item.image} className="" alt="" width={282} height={398} /></span>
    //                      {item.title && <figcaption className="uppercase"><strong>{item.title}</strong></figcaption>}
    //                   </figure>
    //                   {item.cta_text ? (
    //                      <span className='btncta'><Link href={item.cta_link} className="btn uppercase" download>{'Download Sample'} <HiArrowNarrowRight /></Link></span>
    //                   ) :(
    //                      <span className='btncta'><Link href={item.cta_link} className="btn uppercase">{'view recent'} <HiArrowNarrowRight /></Link></span>
    //                   )}
    //                </div>
    //                )}
    //             </div>
    //          </div>
    //          <div className="rsprospecialproject">
    //             <div className="prospecialreport">
    //                <h3 className="uppercase">special reports</h3>
    //                <div className="rsibox grid gap16">
    //                   {data.special_reports.pro_special_reports.map((item, i) =>
    //                       <div className={"rsitem text-center pvr"} key={i}>
    //                         <figure>
    //                            <span className="">
    //                               <Image src={item.image} className="" alt="" width={282} height={398} /></span>
    //                            {item.title && <figcaption className="uppercase"><strong>{item.title}</strong></figcaption>}
    //                         </figure>
    //                         <span className='btncta'><Link href={item.cta_link} target="_blank" className="btn uppercase">{'view recent'} <HiArrowNarrowRight /></Link></span>
    //                      </div>
    //                   )}
    //                </div>
    //             </div>
    //             <div className="projtionroom commingsoon">
    //                <h3 className="uppercase">the Projection room  <small><strong><em>COMING SOON</em></strong></small></h3>
    //                <div className="pgroom df fww">
    //                   <figure className="pvr videolink">
    //                      <Link href={"#"}>
    //                         <span className="playico"><Image src={Playicov2} alt="play" width={30} height={34} /></span>
    //                         <Image src={Projectionvideo} className="objctimg_box" alt="" width={588} height={333} />
    //                      </Link>
    //                   </figure>
    //                   <div className="productlistinfo">
    //                      <p className="pgrdetail">•	Every Tuesday, Screendollars PRO subscribers can join Screendollars’ experts in The Projection Room for a live discussion of the upcoming box office forecast, title by title and week by week.</p>
    //                         <p><strong>Tue - Projection Room [Pro]</strong></p>
    //                      {/* <div className="morebtn"><Link href={"#"} className="btn goldbtn uppercase">view  more <HiArrowNarrowRight /></Link></div> */}
    //                   </div>
    //                </div>
    //             </div>
    //          </div>
    //       </div>
    //    </div>
    // </section>
    <>
      <section className='latestissue secspace'>
        <div className='container'>
          <div className='seclinespace'>
            <div className='top_txt text-center'>
              <h2>{data.check_out_the_latest}</h2>
            </div>
          </div>
          {data.check_out_the_latest_data.map((item, index) => {
            return <Issues title={item.title} issuedata={item.items} key={index} />;
          })}
          {requestFrom !== 'thankyou-page' ? <CallToAction user={user} ProInd={ProInd} extraClass='text-center' /> : null}
        </div>
      </section>
    </>
  );
};

export const Issues = ({ title, issuedata }) => {
  return (
    <div className='text-center secrowtitle'>
      <h3 className='uppercase'>{title}</h3>
      <div className='secissues df fww'>
        {issuedata.map((item, index) => {
          return (
            <div className='issueitems pvr' key={index}>
              <Link href={item.link}>
                <Image src={item.image} alt={'newsletters'} width={500} height={125} />
                <div className='btncta'>
                  <span className='btn uppercase'>
                    {'view recent'}
                    <HiArrowNarrowRight />
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recentissue;
