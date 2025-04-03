'use client';

import ModalDeleteClassroom from '@/components/modals/classroom/Delete';
import ModalEditClassroom from '@/components/modals/classroom/Edit';
import ModalLeaveClassroom from '@/components/modals/classroom/Leave';
import NavbarClassroom from '@/components/modals/classroom/Navbar';
import { Class } from '@/models/Class';
import { User } from '@/models/User';
import { ClassService } from '@/services/classServices';
import { UserService } from '@/services/userService';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ClassroomPage() {
    const { classId } = useParams();
    const [isLeaveClassroom, setIsLeaveClassroom] = useState(false);
    const [isEditClassroom, setIsEditClassroom] = useState(false);
    const [isDeleteClassroom, setIsDeleteClassroom] = useState(false);
    const [cls, setCls] = useState<Class | null>(null)
    const [user, setUser] = useState<User>();
    const [inviteCode, setInviteCode] = useState("");
    const [reveal, setReveal] = useState<boolean>(false)
    useEffect(() => {
        async function fetchData() {
            try {
                const userId = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('user') || 'null') : null;
                if (!userId) {
                    console.error('User ID not found in localStorage');
                    return;
                }

                const [userFetch, classFetch, inviteCode] = await Promise.all([
                    UserService.getUserById(userId),
                    ClassService.getClassById(classId),
                    ClassService.getInviteCode(classId),
                ]);
                setUser(userFetch);
                setCls(classFetch);
                setInviteCode(inviteCode);
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }
        }

        fetchData();
    }, [classId]);


    return (
        <div className="min-h-screen bg-white">
            {cls ?
                <>
                    <NavbarClassroom classId={classId}></NavbarClassroom>

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

                                <button
                                    className="h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                    onClick={() => { setIsEditClassroom(true) }}>
                                    Edit
                                </button>

                                <button
                                    className="h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                    onClick={() => { setIsDeleteClassroom(true) }}>
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 bg-gray-100 border border-[rgba(0,0,0,0.1)] rounded-md shadow-2xl p-4 m-10">
                            <div className="mb-4">
                                <h3 className="text-xl font-bold">Classroom name</h3>
                                <p className="text-lg">
                                    {cls?.title}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold">Description</h3>
                                <p className="text-gray-700">
                                    {cls?.description}
                                </p>
                            </div>

                            <div className="group">
                                <p onClick={() => setReveal(prev => !prev)} className="p-2 px-6 border-2 border-dashed border-blue-600 rounded-lg w-fit cursor-pointer">
                                    {reveal ? inviteCode : "Click to see invite code"}
                                </p>
                            </div>

                        </div>
                    </div>
                </> :
                <div className="min-h-screen w-full flex justify-center items-center bg-white">
                    <h1 className='text-red-700'>Sorry, Please re-check classroom ID again</h1>
                </div>}

            <ModalLeaveClassroom
                isOpen={isLeaveClassroom}
                onClose={() => { setIsLeaveClassroom(false) }}>
            </ModalLeaveClassroom>
            {cls ? <ModalEditClassroom
                isOpen={isEditClassroom}
                onClose={() => { setIsEditClassroom(false) }}
                cls={cls}
            >
            </ModalEditClassroom> : null}


            <ModalDeleteClassroom
                isOpen={isDeleteClassroom}
                onClose={() => { setIsDeleteClassroom(false) }}
                cls={cls}
                user_id={user?.id}
            >
            </ModalDeleteClassroom>
        </div>
    );
}
