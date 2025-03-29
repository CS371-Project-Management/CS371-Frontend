'use client';

import ModalReportFail from '@/components/modals/report/ReportFail';
import { User } from '@/models/User';
import { UserService } from '@/services/userService';
import { UserTypesLogin, UserTypesResponse } from '@/types/userTypes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isFailed, setIsFailed] = useState(false);

    const router = useRouter();

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
      };
    
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    async function handleSignIn() {
        let userLogin: UserTypesLogin = {
          username: username,
          password: password,
        };
      
        try {
          const res = await UserService.login(userLogin);
          localStorage.setItem('token', res.token);
          console.log("res.userid: "+ res.user_id);
          console.log(localStorage.getItem("token"))

            localStorage.setItem('user', JSON.stringify(res.user_id));
            const storedUser = localStorage.getItem('user');
          router.push("/main/home");
      
        } catch (err: any) {
            setIsFailed(true)
            
        }
      }
      

    return (
        <div className="flex h-screen">
            <div className="w-full flex flex-col justify-center items-center p-10 bg-white text-black">
                <h2 className="mb-6 text-3xl font-bold text-black">Login</h2>

                <button
                    // onClick={() => signIn('google')}
                    className="w-1/2 bg-red-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-red-600">
                    Continue with Google
                </button>

                <div className="flex items-center w-1/2 mb-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault(); 
                    handleSignIn();
                }} className='flex flex-col items-center w-1/2'>
                    <input 
                        type="text" 
                        placeholder="Username"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border rounded-full p-2 pl-5 mb-4 text-black"
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-full p-2 pl-5 mb-4 text-black"
                        required
                    />

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <div className='flex justify-between w-full mb-4 text-sm text-black'>
                        <label className='flex'>
                            <input type="checkbox" className='mr-2'/> Remember me
                        </label>
                        <a href="/auth/forgot_password" className='underline'>Forgot Password?</a>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-gray-600 hover:bg-gray-900 text-white py-2 px-4 rounded-md" >
                        Login
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

            <ModalReportFail
                isOpen={isFailed}
                onClose={() => {setIsFailed(false)}}
                title='Incorrect username or password.'
                press='Agree'>
            </ModalReportFail>
        </div>
    );
}
