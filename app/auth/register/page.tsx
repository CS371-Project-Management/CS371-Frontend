'use client';

import { UserService } from '@/services/userService';
import { UserTypesCreate } from '@/types/userTypes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const router = useRouter();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        };

    const handleFirstnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstname(event.target.value);
        };
    
    const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstname(event.target.value);
        };


        async function handleRegisterClick() {
            let userRegis: UserTypesCreate = {
              username: username,
              password: password,
              email: email,
              firstname: firstname,
              lastname: lastname,
              role: "student"
            };
        
            try {
              await UserService.register(userRegis);
              router.push('/auth/login')
              
            } catch (err) {
              alert('Registration failed: ' + JSON.stringify(err));
            }
          }

    return (
        <div className="flex h-screen">
            <div className="w-full flex flex-col justify-center items-center p-10 bg-white text-black">
                <h2 className="mb-6 text-3xl font-bold">Register</h2>

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

                <input type="text" placeholder="Username"  className="w-1/2 border rounded-full p-2 pl-5 mb-4" onChange={handleUsernameChange}/>
                <input type="password" placeholder="Password" className="w-1/2 border rounded-full p-2 pl-5 mb-4" onChange={handlePasswordChange} />
                <input type="email" placeholder="Email address" className="w-1/2 border rounded-full p-2 pl-5 mb-4" onChange={handleEmailChange}/>
                <input type="text" placeholder="First name" className="w-1/2 border rounded-full p-2 pl-5 mb-4" onChange={handleFirstnameChange}/>
                <input type="text" placeholder="Last name" className="w-1/2 border rounded-full p-2 pl-5 mb-4" onChange={handleLastnameChange}/>

                <a  className='flex justify-center w-full'>
                    <button className="w-1/2 bg-black text-white py-2 px-4 rounded-md" onClick={() => {handleRegisterClick();}}>Register</button>
                </a>

                <p className="mt-4 text-gray-500">
                    Already have an account? 
                    <a href="/auth/login" className="pl-2 underline text-black">Login</a>
                </p>
            </div>

            <div className="w-full">
                <Image src="/images/image.jpg" alt="Register Image" width={800} height={600} className="h-full w-full object-cover" />
            </div>
        </div>
    );
}
