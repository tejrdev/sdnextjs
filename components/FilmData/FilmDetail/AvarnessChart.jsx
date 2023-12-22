import DetailavareChart from "./DetailAverness"
import DetailDailChart from "./DetailDailChart"


const AdvanceTicket = ({ ADV_Data }) => {
  const chartarrey = ADV_Data.linerchart.series.length ? ((ADV_Data.linerchart.series[0].data).every(data => data == "")) : true;
  // {console.log(ADV_Data , chartarrey) }
  return (
    <section className="advanceticket secspace">
      {chartarrey ? <div><strong>No Data Found</strong></div> :
        <>
          <div className="detialtabtop">
            <DetailDailChart data={ADV_Data.dailer} />
          </div>
          <div className="detialtabbottom">
            <DetailavareChart data={ADV_Data.linerchart}/>
          </div>
        </>
      }

    </section>
  )
}

export default AdvanceTicket