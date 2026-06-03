import Aritem from './Aritem';

const Arlist = ({ items, totalPages }: { items: any[], totalPages: number }) => {
   const loadMore = () => {
      console.log('load more');
   }
   return (
      <section className='arlist'>
         <div className="container">
            <div className="flex flex-wrap justify-between gap-3 ">
               {items.map((item, index) =>
                  <Aritem key={index} item={item} />
               )}
            </div>
            {totalPages && totalPages > 1 && (
               <div className="cardsbtn text-center mt-5 mb-14">
                  <button className="btn" onClick={() => loadMore()}>Load More</button>
               </div>
            )}
         </div>
      </section>
   )
}

export default Arlist