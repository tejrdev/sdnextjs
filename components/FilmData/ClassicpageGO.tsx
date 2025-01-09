import Link from "next/link"


interface classicprop {
   PageName: string,
   pageUrl: string,
   version?: string
}

const ClassicpageGO: React.FC<classicprop> = ({ PageName, pageUrl, version }) => {
   return (
      version === "new" ?
         (<div className="pagechangebox">
            <div className="container flex flex-wrap justify-center text-center">
               <p className="border-2 border-gold border-solid p-2 rounded-lg mt-5 mb-0 font-bold capitalize">Welcome to the Contemporary Version of the {PageName} page.  If you prefer our Classic Version, <Link href={pageUrl} className="text-gold">click here </Link>to switch back.</p></div>
         </div>) :
         (
            <div className="pagechangebox">
               <div className="container flex flex-wrap justify-center text-center"><p className="border-2 border-gold border-solid p-2 rounded-lg mt-5 mb-0 font-bold capitalize">This is the Classic Version of the {PageName} page.  Recently, we introduced a new, Contemporary Version as well.  <Link href={pageUrl}>click here </Link> to check it out.
               </p></div>
            </div>
         )
   )
}

export default ClassicpageGO