import { useState } from 'react';

const InitQuiz = ({ data, GoToNextScreen, init }) => {
  const [CurrentScreen, setCurrentScreen] = useState(0);
  const TakeQuiz = () => {
    GoToNextScreen('quiz');
  };
  const NextScreen = () => {
    setCurrentScreen(1);
  };

  return (
    <div className='card w-[289px] h-[550px] border-2 border-gold rounded bg-gold-yellow text-center p-3 relative'>
      {CurrentScreen === 0 ? (
        <>
          <div className='' dangerouslySetInnerHTML={{ __html: init }}></div>
          <div className='gobtn absolute bottom-0 w-full left-0'>
            <button className='w-full bg-gold cursor-pointer py-2 rounded-none hover:bg-black hover:text-white transition-all duration-300' onClick={() => NextScreen()}>
              Lets go!
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>Answer all 5 questions to earn your rank.</h3>
          <div className='bages flex justify-between flex-wrap gap-3 items-start'>
            <div className='bage broder-2 border-gray-300'>
              <img src={data.rank_1_image} alt='' className='max-w-24 h-24' />
              <div className='cardinfo'>
                <p className='mt-2 mb-0'>0-2 correct</p>
                <h5 className='font-bold'>{data.title}</h5>
              </div>
            </div>
            <div className='bage broder-2 border-gray-300'>
              <img src={data.rank_2_image} alt='' className='max-w-24  h-24' />
              <div className='cardinfo'>
                <p className='mt-2 mb-0'>3-4 correct</p>
                <h5 className='font-bold'>{data.title_2}</h5>
              </div>
            </div>
            <div className='bage broder-2 border-gray-300'>
              <img src={data.rank_3_image} alt='' className='max-w-24  h-24' />
              <div className='cardinfo'>
                <p className='mt-2 mb-0'>5 correct</p>
                <h5 className='font-bold'> {data.title_3}</h5>
              </div>
            </div>
          </div>
          <div className='gobtn absolute bottom-0 w-full left-0'>
            <button className='w-full bg-gold cursor-pointer py-2 rounded-none hover:bg-black hover:text-white transition-all duration-300' onClick={() => TakeQuiz()}>
              Take Quiz
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default InitQuiz;
