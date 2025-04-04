import { CreateMissingWordQuizData } from '@/types/quizTypes';
import { useState } from 'react';

type Props = {
  answers: string,
  setAnswers: React.Dispatch<React.SetStateAction<string>>;
}

export default function MissingWords({answers, setAnswers} : Props) {
  
  return (
    <div>
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Answer:</h3>
        <input 
          type="text" 
          value={answers}
          onChange={(e) => setAnswers(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Answer"
        />
      </div>
    </div>
  );
}
