import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);
  let content;
  let tabtitles = [];
  React.Children.forEach(children, (child) => {
    if (child) {
      tabtitles.push({ name: child.props.label, state: child.props.disable });
      if (child.props.label === activeTab) content = child.props.children;
    }
  });
  //console.log(tabtitles)

  return (
    <div className='tabs'>
      <div className='tabnav secnav_link'>
        <ul className='secnav_linkin df'>
          {tabtitles.map((tabtitle, index) => (
            <li key={index} className={tabtitle.name === activeTab ? 'active' : ''} onClick={() => setActiveTab(tabtitle.name)} disabled={tabtitle.state}>
              <strong>{tabtitle.name}</strong>
            </li>
          ))}
        </ul>
      </div>
      <div className='tab-content'>{content}</div>
    </div>
  );
};
const Tab = (props) => {
  return <>{props.children}</>;
};
export default Tabs;
