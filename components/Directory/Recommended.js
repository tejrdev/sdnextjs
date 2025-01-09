import Link from 'next/link'

function Recommended({ data, tag }) {
  return (
    <>
      {data && (
        <div className="recom_row df fww">
          <div className="recom_media logopic">
            <Link href={data.url}>
              <img src={data.img} alt="" />
            </Link>
          </div>
          <div className="recombox_info">
            <h5>
              <Link href={data.url}>{data.title}</Link>
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
