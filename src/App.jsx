import React, {useState, useEffect, useRef} from "react";
import Blobs from "./components/Blobs"
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Buttons from "./components/Buttons";
import Confetti from "react-confetti";
import Loading from "./components/Loading";
import './App.css'

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const dataRef = useRef(false);

  useEffect(() => {
    if(dataRef.current) return;
    dataRef.current = true;
    updateQuestions();
  }, [0])

  function updateQuestions() {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => setQuestions(
        data.results.map(q => ({
          ...q,
          selected: ""
        }))
      ))
  }

  function startAndQuit() {
    gameStarted && resetGame();
    setGameStarted(prevVal => !prevVal);
  }

  function showAnswer() {
    setGameOver(true);
    setScore(calculateScore());
  }

  function calculateScore() {
    let score = 0;
    for(const i of questions) {
      if(i.selected === i.correct_answer) score += 1;
    }
    return score;
  }

  function selectOption(question, option) {
    setQuestions(prevQuestions => 
      prevQuestions.map(q => 
        q.question === question ? {
          ...q,
          selected: option
        } :
        q
      )
    )
  }

  function resetGame() {
    setQuestions([]);
    updateQuestions();
    setGameOver(false);
    setScore(0);
  }

  return (
    <>
    {score === 5 && <Confetti />}
     <Blobs/>
     { gameStarted ? 
      questions.length <= 0 ?
        <Loading /> :
        <div className="game">
          <div className="game--card">
            {questions.map(question => 
              <Question 
                key={question.question} 
                ques={question}
                select={selectOption}
                gameOver={gameOver}
              />
            )}
            <Buttons
              gameOver={gameOver}
              quit={startAndQuit}
              showAnswer={showAnswer}
              playAgain={resetGame}
              score={score}
            />
          </div>
        </div> : 
        <StartScreen start={startAndQuit} />
     }
    </>
  )
}