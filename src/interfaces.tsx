export interface IApiQuestion {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
  }

export interface IQuizAnswer {
    answerId: string,
    answer: string,
    isCorrect: boolean,
    isActive: boolean,
    isVerified: boolean,
  }

export interface IQuizQuestion {
    questionId: string,
    question: string,
    answers: IQuizAnswer[],
  }