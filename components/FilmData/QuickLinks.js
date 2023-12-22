import Link from 'next/link';

const QuickLinks = ({ data }) => {
  return (
    <section className="rscalanderbox toplinesec">
      <div className="container">
        <div className="rscalbox_inner">
          <div className="top_txt df fww just-between">
            <h2 className="m-0">
              <strong>
                Quick Links <i className="far fa-angle-right"></i>
              </strong>
            </h2>
          </div>
          <ul className="df fww">
            {data.map((item, index) => {
              //console.log(item.href);
              return (
                <li key={index}>
                  <Link href={item.href.replace(process.env.NEXT_PUBLIC_MENU_URL1.replace('/wp', ''), '')} className="" title={item.name} target={item.target}>
                    <figure>
                      <img src={item.img} alt="" />
                    </figure>
                    <h6>{item.name}</h6>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
