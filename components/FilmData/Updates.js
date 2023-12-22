import Announcements from './Announcements';
import Headlines from './Headlines';
import Media from './Media';

const Updates = ({ data }) => {
  return (
    <section className="film_updates">
      <div className="container">
        <div className="seclinespace">
          <div className="top_txt df fww just-between">
            <div className="secnav df fww">
              <h2>                
                  Media  <i className="fal fa-angle-right"></i>
              </h2>
              {/* {<ul id="menu-film-data" className="distcat_name df fww">
                {data.Updates_menu.map((item, index) => {
                  return (
                    <li key={index} className="menu-item menu-item-type-post_type menu-item-object-page ">
                      <a title={item.attr_title} href={item.url.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>} */}
            </div>
          </div>
          <div className="film_updatesbox df fww">
            {/* {<Announcements data={data.announcements} />} */}
            <Media videos={data.media_section_video} images={data.media_section_imgs} />
            <Headlines data={data.headlines_data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Updates;
