"use client";

import React from "react";
import { CheckCircle, XCircle, MinusCircle } from "lucide-react";
import Link from "next/link";

const mockData = [
    { name: "User 1", points: 11, answers: ["✔", "❌", "✔", "✔", "✔", "✔", "✔", "✔", "✔", "❌", "✔", "✔"] },
    { name: "User 2", points: 10, answers: ["✔", "✔", "❌", "✔", "✔", "✔", "✔", "✔", "✔", "✔", "✔", "✔"] },
    { name: "User 3", points: 9, answers: ["✔", "✔", "✔", "✔", "✔", "✔", "❌", "✔", "✔", "✔", "❌", "✔"] },
    { name: "User 4", points: 8, answers: ["❌", "✔", "✔", "✔", "✔", "✔", "✔", "✔", "✔", "✔", "✔", "✔"] },
    { name: "User 5", points: 10, answers: ["✔", "✔", "❌", "✔", "✔", "❌", "✔", "✔", "✔", "✔", "✔", "✔"] },
    { name: "User 6", points: 9, answers: ["✔", "✔", "✔", "✔", "✔", "✔", "❌", "✔", "✔", "✔", "❌", "✔"] },
    { name: "User 7", points: 8, answers: ["❌", "✔", "✔", "❌", "✔", "✔", "✔", "✔", "✔", "✔", "✔", "✔"] },
];

const questions = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12"];

export default function Leaderboard() {
    return (
        <div className="ml-13 mt-6 mr-20 p-6 min-h-screen">
            <Link href="/main/my_classroom/courses/detail">
                <button className="flex items-center text-lg mb-4">
                    <div className="w-8 border border-2 border-bg-black rounded-full">
                        ⬅
                    </div> 
                    <span className="ml-2">Back to All Lessons</span>
                </button>
            </Link>

            <div className="flex items-center gap-8 bg-white p-5 text-lg rounded-3xl shadow-2xl my-7 border border-[rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" />
                    <span>Correct</span>
                </div>

                <div className="flex items-center gap-2">
                    <XCircle className="text-red-500" />
                    <span>Incorrect</span>
                </div>

                <div className="flex items-center gap-2">
                    <MinusCircle className="text-gray-500" />
                    <span>Timeout</span>
                </div>
            </div>

            <div className="bg-gray-800 text-white p-5 py-6 pl-6.5 rounded-3xl shadow-md">
                <div className="grid grid-cols-[25rem_8rem_repeat(12,7.7rem)]">

                    <div className="bg-blue-500 text-center text-lg font-bold p-2 rounded-t-3xl">Name</div>
                    <div className="bg-blue-600 text-center text-lg font-bold p-2 rounded-t-3xl">Points</div>
                    {questions.map((q, i) => (
                        <div key={i} className="bg-yellow-500 text-center text-lg text-black font-bold p-2 rounded-t-3xl">
                        {q}
                        </div>
                    ))}

                    {mockData.map((user, index) => (
                        <React.Fragment key={index}>
                            <div className="flex items-center gap-2 p-2 border-b border-gray-600 bg-blue-200 text-black min-h-[48px]">
                                <div className="w-10 text-center">{index + 1}</div>
                                <div className="w-12 h-12 mr-2 bg-gray-400 rounded-full flex items-center justify-center text-white">👤</div>
                                <div>{user.name}</div>
                            </div>

                            <div className="flex items-center justify-center text-center p-2 border-b border-gray-600 bg-blue-300 text-black min-h-[48px]">
                                {user.points}
                            </div>

                            {user.answers.map((answer, qIndex) => (
                                <div key={qIndex} className="flex items-center justify-center p-2 border-b border-gray-600 bg-gray-900 min-h-[48px]">
                                    {answer === "✔" ? (
                                        <CheckCircle className="text-green-500" />
                                    ) : answer === "❌" ? (
                                        <XCircle className="text-red-500" />
                                    ) : (
                                        <MinusCircle className="text-gray-500" />
                                    )}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}

                    <div className="bg-blue-500 text-center font-bold p-2 rounded-b-3xl"></div>
                    <div className="bg-blue-600 text-center font-bold p-2 rounded-b-3xl"></div>
                    {questions.map((i) => (
                        <div key={i} className="bg-yellow-500 text-center font-bold p-2 rounded-b-3xl"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
