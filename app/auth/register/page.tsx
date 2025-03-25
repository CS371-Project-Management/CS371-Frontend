'use client';

import ModalReportFail from '@/components/modals/report/ReportFail';
import ModalReportSuccess from '@/components/modals/report/ReportSuccess';
import { UserService } from '@/services/userService';
import { UserTypesCreate } from '@/types/userTypes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const router = useRouter();
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    const [isFailed, setIsFailed] = useState(false);
    const [isSuccess, setIsSucccess] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setEmailError(false); 
        };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
        setUsernameError(false); 
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordError(false);
        };


    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
        setFirstNameError(false);
      };
      
      const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
        setLastNameError(false);
      };

      const validateForm = () => {
        let isValid = true;
        
        if (!username) {
          setUsernameError(true);
          isValid = false;
          
        }
        
        if (!password) {
          setPasswordError(true);
          isValid = false;
        }
        
        if (!email) {
          setEmailError(true);
          isValid = false;
        }
        
        if (!firstName) {
          setFirstNameError(true);
          isValid = false;
        }
        
        if (!lastName) {
          setLastNameError(true);
          isValid = false;
        }
        
        return isValid;
      };

        async function handleRegisterClick() {
            if (!validateForm()) {
                return;
              }

            let userRegis: UserTypesCreate = {
              username: username,
              password: password,
              email: email,
              firstname: firstName,
              lastname: lastName,
              role: "student"
            };
        
            try {
              await UserService.register(userRegis);
              setIsSucccess(true)
              
              
            } catch (err) {
                setUsernameError(true)
                setUsernameErrorMessage("This username already exists.");
                setIsFailed(true)
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

                <div className= "flex flex-row flex-wrap w-1/2 mb-4 ">
                    <div className='w-full h-[60px]'>
                        <input type="text" placeholder="Username"  className="w-full border rounded-full p-2 pl-5 " onChange={handleUsernameChange}/>
                        <div>
                            {usernameError && (
                            <p className="text-red-500 text-[12px]">{usernameErrorMessage}</p>
                            )}
                        </div>
                        
                    </div>
                    
                    <div className='w-full  h-[60px]'>
                        <input type="password" placeholder="Password" className="w-full border rounded-full p-2 pl-5" onChange={handlePasswordChange} />
                        {passwordError && (
                            <p className="text-red-500 text-[12px]">Please fill in your information properly.</p>
                        )}
                    </div>
                    
                    <div className='w-full  h-[60px]'>
                        <input type="email" placeholder="Email address" className="w-full border rounded-full p-2 pl-5" onChange={handleEmailChange}/>
                        {emailError && (
                            <p className="text-red-500 text-[12px]">Please fill in your information properly.</p>
                        )}
                    </div>
                    
                    <div className='w-full  h-[60px]'>
                        <input type="text" placeholder="First name" className="w-full border rounded-full p-2 pl-5" onChange={handleFirstNameChange}/>
                        {firstNameError && (
                            <p className="text-red-500 text-[12px]">Please fill in your information properly.</p>
                        )}
                    </div>
                    
                    <div className='w-full  h-[60px]'>
                        <input type="text" placeholder="Last name" className="w-full border rounded-full p-2 pl-5" onChange={handleLastNameChange}/>
                        {lastNameError && (
                        <p className="text-red-500 text-[12px]">Please fill in your information properly.</p>
                        )}
                    </div>
                    

                </div>

               

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
            <ModalReportFail
                isOpen={isFailed}
                onClose={() => {setIsFailed(false)}}
                title='Cannot save this account.'
                press='Agree'>
            </ModalReportFail>

            <ModalReportSuccess
                isOpen={isSuccess}
                onClick={() => {router.push('/auth/login')}}
                title='Create account completed.'
                press='Sign in'>
            </ModalReportSuccess>
        </div>
    );
}
