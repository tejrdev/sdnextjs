const TableDiv = ({ data }) => {
  return (
    <div className="container">
      <div className="stuweektable">
        <div className="tbletop">
          <h4>{data.title}</h4>
          {data.movies && (
            <table className="stucal_info responsive dataTable">
              <tbody>
                {data.movies.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <a href={item.link}>{item.title}</a>
                        <a href={item.distibutor_link}>
                          {' '}
                          {
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item.distibutor,
                              }}
                            ></span>
                          }
                        </a>
                      </td>
                      <td>{item.rating}</td>
                      <td>{item.runtime}</td>
                      <td>{item.pattern}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableDiv;
