import axiosInstance from "@/lib/api";
import { Course } from "@/models/Course";
import { Quiz } from "@/models/quiz/Quiz";
import { CourseTypesCreate, CourseTypesResponse } from "@/types/courseTypes";
import { QuizTypesCreate, QuizTypesResponse } from "@/types/quizTypes";

export class QuizService {
      
    
      static async createQuiz(quiz: QuizTypesCreate): Promise<any> {
        try {
          await axiosInstance.post("/quizzes", quiz);
        } catch (error: any) {
          
          const errorMessage =
            error.response?.data?.message || error.message || 'Failed to create quiz.';
          throw new Error(errorMessage);
        }
      }

     
      static async getAllQuizByCourseId(id: string): Promise<Quiz[]> {
        try {
            const response = await axiosInstance.get<QuizTypesResponse[]>(`/quizzes/${id}`, { withCredentials: true });
            return response.data.map(quizData => Quiz.fromResponse(quizData));
        } catch (error:any) {
            if (error.response) {
                throw new Error(`Failed to fetch quiz: ${error.response.data.message || 'Unknown error'}`);
            } else {
                console.error('Error123:', error.message);
                throw new Error(`Failed to fetch quiz: ${error.message || 'Unknown error'}`);
            }
        }
    }

    //งง
    static async getCourseProgress(courseId: string, userId:string): Promise<any>{
        try{
            const reponse = await axiosInstance.put<CourseTypesResponse>(`/courses/${id}`, course.toJSON(),{withCredentials:true});
            return Course.fromResponse(reponse.data);
        }catch(error){
            throw new Error('Failed to update couese.');
        }
    }

    static async deleteCourse(id: number): Promise<void>{
        try {
            await axiosInstance.delete(`/coueses/${id}`, {withCredentials:true});
        }catch (error){
            throw new Error('Failed to delete couese.')
        }
    }
    
    
}