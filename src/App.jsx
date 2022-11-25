import questions from "./questions";
import { useState, useEffect } from "react";
function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  return <main className="app">
    <div className="left-side">
      <div className="number-question">
        <span> Pregunta {currentQuestion + 1} de</span> {questions.length}
      </div>
      <div className="title-question">
        ¿Pregunta?
      </div>
    </div>
    <div className="right-side">
      <button>Opcion 1</button>
      <button>Opcion 2</button>
      <button>Opcion 3</button>
      <button>Opcion 4</button>
    </div>
  </main>
}
export default App;