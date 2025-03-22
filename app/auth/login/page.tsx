'use client';

import Image from 'next/image';

export default function LoginPage() {
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

                <input type="text" placeholder="Username" className="w-1/2 border rounded-full p-2 pl-5 mb-4 text-black" />
                <input type="password" placeholder="Password" className="w-1/2 border rounded-full p-2 pl-5 mb-4 text-black" />

                <div className='flex justify-between w-1/2 mb-4 text-sm text-black'>
                    <label className='flex'>
                        <input type="checkbox" className='mr-2'/> Remember me
                    </label>
                    <a href="/auth/forgot_password" className='underline'>Forgot Password?</a>
                </div>

                <a href="/user/home" className='flex justify-center w-full'>
                    <button className="w-1/2 bg-black text-white py-2 px-4 rounded-md">Login</button>
                </a>

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
