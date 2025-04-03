import axiosInstance from "@/lib/api";
import { Course } from "@/models/Course";
import { User } from "@/models/User";
import { ClassTypesResponse } from "@/types/classTypes";
import { CourseTypesCreate, CourseTypesResponse, CourseTypesUpdate } from "@/types/courseTypes";
import { UserTypesResponse } from "@/types/userTypes";

export class CourseService {
      
        //success
        // {
        //     "class_id": "f8faf4f0-09cb-11f0-9cd2-0242ac120002",
        //     "title": "Math",
        //     "description": "Mathematics",
        //     "difficulty_level": "medium",
        //     "number" : 1
        //   }
          
      static async createCourse(course: CourseTypesCreate): Promise<any> {
        try {
          await axiosInstance.post("/courses", course);
        } catch (error: any) {
          
          const errorMessage =
            error.response?.data?.message || error.message || 'Failed to create course.';
          throw new Error(errorMessage);
        }
      }

      //success
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

    static async getCourseByCourseId(id: string): Promise<Course> {
        try {
            const response = await axiosInstance.get<CourseTypesResponse>(`/courses/${id}`, { withCredentials: true });
            return Course.fromResponse(response.data)
        } catch (error:any) {
            if (error.response) {
                throw new Error(`Failed to fetch course: ${error.response.data.message || 'Unknown error'}`);
            } else {
                console.error('Error123:', error.message);
                throw new Error(`Failed to fetch course: ${error.message || 'Unknown error'}`);
            }
        }
    }

    static async getUserByClassId(id:string): Promise<User[]>{
        try {
            const response = await axiosInstance.get<UserTypesResponse[]>(`/classes/${id}/users`, { withCredentials: true });
            return response.data.map((userData: UserTypesResponse) => User.fromResponse(userData));
        } catch (error:any) {
            if (error.response) {
                throw new Error(`Failed to fetch users: ${error.response.data.message || 'Unknown error'}`);
            } else {
                console.error('Error123:', error.message);
                throw new Error(`Failed to fetch users: ${error.message || 'Unknown error'}`);
            }
        }
    }

    //X
    static async updateCourse(id: string, course: Course): Promise<any> {
        try {
            const courseUpdate: CourseTypesUpdate = {
                title: course.title,
                description: course.description,
                difficulty_level: course.difficulty_level,
                number: course.number,
            };
            console.log(courseUpdate);
            const response = await axiosInstance.put<CourseTypesResponse>(
                `/courses/${id}`, 
                courseUpdate,       
                { withCredentials: true }
            );
        } catch (error: any) {
            // แสดงข้อความข้อผิดพลาดที่ชัดเจนขึ้น
            console.error("Error updating course:", error);
            throw new Error('Failed to update course.');
        }
    }
    //X
    static async deleteCourse(id: string): Promise<void>{
        try {
            const response = await axiosInstance.delete(`/coueses/${id}`, {withCredentials:true});
            return response.data
        }catch (error){
            throw new Error('Failed to delete couese.')
        }
    }


    
    
}