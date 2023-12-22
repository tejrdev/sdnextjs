import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const CategoryNavigation = () => {
  const [CategotyNavigationDataLoaded, setCategotyNavigationDataLoaded] = useState(false);
  const [CategotyNavigationData, setCategotyNavigationData] = useState([]);
  useEffect(() => {
    loadCategotyNavigationData();
  }, []);

  const loadCategotyNavigationData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/sd_menu/film_data_menu.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setCategotyNavigationData(res.data);
        setCategotyNavigationDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className="cat_nav">
      {CategotyNavigationDataLoaded && (
        <div className="container">
          <div className="cat_navbox">
            <ul id="menu-film-data" className="catnav_items df fww">
              {CategotyNavigationData.film_data_menu.map((item, index) => {
                return (
                  <li key={index} className={'menu-item menu-item-type-post_type menu-item-object-page ' + (item.link.indexOf(window.location.pathname) > -1 ? 'active' : '')}>
                    <Link href={item.link} title={item.title}>
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default CategoryNavigation;
