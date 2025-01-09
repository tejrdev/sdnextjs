import HomePageAds from '../../Homepage/HomePageAds';
import SideBlock from './SideBlock';

const Sidebar = ({ data, requestFrom }) => {
  return (
    <div className="sidebarbox">
      <div className="side_barboxin">
        <SideBlock data={data} requestFrom={requestFrom} />

        <HomePageAds cls="add_300" format="rectangle"/>
      </div>
    </div>
  );
};

export default Sidebar;
