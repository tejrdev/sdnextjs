import Aboutslider from '../../components/AboutUs/Aboutslider.js';
import HeadComponent from '../../components/HeadComponent';

export async function getStaticProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'about-screendollars');
  const SEOdata = await res.json();

  // about page static data
  let AboutData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/about_us_page/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  AboutData = await AboutData.json();

  return {
    props: { SEOdata, AboutData },
    revalidate: 10, // In seconds
  };
}

const AboutUS = ({ SEOdata, AboutData }) => {
  return (
    <>
      <HeadComponent data={SEOdata} />
      <div className='aboutus'>
        <div className='about_banner'>
          <div className='bnrimg'>
            <img src={AboutData.banner_img.url} alt='' />
          </div>
          {AboutData.banner_sub_title.length ? (
            <div className='container'>
              <p className='text-center'> {AboutData.banner_sub_title} </p>
            </div>
          ) : (
            ''
          )}
        </div>

        <section className='aboutintro secspace'>
          <div className='container'>
            <div className='aboutintro_box'>
              <div className='about_toptxt' dangerouslySetInnerHTML={{ __html: AboutData.banner_title }}></div>
            </div>
          </div>
        </section>

        {AboutData.sliders_about_content.map((item, index) => {
          return <Aboutslider data={item} key_val={index} key={index} />;
        })}

        <section className='team_info secspace'>
          <div className='container'>
            <div className='team_box'>
              <div className='teambox_toptxt'>
                <h3>{AboutData.team_members.title}</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: AboutData.team_members.content,
                  }}></div>
              </div>
              <div className='teambox_media  df fww'>
                {AboutData.team_members.team_member_data.map((item, index) => {
                  return (
                    <div className='tmmedia_box' key={index}>
                      <div className='tm_personimginfo'>
                        <img src={item.image.url} alt={item.title} />

                        <div className='tm_personinfo'>
                          <span className='prname'>{item.title}</span>
                          <span className='printro'>{item.designation}</span>
                          <a href={'mailto:' + item.email_id} className='personmail' title='Email Me'>
                            <i className='fas fa-envelope'></i>
                          </a>

                          {item.linkedin_link.url.length ? (
                            <a href={item.linkedin_link.url} className='personmail' title={item.linkedin_link.title} target='_blank'>
                              <i className='fab fa-linkedin-in' aria-hidden='true'></i>
                            </a>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUS;
