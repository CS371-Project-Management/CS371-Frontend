import { useState } from "react";

export default function QuizSideBar() {
    const [questions, setQuestions] = useState(['Question 1', 'Question 2']);

    const addQuestion = () => {
        setQuestions([...questions, `Question ${questions.length + 1}`]);
    };

    return (
        <div className="fixed w-1/8 bg-gray-900 text-white p-4 flex flex-col h-screen gap-2">
            <h2 className="text-lg font-semibold mb-4">Lesson Name</h2>

            <select className="bg-yellow-500 text-black p-2 mb-2 rounded">
                <option>Limited Time</option>
                <option>Unlimited Time</option>
                <option>15 seconds</option>
                <option>30 seconds</option>
                <option>45 seconds</option>
                <option>60 seconds</option>
            </select>

            <select className="bg-yellow-500 text-black p-2 mb-2 rounded">
                <option>10 Points</option>
                <option>20 Points</option>
                <option>30 Points</option>
                <option>40 Points</option>
                <option>50 Points</option>
            </select>

            <select className="bg-yellow-500 text-black p-2 mb-4 rounded">
                <option>Content</option>
                <option>Lesson</option>
                <option>Single choice</option>
                <option>Multiple choices</option>
                <option>Ordering</option>
                <option>Missing words</option>
            </select>

            {questions.map((q, index) => (
                <div key={index} className="bg-white hover:bg-gray-700 text-black hover:text-white p-3 my-2 rounded cursor-pointer">
                {q}
                </div>
            ))}

            <button onClick={addQuestion} className="bg-red-400 hover:bg-red-600 text-white py-2 mt-4 rounded">
                Add
            </button>
        </div>
    );
}