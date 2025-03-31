"use client";

import ModalDeleteUser from "@/components/modals/user/DeleteUser";
import NavbarClassroom from "@/components/modals/classroom/Navbar";
import Image from "next/image";
import { useState } from "react";

const members = [
    {
        profile: "/images/image.jpg",
        username: "one apollo",
    },
    {
        profile: "/images/image.jpg",
        username: "two apollo",
    },
    {
        profile: "/images/image.jpg",
        username: "three apollo",
    },
    {
        profile: "/images/image.jpg",
        username: "four apollo",
    },
    {
        profile: "/images/image.jpg",
        username: "five apollo",
    },
    {
        profile: "/images/image.jpg",
        username: "six apollo",
    },
];

export default function MemberPage() {
    const [isDeleteUser, setIsDeleteUser] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            <NavbarClassroom />

            <div className="ml-20 mt-20 mb-15 text-3xl font-bold">
                Members {members.length}
            </div>

            {members.length === 0 ? (
                <div className="flex items-center justify-center mt-10">
                <p className="text-xl text-gray-500">No members</p>
                </div>
            ) : (
                <div className="flex flex-wrap flex-col gap-6 mx-25">
                {members.map((member, index) => (
                    <div key={index}>
                    <div className="flex justify-between items-center bg-gray-100 max-w-full rounded-full shadow-lg border border-[rgba(0,0,0,0.1)]">
                        <div className="flex gap-10">
                        <Image
                            src={member.profile}
                            alt="image"
                            width={100}
                            height={20}
                            className="p-4 rounded-full"
                        />
                        <p className="flex items-center">{member.username}</p>
                        </div>

                        {/* STAFF action */}
                        <button
                        className="mr-12 h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        onClick={() => setIsDeleteUser(true)}
                        >
                        Delete
                        </button>
                    </div>
                    </div>
                ))}
                </div>
            )}

            <ModalDeleteUser isOpen={isDeleteUser} onClose={() => setIsDeleteUser(false)} />
        </div>
    );
}
