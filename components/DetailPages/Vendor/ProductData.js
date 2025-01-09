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
                            <div className="proservices_items border border-gray-300 rounded-lg relative overflow-hidden  max-w-80">
                                <figure className="flex justify-center items-center border-b border-gray-200 min-h-80">
                                    {item.url ?
                                        <a href={item.url}><img src={item.image.url} alt="" className="" /></a> :
                                        <img src={item.image.url} alt="" className="" />}
                                </figure>
                                <div className="nowshow_info p-4 pb-8">
                                    {item.url ? <h5><a href={item.url}>{item.title}</a></h5> :
                                        <h5 className="mb-[5px]">{item.title}</h5>}
                                    <p>{item.content}</p>
                                    {item.url && (
                                        <div className="expbtn absolute w-full bottom-0 left-0">
                                            {item.url ? <a href={item.url} className="btn block w-full">Explore Product</a> :
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
