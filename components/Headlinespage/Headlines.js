import Link from 'next/link';
import Image from 'next/image';


/*export default function Home(props) {
  const posts = props.posts;
  return (
    <div style={{ padding: 30 }}>
      <Head>
        <title>Sling Academy</title>
      </Head>
      <div>
        {posts.map(post =>
          <div
            key={post.id}
            style={{ padding: 20, borderBottom: '1px solid #ccc' }}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>)}
      </div>
    </div>
  )
}

*/


const Headerpagenews = ({ data , tag , index }) => {
    return (
         <div className={"newsline_item " + data.class}>
         {/*{console.log(data)}*/}
            <div className="newaline_inner df fww">
                  {(data.class === 'sdnewsbox') ? (
                     <a href={"#newsheropop-" + index}  className={"df fww " + data.popclass } target='_blank'>

                        <figure className="pvr">
                           <Image src={data.img} width="1280"height="680"alt=""className="objctimg_box"/>
                        </figure>
                        <div className="newsline_iteminfo">
                           <h5>{data.title}</h5>
                        <div className="fmupdate_boxaurthor">
                           <div className="bgimage"style={{background: `url(${data.source_icon})`, }} ></div>
                           <span>
                              {data.source}{' '}
                               {data.date_time}
                           </span>
                        </div>
                        </div>
                     </a>) : (
                     <>
                        <figure className="pvr">
                     <Link href={data.link}  className="df fww" scroll={false} target='_blank'>
                           <Image src={data.img} width="1280"height="680"alt=""className="objctimg_box"/>
                           </Link>
                        </figure>

                        <div className="newsline_iteminfo">
                           <h5> <Link href={data.link}  className="df fww" scroll={false} target='_blank'>{data.title}</Link></h5>                           
                        <div className="fmupdate_boxaurthor">
                         <a href={data.source_url}  className="" scroll={false} target='_blank'>
                           <div
                              className="bgimage"
                              style={{
                                 background: `url(${data.source_icon})`,
                              }}
                           ></div>
                           <span className="mediasrc">{data.source}</span></a>
                           <span>&nbsp;&nbsp; {data.date_time}</span>
                        </div>
                        </div>
                        </>
                  )}
               {(data.class === 'sdnewsbox') ? (
                  <div id={"newsheropop-" + index} className="white-popup-block vend_Contact  newsuppopbox mfp-hide">
                      <div className="sdnewspop" >
                        <figure className="pvr">
                          <Image src={data.img} width="454" height="260" alt="" className="objctimg_box"/>
                        </figure>
                        <h4>{data.title}</h4>
                        <div className="srcdate">
                        <span>
                            <div className="bgimage" 
                            style={{background: `url(${data.source_icon})`}}></div>
                            {data.source} ,{' '} {data.date_time}  </span>
                        </div>
                        <div className="newsinfopoptxt" dangerouslySetInnerHTML={{
                                __html: data.popinfo}}>
                        
                        </div>
                      </div>
                  </div>
                ) : (" ")}
            </div>
         </div>
      )
}


export default Headerpagenews