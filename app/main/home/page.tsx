'use client';

import Image from 'next/image';
import { BookOpen, Code, Database, Palette } from 'lucide-react';
import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import ModalJoinClassroom from '@/components/modals/classroom/Join';
import { UserService } from '@/services/userService';
import { User } from '@/models/User';
import { p } from 'framer-motion/client';
import { ClassService } from '@/services/classServices';
import { Class } from '@/models/Class';

const classes: Class[] = await ClassService.getAllClasses(); //Waittt
    // [
    //     new Class({
    //         id: 1,
    //         title: "How to Leave",
    //         inviteCode: "omE",
    //         description: "Leave someone",
    //         accessibility: "private",
    //     }),
    //     new Class({
    //         id: 2,
    //         title: "How to Leave",
    //         inviteCode: "omE",
    //         description: "Leave someone",
    //         accessibility: "private",
    //     }),
    //     new Class({
    //         id: 3,
    //         title: "How to Leave",
    //         inviteCode: "omE",
    //         description: "Leave someone",
    //         accessibility: "private",
    //     }),
    // ]

export default function HomePage() {
    const [selectedClass, setSelectedClass] = useState<Class | null>(null);
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

    const openModal = (cls: Class) => {
        setSelectedClass(cls);
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
                    {classes?.map((cls, index) => (
                        <div key={index}
                            className='flex justify-center w-120'
                            onClick={() => openModal(cls)}>
                            <div className=' h-48 w-96 mr-5 bg-blue-200 rounded-xl'>
                                <Image
                                    src={"/images/image.png"}
                                    alt={cls.title}
                                    width={300}
                                    height={100}
                                    className="w-full h-full rounded-lg"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex flex-wrap gap-6'>
                    {classes?.map((cls, index) => (
                        <div key={index}
                            onClick={() => openModal(cls)}>
                            <Card image={"/images/image.jpg"} title={cls.title} description={cls.description}></Card>
                        </div>
                    ))}
                </div>
            </div>

            <ModalJoinClassroom
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedClass={selectedClass}>
            </ModalJoinClassroom>

        </div>
    );
}
