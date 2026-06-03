import { useState } from 'react';
import InitQuiz from './InitQuiz';
import PollQuiz from './PollQuiz';
import QuizResult from './QuizResult';
import PollResult from './PollResult';

function Polls({ data }) {
  const [CurrentScreen, setCurrentScreen] = useState('init');
  const [AllQuizAnswered, setAllQuizAnswered] = useState(false);
  const [AllPollsAnswered, setAllPollAnswered] = useState(false);

  const GoToNextScreen = (screen) => {
    setCurrentScreen(screen);
  };
  const showResultScreen = (tag) => {
    if (tag === 'quiz') {
      setAllQuizAnswered(true);
    } else {
      setAllPollAnswered(true);
    }
  };
  return (
    <>
      {CurrentScreen === 'init' ? (
        <InitQuiz data={data.rank_details} init={data.start_slide} GoToNextScreen={GoToNextScreen} />
      ) : (
        <>
          {CurrentScreen === 'quiz' && AllQuizAnswered ? (
            <QuizResult data={data} GoToNextScreen={GoToNextScreen} />
          ) : CurrentScreen === 'poll' && AllPollsAnswered ? (
            <PollResult result={data.last_slide} resultImage={data.result_image} />
          ) : (
            <PollQuiz data={CurrentScreen === 'quiz' ? data.quiz : data.polls} tag={CurrentScreen} rightImage={data.right_img} wrongImage={data.wrong_img} showResultScreen={showResultScreen} />
          )}
        </>
      )}
    </>
  );
}

export default Polls;
