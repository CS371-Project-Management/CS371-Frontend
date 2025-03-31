"use client";

import CopyCard from "@/components/CopyCard";
import ModalCreateClassroom from "@/components/modals/classroom/Create";
import { Class } from "@/models/Class";
import { User } from "@/models/User";
import { ClassService } from "@/services/classServices";
import { UserService } from "@/services/userService";
import { BookOpen, Code, Database, Palette } from "lucide-react";
import { useEffect, useState } from "react";


export default function MyCreatedClassroomPage() {
    const [user, setUser] = useState<User | null>(null);
    const [classes, setClasses] = useState<Class[] | null>(null);
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
                const data = await ClassService.getOwnedClass(userFetch.id);
                setClasses(data);
                setUser(user)
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
                console.error('Error fetching users:', errorMessage);
            }
        }

        fetchUsers();
    }, []);


    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="m-20">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-15">My Created Classroom</h2>

                <div className="flex gap-3">

                    <button
                        className="bg-gray-500 hover:bg-gray-800 p-5 h-fit rounded-xl text-white shadow-2xl"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Create New Classroom
                    </button>
                </div>
            </div>

            {classes?.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-xl text-gray-500">
                    No classroom found
                </div>
            ) : (
                <div className="flex flex-wrap gap-6 ml-5 mt-5">
                    {classes?.map((cls, index) => (
                    <CopyCard
                        key={index}
                        image={"/images/image.jpg"}
                        title={cls.title}
                        description={cls.description}
                    />
                ))}
                </div>
            )}

            {/* Create Classroom Modal */}
            <ModalCreateClassroom
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
