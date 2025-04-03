import axiosInstance from "@/lib/api";
import { Course } from "@/models/Course";
import { Quiz } from "@/models/quiz/Quiz";
import { CourseTypesCreate, CourseTypesResponse } from "@/types/courseTypes";
import { QuizTypesCreate, QuizTypesResponse } from "@/types/quizTypes";

export class QuizService {
      
    //success
      static async createQuiz(quiz: QuizTypesCreate): Promise<any> {
        console.log("Quiz Type:", quiz);
        try {
          await axiosInstance.post("/quizzes", quiz);
         
        } catch (error: any) {
          
          const errorMessage =
            error.response?.data?.message || error.message || 'Failed to create quiz.';
          throw new Error(errorMessage);
        }
      }

     //success
      static async getAllQuizByCourseId(id: string): Promise<Quiz[]> {
        try {
            const response = await axiosInstance.get<{ quizzes: QuizTypesResponse[] }>(
                `/quizzes/${id}`, 
                { withCredentials: true }
            );
    
            const quizzes = response.data.quizzes;
    
            if (!Array.isArray(quizzes)) {
                throw new Error("Invalid response format: quizzes is not an array");
            }
    
            return quizzes.map((quizData: QuizTypesResponse) => Quiz.fromResponse(quizData));
    
        } catch (error: any) {
            if (error.response) {
                throw new Error(`Failed to fetch quiz: ${error.response.data || 'Unknown error'}`);
            } else {
                console.error('Error:', error.message);
                throw new Error(`Failed to fetch quiz: ${error.message || 'Unknown error'}`);
            }
        }
    }
    

    //งง
    static async getCourseProgress(courseId: string, userId:string): Promise<any>{
        try{
            const reponse = await axiosInstance.get<CourseTypesResponse>(`/users/${userId}/courses/${courseId}/progress`,{withCredentials:true});
            return Course.fromResponse(reponse.data);
        }catch(error){
            throw new Error('Failed to get process.');
        }
    }

    static async deleteQuiz(id: string): Promise<void>{
        try {
            const response = await axiosInstance.delete(`/quizzes/${id}`, {withCredentials:true});
            return response.data;
        }catch (error){
            throw new Error('Failed to delete quizzes.')
        }
    }
    
    
}