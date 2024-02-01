import React from "react";
import "../styles/index.scss";
import { Link } from "react-router-dom";

const SubmitInt: React.FC = () => {
  return (
    <main className="submit">
      <div className="container">
        <h1>You have successfully submitted!!!</h1>
        <Link to="/submit/details">
          <p>click to view answers</p>
        </Link>
      </div>
    </main>
  );
};

export default SubmitInt;
