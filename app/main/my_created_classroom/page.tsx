"use client";

import Card from "@/components/Card";
import ModalCreateClassroom from "@/components/modals/CreateClassroom";
import { BookOpen, Code, Database, Palette } from "lucide-react";
import { useState } from "react";

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

export default function MyCreatedClassroomPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <div className="m-20">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-15">My Created Classroom</h2>

                <button className="bg-gray-800 p-5 h-fit rounded-xl text-white shadow-2xl"
                    onClick={() => {setIsModalOpen(true)}}>
                    Create New Classroom
                </button>
            </div>

            <div className="flex flex-wrap gap-6 ml-5">
                    {courses.map((course, index) => (
                        <div key={index}>
                            <Card image={course.image} title={course.title} description={course.description}></Card>
                        </div>
                    ))}
            </div>
                
            <ModalCreateClassroom
                isOpen={isModalOpen}
                onClose={() => {setIsModalOpen(false)}}>
            </ModalCreateClassroom>
        </div>
    );
}
