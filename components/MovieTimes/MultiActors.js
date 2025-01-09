const MultiActors = ({ data }) => {
  return (
    <section className="timeperson_quick toplinesec">
      <div className="container">
        <div className="timepersonbox grid gap16">
          {data.talent.map((item, index) => {
            return (
              <div className="timepersonbox_item text-center" key={index}>
                <a href={item.link}>
                  <figure className="personpc pvr">
                    {item.img ? (
                      <img src={item.img} alt="" className="objctimg_box" />
                    ) : (
                      item.img_txt
                    )}
                  </figure>
                  <p>
                    <strong>{item.title}</strong>
                  </p>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MultiActors;
