const Product_data = ({ data }) => {
    return (

        <section className="productservice dlsecspace bg-[#f7f7fc] py-7 md:py-9 lg:py-12">
            <div className="container">
                <div className="top_txt df fww just-between pb-2">
                    <h2>{data.products_services_title} <i className="fal fa-angle-right"></i></h2>
                </div>
                <div className="proservices_Box grid">
                    {data.products_services_data.map((item, index) => {
                        return (
                            <div className="proservices_items border border-gray-300 rounded-lg relative overflow-hidden  max-w-80 bg-white">
                                <figure className="flex justify-center items-center border-b border-gray-200 min-h-44 sm:min-h-64 bg-white">
                                    {item.url ?
                                        <a href={item.url}><img src={item.image.url} alt="" className="" /></a> :
                                        <img src={item.image.url} alt="" className="" />}
                                </figure>
                                <div className="nowshow_info p-4 pb-12">
                                    {item.url ? <h5><a href={item.url}>{item.title}</a></h5> :
                                        <h5 className="mb-[5px]">{item.title}</h5>}
                                    <p>{item.content}</p>
                                    {item.url && (
                                        <div className="expbtn absolute w-full bottom-4 left-0 text-center">
                                            {item.url ? <a href={item.url} className="inline-flex justify-center items-center gap-2 rounded-full border border-black p-[2px] font-medium text-black transition-colors hover:bg-orangegold hover:text-black hover:border-orangegold focus:text-black capitalize px-4 py-1 w-[200px] mx-auto">Explore Product</a> :
                                                <span className="btn"></span>}
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
