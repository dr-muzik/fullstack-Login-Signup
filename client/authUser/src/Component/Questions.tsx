// import React, { useContext } from "react";
import { IQuestion, ICollation } from "../Questiongenerators";
// import { ICollation } from "../App";
import { useAuth } from "../StateContext/AuthContext";

interface QuestionProp {
  object: IQuestion;
  // selectedAnswers: ICollation[];
  // setSelectedAnswers: React.Dispatch<React.SetStateAction<ICollation[]>>;
}

const Questions: React.FC<QuestionProp> = ({
  object,
  // selectedAnswers,
  // setSelectedAnswers,
}) => {
  // const {Testing} = useContext(GameContext);

  // console.log(Testing)

  const { selectedAnswers, updateSelectedAnswers } = useAuth();
  // console.log(selectedAnswers);
  const inputHandler = (
    questionId: number,
    selectedOption: string,
    questionAnswered: string
  ) => {
    const obj: ICollation = {
      id: questionId,
      Answer: selectedOption,
      question: questionAnswered,
    };

    const updatedAnswers = [...selectedAnswers];

    //Find index of existing answer for the same question
    const existingIndex = updatedAnswers.findIndex(
      (answer) => answer.id === questionId
    );
    // console.log(existingIndex);

    if (existingIndex !== -1) {
      //if it exists, we update that index
      updatedAnswers[existingIndex].Answer = selectedOption;
    } else {
      //if it doesn't we create a new index and add the obj to it
      updatedAnswers.push(obj);
    }

    updateSelectedAnswers(updatedAnswers);
  };

  return (
    <div>
      <div className="quesNans">
        <b>Question {object?.id}</b>
        <div className="ques">{object?.question}</div>
        <div className="ans">
          {object?.answer.map((ans, i) => (
            <div key={i}>
              <label htmlFor={ans} key={i}>
                <input
                  type="radio"
                  onChange={() =>
                    inputHandler(object?.id, ans, object.question)
                  }
                  name={`question_${object?.id}`}
                  value={ans}
                  id={ans}
                  checked={selectedAnswers.some(
                    (answer) =>
                      answer.id === object?.id && answer.Answer === ans
                  )}
                />
                {ans}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Questions;
