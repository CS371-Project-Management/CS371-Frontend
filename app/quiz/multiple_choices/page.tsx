'use client';

import { useState } from 'react';

export default function MultiChoice() {
  const [question, setQuestion] = useState<string>('');
  const [questionImage, setQuestionImage] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ text: string; isCorrect: boolean }[]>([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);
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
    updatedAnswers[index].text = value;
    setAnswers(updatedAnswers);
  };

  // Toggle Correct Answer
  const toggleCorrectAnswer = (index: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].isCorrect = !updatedAnswers[index].isCorrect;
    setAnswers(updatedAnswers);
  };

  // Add More Answers
  const addAnswer = () => {
    setAnswers([...answers, { text: '', isCorrect: false }]);
  };

  // Remove Answer
  const removeAnswer = (index: number) => {
    setAnswers(answers.filter((_, i) => i !== index));
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
            type="checkbox"
            checked={answer.isCorrect}
            onChange={() => toggleCorrectAnswer(index)}
            className="mr-2"
          />
          <input
            type="text"
            placeholder={`Answer ${index + 1}`}
            value={answer.text}
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
