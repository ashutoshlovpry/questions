import React from 'react';
import './Question.css';
import { MathJax, MathJaxContext } from "better-react-mathjax";

const Question = (props) => {
    console.log({props})
    return (
        <MathJax>
        {props.question    && <h1>{props.question}</h1>}
        </MathJax>
    );
}

export default Question;