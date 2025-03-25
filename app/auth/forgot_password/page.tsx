'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from 'next/image';
import { UserService } from "@/services/userService";

export default function ForgotPasswordPage() {
     const [email, setEmail] = useState('');
    
        const router = useRouter();
    
        const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          };
       
        async function handleSendLink() {
                try {
                await UserService.requestResetPassword(email);        
              
                } catch (err: any) {
                    console.log(err)    
                }
              }
          
    
        return (
            <div className="flex h-screen">
                <div className="w-full flex flex-col justify-center items-center p-10 bg-white text-black">
                    <h2 className="mb-6 text-3xl font-bold text-black">Password Reset</h2>
                    <span className="px-2 text-gray-500 m-4">Request an password reset</span>
    
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSendLink();

                    }} className='flex flex-col items-center w-1/2'>
                        <input 
                            type="text" 
                            placeholder="Email"
                            value={email} 
                            onChange={handleEmailChange}
                            className="w-full border rounded-full p-2 pl-5 mb-4 text-black"
                            required
                        />
           
    
                        <button 
                            type="submit" 
                            className="w-full bg-gray-600 hover:bg-gray-900 text-white py-2 px-4 rounded-md" >
                            Send link
                        </button>
                    </form>
    
                    <p className="mt-4 text-gray-500">
                        Don't have an account? 
                        <a href="/auth/register" className="pl-2 underline text-black">Register</a>
                    </p>
                </div>
    
                <div className="w-full">
                    <Image src="/images/image.jpg" alt="Register Image" width={800} height={600} className="h-full w-full object-cover" />
                </div>

            </div>
        );
    
}