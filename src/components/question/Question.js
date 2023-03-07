import React from 'react';
import './Question.css';
import { MathJax } from "better-react-mathjax";

const Question = (props) => {
    return (
        <MathJax>
        {props.question    && <h1>{props.question}</h1>}
        </MathJax>
    );
}

export default Question;