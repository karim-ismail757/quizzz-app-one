
import React from 'react';
import {useState,useEffect } from 'react';
import questionAPI from './Question';
import QuestionBox from './component/QuestionBox';
import Result from './component/ResultBox'


function Quiz() {
    const [QuestionBank, setQuestionBank] = useState([]);
    const [score, setScore] = useState(0);
    const [responses, setResponses] = useState(0);
    useEffect(() => {

       getQuestions(); 
    });

  
    const getQuestions = () => {
      questionAPI().then(question => {
        setQuestionBank( question);
      });
    };
      // Set state back to default and call function
    const  playAgain=() => {
        getQuestions();
        setScore(0);
        setResponses(0);
      };
      
      // Function to compute scores
      const computeAnswer = (answer, correctAns) => {
        if (answer === correctAns) {
          setScore(
            score  + 1
          );
        }
        setResponses(
          responses < 5
            ? setResponses + 1
            : 5
        );
      };
      
  

  return (
    <div className="container">
    <div className="title">
      QuizOn
    </div>

    {QuestionBank.length > 0 && 
     responses < 5 && 
     QuestionBank.map(({question, answers,
     correct, questionId}) => <QuestionBox question=
     {question} options={answers} key={questionId}
     selected={answer => computeAnswer(answer, correct)}/>)}

    {
      responses === 5
        ? (<Result score={score}
          playAgain={playAgain}/>)
        : null
    }

  </div>

  );
  }



export default Quiz;
