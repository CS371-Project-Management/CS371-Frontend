export interface CourseTypesResponse {
    id:number,
    classId: string,
    title: string;
    description: string;
    difficultyLevel: string;
    number: number;
  }

export interface CourseTypesCreate{
    classId: string;
    title:string;
    description: string;
    DifficultyLevel: string;
    number: number;
}

