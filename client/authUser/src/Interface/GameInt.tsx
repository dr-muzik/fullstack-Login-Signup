import React, { useEffect, useState } from "react";
import CountDown from "../Component/CountDown";
import Questions from "../Component/Questions";
import { IQuestion, Quiz1, Quiz2, Quiz3 } from "../Questiongenerators";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { ICollation } from "../App";
import { useAuth } from '../StateContext/AuthContext'

const GameInt:React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  const Navigate = useNavigate();

  //called the global state manager
  const { selectedAnswers, updateData, object, QuestionsNum, seconds, updateSeconds } = useAuth();

  let { quizId } = useParams();
  console.log(quizId);

  let data: IQuestion[];
  //switch cases
  switch (quizId) {
    case (quizId = "Cos102"):
      data = Quiz1;
      break;
    case (quizId = "Phy115"):
      data = Quiz2;
      break;
    case (quizId = "Chem103"):
      data = Quiz3;
      break;

    default:
      data = [];
  }

  useEffect(() => {
    updateData(data);
    console.log('Number of Questions: ', QuestionsNum)
    console.log('Number of seconds: ', seconds)
  }, [data, updateData]);

  const nextQuestionHandler = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
    }
  };

  const prevQuestionHandler = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const currentObject = object[index];

  //Number of questions === number of buttons
  const buttonCount: number = data?.slice(0, QuestionsNum).length;

  const handleNavigate = () => {
      updateSeconds(60);
      Navigate('/dashboard/Quiz')
  }

  return (
    <main>
      <div className="container">
        <div className="question-type">
          <h1>{quizId?.toUpperCase()}</h1>
          <button onClick={handleNavigate}>back</button>
        </div>
        <form action="" typeof="submit">
          <div className="main">
            {/* -----------top segment ------- */}
            <div className="top">
              <div className="left">
                {/* <CountDown
                  seconds={120}
                  questions={data}
                /> */}
                <CountDown />
              </div>
              <div className="right">
                {" "}
                <Link to="/submit">
                  <button>Submit</button>
                </Link>
              </div>
            </div>

            {/* -----------middle segment ------- */}
            <div className="mid">
              {/* question and answers interface */}
              <div className="cont">
                <Questions object={currentObject} />
              </div>
            </div>

            {/*-------- lower-------- segment */}

            <div className="bottom">
              {/* question number button */}
              <div className="left">
                {Array.from({ length: buttonCount }, (_, i) => (
                  <button
                    className="btn "
                    key={i}
                    style={
                      selectedAnswers.some((el) => el.id === i + 1)
                        ? { backgroundColor: "green" }
                        : { backgroundColor: "white" }
                    }
                    onClick={() => {
                      setIndex(i);
                    }}
                    type="button"
                  >
                    {i + 1}
                  </button>
                ))}
                {/* index */}
              </div>

              {/* prev and next button */}
              <div className="right">
                <button type="button" onClick={prevQuestionHandler}>
                  Prev
                </button>
                <button type="button" onClick={nextQuestionHandler}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default GameInt;
