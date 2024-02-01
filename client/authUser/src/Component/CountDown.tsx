import { useEffect, useRef, useState } from "react";

import "../styles/button.css";
import { IQuestion } from "../Questiongenerators";
import { useAuth } from '../StateContext/AuthContext'
import { useNavigate } from "react-router-dom";

// interface CountDownProps {
//   seconds: number;
//   questions: IQuestion[];
// }

/* interface Timer{
  getObject(): IQuestion[]
} */
const formatTime = (time: number) => {
  let minutes: any = Math.floor(time / 60);
  let seconds: any = Math.floor(time - minutes * 60);

  if (minutes <= 10) minutes = minutes.toString().padStart(2, "0");
  if (seconds <= 10) seconds = seconds.toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
};

// const CountDown: React.FC<CountDownProps> = ({ seconds, questions }) => {
  const CountDown: React.FC = () => {

  const {seconds, data, updateObject} = useAuth();
  
  const [countDown, setCountDown] = useState<number>(seconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  
    const Navigate = useNavigate();

  const timerId: any = useRef();


  const startHandler = () => {
    setIsRunning(true);

    timerId.current = setInterval((): void => {
      setCountDown((prev: number) => prev - 1);
    }, 1000);
    updateObject(data);
    
  };

  useEffect(() => {
    if (countDown === 0) {
      clearInterval(timerId.current);
      setCountDown(seconds);
      alert("END");
      setIsRunning(false);
      Navigate('/submit');
    }
    // console.log(seconds);
  }, [countDown, seconds]);

  const pauseHandler = () => {
    setCheck(!check);
    clearInterval(timerId.current);
  };
  const playHandler = () => {
    setCheck(!check);

    timerId.current = setInterval((): void => {
      setCountDown((prev: number) => prev - 1);
    }, 1000);
  };

  const resetHandler = () => {
    setIsRunning(false);
    setCheck(false);

    clearInterval(timerId.current);
    setCountDown(seconds);
  };

  const countDownDefault = "00:00";

  return (
    <div>
      Timer:
      {isRunning ? (
        <h3>{formatTime(countDown)}</h3>
      ) : (
        <h3>{countDownDefault}</h3>
      )}
      <div>
        {!isRunning ? (
          <button onClick={startHandler} type="button">
            Start
          </button>
        ) : (
          <button onClick={resetHandler} type="button">
            restart
          </button>
        )}

        {!check ? (
          <button onClick={pauseHandler} disabled={!isRunning} type="button">
            pause
          </button>
        ) : (
          <button onClick={playHandler} type="button">
            play
          </button>
        )}
      </div>
    </div>
  );
};

export default CountDown;
