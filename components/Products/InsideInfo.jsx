import Link from "next/link"

const InsideInfo = () => {
  return (
    <div className="insideinfo">
      <div className="container">
         <div className="insideinfobox df fww just-between">
            <h4>Screendollars Pro: <span> Insider Information on Upcoming Movie Releases </span></h4>
            <div className="insidectabtn">
               <Link href='/pro' className="btn uppercase">try it for free</Link>
            </div>
         </div>
      </div>
    </div>
  )
}

export default InsideInfo