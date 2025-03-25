'use client';

import Image from 'next/image';
import { BookOpen, Code, Database, Palette } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Course } from '@/interfaces/course';
import Card from '@/components/Card';
import ModalJoinClassroom from '@/components/modals/classroom/Join';
import { UserService } from '@/services/userService';
import { User } from '@/models/User';
import { p } from 'framer-motion/client';
 
const courses = [
    {
        title: 'UX/UI Design Bootcamp',
        description: 'เรียนออกแบบ UX/UI ตั้งแต่พื้นฐานจนถึงขั้นสูง',
        image: '/images/image.jpg',
        icon: <Palette size={24} />,
    },
    {
        title: 'Data Analytics with Python',
        description: 'วิเคราะห์ข้อมูลด้วย Python และเครื่องมือต่าง ๆ',
        image: '/images/image.jpg',
        icon: <Database size={24} />,
    },
    {
        title: 'Fundamental Web Dev',
        description: 'HTML5 และ CSS3 สำหรับมือใหม่',
        image: '/images/image.jpg',
        icon: <Code size={24} />,
    },
    {
        title: 'Introduction to JavaScript',
        description: 'พื้นฐานการเขียนโปรแกรมด้วย JavaScript',
        image: '/images/image.jpg',
        icon: <Code size={24} />,
    },
    {
        title: 'Web App Development with Node.js',
        description: 'เรียนรู้ Node.js และ Express',
        image: '/images/image.jpg',
        icon: <BookOpen size={24} />,
    },
];

export default function HomePage() {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
      const [user, setUser] = useState<User | null>(null);

     useEffect(() => {
        async function fetchUsers() {
            try {
                //localStorage จากที่เก็บ userId ในหน้า Login
                const userId = JSON.parse(localStorage.getItem('user') || 'null');
                if (!userId) {
                    console.error('User ID not found in localStorage');
                    return;
                }
                
                const userFetch = await UserService.getUserById(userId)
                setUser(userFetch);
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
                console.error('Error fetching users:', errorMessage);
            }
        }
        
        fetchUsers();
      }, []);

 
    

    const openModal = (course: Course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="relative w-full h-96">
                <Image
                src="/images/image.jpg"
                alt="Learning Hub"
                layout="fill"
                objectFit="cover"
                className="opacity-80"
                />


                <div className="relative flex p-10 text-center">
                <h1 className="text-7xl font-bold text-blue-400">LEARNING HUB</h1>
                <h1 className="text-7xl font-bold text-blue-400">{user?.username}</h1>
                </div>
            </div>

            <div className="m-10 ml-16">
                <div className='flex flex-wrap pb-10 gap-y-4'>
                    {courses.map((course, index) => (
                        <div key={index} 
                            className='flex justify-center w-120' 
                            onClick={() => openModal(course)}>
                            <div className=' h-48 w-96 mr-5 bg-blue-200 rounded-xl'>
                            <Image
                                src={course.image}
                                alt={course.title}
                                width={300}
                                height={100}
                                className="w-full h-full rounded-lg"
                            />
                            </div>
                        </div>
                    ))}
                </div>  

                <div className='flex flex-wrap gap-6'>
                    {courses.map((course, index) => (
                        <div key={index}
                            onClick={() => openModal(course)}>
                            <Card image={course.image} title={course.title} description={course.description}></Card>
                        </div>
                    ))}
                </div>  
            </div>
            
            <ModalJoinClassroom 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                selectedCourse={selectedCourse}>
            </ModalJoinClassroom>

        </div>
    );   
}
