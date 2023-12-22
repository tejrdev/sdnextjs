const Product_data = ({ data }) => {
    return (
      
      <section className="productservice dlsecspace toplinesec">
        <div className="container">
            <div className="top_txt df fww just-between">
                <h2>{data.products_services_title} <i className="fal fa-angle-right"></i></h2>                
            </div>
            <div className="proservices_Box grid">
            {data.products_services_data.map((item, index) => {
                 return (
                <div className="proservices_items">
                    <figure className="pvr">                    
                        {item.url ? 
                        <a href={item.url}><img  src={item.image.url} alt="" className="objctimg_box" /></a> : 
                        <img  src={item.image.url} alt="" className="objctimg_box" />}
                    </figure>
                    <div className="nowshow_info">
                        {item.url ? <h5><a href={ item.url}>{item.title}</a></h5> : 
                        <h5>{item.title}</h5>}
                        <p>{item.content}</p>
                        {item.url && (
                        <div className="expbtn">
                            {item.url  ? <a href={item.url} className="btn">Explore Product</a> : 
                            <span className="btn">Explore Product</span>}
                        </div>
                        )}
                    </div>
                </div>
                 )
                })}
            </div>
        </div>
    </section>
    );
  };
  
  export default Product_data;
  