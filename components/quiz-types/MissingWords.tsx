import { useState } from 'react';

export default function MissingWords() {
  const [answer, setAnswer] = useState<string>('');
  const [missingWordsText, setMissingWordsText] = useState<string>('');
  
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };
  
  const handleMissingWordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMissingWordsText(e.target.value);
  };
  
  return (
    <div>
      <div className="mb-6">
        <input 
          type="text" 
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          placeholder="write down the missing words."
          value={missingWordsText}
          onChange={handleMissingWordsChange}
        />
        <div className="flex justify-end">
          <button className="px-4 py-1 bg-gray-200 rounded-md">
            Confirm
          </button>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Answer:</h3>
        <input 
          type="text" 
          value={answer}
          onChange={handleAnswerChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Answer"
        />
      </div>
      
      <div className="mt-6">
        <div className="h-24 w-96 mx-auto bg-gray-200 flex flex-col items-center justify-center rounded-md mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span className="text-sm text-gray-600">reference image</span>
          <span className="text-xs text-gray-500">(optional)</span>
        </div>
      </div>
    </div>
  );
}
