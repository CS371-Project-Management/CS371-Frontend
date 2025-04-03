"use client"

import { useState } from 'react';
import Head from 'next/head';
import QuizContent from '@/components/QuizContent';
import QuizMaker from '@/components/QuizMaker';

interface Quiz {
  id: number;
  title: string;
  content: null | {
    title: string;
    description: string;
    image?: string;
  };
  questions: any[];
}

export default function CreateQuiz() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([{ id: 1, title: 'Quiz 1', content: null, questions: [] }]);
  const [selectedQuiz, setSelectedQuiz] = useState<number>(1);
  const [view, setView] = useState<'main' | 'content' | 'quiz'>('content');

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addContent = () => {
    setView('content');
  };

  const addQuiz = () => {
    setView('quiz');
  };

  const saveQuiz = () => {
    setView('main');
  };

  const deleteQuiz = (id: number) => {
    if (quizzes.length > 1) {
      const newQuizzes = quizzes.filter(quiz => quiz.id !== id);
      setQuizzes(newQuizzes);
      setSelectedQuiz(newQuizzes[0].id);
    } else {
      // Reset the quiz if it's the last one
      const resetQuiz = { id: 1, title: 'Quiz 1', content: null, questions: [] };
      setQuizzes([resetQuiz]);
      setSelectedQuiz(1);
    }
    setView('main');
  };

  const addNewQuiz = () => {
    const newId = Math.max(...quizzes.map(q => q.id)) + 1;
    const newQuiz = { id: newId, title: `Quiz ${newId}`, content: null, questions: [] };
    setQuizzes([...quizzes, newQuiz]);
    setSelectedQuiz(newId);
  };

  const currentQuiz = quizzes.find(quiz => quiz.id === selectedQuiz) || quizzes[0];

  return (
    <div className="min-h-screen flex">
      <Head>
        <title>Quiz Builder</title>
        <meta name="description" content="Quiz Builder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-full">
        <div className="w-56 bg-gray-900 h-screen">
          <div className="bg-blue-500 p-4 text-white font-semibold">
            {currentQuiz.title}
          </div>
          <div className="p-4 flex flex-col gap-2">
            <button 
              onClick={addContent} 
              className="bg-gray-600 text-white p-2 rounded-md w-full"
            >
              Add Content
            </button>
            <button 
              onClick={addQuiz} 
              className="bg-gray-600 text-white p-2 rounded-md w-full"
            >
              Add Quiz
            </button>
            <button 
              onClick={saveQuiz} 
              className="bg-green-500 text-white p-2 rounded-md w-full"
            >
              Save
            </button>
          </div>
          <div className="absolute bottom-0 left-0 w-56 p-4">
            <button 
              onClick={() => deleteQuiz(currentQuiz.id)} 
              className="bg-yellow-500 text-white p-2 rounded-md w-full flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Quiz
            </button>
          </div>
        </div>

        <div className="flex-1">
          {view === 'main' && (
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Quiz Builder</h2>
              <p className="mb-4">Select an option from the sidebar to start building your quiz.</p>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={addContent} 
                  className="bg-blue-500 text-white p-3 rounded-md"
                >
                  Add Content
                </button>
                <button 
                  onClick={addQuiz} 
                  className="bg-green-500 text-white p-3 rounded-md"
                >
                  Add Quiz Question
                </button>
                <button 
                  onClick={addNewQuiz} 
                  className="bg-purple-500 text-white p-3 rounded-md"
                >
                  Create New Quiz
                </button>
              </div>
            </div>
          )}
          
          {view === 'content' && (
            <QuizContent title={title} description={description} setTitle={setTitle} setDescription={setDescription}/>
          )}
          
          {view === 'quiz' && (
            <QuizMaker />
          )}
        </div>
      </div>
    </div>
  );
}