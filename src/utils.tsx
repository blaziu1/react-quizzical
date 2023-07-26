import { nanoid } from "nanoid";
import { IApiQuestion, IQuizQuestion } from "./interfaces/interfaces";

export function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function prepareQuestions(data: IApiQuestion[]): IQuizQuestion[] {
    return data.map((elem: { incorrect_answers: string[]; correct_answer: string; question: string; }) => {
      const answers = elem.incorrect_answers.map((ans: string) => {
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