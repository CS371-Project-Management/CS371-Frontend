import { CourseTypesResponse } from "@/types/courseTypes";

export class Course {
    id:string;
    class_id: string;
    title: string;
    description: string;
    difficulty_level: string;
    number: number;
  
    constructor(data: CourseTypesResponse) {
     this.id = data.id;
      this.class_id = data.class_id;
      this.title = data.title;
      this.description = data.description;
      this.difficulty_level = data.difficulty_level;
      this.number = data.number;
    }
  
    toJSON() {
      return {
        id: this.id,
        class_id: this.class_id,
        title: this.title,
        description: this.description,
        difficulty_level: this.difficulty_level,
        number: this.number
      };
    }

    static fromResponse(data: CourseTypesResponse): Course{
        return new Course(data);
    }
  

  }
  