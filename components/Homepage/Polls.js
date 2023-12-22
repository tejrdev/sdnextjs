import axios from 'axios';
import { useState, useEffect } from 'react';
import $ from 'jquery';

function Polls({ data, tag, ip }) {
  const [pollsSubmitted, setPollsSubmitted] = useState(false);
  const [pollsSubmittedYes, setPollsSubmittedYes] = useState(0);
  const [pollsSubmittedNo, setPollsSubmittedNo] = useState(0);
  const [noOFPollsSubmitted, setnoOFPollsSubmitted] = useState('');

  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizSubmittedYes, setQuizSubmittedYes] = useState(0);
  const [quizSubmittedNo, setQuizSubmittedNo] = useState(0);
  const [noOFQuizSubmitted, setnoOFQuizSubmitted] = useState('');

  useEffect(() => {
    $('.ansoptionbox_in .pollnav .next').click(function () {
      $(this).parents('.ansoptionbox').find('.ansoptionbox_in').hide();
      $(this).parents('.ansoptionbox_in').next().show();
    });
    $('.ansoptionbox_in .pollnav .prev').click(function () {
      $(this).parents('.ansoptionbox').find('.ansoptionbox_in').hide();
      $(this).parents('.ansoptionbox_in').prev().show();
    });
  }, []);

  const pollSubmitted = (e, tag) => {
    const key = e.target.parentElement.parentElement.id;
    const value = key.replace(tag + '_ids_', '');
    localStorage.setItem(key, value);

    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/' + tag + '_action/?poll_ans=yes&poll_post_id=' + value + '&ip=' + ip)
      .then((res) => {
        if (tag === 'poll') {
          setPollsSubmitted(true);
          setPollsSubmittedYes(res.data.poll_results.YES);
          setPollsSubmittedNo(res.data.poll_results.NO);
          setnoOFPollsSubmitted(res.data.total_votes);
          setPollsSubmitted(false);
        } else {
          setQuizSubmitted(true);
          setQuizSubmittedYes(res.data.quiz_result.YES.results);
          setQuizSubmittedNo(res.data.quiz_result.NO.results);
          setnoOFQuizSubmitted(res.data.total_votes);
          setPollsSubmitted(false);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="ansoptionbox df fww">
      {data &&
        data.map((item, id) => {
          const poll_id = item.id;
          const div_id = tag + '_ids_' + poll_id;
          let submitted ;
          if (typeof window !== 'undefined') {
            submitted = localStorage.getItem(div_id);
          }          
          const div_cls = 'qtyoption_box ' + tag + '_box_' + poll_id;
          const input_name = tag + '_' + poll_id;
          const result_cls = 'result_block closed p_result_' + poll_id;
          const btnClass = tag === 'poll' ? 'btn vote_poll' : 'btn quiz_ans';
          const btnText = tag === 'poll' ? 'vote' : ' answer';
          const totalPollVotes = pollsSubmitted === true ? noOFPollsSubmitted : item.total_votes;
          const totalQuizVotes = pollsSubmitted === true ? noOFQuizSubmitted : item.quiz_totals;
          return (
            <div id={div_id} className="ansoptionbox_in df fww" style={{ display: id === 0 ? 'block' : 'none' }} key={poll_id}>
              <div className="optbxtitle df fww just-between">
                <h5>
                  {tag} <i className="far fa-angle-right"></i>
                </h5>
                <div className="pollnav">
                  <button type="button" className="prev" aria-label="previous poll">
                    <i className="fas fa-long-arrow-left"></i>
                  </button>
                  <button type="button" className="next" aria-label="next poll">
                    <i className="fas fa-long-arrow-right"></i>
                  </button>{' '}
                </div>
              </div>
              {submitted === undefined || submitted === null ? (
                <div className={div_cls}>
                  <p>{item.title}</p>
                  <input type="hidden" className="poll_id" value={poll_id} />
                  <ul className="radiobox">
                    {item.options.map((option, index) => {
                      const input_id = 'op_' + index + '_' + poll_id;
                      return (
                        <li key={index}>
                          <input type="radio" id={input_id} name={input_name} value={option.options} />
                          <label htmlFor={input_id}>{option.options}</label>
                        </li>
                      );
                    })}
                  </ul>
                  <button className={btnClass} type="submit" onClick={(event) => pollSubmitted(event, tag)}>
                    {btnText}
                  </button>
                </div>
              ) : (
                <div className={result_cls}>
                  <p>{item.title}</p>
                  <ul className="resultbox">
                    {item.options.map((option, index) => {
                      const optionHTML = option.options;
                      let options = tag === 'poll' ? item.poll_results[optionHTML] : item.quiz_result[optionHTML].results;
                      if (options === undefined) options = '0';
                      if (pollsSubmitted === true) {
                        if (optionHTML === 'YES') {
                          options = pollsSubmittedYes || options;
                        } else if (optionHTML === 'NO') {
                          options = pollsSubmittedNo || options;
                        }
                      }
                      if (quizSubmitted === true) {
                        if (optionHTML === 'YES') {
                          options = quizSubmittedYes || options;
                        } else if (optionHTML === 'NO') {
                          options = quizSubmittedNo || options;
                        }
                      }
                      let li_cls = 'df fww';
                      if (tag === 'quiz') {
                        if (option.right_ans === true) {
                          li_cls += ' truebox';
                        } else {
                          if (item.quiz_result[optionHTML].user_ans !== undefined) li_cls += ' falsebox';
                        }
                      }
                      return (
                        <li key={index} className={li_cls}>
                          <span className="count">{options + '%'}</span>
                          <label htmlFor={option.options}>
                            {option.options}
                            <span className="linebox">
                              <span
                                className="lining"
                                style={{
                                  width: options + '%',
                                }}
                              ></span>
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>{' '}
                  <p className="total-vote">
                    <small>Total responses: {tag === 'poll' ? totalPollVotes : totalQuizVotes + ' votes'}</small>
                  </p>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default Polls;
