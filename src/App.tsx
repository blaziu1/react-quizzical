import { useState, useEffect} from 'react';
import './App.css'
import data from './data';
import Answer from './Answer';
import { prepareQuestions } from './utils';
import { IQuizAnswer, IQuizQuestion } from './interfaces';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [quiz, setQuiz] = useState(prepareQuestions(data))
  const opentdbURL = 'https://opentdb.com/api.php?amount=5&category=31&encode=base64'

  useEffect(() => {
    if(!isFinished)
    fetch(opentdbURL)
      .then(res => res.json())
      .then(data => {
        setQuiz(prepareQuestions(data.results));
      })
  }, [isFinished])

  function startQuiz() {
    setIsStarted(true);
  }

  function verifyAnswers() {
    setQuiz((prevResult: IQuizQuestion[]) => prevResult.map(question => {
      const answers = question.answers.map((answer: IQuizAnswer) => {
        return {...answer, isVerified: true}
      });
      return {...question, answers}
    }))
    setIsFinished(isFin => !isFin)
  }

  function toggleAnswer(questionId: string, answerId: string, isVerified: boolean) {
    if(!isVerified) {
      setQuiz((prevData: IQuizQuestion[]) => prevData.map((res: IQuizQuestion) => {
        if(res.questionId === questionId) {
          const answers = res.answers.map((ans: IQuizAnswer) => {
            return ans.answerId === answerId ? {...ans, isActive: true} : {...ans, isActive: false}
          })
          return {...res, answers: answers};
        } else {
          return res;
        }
      }))
    }
  }

  const questions = quiz.map((elem: IQuizQuestion) => {
    return (
      <div className="question" key={elem.questionId}>
        <h2>{elem.question}</h2>
        {
          elem.answers.map((answer: IQuizAnswer) => (
              <Answer key={answer.answerId} value={answer.answer} isActive={answer.isActive} isVerified={answer.isVerified} isCorrect={answer.isCorrect} toggle={() => toggleAnswer(elem.questionId, answer.answerId, answer.isVerified)} />
            ))
        }
      </div>
    )
  })

  return (
    <>
    {
      isStarted ?
      <>
        {questions}
        <button className="start--button" onClick={verifyAnswers}>{isFinished ? "Play again" : "Check answers"}</button>
      </>
     : 
      <>
        <h1>Quizzical</h1>
          Put your knowledge to the test!
        <button className="start--button" onClick={startQuiz}>Start quiz</button>
      </>
    }
    </>
  )
}

export default App
