import axiosInstance from "@/lib/api";
import { Course } from "@/models/Course";
import { CourseTypesCreate, CourseTypesResponse } from "@/types/courseTypes";

export class CourseService {
      
    
      static async createCourse(course: CourseTypesCreate): Promise<any> {
        try {
          await axiosInstance.post("/courses", course);
        } catch (error: any) {
          
          const errorMessage =
            error.response?.data?.message || error.message || 'Failed to create course.';
          throw new Error(errorMessage);
        }
      }

     
      static async getCourseByClassId(id: string): Promise<Course[]> {
        try {
            const response = await axiosInstance.get<CourseTypesResponse[]>(`/courses/class/${id}`, { withCredentials: true });
            return response.data.map(courseData => Course.fromResponse(courseData));
        } catch (error:any) {
            if (error.response) {
                throw new Error(`Failed to fetch course: ${error.response.data.message || 'Unknown error'}`);
            } else {
                console.error('Error123:', error.message);
                throw new Error(`Failed to fetch course: ${error.message || 'Unknown error'}`);
            }
        }
    }

    static async updateCourse(id: string, course:Course): Promise<Course>{
        try{
            const reponse = await axiosInstance.put<CourseTypesResponse>(`/courses/${id}`, course.toJSON(),{withCredentials:true});
            return Course.fromResponse(reponse.data);
        }catch(error){
            throw new Error('Failed to update couese.');
        }
    }

    static async deleteCourse(id: string): Promise<void>{
        try {
            await axiosInstance.delete(`/coueses/${id}`, {withCredentials:true});
        }catch (error){
            throw new Error('Failed to delete couese.')
        }
    }
    
    
}