'use client';

import ForSureClassroom from '@/components/Modal/ForSureClassroom';
import NavbarClassroom from '@/components/NavbarClassroom';
import Image from 'next/image';
import { useState } from 'react';

export default function ClassroomPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

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

                    <button 
                        className="h-fit mt-4 bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        onClick={() => setIsModalOpen(true)}>
                        Leave
                    </button>
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

            <ForSureClassroom
                isOpen={isModalOpen}
                onClose={() => {setIsModalOpen(false)}}>
            </ForSureClassroom>
        </div>
    );
}
