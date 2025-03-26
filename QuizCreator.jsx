import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Switch 
} from '@/components/ui/switch';
import { createQuiz } from '../services/quizService';

const QuizCreator = () => {
  const [quiz, setQuiz] = useState({
    title: '',
    timedQuiz: false,
    duration: 0,
    questions: []
  });

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, {
        text: '',
        type: 'multiple-choice',
        options: ['', '', '', ''],
        correctAnswer: ''
      }]
    });
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSubmitQuiz = async () => {
    try {
      await createQuiz(quiz);
      // Reset or navigate after successful creation
    } catch (error) {
      console.error('Quiz creation failed', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Quiz Creator</h1>

      <div className="space-y-4">
        <Input 
          placeholder="Quiz Title"
          value={quiz.title}
          onChange={(e) => setQuiz({...quiz, title: e.target.value})}
        />

        <div className="flex items-center space-x-2">
          <label>Timed Quiz</label>
          <Switch 
            checked={quiz.timedQuiz}
            onCheckedChange={(checked) => setQuiz({...quiz, timedQuiz: checked})}
          />
          {quiz.timedQuiz && (
            <Input 
              type="number" 
              placeholder="Duration (minutes)"
              value={quiz.duration}
              onChange={(e) => setQuiz({...quiz, duration: parseInt(e.target.value)})}
            />
          )}
        </div>

        {quiz.questions.map((question, index) => (
          <div key={index} className="border p-4 rounded space-y-2">
            <Input 
              placeholder="Question Text"
              value={question.text}
              onChange={(e) => updateQuestion(index, 'text', e.target.value)}
            />
            {question.options.map((option, optionIndex) => (
              <Input 
                key={optionIndex}
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChange={(e) => {
                  const updatedOptions = [...question.options];
                  updatedOptions[optionIndex] = e.target.value;
                  updateQuestion(index, 'options', updatedOptions);
                }}
              />
            ))}
          </div>
        ))}

        <div className="flex space-x-4">
          <Button onClick={addQuestion}>Add Question</Button>
          <Button onClick={handleSubmitQuiz}>Create Quiz</Button>
        </div>
      </div>
    </div>
  );
};

export default QuizCreator;
