const ArticleHead = ({ title, content = '' }) => {
  return (
    <section className="articel_head">
     
      <div className='box_title pt-4 md:pt-5'>
                <div className='container'>
                    <div className='text-center'>
                        <h1 className='block lg:inline-block align-top pvr pr-0 lg:pt-3 transition-all duration-300 ease-out text-center'>{title}</h1>
                        <p>{content}</p>
                    </div>
                </div>
            </div>
    </section>
  );
};

export default ArticleHead;
