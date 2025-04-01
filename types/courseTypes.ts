export interface CourseTypesResponse {
    id:string,
    classId: string,
    title: string;
    description: string;
    difficulty_level: string;
    number: number;
  }

export interface CourseTypesCreate{
  class_id: string;
  title: string;
  description: string;
  difficulty_level: string;
  number: number;
}

export interface CourseTypesUpdate{
  title: string,
  description: string,
  difficulty_level: string,
  number : number
}



