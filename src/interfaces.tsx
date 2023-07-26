export interface apiQuestion {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
  }

export interface quizAnswer {
    answerId: string,
    answer: string,
    isCorrect: boolean,
    isActive: boolean,
    isVerified: boolean,
  }

export interface quizQuestion {
    questionId: string,
    question: string,
    answers: quizAnswer[],
  }