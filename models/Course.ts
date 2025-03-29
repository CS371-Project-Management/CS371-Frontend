import { CourseTypesResponse } from "@/types/courseTypes";

export class Course {
    id:string;
    classId: string;
    title: string;
    description: string;
    difficultyLevel: string;
    number: number;
  
    constructor(data: CourseTypesResponse) {
     this.id = data.id;
      this.classId = data.classId;
      this.title = data.title;
      this.description = data.description;
      this.difficultyLevel = data.difficultyLevel;
      this.number = data.number;
    }
  
    toJSON() {
      return {
        id: this.id,
        classId: this.classId,
        title: this.title,
        description: this.description,
        difficultyLevel: this.difficultyLevel,
        number: this.number
      };
    }

    static fromResponse(data: CourseTypesResponse): Course{
        return new Course(data);
    }
  

  }
  