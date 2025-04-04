import { QuizTypesResponse } from "@/types/quizTypes";

export class Quiz {
    id:string;
    course_id: string;
    number: number;
    point: number;
    quiz_type: string;
    title: string;
    lesson: string;
  
    constructor(data: QuizTypesResponse) {
     this.id = data.id;
      this.course_id = data.course_id;
      this.number = data.number;
      this.point = data.point;
      this.quiz_type = data.quiz_type;
      this.title = data.title;
      this.lesson = data.lesson;
    }
  
    toJSON() {
        return {
          id: this.id,
          courseId: this.course_id,
          number: this.number,
          point: this.point,
          quizType: this.quiz_type,
          title: this.title,
          lesson: this.lesson,
        };
      }

    static fromResponse(data: QuizTypesResponse): Quiz{
        return new Quiz(data);
    }
  

  }
  