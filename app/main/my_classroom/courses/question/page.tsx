"use client";

import { useState } from "react";
import Link from "next/link";

export default function QuestionPage() {
    const [selectedAnswer, setSelectedAnswer] = useState("");

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

            <h2 className="mt-6 text-lg font-semibold">
                Question 1 of 10 : Single Choices
            </h2>
            <h3 className="mt-2 text-gray-800 font-medium">Question 1</h3>

            <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600 mt-4 rounded-lg">
                reference image <br /> <span className="text-sm">(optional)</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
                {["Answer 1", "Answer 2", "Answer 3", "Answer 4"].map((answer) => (
                    <label
                        key={answer}
                        className="flex items-center border rounded-md px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                        <input
                        type="radio"
                        name="quiz"
                        value={answer}
                        checked={selectedAnswer === answer}
                        onChange={() => setSelectedAnswer(answer)}
                        className="mr-2"
                        />
                        {answer}
                    </label>
                ))}
            </div>

            <div className="flex justify-between mt-6">
                <button className="bg-gray-800 text-white px-6 py-2 rounded-md shadow-md hover:opacity-80">
                Back
                </button>

                <button
                className={`px-6 py-2 rounded-md shadow-md ${
                    selectedAnswer
                    ? "bg-gray-800 text-white hover:opacity-80"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
                disabled={!selectedAnswer}
                >
                Next
                </button>
            </div>
        </div>
    );
}
