import React, { Component } from "react";
import Question from "./question/Question";
//import { toast } from 'react-toastify';
import "./QuizMain.css";
import axios from "axios";
let que = [
  "AreaUnderTheCurve_901",
  "BinomialTheorem_901",
  "DifferentialCalculus2_901",
];
export default class Quiz extends Component {
  state = {
    quiestions: {
      0: "",
      1: "",
      2: "",
    },
    
   
   
    step: 0,
    score: 0,
  };

  prevStep = (step) => {
    this.fetchApi(step);
    this.setState({
      step: step - 1,
     
    });
  };
  // method to move to the next question
  nextStep = async (step) => {
    await this.setState({
      step: step + 1,
    
    });
    await this.fetchApi(step);
  };
  fetchApi = async (id) => {
    try {
      let url = await axios.get(
        "https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=" +
          que[id]
      );
      this.setState(
        {
          ...this.state,
          quiestions: { ...this.state.quiestions, [id]: url.data[0].Question },
        },
        () => {}
      );
    } catch (e) {}
  };
  onQues = async (id) => {
    await this.setState({
      step: id,
    
    });
    await this.fetchApi(id);
  };
  componentDidMount() {
    const fetchApi = async () => {
      try {
        let url = await axios.get(
          "https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=AreaUnderTheCurve_901"
        );
        // if(! url.data[0].Question){
        //   this.setState({...this.state,error:"Something Went Wrong"})
        // }
        await this.setState({
          ...this.state,
          quiestions: { ...this.state.quiestions, 0: url.data[0].Question },
        });
        console.log(url.data[0].Question);
      } catch (e) {
        console.log("ee", e);
      }
    };
    fetchApi();
  }
  render() {
    let { quiestions, step, score } =
      this.state;
    return (
      <>
        {quiestions[0] && quiestions[1] && quiestions[2] && (
          <div>
            <button
              type="button"
              className="block"
              onClick={() => this.onQues(1)}
            >
              1
            </button>
            <br />
            <button className="block" onClick={() => this.onQues(2)}>
              2
            </button>
            <br />
            <button className="block" onClick={() => this.onQues(3)}>
              3
            </button>
          </div>
        )}

        <div className="Content">
          {step <= Object.keys(quiestions).length ? (
            <>
            {/* {this.state.error} */}
              <Question question={quiestions[step - 1]} />

              {step !== 3 && (
                <button
                  className="NextStep"
                  onClick={() => this.nextStep(step)}
                >
                  {step === 0 ? "Proceed to Questions" : "Next"}
                </button>
              )}
              {step > 1 && (
                <button
                  className="NextStep"
                  style={{ marginLeft: "10%" }}
                  onClick={() => this.prevStep(step)}
                >
                  Prevous
                </button>
              )}
            </>
          ) : (
            <div className="finalPage">
              <h1>You have completed the quiz!</h1>
              <p>
                Your score is: {score} of {Object.keys(quiestions).length}
              </p>
              <p>Thank you!</p>
            </div>
          )}
        </div>
      </>
    );
  }
}
