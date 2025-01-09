import Pagetitle from "@/components/Products/Pagetitle"
import Paywall from "@/components/Products/Paywall"


const ProductDetail = () => {
  return (
    <div className="productdetail text-center paywallpvr">
      <Pagetitle heading={"Screendollars newsletter"} disc="Fusce at nisi eget dolor rhoncus facilisis. Mauris ante nisl, consectetur et luctus et, porta ut dolor. Curabitur ultricies ultrices nulla. Morbi blandit nec est vitae dictum. Etiam vel consectetur diam. Maecenas vitae egestas dolor. Fusce tempor." />
      <div className="productdetailbox text-center">
         <div className="container">
            <h3>Latest Issue: Jul 2,2023</h3>
            <iframe src="https://mailchi.mp/ecf20df61bfe/friday-tracking-report-11831866?e=622564949e" frameborder="0"></iframe>
         </div>
      </div>
      <Paywall />
    </div>
  )
}

export default ProductDetail