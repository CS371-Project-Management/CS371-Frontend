import axiosInstance from "@/lib/api";
import { ClassTypesCreate, ClassTypesResponse } from "@/types/classTypes";
import { Class } from "@/models/Class";

export class ClassService {
      
    
    static async createClass(classroom: ClassTypesCreate): Promise<void> {
        try {
          await axiosInstance.post("/classes", classroom, {withCredentials:true});
        } catch (error: any) {
          
          const errorMessage =
            error.response?.data?.message || error.message || 'Failed to create class.';
          throw new Error(errorMessage);
        }
      }

     
      static async getAllClasses(): Promise<Class[]> {
        try {
            const response = await axiosInstance.get<ClassTypesResponse[]>(`/classes`, { withCredentials: true });
            return response.data.map(classroomData => Class.fromResponse(classroomData));
        } catch (error:any) {
            if (error.response) {
                throw new Error(`Failed to fetch classes: ${error.response.data.message || 'Unknown error'}`);
            } else {
                console.error('Error123:', error.message);
                throw new Error(`Failed to fetch classes: ${error.message || 'Unknown error'}`);
            }
        }
    }

    static async getCourseById(id: string): Promise<Class> {
        try {
            const response = await axiosInstance.get<ClassTypesResponse>(`/courses/${id}`, { withCredentials: true });
            return Class.fromResponse(response.data);
        } catch (error:any) {
            if (error.response) {
                throw new Error(`Failed to fetch class: ${error.response.data.message || 'Unknown error'}`);
            } else {
                console.error('Error:', error.message);
                throw new Error(`Failed to fetch class: ${error.message || 'Unknown error'}`);
            }
        }
    }

    static async updateClass(id: string, classroom:Class): Promise<Class>{
        try{
            const reponse = await axiosInstance.put<ClassTypesResponse>(`/classes/${id}`, classroom.toJSON(),{withCredentials:true});
            return Class.fromResponse(reponse.data);
        }catch(error){
            throw new Error('Failed to update class.');
        }
    }

    static async deleteClass(id: string): Promise<void>{
        try {
            await axiosInstance.delete(`/classes/${id}`, {withCredentials:true});
        }catch (error){
            throw new Error('Failed to delete class.')
        }
    }

    static async getInviteCode(class_id: string): Promise<any>{
        try{
            const response = await axiosInstance.get(`/classes/${class_id}/invite_code`, { withCredentials: true });
            return response.data; 
        }catch{
            throw new Error('Failed to get invite code.')
        }
    }

    static async joinPublicClass(user_id: string, class_id: string): Promise<void>{
        try{
            await axiosInstance.post(`/classes/${class_id}/join-public`, { withCredentials: true });

        }catch{
            throw new Error('Failed to join class.')
        }
    }

    static async joinPrivateClass(user_id: string, invite_code: string): Promise<void>{
        try{
            await axiosInstance.post(`/classes/join-public`,{withCredentials: true});

        }catch{
            throw new Error('Failed to join class.')
        }
    }
    

    static async leaveClass(user_id: string, class_id: string): Promise<void>{
        try{
            await axiosInstance.post(`/classes/leaveClass/${class_id}`,{withCredentials: true});

        }catch{
            throw new Error('Failed to join class.')
        }
    }

    
}