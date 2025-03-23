import axiosInstance from "@/lib/api";
import { User } from "@/models/User";
import { UserTypesCreate, UserTypesLogin, UserTypesResponse } from "@/types/userTypes";

export class UserService {

    static async login(user: UserTypesLogin): Promise<any> {
        console.log('Try login:', user);
        try {
          const res = await axiosInstance.post('/login', {
            username: user.username,
            password: user.password,
          });
          console.log('Login Success:', res.data);
          return res.data;
        } catch (error: any) {
          console.log('Login Error:', error.response || error.message);
          throw new Error('Failed to login');
        }
      }
      
    
      static async register(user: UserTypesCreate): Promise<any> {
        try {
          await axiosInstance.post("/users", user);
        } catch (error: any) {
          
          const errorMessage =
            error.response?.data?.message || error.message || 'Failed to register';
          throw new Error(errorMessage);
        }
      }

     

      static async getUserById(id: number): Promise<User> {
        try {
            const response = await axiosInstance.get<UserTypesResponse>(`/users/${id}`, { withCredentials: true });
            return User.fromResponse(response.data);
        } catch (error:any) {
            if (error.response) {
                throw new Error(`Failed to fetch user: ${error.response.data.message || 'Unknown error'}`);
            } else {
                console.error('Error123:', error.message);
                throw new Error(`Failed to fetch user: ${error.message || 'Unknown error'}`);
            }
        }
    }

    static async updateUser(id: number, user:User): Promise<User>{
        try{
            const reponse = await axiosInstance.put<UserTypesResponse>(`/users/${id}`, user.toJSON(),{withCredentials:true});
            return User.fromResponse(reponse.data);
        }catch(error){
            throw new Error('Failed to update user');
        }
    }

    static async deleteUser(id: number): Promise<void>{
        try {
            await axiosInstance.delete(`/users/${id}`, {withCredentials:true});
        }catch (error){
            throw new Error('Failed to delete user.')
        }
    }

    static async logout(): Promise<void> {
        try {
            await axiosInstance.post('/logout', {}, { withCredentials: true });
            console.log('Logout Success');
        } catch (error: any) {
            console.log('Logout Error:', error.response || error.message);
            throw new Error('Failed to logout');
        }
    }

    static async requestResetPassword(email: string): Promise<string> {
        try {
            const res = await axiosInstance.post('/request-reset-password', { email });
            return res.data.reset_token;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to request password reset');
        }
    }
    
    static async resetPassword(token: string, newPassword: string): Promise<void> {
        try {
            await axiosInstance.post('/reset-password', { token, new_password: newPassword });
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to reset password');
        }
    }
    
    
    
}