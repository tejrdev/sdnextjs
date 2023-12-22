import Link from "next/link"

const InstantTrial = () => {
  return (
    <div className="instrial">
      <h6>Instantly unlock insider information on upcoming movie releases...</h6>
      <Link href="/pro/signup/" className="btn uppercase">start your free trial</Link>
    </div>
  )
}

export default InstantTrial