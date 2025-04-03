import { useState } from 'react';

interface Answer {
  id: number, //id does not matter, we will use index to determine order
  text: string;
}

interface OrderItem {
  position: number;
  answerId: number | null;
}

export default function Ordering() {
  const [answers, setAnswers] = useState<Answer[]>([
    { id: 1, text: '' },
    { id: 2, text: '' },
    { id: 3, text: '' },
    { id: 4, text: '' }
  ]);
  const [correctOrder, setCorrectOrder] = useState<number[]>([1, 2, 3, 4]);

  const updateAnswer = (id: number, text: string) => {
    setAnswers(answers.map(answer =>
      answer.id === id ? { ...answer, text } : answer
    ));
  };

  const addAnswer = () => {
    const newId = answers.length + 1;
    setAnswers([...answers, { id: newId, text: '' }]);
  };

  const removeOrderItem = (id: number) => {
    setAnswers(answers.filter(answer => answer.id !== id));
  };

  return (
    <div>
      <div className="">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {answers.map((answer, index) => (
            <div key={answer.id} className="mb-2 relative w-full">
              <input
                type="text"
                placeholder={`Answer order no.${index + 1}`}
                value={answer.text}
                onChange={(e) => updateAnswer(answer.id, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button onClick={() => removeOrderItem(answer.id)} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">×</button>
            </div>
          ))}
        </div>

        <button
          onClick={addAnswer}
          className="p-2 border border-gray-300 rounded-md w-full"
        >
          Add more answer
        </button>

      </div>

      <div className="mt-4 flex justify-end">
        <button className="px-4 py-1 bg-gray-200 rounded-md">
          Confirm
        </button>
      </div>

    </div>
  );
}