import React from 'react';
import './App.css';
import Quiz from './components/QuizMain';
import { MathJax, MathJaxContext } from "better-react-mathjax";
function App() {
  return (
    <div className="App">
             <MathJaxContext>

      <Quiz />
      </MathJaxContext>

    </div>
  );
}

export default App;
