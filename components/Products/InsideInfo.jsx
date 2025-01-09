import Link from "next/link"

const InsideInfo = () => {
  return (
    <div className="insideinfo">
      <div className="container">
        <div className="insideinfobox flex flex-wrap xsm:justify-between justify-center text-center xsm:text-left  bg-[#fef5de] border-2 border-solid rounded-md max-w-screen-lg border-gold py-4 px-5 mt-10 mx-auto mb-4 sm:mb-8">
          <h4 className="mt-1 xsm:me-[10px] mb-0">Screendollars Pro: <span className="font-normal"> Insider Information on Upcoming Movie Releases </span></h4>
          <div className="insidectabtn">
            <Link href='/pro' className="btn uppercase mt-3 xsm:mt-1">try it for free</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InsideInfo