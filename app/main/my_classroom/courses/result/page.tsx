"use client";

import Link from "next/link";
import { useState } from "react";

const questions = [
    {
        id: 1,
        type: "Single Choice",
        question: "When is Jane's birthday?",
        options: [
        { label: "A", value: "07 / 06 / 03", isCorrect: false },
        { label: "B", value: "08 / 07 / 03", isCorrect: true },
        { label: "C", value: "03 / 07 / 06", isCorrect: false },
        { label: "D", value: "07 / 03 / 06", isCorrect: false },
        ],
        userAnswer: "A",
        image: "",
        explanation: "-"
    },
    {
        id: 2,
        type: "Multiple Choices",
        question: "Which colors are primary colors?",
        options: [
        { label: "A", value: "Red", isCorrect: true },
        { label: "B", value: "Blue", isCorrect: true },
        { label: "C", value: "Green", isCorrect: false },
        { label: "D", value: "Yellow", isCorrect: true },
        ],
        userAnswer: "C",
        image: "",
        explanation: "Primary colors are Red, Blue, and Yellow."
    },
    {
        id: 3,
        type: "Ordering",
        question: "Arrange the numbers in ascending order",
        options: [
        { label: "A", value: "3, 2, 1", isCorrect: false },
        { label: "B", value: "1, 2, 3", isCorrect: true },
        { label: "C", value: "2, 3, 1", isCorrect: false },
        ],
        userAnswer: "C",
        image: "/images/image.jpg",
        explanation: "The correct order is 1, 2, 3."
    }
];

export default function ResultPage() {
    const [openQuestion, setOpenQuestion] = useState<number | null>(null);

    const toggleQuestion = (id: number) => {
        setOpenQuestion(openQuestion === id ? null : id);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
            <Link href="/main/my_classroom/courses">
                <div className="flex items-center text-lg font-semibold cursor-pointer hover:opacity-80">
                    <div className="flex justify-center mr-2 w-8 border border-2 border-bg-black rounded-full">
                        ⬅
                    </div>   
                    Back to Course
                </div>
            </Link>

                <div className="flex items-center space-x-4">
                    <span className="text-gray-700 font-semibold">Questions ({questions.length})</span>
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-lg font-semibold">
                        Score: 8 / 10
                    </span>
                </div>
            </div>

            <div className="space-y-2">
                {questions.map((q) => (
                <div key={q.id} className="border rounded-lg">
                    <button
                        onClick={() => toggleQuestion(q.id)}
                        className="flex justify-between w-full px-4 py-3 bg-gray-100 font-semibold"
                    >
                        <span>
                            {q.id} - {q.type}
                        </span>
                        <span>{q.question}</span>
                        <span>{openQuestion === q.id ? "▲" : "▼"}</span>
                    </button>

                    {openQuestion === q.id && (
                    <div className="p-4 bg-white">
                        {q.image && <img src={q.image} alt="Question" className="mb-2 w-full rounded-md" />}
                        {q.options.map((opt) => {
                            const isUserAnswer = q.userAnswer === opt.label;
                            const isCorrect = opt.isCorrect;

                            return (
                                <div
                                key={opt.label}
                                className={`border p-2 rounded-md my-1 transition-all 
                                    ${
                                    isCorrect
                                        ? "border-green-500 text-green-600 bg-green-100 font-semibold"
                                        : isUserAnswer
                                        ? "border-red-500 text-red-600 bg-red-100 font-semibold"
                                        : "border-gray-300"
                                    }`}
                                >
                                {opt.label} {opt.value}
                                </div>
                            );
                        })}

                        <p className="mt-2 text-gray-700 font-semibold">Explanation:</p>
                        <p className="text-gray-600">{q.explanation}</p>
                    </div>
                    )}
                </div>
                ))}
            </div>
        </div>
    );
}