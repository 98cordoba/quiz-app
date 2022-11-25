import questions from "./questions";
import { useState, useEffect } from "react";
function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [countdown, setCountdown] = useState(false);

  function handleAnswerSubmit(isCorrect, e) {
    // añadir puntuación
    if (isCorrect) setScore(score + 1);
    // añadir estilos de pregunta
    e.target.classList.add(isCorrect ? "correct" : "incorrect");
    // cambiar a la siguiente pregunta
    setTimeout(() => {
      if (currentQuestion === questions.length - 1) {
        setIsFinished(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 1500); 
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) setTimeLeft(timeLeft - 1);
      if (timeLeft === 0) setCountdown(true);
    }, 1000);
    return () => clearInterval(interval);
  },[timeLeft]);
  if (isFinished) return(
    <main className="app">
      <div className="game-over">
        <span>
          {" "}
          Puntuación {score} de {questions.length}{" "}
        </span>
        <button onClick={() => (window.location.href = "/")}>{" "}Volver a jugar</button>
      </div>
    </main>
  )
  return <main className="app">
    <div className="left-side">
      <div className="number-question">
        <span> Pregunta {currentQuestion + 1} de</span> {questions.length}
      </div>
      <div className="title-question">
        {questions[currentQuestion].question}
      </div>
      <div className="timeLeft">
        <span>Tiempo restante: {timeLeft}{" "}</span>
      </div>
    </div>
    <div className="right-side">
      {questions[currentQuestion].options.map((answer) => (
        <button disabled={countdown} key={answer.textAnswer} onClick={(e) => handleAnswerSubmit(answer.isCorrect, e)}>{answer.textAnswer} </button>
      ))}
    </div>
  </main>
}
export default App;