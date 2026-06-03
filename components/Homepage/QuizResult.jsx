import { useState, useEffect } from 'react';

const QuizResult = ({ data, GoToNextScreen }) => {
  const [rank, setRank] = useState('');
  const [rank_image, setRankImage] = useState('');
  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    // Count right answers
    const rightAnswers = data.quiz.reduce((count, item) => {
      //check right answer
      let right_ans = item.options.filter((option) => option.right_ans);
      right_ans = right_ans[0].options;
      // Check if the answer is right using quiz_result
      if (item.quiz_result && item.quiz_result[right_ans]?.user_right_ans === 'yes') {
        return count + 1;
      }
      return count;
    }, 0);

    // Calculate wrong answers
    const wrongAnswers = data.quiz.length - rightAnswers;

    // Calculate percentage
    const percentage = (rightAnswers / data.quiz.length) * 100;

    // Determine rank based on right answers
    let rank = '',
      rank_image = '';
    if (rightAnswers <= 2) {
      rank = 'Casual Viewer';
      rank_image = data.rank_details.rank_1_image;
    } else if (rightAnswers <= 4) {
      rank = 'Movie Buff';
      rank_image = data.rank_details.rank_2_image;
    } else {
      rank = 'Cinephile';
      rank_image = data.rank_details.rank_3_image;
    }
    setRank(rank);
    setRankImage(rank_image);
    setRightAnswers(rightAnswers);
    setWrongAnswers(wrongAnswers);
    setPercentage(percentage);
  }, []);

  return (
    <div className='card w-[289px] h-[550px] border-2 border-gold rounded bg-gold-yellow  p-3 relative'>
      <div className='medalimg mb-3'>
        <img src={data.result_image} alt='' />
      </div>
      <h3>Congratulations! you are </h3>
      <h2 className='mb-3'>{rank}</h2>
      <div className='getbage'>
        <div className='bage text-center'>
          <img src={rank_image} alt='' className='max-w-24  ' />
        </div>
      </div>
      <div className='ansbar w-full bg-red-600 h-[10px] relative rounded-2xl overflow-hidden my-4'>
        <div className='bar w-[60%] bg-green-600 absolute z-10 h-full rounded-2xl' style={{ width: `${percentage}%` }}></div>
      </div>
      <div className='anscount'>
        <div className='countitem'>
          <span className='bg-green-600 mr-3 rounded size-4 inline-block'></span>
          <span>
            Correct answers: <strong className='text-green-600'>{rightAnswers}</strong>
          </span>
        </div>
        <div className='countitem'>
          <span className='bg-red-600 mr-3 rounded size-4 inline-block'></span>
          <span>
            Incorrect answers: <strong className='text-red-600'>{wrongAnswers}</strong>
          </span>
        </div>
      </div>
      <div className='gobtn absolute bottom-0 w-full left-0'>
        {/* <button className='inline-block text-center font-bold hover:text-black text-sm text-black hover:bg-gold cursor-pointer py-2 rounded-none border border-gold w-1/2 transition-all duration-300 mb-[-1px]'>
          Share your results
        </button> */}
        <button
          className='block text-center font-bold hover:text-black text-sm text-black hover:bg-gold cursor-pointer py-2 rounded-none border border-gold w-full transition-all duration-300 mb-[-1px]'
          onClick={() => GoToNextScreen('poll')}>
          Go to polls
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
