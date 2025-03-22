"use client";

import ModalCongratulation from "@/components/modals/lesson/Congratulation";
import ModalWarning from "@/components/modals/lesson/Warning";
import Link from "next/link";
import { useState } from "react";

export default function LessonPage() {
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [isCongratModalOpen, setIsCongratModalOpen] = useState(false);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <Link href="/main/my_classroom/courses">
                <div className="flex items-center text-lg font-semibold cursor-pointer hover:opacity-80">
                    <div className="flex justify-center mr-2 w-8 border border-2 border-bg-black rounded-full">
                        ⬅
                    </div>   
                    Lesson 1
                </div>
            </Link>

            <h2 className="mt-6 text-lg font-semibold">Content 2 : content name</h2>

            <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600 mt-4 rounded-lg">
                reference image <br /> <span className="text-sm">(optional)</span>
            </div>

            <p className="mt-4 text-gray-700">
                This is a content about ... The ... is the important bla bla bla
            </p>

            <div className="flex justify-between mt-6">
                <button className="bg-gray-800 text-white px-6 py-2 rounded-md shadow-md hover:opacity-80"
                    onClick={() => setIsWarningModalOpen(true)}>
                Back
                </button>

                <button className="bg-gray-800 text-white px-6 py-2 rounded-md shadow-md hover:opacity-80"
                    onClick={() => setIsCongratModalOpen(true)}>
                Next
                </button>
            </div>

            <ModalWarning
                isOpen={isWarningModalOpen}
                onClose={() => {setIsWarningModalOpen(false)}}>
            </ModalWarning>

            <ModalCongratulation
                isOpen={isCongratModalOpen}
                onClose={() => {setIsCongratModalOpen(false)}}>
            </ModalCongratulation>
        </div>
    );
}
