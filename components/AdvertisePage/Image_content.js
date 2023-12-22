const Image_content = ({ data, key_data }) => {
    return (
        <section className={data.class_name}>
            <div className="container">
                <div className="addsmovid_box">
                    {data.title.length ? <h3>{data.title}</h3> : '' }
                    <div className="adds_movietxt df fww">                                   
                        <div className="addtxtbox" dangerouslySetInnerHTML={{ __html: data.content }}></div>
                        <div className="addinfo_graphic"><img src={data.img} alt={data.img_alt} /></div>                        													
                    </div>
                </div>
            </div>
        </section>
     );
};

export default Image_content;