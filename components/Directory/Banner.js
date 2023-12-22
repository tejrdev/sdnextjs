import Link from 'next/link';

function Banner({ data }) {
  return (
    <section className="directory_banner">
      <div className="dirctorybnr_slidewrap">
        <div className="dirctorybnr_slider">
          <div className="dirbnr_sliditem">
            <figure className="pvr">
              <img src={data.banner_img_bg} alt="" className="objctimg_box" />
            </figure>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flmsearch_in">
          <div className="filmdirect_searchbox">
            <div className="filmdir_searchbar dirtite df fww">
              <figure>
                <img src={data.directory_image} alt="" />
              </figure>
            </div>
            <ul id="menu-directory" className="df fww srchbtm_bar">
              <li id="menu-item-1092" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-first menu-item-1092">
                <Link href="/directory/distributors/">Distributors</Link>
              </li>
              <li id="menu-item-268" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-268">
                <Link href="/directory/exhibitors/">Exhibitors</Link>
              </li>
              <li id="menu-item-66139" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-66139">
                <Link href="/directory/theatres/">Theatres</Link>
              </li>
              <li id="menu-item-269" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-269">
                <Link href="/directory/vendors/">Vendors</Link>
              </li>
              <li id="menu-item-270" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-270">
                <Link href="/directory/film-festivals/">Film Festivals</Link>
              </li>
              <li id="menu-item-271" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-last menu-item-271">
                <Link href="/directory/calendar-of-events/">Calendar of Events</Link>
              </li>
            </ul>
            <div className="dirct_srchwrap"></div>
          </div>
        </div>

        <div className="dir_bnrbottom">
          <div className="directorybnr_tag text-center">
            <ul>
              <li>
                <a href={data.banner_dir_link}>
                  <strong>{data.banner_dir_title}</strong>
                </a>
              </li>
              <li>
                <strong>
                  <i className="fas fa-tag"></i>
                  {data.banner_dir_sub_title}
                </strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
