'use client';

import { Trash } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function QuestionForm() {
  const [question, setQuestion] = useState<string>('');
  const [questionImage, setQuestionImage] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
  const [answerImage, setAnswerImage] = useState<string | null>(null);
  const [answerDescription, setAnswerDescription] = useState<string>('');

  // Handle Image Upload
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Handle Answer Change
  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  // Add More Answers
  const addAnswer = () => {
    setAnswers([...answers, '']);
  };

  // Remove Answer
  const removeAnswer = (index: number) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  // ตรวจสอบว่าคำตอบที่เลือกยังอยู่ใน answers หรือไม่
  useEffect(() => {
    if (correctAnswerIndex !== null && correctAnswerIndex >= answers.length) {
      setCorrectAnswerIndex(null);
    }
  }, [answers]);

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
            
            {/* Question Input */}
            <input
                type="text"
                placeholder="Write your question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full border rounded p-2 mb-4"
            />

            {/* Question Image Upload */}
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

            {/* Answer Choices */}
            {answers.map((answer, index) => (
                <div key={index} className="flex items-center mb-2">
                <input
                    type="radio"
                    name="correctAnswer"
                    checked={correctAnswerIndex === index}
                    onChange={() => setCorrectAnswerIndex(index)}
                    className="mr-2"
                />
                <input
                    type="text"
                    placeholder={`Answer ${index + 1}`}
                    value={answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="border rounded p-2 w-full"
                />
                {index >= 4 && (
                    <button onClick={() => removeAnswer(index)} className="ml-2 text-red-500 hover:text-white hover:bg-red-600 font-bold border border-2 p-2 w-12 rounded-xl">
                    X
                    </button>
                )}
                </div>
            ))}

            {/* Add More Answer Button */}
            <button onClick={addAnswer} className="flex items-center mt-4 ml-5 border rounded px-2 py-1 text-gray-700 hover:text-white hover:bg-gray-600 mt-2">
                <p className='text-2xl mr-1'>+</p> Add more answer
            </button>
            
            {/* Correct Answer Display */}
            {correctAnswerIndex !== null && (
                <div className="mt-4">
                    <p className="font-bold">Answer</p>
                    <div className="inline-flex items-center bg-gray-200 px-3 py-1 rounded">
                        <span className="mr-2">✅ Answer {correctAnswerIndex + 1}: {answers[correctAnswerIndex]}</span>
                        <button onClick={() => setCorrectAnswerIndex(null)} className="flex items-center ml-2 text-red-500">
                            <Trash className='mr-1' size={18}/> Delete
                        </button>
                    </div>
                </div>
            )}

            {/* Answer Explanation */}
            <p className="mt-4 font-bold">Answer Description</p>

            {/* Answer Image Upload */}
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

            {/* Answer Description */}
            <textarea
                placeholder="Description"
                value={answerDescription}
                onChange={(e) => setAnswerDescription(e.target.value)}
                className="w-full border rounded p-2 h-32"
            />
        </div>
    );
}
