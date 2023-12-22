const Sponsorship = ({ data, key_data }) => {
    return (
        <section className="sponceropp secspace">
            <div className="container">                
                <div className="sponcers_add df fww">
                    {data.sponsorship_list.map((item, index) => {
                        return (
                            <div className="spons_col"><span className="pvr"><div className="sponce_item"><img src={item}  alt="" className="objctimg_box" /></div></span></div>
                        )

                    })}                        
                </div>
                <div className="toptxt">
                    {data.sponsorship_title.length ? <h3>{data.sponsorship_title}</h3> : '' }
                    {data.sponsorship_description.length ?  <p dangerouslySetInnerHTML={{ __html: data.sponsorship_description }}></p> : '' }				
                     
                </div>
            </div>
        </section>
     );
};

export default Sponsorship;