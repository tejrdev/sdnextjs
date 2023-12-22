const NavLinks = ({ data }) => {
  return (
    <div className="secnav_link">
      <div className="container">
        <ul className="secnav_linkin df weekitems">
          {data &&
            data.map((nav, index) => {
              return (
                <li>
                  <a href={'#weeknav' + (index + 1)}>{nav}</a>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default NavLinks;
