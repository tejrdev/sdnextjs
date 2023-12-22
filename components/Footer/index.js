import React from 'react';
import FooterSubscriber from './NewsletterSubscriber';
import SocialMedia from './SocialMedia';
// import './footer.css';
import Link from 'next/link';

function Footer({ data }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="colophon" className="site-footer temfy" role="contentinfo">
      <div className="container">
        <div className="footer_top df fww">
          <div className="ftr_logo">
            <img src={process.env.NEXT_PUBLIC_MENU_URL + 'wp-content/themes/screendollars-live/assets/images/sd_ftrlogo.png'} rel="preload" as="image" alt="Screendollar" />
          </div>
          <div className="ftr_mailing">
            <p className="f-14">Get the latest news and updates from us</p>
            <FooterSubscriber />
          </div>
          <div className="ftr_social">
            <p className="f-14">Follow us on</p>
            <SocialMedia classes={''} />
          </div>
        </div>
        <div className="footer_btm df fww">
          {Object.keys(data.mega_menu).map((key, id) => {
            let item = data.mega_menu[key];
            const slug = item.post_excerpt.toLowerCase().replace(' ', '-');
            const parent_id = 'menu-' + slug;
            if (slug === 'more') {
              item.child_items = data.More;
            }
            return (
              <div className="ftr_navlist" key={id}>
                <ul id={parent_id} className="menu">
                  {item.child_items &&
                    item.child_items.map((child_menu, index) => {
                      const menu_id = 'menu-item-' + child_menu.object_id;
                      let classes = 'menu-item menu-item-type-post_type menu-item-object-page ';
                      let parentClasses = classes;
                      classes += menu_id;
                      parentClasses += parent_id + ' menu-item-first';
                      if (index === 0) {
                        return (
                          <React.Fragment key={menu_id}>
                            <li id={parent_id} className={parentClasses}>
                              {/* <a title={item.attr_title} href={item.url}>
                                {item.title}
                              </a> */}
                              <Link href={item.url.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>{item.title}</Link>
                            </li>
                            <li id={menu_id} className={classes}>
                              {/* <a
                                title={child_menu.attr_title}
                                href={child_menu.url}
                              >
                                {child_menu.title}
                              </a> */}

                              <Link href={child_menu.url.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                                <span dangerouslySetInnerHTML={{ __html: child_menu.title }}></span>
                              </Link>
                            </li>
                          </React.Fragment>
                        );
                      } else {
                        return (
                          <li id={menu_id} className={classes} key={menu_id}>
                            {/* <a
                              title={child_menu.attr_title}
                              href={child_menu.url}
                            >
                              {child_menu.title}
                            </a> */}
                            <Link href={child_menu.url.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>{child_menu.title.replace(/&#038;/g, '&')}</Link>
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <div className="site_info text-center">
        <div className="copytxt">
          <p>
            © {currentYear} Screendollars, All Rights Reserved.{' '}
            <a href={process.env.NEXT_PUBLIC_MENU_URL + 'wp-content/themes/screendollars/assets/doc/Terms-of-use-agreement-Screendollars.pdf'} target="_blank" rel="noreferrer">
              Terms of Use{' '}
            </a>{' '}
            and{' '}
            <a href={process.env.NEXT_PUBLIC_MENU_URL + 'wp-content/themes/screendollars/assets/doc/Privacy-Screendollars.pdf'} target="_blank" rel="noreferrer">
              Privacy Policy{' '}
            </a>
            Apply{' '}
            <i>
              This site is protected by reCAPTCHA, Google's{' '}
              <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                Privacy Policy
              </a>{' '}
              apply{' '}
            </i>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
