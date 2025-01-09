const Announcements = ({ data }) => {
  return (
    <div className='fmd_anaunses'>
      <h5>
        <strong>
          Announcements <i className='far fa-angle-right'></i>
        </strong>
      </h5>
      <div className='fmd_anaunseslist'>
        {data.map((item, index) => {
          return (
            <div className='fmd_anaunsesitem' key={index}>
              <div className='fmanaunce_media'>
                <a href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} className='df fww'>
                  <figure className='newslistmedia pvr'>
                    <img src={item.img} alt='' className='objctimg_box' />
                  </figure>
                  <span className='fmanaunce_mediatxt'>
                    <h6>
                      <strong
                        dangerouslySetInnerHTML={{
                          __html: item.title,
                        }}></strong>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: item.distributor_name,
                        }}></span>
                    </h6>
                    <p>{item.f_data}</p>
                    <p>
                      <em
                        dangerouslySetInnerHTML={{
                          __html: item.rating,
                        }}></em>
                    </p>
                  </span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Announcements;
