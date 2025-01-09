import Link from 'next/link';

const TableDiv = ({ data }) => {
  return (
    <div className="postertabvisual filter_tabsinfo" data-title="table">
      <div className="distinforesult_table">
        <div className="stuweektable">
          <div className="tbletop">
            <table className="stucal_info responsive dataTable">
              <tr>
                <th data-title="Title">Title</th>
                <th data-title="Rating">Rating</th>
                <th data-title="Runtime">Runtime</th>
                <th data-title="Pattern / Platform">Pattern / Platform</th>
              </tr>
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td data-title="Title">
                      <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} title={item.title}>
                        {item.title}
                      </Link>
                    </td>
                    <td data-title="Rating">{item.rating}</td>
                    <td data-title="Runtime">{item.runtime}</td>
                    <td data-title="Pattern / Platform">{item.pattern}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDiv;
