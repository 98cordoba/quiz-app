import questions from "./questions";
import { useState, useEffect } from "react";

function App() {
  //Variables
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [countdown, setCountdown] = useState(false);
  const [answerShow, setAnswerShow] = useState(false);

  //Funciones
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
        setTimeLeft(10);
      }
    }, 1500);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) setTimeLeft(timeLeft - 1); //setTimeLeft((prev) => prev - 1);
      if (timeLeft === 0) setCountdown(true);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);
  if (isFinished) return (
    <main className="app">
      <div className="game-over">
        <span>
          {" "}
          Puntuación {score} de {questions.length}{" "}
        </span>
        <button onClick={() => (window.location.href = "/")}>
          {" "}
          Volver a jugar
        </button>
        <button onClick={() => {
          setIsFinished(false);
          setAnswerShow(true);
          setCurrentQuestion(0);
        }}>Ver Respuestas</button>
      </div>
    </main>
  );
  if (answerShow)
    return (
      <main className="app">
        <div className="left-side">
          <div className="number-question">
            <span> Pregunta {currentQuestion + 1} de {questions.length}</span> 
          </div>
          <div className="title-question">
            {questions[currentQuestion].question}
          </div>
          <div>
            {
              questions[currentQuestion].options.filter(
                (option) => option.isCorrect
              )[0].textAnswer
            }
          </div>
          <button onClick={() => {
            if (currentQuestion === questions.length - 1) {
              setIsFinished(true);
              window.location.href = "/";
            } else {
              setCurrentQuestion(currentQuestion + 1);
            }
          }}>
            {currentQuestion === questions.length - 1 ? "Volver a jugar" : "Siguiente"}
          </button>
        </div>
      </main>
    );
  return <main className="app">
    <div className="left-side">
      <div className="number-question">
        <span> Pregunta {currentQuestion + 1} de {questions.length}</span> 
      </div>
      <div className="title-question">
        {questions[currentQuestion].question}
      </div>
      <div >{!countdown ? (
        <span className="timeLeft">Tiempo restante: {timeLeft}{" "}</span>
      ) : (
        <button
          onClick={() => {
            setTimeLeft(10);
            setCountdown(false);
            setCurrentQuestion(currentQuestion + 1);
          }}>Continuar</button>
      )}
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