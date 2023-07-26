import { useState, useEffect} from 'react';
import { nanoid } from 'nanoid';
import './App.css'
import data from './data';
import Answer from './Answer';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function usefulData2(data: any) {
  return data.map((elem: { incorrect_answers: any[]; correct_answer: any; question: any; }) => {
    const answers = elem.incorrect_answers.map((ans: any) => {
      return {
        answerId: nanoid(),
        answer: atob(ans),
        isCorrect: false,
        isActive: false,
        isVerified: false,
      }
    })
    answers.push({
      answerId: nanoid(),
      answer: atob(elem.correct_answer),
      isCorrect: true,
      isActive: false,
      isVerified: false,
    })
    return {
      questionId: nanoid(),
      question: atob(elem.question),
      answers: shuffleArray(answers)
    }
  })
}

  const [result, setResult] = useState(usefulData2(data))

  useEffect(() => {
    if(!isFinished)
    fetch("https://opentdb.com/api.php?amount=5&encode=base64")
      .then(res => res.json())
      .then(data => {
        setResult(usefulData2(data.results));
      })
  }, [isFinished])

  function startQuiz() {
    setIsStarted(true);
  }

  function verifyAnswers() {
    setResult((prevResult: any[]) => prevResult.map(question => {
      const answers = question.answers.map((answer: any) => {
        return {...answer, isVerified: true}
      });
      return {...question, answers}
    }))
    setIsFinished(isFin => !isFin)
  }

  function toggleAnswer(questionId: string, answerId: string, isVerified: boolean) {
    if(!isVerified) {
      setResult((prevData: any[]) => prevData.map(res => {
        if(res.questionId === questionId) {
          const answers = res.answers.map((ans: { answerId: string; }) => {
            return ans.answerId === answerId ? {...ans, isActive: true} : {...ans, isActive: false}
          })
          return {...res, answers: answers};
        } else {
          return res;
        }
      }))
    }
  }

  const styles = {
    overflow: "hidden",
    borderBottom: "2px solid #e6e6e6",
    paddingBottom: "20px",
  }

  const questions = result.map((elem) => {
    return (
      <div key={elem.questionId} style={styles}>
        <h2>{elem.question}</h2>
        {
          elem.answers.map(answer => (
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
