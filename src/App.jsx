import { useState, useEffect } from "react";
import Button from "./Button";
import { calculatorButtons } from "./data.js";
import "./App.css";

function App() {
  const [calculatorState, setCalculatorState] = useState({
    firstOperand: "",
    secondOperand: "",
    operator: "",
  });

  return (
    <>
      <div className="display">
        <div className="output-secondary">{`${calculatorState.secondOperand} ${calculatorState.operator}`}</div>
        <div className="output-main">
          {String(calculatorState.firstOperand)}
        </div>
      </div>
      <div className="buttons-box">
        {calculatorButtons.map((btn, index) => (
          <Button
            key={index}
            clickAction={() =>
              handleButtonClick(btn.text, calculatorState.firstOperand)
            }
            btnType={btn.type}
            variation={btn.variation}
          >
            {btn.text}
          </Button>
        ))}
      </div>
    </>
  );
}

export default App;
