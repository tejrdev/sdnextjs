import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

const PollQuiz = ({ data, tag, rightImage, wrongImage, showResultScreen }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [AnswerSubmitted, setAnswerSubmitted] = useState(false);
  const [ShowFinalScoreClicked, setShowFinalScoreClicked] = useState(false);
  const [ShowFinalScoreButton, setShowFinalScoreButton] = useState(false);

  const ip_address = localStorage.getItem('user_ip');
  const total_questions = data.length;
  const current_que = currentQuestion + 1;
  const progress = (current_que / total_questions) * 100;

  useEffect(() => {
    const answered_ques = data.filter((item) => item.answer_submited !== '');
    if (answered_ques.length === data.length) {
      setShowFinalScoreButton(true);
    }
  }, [AnswerSubmitted]);

  useEffect(() => {
    if (ShowFinalScoreClicked) {
      setTimeout(() => {
        showResultScreen(tag);
        setShowFinalScoreClicked(false);
        setAnswerSubmitted(false);
        setShowFinalScoreButton(false);
      }, 500);
    }
  }, [ShowFinalScoreClicked]);

  const onShowFinalScore = () => {
    setShowFinalScoreClicked(true);
  }
  const onNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    setAnswerSubmitted(false);
    setShowFinalScoreButton(false);
  }
  const onAnswerSubmit = (e, tag, index, post_id, que_answered) => {
    e.preventDefault();
    if (que_answered === true) {
      return;
    }
    const value = e.target.innerText;
    if (value !== '') {
      axios
        .get(process.env.NEXT_PUBLIC_SD_API + '/' + tag + '_action/?poll_ans=' + value + '&poll_post_id=' + post_id + '&ip=' + ip_address)
        .then((res) => {
          if (tag === 'poll') {
            data[index].poll_results = res.data.poll_results;
            data[index].total_votes = res.data.total_votes;
            data[index].answer_submited = 'yes';
          } else {
            data[index].quiz_result = res.data.quiz_result;
            data[index].total_votes = res.data.total_votes;
            data[index].answer_submited = 'yes';
          }
          setAnswerSubmitted(true);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className='card w-[289px] h-[550px] border-2 border-gold bg-gold-yellow rounded relative overflow-hidden pb-3'>
      <div className='prbar w-full bg-slate-300 h-2 relative'>
        <div className={`bar bg-gold absolute z-10 h-full`} style={{ width: progress + '%' }}></div>
      </div>
      <div className='flex  justify-between py-2'>
        <p className='px-3  mb-1 '>
          Question {current_que} of {total_questions}
        </p>
        <div className='pollnavtop mt-1 flex cursor-pointer mr-2'>
          <span
            type='button'
            className={`prev p-1 ${currentQuestion === 0 ? 'cursor-auto opacity-15' : ''}`}
            aria-label='previous poll p-2'
            onClick={() => {
              if (currentQuestion === 0) {
                return;
              }
              setAnswerSubmitted(false);
              setCurrentQuestion((prev) => prev - 1);
            }}>
            <FaArrowLeftLong />
          </span>
          <span
            type='button'
            className={`next p-1 ${currentQuestion === total_questions - 1 ? 'cursor-auto opacity-15' : ''}`}
            aria-label='next poll'
            onClick={() => {
              if (currentQuestion === total_questions - 1) {
                return;
              }
              setAnswerSubmitted(false);
              setCurrentQuestion((prev) => prev + 1);
            }}>
            <FaArrowRightLong />
          </span>
        </div>
      </div>
      {data?.map((item, id) => {
        const question_id = item.id;
        const quiz_answered = item.answer_submited !== '' && item.answer_submited !== undefined ? true : AnswerSubmitted;
        //check right answer for quiz
        let user_right_ans = '';
        if (tag === 'quiz') {
          let right_ans = item.options.filter((option) => option.right_ans);
          right_ans = right_ans[0].options;
          // Check if the answer is right using quiz_result
          user_right_ans = (item.quiz_result && item.quiz_result[right_ans]?.user_right_ans) || '';
        }
        return (
          <div key={id} style={{ display: id === currentQuestion ? 'block' : 'none' }}>
            <h4 className='px-3 pb-2 bg-gold-yellow leading-snug'>{item.title}</h4>
            <div className='optionsans px-3'>
              {item.options.map((option, index) => {
                let user_ans = '',
                  answer_pct = 0;
                if (quiz_answered) {
                  if (tag === 'poll') {
                    answer_pct = (item.poll_results && item.poll_results[option.options]) || '';
                  } else {
                    user_ans = (item.quiz_result && item.quiz_result[option.options]?.user_ans) || '';
                  }
                }
                return (
                  <div
                    key={index}
                    className={`ansitem flex gap-2 mb-2 items-center cursor-pointer ${tag === 'poll' ? 'relative z-0' : ''}`}
                    onClick={(event) => onAnswerSubmit(event, tag, id, question_id, quiz_answered)}>
                    {tag === 'poll' ? (
                      <>
                        <span className='py-1 border border-gray-400 rounded-md w-full pl-2 pr-11'>{option.options} </span>
                        <span className={`persentbg rounded-md bg-gold absolute left-0 h-full -z-10 ${quiz_answered ? '' : 'hidden'}`} style={{ width: answer_pct + '%' }}></span>
                        <span className={`pollpersent absolute right-2 ${quiz_answered ? '' : 'hidden'}`}>{answer_pct}%</span>
                      </>
                    ) : (
                      <>
                        <span
                          className={`h-8 flex items-center rounded-md ${quiz_answered ? (option.right_ans === true ? 'bg-green-600' : user_ans !== '' ? 'bg-red-600' : 'bg-gold') : 'bg-gold'
                            } rounded-md px-3 py-1'`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span
                          className={`${quiz_answered ? (option.right_ans === true ? 'bg-green-600' : user_ans !== '' ? 'bg-red-600' : '') : ''} py-1 border border-gray-400 rounded-md w-full px-2`}>
                          {option.options}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
              {tag === 'poll' && quiz_answered ? (
                <div className='ansitem flex gap-2 mb-2 items-center cursor-pointer relative'>
                  <span>Total Votes: {item.total_votes}</span>
                </div>
              ) : (
                ''
              )}
            </div>
            {item.image || quiz_answered ? (
              <div className='qtyansimg px-3 absolute bottom-2 w-full text-center'>
                <img src={tag === 'quiz' && quiz_answered ? (user_right_ans === 'yes' ? rightImage : wrongImage) : item.image} alt='' />
              </div>
            ) : (
              ''
            )}
            {ShowFinalScoreButton ? (
              <>
                {tag === 'quiz' ? (
                  <div className='px-3 pb-2 leading-snug mt-5 ' onClick={onShowFinalScore}>
                    <button className='btn'> Show Final Score</button>
                  </div>
                ) : (
                  <div className='px-3 pb-2 leading-snug mt-5 ' onClick={onShowFinalScore}>
                    <button className='btn'> Next</button>
                  </div>
                )}
              </>

            ) : (
              <>
                {quiz_answered && <div className='px-3 pb-2 mt-5 leading-snug' onClick={onNextQuestion}>
                  <button className='btn'> Next Question</button>
                </div>}
              </>

            )}
          </div>
        );
      })}
    </div>
  );
};

export default PollQuiz;
