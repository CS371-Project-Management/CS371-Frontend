import axiosInstance from "@/lib/api";
import { ClassTypesCreate, ClassTypesResponse } from "@/types/classTypes";
import { Class } from "@/models/Class";
import { User } from "@/models/User";
import { UserTypesResponse } from "@/types/userTypes";

export class ClassService {
      
    //success
    static async createClass(classroom: ClassTypesCreate): Promise<void> {
        try {
          await axiosInstance.post("/classes", classroom, {withCredentials:true});
        } catch (error: any) {
          
          const errorMessage =
            error.response?.data?.message || error.message || 'Failed to create class.';
          throw new Error(errorMessage);
        }
      }

     //success
      static async getAllClasses(): Promise<Class[]> {
        try {
            const response = await axiosInstance.get<ClassTypesResponse[]>(`/classes`, { withCredentials: true });
            return response.data.map((classroomData: ClassTypesResponse) => Class.fromResponse(classroomData));
        } catch (error:any) {
            if (error.response) {
                throw new Error(`Failed to fetch classes: ${error.response.data.message || 'Unknown error'}`);
            } else {
                console.error('Error:', error.message);
                throw new Error(`Failed to fetch classes: ${error.message || 'Unknown error'}`);
            }
        }
    }
    //success
    static async getClassById(id: string): Promise<Class> {
        try {
            const response = await axiosInstance.get<ClassTypesResponse>(`/classes/${id}`, { withCredentials: true });
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
    //success
    static async updateClass(id: string, classroom:Class): Promise<Class>{
        try{
            const reponse = await axiosInstance.put<ClassTypesResponse>(`/classes/${id}`, classroom.toJSON(),{withCredentials:true});
            return Class.fromResponse(reponse.data);
        }catch(error){
            throw new Error('Failed to update class.');
        }
    }

    //success
    static async getInviteCode(class_id: string): Promise<any>{
        try{
            const response = await axiosInstance.get(`/classes/${class_id}/invite_code`, { withCredentials: true });
            return response.data.invite_code 
        }catch{
            throw new Error('Failed to get invite code.')
        }
    }
    //success
    static async joinPublicClass(class_id: string): Promise<void>{
        try{
            await axiosInstance.post(`/classes/${class_id}/join-public`, { withCredentials: true });

        }catch{
            throw new Error('Failed to join class.')
        }
    }
    
    static async joinPrivateClass(invite_code: string): Promise<void>{
        try{
            await axiosInstance.post(`/classes/join-private`,{withCredentials: true});

        }catch{
            throw new Error('Failed to join class.')
        }
    }
    
    //X
    static async leaveClass(class_id: string): Promise<void>{
        try{
            await axiosInstance.post(`/classes/leaveClass/${class_id}`,{withCredentials: true});

        }catch{
            throw new Error('Failed to leave class.')
        }
    }
    //success
    static async deleteClass(user_id: string, class_id: string): Promise<void> {
        try {
            await axiosInstance.delete(`/classes/${class_id}/users/${user_id}`, { withCredentials: true });
        } catch {
            throw new Error('Failed to delete class.');
        }
    }
    
    static async getOwnedClass(user_id:string): Promise<Class[]> {
        try {
            const response = await axiosInstance.get<ClassTypesResponse[]>(`/classes/owned/${user_id}`, { withCredentials: true });
            return response.data.map((classroomData: ClassTypesResponse) => Class.fromResponse(classroomData));
        } catch (error:any) {
            if (error.response) {
                throw new Error(`Failed to fetch classes: ${error.response.data.message || 'Unknown error'}`);
            } else {
                console.error('Error:', error.message);
                throw new Error(`Failed to fetch classes: ${error.message || 'Unknown error'}`);
            }
        }
    }

    static async getUserByClassId(class_id:string): Promise<User[]> {
        try {
            const response = await axiosInstance.get<UserTypesResponse[]>(`/classes/${class_id}/users`, { withCredentials: true });
            return response.data.map((user: UserTypesResponse) => User.fromResponse(user));
        } catch (error:any) {
            if (error.response) {
                throw new Error(`Failed to fetch classes: ${error.response.data.message || 'Unknown error'}`);
            } else {
                console.error('Error:', error.message);
                throw new Error(`Failed to fetch classes: ${error.message || 'Unknown error'}`);
            }
        }
    }
    //success
    static async getClassUserJoinByUserID(user_id: string): Promise<Class[]> {
        try {
            const response = await axiosInstance.get<ClassTypesResponse[]>(`/classes/joined/${user_id}`, { withCredentials: true });
            return response.data.map((classroom: ClassTypesResponse) => Class.fromResponse(classroom));
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
            console.error('Error:', errorMessage);
            throw new Error(`Failed to fetch classes: ${errorMessage}`);
        }
    }
    
    
}