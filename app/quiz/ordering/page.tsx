'use client';

import { useState } from 'react';

export default function OrderingQuestion() {
    const [question, setQuestion] = useState<string>('');
    const [questionImage, setQuestionImage] = useState<string | null>(null);
    const [answers, setAnswers] = useState<string[]>([
        'Answer 1',
        'Answer 2',
        'Answer 3',
        'Answer 4',
    ]);
    const [answerImage, setAnswerImage] = useState<string | null>(null);
    const [answerDescription, setAnswerDescription] = useState<string>('');
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    
    const handleImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
        setImage: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
        setImage(URL.createObjectURL(file));
        }
    };

    const handleDragStart = (index: number) => {
        setDraggingIndex(index);
    };

    const handleDragOver = (index: number, event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (draggingIndex === null || draggingIndex === index) return;

        const newOrder = [...answers];
        const draggedItem = newOrder.splice(draggingIndex, 1)[0];
        newOrder.splice(index, 0, draggedItem);

        setDraggingIndex(index);
        setAnswers(newOrder);
    };

    const handleDrop = () => {
        setDraggingIndex(null);
    };

    return (
        <div className="ml-60 mt-4 p-6 mr-5">
            <div className='flex gap-3 mb-3'>
                <button 
                    className="h-fit bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => {}}>
                    Edit
                </button>

                <button 
                    className="h-fit bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                    onClick={() => {}}>
                    Submit
                </button>
            </div>

            <input
                type="text"
                placeholder="Write your question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full border rounded p-2 mb-4"
            />

            <div className="w-full bg-gray-200 h-48 flex items-center justify-center rounded mb-4 relative">
                {questionImage ? (
                <img src={questionImage} alt="Uploaded" className="w-full h-full object-cover rounded" />
                ) : (
                <label className="cursor-pointer text-center text-gray-600">
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setQuestionImage)}
                    className="hidden"
                    />
                    <p className='border border-2 p-4 rounded-xl'>📷 Upload Reference Image (Optional)</p>
                </label>
                )}
            </div>

            <div className="space-y-2">
                {answers.map((answer, index) => (
                <div
                    key={answer}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(index, e)}
                    onDrop={handleDrop}
                    className={`border rounded p-2 shadow cursor-pointer transition-colors 
                    ${draggingIndex === index ? 'bg-red-500 text-white' : 'bg-white'}`}
                >
                    {answer}
                </div>
                ))}
            </div>

            <div className='flex justify-end'>
            <button className="border rounded px-4 py-1 mt-4 text-gray-700 hover:text-white hover:bg-gray-600">Confirm</button>
            </div>

            <p className="mt-4 font-bold">Answer Description</p>

            <div className="w-full bg-gray-200 h-48 flex items-center justify-center rounded mb-4 relative">
                {answerImage ? (
                <img src={answerImage} alt="Uploaded" className="w-full h-full object-cover rounded" />
                ) : (
                <label className="cursor-pointer text-center text-gray-600">
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setAnswerImage)}
                    className="hidden"
                    />
                    <p className='border border-2 p-4 rounded-xl'>📷 Upload Reference Image (Optional)</p>
                </label>
                )}
            </div>

            <textarea
                placeholder="Description"
                value={answerDescription}
                onChange={(e) => setAnswerDescription(e.target.value)}
                className="w-full border rounded p-2 h-32"
            />
        </div>
    );
}
