import Image from "next/image"

const Figimage = (props) => {
  return (
    <figure className="pvr">
      <Image  src={props.src} className={props.cls} width={props.width} height={props.height} alt={props.alt}></Image>
    </figure>
  )
}

export default Figimage