import { QuizTypesResponse } from "@/types/quizTypes";

export class Quiz {
    id:string;
    courseId: string;
    number: number;
    point: number;
    quizType: string;
    title: string;
    lesson: string;
  
    constructor(data: QuizTypesResponse) {
     this.id = data.id;
      this.courseId = data.courseId;
      this.number = data.number;
      this.point = data.point;
      this.quizType = data.quizType;
      this.title = data.title;
      this.lesson = data.lesson;
    }
  
    toJSON() {
        return {
          id: this.id,
          courseId: this.courseId,
          number: this.number,
          point: this.point,
          quizType: this.quizType,
          title: this.title,
          lesson: this.lesson,
        };
      }

    static fromResponse(data: QuizTypesResponse): Quiz{
        return new Quiz(data);
    }
  

  }
  