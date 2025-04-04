"use client";

import { useState } from "react";

type Props = {
    title: string;
    description: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    number: number;
    setNumber: React.Dispatch<React.SetStateAction<number>>;
    point: number;
    setPoint: React.Dispatch<React.SetStateAction<number>>;
};

export default function QuizContent({
    title,
    description,
    setTitle,
    setDescription,
    number,
    setNumber,
    point,
    setPoint,
}: Props) {
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="mb-6">
                <label
                    htmlFor="content-title"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    Content title
                </label>
                <input
                    type="text"
                    id="content-title"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Content title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label
                    htmlFor="quiz-number"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    Quiz number
                </label>
                <input
                    type="number"
                    id="quiz-number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Quiz number"
                    value={number}
                    onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (value > 0) setNumber(value);
                    }}
                />
            </div>

            <div className="mb-6">
                <label
                    htmlFor="quiz-point"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    Point
                </label>
                <input
                    type="number"
                    id="point"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Point"
                    value={point}
                    onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (value > 0) setPoint(value);
                    }}
                />
            </div>

            <div className="mb-6">
                <label
                    htmlFor="content-description"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    Description
                </label>
                <textarea
                    id="content-description"
                    className="w-full p-2 border border-gray-300 rounded-md h-32"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
        </div>
    );
}
