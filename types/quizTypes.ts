export interface QuizTypesResponse {
    id:string,
    course_id: string,
    number: number,
    point: number,
    quizType: string,
    title: string,
    lesson: string,
  }

  export interface QuizTypesCreate {
    course_id: string;
    number: number;
    point: number;
    quiz_type: string;
    title: string;
    lesson: string;
    choice_data?: CreateChoiceQuizData | null;
    orderingData?: CreateOrderingQuizData | null;
    missingWordData?: CreateMissingWordQuizData | null;
  }

  export interface CreateChoiceQuizData {
    question: string;
    type: string;
    answers: ChoiceAnswer[];
}

export interface ChoiceAnswer {
    answer: string;
    result: boolean;
}

export interface CreateOrderingQuizData {
    question: string;
    answers: OrderingAnswer[];
}

export interface OrderingAnswer {
    answer: string;
    order: number;
}

export interface CreateMissingWordQuizData {
    question: string;
    answer: string;
}

export interface QuizTypesOderingQuiz{
    quizId: string,
    quesion: string,
} 

export interface QuizTypesOderingAnswer{
    Id: string,
    quizId: string,
    answer: string,
    order: number
}



// export interface CourseTypesCreate{
//     classId: string;
//     title:string;
//     description: string;
//     DifficultyLevel: string;
//     number: number;
// }

