function Recommended({ data, tag }) {
  return (
    <>
      {data && (
        <div className="recom_row df fww">
          <div className="recom_media logopic">
            <a href={data.url}>
              <img src={data.img} alt="" />
            </a>
          </div>
          <div className="recombox_info">
            <h5>
              <a href={data.url}>{data.title}</a>
            </h5>
            {tag === 'distributors' ? (
              <p>{data.distribution_type}</p>
            ) : (
              <>
                {data.HQ ? <p>HQ: {data.HQ}</p> : ''}
                {data.no_locations ? (
                  <p>Locations: {parseInt(data.no_locations)}</p>
                ) : (
                  ''
                )}
                {data.dates ? <p> {data.dates}</p> : ''}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Recommended;
