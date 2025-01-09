import { useState } from 'react';

const Dropmassage = () => {
  const [Message, setMessage] = useState('');
  const sendFormData = async (e: any) => {
    e.preventDefault();

    //  try {
    //    const formData = new FormData();
    //    formData.append('request-from', 'VideoPageForm');
    //    formData.append('message', Message);

    //    const data = await fetch(process.env.NEXT_PUBLIC_SD_API + '/claim-listing/claim_gallery.php', {
    //      method: 'post',
    //      body: formData,
    //    });
    //    const response = await data.json();
    //    if (response) {
    //    } else {
    //      console.log('Error Found');
    //    }
    //  } catch (err) {
    //    console.error(err);
    //  }
  };
  return (
    <div className='dropmassage  pb-3 sm:pb-4 '>
      <div className='container'>
        <div className=' sm:grid sm:grid-cols-2 gap-3 border-t border-gray-300 pt-9 sm:pt-10 md:pt-11'>
          <div className='col'>
            <h2 className='dark:text-white'>Drop us a message</h2>
            <p className='dark:text-slate-300'>if you have any suggestions regarding content or anything else we’re just a message away.</p>
          </div>
          <form className='col lg:pr-10' onSubmit={sendFormData}>
            <textarea
              name=''
              id=''
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Enter your message/feedback/questions...'
              className='bg-transparent mb-2 border dark:border-gold'
              rows={4}
            ></textarea>
            <div className='faction flex flex-wrap justify-between items-start'>
              {/* <div className="acupload">
                        <input type="file" name="" id="" />
                        <p className='dark:text-slate-300'>PDF, PNG, JPG, MP4 or GIF (max. 5mb)</p>
                     </div> */}
              <button className='btn hover:bg-white'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dropmassage;
