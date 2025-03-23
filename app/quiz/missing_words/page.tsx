'use client';

import { useState } from 'react';

export default function MissingWord() {
  const [question, setQuestion] = useState<string>('');
  const [questionImage, setQuestionImage] = useState<string | null>(null);
  const [missingWord, setMissingWord] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
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

      {/* Missing Word Input */}
      <input
        type="text"
        placeholder="Write down the missing words."
        value={missingWord}
        onChange={(e) => setMissingWord(e.target.value)}
        className="w-full border rounded p-2 mb-2"
      />
      <div className='flex justify-end'>
      <button className="border rounded px-4 py-1 text-gray-700 hover:text-white hover:bg-gray-600">Confirm</button>
      </div>

      {/* Answer */}
      <p className="mt-4 font-bold">Answer:</p>
      <input
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border rounded p-2 w-full"
      />

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
