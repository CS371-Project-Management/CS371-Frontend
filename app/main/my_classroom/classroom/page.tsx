'use client';

import ModalDeleteClassroom from '@/components/modals/classroom/Delete';
import ModalEditClassroom from '@/components/modals/classroom/Edit';
import ModalLeaveClassroom from '@/components/modals/classroom/Leave';
import NavbarClassroom from '@/components/modals/classroom/Navbar';
import Image from 'next/image';
import { useState } from 'react';

export default function ClassroomPage() {
    const [isPrivate, setIsPrivate] = useState(false);
    const [isLeaveClassroom, setIsLeaveClassroom] = useState(false);
    const [isEditClassroom, setIsEditClassroom] = useState(false);
    const [isDeleteClassroom, setIsDeleteClassroom] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            <NavbarClassroom></NavbarClassroom>   

            <div className="p-4">
                <div className="flex justify-between m-10 rounded-md">
                    <Image
                        src="/images/image.jpg"
                        alt="Fundamental Web Dev with HTML5 & CSS3"
                        width={400}
                        height={150}
                        className='rounded-lg'
                    />

                    <div className='flex gap-7'>
                        {/* <USER></USER> */}
                        <button 
                            className="h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                            onClick={() => setIsLeaveClassroom(true)}>
                            Leave
                        </button>

                        {/* <STAFF></STAFF> */}
                        {/* <div className='flex items-start gap-3 mt-2.5'>
                            <span className="text-md font-semibold">Private</span>
                            <label className="flex items-center cursor-pointer">
                                <input
                                type="checkbox"
                                checked={isPrivate}
                                onChange={() => setIsPrivate(!isPrivate)}
                                className="hidden"
                                />
                                <div className={`mt-0.5 w-11 h-5 flex items-center bg-blue-200 rounded-full p-1 transition-all ${isPrivate ? "bg-blue-700" : ""}`}>
                                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all ${isPrivate ? "translate-x-5" : ""}`}></div>
                                </div>
                            </label>    
                        </div>
                    
                        <button 
                            className="h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                            onClick={() => {setIsEditClassroom(true)}}>
                            Edit
                        </button>

                        <button 
                            className="h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                            onClick={() => {setIsDeleteClassroom(true)}}>
                            Delete
                        </button> */}
                    </div>
                </div>

                <div className="flex flex-col gap-5 bg-gray-100 border border-[rgba(0,0,0,0.1)] rounded-md shadow-2xl p-4 m-10">
                    <div className="mb-4">
                        <h3 className="text-xl font-bold">Classroom name</h3>
                        <p className="text-lg">
                            Lite : Fundamental Web Dev with HTML5 &amp; CSS3
                        </p>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-bold">Description</h3>
                        <p className="text-gray-700">
                            เริ่มตั้งแต่ฐานรากถึงขั้นตอนขั้นสูงด้วย HTML5 และ CSS3
                        </p>
                    </div>
                </div>
            </div>

            <ModalLeaveClassroom
                isOpen={isLeaveClassroom}
                onClose={() => {setIsLeaveClassroom(false)}}>
            </ModalLeaveClassroom>

            <ModalEditClassroom
                isOpen={isEditClassroom}
                onClose={() => {setIsEditClassroom(false)}}>
            </ModalEditClassroom>

            <ModalDeleteClassroom
                isOpen={isDeleteClassroom}
                onClose={() => {setIsDeleteClassroom(false)}}>
            </ModalDeleteClassroom>
        </div>
    );
}
