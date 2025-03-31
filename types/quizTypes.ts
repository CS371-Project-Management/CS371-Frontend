export interface QuizTypesResponse {
    id:string,
    courseId: string,
    number: number,
    point: number,
    quizType: string,
    title: string,
    lesson: string,
  }

  export interface QuizTypesCreate {
    courseId: string,
    number: number,
    point: number,
    quizType: string,
    title: string,
    lesson: string,
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

